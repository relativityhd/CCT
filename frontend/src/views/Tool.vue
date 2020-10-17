<template>
  <div class="tool-page-wrapper">
    <h1 class="p-title">{{ $t('Tool.title') }}</h1>
    <div class="tool-wrapper">
      <div class="new-item-wrapper">
        <div class="product-selection-wrapper">
          <cv-dropdown
            :label="$t('Tool.categorySelect')"
            :disabled="categories.length === 0"
            :value="dropdowns.selectedCategoryId"
            v-model="dropdowns.selectedCategoryId"
            @change="selectCategory"
          >
            <cv-dropdown-item v-for="category in categories" :key="category.id" :value="`${category.id}`">
              {{ category.name }}
            </cv-dropdown-item>
          </cv-dropdown>

          <cv-dropdown
            :label="$t('Tool.productSelect')"
            :disabled="products.length === 0"
            :value="dropdowns.selectedProductId"
            v-model="dropdowns.selectedProductId"
            @change="selectProduct"
          >
            <cv-dropdown-item v-for="product in products" :key="product.id" :value="`${product.id}`">
              {{ product.name }}
            </cv-dropdown-item>
          </cv-dropdown>
        </div>
        <Product :product="selectedProduct" />
      </div>
      <div class="pricing-wrapper"></div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Product from '../components/Product'

export default {
  name: 'Tool',
  components: {
    Product
  },
  data() {
    return {
      categories: [],
      products: [],
      dropdowns: {
        selectedCategoryId: '',
        selectedProductId: ''
      },
      selectedProduct: {}
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
              Vue.axios.get(`/catalogue/products/${id}/selectables`).then(res => {
                product.selectables = res.data.map(s => ({
                  ...s,
                  selected: false
                }))
              })
            })
          })
        })
      })
    })

    this.selectProduct()
  },
  methods: {
    selectCategory() {
      const selectedCategory = this.categories.find(c => c.id.toString() === this.dropdowns.selectedCategoryId)
      this.products = selectedCategory.products
      this.dropdowns.selectedProductId = ''
    },
    selectProduct() {
      this.selectedProduct = this.products.find(p => p.id.toString() === this.dropdowns.selectedProductId)
    }
  }
}
</script>

<style lang="scss" scoped>
.tool-page-wrapper {
  width: 98%;
  max-width: 1420px;
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
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  width: 1040px;
  max-width: 100%;
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

