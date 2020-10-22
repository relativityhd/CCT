<template>
  <div id="app">
    <AppHeader />
    <div id="theCuppy">
      <Cuppy></Cuppy>
    </div>
    <router-view id="app-view" />
  </div>
</template>

<script>
import Vue from 'vue'
import AppHeader from './components/AppHeader'
import Cuppy from './views/Cuppy'

export default {
  name: 'App',
  components: {
    AppHeader,
    Cuppy
  },
  methods: {
    onResize() {
      this.$store.commit('viewChange')
    },
    setRegion() {
      Vue.axios.get('http://ip2c.org/s').then(res => {
        const location = this.$store.state.locals.locations.find(
          l => l.isoCode === res.data.split(';')[1].toLowerCase()
        )
        this.$store.dispatch('setLocation', location.isoCode)
        this.$store.dispatch('setLang', location.lang)
      })
    }
  },
  mounted() {
    window.addEventListener('resize', this.onResize)
    this.setRegion()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  }
}
</script>

<style lang="scss">
@import './assets/styles/_carbon-precompile.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $text-01;
}
#app-view {
  margin-top: calc(48px + 24px);
  min-height: calc(100vh - 48px - 24px);
  padding-bottom: 15px;
}
#theCuppy {
  position: fixed;
  bottom: 2rem;
  bottom: -2rem;
  right: 0vw;
  z-index: 8001;
}
.bx--number--mobile input[type='number'] {
  width: 100% !important;
}
</style>
