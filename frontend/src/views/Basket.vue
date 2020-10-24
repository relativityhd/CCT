<template>
  <div>
    <h3>{{ $t('Tool.basket') }}</h3>
    <Basket :products="this.$store.state.basket.products" />
  </div>
</template>

<script>
import Basket from '../components/Basket/Basket'

export default {
  name: 'BasketPrice',
  components: { Basket }
}
</script>
