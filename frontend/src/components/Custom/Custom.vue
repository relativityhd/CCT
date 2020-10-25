<template>
  <div class="product-wrapper">
    <div class="is-emtpy" v-if="hasNoProduct">
      <h6>{{ $t('Tool.emptyMessage') }}</h6>
    </div>
    <div class="product-container" v-else>
      <div class="visualization-wrapper">
        <Visualization />
      </div>

      <div class="selection-wrapper">
        <div class="exteriors-wrapper">
          <Exteriors
            :selectables="product.exteriors"
            :exteriors="exteriors"
            v-on:change-items="calcSum()"
            v-on:select="setExterior"
          />
        </div>

        <div class="interiors-wrapper">
          <Interiors
            v-if="hasExtSelected"
            :selectables="product.interiors"
            :interiors="interiors"
            v-on:change-items="calcSum()"
          />
          <p v-else>{{ $t('Tool.noExteriorSelected') }}</p>
        </div>

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
                <template slot="title">{{ $t('Tool.costCalculation') }}</template>
                <template slot="content">
                  <ProductPricing :price="price" :single="true" />
                </template>
              </cv-accordion-item>
            </cv-accordion>
            <div class="to-cart-button-wrapper">
              <cv-link class="back-link" @click="$emit('back')">
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
      </div>
    </div>
  </div>
</template>

<script>
import Exteriors from './Exteriors'
import Interiors from './Interiors'
import Visualization from '../Visualization/Visualization'
import ProductPricing from '../Product/ProductPricing'
import ShoppingCart20 from '@carbon/icons-vue/es/shopping--cart/20'

export default {
  name: 'CustomProduct',
  components: {
    Exteriors,
    Interiors,
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
      interiors: [],
      hasExtSelected: false,
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
    setExterior(_uid) {
      const selectedExterior = this.exteriors.find(ext => ext._uid === _uid)
      console.log('--DEBUG : setExterior -> selectedExterior', selectedExterior)
      this.interiors = selectedExterior ? selectedExterior.interiors : []
      console.log('--DEBUG : setExterior -> this.interiors', this.interiors)
      this.hasExtSelected = selectedExterior ? true : false
    },
    checkForProduct() {
      if (this.product === undefined || Object.keys(this.product).length === 0) {
        this.hasNoProduct = true
        return
      }
      this.exteriors = []
      this.interiors = []
      this.selectedExteriorId = ''
      this.hasNoProduct = false
      this.calcSum()
    },
    calcSum() {
      this.price = this.$store.getters['basket/calcPrices'](
        this.product,
        [], //this.selectables.filter(s => s.selected),
        1
      )
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
