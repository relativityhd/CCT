<template>
  <div class="overview-wrapper">
    <div class="categories-container" v-for="ct in categories" :key="ct.id">
      <cv-tile 
        kind="clickable"
        :to="ct.to"
        >
        <h1>{{ct.name}}</h1><img :src="ct.imageUrl">
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
        this.categories = res.data.map(c => ({...c, to:`/categories/${c.id}`}))
      })
  }
}
</script>

