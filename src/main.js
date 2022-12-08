import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import './plugins'
import store from '@/store';
import router from './router'
import API from '@/services/Api';
import i18n from './i18n'
import Vuex from 'vuex'
import validationParser from '@/plugins/ValidationParser';
import isGranted from '@/plugins/IsGranted';
import getValue from '@/plugins/GetValue';

import VeeValidate from 'vee-validate';

Vue.config.productionTip = false

// import axios from 'axios'
// axios.defaults.baseURL = "http://127.0.0.1:8000/api/"
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// Vue.prototype.axios = axios
Vue.prototype.API   = API;

Vue.config.productionTip = false
// Vue.use(axios)
Vue.use(Vuex)
Vue.use(VeeValidate, {
  errorBagName: 'veeErrors',
  fieldsBagName: 'veeFields',
  i18n: i18n,
  i18nRootKey: 'validation',
});
Vue.use(validationParser, {errorBagName: 'veeErrors'});
Vue.use(isGranted);
Vue.use(getValue);
console.log(store.state.count)
var RootApp = new Vue({
    vuetify,
    router,
    i18n,
    store,
    render: h => h(App)
}).$mount('#app')
window.RootApp = RootApp;