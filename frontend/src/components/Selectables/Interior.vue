<template>
  <div>
    <cv-tile :value="`${interior._uid}`">
      <div>
        <div>
          <img :src="interior.imageUrl" alt="Image of Interior" />

          <div>
            <h6>{{ interior.name }}</h6>
            <p>{{ $store.getters.formatPrice(interior.price) }}</p>
          </div>
        </div>

        <div>
          <cv-number-input
            :label="$t('quantity')"
            :mobile="$store.state.mobile"
            :invalid-message="invalidMessage"
            :value="interior.quantity"
            v-model="interior.quantity"
            @input="changeQuantity()"
          ></cv-number-input>
          <cv-icon-button
            :icon="iconDelete"
            :label="$t('Tool.deleteItem')"
            tip-position="left"
            tip-alignment="start"
            @click="$emit('delete')"
          />
        </div>
      </div>
    </cv-tile>
  </div>
</template>

<script>
import TrashCan16 from '@carbon/icons-vue/es/trash-can/16'

export default {
  name: 'SingleInterior',
  props: {
    interior: Object
  },
  data() {
    return {
      iconDelete: TrashCan16,
      invalidMessage: ''
    }
  },
  methods: {
    changeQuantity() {
      if (!this.$validateNumber(this.interior.quantity, 0, 5)) {
        this.invalidMessage = this.$t('invalidNumber', { min: 0, max: 5 })
        return
      }
      this.invalidMessage = ''
      this.$emit('change-quantity')
    }
  }
}
</script>
