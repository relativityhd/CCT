<template>
  <div class="home">
    <h1>{{ $t('Locations.welcome') }}</h1>
    <h3>{{ $t('Locations.marketing') }}</h3>
    <div class="closetimage">
      <img src="../assets/cupboard.png" alt="" />
    </div>
    <div class="cuppyhint">
      <h2>{{ $t('Locations.cuppyhelp') }} &#8594;</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Locations',
  data() {
    return {
      locations: this.$store.state.locals.locations
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
<style lang="scss" scoped>
.cuppyhint {
  position: fixed;
  right: 20vw;
  bottom: 7vh;
}

.closetimage img {
  width: 95%;
  height: 60vh;
  object-fit: cover;
}
</style>

