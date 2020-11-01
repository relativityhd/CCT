This component is not implemented 
<template>
<!-- not implemented-->
  <div class="Recommendation">
    <div class="recommendation-text">
      {{ $t('Cuppy.recommendationHelper.helperText', { item: categoryRecommendation.name }) }}
    </div>
    <table class="selection-buttons">
      <tr>
        <td>
          <cv-button @click="nope(categoryRecommendation)">
            {{ $t('Cuppy.recommendationHelper.positive') }}
          </cv-button>
        </td>
      </tr>
      <tr>
        <td>
          <cv-button @click="nope">
            {{ $t('Cuppy.recommendationHelper.negative') }}
          </cv-button>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
//not implemented
import Vue from 'vue'
export default {
  data() {
    return {
      categoryRecommendation: {}
    }
  },
  methods: {
    startConfiguration(category) {
      category
      //TODO
    }
  },
  async beforeCreate() {
    const categories = await Vue.axios.get('/catalogue/categories')
    this.categoryRecommendation = categories.data[Math.floor(Math.random() * categories.data.length)]
  }
}
</script>
<style lang="scss" scoped>
//not implemented
button {
  margin: 5px 0.5rem 5px 0.5rem;
  width: 100%;
}
.selection-buttons {
  border: none;
}
.selection-buttons:last-child {
  margin-bottom: 10px;
}
</style>
