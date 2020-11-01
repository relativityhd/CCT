<template>
  <div class="router-helper">
    <div class="helperText">
      {{ $t('Cuppy.routerHelper.helperText') }}
    </div>
    <table id="buttoncontainer">
      <tr>
        <td>
          <cv-button @click="$root.$emit('openLoc')">
            {{ $t('Cuppy.location') }}
          </cv-button>
        </td>
      </tr>

      <tr>
        <td>
          <cv-button @click="$root.$emit('openLang')">
            {{ $t('Cuppy.language') }}
          </cv-button>
        </td>
      </tr>

      <tr>
        <td>
          <cv-button @click="toSite('/about')">
            {{ $t('Cuppy.imprint') }}
          </cv-button>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  methods: {
    toSite(path) {
      if (this.$route.path !== path) this.$router.push(path)
    }
  }
}
</script>
<style lang="scss" scoped>
#buttoncontainer {
  border: none;
}
.router-helper {
  width: 13rem;
}
button {
  width: 100%;
  font-size: 1rem;
  border: none;
  margin: 5px 0 5px 0;
  cursor: pointer;
}
</style>
