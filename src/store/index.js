import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import nav from '@/store/modules/Nav';
import auth from '@/store/modules/Auth';
import options from '@/store/modules/Options';
import user from '@/store/modules/User';
import time from '@/store/modules/Time';
import snackbar from '@/store/modules/Snackbar';
import loaders from '@/store/modules/Loaders';
import app from '@/store/modules/App';

const isDev = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

const store = new Vuex.Store({
  // actions,
  // getters,
  // mutations,
  modules: {
    nav,
    app,
    auth,
    options,
    user,
    snackbar,
    loaders,
    time,
  },
  strict: isDev,
  plugins: [
    createPersistedState({
      key: 'pgu-front',
      paths: [
        'nav',
        'auth',
        'options',
        'user',
      ],
    }),
  ],
});

export {store};
export default store;
