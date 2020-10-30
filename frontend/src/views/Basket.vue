<template>
  <div>
    <h1>{{ $t('Basket.title') }}</h1>
    <div class="basket-container">
      <Basket :items="this.$store.state.basket.items" />
      <BasketPricing :prices="$store.state.basket.price" />
    </div>
  </div>
</template>

<script>
import Basket from '../components/Basket/Basket'
import BasketPricing from '../components/Basket/BasketPricing'

export default {
  name: 'BasketPrice',
  components: { Basket, BasketPricing }
}
</script>

<style lang="scss" scoped>
.basket-container {
  width: 98%;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
