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
    addProduct(state, { id, info, price, selectables, custom }) {
      let newBasketId = 0
      while (state.products.findIndex(p => p.basketId === newBasketId) !== -1) {
        newBasketId++
      }
      const newProduct = {
        basketId: newBasketId,
        id,
        info: { ...info },
        price: { ...price },
        selectables:
          selectables.map(s => {
            const newS = { ...s }
            newS.custom = s.custom.customized ? { ...s.custom } : {
              height: 0,
              width: 0,
              depth: 0,
              customized: false
            }
            return newS
          }) || [],
        quantity: 1,
        custom: custom.customized ? { ...custom } : {
          height: 0,
          width: 0,
          depth: 0,
          customized: false
        }
      }

      const productsInBasket = state.products.filter(product => product.id === id)
      if (productsInBasket.length >= 0) {
        let inBasket = false
        productsInBasket.forEach(productInBasket => {
          if (
            hash({ ...productInBasket.custom }) === hash({ ...newProduct.custom }) &&
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
