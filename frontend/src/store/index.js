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
    mobile: window.innerWidth <= 800,
    lang: 'en',
    location: 'gb',
    vatRate: 0.2,
    currency: '£',
    currenyIso: 'GBP',
    numberFormat: 'en-GB',
    locations: [
      {
        isoCode: 'de',
        lang: 'de',
        name: 'Deutschland',
        currency: '€',
        currenyIso: 'EUR',
        numberFormat: 'de-DE',
        vatRate: 0.19,
        selected: false
      },
      {
        isoCode: 'gb',
        lang: 'en',
        name: 'Great Britain',
        currency: '£',
        currenyIso: 'EUR',
        numberFormat: 'en-GB',
        vatRate: 0.2,
        selected: true
      },
      {
        isoCode: 'fr',
        lang: 'fr',
        name: 'France',
        currency: '€',
        currenyIso: 'EUR',
        numberFormat: 'fr-FR',
        vatRate: 0.2,
        selected: false
      },
      {
        isoCode: 'it',
        lang: 'it',
        name: 'Italia',
        currency: '€',
        currenyIso: 'EUR',
        numberFormat: 'it-IT',
        vatRate: 0.22,
        selected: false
      },
      {
        isoCode: 'ch',
        lang: 'de',
        name: 'Schweiz',
        currency: 'Fr.',
        currenyIso: 'CHF',
        numberFormat: 'de-CH',
        vatRate: 0.077,
        selected: false
      },
      {
        isoCode: 'at',
        lang: 'de',
        name: 'Österreich',
        currency: '€',
        currenyIso: 'EUR',
        numberFormat: 'de-AT',
        vatRate: 0.2,
        selected: false
      },
      {
        isoCode: 'rw',
        lang: 'en',
        name: 'Other Country',
        currency: '$',
        currenyIso: 'USD',
        numberFormat: 'en-US',
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
      state.languages.forEach(language => {
        language.selected = language.isoCode === lang
      })
    },
    setLocation(state, location) {
      const newLocation = state.locations.find(loc => loc.isoCode === location)
      state.location = newLocation.isoCode
      state.vatRate = newLocation.vatRate
      state.currency = newLocation.currency
      state.currenyIso = newLocation.currenyIso
      state.numberFormat = newLocation.numberFormat
      state.locations.forEach(loc => {
        loc.selected = loc.isoCode === location
      })
    },
    viewChange(state) {
      state.mobile = window.innerWidth <= 800
    }
  },
  actions: {},
  modules: {}
})
