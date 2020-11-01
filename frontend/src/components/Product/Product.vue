<template>
  <div>
    <div class="is-emtpy" v-if="hasNoProduct">
      <h6>{{ $t('Tool.emptyMessage') }}</h6>
    </div>
    <div class="product-container" v-else>
      <ProductInfo :product="product" />

      <br />

      <cv-accordion>
        <cv-accordion-item class="price-list-container">
          <template slot="title">{{ $t('Tool.costCalculation') }}</template>
          <template slot="content">
            <ProductPricing :price="price" :single="true" />
          </template>
        </cv-accordion-item>
      </cv-accordion>

      <div class="to-cart-button-wrapper">
        <cv-link class="back-link" @click="goBack">
          {{ $t('Tool.chooseAnother') }}
        </cv-link>
        <div class="to-cart-button-container">
          <h6>{{ $store.getters.formatPrice(price.single.gross) }}</h6>
          <cv-button class="to-cart-button" kind="primary" @click="addToCart" :icon="ShoppingCart20">
            {{ $t('Tool.addToCart') }}
          </cv-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductInfo from './ProductInfo'
import ProductPricing from './ProductPricing'
import ShoppingCart20 from '@carbon/icons-vue/es/shopping--cart/20'

export default {
  name: 'Product',
  components: {
    ProductInfo,
    ProductPricing
  },
  props: {
    product: Object
  },
  data() {
    return {
      ShoppingCart20,
      hasNoProduct: true,
      price: {
        single: {
          net: 0,
          tax: 0,
          gross: 0
        },
        items: []
      }
    }
  },
  watch: {
    product: function() {
      this.checkForProduct()
    }
  },
  mounted() {
    this.unsubscribe = this.$store.subscribeAction(action => {
      if (action.type !== 'setLocation' || this.product === undefined) return
      this.calcSum()
    })
    this.checkForProduct()
  },
  methods: {
    goBack() {
      this.$emit('back')
    },
    checkForProduct() {
      if (this.product === undefined || Object.keys(this.product).length === 0) {
        this.hasNoProduct = true
        return
      }
      this.hasNoProduct = false
      this.calcSum()
    },
    calcSum() {
      this.price = this.$store.getters['basket/calcPrices']([{ quantity: 1, ...this.product }], 1)
    },
    addToCart() {
      if (this.product === undefined) return

      this.$store.dispatch('basket/addItem', {
        product: this.product
      })
      this.$root.$emit('openBasket')
    }
  },
  beforeDestroy() {
    this.unsubscribe()
  }
}
</script>

<style lang="scss" scoped>
.product-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.to-cart-button-wrapper {
  width: 100%;
  margin: 20px 0;
  display: grid;
  grid-auto-flow: column;
  justify-items: end;
  align-items: center;
}

.to-cart-button-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.to-cart-button-container h6 {
  margin-right: 5px;
}

.back-link {
  justify-self: flex-start;
  cursor: pointer;
}
</style>
