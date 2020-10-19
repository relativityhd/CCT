<template>
  <div class="product-wrapper">
    <div class="is-emtpy" v-if="hasNoProduct">
      <h6>{{ $t('Product.emptyMessage') }}</h6>
    </div>
    <div class="product-container" v-else>
      <ProductInfo class="product-info" :product="product" />

      <div class="product-custom">
        <div class="selectables-container">
          <Selectable
            v-for="selectable in selectables"
            :key="selectable.id"
            :selectable="selectable"
            v-on:select="select"
          />
        </div>
      </div>

      <div class="product-pricing">
        <cv-accordion>
          <cv-accordion-item v-if="product.customizable">
            <template slot="title">{{ `${$t('customize')} ${product.name}` }}</template>
            <template slot="content">
              <ProductCustomization class="custom-container" :custom="custom" />
            </template>
          </cv-accordion-item>

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
</template>

<script>
import ProductInfo from './ProductInfo'
import Selectable from './Selectable'
import ProductPricing from './ProductPricing'
import ShoppingCart20 from '@carbon/icons-vue/es/shopping--cart/20'

export default {
  name: 'Product',
  components: {
    ProductInfo,
    Selectable,
    ProductCustomization: () => import(/* webpackChunkName: "ProductCustomization" */ './ProductCustomization'),
    ProductPricing
  },
  props: {
    product: Object
  },
  data() {
    return {
      ShoppingCart20,
      hasNoProduct: true,
      selectables: [],
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
      this.selectables = this.product.selectables.map(s => ({
        ...s,
        selected: false,
        quantity: 0,
        custom: {
          height: 0,
          width: 0,
          depth: 0,
          customized: false
        }
      }))
      this.calcSum()
    },
    calcSum() {
      this.price = this.$store.getters['basket/calcPrices'](
        this.product,
        this.selectables.filter(s => s.selected),
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
.product-container {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'info custom'
    'pricing custom';
  gap: 20px 10px;
  justify-content: center;
  justify-items: center;
}

.product-info {
  grid-area: info;
  width: 100%;
  max-width: 400px;
}

.product-custom {
  grid-area: custom;
  width: 100%;
  max-width: 620px;
}

.product-pricing {
  grid-area: pricing;
  width: 100%;
  max-width: 400px;
}

.selectables-container {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
}

.custom-container {
  max-width: 300px;
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

@media (max-width: 1060px) {
  .product-container {
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
      'info'
      'custom'
      'pricing';
  }

  .product-info,
  .product-custom,
  .product-pricing {
    max-width: 400px;
  }
}
</style>
