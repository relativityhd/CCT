import * as hash from 'object-hash'
import { v4 as uuidv4 } from 'uuid'
import * as clonedeep from 'lodash.clonedeep'

function removeUid(e) {
  /* eslint-disable no-unused-vars */
  const { _uid, ...newE } = e
  return newE
}

function compareInterior(a, b) {
  if (a.id !== b.id) return a.id - b.id
}

function compareExterior(a, b) {
  if (a.id !== b.id) return a.id - b.id
  if (a.quantity !== b.quantity) return a.quantity - b.quantity

  const custHashA = hash(clonedeep(a.custom))
  const custHashB = hash(clonedeep(b.custom))
  if (custHashA !== custHashB) return custHashA - custHashB

  const matHashA = hash(clonedeep(a.material))
  const matHashB = hash(clonedeep(b.material))
  if (matHashA !== matHashB) return matHashA - matHashB

  const intHashA = hash(a.interiors.map(removeUid).sort(compareInterior))
  const intHashB = hash(b.interiors.map(removeUid).sort(compareInterior))
  if (intHashA !== intHashB) return intHashA - intHashB

  const accHashA = hash(a.accessories.map(removeUid).sort(compareInterior))
  const accHashB = hash(b.accessories.map(removeUid).sort(compareInterior))
  if (accHashA !== accHashB) return accHashA - accHashB

  return 0
}

export default {
  namespaced: true,
  state: {
    items: [],
    price: {
      net: 0,
      tax: 0,
      gross: 0
    }
  },
  getters: {
    itemById: state => _uid => {
      return state.items.find(it => it._uid === _uid)
    },
    itemsByProductId: state => id => {
      return state.items.filter(it => it.product.id === id)
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

    calcPrices: (_state, getters) => (items, quantity) => {
      const price = {}
      price.items = []

      items.forEach(it => {
        const gross = getters.priceToInt(it.price)
        const net = getters.grossToNet(gross)
        price.items.push({
          _uid: uuidv4(),
          name: it.name,
          quantity: it.quantity,
          net: getters.multiplyPrice(getters.priceToFloat(net), it.quantity),
          tax: getters.multiplyPrice(getters.priceToFloat(gross - net), it.quantity),
          gross: getters.multiplyPrice(getters.priceToFloat(gross), it.quantity)
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
      price.quantity = quantity

      return price
    },

    extractPriceItems: () => exteriors => {
      let products = []
      exteriors.forEach(ext => {
        for (let q = 0; q < ext.quantity; q++) {
          ext.interiors.concat(ext.accessories).forEach(sel => {
            products.push({
              id: sel.id,
              name: sel.name,
              quantity: sel.quantity,
              price: sel.price
            })
          })
          products.push({
            id: ext.material.id,
            name: ext.material.name,
            quantity: 1,
            price: ext.material.price
          })
        }
        products.push({
          id: ext.id,
          name: ext.name,
          quantity: ext.quantity,
          price: ext.price
        })
      })
      products = products.reduce((prods, item) => {
        const prod = prods.find(p => p.id === item.id)
        if (prod) {
          prod.quantity += item.quantity
        } else {
          prods.push(item)
        }
        return prods
      }, [])
      return products
    },

    orderItems: state => () => {
      const products = []
      state.items.forEach(it => {
        if (!it.isCustom) {
          products.push({
            id: it.product.id,
            quantity: it.quantity,
            customized: false,
            width: 0,
            height: 0,
            depth: 0
          })
          return
        }
        it.exteriors.forEach(ext => {
          for (let q = 0; q < ext.quantity; q++) {
            ext.interiors.concat(ext.accessories).forEach(sel => {
              products.push({
                id: sel.id,
                quantity: sel.quantity,
                customized: ext.custom.customized && sel.customizable,
                width: sel.customizable ? ext.custom.width : 0,
                height: sel.customizable ? ext.custom.height : 0,
                depth: sel.customizable ? ext.custom.depth : 0
              })
            })
            products.push({
              id: ext.material.id,
              quantity: 1,
              customized: false,
              width: 0,
              height: 0,
              depth: 0
            })
          }
          products.push({
            id: ext.id,
            quantity: ext.quantity,
            customized: ext.custom.customized,
            width: ext.custom.width,
            height: ext.custom.height,
            depth: ext.custom.depth
          })
        })
      })
      return products.reduce((reduced, p) => {
        const inReduced = reduced.find(r => hash({ ...r, quantity: 0 }) === hash({ ...p, quantity: 0 }))
        if (inReduced !== undefined) {
          inReduced.quantity += p.quantity
        } else {
          reduced.push(p)
        }
        return reduced
      }, [])
    },
    orderPrice: (state, _getters, rootState) => () => {
      return {
        currency: rootState.locals.currenyIso,
        netPrice: state.price.net,
        taxPercentage: rootState.locals.vatRate,
        taxAmount: state.price.tax,
        grossPrice: state.price.gross
      }
    }
  },
  mutations: {
    pushItem(state, newItem) {
      state.items.push(newItem)
    },
    removeItem(state, _uid) {
      const indexInItems = state.items.findIndex(it => it._uid === _uid)
      if (indexInItems === -1) return
      state.items.splice(indexInItems, 1)
    },
    setItem(state, { _uid, quantity }) {
      const indexInItems = state.items.findIndex(it => it._uid === _uid)

      if (indexInItems === -1) {
        state.items[indexInItems === -1].quantity = quantity
      }
    },
    calcAllPrices(state) {
      state.price.net = 0
      state.price.tax = 0
      state.price.gross = 0

      state.items.forEach(it => {
        state.price.net += it.price.sum.net
        state.price.tax += it.price.sum.tax
        state.price.gross += it.price.sum.gross
      })
    },
    clearBasket(state) {
      state.price.net = 0
      state.price.tax = 0
      state.price.gross = 0
      state.items = []
    }
  },
  actions: {
    addItem({ commit, getters, dispatch }, { product, exteriors }) {
      const isCustom = exteriors !== undefined
      const priceItems = isCustom ? getters.extractPriceItems(exteriors) : [{ quantity: 1, ...product }]
      const newItem = {
        _uid: uuidv4(),
        product: clonedeep(product),
        price: getters.calcPrices(priceItems, 1),
        exteriors: isCustom ? clonedeep(exteriors) : [],
        isCustom: isCustom,
        quantity: 1
      }
      const itemsInBasket = getters.itemsByProductId(product.id)
      if (itemsInBasket.length >= 0) {
        let isInBasket = false
        itemsInBasket.forEach(inBasket => {
          if (!isCustom) {
            inBasket.quantity++
            isInBasket = true
            dispatch('calcPricesInBasket', inBasket._uid)
            return
          }

          if (inBasket.price.single.gross !== newItem.price.single.gross) return

          const extHashBasket = hash(inBasket.exteriors.map(removeUid).sort(compareExterior))
          const extHashNew = hash(newItem.exteriors.map(removeUid).sort(compareExterior))
          if (extHashBasket === extHashNew) {
            inBasket.quantity++
            isInBasket = true
            dispatch('calcPricesInBasket', inBasket._uid)
            return
          }
        })
        if (isInBasket) return
      }
      commit('pushItem', newItem)
      commit('calcAllPrices')
    },
    calcPricesInBasket({ commit, getters }, _uid) {
      const item = getters.itemById(_uid)
      const priceItems = item.isCustom ? getters.extractPriceItems(item.exteriors) : [{ quantity: 1, ...item.product }]
      item.price = getters.calcPrices(priceItems, item.quantity)
      commit('calcAllPrices')
    },
    recalcPricesInBasket({ state, commit, getters }) {
      state.items.forEach(item => {
        const priceItems = item.isCustom
          ? getters.extractPriceItems(item.exteriors)
          : [{ quantity: 1, ...item.product }]
        item.price = getters.calcPrices(priceItems, item.quantity)
      })
      commit('calcAllPrices')
    },
    removeItem({ commit }, _uid) {
      commit('removeItem', _uid)
      commit('calcAllPrices')
    },
    setItem({ commit }, { _uid, quantity }) {
      if (quantity === 0) {
        commit('removeItem', _uid)
        return
      }
      commit('setItem', { _uid, quantity })
      commit('calcAllPrices')
    }
  }
}
