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
    lang: 'en',
    location: 'gb',
    vatRate: 0.2,
    locations: [
      { isoCode: 'de', lang: 'de', name: 'Deutschland', selected: false },
      { isoCode: 'gb', lang: 'en', name: 'Great Britain', selected: true },
      { isoCode: 'fr', lang: 'fr', name: 'France', selected: false },
      { isoCode: 'it', lang: 'it', name: 'Italia', selected: false },
      { isoCode: 'ch', lang: 'de', name: 'Schweiz', selected: false },
      { isoCode: 'at', lang: 'de', name: 'Österreich', selected: false },
      { isoCode: 'rw', lang: 'en', name: 'Other Country', selected: false }
    ],
    languages: [
      { isoCode: 'de', name: 'Deutsch', selected: false },
      { isoCode: 'en', name: 'English', selected: true },
      { isoCode: 'it', name: 'Italiano', selected: false },
      { isoCode: 'fr', name: 'Français', selected: false }
    ]
  },
  mutations: {
    setLang(state, lang) {
      state.lang = lang
      i18n.locale = lang
      state.languages.forEach(language => {
        language.selected = language.isoCode === lang
      })
    },
    setLocation(state, location) {
      state.location = location
      state.vatRate = vats[location]
      state.locations.forEach(loc => {
        loc.selected = loc.isoCode === location
      })
    }
  },
  actions: {},
  modules: {}
})
