import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'

import axios from 'axios'
axios.defaults.baseURL = "http://127.0.0.1:8000/api/"
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.axios = axios

Vue.config.productionTip = false
Vue.use(axios)

new Vue({
    vuetify,
    router,
    render: h => h(App)
}).$mount('#app')