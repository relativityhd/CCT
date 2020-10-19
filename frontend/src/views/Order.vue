<template>
  <div class="order-wrapper">
    <keep-alive>
      <component ref="component" :is="currentComponent"></component>
    </keep-alive>

    <div class="button-wrapper">
      <cv-button v-if="back" :icon="PageFirst16" kind="secondary" @click="toBack">
        {{ $t(back) }}
      </cv-button>
      <cv-button v-if="to" :icon="PageLast16" kind="primary" @click="toNext">
        {{ $t(to) }}
      </cv-button>
    </div>
    
  </div>
</template>

<script>
import PageLast16 from '@carbon/icons-vue/es/page--last/16'
import PageFirst16 from '@carbon/icons-vue/es/page--first/16'

export default {
  name: 'OrderPage',
  components: {
    Pricing: () => import(/* webpackChunkName: "OrderPricing" */ '../components/Order/Pricing'),
    Userdata: () => import(/* webpackChunkName: "OrderUserdata" */ '../components/Order/Userdata'),
    Confirmation: () => import(/* webpackChunkName: "OrderConfirmation" */ '../components/Order/Confirmation')
  },
  data() {
    return {
      PageFirst16,
      PageLast16,
      current: 0,
      components: [
        { to: 'Order.userdata', from: 'Order.shop', src: 'Pricing' },
        { to: 'Order.order', from: 'Order.pricing', src: 'Userdata' },
        { to: false, from: false, src: 'Confirmation' }
      ],
      unableToOrder: false
    }
  },
  computed: {
    to: function() {
      return this.components[this.current].to
    },
    back: function() {
      return this.components[this.current].from
    },
    currentComponent: function() {
      return this.components[this.current].src
    }
  },
  methods: {
    toBack() {
      this.$store.commit('customer/resetInvalids')
      if (this.current === 0 || this.current === 2) this.$router.push('/tool')
      else this.current--
    },
    toNext() {
      this.$store.commit('customer/resetInvalids')
      if (this.current === 1) {
        this.$store.dispatch('customer/validate')
        if (this.$store.state.customer.hasInvalids) return
      }
      if (this.current < 2) this.current++
    }
  }
}
</script>

<style lang="scss" scoped>
.order-wrapper {
  width: 98%;
  max-width: 500px;
  margin: 0 auto;
}

.button-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: end;
  width: 100%;
  margin-top: 15px;
}
</style>
