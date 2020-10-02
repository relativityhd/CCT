import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'carbon-components/css/carbon-components.css'
import CarbonComponentsVue from '@carbon/vue/src/index'
import i18n from './i18n'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

Vue.use(CarbonComponentsVue)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')


