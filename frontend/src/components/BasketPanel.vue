<template>
  <div class="basket-wrapper">
    <h3>{{ $t('title') }}</h3>

    <div class="products-wrapper">
      <div class="product"
        v-for="product in products"
        :key="product.basketId">
        <h3>{{product.quantity}}x</h3>
        <div class="product-info">
          <img
            class="product-image"
            :src="product.info.imageUrl"
            alt="Image of Product"
          />
          <div class="product-body">
            <h6>{{ product.info.name }}</h6>
            <p>{{ $store.getters.formatPrice(product.info.price) }}</p>
          </div>
        </div>
        <div class="product-selectables">
          <cv-tag
            v-for="selectable in product.selectables"
            :key="selectable.id"
            :label="selectable.name"
            :kind="(selectable.customized ? 'blue' : 'cool-gray')" />
          <cv-tag
            v-if="product.customized"
            :label="$t('customized')"
            kind="purple" />
        </div>
      </div>
    </div>

    <hr>

    <cv-switcher>
      <cv-switcher-item>
        <cv-switcher-item-link to="/basket">
          {{$t('editBasket')}}
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
<i18n>
{
  "en": {
    "title": "Your Basket",
    "products": "Products",
    "customized": "Customized",
    "editBasket": "Edit your Basket"
  }
}
</i18n>
