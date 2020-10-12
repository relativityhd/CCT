function removeProduct (state, basketId) {
  const indexInProducts = state.products.findIndex(
    product => product.basketId === basketId
  )
  if (indexInProducts === -1) return
  state.products.splice(indexInProducts, 1)
}

function compareArrays (array1, array2, key) {
  if (!array1 || !array2) return false
  if (array1.length !== array2.length) return false
  array1.sort()
  array2.sort()
  for (var i = 0; i < array1.length; i++) {
      if (array1[i][key] !== array2[i][key]) return false
      
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
      const indexInProducts = state.products.findIndex(
        product => product.id === id
      )
      if (indexInProducts !== -1) {
        const productInBasket = state.products[indexInProducts]
        if (productInBasket.customized === (customized || false) &&
            productInBasket.width === (width || 0) &&
            productInBasket.height === (height || 0) &&
            productInBasket.depth === (depth || 0) &&
            compareArrays(productInBasket.selectables, (selectables || []), 'id')) {
          productInBasket.quantity++
          return
        }
      }
      state.products.push({
        basketId: state.products.length,
        id,
        info,
        selectables: selectables || [],
        quantity: 1,
        customized: customized || false,
        width: width || 0,
        height: height || 0,
        depth: depth || 0
      })
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
