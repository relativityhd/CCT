<template>
  <div>
    <cv-tile
      kind="selectable"
      :selected="selected"
      @click="select($event)"
      :value="`${exterior.id}`"
      v-model="selected"
      class="exterior-tile"
    >
      <div class="inner-tile">
        <img class="tile-image" :src="exterior.imageUrl" alt="Image of Exterior" />
        <div class="tile-body">
          <h6>{{ exterior.name }}</h6>
          <p>{{ $store.getters.formatPrice(exterior.price) }}</p>
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
          <cv-accordion class="custom-container" v-if="exterior.customizable">
            <cv-accordion-item>
              <template slot="title">{{ `${$t('customize')} ${exterior.name}` }}</template>
              <template slot="content">
                <ProductCustomization :custom="custom" />
              </template>
            </cv-accordion-item>
          </cv-accordion>
          <p v-else>{{ $t('Product.notEditable') }}</p>
        </div>
      </div>
    </cv-tile>
  </div>
</template>

<script>
export default {
  name: 'SingleExterior',
  props: {
    interior: Object
  },
  data() {return {
    selected: false,
    invalidMessage: '',
    quantity: 0,
    custom: {
      customized: false,
      width: 0,
      height: 0,
      depth: 0
    }
  }},
  methods: {
    changeQuantity() {
      if (Number.isNaN(parseInt(this.exterior.quantity))) {
        this.invalidMessage = this.$t('invalidNumber', { min: 0, max: 10 })
        return
      }
      this.invalidMessage = ''
      this.selected = parseInt(this.quantity) > 0
      this.$emit('select')
    },
    select: function(e) {
      this.selected = e.target.checked
      if (this.selected) {
        this.quantity = this.quantity <= 0 ? 1 : this.quantity
      } else {
        this.quantity = 0
      }
      this.$emit('select')
    }
  }
}
</script>
