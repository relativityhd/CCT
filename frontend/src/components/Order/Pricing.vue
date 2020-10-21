<template>
  <div class="pricing-wrapper">
    <h3>{{ $t('Order.pricing') }}</h3>
    <PricingTable />
    <div class="info-wrapper">
      <p class="pricing-info">{{ $t('Order.pricingInfo') }}</p>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import PricingTable from './PricingTable'

export default {
  name: 'Pricing',
  components: {
    PricingTable
  }
}
</script>

<style lang="scss" scoped>
.pricing-wrapper {
  max-width: 500px;
  margin: 0 auto;
}

.pricing-info {
  text-align: right;
  width: 100%;
}

.info-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
</style>
