<template>
  <div>
    <cv-data-table :pagination="false" :overflow-menu="false" :has-expand-all="false" ref="table">
      <template slot="headings">
        <cv-data-table-heading :heading="$t('Basket.item')" />
        <cv-data-table-heading v-if="!$store.state.mobile" :heading="$t('price.net')" />
        <cv-data-table-heading
          v-if="!$store.state.mobile"
          :heading="`${$t('price.tax')} (${$store.state.locals.vatRate * 100}%)`"
        />
        <cv-data-table-heading :heading="$t('price.gross')" />
      </template>

      <template slot="data">
        <cv-data-table-row
          v-for="it in items"
          :key="`${it._uid}`"
          :value="`${it._uid}`"
          aria-label-expand-row="Go large"
          aria-label-collapse-row="Go small"
        >
          <cv-data-table-cell>{{ it.product.name }}</cv-data-table-cell>
          <cv-data-table-cell v-if="!$store.state.mobile">
            {{ $store.getters.formatPrice(it.price.sum.net) }}
          </cv-data-table-cell>
          <cv-data-table-cell v-if="!$store.state.mobile">
            {{ $store.getters.formatPrice(it.price.sum.tax) }}
          </cv-data-table-cell>
          <cv-data-table-cell>{{ $store.getters.formatPrice(it.price.sum.gross) }}</cv-data-table-cell>

          <template slot="expandedContent">
            <ProductPricing :price="it.price" :single="false" />
          </template>
        </cv-data-table-row>

        <cv-data-table-row value="sum">
          <cv-data-table-cell>
            <h6>{{ $t('price.sum') }}</h6>
          </cv-data-table-cell>
          <cv-data-table-cell v-if="!$store.state.mobile">
            {{ $store.getters.formatPrice(prices.net) }}
          </cv-data-table-cell>
          <cv-data-table-cell v-if="!$store.state.mobile">
            {{ $store.getters.formatPrice(prices.tax) }}
          </cv-data-table-cell>
          <cv-data-table-cell>
            <h6>{{ $store.getters.formatPrice(prices.gross) }}</h6>
          </cv-data-table-cell>
          <template slot="expandedContent" v-if="$store.state.mobile">
            <cv-structured-list>
              <template slot="items">
                <cv-structured-list-item>
                  <cv-structured-list-data>
                    <h6>{{ $t('price.sum') }}</h6>
                    <p>{{ $t('price.net') }}</p>
                    <p>{{ `${$t('price.tax')} (${$store.state.locals.vatRate * 100}%)` }}</p>
                  </cv-structured-list-data>
                  <cv-structured-list-data>
                    <h6>{{ $store.getters.formatPrice(prices.gross) }}</h6>
                    <p>{{ $store.getters.formatPrice(prices.net) }}</p>
                    <p>{{ $store.getters.formatPrice(prices.tax) }}</p>
                  </cv-structured-list-data>
                </cv-structured-list-item>
              </template>
            </cv-structured-list>
          </template>
        </cv-data-table-row>
      </template>
    </cv-data-table>
  </div>
</template>

<script>
import ProductPricing from '../Product/ProductPricing'

export default {
  name: 'OrderPricing',
  components: {
    ProductPricing
  },
  data() {
    return {
      items: this.$store.state.basket.items,
      prices: this.$store.state.basket.price
    }
  }
}
</script>

<style lang="scss">
.bx--data-table-container {
  min-width: 0;
}
</style>
