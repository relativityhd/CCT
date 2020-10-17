<template>
  <div class="product-wrapper">
    <div class="is-emtpy" v-if="hasNoProduct">
      <h6>{{ $t('Product.emptyMessage') }}</h6>
    </div>
    <div class="product-container" v-else>
      <div class="product-info">
        <img class="product-image" :src="product.imageUrl" alt="Image of Product" />
        <div class="product-body">
          <h3>{{ product.name }}</h3>
          <h6>{{ $store.getters.formatPrice(product.price) }}</h6>
          <p>{{ product.description }}</p>
        </div>
      </div>

      <div class="product-custom">
        <div class="selectables-container">
          <cv-tile
            v-for="selectable in selectables"
            :key="selectable.id"
            kind="selectable"
            :selected="selectable.selected"
            @click="select($event, selectable.id)"
            :value="`${selectable.id}`"
            class="selectable-tile"
          >
            <div class="inner-tile">
              <img class="tile-image" :src="selectable.imageUrl" alt="Image of Selectable" />
              <div class="tile-body">
                <h6>{{ selectable.name }}</h6>
                <p>{{ $store.getters.formatPrice(selectable.price) }}</p>

                <cv-accordion class="custom-container" v-if="selectable.customizable">
                  <cv-accordion-item>
                    <template slot="title">{{ $t('Product.customize') }}</template>
                    <template slot="content">
                      <cv-number-input
                        :label="$t('Product.width')"
                        v-model="selectable.custom.width"
                        :mobile="$store.state.mobile"
                      ></cv-number-input>

                      <br />

                      <cv-number-input
                        :label="$t('Product.height')"
                        v-model="selectable.custom.height"
                        :mobile="$store.state.mobile"
                      ></cv-number-input>

                      <br />

                      <cv-number-input
                        :label="$t('Product.depth')"
                        v-model="selectable.custom.depth"
                        :mobile="$store.state.mobile"
                      ></cv-number-input>
                    </template>
                  </cv-accordion-item>
                </cv-accordion>
              </div>
            </div>
          </cv-tile>

          <cv-accordion class="custom-container" v-if="product.customizable">
            <cv-accordion-item>
              <template slot="title">{{ $t('Product.customize') }}</template>
              <template slot="content">
                <cv-number-input
                  :label="$t('Product.width')"
                  v-model="custom.width"
                  :mobile="$store.state.mobile"
                ></cv-number-input>

                <br />

                <cv-number-input
                  :label="$t('Product.height')"
                  v-model="custom.height"
                  :mobile="$store.state.mobile"
                ></cv-number-input>

                <br />

                <cv-number-input
                  :label="$t('Product.depth')"
                  v-model="custom.depth"
                  :mobile="$store.state.mobile"
                ></cv-number-input>
              </template>
            </cv-accordion-item>
          </cv-accordion>
        </div>
      </div>

      <div class="product-pricing">
        <cv-accordion>
          <cv-accordion-item class="price-list-container">
            <template slot="title">{{ $t('Product.costCalculation') }}</template>
            <template slot="content">
              <cv-structured-list class="price-list">
                <template slot="headings">
                  <cv-structured-list-heading>
                    {{ $t('Product.priceList.name') }}
                  </cv-structured-list-heading>
                  <cv-structured-list-heading>
                    {{ $t('Product.priceList.net') }}
                  </cv-structured-list-heading>
                  <cv-structured-list-heading>
                    {{ `${$t('Product.priceList.tax')} (${$store.state.locals.vatRate * 100}%)` }}
                  </cv-structured-list-heading>
                  <cv-structured-list-heading>
                    {{ $t('Product.priceList.gross') }}
                  </cv-structured-list-heading>
                </template>

                <template slot="items">
                  <cv-structured-list-item v-for="pItem in price.items" :key="pItem.name">
                    <cv-structured-list-data>
                      {{ pItem.name }}
                    </cv-structured-list-data>
                    <cv-structured-list-data>
                      {{ $store.getters.formatPrice(pItem.net) }}
                    </cv-structured-list-data>
                    <cv-structured-list-data>
                      {{ $store.getters.formatPrice(pItem.tax) }}
                    </cv-structured-list-data>
                    <cv-structured-list-data>
                      {{ $store.getters.formatPrice(pItem.gross) }}
                    </cv-structured-list-data>
                  </cv-structured-list-item>

                  <cv-structured-list-item>
                    <cv-structured-list-data>
                      <h6>{{ $t('Product.sum') }}</h6>
                    </cv-structured-list-data>
                    <cv-structured-list-data>
                      <h6>
                        {{ $store.getters.formatPrice(price.net) }}
                      </h6>
                    </cv-structured-list-data>
                    <cv-structured-list-data>
                      <h6>
                        {{ $store.getters.formatPrice(price.tax) }}
                      </h6>
                    </cv-structured-list-data>
                    <cv-structured-list-data>
                      <h6>
                        {{ $store.getters.formatPrice(price.gross) }}
                      </h6>
                    </cv-structured-list-data>
                  </cv-structured-list-item>
                </template>
              </cv-structured-list>
            </template>
          </cv-accordion-item>
        </cv-accordion>

        <div class="to-cart-button-container">
          <h6>{{ $store.getters.formatPrice(price.gross) }}</h6>
          <cv-button class="to-cart-button" kind="primary" @click="addToCart">
            {{ $t('Product.addToCart') }}
          </cv-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Product',
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
        depth: 0
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
        custom: {
          height: 0,
          width: 0,
          depth: 0
        }
      }))
      this.calcSum()
    }
  },
  mounted() {
    this.unsubscribe = this.$store.subscribe(mutation => {
      if (mutation.type !== 'setLocation') return
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
            name: s.name,
            net: this.calcSubBack(net),
            tax: this.calcSubBack(gross - net),
            gross: this.calcSubBack(gross)
          })
        })
      this.price.net = this.price.items.reduce((a, b) => a + (b.net || 0), 0)
      this.price.tax = this.price.items.reduce((a, b) => a + (b.tax || 0), 0)
      this.price.gross = this.price.items.reduce((a, b) => a + (b.gross || 0), 0)
    },
    select(e, id) {
      let selectable = this.selectables.find(s => s.id === id)
      selectable.selected = e.target.checked
      this.calcSum()
    },
    addToCart() {
      if (this.product === undefined) return

      const selectables = this.selectables
        .filter(s => s.selected)
        .map(s => {
          const customized = s.custom.width !== 0 && s.custom.height !== 0 && s.custom.depth !== 0
          return { ...s, customized }
        })

      const width = this.custom.width
      const height = this.custom.height
      const depth = this.custom.depth

      const customized = this.product.customizable === true && width !== 0 && height !== 0 && depth !== 0

      this.$store.commit('basket/addProduct', {
        id: this.product.id,
        info: { ...this.product },
        selectables,
        customized,
        width,
        height,
        depth
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

.product-body {
  text-align: left;
}

.product-image {
  width: 100%;
  height: 300px;
  object-fit: contain;
  background-color: $ui-background;
}

.price-list {
  margin-bottom: 0;
  width: 100%;
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

.selectables-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
}

.custom-container,
.selectable-tile {
  width: 100%;
  max-width: 300px;
  margin: 5px;
}

.selectable-tile {
  text-align: left;
}

.inner-tile {
  display: flex;
  flex-direction: row;
  height: 100%;
}

.tile-image {
  width: 108px;
  height: 108px;
  object-fit: contain;
  background-color: $ui-background;
  margin-right: 10px;
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

  .custom-container,
  .selectable-tile {
    max-width: 400px;
  }
}
</style>


