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
      locations: [
        { isoCode: 'de', lang: 'de', name: 'Deutschland' },
        { isoCode: 'gb', lang: 'en', name: 'Great Britain' },
        { isoCode: 'fr', lang: 'fr', name: 'France' },
        { isoCode: 'it', lang: 'it', name: 'Italia' },
        { isoCode: 'ch', lang: 'de', name: 'Schweiz' },
        { isoCode: 'at', lang: 'de', name: 'Österreich' },
        { isoCode: 'rw', lang: 'en', name: 'Other Country' }
      ]
    }
  },
  methods: {
    setLocation(loc, lang) {
      console.log(loc, lang)
      this.$store.commit('setLocation', loc)
      this.$store.commit('setLang', lang)
      this.$router.push('about')
    }
  }
}
</script>
