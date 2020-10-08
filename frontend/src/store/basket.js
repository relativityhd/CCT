export default {
  state: {
    products: []
  },
  mutations: {
    addProduct(state, id, customized, width, height, depth) {
      const indexInProducts = state.basket.products.findIndex(
        product => product.id === id
      )
      const isInBasket = indexInProducts !== -1
      if (isInBasket) {
        state.basket.products[indexInProducts].quantity++
      } else {
        state.basket.products.push({
          id,
          quantity: 1,
          customized: customized || false,
          width: width || 0,
          height: height || 0,
          depth: depth || 0
        })
      }
    },
    removeProduct(state, id) {
      const indexInProducts = state.basket.products.findIndex(
        product => product.id === id
      )
      const isInBasket = indexInProducts !== -1
      if (isInBasket) {
        state.basket.products[indexInProducts].quantity--
        if (state.basket.products[indexInProducts].quantity <= 0) {
          state.basket.products.splice(indexInProducts, 1)
        }
      }
    }
  }
}
