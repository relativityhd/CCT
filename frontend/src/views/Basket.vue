<template>
  <div class="basket-wrapper">
    <h1>{{ $t('title') }}</h1>
    <div class="products-wrapper">

      <cv-data-table
        :columns="$store.state.mobile ? [
          $t('tableHeads.name'),
          $t('tableHeads.price'),
          $t('tableHeads.delete')] : [
          $t('tableHeads.id'),
          $t('tableHeads.image'),
          $t('tableHeads.name'),
          $t('tableHeads.price'),
          $t('tableHeads.selectables'),
          $t('tableHeads.quantity'),
          $t('tableHeads.delete')]"
        :pagination="false"
        :overflow-menu="false"
        :has-expand-all="true"
        v-if="products.length"
        ref="table">
        <template slot="data">
          <cv-data-table-row
            v-for="product in products"
            :key="product.basketId"
            :value="`${product.basketId}`">

            <cv-data-table-cell v-if="!$store.state.mobile">{{ product.basketId }}</cv-data-table-cell>
            <cv-data-table-cell v-if="!$store.state.mobile">
              <img class="product-image" :src="product.info.imageUrl" alt="Image of product">
            </cv-data-table-cell>
            <cv-data-table-cell><h6>{{ product.info.name }}</h6></cv-data-table-cell>
            <cv-data-table-cell>{{ $store.getters.formatPrice(product.price.sum.gross) }}</cv-data-table-cell>
            <cv-data-table-cell v-if="!$store.state.mobile">
              <cv-tag
                v-for="selectable in product.selectables"
                :key="selectable.id"
                :label="selectable.name"
                :kind="(selectable.customized ? 'blue' : 'cool-gray')" />
            </cv-data-table-cell>
            <cv-data-table-cell v-if="!$store.state.mobile">
              <cv-number-input
                label=""
                :mobile="$store.state.mobile"
                :invalid-message="product.invalidMessage"
                :value="product.quantity"
                v-model="product.quantity"
                @input="changeQuantity(product.basketId)"
              >
              </cv-number-input>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <cv-icon-button
                :icon="iconDelete"
                :label="$t('deleteItem')"
                tip-position="left"
                tip-alignment="start"
                @click="deleteItem(product.basketId)" />
            </cv-data-table-cell>

            <template slot="expandedContent">
              <div class="expanded-content-wrapper">
                <div class="mobile-container" v-if="$store.state.mobile">
                  <h6>{{ $t('tableHeads.about') }}</h6>
                  <img class="product-image" :src="product.info.imageUrl" alt="Image of product">
                  <h6>{{ `${$t('tableHeads.price')}: ${$store.getters.formatPrice(product.price.sum.gross)}` }}</h6>
                  <cv-number-input
                    :label="$t('tableHeads.quantity')"
                    :mobile="$store.state.mobile"
                    :invalid-message="product.invalidMessage"
                    :value="product.quantity"
                    v-model="product.quantity"
                    @input="changeQuantity(product.basketId)"
                  >
                  </cv-number-input>
                </div>

                <div class="info-container" v-if="product.customized">
                  <h6>{{ $t('tableHeads.info') }}</h6>
                  <cv-structured-list v-if="product.customized">
                    <template slot="headings"></template>
                    <template slot="items">
                      <cv-structured-list-item
                        v-for="item in [
                          { name: $t('tableHeads.custom'),
                            value: product.customized ? $t('yes') : $t('no') },
                          { name: $t('tableHeads.fixed'),
                            value: product.info.priceStarting ? $t('yes') : $t('no') },
                          { name: $t('width'), value:  product.width },
                          { name: $t('height'), value:  product.height },
                          { name: $t('depth'), value:  product.depth },
                        ]"
                        :key="item.name"
                      >
                        <cv-structured-list-data class="info-list-item"><h6>{{ item.name }}</h6></cv-structured-list-data>
                        <cv-structured-list-data class="info-list-item">{{ item.value }}</cv-structured-list-data>
                      </cv-structured-list-item>
                    </template>
                  </cv-structured-list>

                  <h6 v-else>{{ $t('notCustom') }}</h6>
                </div>

                <div class="selectables-container" v-if="product.selectables.length">
                  <h6>{{ $t('tableHeads.selectables') }}</h6>
                  <cv-structured-list class="selectable-list">
                    <template slot="headings">
                      <cv-structured-list-heading>{{ $t('tableHeads.name') }}</cv-structured-list-heading>
                      <cv-structured-list-heading>{{ $t('tableHeads.custom') }}</cv-structured-list-heading>
                      <cv-structured-list-heading>{{ $t('height') }}</cv-structured-list-heading>
                      <cv-structured-list-heading>{{ $t('width') }}</cv-structured-list-heading>
                      <cv-structured-list-heading>{{ $t('depth') }}</cv-structured-list-heading>
                    </template>
                    <template slot="items">
                      <cv-structured-list-item
                        v-for="selectable in product.selectables"
                        :key="selectable.id"
                      >
                        <cv-structured-list-data>{{selectable.name}}</cv-structured-list-data>
                        <cv-structured-list-data>{{selectable.customized ? $t('yes') : $t('no')}}</cv-structured-list-data>
                        <cv-structured-list-data>{{selectable.customized ? selectable.custom.width : '-'}}</cv-structured-list-data>
                        <cv-structured-list-data>{{selectable.customized ? selectable.custom.height : '-'}}</cv-structured-list-data>
                        <cv-structured-list-data>{{selectable.customized ?selectable.custom.depth : '-'}}</cv-structured-list-data>
                      </cv-structured-list-item>
                    </template>
                  </cv-structured-list>
                </div>

                <div class="pricing-container">
                  <h6>{{ $t('costCalculation') }}</h6>
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
                          `${$t('priceList.tax')} (${$store.state.locals.vatRate * 100}%)`
                        }}
                      </cv-structured-list-heading>
                      <cv-structured-list-heading>
                        {{ $t('priceList.gross') }}</cv-structured-list-heading
                      >
                    </template>
                    <template slot="items">
                      <cv-structured-list-item
                        v-for="pItem in product.price.items"
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
                          ><h6>{{ $t('itemSum') }}</h6></cv-structured-list-data
                        >
                        <cv-structured-list-data
                          ><h6>
                            {{ $store.getters.formatPrice(product.price.single.net) }}
                          </h6></cv-structured-list-data
                        >
                        <cv-structured-list-data
                          ><h6>
                            {{ $store.getters.formatPrice(product.price.single.tax) }}
                          </h6></cv-structured-list-data
                        >
                        <cv-structured-list-data
                          ><h6>
                            {{ $store.getters.formatPrice(product.price.single.gross) }}
                          </h6></cv-structured-list-data
                        >
                      </cv-structured-list-item>
                      <cv-structured-list-item>
                        <cv-structured-list-data
                          ><h6>{{ $t('sum') }}</h6></cv-structured-list-data
                        >
                        <cv-structured-list-data
                          ><h6>
                            {{ $store.getters.formatPrice(product.price.sum.net) }}
                          </h6></cv-structured-list-data
                        >
                        <cv-structured-list-data
                          ><h6>
                            {{ $store.getters.formatPrice(product.price.sum.tax) }}
                          </h6></cv-structured-list-data
                        >
                        <cv-structured-list-data
                          ><h6>
                            {{ $store.getters.formatPrice(product.price.sum.gross) }}
                          </h6></cv-structured-list-data
                        >
                      </cv-structured-list-item>
                    </template>
                  </cv-structured-list>
                </div>
              </div>
            </template>
          </cv-data-table-row>
        </template>
      </cv-data-table>

      <div class="no-items" v-else>
        <h6>{{$t('noItems')}}</h6>
        <br>
        <cv-button to="/tool">
          {{$t('toStore')}}
        </cv-button>
      </div>
    </div>
  </div>
</template>

<script>
import TrashCan16 from '@carbon/icons-vue/es/trash-can/16'

export default {
  name: 'Basket',
  data() {
    return {
      products: [],
      iconDelete: TrashCan16,
      sum: 0
    }
  },
  mounted() {
    this.loadProducts()
  },
  methods: {
    loadProducts() {
      this.sum = 0
      this.products = this.$store.state.basket.products.map(p => {
        const quantity = Number.isNaN(parseInt(p.quantity)) ? 1 : p.quantity > 0 ? p.quantity : 1
        const price = this.calcSum(p.info, p.selectables, quantity)
        this.sum += price.sum
        return {
          ...p,
          invalidMessage: '',
          price
        }
      })
    },
    calcSub(price) {
      const sub = this.$store.state.locals.subQuotient || 100
      return parseInt(Math.round(price * sub))
    },
    calcSubBack(price) {
      return price / 100
    },
    calcNet(gross) {
      return gross / (1 + this.$store.state.locals.vatRate)
    },
    calcSum(product, selectables, quantity) {
      const price = {}
      const gross =  this.calcSub(product.price)
      const net = this.calcNet(gross)
      price.items = [
        {
          name: product.name,
          net: net,
          tax: gross - net,
          gross: gross
        }
      ]
      selectables
        .forEach(s => {
          const gross = this.calcSub(s.price)
          const net = this.calcNet(gross)
          price.items.push({
            name: s.name,
            net: net,
            tax: gross - net,
            gross: gross
          })
        })
      price.single = {
        net: price.items.reduce((a, b) => a + (this.calcSubBack(b.net) || 0), 0),
        tax: price.items.reduce((a, b) => a + (this.calcSubBack(b.tax) || 0), 0),
        gross: price.items.reduce((a, b) => a + (this.calcSubBack(b.gross) || 0), 0)
      }
      price.sum = {
        net: this.calcSubBack(this.calcSub(price.single.net) * quantity),
        tax: this.calcSubBack(this.calcSub(price.single.tax) * quantity),
        gross: this.calcSubBack(this.calcSub(price.single.gross) * quantity)
      }
      return price
    },
    changeQuantity(basketId) {
      console.log('--DEBUG : changeQuantity -> basketId', basketId)
      const changedItem = this.products.find(p => p.basketId === basketId)
        console.log('--DEBUG : changeQuantity -> changedItem.quantity', changedItem.quantity)
      if (Number.isNaN(parseInt(changedItem.quantity))) {
        changedItem.invalidMessage = this.$t('invalidNumber')
        return
      }
      if (parseInt(changedItem.quantity) <= 0) {
        changedItem.invalidMessage = this.$t('invalidNumber')
        return
      }
      this.$store.commit('basket/setProduct', {
        basketId: basketId,
        quantity: parseInt(changedItem.quantity)
      })
      this.loadProducts()
    },
    deleteItem(basketId) {
      this.$store.commit('basket/removeProduct', basketId)
      this.loadProducts()
    }
  }
}
</script>

<style lang="scss" scoped>
.basket-wrapper {
  width: 98%;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

.no-items {
  margin-top: 50px;
}

.product-image {
  width: 64px;
  height: 64px;
  object-fit: contain;
  background-color: $ui-background;
}

.expanded-content-wrapper{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.mobile-container,
.info-container,
.selectables-container,
.pricing-container {
  width: 100%;
  margin: 0 10px;
}

.mobile-container{
  max-width: 275px;
}

.info-container {
  max-width: 150px;
}

.selectables-container {
  max-width: 400px;
}

.pricing-container {
  max-width: 425px;
}

.info-list-item{
  padding: 1rem .5rem .5rem;
}
</style>

<i18n>
{
  "en": {
    "title": "Your Basket",
    "noItems": "You havn't any items in your basket!",
    "toStore": "Store",
    "invalidNumber": "Must be a number larger than 0!",
    "deleteItem": "Remove item from your basket",
    "notCustom": "This item was not customized",
    "tableHeads": {
      "id": "ID",
      "image": "Image",
      "name": "Name",
      "price": "Price",
      "custom": "Customized",
      "fixed": "Fixed Price",
      "selectables": "Selectables",
      "quantity": "Quantity",
      "delete": "Delete",
      "info": "Customized Data",
      "about": "Item Info"
    },
    "itemSum": "Sum per Item",
    "sum": "Sum",
    "costCalculation": "Price Calculation",
    "priceList": {
      "name": "Item",
      "net": "Net",
      "gross": "Gross",
      "tax": "Tax"
    },
    "width": "Width",
    "height": "Height",
    "depth": "Depth",
    "yes": "Yes",
    "no": "No"
  }
}
</i18n>
