const testProducts = [
  {
    id: 0,
    quantity: 2,
    customized: false,
    width: 0,
    height: 0,
    depth: 0
  },
  {
    id: 1,
    quantity: 1,
    customized: true,
    width: 5,
    height: 6,
    depth: 7
  }
]

export default {
  state: {
    products: [...testProducts]
  },
  mutations: {
    addProduct(state, { id, customized, width, height, depth }) {
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
        state.basket.products.splice(indexInProducts, 1)
      }
    },
    setProduct(state, { id, quantity, customized, width, height, depth }) {
      const indexInProducts = state.basket.products.findIndex(
        product => product.id === id
      )
      const isInBasket = indexInProducts !== -1

      if (isInBasket) {
        state.basket.products[indexInProducts].quantity = quantity
        if (state.basket.products[indexInProducts].quantity <= 0) {
          state.basket.products.splice(indexInProducts, 1)
        }
      } else if (quantity > 0) {
        state.basket.products.push({
          id,
          quantity: quantity,
          customized: customized || false,
          width: width || 0,
          height: height || 0,
          depth: depth || 0
        })
      }
    }
  }
}
