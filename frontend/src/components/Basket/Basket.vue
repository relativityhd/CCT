<template>
  <div class="basket-wrapper">
    <ProductTile v-for="it in items" :key="it._uid" :item="it" />
  </div>
</template>

<script>
import ProductTile from './ProductTile/ProductTile'

export default {
  name: 'Basket',
  props: {
    items: Array
  },
  components: {
    ProductTile
  }
}
</script>

<style lang="scss" scoped>
.basket-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;

  justify-content: center;
}
</style>
