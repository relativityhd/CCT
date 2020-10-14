<template>
  <div class="cuppy-hoveraround">
    <div
      id="cuppy"
      @click="
        () => {
          cuppyButton()
        }
      "
    >
      <div
        id="CuppyBubble"
        v-bind:class="showCuppyBubble ? 'visible' : 'invisible'"
      >
        <div
          class="CuppySpeak"
          @click="
            event => {
              event.stopPropagation()
            }
          "
        >
          <CuppySpeak :showCuppyBubble="showCuppyBubble" />
        </div>
      </div>
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
      showCuppyBubble: false
    }
  }
}
</script>
<style lang="scss" scoped>
#cuppy {
  background-image: url('./../assets/cuppy.svg');
  background-repeat: no-repeat;
  background-size: contain;
  height: 15rem;
  width: 10rem;
  overflow: visible;
  transform: rotate(-10deg);
  cursor: pointer;
}
.cuppy-hoveraround {
  animation: hoveraround 15s ease-in-out 0s alternate;
  animation-iteration-count: infinite;
}
.visible {
  opacity: 1;
}
.invisible {
  opacity: 0;
}
#CuppyBubble {
  transform: rotate(10deg);
  transition: opacity 0.2s ease;
}
.CuppySpeak {
  transform: translate(-80%, -100%);
}
@keyframes hoveraround {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(2.5vh);
  }
}
</style>
