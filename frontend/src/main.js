import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import CarbonComponentsVue from '@carbon/vue/src/index'
import './assets/styles/_carbon-precompile.css'
import { CarbonIconsVue } from '@carbon/icons-vue'
import i18n from './i18n'
import axios from 'axios'
import VueAxios from 'vue-axios'

// TODO: Remove this
axios.defaults.headers.common['x-api-key'] = process.env.VUE_APP_GATEWAY_API_KEY
console.log('--DEBUG : process.env', process.env)
axios.defaults.baseURL = '//cupboard.eu-gb.cf.appdomain.cloud'

Vue.use(VueAxios, axios)

Vue.use(CarbonIconsVue, { components: [] })
Vue.use(CarbonComponentsVue)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
