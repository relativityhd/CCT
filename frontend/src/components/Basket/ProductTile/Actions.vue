<template>
  <div>
    <cv-number-input
      label=""
      :mobile="$store.state.mobile"
      :invalid-message="invalidMessage"
      :value="product.quantity"
      v-model="product.quantity"
      @input="changeQuantity()"
    ></cv-number-input>
    <cv-icon-button
      :icon="iconDelete"
      :label="$t('deleteItem')"
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
  data () {
    return {
      invalidMessage: '',
      iconDelete: TrashCan16
    }
  },
  methods: {
    changeQuantity() {
      if (Number.isNaN(parseInt(this.product.quantity))) {
        this.invalidMessage = this.$t('invalidNumber')
        return
      }
      if (parseInt(this.product.quantity) <= 0) {
        this.invalidMessage = this.$t('invalidNumber')
        return
      }
      this.invalidMessage = ''
      this.$store.commit('basket/setProduct', {
        basketId: this.product.basketId,
        quantity: parseInt(this.product.quantity)
      })
    },
    deleteItem() {
      this.$store.commit('basket/removeProduct', this.product.basketId)
    }
  }
}
</script>

<i18n>
{
  "en": {
    "invalidNumber": "Must be a number larger than 0!",
    "deleteItem": "Remove item from your basket"
  }
}
</i18n>
