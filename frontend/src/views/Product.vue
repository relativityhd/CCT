<template>
  <div class="category-page-wrapper">
    <h1>{{ `${$t('title')} ${name}` }}</h1>
    <img :src="image" alt="Image of Product" />
    <div class="selectables-wrapper">
      <cv-tile
        v-for="selectable in selectables"
        :key="selectable.id"
        kind="clickable"
        :to="selectable.to"
      >
        <h1>{{ `${$t('modell')} ${selectable.name}` }}</h1>
        <p>{{ selectable.price }}</p>
        <img :src="selectable.imageUrl" alt="Image of Selectable" />
      </cv-tile>
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
      name: '',
      image: ''
    }
  },
  mounted() {
    const productId = parseInt(this.$route.params.productId)
    Vue.axios.get(`/catalogue/products/${productId}/selectables`).then(res => {
      this.selectables = res.data.map(p => ({ ...p, to: `/selectable/${p.id}` }))
    })
    Vue.axios.get('/catalogue/products').then(res => {
      const thisProduct = res.data.find(product => product.id === productId)
      this.name = thisProduct.name
      this.image = thisProduct.imageUrl
    })
  }
}
</script>

<i18n>
{
  "en": {
    "title": "Product:",
    "modell": "Selectable"
  }
}
</i18n>





























<!--
<template>
  <div class="product-page-wrapper">
    <div class="products-container" v-for="pd in products" :key="pd.id">
      <cv-tile kind="clickable" :to="pd.to">
        <h1>{{ pd.name }}</h1>
        <img :src="pd.imageUrl" />
      </cv-tile>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  data() {
    return {
      products: []
    }
  },
  mounted() {
    Vue.axios.get('/catalogue/products/0').then(res => {
      console.log(res)
      this.products = res.data.map(c => ({ ...c, to: `/product/${c.id}` }))
    })
  }
}
</script>
-->