<template>
  <cv-accordion class="custom-container">
    <cv-accordion-item>
      <template slot="title">{{ `${$t('customize')} ${product.name}` }}</template>
      <template slot="content">
        <cv-number-input
          :label="$t('width')"
          v-model="custom.width"
          :mobile="$store.state.mobile"
        ></cv-number-input>

        <br />

        <cv-number-input
          :label="$t('height')"
          v-model="custom.height"
          :mobile="$store.state.mobile"
        ></cv-number-input>

        <br />

        <cv-number-input
          :label="$t('depth')"
          v-model="custom.depth"
          :mobile="$store.state.mobile"
        ></cv-number-input>
      </template>
    </cv-accordion-item>
  </cv-accordion>
</template>

<script>
export default {
  name: 'ProductCustomization',
  props: {
    product: Object,
    custom: Object
  }
}
</script>

<style lang="scss" scoped>
.custom-container {
  width: 100%;
  max-width: 300px;
  margin: 5px;
}
</style>

<i18n>
{
  "en": {
    "customize": "Customize",
    "width": "Width in cm",
    "height": "Height in cm",
    "depth": "Depth in cm"
  }
}
</i18n>
