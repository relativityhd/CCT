<template>
  <div class="basket-wrapper">
    <h3>{{ $t('Basket.title') }}</h3>

    <div class="products-wrapper" v-if="this.$store.state.basket.products.length">
      <div class="product" v-for="product in this.$store.state.basket.products" :key="product.basketId">
        <h3>{{ product.quantity }}x</h3>
        <div class="product-info">
          <img class="product-image" :src="product.info.imageUrl" alt="Image of Product" />
          <div class="product-body">
            <h6>{{ product.info.name }}</h6>
            <p>{{ $store.getters.formatPrice(product.price.sum.gross) }}</p>
          </div>
        </div>
        <div class="product-selectables">
          <cv-tag
            v-for="selectable in product.selectables"
            :key="selectable.id"
            :label="selectable.name"
            :kind="selectable.custom.customized ? 'blue' : 'cool-gray'"
          />

          <cv-tag v-if="product.custom.customized" :label="$t('customized')" kind="purple" />
        </div>
      </div>
    </div>

    <hr v-if="this.$store.state.basket.products.length" />

    <h6 v-if="this.$store.state.basket.products.length">
      {{ `${$t('price.price')}: ${$store.getters.formatPrice($store.state.basket.price.gross)}` }}
    </h6>

    <h6 v-else>{{ $t('Basket.noItems') }}</h6>
    <hr />

    <cv-switcher>
      <cv-switcher-item>
        <cv-switcher-item-link to="/basket">
          {{ $t('Basket.editBasket') }}
        </cv-switcher-item-link>
      </cv-switcher-item>
      <cv-switcher-item>
        <cv-switcher-item-link to="/order">
          {{ $t('Basket.checkout') }}
        </cv-switcher-item-link>
      </cv-switcher-item>
    </cv-switcher>
  </div>
</template>

<script>
export default {
  name: 'BasketPanel'
}
</script>

<style lang="scss" scoped>
.basket-wrapper {
  padding: 20px 5px;
}

.product {
  padding: 10px 0;
  border-top: 1px solid $ui-01;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
}

.product-info {
  text-align: left;
  margin-left: 5px;
}

.product-image {
  width: 64px;
  height: 64px;
  object-fit: contain;
  background-color: transparent;
}
</style>
