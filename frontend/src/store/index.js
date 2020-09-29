import Vue from 'vue'
import Vuex from 'vuex'
import i18n from '../i18n'

Vue.use(Vuex)

export default new Vuex.Store({
  // location 'rw' === Other Country
  /**
   * locations: de, ch, at, fr, it, gb, rw
   * languages: de, en, fr, it
   */
  state: {
    lang: 'en',
    location: 'gb'
  },
  mutations: {
    setLang(state, lang) {
      state.lang = lang
      i18n.locale = lang
    },
    setLocation(state, location) {
      state.location = location
    }
  },
  actions: {},
  modules: {}
})
