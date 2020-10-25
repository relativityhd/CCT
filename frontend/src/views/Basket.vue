<template>
  <div>
    <h3>{{ $t('Tool.basket') }}</h3>
    <Basket :items="this.$store.state.basket.items" />
  </div>
</template>

<script>
import Basket from '../components/Basket/Basket'

export default {
  name: 'BasketPrice',
  components: { Basket }
}
</script>
