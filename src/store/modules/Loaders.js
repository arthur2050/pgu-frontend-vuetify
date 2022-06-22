const state = {
  topProgress: 0,
};

const mutations = {
  setTopProgress: (state, data) => {
    state.topProgress = data;
  },
  addTopProgress: (state) => {
    ++state.topProgress;
  },
  subtractTopProgress: (state) => {
    --state.topProgress;
    if (state.topProgress < 0) state.topProgress = 0;
  },
};

const actions = {};
const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
