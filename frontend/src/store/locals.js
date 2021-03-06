import i18n from '../i18n'

export default {
  // location 'rw' === Other Country
  /**
   * locations: de, ch, at, fr, it, gb, rw
   * languages: de, en, fr, it
   */
  state: {
    lang: 'en',
    location: 'gb',
    locationName: 'greatBritain',
    vatRate: 0.2,
    currency: '£',
    currenyIso: 'GBP',
    numberFormat: 'en-GB',
    subQuotient: 100,
    locations: [
      {
        isoCode: 'de',
        lang: 'de',
        name: 'germany',
        currency: '€',
        currenyIso: 'EUR',
        numberFormat: 'de-DE',
        subQuotient: 100,
        vatRate: 0.19,
        selected: false
      },
      {
        isoCode: 'gb',
        lang: 'en',
        name: 'greatBritain',
        currency: '£',
        currenyIso: 'GBP',
        numberFormat: 'en-GB',
        subQuotient: 100,
        vatRate: 0.2,
        selected: true
      },
      {
        isoCode: 'fr',
        lang: 'fr',
        name: 'france',
        currency: '€',
        currenyIso: 'EUR',
        numberFormat: 'fr-FR',
        subQuotient: 100,
        vatRate: 0.2,
        selected: false
      },
      {
        isoCode: 'it',
        lang: 'it',
        name: 'italy',
        currency: '€',
        currenyIso: 'EUR',
        numberFormat: 'it-IT',
        subQuotient: 100,
        vatRate: 0.22,
        selected: false
      },
      {
        isoCode: 'ch',
        lang: 'de',
        name: 'switzerland',
        currency: 'Fr.',
        currenyIso: 'CHF',
        numberFormat: 'de-CH',
        subQuotient: 100,
        vatRate: 0.077,
        selected: false
      },
      {
        isoCode: 'at',
        lang: 'de',
        name: 'austria',
        currency: '€',
        currenyIso: 'EUR',
        numberFormat: 'de-AT',
        subQuotient: 100,
        vatRate: 0.2,
        selected: false
      },
      {
        isoCode: 'rw',
        lang: 'en',
        name: 'otherCountry',
        currency: '$',
        currenyIso: 'USD',
        numberFormat: 'en-US',
        subQuotient: 100,
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
    viewChange(state) {
      state.mobile = window.innerWidth <= 800
    }
  },
  actions: {
    setLang({ state }, lang) {
      state.lang = lang
      i18n.locale = lang
      state.languages.forEach(language => {
        language.selected = language.isoCode === lang
      })
    },
    setLocation({ state, commit, dispatch }, location) {
      const newLocation = state.locations.find(loc => loc.isoCode === location)
      state.location = newLocation.isoCode
      state.locationName = newLocation.name
      state.vatRate = newLocation.vatRate
      state.currency = newLocation.currency
      state.currenyIso = newLocation.currenyIso
      state.numberFormat = newLocation.numberFormat
      state.subQuotient = newLocation.subQuotient
      state.locations.forEach(loc => {
        loc.selected = loc.isoCode === location
      })
      commit('customer/changeCountry', newLocation.isoCode)
      dispatch('basket/recalcPricesInBasket')
    }
  }
}
