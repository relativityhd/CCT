<template>
  <cv-tile
    kind="selectable"
    :selected="selected"
    @click="select($event)"
    :value="`${selectable.id}`"
    v-model="selected"
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
          :value="quantity"
          v-model="quantity"
          @input="changeQuantity()"
        ></cv-number-input>
      </div>
      <div class="tile-custom">
        <cv-accordion class="custom-container" v-if="customizable">
          <cv-accordion-item>
            <template slot="title">{{ `${$t('customize')} ${selectable.name}` }}</template>
            <template slot="content">
              <ProductCustomization :custom="custom" />
            </template>
          </cv-accordion-item>
        </cv-accordion>
      </div>
    </div>
  </cv-tile>
</template>

<script>
export default {
  name: 'Selectable',
  props: {
    selectable: Object,
    customizable: Boolean
  },
  components: {
    ProductCustomization: () => import(/* webpackChunkName: "ProductCustomization" */ '../Product/ProductCustomization')
  },
  data() {
    return {
      invalidMessage: '',
      selected: false,
      quantity: 0,
      custom: {
        customized: false,
        height: 0,
        width: 0,
        depth: 0
      }
    }
  },
  methods: {
    changeQuantity() {
      if (!this.$validateNumber(this.quantity, 0, 10)) {
        this.invalidMessage = this.$t('invalidNumber', { min: 0, max: 10 })
        return
      }
      this.invalidMessage = ''
      this.selected = parseInt(this.quantity) > 0
    },
    select: function(e) {
      this.selected = e.target.checked
      if (this.selected) {
        this.quantity = this.quantity <= 0 ? 1 : this.quantity
      } else {
        this.quantity = 0
      }
    },
    getInputs() {
      return { selected: this.selected, quantity: this.quantity, custom: this.custom }
    },
    clearInputs() {
      this.selected = false
      this.quantity = 0
      this.custom.customized = false
      this.custom.width = 0
      this.custom.height = 0
      this.custom.depth = 0
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
