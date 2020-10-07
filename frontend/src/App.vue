<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Set Region</router-link> |
      <router-link to="/tool">Tool</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
// @import '~@carbon/themes/scss/themes';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $text-01;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: $link-01;

    &.router-link-exact-active {
      color: $active-primary;
    }
  }
}
</style>
