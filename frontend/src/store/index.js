import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import locals from './locals'
import basket from './basket'
import customer from './customer'
import cuppy from'./cuppy'
Vue.use(Vuex)

const vuexPersist = new VuexPersist({
  key: 'cupboard-limited',
  storage: window.sessionStorage
})

export default new Vuex.Store({
  state: {
    mobile: window.innerWidth <= 800
  },
  getters: {
    formatPrice: state => price => {
      const formatter = new Intl.NumberFormat(state.locals.numberFormat, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        style: 'currency',
        currency: state.locals.currenyIso
      })
      return formatter.format(price)
    }
  },
  mutations: {
    viewChange(state) {
      state.mobile = window.innerWidth <= 800
    }
  },
  actions: {},
  modules: {
    locals,
    basket,
    customer,
    cuppy
  },
  plugins: [vuexPersist.plugin]
})
