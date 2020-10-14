<template>
  <div class="home">
    <h1>{{ $t('welcome') }}</h1>
    {{ $t('marketing') }}
    <div class="closetimage">
      <img src="../assets/cupboard.png" alt="" />
    </div>
    <div class="cuppyhint">
      <h2>{{ $t('cuppyhelp') }} &#8594;</h2>
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
  width: 100%;
  height: 30vh;
}
</style>
<i18n>
{
  "en":{
    "welcome": "Welcome to the Cupbaord Ltd.-Shop",
    "cuppyhelp": "Cuppy will asisst you!",
    "marketing":"We are Cup"
  },ya
  "de":{
    "welcome": "Willkommen im Cupboard Ltd.-Shop",
    "cuppyhelp": "Cuppy hilft dir dabei!",
    "marketing": "Warum willst du einen Schrank wenn du deinen Schrank haben kannst?"
  }
}
</i18n>
