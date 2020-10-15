<template>
  <cv-tile>

    <h3>{{product.info.name}}</h3>
    <h6>{{$store.getters.formatPrice(product.price.gross)}}</h6>

    <Actions class="Actions" :product="product" />

    <EditModal :product="product" />

    <cv-tag
      v-for="selectable in product.selectables"
      :key="selectable.id"
      :label="selectable.name"
      :kind="selectable.custom.customized ? 'blue' : 'cool-gray'"
    />

    <cv-tag v-if="product.custom.customized" :label="$t('customized')" kind="purple" />
  </cv-tile>
</template>

<script>
import Actions from './Actions'
import EditModal from './EditModal'

export default {
  name: 'ProductTile',
  props: {
    product: Object
  },
  components: {
    Actions,
    EditModal
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
    "no": "No",
    "customized": "Customized"
  }
}
</i18n>
