<template>
  <div id="app">
    <AppHeader />
    <div id=theCuppy>
      <Cuppy></Cuppy>
    </div>
    <router-view id="app-view" />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader'
import Cuppy from './views/Cuppy'
export default {
  name: 'App',
  components: {
    AppHeader, Cuppy
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
  margin-top: 48px;
  min-height: calc(100vh - 48px);
}
#theCuppy{
  position: fixed;
  bottom: 2rem;
  bottom: -2rem;
  right: 0vw;
}
</style>
