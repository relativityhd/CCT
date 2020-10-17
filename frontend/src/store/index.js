import Vue from 'vue'
import Vuex from 'vuex'
import locals from './locals'
import basket from './basket'

Vue.use(Vuex)

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
    basket
  }
})
