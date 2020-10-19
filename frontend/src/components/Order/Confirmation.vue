<template>
  <div>
    <div v-if="!responsed">
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
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'OrderConfirmation',
  data() {
    return {
      orderId: 0,
      responsed: false,
      errored: false
    }
  },
  mounted () {
    const postObject = {
      orderDate: (new Date()).toISOString(),
      country: this.$store.state.locals.location,
      customer: this.$store.getters['customer/customerData'](),
      price: this.$store.getters['basket/orderPrice'](),
      products: this.$store.getters['basket/orderProducts']()
    }
    console.log('--DEBUG : mounted -> postObject', postObject)
    Vue.axios
      .post('/order', postObject)
      .then(res => {
        this.responsed = true
        this.orderId = res.data.orderId
      }).catch(err => {
        console.log('--DEBUG : mounted -> err', err)
        this.responsed = true
        this.errored = true
      })
  }
}
</script>
