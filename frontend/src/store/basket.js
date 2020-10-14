import * as hash from 'object-hash'

function removeProduct(state, basketId) {
  const indexInProducts = state.products.findIndex(product => product.basketId === basketId)
  if (indexInProducts === -1) return
  state.products.splice(indexInProducts, 1)
}

function compareSelectable(a, b) {
  return a.id - b.id
}

export default {
  namespaced: true,
  state: {
    products: []
  },
  mutations: {
    addProduct(state, { id, info, selectables, customized, width, height, depth }) {
      let newBasketId = 0
      while (state.products.findIndex(p => p.basketId === newBasketId) !== -1) {
        newBasketId++
      }
      const newProduct = {
        basketId: newBasketId,
        id,
        info,
        selectables:
          selectables.map(s => {
            const newS = { ...s }
            if (newS.customized === false) {
              newS.custom = { width: 0, height: 0, depth: 0 }
            } else {
              newS.custom = { ...s.custom }
            }
            return newS
          }) || [],
        quantity: 1,
        customized: customized || false,
        width: customized ? width || 0 : 0,
        height: customized ? height || 0 : 0,
        depth: customized ? depth || 0 : 0
      }

      const productsInBasket = state.products.filter(product => product.id === id)
      if (productsInBasket.length >= 0) {
        let inBasket = false
        productsInBasket.forEach(productInBasket => {
          if (
            productInBasket.customized === newProduct.customized &&
            productInBasket.width === newProduct.width &&
            productInBasket.height === newProduct.height &&
            productInBasket.depth === newProduct.depth &&
            hash(productInBasket.selectables.sort(compareSelectable)) ===
              hash(newProduct.selectables.sort(compareSelectable))
          ) {
            productInBasket.quantity++
            inBasket = true
            return
          }
        })
        if (inBasket) return
      }
      state.products.push(newProduct)
    },
    removeProduct(state, basketId) {
      removeProduct(state, basketId)
    },
    setProduct(state, { basketId, quantity }) {
      if (quantity === 0) {
        removeProduct(state, basketId)
        return
      }
      const indexInProducts = state.products.findIndex(product => product.basketId === basketId)

      if (indexInProducts !== -1) {
        state.products[indexInProducts].quantity = quantity
        return
      }
    }
  }
}
