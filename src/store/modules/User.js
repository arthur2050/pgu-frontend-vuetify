import intersection from 'lodash/intersection';
import VuetifyInstance from '@/plugins/vuetify';

// Config
import { IN_BROWSER } from '@/config';

const state = {
  user: {},
  roles: [],
  dark: false,
  drawer: {
    image: 0,
    gradient: 0,
    mini: false,
  },
  gradients: [
    'rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)',
    'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)',
    'rgba(244, 67, 54, .8), rgba(244, 67, 54, .8)',
  ],
  images: [
    'assets/pexels-anjana-c-674010.jpg',
    'https://picsum.photos/350/165?random',
    'http://192.168.1.3:8000/assets/grandfather.jpg',
    'https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-4.jpg',
  ],
  notifications: [],
  rtl: false,
};

const mutations = {
  setDark: (state, value) => { state.dark = value; VuetifyInstance.framework.theme.dark = value },
  setDrawer: (state, value) => { state.drawer = value },
  setGradients: (state, value) => { state.gradients = value },
  setImages: (state, value) => { state.images = value },
  setNotifications: (state, value) => { state.notifications = value },
  setRtl: (state, value) => { state.rtl = value },
  setDrawerImage: (state, value) => { state.drawer.image = value },
  setDrawerGradient: (state, value) => { state.drawer.gradient = value },

  setUser: (state, data) => {
    state.user = data;
  },

  setRoles: (state, data) => {
    state.roles = data;
  },
};

const actions = {
    fetch: ({ commit }) => {
    const local = localStorage.getItem('vuetify@user') || '{}'
    const user = JSON.parse(local)

    for (const key in user) {
      commit(key, user[key])
    }

    if (user.dark === undefined) {
      commit('dark', window.matchMedia('(prefers-color-scheme: dark)'))
    }
  },
  update: ({ state }) => {
    if (!IN_BROWSER) return

    localStorage.setItem('vuetify@user', JSON.stringify(state))
  },
};

const getters = {
  hasRole: state => {
    return (roles) => {
      let collection;
      if (Array.isArray(roles)) {
        collection = roles;
      } else {
        collection = roles === undefined ? [] : [roles];
      }
      return collection.length === 0 || intersection(state.roles, collection).length > 0;
    };
  },
  getUser: state => {
    return state.user;
  },
  dark: (state, getters) => {
    return (
      state.dark ||
      getters.gradient.indexOf('255, 255, 255') === -1
    )
  },
  gradient: state => {
    return state.gradients[state.drawer.gradient]
  },
  image: state => {
    console.log(state.drawer.image === '' ? state.drawer.image : state.images[state.drawer.image]);
    return state.drawer.image === '' ? state.drawer.image : state.images[state.drawer.image]
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
