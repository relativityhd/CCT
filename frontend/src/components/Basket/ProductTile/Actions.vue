<template>
  <div class="actions-wrapper">
    <cv-number-input
      class="quantity-input"
      :label="$t('quantity')"
      :mobile="$store.state.mobile"
      :invalid-message="invalidMessage"
      :value="item.quantity"
      v-model="item.quantity"
      @input="changeQuantity()"
    ></cv-number-input>
    <cv-icon-button
      class="delete-btn"
      :icon="iconDelete"
      :label="$t('Basket.deleteItem')"
      tip-position="left"
      tip-alignment="start"
      @click="deleteItem()"
    />
  </div>
</template>

<script>
import TrashCan16 from '@carbon/icons-vue/es/trash-can/16'

export default {
  name: 'ProductTileActions',
  props: {
    item: Object
  },
  data() {
    return {
      invalidMessage: '',
      iconDelete: TrashCan16
    }
  },
  methods: {
    changeQuantity() {
      if (!this.$validateNumber(this.item.quantity, 0, 10)) {
        this.invalidMessage = this.$t('invalidNumber', { min: 0, max: 10 })
        return
      }
      this.invalidMessage = ''
      this.$store.dispatch('basket/setItem', {
        _uid: this.item._uid,
        quantity: parseInt(this.item.quantity)
      })
      this.$store.dispatch('basket/calcPricesInBasket', this.item._uid)
    },
    deleteItem() {
      this.$store.dispatch('basket/removeItem', this.item._uid)
    }
  }
}
</script>

<style lang="scss">
.actions-wrapper {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 1fr auto;
  grid-template-areas: 'quantity delete';
  gap: 20px 10px;
}
.quantity-input {
  grid-area: quantity;
  max-width: 100%;
}
.delete-btn {
  grid-area: delete;
  justify-self: center;
  align-self: end;
}
</style>
