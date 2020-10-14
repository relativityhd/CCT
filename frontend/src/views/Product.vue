<template>
  <div class="category-page-wrapper">
    <Product :product="selectedProduct" />
  </div>
</template>

<script>
import Vue from 'vue'
import Product from '../components/Product/Product'

export default {
  name: 'ProductPage',
  components: {
    Product
  },
  data() {
    return {
      selectedProduct: {}
    }
  },
  mounted() {
    const productId = parseInt(this.$route.params.productId)

    Vue.axios.get(`/catalogue/products/${productId}`).then(res => {
      let product = res.data
      Vue.axios.get(`/catalogue/products/${productId}/selectables`).then(res => {
        product.selectables = res.data
        this.selectedProduct = product
      })
    })
  }
}
</script>
