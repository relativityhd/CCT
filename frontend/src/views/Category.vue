<template>
  <div class="category-page-wrapper">
    <h1>{{ `${$t('title')} ${name}` }}</h1>
    <img :src="image" alt="Image of Category" />
    <div class="products-wrapper">
      <cv-tile
        v-for="product in products"
        :key="product.id"
        kind="clickable"
        :to="product.to"
      >
        <h1>{{ `${$t('modell')} ${product.name}` }}</h1>
        <p>{{ product.price }}</p>
        <img :src="product.imageUrl" alt="Image of product" />
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
      name: '',
      image: ''
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
      this.image = thisCategory.imageUrl
    })
  }
}
</script>

<style lang="scss" scoped></style>

<i18n>
{
  "en": {
    "title": "Category:",
    "modell": "Modell"
  }
}
</i18n>
