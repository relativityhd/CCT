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
      let isInvalid = true
      const value = state.customerData[key]
      switch (key) {
        case 'middlename':
          isInvalid = false
          break
        case 'address':
          isInvalid = !value.match(/^(\D+)\s(\S+)$/)
          break
        case 'phone':
          isInvalid = !value.match(
            /^[+]?(?=(?:[^\dx]*\d){7})(?:\(\d+(?:\.\d+)?\)|\d+(?:\.\d+)?)(?:[ -]?(?:\(\d+(?:\.\d+)?\)|\d+(?:\.\d+)?))*(?:[ ]?(?:x|ext)\.?[ ]?\d{1,5})?$/
          )
          break
        case 'email':
          isInvalid = !value.match(
            /^[-!#-'*+/-9=?^-~]+(?:\.[-!#-'*+/-9=?^-~]+)*@[-!#-'*+/-9=?^-~]+(?:\.[-!#-'*+/-9=?^-~]+)+$/i
          )
          break
        default:
          isInvalid = value.length === 0
          break
      }
      return isInvalid
    }
  },
  mutations: {
    resetInvalids(state) {
      Object.keys(state.customerData).forEach(key => {
        state.invalids[key] = false
      })
    },
    changeCountry(state, iso) {
      state.customerData.country = iso
    }
  },
  actions: {
    validateInput({ state, getters, dispatch }, key) {
      state.invalids[key] = getters.validateSingle(key)
      dispatch('validate')
    },
    validateMessages({ state, getters }) {
      Object.keys(state.customerData).forEach(key => {
        state.invalids[key] = getters.validateSingle(key)
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
