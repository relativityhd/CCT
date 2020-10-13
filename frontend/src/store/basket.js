function removeProduct (state, basketId) {
  const indexInProducts = state.products.findIndex(
    product => product.basketId === basketId
  )
  if (indexInProducts === -1) return
  state.products.splice(indexInProducts, 1)
}

function compareArrays (array1, array2) {
  if (!array1 || !array2) return false
  if (array1.length !== array2.length) return false
  array1.sort()
  array2.sort()
  for (var i = 0; i < array1.length; i++) {
      if (
        array1[i].id !== array2[i].id ||
        (array1[i].customized || false) !== (array2[i].customized || false) ||
        (array1[i].custom.width || 0) !== (array2[i].custom.width || 0) ||
        (array1[i].custom.height || 0) !== (array2[i].custom.height || 0) ||
        (array1[i].custom.depth || 0) !== (array2[i].custom.depth || 0)
        ) return false
  }
  return true
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
        selectables: selectables.map(s => {
          if (s.customized === false) {
            s.custom = {width: 0, height: 0, depth: 0}
          }
          return s
        }) || [],
        quantity: 1,
        customized: customized || false,
        width: customized ? (width || 0) : 0,
        height: customized ? (height || 0) : 0,
        depth: customized ? (depth || 0) : 0
      }

      const productsInBasket = state.products.filter(
        product => product.id === id
      )
      if (productsInBasket.length >= 0) {
        let inBasket = false
        productsInBasket.forEach(productInBasket => {
          if (productInBasket.customized === newProduct.customized &&
              productInBasket.width === newProduct.width &&
              productInBasket.height === newProduct.height &&
              productInBasket.depth === newProduct.depth &&
              compareArrays(productInBasket.selectables, newProduct.selectables)) {
            productInBasket.quantity++
            inBasket = true
            console.log('--DEBUG : newProduct -> state.products', state.products)
            return
          }
        })
        if (inBasket) return
      }
      state.products.push(newProduct)
      console.log('--DEBUG : newProduct -> state.products', state.products)
    },
    removeProduct(state, basketId) {
      removeProduct(state, basketId)
    },
    setProduct(state, { basketId, quantity}) {
      if (quantity === 0) {
        removeProduct(state, basketId)
        return
      }
      const indexInProducts = state.products.findIndex(
        product => product.basketId === basketId
      )

      if (indexInProducts !== -1) {
        state.products[indexInProducts].quantity = quantity
        return
      }
    }
  }
}
