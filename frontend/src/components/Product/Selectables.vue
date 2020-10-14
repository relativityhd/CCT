<template>
  <div class="selectables-container">
    <cv-tile
      v-for="selectable in selectables"
      :key="selectable.id"
      kind="selectable"
      :selected="selectable.selected"
      @click="$emit('select', {e: $event, id: selectable.id})"
      :value="`${selectable.id}`"
      class="selectable-tile"
    >
      <div class="inner-tile">
        <img class="tile-image" :src="selectable.imageUrl" alt="Image of Selectable" />
        <div class="tile-body">
          <h6>{{ selectable.name }}</h6>
          <p>{{ $store.getters.formatPrice(selectable.price) }}</p>

          <ProductCustomization v-if="selectable.customizable" :custom="selectable.custom" :pname="selectable.name" />
        </div>
      </div>
    </cv-tile>

    <slot></slot>
  </div>
</template>

<script>
import ProductCustomization from './ProductCustomization'

export default {
  name: 'Selectables',
  props: {
    selectables: Array
  },
  components: {
    ProductCustomization
  }
}
</script>

<style lang="scss" scoped>
.selectables-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
}

.selectable-tile {
  width: 100%;
  max-width: 300px;
  margin: 5px;
  text-align: left;
}

.inner-tile {
  display: flex;
  flex-direction: row;
  height: 100%;
}

.tile-image {
  width: 108px;
  height: 108px;
  object-fit: contain;
  background-color: $ui-background;
  margin-right: 10px;
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