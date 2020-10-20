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
        state.invalids[key] = state.invalids[key].length !== 0 ? i18n.t('Order.invalid') : ''
      })
    }
  },
  actions: {
    validateInput({ state, getters, dispatch }, key) {
      state.invalids[key] = getters.validateSingle(key) ? i18n.t('Order.invalid') : ''
      dispatch('validate')
    },
    validateMessages({ state, getters }) {
      Object.keys(state.customerData).forEach(key => {
        state.invalids[key] = getters.validateSingle(key) ? i18n.t('Order.invalid') : ''
      })
    },
    validate({ state, getters }) {
      state.hasInvalids = false
      Object.keys(state.customerData).forEach(key => {
        state.hasInvalids = getters.validateSingle(key) ? true : state.hasInvalids
      })
    }
  }
}
