import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import globalsMixin from './mixin'
import CarbonComponentsVue from '@carbon/vue/src/index'
import './assets/styles/_carbon-precompile.css'
import { CarbonIconsVue } from '@carbon/icons-vue'
import i18n from './i18n'
import axios from 'axios'
import VueAxios from 'vue-axios'

if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = '//cablecard-cct-backend.eu-de.mybluemix.net'
} else {
  axios.defaults.baseURL = '//localhost:3000/'
}
Vue.use(VueAxios, axios)

Vue.use(CarbonIconsVue, { components: [] })
Vue.use(CarbonComponentsVue)
Vue.config.productionTip = false

Vue.mixin(globalsMixin)
Vue.prototype.$storage = window.sessionStorage

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
