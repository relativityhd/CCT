<template>
  <div class="overview-wrapper">
    <h1>{{ $t('title') }}</h1>
    <div class="categories-container">
      <cv-tile 
        v-for="ct in categories"
        :key="ct.id"
        kind="clickable"
        :to="ct.to"
        class="category-tile"
        >
        <img class="tile-image" :src="ct.imageUrl" alt="Image of Category">
        <div class="tile-body">
          <h3>{{ct.name}}</h3>
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
        console.log(res)
        this.categories = res.data.map(c => ({...c, to:`/category/${c.id}`}))
      })
  }
}
</script>

<style lang="scss" scoped>
.overview-wrapper{
  width: 98%;
  max-width: 1400px;
  margin: 0 auto;
}

.categories-container{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
}

.category-tile{
  text-align: left;
  margin: 20px;
}

.tile-image{
  width: 300px;
}
</style>

<i18n>
{
  "en": {
    "title": "View our Catalogue"
  }
}
</i18n>
