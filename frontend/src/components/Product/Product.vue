<template>
  <div class="product-wrapper">
    <div class="is-emtpy" v-if="hasNoProduct">
      <h6>{{ $t('emptyMessage') }}</h6>
    </div>
    <div class="product-container" v-else>
      <ProductInfo class="product-info" :product="product" />

      <div class="product-custom">
        <div class="selectables-container">
          <Selectable
            class="selectables-container"
            v-for="selectable in selectables"
            :key="selectable.id"
            :selectable="selectable"
            v-on:select="select"
          />
          <ProductCustomization v-if="product.customizable" :custom="custom" :pname="product.name" />
        </div>
      </div>

      <div class="product-pricing">
        <ProductPricing :price="price" />
        <div class="to-cart-button-container">
          <h6>{{ $store.getters.formatPrice(price.gross) }}</h6>
          <cv-button class="to-cart-button" kind="primary" @click="addToCart">
            {{ $t('addToCart') }}
          </cv-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductInfo from './ProductInfo'
import Selectable from './Selectable'
import ProductCustomization from './ProductCustomization'
import ProductPricing from './ProductPricing'

export default {
  name: 'Product',
  components: {
    ProductInfo,
    Selectable,
    ProductCustomization,
    ProductPricing
  },
  props: {
    product: Object
  },
  data() {
    return {
      hasNoProduct: true,
      selectables: [],
      custom: {
        height: 0,
        width: 0,
        depth: 0,
        customized: false
      },
      price: {
        net: 0,
        tax: 0,
        gross: 0,
        items: []
      }
    }
  },
  watch: {
    product: function() {
      if (this.product === undefined) {
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
    }
  },
  mounted() {
    this.unsubscribe = this.$store.subscribe(mutation => {
      if (mutation.type !== 'setLocation' || this.product === undefined) return
      this.calcSum()
    })
    if (this.product !== undefined) {
      this.calcSum()
    }
  },
  methods: {
    calcSub(price) {
      const sub = this.$store.state.locals.subQuotient || 100
      return parseInt(Math.round(price * sub))
    },
    calcSubBack(price) {
      const sub = this.$store.state.locals.subQuotient || 100
      return price / sub
    },
    calcNet(gross) {
      return parseInt(gross / (1 + this.$store.state.locals.vatRate))
    },
    calcSum() {
      const gross = this.calcSub(this.product.price)
      const net = this.calcNet(gross)
      this.price.items = [
        {
          name: this.product.name,
          net: this.calcSubBack(net),
          tax: this.calcSubBack(gross - net),
          gross: this.calcSubBack(gross)
        }
      ]
      this.selectables
        .filter(s => s.selected)
        .forEach(s => {
          const gross = this.calcSub(s.price)
          const net = this.calcNet(gross)
          this.price.items.push({
            name: `${s.name} (x${s.quantity})`,
            net: this.calcSubBack(net * s.quantity),
            tax: this.calcSubBack((gross - net) * s.quantity),
            gross: this.calcSubBack(gross * s.quantity)
          })
        })
      this.price.net = this.price.items.reduce((a, b) => a + (b.net || 0), 0)
      this.price.tax = this.price.items.reduce((a, b) => a + (b.tax || 0), 0)
      this.price.gross = this.price.items.reduce((a, b) => a + (b.gross || 0), 0)
    },
    select() {
      this.calcSum()
    },
    addToCart() {
      if (this.product === undefined) return

      this.calcSum()

      this.$store.commit('basket/addProduct', {
        id: this.product.id,
        info: this.product,
        price: this.price,
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
  align-items: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
}

.to-cart-button-container {
  width: 100%;
  margin: 20px 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.to-cart-button-container h6 {
  margin-right: 5px;
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

<i18n>
{
  "en": {
    "addToCart": "Add to cart",
    "emptyMessage": "Please select a Product"
  }
}
</i18n>
