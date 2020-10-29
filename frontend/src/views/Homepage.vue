<template>
  <div class="home">
    <div class="paralax-wrapper">
      <img class="paralax-img" src="../assets/cupboard.png" alt="Image of fancy Cupboard" />
    </div>
    

    <div class="actions">
      <h6>{{ $t('Homepage.welcome') }}</h6>
      <h1>{{ $t('Homepage.marketing') }}</h1>

      <div class="btns">
        <cv-tile
          kind="clickable" to="/tool/2">
          <h1>{{ $t('Homepage.toolTitle') }}</h1>
          <p>{{ $t('Homepage.tool') }}</p>
          <ArrowRight16 />
        </cv-tile>

        <cv-tile
          kind="clickable" to="/catalogue">
          <h1>{{ $t('Homepage.catalogueTitle') }}</h1>
          <p>{{ $t('Homepage.catalogue') }}</p>
          <ArrowRight16 />
        </cv-tile>
      </div>
      
    </div>

    <div class="cuppyhint" v-if="!$store.state.mobile">
      <h2>{{ $t('Homepage.cuppyhelp') }} &#8594;</h2>
    </div>
  </div>
</template>

<script>
import ArrowRight16 from '@carbon/icons-vue/es/arrow--right/16'

export default {
  name: 'Homepage',
  components: {
    ArrowRight16
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
.home {
  margin-top: 48px !important;
}

.paralax-wrapper{
  height: 50vh;
  width: 100%;
}

.paralax-img{
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.actions{
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  justify-items: center;
  width: 98%;
  max-width: 800px;
  margin: 0 auto;
}

.btns {
  padding-top: 5px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.btns a{
  text-align: left;
  width: 100%;
  max-width: 300px;
  height: 300px;
}

.btns a svg{
  position: absolute;
  bottom: 15px;
  right: 15px;
  width: 32px;
  height: 32px;
}

.cuppyhint {
  position: fixed;
  right: 20vw;
  bottom: 7vh;
}
</style>
