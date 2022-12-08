
// Data
const state = {
  drawer: true,
  drawerImage: true,
  mini: false,
  isOverlay: false,
  items: [
    {
      title: 'Dashboard',
      icon: 'mdi-view-dashboard',
      to: '/',
    },
    {
      title: 'User Profile',
      icon: 'mdi-account',
      to: '/components/profile/',
    },
    {
      title: 'Tables',
      icon: 'mdi-clipboard-outline',
      to: '/components/tables/',
    },
  ],
}

const mutations = {
  setDrawer: (state, payload) => { state.drawer = payload },
  setDrawerImage: (state, payload) => { state.drawerImage = payload },
  setMini: (state, payload) => { state.mini = payload },
  setItems: (state, payload) => { state.items = payload },
  setOverlay: (state, payload) => { state.isOverlay = payload }
};

const actions = {
  setDrawer: ({commit}, payload) => { commit('setDrawer',payload) },
  setDrawerImage: ({commit}, payload) => { commit('setDrawerImage',payload) },
  setMini: ({commit}, payload) => { commit('setMini',payload) },
  setItems: ({commit}, payload) => { commit('setItems',payload) },
  setOverlay: ({commit}, payload) => { commit('setOverlay',payload) }
  // init: async ({ dispatch }) => {
  //   //
  // },
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
