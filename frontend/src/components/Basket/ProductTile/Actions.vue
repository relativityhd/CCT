<template>
  <div class="actions-wrapper">
    <cv-number-input
      class="quantity-input"
      :label="$t('quantity')"
      :mobile="$store.state.mobile"
      :invalid-message="invalidMessage"
      :value="product.quantity"
      v-model="product.quantity"
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
    product: Object
  },
  data() {
    return {
      invalidMessage: '',
      iconDelete: TrashCan16
    }
  },
  methods: {
    changeQuantity() {
      if (Number.isNaN(parseInt(this.product.quantity))) {
        this.invalidMessage = this.$t('invalidNumber', { min: 0, max: 1000 })
        return
      }
      if (parseInt(this.product.quantity) <= 0) {
        this.invalidMessage = this.$t('invalidNumber', { min: 0, max: 1000 })
        return
      }
      this.invalidMessage = ''
      this.$store.dispatch('basket/setProduct', {
        basketId: this.product.basketId,
        quantity: parseInt(this.product.quantity)
      })
      this.$store.dispatch('basket/calcPricesInBasket', this.product.basketId)
    },
    deleteItem() {
      this.$store.dispatch('basket/removeProduct', this.product.basketId)
    }
  }
}
</script>

<style lang="scss">
.actions-wrapper {
  display: grid;
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
