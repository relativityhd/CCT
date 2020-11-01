<template>
  <div class="basket-wrapper">
    <h3>{{ $t('Basket.title') }}</h3>

    <div class="products-wrapper" v-if="this.$store.state.basket.items.length">
      <div class="product" v-for="it in this.$store.state.basket.items" :key="it._uid">
        <div class="product-info">
          <h3 v-if="it.quantity < 1">1x</h3>
          <h3 v-else-if="it.quantity > 10">10x</h3>
          <h3 v-else>{{ it.quantity }}x</h3>
          <img class="product-image" :src="it.product.imageUrl" alt="Image of Product" />
          <div class="product-body">
            <h6>{{ it.product.name }}</h6>
            <p>{{ $store.getters.formatPrice(it.price.sum.gross) }}</p>
          </div>
        </div>

        <div>
          <div v-for="ext in it.exteriors" :key="ext._uid">
            <cv-tag :label="ext.name" kind="blue" />
            <cv-tag :label="ext.material.name" kind="purple" />
            <cv-tag
              v-for="int in ext.interiors"
              :key="int._uid"
              :label="`${int.name} (x${int.quantity})`"
              kind="cool-gray"
            />
          </div>
        </div>
      </div>
    </div>

    <hr v-if="this.$store.state.basket.items.length" />

    <h6 v-if="this.$store.state.basket.items.length">
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
  flex-direction: column;
  gap: 5px;
}

.product-info {
  display: flex;
  flex-direction: row;
  gap: 5px;
  text-align: left;
  align-items: flex-end;
}

.product-image {
  width: 42px;
  height: 42px;
  object-fit: contain;
  background-color: transparent;
}
</style>
