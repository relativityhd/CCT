<template>
  <div id="cuppy" @click="()=>{cuppyButton()}">
    <div id="CuppyBubble" @click="(event)=>{event.stopPropagation()}" v-bind:class="showCuppyBubble ? 'visible': 'invisible'">
      <CuppySpeak />
    </div>
  </div>
</template>

<script>
import CuppySpeak from './CuppySpeak'
export default {
  components: {
    CuppySpeak
  },
  methods: {
    cuppyButton() {
      this.showCuppyBubble = !this.showCuppyBubble
     }
  },
  data: () => {
    return {
      showCuppyBubble: true
    }
  }
}
</script>
<style lang="sass" scoped>

@keyframes fade-in
  from
    opacity: 0
  to
    opacity: 1
@keyframes fade-out
  from
    opacity: 1
  to 
    opacity: 0

#cuppy
  background-image: url("./../assets/cuppy.svg")
  background-repeat: no-repeat
  background-size: contain
  height: 15rem
  width: max-content
  transform: rotate(10deg);

.visible
  animation-name: fade-in
  animation-time: 15s

.invisible
  animation-name: fade-out
  animation-time: 1s
  opacity: 0

#CuppyBubble
  transform: rotate(-10deg);
  position: relative
  bottom: 43%
  left: 15%
</style>
