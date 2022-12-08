const state = {
  drawerOpen: true,
  collapsed: true,
  actualState: true,
  mobile: undefined,
};

function setCollapsed (value) {
  // TODO: remove after completely migrating to VUE
  const body = document.body;
  if (value) {
    body.classList.add('menu-collapsed');
  } else {
    body.classList.remove('menu-collapsed');
  }
}

const mutations = {
  collapse: (state) => {
    state.collapsed = true;
    setCollapsed(state.collapsed);
  },
  unfold: (state) => {
    state.collapsed = false;
    setCollapsed(state.collapsed);
  },
  toggle: (state) => {
    state.collapsed = !state.collapsed;
    setCollapsed(state.collapsed);
  },
  setActualState: (state, data) => {
    state.actualState = data;
  },
  setDrawer: (state, data) => {
    state.drawerOpen = data;
  },
  setMobile: (state, data) => {
    state.mobile = data;
    // TODO: remove after completely migrating to VUE
    const body     = document.body;
    if (data) {
      body.classList.add('mobile');
    } else {
      body.classList.remove('mobile');
    }
  },
};

const actions = {
  setCollapsedClass: ({state}) => {
    setCollapsed(state.collapsed);
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
