<template>
<div>
  <div id="buttoncontainer">
    <button @click="$root.$emit('openLoc')">
      {{ $t('CuppySpeak.location') }}
    </button>

    <button @click="$root.$emit('openLang')">
      {{ $t('CuppySpeak.language') }}
    </button>

    <button @click="toSite('/about')">
      {{ $t('CuppySpeak.imprint') }}
    </button>
  </div>
</div>
</template>
<script>
export default {
  methods:{
    toSite(path) {
      if (this.$route.path !== path) this.$router.push(path)
    }
  }
}
</script>
<style lang="scss" scoped>
#buttoncontainer {
  margin: 10px 10px 10px 10px;
  display: flex;
  flex-direction: column;
}
button {
  font-size: 1rem;
  border: none;
  width: max-content;
  margin-top: 3px;
  cursor: pointer;
}
</style>