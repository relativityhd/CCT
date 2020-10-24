<template>
  <div class="product-wrapper">
    <div class="is-emtpy" v-if="hasNoProduct">
      <h6>{{ $t('Product.emptyMessage') }}</h6>
    </div>
    <div class="product-container" v-else>
      <div class="visualization-wrapper">
        <Visualization />
      </div>

      <div class="selection-wrapper">
        <div class="exteriors-wrapper">
          <Exteriors :selectables="product.exteriors" :exteriors="exteriors" v-on:change-items="calcSum()" />
        </div>

        <div class="interiors-wrapper"></div>

        <div class="materials-wrapper"></div>

        <div class="product-info">
          <div class="product-body">
            <h3>{{ product.name }}</h3>
            <h6>{{ $store.getters.formatPrice(product.price) }}</h6>
            <p>{{ product.description }}</p>
          </div>

          <div class="product-pricing">
            <cv-accordion>
              <cv-accordion-item class="price-list-container">
                <template slot="title">{{ $t('Product.costCalculation') }}</template>
                <template slot="content">
                  <ProductPricing :price="price" :single="true" />
                </template>
              </cv-accordion-item>
            </cv-accordion>
            <div class="to-cart-button-wrapper">
              <cv-link class="back-link" @click="goBack">
                {{ $t('Product.chooseAnother') }}
              </cv-link>
              <div class="to-cart-button-container">
                <h6>{{ $store.getters.formatPrice(price.single.gross) }}</h6>
                <cv-button class="to-cart-button" kind="primary" @click="addToCart" :icon="ShoppingCart20">
                  {{ $t('Product.addToCart') }}
                </cv-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Exteriors from './Exteriors'
import Visualization from '../Visualization/Visualization'
import ProductPricing from '../Product/ProductPricing'
import ShoppingCart20 from '@carbon/icons-vue/es/shopping--cart/20'

export default {
  name: 'CustomProduct',
  components: {
    Exteriors,
    Visualization,
    ProductPricing
  },
  props: {
    product: Object
  },
  data() {
    return {
      ShoppingCart20,
      hasNoProduct: true,
      exteriors: [],
      custom: {
        height: 0,
        width: 0,
        depth: 0,
        customized: false
      },
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
    this.unsubscribe = this.$store.subscribe(mutation => {
      if (mutation.type !== 'setLocation' || this.product === undefined) return
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
      this.product.exteriors.forEach(exterior => {
        exterior.selected = false
      })
      this.product.interiors.forEach(interior => {
        interior.selected = false
      })
      this.product.materials.forEach(material => {
        material.selected = false
      })
      this.calcSum()
    },
    calcSum() {
      this.price = this.$store.getters['basket/calcPrices'](
        this.product,
        [], //this.selectables.filter(s => s.selected),
        1
      )
    },
    select() {
      this.calcSum()
    },
    addToCart() {
      if (this.product === undefined) return

      this.$store.dispatch('basket/addProduct', {
        id: this.product.id,
        info: this.product,
        selectables: this.selectables.filter(s => s.selected),
        custom: this.custom
      })
    }
  },
  beforeDestroy() {
    this.unsubscribe()
  }
}
</script>

<style lang="scss" scoped>
.visualization-wrapper {
  height: 500px;
}
</style>
