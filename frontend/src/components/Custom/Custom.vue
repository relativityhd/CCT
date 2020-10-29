<template>
  <div>
    <div v-if="hasNoProduct">
      <h6>{{ $t('Tool.emptyMessage') }}</h6>
    </div>
    <div v-else class="grid-wrapper">

      <div class="visualization-wrapper">
        <Visualization />
      </div>

      <div class="exteriors-wrapper">
        <h5>{{ $t('Tool.ext.title') }}</h5>
        <Exteriors
          ref="ext"
          :selectables="product.exteriors"
          :exteriors="exteriors"
          :standardMat="product.materials[0]"
          :selectedExt="selectedExt"
          v-on:select="setExterior"
          v-on:change-items="calcSum()"
        />
      </div>

      <div class="interiors-wrapper">
        <h5>{{ $t('Tool.int.title') }}</h5>
        <Interiors
          v-if="hasExtSelected"
          :selectableInteriors="product.interiors"
          :selectableAccessories="product.accessories"
          :ext="selectedExt"
          v-on:change-items="calcSum()"
        />
        <div v-else>
          <p>{{ $t('Tool.int.noExt') }}</p>
          <cv-button @click="$refs.ext.openModal" :icon="Add20" :disabled="!$refs.ext.notFull">
            {{ $t('Tool.ext.add') }}
          </cv-button>
        </div>
      </div>

      <div class="materials-wrapper">
        <h5>{{ $t('Tool.mat.title') }}</h5>
        <Materials
          v-if="hasExtSelected"
          :materials="product.materials"
          :ext="selectedExt"
          v-on:change-items="calcSum()"
        />
        <div v-else>
          <p>{{ $t('Tool.mat.noExt') }}</p>
          <cv-button @click="$refs.ext.openModal" :icon="Add20" :disabled="!$refs.ext.notFull">
            {{ $t('Tool.ext.add') }}
          </cv-button>
        </div>
      </div>

      <div class="info-wrapper">
        <div class="product-body">
          <h3>{{ product.name }}</h3>
          <h6>{{ `${$t('Tool.startingAt')} ${$store.getters.formatPrice(product.price)}` }}</h6>
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
            <cv-link class="back-link" @click="addToCart" :disabled="!exteriors.length">
              {{ $t('Tool.addToCart') }}
            </cv-link>
            <div class="to-cart-button-container">
              <h6>{{ $store.getters.formatPrice(price.single.gross) }}</h6>
              <cv-button
                class="to-cart-button"
                kind="primary"
                to=""
                :icon="DeliveryTruck16"
                :disabled="!exteriors.length"
              >
                {{ $t('Tool.order') }}
              </cv-button>
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
import Materials from './Materials'
import Visualization from '../Visualization/Visualization'
import ProductPricing from '../Product/ProductPricing'
import DeliveryTruck16 from '@carbon/icons-vue/es/delivery-truck/16'
import Add20 from '@carbon/icons-vue/es/add/20'

export default {
  name: 'CustomProduct',
  components: {
    Exteriors,
    Interiors,
    Materials,
    Visualization,
    ProductPricing
  },
  props: {
    product: Object
  },
  data() {
    return {
      DeliveryTruck16,
      Add20,
      hasNoProduct: true,
      exteriors: [],
      selectedExt: {},
      hasExtSelected: false,
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
    this.checkForProduct()
    this.unsubscribe = this.$store.subscribe(mutation => {
      if (mutation.type !== 'setLocation' || this.hasNoProduct) return
      this.calcSum()
    })
  },
  methods: {
    setExterior(_uid) {
      this.selectedExt = this.exteriors.find(ext => ext._uid === _uid) || {}
      this.hasExtSelected = this.selectedExt._uid ? true : false
    },
    checkForProduct() {
      if (this.product === undefined || Object.keys(this.product).length === 0) {
        this.hasNoProduct = true
        return
      }
      this.exteriors = []
      this.selectedExt = {}
      this.selectedExteriorId = ''
      this.hasNoProduct = false
      this.calcSum()
    },
    calcSum() {
      const priceItems = this.$store.getters['basket/extractPriceItems'](this.exteriors)
      this.price = this.$store.getters['basket/calcPrices'](priceItems, 1)
    },
    addToCart() {
      if (this.product === undefined || !this.exteriors.length) return

      this.$store.dispatch('basket/addItem', {
        product: this.product,
        exteriors: this.exteriors
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
.grid-wrapper{
  display: grid;
  grid-template-areas: 
    "ext sel viz viz"
    "ext sel mat info";
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 500px 1fr;
  gap: 10px;
  margin: 0 auto;
}

.visualization-wrapper {
  grid-area: viz;
  height: 500px;
}

.exteriors-wrapper {
  grid-area: ext;
}

.interiors-wrapper {
  grid-area: sel;
}

.materials-wrapper {
  grid-area: mat;
}

.info-wrapper {
  grid-area: info;
  text-align: right;
}

@media screen and (max-width: 1500px) {
  .grid-wrapper{
    grid-template-areas: 
      "ext mat viz"
      "ext sel viz"
      "ext sel info";
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto auto 1fr;
  }
  .visualization-wrapper {
    height: 300px;
  }
}

@media screen and (max-width: 1100px) {
  .grid-wrapper{
    grid-template-areas: 
      "ext viz"
      "ext info"
      "mat info"
      "sel info";
    grid-template-columns: 400px 1fr;
    grid-template-rows: auto auto auto 1fr;
  }
}

@media screen and (max-width: 750px) {
  .grid-wrapper{
    grid-template-areas: 
      "viz"
      "ext"
      "mat"
      "sel"
      "info";
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto auto;
    max-width: 400px;
  }
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
