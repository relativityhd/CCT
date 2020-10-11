<template>
  <div class="basket-wrapper">
    <h3>{{ $t('title') }}</h3>
    <div class="products-wrapper">
      <div class="product" v-for="product in products" :key="product.id">
        <p>Product ID: {{ product.id }}</p>
        <p>Quantity: {{ product.quantity }}</p>
      </div>
    </div>
    <cv-switcher>
      <cv-switcher-item>
        <cv-switcher-item-link to="/basket">
          Edit your basket
        </cv-switcher-item-link>
      </cv-switcher-item>
    </cv-switcher>
  </div>
</template>

<script>
export default {
  name: 'BasketPanel',
  data() {
    return {
      products: this.$store.state.basket.products
    }
  }
}
</script>

<style lang="scss" scoped>
.basket-wrapper {
  padding: 20px 5px;
}

.product {
  border-top: 1px solid $ui-01;
}
</style>
<i18n>
{
  "en": {
    "title": "Your Basket",
    "products": "Products"
  }
}
</i18n>
