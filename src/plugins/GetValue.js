import {getValue} from '@/utils/PathAccessor';

export default {
  install: function (Vue) {
    Vue.prototype.$getValue = getValue;
  },
};
