<template>
  <div class="tool-page-wrapper">
    <h1 class="p-title">{{ $t('Tool.title') }}</h1>
    <div class="tool-wrapper">
      <div class="new-item-wrapper">
        <div class="product-selection-wrapper">
          <div v-if="step === 'categories-ov'" class="tile-container">
            <cv-tile v-for="ct in categories" :key="ct.id" kind="clickable" class="tile" @click="selectCategory(ct.id)">
              <img class="tile-image" :src="ct.imageUrl" alt="Image of Category" />
              <div class="tile-body">
                <h2>{{ ct.name }}</h2>
              </div>
            </cv-tile>
          </div>

          <div v-if="step === 'products-ov'" class="tile-container">
            <cv-tile
              v-for="product in products"
              :key="product.id"
              kind="clickable"
              class="tile"
              @click="selectProduct(product.id)"
            >
              <img class="tile-image" :src="product.imageUrl" alt="Image of product" />
              <div class="tile-body">
                <h3>{{ `${$t('Tool.modell')} ${product.name}` }}</h3>
                <p>{{ $store.getters.formatPrice(product.price) }}</p>
                <p>
                  {{ `${$t('Tool.priceStarting')} - ${product.priceStarting ? $t('yes') : $t('no')}` }}
                </p>
                <p>
                  {{ `${$t('customizable')}? - ${product.customizable ? $t('yes') : $t('no')}` }}
                </p>
              </div>
            </cv-tile>

            <cv-tile kind="clickable" class="tile" @click="chooseAnother('categories-ov')">
              <Undo32 class="tile-image" />
              <div class="tile-body">
                <h2>{{ $t('Tool.back') }}</h2>
              </div>
            </cv-tile>
          </div>
        </div>

        <Product
          v-if="step === 'product' && !selectedProduct.customizable"
          :product="selectedProduct"
          v-on:back="chooseAnother('products-ov')"
        />
        <Custom
          v-if="step === 'product' && selectedProduct.customizable"
          :product="selectedProduct"
          v-on:back="chooseAnother('products-ov')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Undo32 from '@carbon/icons-vue/es/undo/32'

export default {
  name: 'Tool',
  components: {
    Product: () => import(/* webpackChunkName: "Product" */ '../components/Product/Product'),
    Custom: () => import(/* webpackChunkName: "CustomProduct" */ '../components/Product/Custom'),
    Undo32
  },
  data() {
    return {
      categories: [],
      products: [],
      selectedProduct: {},
      step: 'categories-ov'
    }
  },
  mounted() {
    Vue.axios.get('/catalogue/categories').then(res => {
      this.categories = res.data
      this.categories.forEach(category => {
        category.products = []
        Vue.axios.get(`/catalogue/categories/${category.id}/products`).then(res => {
          const productIds = res.data.map(p => p.id)
          productIds.forEach(id => {
            Vue.axios.get(`/catalogue/products/${id}`).then(res => {
              const product = res.data
              category.products.push(product)
              Vue.axios
                .get(`/catalogue/products/${id}/selectables`)
                .then(res => {
                  product.selectables = res.data
                })
                .catch(error => {
                  if (error.response)
                    if (error.response.status === 404) {
                      product.selectables = []
                    }
                })
            })
          })
        })
      })
    })
  },
  methods: {
    chooseAnother(step) {
      this.step = step
      window.scrollTo(0, 0)
    },
    selectCategory(id) {
      const selectedCategory = this.categories.find(c => c.id === id)
      this.products = selectedCategory.products
      this.step = 'products-ov'
      window.scrollTo(0, 0)
    },
    selectProduct(id) {
      this.selectedProduct = this.products.find(p => p.id === id)
      this.step = 'product'
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.tool-page-wrapper {
  width: 98%;
  max-width: 1920px;
  margin: 0 auto;
}

.tool-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.new-item-wrapper {
  width: 100%;
  margin-bottom: 50px;
  border-bottom: 1px $ui-03 solid;
}

.product-selection-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.product-selection-wrapper .bx--form-item {
  margin: 10px;
}

.tile-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}

.tile {
  text-align: left;
  margin: 20px;
  min-width: 312px;
  width: calc(30% - 40px);
}

.tile-image {
  width: 100%;
  height: 156px;
  object-fit: contain;
  background-color: transparent;
}

@media (max-width: 1060px) {
  .product-selection-wrapper {
    width: 100%;
    max-width: 420px;
    margin: 0 auto 10px;
  }
  .product-selection-wrapper .bx--form-item {
    margin: 10px 0;
    width: calc(100% - 20px);
  }
}
</style>
