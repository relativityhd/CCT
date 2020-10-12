import Vue from 'vue'
import Vuex from 'vuex'
import i18n from '../i18n'

Vue.use(Vuex)

const vats = {
  de: 0.19,
  gb: 0.2,
  fr: 0.2,
  it: 0.22,
  ch: 0.077,
  at: 0.2,
  rw: 0
}

export default new Vuex.Store({
  // location 'rw' === Other Country
  /**
   * locations: de, ch, at, fr, it, gb, rw
   * languages: de, en, fr, it
   */
  state: {
    mobile: window.innerWidth <= 800,
    lang: 'en',
    location: 'gb',
    vatRate: 0.2
  },
  getters: {
    formatPrice: () => price => {
      // TODO: number Format & currency
      const formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        style: 'currency',
        currency: 'EUR'
      })
      return formatter.format(price)
    }
  },
  mutations: {
    setLang(state, lang) {
      state.lang = lang
      i18n.locale = lang
    },
    setLocation(state, location) {
      state.location = location
      state.vatRate = vats[location]
    },
    viewChange(state) {
      state.mobile = window.innerWidth <= 800
    }
  },
  actions: {},
  modules: {}
})
