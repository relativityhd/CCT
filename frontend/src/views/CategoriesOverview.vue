<template>
  <div class="overview-wrapper">
    <cv-breadcrumb no-trailing-slash class="breadcrumb">
      <cv-breadcrumb-item>
        <cv-link to="/categories" inline>Categories</cv-link>
      </cv-breadcrumb-item>
    </cv-breadcrumb>

    <h1>{{ $t('title') }}</h1>
    <div class="categories-container">
      <cv-tile
        v-for="ct in categories"
        :key="ct.id"
        kind="clickable"
        :to="ct.to"
        class="category-tile"
      >
        <img class="tile-image" :src="ct.imageUrl" alt="Image of Category" />
        <div class="tile-body">
          <h2>{{ ct.name }}</h2>
        </div>
      </cv-tile>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  data() {
    return {
      categories: []
    }
  },
  mounted() {
    Vue.axios.get('/catalogue/categories').then(res => {
      this.categories = res.data.map(c => ({ ...c, to: `/category/${c.id}` }))
    })
  }
}
</script>

<style lang="scss" scoped>
.breadcrumb {
  text-align: left;
  widows: 100%;
}

.overview-wrapper {
  width: 98%;
  max-width: 1400px;
  margin: 0 auto;
}

.categories-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
}

.category-tile {
  text-align: left;
  margin: 20px;
  min-width: 312px;
  height: 440px;
  width: calc(30% - 40px);
}

.tile-image {
  width: 100%;
  height: 356px;
  object-fit: contain;
  background-color: $ui-background;
}
</style>

<i18n>
{
  "en": {
    "title": "View our Catalogue"
  }
}
</i18n>
