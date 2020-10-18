<template>
  <div>
    <cv-button :icon="Edit16" class="show-btn" kind="secondary" @click="showModal">
      {{ $t('Basket.edit') }}
    </cv-button>

    <cv-modal ref="modal">
      <template slot="label">{{ $store.getters.formatPrice(product.price.sum.gross) }}</template>
      <template slot="title">{{ product.info.name }}</template>

      <template slot="content">
        <div class="content-wrapper">
          <cv-button class="back-btn" v-if="mode !== 'menu'" :icon="Undo16" kind="secondary" @click="goTo('menu')">
            {{ $t('Basket.goBack') }}
          </cv-button>

          <div class="menu" v-if="mode === 'menu'">
            <cv-tag
              v-for="selectable in product.selectables"
              :key="selectable.id"
              :label="selectable.name"
              :kind="selectable.custom.customized ? 'blue' : 'cool-gray'"
            />
            <p>{{ product.info.description }}</p>

            <div class="btn-wrapper">
              <cv-button v-if="product.info.customizable" :icon="Edit16" kind="secondary" @click="goTo('custom')">
                {{ $t('Basket.modes.customize') }}
              </cv-button>

              <cv-button :icon="Categories16" kind="secondary" @click="goTo('selectables')">
                {{ $t('Basket.modes.selectables') }}
              </cv-button>

              <cv-button :icon="Tag16" kind="secondary" @click="goTo('pricing')">
                {{ $t('Basket.modes.pricing') }}
              </cv-button>
            </div>
          </div>

          <div v-else-if="mode === 'custom'" class="custom">
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
import Undo16 from '@carbon/icons-vue/es/undo/16'
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
      Undo16,
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
  flex-direction: row;
  flex-wrap: wrap;
  background-color: $ui-background;
}

.content-wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.btn-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.btn-wrapper .cv-button {
  margin: 5px 0;
}

.menu {
  max-width: 300px;
  text-align: left;
}

.back-btn {
  margin-bottom: 15px;
}
</style>
