import store from '@/store';

function isGranted (roles) {
  return store.getters['user/hasRole'](roles);
}

export default {
  install: function (Vue) {
    Vue.prototype.$isGranted = isGranted;
  },
};
