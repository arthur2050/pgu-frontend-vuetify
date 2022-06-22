import extend from 'lodash/extend';

const defaults = {
  color: undefined,
  timeout: 3000,
  content: 'no content provided',
  contentUrl: undefined,
  parameters: {},
  fallback: 'Undefined fallback',
  position: 'left',
  icon: undefined,
  iconColor: undefined,
  links: undefined,
};

const state = {
  queue: [],
  show: false,
  current: {},
};

const mutations = {
  addToQueue: (state, options) => {
    const object = extend({}, defaults, options);
    state.queue.push(object);
  },
  SHOW: (state) => {
    state.show = true;
  },
  HIDE: (state) => {
    state.show = false;
  },
  LOAD_NEXT: (state) => {
    if (state.queue.length > 0) {
      state.current = state.queue.shift();
    }
  },
};

const addAction = function ({commit, dispatch, state}, options) {
  commit('addToQueue', options);
  if (!state.show && state.queue.length === 1) {
    dispatch('show');
  }
};

const actions = {
  add: addAction,
  hide: ({commit, dispatch, state}) => {
    commit('HIDE');
    if (state.queue.length > 0) {
      setTimeout(() => {
        dispatch('show');
      }, 500);
    }
  },
  show: ({commit}) => {
    commit('LOAD_NEXT');
    commit('SHOW');
  },
};
const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
