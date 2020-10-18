import * as hash from 'object-hash'

function compareSelectable(a, b) {
  return a.id - b.id
}

export default {
  namespaced: true,
  state: {
    products: [],
    price: {
      net: 0,
      tax: 0,
      gross: 0
    }
  },
  getters: {
    newBasketId: state => () => {
      let newBasketId = 0
      while (state.products.findIndex(p => p.basketId === newBasketId) !== -1) {
        newBasketId++
      }
      return newBasketId
    },
    productById: state => basketId => {
      return state.products.find(p => p.basketId === basketId)
    },
    productsById: state => id => {
      return state.products.filter(product => product.id === id)
    },
    multiplyPrice: (_state, _getters, rootState) => (a, b) => {
      const sub = rootState.locals.subQuotient || 100
      return (parseInt(Math.round(a * sub)) * parseInt(Math.round(b * sub))) / sub ** 2
    },
    priceToInt: (_state, _getters, rootState) => price => {
      const sub = rootState.locals.subQuotient || 100
      return parseInt(Math.round(price * sub))
    },
    priceToFloat: (_state, _getters, rootState) => price => {
      const sub = rootState.locals.subQuotient || 100
      return price / sub
    },
    grossToNet: (_state, _getters, rootState) => gross => {
      return parseInt(gross / (1 + rootState.locals.vatRate))
    },
    calcPrices: (_state, getters) => (info, selectables, quantity) => {
      const price = {}
      const gross = getters.priceToInt(info.price)
      const net = getters.grossToNet(gross)
      price.items = [
        {
          name: info.name,
          net: getters.priceToFloat(net),
          tax: getters.priceToFloat(gross - net),
          gross: getters.priceToFloat(gross)
        }
      ]
      selectables.forEach(s => {
        const gross = getters.priceToInt(s.price)
        const net = getters.grossToNet(gross)
        price.items.push({
          name: `${s.name} x(${s.quantity})`,
          net: getters.multiplyPrice(getters.priceToFloat(net), s.quantity),
          tax: getters.multiplyPrice(getters.priceToFloat(gross - net), s.quantity),
          gross: getters.multiplyPrice(getters.priceToFloat(gross), s.quantity)
        })
      })
      price.single = {
        net: price.items.reduce((a, b) => a + (b.net || 0), 0),
        tax: price.items.reduce((a, b) => a + (b.tax || 0), 0),
        gross: price.items.reduce((a, b) => a + (b.gross || 0), 0)
      }
      price.sum = {
        net: getters.multiplyPrice(price.single.net, quantity),
        tax: getters.multiplyPrice(price.single.tax, quantity),
        gross: getters.multiplyPrice(price.single.gross, quantity)
      }
      return price
    }
  },
  mutations: {
    pushProduct(state, newProduct) {
      state.products.push(newProduct)
    },
    removeProduct(state, basketId) {
      const indexInProducts = state.products.findIndex(product => product.basketId === basketId)
      if (indexInProducts === -1) return
      state.products.splice(indexInProducts, 1)
    },
    setProduct(state, { basketId, quantity }) {
      const indexInProducts = state.products.findIndex(product => product.basketId === basketId)

      if (indexInProducts !== -1) {
        state.products[indexInProducts].quantity = quantity
      }
    },
    calcAllPrices(state) {
      state.price = {
        net: 0,
        tax: 0,
        gross: 0
      }
      state.products.forEach(p => {
        state.price.net += p.price.sum.net
        state.price.tax += p.price.sum.tax
        state.price.gross += p.price.sum.gross
      })
    }
  },
  actions: {
    addProduct({ commit, getters, dispatch }, { id, info, selectables, custom }) {
      const newProduct = {
        basketId: getters.newBasketId(),
        id,
        info: { ...info },
        price: getters.calcPrices(info, selectables, 1),
        selectables: selectables
          ? selectables.map(s => {
              const newS = { ...s }
              newS.custom = s.custom.customized
                ? { ...s.custom }
                : {
                    height: 0,
                    width: 0,
                    depth: 0,
                    customized: false
                  }
              return newS
            })
          : [],
        quantity: 1,
        custom: custom.customized
          ? { ...custom }
          : {
              height: 0,
              width: 0,
              depth: 0,
              customized: false
            }
      }
      const productsInBasket = getters.productsById(id)
      if (productsInBasket.length >= 0) {
        let inBasket = false
        productsInBasket.forEach(productInBasket => {
          if (
            hash({ ...productInBasket.custom }) === hash({ ...newProduct.custom }) &&
            hash(productInBasket.selectables.sort(compareSelectable)) ===
              hash(newProduct.selectables.sort(compareSelectable))
          ) {
            productInBasket.quantity++
            dispatch('calcPricesInBasket', productInBasket.basketId)
            inBasket = true
            return
          }
        })
        if (inBasket) return
      }
      commit('pushProduct', newProduct)
      commit('calcAllPrices')
    },
    calcPricesInBasket({ commit, getters }, basketId) {
      let item = getters.productById(basketId)
      item.price = getters.calcPrices(item.info, item.selectables, item.quantity)
      commit('calcAllPrices')
    },
    removeProduct({ commit }, basketId) {
      commit('removeProduct', basketId)
      commit('calcAllPrices')
    },
    setProduct({ commit }, { basketId, quantity }) {
      if (quantity === 0) {
        commit('removeProduct', basketId)
        return
      }
      commit('setProduct', { basketId, quantity })
      commit('calcAllPrices')
    }
  }
}
