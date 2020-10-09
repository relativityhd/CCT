<template>
  <div id="cuppy" class="visible" @click="uff()">
  <CuppySpeak id="CuppySpeak" />
  </div>
</template>

<script>
import CuppySpeak from './CuppySpeak'
export default {
  components: {
    CuppySpeak
  },
  methods:{
    uff: () =>{console.log("hi")}
  }
}
</script>
<style lang="sass" scoped>
#cuppy
  background-image: url("./../assets/cuppy.svg")
  background-repeat: no-repeat
  background-size: contain
  height: 15rem
</style>
