import JwtHelper from '@/services/JwtHelper';

const state = {
  token: '',
  tokenExpire: null,
};

const mutations = {
  setToken: (state, data) => {
    state.token       = data;
    state.tokenExpire = JwtHelper.getTokenExpirationDate(data);
  },

  resetToken: (state) => {
    state.token       = null;
    state.tokenExpire = null;
  },
};

const actions = {};

const getters = {
  isAuthenticated: state => {
    let curUtcDate = new Date();
    if (!Date.prototype.toISOString) {
      (function() {

        function pad(number) {
          if (number < 10) {
            return '0' + number;
          }
          return number;
        }

        Date.prototype.toISOString = function() {
          return this.getUTCFullYear() +
            '-' + pad(this.getUTCMonth() + 1) +
            '-' + pad(this.getUTCDate()) +
            'T' + pad(this.getUTCHours()) +
            ':' + pad(this.getUTCMinutes()) +
            ':' + pad(this.getUTCSeconds()) +
            '.' + (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
            'Z';
        };

      }());
    }
    console.log(state.tokenExpire)
    curUtcDate = curUtcDate.toISOString();
    return state.tokenExpire !== null && new Date(state.tokenExpire).toISOString() > curUtcDate ;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
