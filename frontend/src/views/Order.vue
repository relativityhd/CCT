<template>
  <div class="order-wrapper" v-if="$store.state.basket.items.length">
    <Userdata />
    <Pricing />
    <div class="btns">
      <cv-button :icon="ShoppingCart16" kind="secondary" @click="$router.push('/tool')">
        {{ $t('Order.shop') }}
      </cv-button>
      <cv-button
        :icon="PageLast16"
        kind="primary"
        @click="toNext"
        :disabled="$store.state.customer.hasInvalids"
      >
        {{ $t('Order.order') }}
      </cv-button>
    </div>
    
  </div>
  <div v-else>
    <h6>{{ $t('Basket.noItems') }}</h6>
    <br />
    <cv-button class="to-shop-btn" :icon="ShoppingCart16" @click="$router.push('/tool')">
      {{ $t('Order.backToShop') }}
    </cv-button>
  </div>
</template>

<script>
import Pricing from '../components/Order/Pricing'
import Userdata from '../components/Order/Userdata'
import PageLast16 from '@carbon/icons-vue/es/page--last/16'
import ShoppingCart16 from '@carbon/icons-vue/es/shopping--cart/20'

export default {
  name: 'OrderPage',
  components: {
    Pricing,
    Userdata
  },
  data() {
    return {
      PageLast16,
      ShoppingCart16
    }
  },
  mounted() {
    this.$store.commit('customer/resetInvalids')
    this.$store.dispatch('customer/validate')
  },
  methods: {
    toNext() {
      this.$store.commit('customer/resetInvalids')
      this.$store.dispatch('customer/validate')
      this.$store.dispatch('customer/validateMessages')
      if (this.$store.state.customer.hasInvalids) return
      else this.$router.push('/sendorder')
    }
  }
}
</script>

<style lang="scss" scoped>
.order-wrapper {
  width: 98%;
  max-width: 1000px;
  margin: 0 auto;
}

.btns {
  width: 100%;
  max-width: 752px;
  margin: 0 auto;
}

.btns button {
  margin: 5px;
}
</style>
