import i18n from '@/i18n';
import VuetifyInstance from '@/plugins/vuetify';

const state = {
  shortDateFormat: 'DD.MM.YYYY',
  shortMonthFormat: 'MM.YYYY',
  locale: 'ru-RU',
  localeShort: 'ru',
  darkTheme: false,
};

const mutations = {
  setLocale (state, data) {
    state.locale = data;
    i18n.locale  = state.locale;
  },
  setLocaleShort (state, data) {
    state.localeShort = data;
  },
  changeDarkTheme (state) {
    state.darkTheme                      = !state.darkTheme;
    VuetifyInstance.framework.theme.dark = state.darkTheme;
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
