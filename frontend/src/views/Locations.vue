<template>
  <div class="location-wrapper">
    <cv-button
      v-for="location in locations"
      :key="location.isoCode"
      @click="setLocation(location.isoCode, location.lang)"
      >{{ location.name }}</cv-button
    >
  </div>
</template>

<script>
export default {
  name: 'Locations',
  data() {
    return {
      locations: this.$store.state.locations
    }
  },
  methods: {
    setLocation(loc, lang) {
      this.$store.commit('setLocation', loc)
      this.$store.commit('setLang', lang)
      this.$router.push('about')
    }
  }
}
</script>
