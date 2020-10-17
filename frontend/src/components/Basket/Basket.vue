<template>
  <div class="basket-wrapper">
    <ProductTile v-for="product in products" :key="product.basketId" :product="product" />
    <BasketPricing />
  </div>
</template>

<script>
import ProductTile from './ProductTile/ProductTile'
import BasketPricing from './BasketPricing'

export default {
  name:'Basket',
  props: {
    products: Array
  },
  components: {
    ProductTile,
    BasketPricing
  },
  watchs: {
    products: function () {
      console.log(this.products)
    }
  },
}
</script>

<style lang="scss" scoped>
.basket-wrapper {
  width: 100%;
  max-width: 400px;
  display: grid;
  gap: 20px 20px;
}
</style>
