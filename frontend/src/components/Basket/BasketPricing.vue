<template>
  <div>
    <div class="checkout-container">
      <cv-button :icon="Tag16" kind="secondary" @click="showModal">
        {{ $t('Basket.show') }}
      </cv-button>
    </div>

    <div class="checkout-container">
      <h6>{{ $store.getters.formatPrice(prices.gross) }}</h6>
      <cv-button :icon="DeliveryTruck16" kind="primary" @click="checkout">
        {{ $t('Basket.checkout') }}
      </cv-button>
    </div>

    <cv-modal ref="modal">
      <template slot="label">{{ $store.getters.formatPrice(prices.gross) }}</template>
      <template slot="title">{{ $t('Basket.pricing') }}</template>

      <template slot="content">
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
                v-for="item in products"
                :key="`${item.basketId}`"
                :value="`${item.basketId}`"
                aria-label-expand-row="Go large"
                aria-label-collapse-row="Go small"
              >
                <cv-data-table-cell>{{ item.info.name }}</cv-data-table-cell>
                <cv-data-table-cell v-if="!$store.state.mobile">
                  {{ $store.getters.formatPrice(item.price.sum.net) }}
                </cv-data-table-cell>
                <cv-data-table-cell v-if="!$store.state.mobile">
                  {{ $store.getters.formatPrice(item.price.sum.tax) }}
                </cv-data-table-cell>
                <cv-data-table-cell>{{ $store.getters.formatPrice(item.price.sum.gross) }}</cv-data-table-cell>

                <template slot="expandedContent">
                  <ProductPricing :price="item.price" :single="false" />
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
    </cv-modal>
  </div>
</template>

<script>
import ProductPricing from '../Product/ProductPricing'
import Tag16 from '@carbon/icons-vue/es/tag/16'
import DeliveryTruck16 from '@carbon/icons-vue/es/delivery-truck/16'

export default {
  name: 'BasketPricing',
  components: {
    ProductPricing
  },
  props: {
    products: Array,
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
    },
    checkout() {
      console.log('to Checkout!')
    }
  }
}
</script>

<style lang="scss">
.bx--data-table-container {
  min-width: 0;
}

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
