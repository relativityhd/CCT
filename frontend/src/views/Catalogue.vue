<template>
  <div>
    <h1>{{ $t('Tool.catalogue') }}</h1>
    <div class="cat-container">
      <div v-if="categories.length">
        <div class="tile-wrapper">
          <cv-tile v-for="ct in categories" :key="ct.id" kind="clickable" class="tile" @click="selectCategory(ct.id)">
            <img class="tile-image" :src="ct.imageUrl" alt="Image of Category" />
            <div class="tile-body">
              <h2>{{ ct.name }}</h2>
            </div>
          </cv-tile>
        </div>
        <br />
        <cv-button @click="$router.push('/tool/2')">
          {{ $t('Tool.selfConfig') }}
        </cv-button>
      </div>

      <div v-else-if="products.length" class="tile-wrapper">
        <cv-tile
          v-for="product in products"
          :key="product.id"
          kind="clickable"
          class="tile"
          @click="$router.push(`/tool/${product.id}`)"
        >
          <img class="tile-image" :src="product.imageUrl" alt="Image of product" />
          <div class="tile-body">
            <h3>{{ product.name }}</h3>
            <p>{{ $store.getters.formatPrice(product.price) }}</p>
          </div>
        </cv-tile>

        <cv-tile kind="clickable" class="tile" @click="getCategories()">
          <Undo32 class="tile-image" />
          <div class="tile-body">
            <h2>{{ $t('Tool.back') }}</h2>
          </div>
        </cv-tile>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Undo32 from '@carbon/icons-vue/es/undo/32'

export default {
  name: 'Catalogue',
  components: {
    Undo32
  },
  data() {
    return {
      categories: [],
      products: [],
      cachedCategories: [],
      cachedProducts: {}
    }
  },
  mounted() {
    this.getCategories()
  },
  methods: {
    getCategories() {
      this.products = []
      this.categories = this.cachedCategories
      Vue.axios.get('/catalogue/categories').then(res => {
        this.categories = res.data.filter(c => c.id !== 2)
        this.cachedCategories = this.categories
      })
    },
    selectCategory(id) {
      this.categories = []
      this.products = this.cachedProducts[id] || []
      Vue.axios.get(`/catalogue/categories/${id}/products`).then(res => {
        this.products = res.data
        this.cachedProducts[id] = this.products
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.cat-container {
  margin: 0 auto;
  max-width: 1600px;
  width: 98%;
}

.tile-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}

.tile {
  width: calc(2rem + 256px);
  text-align: left;
}

.tile-image {
  width: 256px;
  height: 256px;
  background: $ui-background;
  object-fit: contain;
}

.tile-body {
  text-align: left;
}
</style>
