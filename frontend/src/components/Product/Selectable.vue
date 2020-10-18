<template>
  <cv-tile
    kind="selectable"
    :selected="selectable.selected"
    @click="select($event)"
    :value="`${selectable.id}`"
    v-model="selectable.selected"
    class="selectable-tile"
  >
    <div class="inner-tile">
      <img class="tile-image" :src="selectable.imageUrl" alt="Image of Selectable" />
      <div class="tile-body">
        <h6>{{ selectable.name }}</h6>
        <p>{{ $store.getters.formatPrice(selectable.price) }}</p>
        <cv-number-input
          class="quantity-input"
          :label="$t('quantity')"
          :mobile="$store.state.mobile"
          :invalid-message="invalidMessage"
          :value="selectable.quantity"
          v-model="selectable.quantity"
          @input="changeQuantity()"
        ></cv-number-input>
      </div>
      <div class="tile-custom">
        <cv-accordion class="custom-container" v-if="selectable.customizable">
          <cv-accordion-item>
            <template slot="title">{{ `${$t('customize')} ${selectable.name}` }}</template>
            <template slot="content">
              <ProductCustomization :custom="selectable.custom" />
            </template>
          </cv-accordion-item>
        </cv-accordion>
        <p v-else>{{ $t('Product.notEditable') }}</p>
      </div>
    </div>
  </cv-tile>
</template>

<script>
import ProductCustomization from './ProductCustomization'

export default {
  name: 'Selectable',
  props: {
    selectable: Object
  },
  components: {
    ProductCustomization
  },
  data() {
    return {
      invalidMessage: ''
    }
  },
  methods: {
    changeQuantity() {
      if (Number.isNaN(parseInt(this.selectable.quantity))) {
        this.invalidMessage = this.$t('invalidNumber', { min: 0, max: 1000 })
        return
      }
      this.invalidMessage = ''
      this.selectable.selected = parseInt(this.selectable.quantity) > 0
      this.$emit('select')
    },
    select: function(e) {
      this.selectable.selected = e.target.checked
      if (this.selectable.selected) {
        this.selectable.quantity = this.selectable.quantity <= 0 ? 1 : this.selectable.quantity
      } else {
        this.selectable.quantity = 0
      }
      this.$emit('select')
    }
  }
}
</script>

<style lang="scss" scoped>
.selectable-tile {
  width: 100%;
  max-width: 300px;
  margin: 5px;
  text-align: left;
}

.inner-tile {
  display: grid;
  gap: 20px 10px;
  width: 100%;
  height: 100%;
  grid-template-columns: auto;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'img body'
    'custom custom';
  justify-content: center;
  justify-items: center;
}

.tile-image {
  width: 96px;
  height: 96px;
  object-fit: contain;
  background-color: $ui-background;
  grid-area: img;
}

.tile-body {
  grid-area: body;
}

.tile-custom {
  grid-area: custom;
  width: 100%;
}

.custom-container {
  width: 100%;
}
</style>
