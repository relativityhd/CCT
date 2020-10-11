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
    location: 'gb',
    vatRate: 0.2,
    currency: '£',
    locations: [
      {
        isoCode: 'de',
        lang: 'de',
        name: 'Deutschland',
        currency: '€',
        vatRate: 0.19,
        selected: false
      },
      {
        isoCode: 'gb',
        lang: 'en',
        name: 'Great Britain',
        currency: '£',
        vatRate: 0.2,
        selected: true
      },
      {
        isoCode: 'fr',
        lang: 'fr',
        name: 'France',
        currency: '€',
        vatRate: 0.2,
        selected: false
      },
      {
        isoCode: 'it',
        lang: 'it',
        name: 'Italia',
        currency: '€',
        vatRate: 0.22,
        selected: false
      },
      {
        isoCode: 'ch',
        lang: 'de',
        name: 'Schweiz',
        currency: 'Fr.',
        vatRate: 0.077,
        selected: false
      },
      {
        isoCode: 'at',
        lang: 'de',
        name: 'Österreich',
        currency: '€',
        vatRate: 0.2,
        selected: false
      },
      {
        isoCode: 'rw',
        lang: 'en',
        name: 'Other Country',
        currency: '$',
        vatRate: 0,
        selected: false
      }
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
      const newLocation = state.locations.find(
        loc => loc.isoCode === location
      )
      console.log('--DEBUG : setLocation -> newLocation', newLocation)
      state.location = newLocation.isoCode
      state.vatRate = newLocation.vatRate
      state.currency = newLocation.currency
      state.locations.forEach(loc => {
        loc.selected = loc.isoCode === location
      })
    }
  },
  actions: {},
  modules: {}
})
