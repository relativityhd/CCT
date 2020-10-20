<template>
  <div>
    <div v-if="emptyBasket">
      <h6>{{ $t('Basket.noItems') }}</h6>
      <br />
      <cv-button class="to-shop-btn" :icon="ShoppingCart16" @click="$router.push('/tool')">
        {{ $t('Order.backToShop') }}
      </cv-button>
    </div>
    <div v-else-if="!responsed">
      <h3>{{ $t('Order.sendOrder') }}</h3>
      <h6>{{ $t('Order.waitForResponse') }}</h6>
    </div>
    <div v-else>
      <div v-if="!errored">
        <h3>{{ $t('Order.sucessfull') }}</h3>
        <h6>{{ `${$t('Order.orderId')} ${orderId}` }}</h6>
      </div>
      <div v-else>
        <h6>{{ $t('Order.failed') }}</h6>
      </div>
      <cv-button class="to-shop-btn" :icon="ShoppingCart16" @click="$router.push('/tool')">
        {{ $t('Order.backToShop') }}
      </cv-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import ShoppingCart16 from '@carbon/icons-vue/es/shopping--cart/20'

export default {
  name: 'OrderConfirmation',
  data() {
    return {
      ShoppingCart16,
      orderId: 0,
      responsed: false,
      errored: false,
      emptyBasket: false
    }
  },
  mounted() {
    if (this.$store.state.basket.products.length === 0) {
      this.emptyBasket = true
      return
    }
    const postObject = {
      orderDate: new Date().toISOString(),
      country: this.$store.state.locals.location,
      customer: this.$store.getters['customer/customerData'](),
      price: this.$store.getters['basket/orderPrice'](),
      products: this.$store.getters['basket/orderProducts']()
    }
    Vue.axios
      .post('/order', postObject)
      .then(res => {
        this.responsed = true
        this.orderId = res.data.orderId
        this.$store.commit('basket/emptyBasket')
      })
      .catch(() => {
        this.responsed = true
        this.errored = true
      })
  }
}
</script>

<style lang="scss" scoped>
.to-shop-btn {
  margin-top: 15px;
}
</style>
