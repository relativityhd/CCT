<template>
  <div class="product-container">
    <Product v-if="type === 'product'" :product="product" v-on:back="$router.push('/catalogue')" />
    <Custom v-if="type === 'custom'" :product="product" v-on:back="$router.push('/catalogue')" />
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'Tool',
  components: {
    Product: () => import(/* webpackChunkName: "Product" */ '../components/Product/Product'),
    Custom: () => import(/* webpackChunkName: "CustomProduct" */ '../components/Custom/Custom')
  },
  data() {
    return {
      product: {},
      type: 'none'
    }
  },
  watch: {
    '$route.params.id': function(id) {
      this.loadProduct(id)
    }
  },
  mounted() {
    const id = this.$route.params.id
    this.loadProduct(id)
  },
  methods: {
    loadProduct(id) {
      Vue.axios.get(`/catalogue/products/${id}`).then(res => {
        this.product = res.data
        this.type = this.product.customizable ? 'custom' : 'product'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.product-container {
  width: 98%;
  max-width: 1920px;
  margin: 0 auto;
}
</style>
