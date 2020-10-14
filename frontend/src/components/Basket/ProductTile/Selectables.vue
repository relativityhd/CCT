<template>
  <cv-accordion>
    <cv-accordion-item>
      <template slot="title">{{ $t('title') }}</template>
      <template slot="content">
        <div
          v-for="selectable in selectables"
          :key="selectable.id">
          <h6>{{selectable.name}}</h6>
          <ProductCustomization
            class="custom"
            v-if="selectable.customizable"
            :custom="selectable.custom"
            :pname="selectable.name" />
        </div>
      </template>
    </cv-accordion-item>
  </cv-accordion>
</template>

<script>
import ProductCustomization from '../../Product/ProductCustomization'

export default {
  name: 'ProductTileSelectables',
  props: {
    selectables: Array
  },
  components: {
    ProductCustomization
  }
}
</script>

<i18n>
{
  "en": {
    "title": "Selectables"
  }
}
</i18n>
