import i18n from '../i18n'

export default {
  namespaced: true,
  state: {
    customerData: {
      firstname: '',
      middlename: '',
      lastname: '',
      address: '',
      postalCode: '',
      city: '',
      country: '',
      phone: '',
      email: ''
    },
    hasInvalids: false,
    invalids: {}
  },
  getters: {
    customerData: state => () => {
      return { ...state.customerData }
    },
    validateSingle: state => key => {
      state.invalids[key] = state.customerData[key].length === 0 ? i18n.t('Order.invalid') : ''
      return state.customerData[key].length === 0
    }
  },
  mutations: {
    resetInvalids(state) {
      Object.keys(state.customerData).forEach(key => {
        state.invalids[key] = ''
      })
    },
    translateInvalids(state) {
      Object.keys(state.customerData).forEach(key => {
        state.invalids[key] = state.invalids[key].length ? i18n.t('Order.invalid') : ''
      })
    },
    revalidate(state) {
      state.hasInvalids = Object.values(state.invalids).reduce((hasInvalids, val) => {
        return val === '' ? hasInvalids : true
      }, false)
    }
  },
  actions: {
    validate({ state, getters }) {
      state.hasInvalids = false
      Object.keys(state.customerData).forEach(key => {
        state.hasInvalids = getters.validateSingle(key) ? true : state.hasInvalids
      })
    }
  }
}
