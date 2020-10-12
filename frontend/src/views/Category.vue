<template>
  <div class="category-page-wrapper">
    <h1>{{ `${$t('title')} ${name}` }}</h1>
    <div class="products-wrapper">
      <cv-tile
        v-for="product in products"
        :key="product.id"
        kind="clickable"
        :to="product.to"
        class="product-tile"
      >
        <img
          class="tile-image"
          :src="product.imageUrl"
          alt="Image of product"
        />
        <div class="tile-body">
          <h3>{{ `${$t('modell')} ${product.name}` }}</h3>
          <p>{{ $store.getters.formatPrice(product.price) }}</p>
          <p>
            {{
              `${$t('priceStarting')} - ${
                product.priceStarting ? $t('yes') : $t('no')
              }`
            }}
          </p>
          <p>
            {{
              `${$t('customizable')} - ${
                product.customizable ? $t('yes') : $t('no')
              }`
            }}
          </p>
        </div>
      </cv-tile>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'Category',
  data() {
    return {
      products: [],
      name: ''
    }
  },
  mounted() {
    const categoryId = parseInt(this.$route.params.categoryId)
    Vue.axios.get(`/catalogue/categories/${categoryId}/products`).then(res => {
      this.products = res.data.map(p => ({ ...p, to: `/product/${p.id}` }))
    })
    Vue.axios.get('/catalogue/categories').then(res => {
      const thisCategory = res.data.find(category => category.id === categoryId)
      this.name = thisCategory.name
    })
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
  max-width: 1400px;
  margin: 0 auto;
}

.products-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
}

.product-tile {
  text-align: left;
  margin: 20px;
  min-width: 198px;
  height: 438px;
  width: calc(16.6% - 40px);
}

.tile-image {
  width: 100%;
  height: 256px;
  object-fit: contain;
  background-color: $ui-background;
}
</style>

<i18n>
{
  "en": {
    "title": "Category:",
    "modell": "Modell",
    "priceStarting": "Fixed price?",
    "customizable": "Customizable?",
    "yes": "Yes",
    "no": "No"
  }
}
</i18n>
