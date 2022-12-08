import axios from 'axios';
import store from '@/store';
import {API_URL, BASE_URL} from '@/config';

const types          = ['get', 'post', 'put', 'delete'];
const defaultHeaders = {'Content-Type': 'application/json'};

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: defaultHeaders,
  transformRequest: [function (data) {
    return data instanceof FormData ? data : JSON.stringify(data);
  }],
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }
    if (error.response && error.response.status === 401) {
      if(window.location.pathname !== '/login') {
        store.commit('auth/resetToken');
        window.location.pathname = '/login'
      }
    }

    const toastOptions = {
      timeout: 5000,
      color: 'error',
    };

    if (error.response && error.response.status === 403) {
      toastOptions.timeout = 10000;
    }

    if (error.response && error.response.data && error.response.data.message) {
      toastOptions.content    = 'api_errors[\'' + error.response.data.message + '\']';
      toastOptions.parameters = {status: error.response.status};
      toastOptions.fallback   = error.response.data.message;
    } else {
      toastOptions.content  = 'api_errors[\'' + error.message + '\']';
      toastOptions.fallback = error.message;
    }

    store.dispatch('snackbar/add', toastOptions);

    console.error(error);
    return Promise.reject(error);
  },
);

function constructRoute (route) {
  let result = '';
  if (route instanceof Array) {
    result = '/' + route.join('/');
  } else {
    result = route;
  }

  return result;
}

function getOptions (params = {}, options = {}, cancelToken) {
  options = {
    ...options,
    params: params,
    headers: {
      ...options.headers,
      authorization: `Bearer ${store.state.auth.token}`,
    },
    transformResponse: [function (data) {
      if (options.responseType === 'blob') {
        return data;
      }
      if (data) {
        const response = JSON.parse(data);
        return Object.prototype.hasOwnProperty.call(response, 'data') ? response.data : response;
      }
      return undefined;
    }],
  };

  if (typeof cancelToken !== 'undefined') {
    options.cancelToken = cancelToken.token;
  }

  return options;
}

const API = {
  getBaseUrl () {
    return API_URL;
  },
  get (url, params = {}, options = {}, cancelToken) {
    return axiosInstance.get(constructRoute(url), getOptions(params, options, cancelToken));
  },
  post (url, data, options = {}, cancelToken) {
    return axiosInstance.post(constructRoute(url), data, getOptions({}, options, cancelToken));
  },
  put (url, data, options = {}, cancelToken) {
    return axiosInstance.put(constructRoute(url), data, getOptions({}, options, cancelToken));
  },
  delete (url, params = {}, options = {}, cancelToken) {
    return axiosInstance.delete(constructRoute(url), getOptions(params, options, cancelToken));
  },
  constructRoute,
  postWithoutAuth (url, data) {
    return axiosInstance.post(constructRoute(url), data);
  },

  createCancelToken () {
    return axios.CancelToken.source();
  },
};

types.forEach((type) => {
  API[type].progress = async function (url, data = {}) {
    let result;
    store.commit('loaders/addTopProgress');
    try {
      result = await API[type](url, data);
    } finally {
      store.commit('loaders/subtractTopProgress');
    }
    return result;
  };
});

API.getCancelingApi = function () {
  const cancelingApi = {
    cancelRequest: undefined,
  };

  types.forEach((type) => {
    cancelingApi[type] = async function (url, data = {}, options = {}) {
      if (cancelingApi.cancelRequest !== undefined) {
        cancelingApi.cancelRequest.cancel();
      }
      cancelingApi.cancelRequest = API.createCancelToken();
      const result               = await API[type](url, data, options, cancelingApi.cancelRequest);
      cancelingApi.cancelRequest = undefined;
      return result;
    };

    cancelingApi[type].progress = async function (url, data = {}, options = {}) {
      let result;
      store.commit('loaders/addTopProgress');
      try {
        result = await cancelingApi[type](url, data, options);
      } finally {
        store.commit('loaders/subtractTopProgress');
      }
      return result;
    };
  });

  return cancelingApi;
};

export default API;
