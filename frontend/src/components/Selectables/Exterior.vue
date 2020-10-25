<template>
  <div>
    <cv-tile kind="clickable" @click="$emit('select')" :value="`${exterior._uid}`">
      <div>
        <div>
          <img :src="exterior.imageUrl" alt="Image of Exterior" />

          <div>
            <h6>{{ exterior.name }}</h6>
            <p>{{ $store.getters.formatPrice(exterior.price) }}</p>
          </div>
        </div>

        <div>
          <cv-number-input
            :label="$t('quantity')"
            :mobile="$store.state.mobile"
            :invalid-message="invalidMessage"
            :value="exterior.quantity"
            v-model="exterior.quantity"
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

        <div>
          <cv-accordion v-if="exterior.customizable">
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
import TrashCan16 from '@carbon/icons-vue/es/trash-can/16'
import ProductCustomization from '../Product/ProductCustomization'

export default {
  name: 'SingleExterior',
  components: {
    ProductCustomization
  },
  props: {
    exterior: Object
  },
  data() {
    return {
      iconDelete: TrashCan16,
      invalidMessage: '',
      custom: {
        customized: false,
        width: 0,
        height: 0,
        depth: 0
      }
    }
  },
  methods: {
    changeQuantity() {
      if (!this.$validateNumber(this.exterior.quantity, 0, 5)) {
        this.invalidMessage = this.$t('invalidNumber', { min: 0, max: 5 })
        return
      }
      this.invalidMessage = ''
      this.$emit('change-quantity')
    }
  }
}
</script>
