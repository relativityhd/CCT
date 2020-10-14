<template>
  <cv-accordion>
    <cv-accordion-item class="price-list-container">
      <template slot="title">{{ $t('costCalculation') }}</template>
      <template slot="content">
        <cv-structured-list class="price-list">
          <template slot="headings">
            <cv-structured-list-heading>
              {{ $t('priceList.name') }}
            </cv-structured-list-heading>
            <cv-structured-list-heading>
              {{ $t('priceList.net') }}
            </cv-structured-list-heading>
            <cv-structured-list-heading>
              {{ `${$t('priceList.tax')} (${$store.state.locals.vatRate * 100}%)` }}
            </cv-structured-list-heading>
            <cv-structured-list-heading>
              {{ $t('priceList.gross') }}
            </cv-structured-list-heading>
          </template>

          <template slot="items">
            <cv-structured-list-item v-for="pItem in price.items" :key="pItem.name">
              <cv-structured-list-data>
                {{ pItem.name }}
              </cv-structured-list-data>
              <cv-structured-list-data>
                {{ $store.getters.formatPrice(pItem.net) }}
              </cv-structured-list-data>
              <cv-structured-list-data>
                {{ $store.getters.formatPrice(pItem.tax) }}
              </cv-structured-list-data>
              <cv-structured-list-data>
                {{ $store.getters.formatPrice(pItem.gross) }}
              </cv-structured-list-data>
            </cv-structured-list-item>

            <cv-structured-list-item>
              <cv-structured-list-data>
                <h6>{{ $t('sum') }}</h6>
              </cv-structured-list-data>
              <cv-structured-list-data>
                <h6>
                  {{ $store.getters.formatPrice(price.net) }}
                </h6>
              </cv-structured-list-data>
              <cv-structured-list-data>
                <h6>
                  {{ $store.getters.formatPrice(price.tax) }}
                </h6>
              </cv-structured-list-data>
              <cv-structured-list-data>
                <h6>
                  {{ $store.getters.formatPrice(price.gross) }}
                </h6>
              </cv-structured-list-data>
            </cv-structured-list-item>
          </template>
        </cv-structured-list>
      </template>
    </cv-accordion-item>
  </cv-accordion>
</template>

<script>
export default {
  name: 'ProductPricing',
  props: {
    price: Object
  }
}
</script>

<style lang="scss" scoped>
.price-list {
  margin-bottom: 0;
  width: 100%;
}
</style>

<i18n>
{
  "en": {
    "sum": "Sum",
    "costCalculation": "Price Calculation",
    "priceList": {
      "name": "Item",
      "net": "Net",
      "gross": "Gross",
      "tax": "Tax"
    }
  }
}
</i18n>
