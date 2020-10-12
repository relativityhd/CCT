<template>
  <div class="product-wrapper">
    <div class="is-emtpy" v-if="hasNoProduct">
      <h6>{{ $t('emptyMessage') }}</h6>
    </div>
    <div class="product-container" v-else>
      <div class="product-info">
        <img
          class="product-image"
          :src="product.imageUrl"
          alt="Image of Product"
        />
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
              <img
                class="tile-image"
                :src="selectable.imageUrl"
                alt="Image of Selectable"
              />
              <div class="tile-body">
                <h6>{{ selectable.name }}</h6>
                <p>{{ $store.getters.formatPrice(selectable.price) }}</p>
              </div>
            </div>
          </cv-tile>
          <cv-accordion class="custom-container" v-if="product.customizable">
            <cv-accordion-item>
              <template slot="title">{{ $t('customize') }}</template>
              <template slot="content">
                <cv-number-input
                  label="width"
                  v-model="custom.width"
                  :mobile="$store.state.mobile"
                ></cv-number-input>
                <br />
                <cv-number-input
                  label="height"
                  v-model="custom.height"
                  :mobile="$store.state.mobile"
                ></cv-number-input>
                <br />
                <cv-number-input
                  label="depth"
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
            <template slot="title">{{ $t('costCalculation') }}</template>
            <template slot="content">
              <cv-structured-list class="price-list">
                <template slot="headings">
                  <cv-structured-list-heading
                    >{{ $t('priceList.name') }}
                  </cv-structured-list-heading>
                  <cv-structured-list-heading>
                    {{ $t('priceList.net') }}</cv-structured-list-heading
                  >
                  <cv-structured-list-heading
                    >{{
                      `${$t('priceList.tax')} (${$store.state.vatRate * 100}%)`
                    }}
                  </cv-structured-list-heading>
                  <cv-structured-list-heading>
                    {{ $t('priceList.gross') }}</cv-structured-list-heading
                  >
                </template>
                <template slot="items">
                  <cv-structured-list-item
                    v-for="pItem in price.items"
                    :key="pItem.name"
                  >
                    <cv-structured-list-data>{{
                      pItem.name
                    }}</cv-structured-list-data>
                    <cv-structured-list-data>{{
                      $store.getters.formatPrice(pItem.net)
                    }}</cv-structured-list-data>
                    <cv-structured-list-data>{{
                      $store.getters.formatPrice(pItem.tax)
                    }}</cv-structured-list-data>
                    <cv-structured-list-data>{{
                      $store.getters.formatPrice(pItem.gross)
                    }}</cv-structured-list-data>
                  </cv-structured-list-item>
                  <cv-structured-list-item>
                    <cv-structured-list-data
                      ><h6>{{ $t('sum') }}</h6></cv-structured-list-data
                    >
                    <cv-structured-list-data
                      ><h6>
                        {{ $store.getters.formatPrice(price.net) }}
                      </h6></cv-structured-list-data
                    >
                    <cv-structured-list-data
                      ><h6>
                        {{ $store.getters.formatPrice(price.tax) }}
                      </h6></cv-structured-list-data
                    >
                    <cv-structured-list-data
                      ><h6>
                        {{ $store.getters.formatPrice(price.gross) }}
                      </h6></cv-structured-list-data
                    >
                  </cv-structured-list-item>
                </template>
              </cv-structured-list>
            </template>
          </cv-accordion-item>
        </cv-accordion>

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
    product: function () {
      if (this.product === undefined) {
        this.hasNoProduct = true
        return
      }
      this.hasNoProduct = false
      this.selectables = this.product.selectables
      this.calcSum()
    }
  },
  mounted() {

    this.unsubscribe = this.$store.subscribe((mutation) => {
      if (mutation.type !== 'setLocation') return
      this.calcSum()
    })
    this.calcSum()
  },
  methods: {
    calcNet(gross) {
      return gross / (1 + this.$store.state.vatRate)
    },
    calcSum() {
      this.price.items = [
        {
          name: this.product.name,
          net: this.calcNet(this.product.price),
          tax: this.product.price - this.calcNet(this.product.price),
          gross: this.product.price
        }
      ]
      this.selectables
        .filter(s => s.selected)
        .forEach(s => {
          this.sum += s.price
          this.price.items.push({
            name: s.name,
            net: this.calcNet(s.price),
            tax: s.price - this.calcNet(s.price),
            gross: s.price
          })
        })
      this.price.net = this.price.items.reduce((a, b) => a + (b.net || 0), 0)
      this.price.tax = this.price.items.reduce((a, b) => a + (b.tax || 0), 0)
      this.price.gross = this.price.items.reduce(
        (a, b) => a + (b.gross || 0),
        0
      )
    },
    select(e, id) {
      let selectable = this.selectables.find(s => s.id === id)
      selectable.selected = e.target.checked
      this.calcSum()
    },
    addToCart() {
      console.log('added!')
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
    "info custom"
    "pricing custom";
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
  height: min-content;
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
  height: 128px;
}

.inner-tile {
  display: flex;
  flex-direction: row;
  height: 100%;
}

.tile-image {
  width: 108px;
  height: 100%;
  object-fit: contain;
  background-color: $ui-background;
  margin-right: 10px;
}

@media (max-width: 1060px) {
  .product-container {
    grid-template-rows: auto 1fr auto;
    grid-template-areas: 
      "info"
      "custom"
      "pricing";
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

<i18n>
{
  "en": {
    "addToCart": "Add to cart",
    "emptyMessage": "Please select a Product",
    "customize": "Cutomize",
    "sum": "Sum",
    "costCalculation": "Price Calculation",
    "priceList": {
      "name": "Item",
      "net": "Net",
      "gross": "Gross",
      "tax": "Tax"
    }
  }
}
</i18n>
