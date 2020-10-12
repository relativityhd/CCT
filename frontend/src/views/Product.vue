<template>
  <div class="category-page-wrapper">
    <div class="product-wrapper">
      <div class="info-container">
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
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'Product',
  data() {
    return {
      selectables: [],
      product: {},
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
  mounted() {
    const productId = parseInt(this.$route.params.productId)

    Vue.axios.get(`/catalogue/products/${productId}/selectables`).then(res => {
      this.selectables = res.data.map(s => ({ ...s, selected: false }))
    })
    Vue.axios.get(`/catalogue/products/${productId}`).then(res => {
      this.product = res.data
      this.calcSum()
    })

    this.unsubscribe = this.$store.subscribe((mutation) => {
      if (mutation.type !== 'setLocation') return
      this.calcSum()
    })
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
.breadcrumb {
  text-align: left;
  widows: 100%;
}

.category-page-wrapper {
  width: 98%;
  max-width: 1420px;
  margin: 0 auto;
}

.product-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.info-container {
  width: 100%;
  max-width: 400px;
  margin: 10px;
}

.product-body {
  text-align: left;
}

.product-image {
  width: 100%;
  height: 300px;
  object-fit: contain;
  background-color: $ui-background;
  margin-right: 10px;
}

.custom-container {
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
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
  max-width: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
}

.selectable-tile {
  text-align: left;
  margin: 10px;
  max-width: 400px;
  height: 156px;
  width: 100%;
}

.inner-tile {
  display: flex;
  flex-direction: row;
  height: 100%;
}

.tile-image {
  width: 126px;
  height: 100%;
  object-fit: contain;
  background-color: $ui-background;
  margin-right: 10px;
}
</style>

<i18n>
{
  "en": {
    "addToCart": "Add to cart",
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
