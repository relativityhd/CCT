<template>
  <div>
    <cv-button :icon="Edit16" class="show-btn" kind="secondary" @click="showModal">
      {{ $t('show') }}
    </cv-button>

    <cv-modal ref="modal">
      <template slot="label">{{ $store.getters.formatPrice(product.price.sum.gross) }}</template>
      <template slot="title">{{ product.info.name }}</template>

      <template slot="content">
        <cv-button v-if="mode !== 'menu'" :icon="Close16" kind="secondary" @click="goTo('menu')">
          {{ $t('goBack') }}
        </cv-button>

        <div v-if="mode === 'menu'">
          <cv-tag
            v-for="selectable in product.selectables"
            :key="selectable.id"
            :label="selectable.name"
            :kind="selectable.custom.customized ? 'blue' : 'cool-gray'"
          />
          <p>{{ product.info.description }}</p>

          <cv-button v-if="product.info.customizable" :icon="Edit16" kind="secondary" @click="goTo('custom')">
            {{ $t('modes.customize') }}
          </cv-button>

          <cv-button :icon="Categories16" kind="secondary" @click="goTo('selectables')">
            {{ $t('modes.selectables') }}
          </cv-button>

          <cv-button :icon="Tag16" kind="secondary" @click="goTo('pricing')">
            {{ $t('modes.pricing') }}
          </cv-button>
        </div>

        <div v-else-if="mode === 'custom'">
          <ProductCustomization :custom="product.custom" :pname="product.info.name" />
        </div>

        <div v-else-if="mode === 'selectables'">
          <div class="selectables-container">
            <Selectable
              v-for="selectable in selectables"
              :key="selectable.id"
              :selectable="selectable"
              v-on:select="select"
            />
          </div>
        </div>

        <div v-else-if="mode === 'pricing'">
          <ProductPricing :price="product.price" :single="false" />
        </div>
      </template>
    </cv-modal>
  </div>
</template>

<script>
import ProductCustomization from '../../Product/ProductCustomization'
import ProductPricing from '../../Product/ProductPricing'
import Selectable from '../../Product/Selectable'
import Edit16 from '@carbon/icons-vue/es/edit/16'
import Close16 from '@carbon/icons-vue/es/close/16'
import Tag16 from '@carbon/icons-vue/es/tag/16'
import Categories16 from '@carbon/icons-vue/es/categories/16'

export default {
  name: 'EditModal',
  props: {
    product: Object
  },
  data() {
    let selectables =
      this.product === undefined
        ? []
        : this.product.info.selectables.map(s => {
            const sInBasket = this.product.selectables.find(basketS => basketS.id === s.id)
            return (
              sInBasket || {
                ...s,
                selected: false,
                quantity: 0,
                custom: {
                  height: 0,
                  width: 0,
                  depth: 0,
                  customized: false
                }
              }
            )
          })
    return {
      Edit16,
      Close16,
      Tag16,
      Categories16,
      selectables,
      mode: 'menu'
    }
  },
  components: {
    ProductCustomization,
    ProductPricing,
    Selectable
  },
  methods: {
    showModal() {
      this.mode = 'menu'
      this.$refs.modal.show()
    },
    select() {
      this.product.selectables = this.selectables.filter(s => s.selected)
      this.$store.dispatch('basket/calcPricesInBasket', this.product.basketId)
    },
    goTo(mode) {
      this.mode = mode
    }
  }
}
</script>

<style lang="scss" scoped>
.show-btn {
  width: 100%;
}
.selectables-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: $ui-background;
}
</style>

<i18n>
{
  "en": {
    "show": "Edit Product",
    "goBack": "Go Back",
    "modes": {
      "customize": "Customize",
      "selectables": "Edit Selectables",
      "pricing": "View Pricing"
    }
  }
}
</i18n>
