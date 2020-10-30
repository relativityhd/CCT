<template>
  <div class="order-wrapper" v-if="$store.state.basket.items.length">
    <keep-alive>
      <component ref="component" :is="currentComponent">
        <div class="button-wrapper">
          <cv-button v-if="back" :icon="PageFirst16" kind="secondary" @click="toBack">
            {{ $t(back) }}
          </cv-button>
          <cv-button
            v-if="to"
            :icon="PageLast16"
            kind="primary"
            @click="toNext"
            :disabled="current === 1 && $store.state.customer.hasInvalids"
          >
            {{ $t(to) }}
          </cv-button>
        </div>
      </component>
    </keep-alive>
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
import PageLast16 from '@carbon/icons-vue/es/page--last/16'
import PageFirst16 from '@carbon/icons-vue/es/page--first/16'
import ShoppingCart16 from '@carbon/icons-vue/es/shopping--cart/20'

export default {
  name: 'OrderPage',
  components: {
    Pricing: () => import(/* webpackChunkName: "OrderPricing" */ '../components/Order/Pricing'),
    Userdata: () => import(/* webpackChunkName: "OrderUserdata" */ '../components/Order/Userdata')
  },
  data() {
    return {
      PageFirst16,
      PageLast16,
      ShoppingCart16,
      current: 0,
      components: [
        { to: 'Order.userdata', from: 'Order.shop', src: 'Pricing' },
        { to: 'Order.order', from: 'Order.pricing', src: 'Userdata' }
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
      this.$store.dispatch('customer/validate')
      if (this.current === 0 || this.current === 2) this.$router.push('/tool')
      else this.current--
    },
    toNext() {
      this.$store.commit('customer/resetInvalids')
      this.$store.dispatch('customer/validate')
      if (this.current === 1) {
        this.$store.dispatch('customer/validateMessages')
        if (this.$store.state.customer.hasInvalids) return
        else this.$router.push('/sendorder')
      }
      if (this.current < 1) this.current++
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

.button-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  margin-top: 15px;
}
</style>
