<template>
  <div>
    <cv-button kind="secondary" @click="showModal">
      {{ $t('show') }}
    </cv-button>

    <cv-modal ref="modal">
      <template slot="label">{{ $store.getters.formatPrice(product.price.gross) }}</template>
      <template slot="title">{{ product.info.name }}</template>
      <template slot="content">
        <ProductCustomization v-if="product.info.customizable" :custom="product.custom" :pname="product.info.name" />
      </template>
    </cv-modal>
  </div>
</template>

<script>
import ProductCustomization from '../../Product/ProductCustomization'

export default {
  name: 'EditModal',
  props: {
    product: Object
  },
  components: {
    ProductCustomization
  },
  methods: {
    showModal () {
      this.$refs.modal.show()
    }
  }
}
</script>

<i18n>
{
  "en": {
    "show": "Edit Product in Basket"
  }
}
</i18n>
