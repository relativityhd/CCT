<template>
  <div class="basket-wrapper">
    <h1>{{ $t('Basket.title') }}</h1>
    <div class="products-wrapper">
      <cv-data-table
        :columns="
          $store.state.mobile
            ? [$t('Basket.tableHeads.name'), $t('tableHeads.price'), $t('tableHeads.delete')]
            : [
                $t('Basket.tableHeads.id'),
                $t('Basket.tableHeads.image'),
                $t('Basket.tableHeads.name'),
                $t('Basket.tableHeads.price'),
                $t('Basket.tableHeads.selectables'),
                $t('Basket.tableHeads.quantity'),
                $t('Basket.tableHeads.delete')
              ]
        "
        :pagination="false"
        :overflow-menu="false"
        :has-expand-all="true"
        v-if="products.length"
        ref="table"
      >
        <template slot="data">
          <cv-data-table-row v-for="product in products" :key="product.basketId" :value="`${product.basketId}`">
            <cv-data-table-cell v-if="!$store.state.mobile">
              {{ product.basketId }}
            </cv-data-table-cell>
            <cv-data-table-cell v-if="!$store.state.mobile">
              <img class="product-image" :src="product.info.imageUrl" alt="Image of product" />
            </cv-data-table-cell>
            <cv-data-table-cell>
              <h6>{{ product.info.name }}</h6>
            </cv-data-table-cell>
            <cv-data-table-cell>
              {{ $store.getters.formatPrice(product.price.sum.gross) }}
            </cv-data-table-cell>
            <cv-data-table-cell v-if="!$store.state.mobile">
              <cv-tag
                v-for="selectable in product.selectables"
                :key="selectable.id"
                :label="selectable.name"
                :kind="selectable.customized ? 'blue' : 'cool-gray'"
              />
            </cv-data-table-cell>
            <cv-data-table-cell v-if="!$store.state.mobile">
              <cv-number-input
                label=""
                :mobile="$store.state.mobile"
                :invalid-message="product.invalidMessage"
                :value="product.quantity"
                v-model="product.quantity"
                @input="changeQuantity(product.basketId)"
              ></cv-number-input>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <cv-icon-button
                :icon="iconDelete"
                :label="$t('Basket.deleteItem')"
                tip-position="left"
                tip-alignment="start"
                @click="deleteItem(product.basketId)"
              />
            </cv-data-table-cell>

            <template slot="expandedContent">
              <div class="expanded-content-wrapper">
                <div class="mobile-container" v-if="$store.state.mobile">
                  <h6>{{ $t('Basket.tableHeads.about') }}</h6>
                  <img class="product-image" :src="product.info.imageUrl" alt="Image of product" />
                  <h6>
                    {{ `${$t('Basket.tableHeads.price')}: ${$store.getters.formatPrice(product.price.sum.gross)}` }}
                  </h6>
                  <cv-number-input
                    :label="$t('Basket.tableHeads.quantity')"
                    :mobile="$store.state.mobile"
                    :invalid-message="product.invalidMessage"
                    :value="product.quantity"
                    v-model="product.quantity"
                    @input="changeQuantity(product.basketId)"
                  ></cv-number-input>
                </div>

                <div class="info-container" v-if="product.customized">
                  <h6>{{ $t('Basket.tableHeads.info') }}</h6>
                  <cv-structured-list>
                    <template slot="headings"></template>
                    <template slot="items">
                      <cv-structured-list-item
                        v-for="item in [
                          {
                            name: $t('Basket.tableHeads.fixed'),
                            value: product.info.priceStarting ? $t('yes') : $t('no')
                          },
                          { name: $t('width'), value: product.custom.width },
                          { name: $t('height'), value: product.custom.height },
                          { name: $t('depth'), value: product.custom.depth }
                        ]"
                        :key="item.name"
                      >
                        <cv-structured-list-data class="info-list-item">
                          <h6>{{ item.name }}</h6>
                        </cv-structured-list-data>
                        <cv-structured-list-data class="info-list-item">
                          {{ item.value }}
                        </cv-structured-list-data>
                      </cv-structured-list-item>
                    </template>
                  </cv-structured-list>
                </div>

                <div class="selectables-container" v-if="product.selectables.length">
                  <h6>{{ $t('Basket.tableHeads.selectables') }}</h6>
                  <cv-structured-list class="selectable-list">
                    <template slot="headings">
                      <cv-structured-list-heading>
                        {{ $t('Basket.tableHeads.name') }}
                      </cv-structured-list-heading>
                      <cv-structured-list-heading>
                        {{ $t('Basket.tableHeads.custom') }}
                      </cv-structured-list-heading>
                      <cv-structured-list-heading>
                        {{ $t('Basket.height') }}
                      </cv-structured-list-heading>
                      <cv-structured-list-heading>
                        {{ $t('Basket.width') }}
                      </cv-structured-list-heading>
                      <cv-structured-list-heading>
                        {{ $t('Basket.depth') }}
                      </cv-structured-list-heading>
                    </template>
                    <template slot="items">
                      <cv-structured-list-item v-for="selectable in product.selectables" :key="selectable.id">
                        <cv-structured-list-data>
                          {{ selectable.name }}
                        </cv-structured-list-data>
                        <cv-structured-list-data>
                          {{ selectable.customized ? $t('yes') : $t('no') }}
                        </cv-structured-list-data>
                        <cv-structured-list-data>
                          {{ selectable.customized ? selectable.custom.width : '-' }}
                        </cv-structured-list-data>
                        <cv-structured-list-data>
                          {{ selectable.customized ? selectable.custom.height : '-' }}
                        </cv-structured-list-data>
                        <cv-structured-list-data>
                          {{ selectable.customized ? selectable.custom.depth : '-' }}
                        </cv-structured-list-data>
                      </cv-structured-list-item>
                    </template>
                  </cv-structured-list>
                </div>

                <div class="pricing-container">
                  <h6>{{ $t('Basket.costCalculation') }}</h6>
                  <cv-structured-list class="price-list">
                    <template slot="headings">
                      <cv-structured-list-heading>
                        {{ $t('Basket.item') }}
                      </cv-structured-list-heading>
                      <cv-structured-list-heading>
                        {{ $t('price.net') }}
                      </cv-structured-list-heading>
                      <cv-structured-list-heading>
                        {{ `${$t('price.tax')} (${$store.state.locals.vatRate * 100}%)` }}
                      </cv-structured-list-heading>
                      <cv-structured-list-heading>
                        {{ $t('price.gross') }}
                      </cv-structured-list-heading>
                    </template>
                    <template slot="items">
                      <cv-structured-list-item v-for="pItem in product.price.items" :key="pItem.name">
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
                          <h6>{{ $t('price.single') }}</h6>
                        </cv-structured-list-data>
                        <cv-structured-list-data>
                          <h6>
                            {{ $store.getters.formatPrice(product.price.single.net) }}
                          </h6>
                        </cv-structured-list-data>
                        <cv-structured-list-data>
                          <h6>
                            {{ $store.getters.formatPrice(product.price.single.tax) }}
                          </h6>
                        </cv-structured-list-data>
                        <cv-structured-list-data>
                          <h6>
                            {{ $store.getters.formatPrice(product.price.single.gross) }}
                          </h6>
                        </cv-structured-list-data>
                      </cv-structured-list-item>

                      <cv-structured-list-item>
                        <cv-structured-list-data>
                          <h6>{{ $t('price.sum') }}</h6>
                        </cv-structured-list-data>
                        <cv-structured-list-data>
                          <h6>
                            {{ $store.getters.formatPrice(product.price.sum.net) }}
                          </h6>
                        </cv-structured-list-data>
                        <cv-structured-list-data>
                          <h6>
                            {{ $store.getters.formatPrice(product.price.sum.tax) }}
                          </h6>
                        </cv-structured-list-data>
                        <cv-structured-list-data>
                          <h6>
                            {{ $store.getters.formatPrice(product.price.sum.gross) }}
                          </h6>
                        </cv-structured-list-data>
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
        <h6>{{ $t('Basket.noItems') }}</h6>
        <br />
        <cv-button @click="$router.push('tool')">
          {{ $t('Basket.toStore') }}
        </cv-button>
      </div>
    </div>
  </div>
</template>

<script>
import TrashCan16 from '@carbon/icons-vue/es/trash-can/16'

export default {
  name: 'BasketPage',
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
      const sub = this.$store.state.locals.subQuotient || 100
      return price / sub
    },
    calcNet(gross) {
      return gross / (1 + this.$store.state.locals.vatRate)
    },
    calcSum(product, selectables, quantity) {
      const price = {}
      const gross = this.calcSub(product.price)
      const net = this.calcNet(gross)
      price.items = [
        {
          name: product.name,
          net: this.calcSubBack(net),
          tax: this.calcSubBack(gross - net),
          gross: this.calcSubBack(gross)
        }
      ]
      selectables.forEach(s => {
        const gross = this.calcSub(s.price)
        const net = this.calcNet(gross)
        price.items.push({
          name: s.name,
          net: this.calcSubBack(net),
          tax: this.calcSubBack(gross - net),
          gross: this.calcSubBack(gross)
        })
      })
      price.single = {
        net: price.items.reduce((a, b) => a + (b.net || 0), 0),
        tax: price.items.reduce((a, b) => a + (b.tax || 0), 0),
        gross: price.items.reduce((a, b) => a + (b.gross || 0), 0)
      }
      price.sum = {
        net: this.calcSubBack(this.calcSub(price.single.net) * quantity),
        tax: this.calcSubBack(this.calcSub(price.single.tax) * quantity),
        gross: this.calcSubBack(this.calcSub(price.single.gross) * quantity)
      }
      return price
    },
    changeQuantity(basketId) {
      const changedItem = this.products.find(p => p.basketId === basketId)
      if (Number.isNaN(parseInt(changedItem.quantity))) {
        changedItem.invalidMessage = this.$t('invalidNumber', { min: 0, max: 1000 })
        return
      }
      if (parseInt(changedItem.quantity) <= 0) {
        changedItem.invalidMessage = this.$t('invalidNumber', { min: 0, max: 1000 })
        return
      }
      this.$store.dispatch('basket/setProduct', {
        basketId: basketId,
        quantity: parseInt(changedItem.quantity)
      })
      this.loadProducts()
    },
    deleteItem(basketId) {
      this.$store.dispatch('basket/removeProduct', basketId)
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

.expanded-content-wrapper {
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

.mobile-container {
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

.info-list-item {
  padding: 1rem 0.5rem 0.5rem;
}
</style>
