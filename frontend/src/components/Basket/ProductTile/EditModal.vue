<template>
  <div>
    <cv-button class="show-btn" kind="secondary" @click="showModal">
      {{ $t('show') }}
    </cv-button>

    <cv-modal ref="modal">
      <template slot="label">{{ $store.getters.formatPrice(product.price.gross) }}</template>
      <template slot="title">{{ product.info.name }}</template>
      <template slot="content">
        <ProductCustomization v-if="product.info.customizable" :custom="product.custom" :pname="product.info.name" />
        <div v-else>{{ $t('nonEditable') }}</div>
        <ProductPricing :price="product.price" />

        TODO: Selectables
      </template>
    </cv-modal>
  </div>
</template>

<script>
import ProductCustomization from '../../Product/ProductCustomization'
import ProductPricing from '../../Product/ProductPricing'

export default {
  name: 'EditModal',
  props: {
    product: Object
  },
  components: {
    ProductCustomization,
    ProductPricing
  },
  methods: {
    showModal() {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="scss" scoped>
.show-btn {
  width: 100%;
}
</style>

<i18n>
{
  "en": {
    "show": "View Product in Basket",
    "nonEditable": "This product is not editable!"
  }
}
</i18n>
