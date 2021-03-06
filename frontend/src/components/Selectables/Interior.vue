<template>
  <div :class="{ inactive: quantity === 0, active: quantity !== 0 }">
    <cv-tile :class="{ 'inactive-tile': quantity === 0 }" :value="`${interior.id}`">
      <div class="int-wrapper">
        <img class="int-img" :src="interior.imageUrl" :alt="$t('altMsg', { name: interior.name })" />

        <div class="int-info">
          <h6>{{ interior.name }}</h6>
          <p>{{ $store.getters.formatPrice(interior.price) }}</p>
        </div>

        <div class="int-actions" v-if="quantity !== 0">
          <cv-number-input
            :label="$t('quantity')"
            :mobile="$store.state.mobile"
            :invalid-message="invalidMessage"
            :value="quantity"
            v-model="quantity"
            @input="changeQuantity"
          ></cv-number-input>
          <cv-icon-button
            class="delete-btn"
            :icon="iconDelete"
            :label="$t('Tool.int.delete')"
            tip-position="left"
            tip-alignment="start"
            @click="deleteItem"
          />
        </div>
        <div class="int-actions" v-else>
          <cv-button class="add-btn" :icon="iconAdd" @click="addItem">
            {{ $t('Tool.int.add', { name: interior.name }) }}
          </cv-button>
        </div>
      </div>
    </cv-tile>
  </div>
</template>

<script>
import TrashCan16 from '@carbon/icons-vue/es/trash-can/16'
import Add16 from '@carbon/icons-vue/es/add/16'

export default {
  name: 'SingleInterior',
  props: {
    interior: Object,
    ext: Object
  },
  data() {
    const intInExt = this.ext.interiors.find(int => int.id === this.interior.id)
    return {
      iconDelete: TrashCan16,
      iconAdd: Add16,
      invalidMessage: '',
      quantity: intInExt ? intInExt.quantity : 0
    }
  },
  methods: {
    calcValidHeights() {
      const itemHeight = 18
      const maxHeight = this.ext.custom.height
      const otherItems = this.ext.interiors
        .filter(int => int.id !== this.interior.id)
        .reduce((prev, int) => (prev += itemHeight * int.quantity), 0)
      return parseInt((maxHeight - otherItems) / itemHeight)
    },
    addItem() {
      this.quantity = 1
      const maxItems = this.calcValidHeights()
      if (!this.$validateNumber(this.quantity, 0, maxItems)) {
        this.invalidMessage = this.$t('invalidNumber', { min: 0, max: maxItems })
        return
      }
      this.$emit('add', this.interior.id)
    },
    changeQuantity() {
      const maxItems = this.calcValidHeights()
      if (!this.$validateNumber(this.quantity, 0, maxItems)) {
        this.invalidMessage = this.$t('invalidNumber', { min: 0, max: maxItems })
        return
      }
      this.invalidMessage = ''
      this.$emit('change-quantity', this.interior.id, this.quantity)
    },
    deleteItem() {
      this.quantity = 0
      this.invalidMessage = ''
      this.$emit('delete', this.interior.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.active {
  margin: 1px;
}

.inactive {
  border: 1px dashed $ui-04;
}

.inactive:hover {
  outline: 2px solid $interactive-03;
  outline-offset: -2px;
}

.inactive-tile {
  opacity: 0.3;
}

.inactive-tile:hover {
  opacity: 1;
}

.int-wrapper {
  display: grid;
  grid-template-areas:
    'img actions'
    'info info';
  gap: 5px;
}

.int-img {
  width: 64px;
  height: 64px;
  object-fit: contain;
  background-color: $ui-background;
  grid-area: img;
}

.int-info {
  grid-area: info;
  text-align: left;
}

.int-actions {
  grid-area: actions;
  display: grid;
  grid-auto-flow: column;
}

.delete-btn {
  justify-self: center;
  align-self: end;
}

.add-btn {
  align-self: end;
  width: 220px;
}
</style>
