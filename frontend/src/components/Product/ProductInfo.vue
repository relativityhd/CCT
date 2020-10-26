<template>
  <div>
    <img class="product-image" :src="product.imageUrl" :alt="$t('altImg', { name: product.name })" />
    <div class="product-body">
      <h3>{{ product.name }}</h3>
      <h6>{{ $store.getters.formatPrice(product.price) }}</h6>
      <p>{{ product.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductInfo',
  props: {
    product: Object
  }
}
</script>

<style lang="scss" scoped>
.product-body {
  text-align: left;
}

.product-image {
  width: 300px;
  height: 300px;
  object-fit: contain;
  background-color: $ui-background;
}
</style>
