<template>
  <div class="basket-wrapper">
    <h1>{{ $t('title') }}</h1>
    <div class="products-wrapper">
      <div class="product" v-for="product in products" :key="product.id">
        <p>---Placeholder for Productinformation (Image & Stuff)---</p>
        <p>{{ product.id }}</p>

        <cv-number-input
          label="Quantity"
          :mobile="isMobile"
          v-model="product.quantity"
          @input="changeQuantity(product)"
        >
        </cv-number-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Basket',
  data() {
    return {
      products: this.$store.state.basket.products,
      isMobile: window.innerWidth < 500
    }
  },
  created() {
    window.addEventListener('resize', this.viewChange)
  },
  destroyed() {
    window.removeEventListener('resize', this.viewChange)
  },
  methods: {
    changeQuantity(product) {
      console.log(
        '--DEBUG : changeQuantity -> product',
        product.id,
        product.quantity
      )
      if (
        parseInt(product.quantity) <= 0 ||
        Number.isNaN(parseInt(product.quantity))
      ) {
        product.quantity = '1'
      }
      this.$store.commit('setProduct', {
        id: product.id,
        quantity: parseInt(product.quantity)
      })
      /* const indexInProducts = this.$store.state.basket.products.findIndex(
        product => product.id === id
      )
      if (indexInProducts) { return }
      const quantity = this.$store.state.basket.products[indexInProducts].quantity
      console.log('--DEBUG : changeQuantity -> product', quantity)
      if (quantity <= 0 || Number.isNaN(quantity)) {
        this.$store.state.basket.products[indexInProducts].quantity = 1
      } */
    },
    viewChange() {
      this.isMobile = window.innerWidth < 500
    }
  }
}
</script>

<style lang="scss" scoped>
.basket-wrapper {
  width: 98%;
  max-width: 1500px;
  margin-left: auto;
  margin-right: auto;
}

.products-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.product {
  margin: 5px 20px;
}
</style>

<i18n>
{
  "en": {
    "title": "Your Basket",
    "invalidNumber": "Must be a number larger than 0"
  }
}
</i18n>
