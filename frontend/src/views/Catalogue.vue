<template>
  <div>
    <h1>{{ $t('title') }}</h1>
    <div>
      <div v-if="categories.length">
        <cv-tile v-for="ct in categories" :key="ct.id" kind="clickable" class="tile" @click="selectCategory(ct.id)">
          <img class="tile-image" :src="ct.imageUrl" alt="Image of Category" />
          <div class="tile-body">
            <h2>{{ ct.name }}</h2>
          </div>
        </cv-tile>
      </div>

      <div v-if="products.length">
        <cv-tile
          v-for="product in products"
          :key="product.id"
          kind="clickable"
          class="tile"
          @click="selectProduct(product.id)"
        >
          <img class="tile-image" :src="product.imageUrl" alt="Image of product" />
          <div class="tile-body">
            <h3>{{ `${$t('Tool.modell')} ${product.name}` }}</h3>
            <p>{{ $store.getters.formatPrice(product.price) }}</p>
            <p>
              {{ `${$t('Tool.priceStarting')} - ${product.priceStarting ? $t('yes') : $t('no')}` }}
            </p>
            <p>
              {{ `${$t('customizable')}? - ${product.customizable ? $t('yes') : $t('no')}` }}
            </p>
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
  data() { return {
    categories: [],
    products: []
  }},
  mounted () {
    this.getCategories()
  },
  methods: {
    getCategories() {
      this.products = []
      Vue.axios.get('/catalogue/categories')
        .then(res => {
          this.categories = res.data
        })
    },
    selectCategory(id) {
      this.categories = []
      Vue.axios.get(`/catalogue/categories/${id}/products`)
        .then(res => {
          this.products = res.data
        })
    }
  }
}
</script>
