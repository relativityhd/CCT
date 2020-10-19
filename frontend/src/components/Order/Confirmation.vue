<template>
  <div>
    {{ $t('Order.waitForResponse') }}
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'OrderConfirmation',
  mounted () {
    const postObject = {
      orderDate: (new Date()).toISOString(),
      country: this.$store.state.locals.location,
      customer: this.$store.getters['customer/customerData'](),
      price: this.$store.getters['basket/orderPrice'](),
      products: this.$store.getters['basket/orderProducts']()
    }
    console.log('--DEBUG : mounted -> postObject', postObject)
    Vue.axios.post('/order', postObject)
      .then(res => {
        console.log('--DEBUG : mounted -> res', res)
      }).catch(err => {
        console.log('--DEBUG : mounted -> err', err)
      })
  }
}
</script>
