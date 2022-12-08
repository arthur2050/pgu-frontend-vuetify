const state = {
  now: new Date(),
};

const mutations = {
  updateTime (state) {
    state.now = new Date();
  },
};

const actions = {
  start ({commit}) {
    setInterval(() => {
      commit('updateTime');
    }, 1000 * 60);
  },
};

const getters = {
  nowTimestamp: (state) => {
    return Math.floor(state.now.getTime() / 1000);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
