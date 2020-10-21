<template>
  <div>
    <div class="checkout-container">
      <cv-button :icon="Tag16" kind="secondary" @click="showModal">
        {{ $t('Basket.show') }}
      </cv-button>
    </div>

    <div class="checkout-container">
      <h6>{{ $store.getters.formatPrice(prices.gross) }}</h6>
      <cv-button :icon="DeliveryTruck16" kind="primary" @click="$router.push('/order')">
        {{ $t('Basket.checkout') }}
      </cv-button>
    </div>

    <cv-modal ref="modal">
      <template slot="label">{{ $store.getters.formatPrice(prices.gross) }}</template>
      <template slot="title">{{ $t('Basket.pricing') }}</template>

      <template slot="content">
        <OrderPricing />
      </template>
    </cv-modal>
  </div>
</template>

<script>
import Tag16 from '@carbon/icons-vue/es/tag/16'
import DeliveryTruck16 from '@carbon/icons-vue/es/delivery-truck/16'

export default {
  name: 'BasketPricing',
  components: {
    OrderPricing: () => import(/* webpackChunkName: "OrderPricingTable" */ '../Order/PricingTable')
  },
  props: {
    prices: Object
  },
  data() {
    return {
      Tag16,
      DeliveryTruck16
    }
  },
  methods: {
    showModal() {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="scss" scoped>
.checkout-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 15px;
}

.checkout-container h6 {
  margin-right: 5px;
}
</style>
