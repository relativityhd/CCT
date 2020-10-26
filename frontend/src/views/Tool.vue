<template>
  <div class="product-container">
    <Product
      v-if="type === 'product'"
      :product="product"
      v-on:back="$router.push('/catalogue')"
    />
    <Custom
      v-if="type === 'custom'"
      :product="product"
      v-on:back="$router.push('/catalogue')"
    />
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
  data() { return {
    product: {},
    type: 'none'
  }},
  mounted() {
    const id = this.$route.params.id
    Vue.axios.get(`/catalogue/products/${id}`).then(res => {
      const product = res.data
      const isCustom = product.customizable
      if (!isCustom) {
        this.product = product
        this.type = 'product'
        return
      }
      Vue.axios
        .get(`/catalogue/products/${id}/selectables`)
        .then(res => {
          product.exteriors = []
          product.interiors = []
          product.materials = []

          res.data.forEach(selectable => {
            switch (selectable.selectableCategory) {
              case 'exterior':
                product.exteriors.push(selectable)
                break

              case 'interior':
                product.interiors.push(selectable)
                break

              case 'material':
                product.materials.push(selectable)
                break

              default:
                break
            }
          })
          this.product = product
          this.type = 'custom'
        })
        .catch(error => {
          if (error.response)
            if (error.response.status === 404) {
              product.selectables = []
              this.product = product
              this.type = 'custom'
            }
        })
    })
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
