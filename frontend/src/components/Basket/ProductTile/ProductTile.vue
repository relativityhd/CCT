<template>
  <cv-tile>

    <h3>{{product.info.name}}</h3>
    <h6>{{$store.getters.formatPrice(product.price.gross)}}</h6>

    <Actions class="Actions" :product="product" />

    <ProductCustomization
      class="custom"
      v-if="product.info.customizable"
      :custom="product.custom"
      :pname="product.info.name" />

    <Selectables :selectables="product.selectables" />
  </cv-tile>
</template>

<script>
import Actions from './Actions'
import ProductCustomization from '../../Product/ProductCustomization'
import Selectables from './Selectables'

export default {
  name: 'ProductTile',
  props: {
    product: Object
  },
  components: {
    Actions,
    ProductCustomization,
    Selectables
  }
}
</script>

<i18n>
{
  "en": {
    "width": "Width",
    "height": "Height",
    "depth": "Depth",
    "yes": "Yes",
    "no": "No"
  }
}
</i18n>
