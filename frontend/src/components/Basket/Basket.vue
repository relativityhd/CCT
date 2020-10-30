<template>
  <div class="basket-wrapper">
    <ProductTile v-for="it in items" :key="it._uid" :item="it" />
    <BasketPricing :prices="$store.state.basket.price" />
  </div>
</template>

<script>
import ProductTile from './ProductTile/ProductTile'
import BasketPricing from './BasketPricing'

export default {
  name: 'Basket',
  props: {
    items: Array
  },
  components: {
    ProductTile,
    BasketPricing
  }
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
