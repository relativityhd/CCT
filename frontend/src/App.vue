<template>
  <div id="app">
    <AppHeader />
    <router-view id="app-view" />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader'
export default {
  name: 'App',
  components: {
    AppHeader
  },
  methods: {
    onResize() {
      this.$store.commit('viewChange')
    }
  },
  mounted() {
    window.addEventListener('resize', this.onResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  }
}
</script>

<style lang="scss">
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
}
</style>
