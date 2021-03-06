<template>
  <div>
    <!-- Desktop Version -->
    <cv-structured-list class="price-list" v-if="!$store.state.mobile">
      <template slot="headings">
        <cv-structured-list-heading>
          {{ $t('Tool.item') }}
        </cv-structured-list-heading>
        <cv-structured-list-heading>
          {{ $t('price.net') }}
        </cv-structured-list-heading>
        <cv-structured-list-heading>
          {{ `${$t('price.tax')} (${$store.state.locals.vatRate * 100}%)` }}
        </cv-structured-list-heading>
        <cv-structured-list-heading>
          {{ $t('price.gross') }}
        </cv-structured-list-heading>
      </template>

      <template slot="items">
        <cv-structured-list-item v-for="pItem in price.items" :key="pItem._uid">
          <cv-structured-list-data>
            {{ `${pItem.name} (x${pItem.quantity})` }}
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
            <h6 v-if="!single && price.sum.gross !== price.single.gross">{{ $t('price.single') }}</h6>
            <h6 v-else>{{ $t('price.sum') }}</h6>
          </cv-structured-list-data>
          <cv-structured-list-data>
            <h6>
              {{ $store.getters.formatPrice(price.single.net) }}
            </h6>
          </cv-structured-list-data>
          <cv-structured-list-data>
            <h6>
              {{ $store.getters.formatPrice(price.single.tax) }}
            </h6>
          </cv-structured-list-data>
          <cv-structured-list-data>
            <h6>
              {{ $store.getters.formatPrice(price.single.gross) }}
            </h6>
          </cv-structured-list-data>
        </cv-structured-list-item>

        <cv-structured-list-item v-if="!single && price.sum.gross !== price.single.gross">
          <cv-structured-list-data>
            <h6>{{ `${$t('price.sum')} (x${price.quantity})` }}</h6>
          </cv-structured-list-data>
          <cv-structured-list-data>
            <h6>
              {{ $store.getters.formatPrice(price.sum.net) }}
            </h6>
          </cv-structured-list-data>
          <cv-structured-list-data>
            <h6>
              {{ $store.getters.formatPrice(price.sum.tax) }}
            </h6>
          </cv-structured-list-data>
          <cv-structured-list-data>
            <h6>
              {{ $store.getters.formatPrice(price.sum.gross) }}
            </h6>
          </cv-structured-list-data>
        </cv-structured-list-item>
      </template>
    </cv-structured-list>

    <!-- Mobile Version -->
    <cv-structured-list class="price-list" v-else>
      <template slot="headings">
        <cv-structured-list-heading>
          {{ $t('Tool.item') }}
        </cv-structured-list-heading>
        <cv-structured-list-heading>
          {{ $t('price.price') }}
        </cv-structured-list-heading>
      </template>

      <template slot="items">
        <cv-structured-list-item v-for="pItem in price.items" :key="pItem._uid">
          <cv-structured-list-data>
            <h6>{{ `${pItem.name} (x${pItem.quantity})` }}</h6>
            <p>{{ $t('price.net') }}</p>
            <p>{{ `${$t('price.tax')} (${$store.state.locals.vatRate * 100}%)` }}</p>
          </cv-structured-list-data>

          <cv-structured-list-data>
            <p>{{ $store.getters.formatPrice(pItem.gross) }}</p>
            <p>{{ $store.getters.formatPrice(pItem.net) }}</p>
            <p>{{ $store.getters.formatPrice(pItem.tax) }}</p>
          </cv-structured-list-data>
        </cv-structured-list-item>

        <cv-structured-list-item>
          <cv-structured-list-data>
            <h6 v-if="!single && price.sum.gross !== price.single.gross">{{ $t('price.single') }}</h6>
            <h6 v-else>{{ $t('price.sum') }}</h6>
            <p>{{ $t('price.net') }}</p>
            <p>{{ `${$t('price.tax')} (${$store.state.locals.vatRate * 100}%)` }}</p>
          </cv-structured-list-data>
          <cv-structured-list-data>
            <h6>{{ $store.getters.formatPrice(price.single.gross) }}</h6>
            <p>{{ $store.getters.formatPrice(price.single.net) }}</p>
            <p>{{ $store.getters.formatPrice(price.single.tax) }}</p>
          </cv-structured-list-data>
        </cv-structured-list-item>

        <cv-structured-list-item v-if="!single && price.sum.gross !== price.single.gross">
          <cv-structured-list-data>
            <h6>{{ `${$t('price.sum')} (x${price.quantity})` }}</h6>
            <p>{{ $t('price.net') }}</p>
            <p>{{ `${$t('price.tax')} (${$store.state.locals.vatRate * 100}%)` }}</p>
          </cv-structured-list-data>
          <cv-structured-list-data>
            <h6>{{ $store.getters.formatPrice(price.sum.gross) }}</h6>
            <p>{{ $store.getters.formatPrice(price.sum.net) }}</p>
            <p>{{ $store.getters.formatPrice(price.sum.tax) }}</p>
          </cv-structured-list-data>
        </cv-structured-list-item>
      </template>
    </cv-structured-list>
  </div>
</template>

<script>
export default {
  name: 'ProductPricing',
  props: {
    price: Object,
    single: Boolean
  }
}
</script>

<style lang="scss" scoped>
.price-list {
  margin-bottom: 0;
  width: 100%;
  text-align: left;
}
</style>
