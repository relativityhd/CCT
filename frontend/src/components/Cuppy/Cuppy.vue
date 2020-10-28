<template>
  <div v-bind:class="{ 'hello-cuppy': showCuppy, 'shy-cuppy': !showCuppy}">
    <div class="cuppy-hoveraround">
      <div
        id="cuppy"
        @click="cuppyButton"
      >
        <div id="CuppyBubble" v-bind:class="{ 'visible': showCuppy, 'invisible': !showCuppy}">
          <div
            class="CuppySpeak"
            @click.stop=""
          >
            <CuppySpeak :showCuppyBubble="showCuppy" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CuppySpeak from './CuppySpeak'
const timeToCup = 30
export default {
  components: {
    CuppySpeak
  },
  props: {
    //idleTime: Number
  },

  methods: {
    cuppyButton() {
      this.showCuppy = !this.showCuppy
    },
    summonCuppy(){
      this.showCuppy = true
    }
  },
  data: () => {
    return {
      showCuppy: false,
      idleTime: 0
    }
  },
  watch: {
    idleTime: function() {
      if (this.idleTime > timeToCup){
        this.summonCuppy()
      }
    }
  },
  mounted(){
        setInterval(() => {
      this.idleTime++
    }, 1000)
    document.body.addEventListener(
      'click',
      () => {
        this.idleTime = 0
      },
      true
    )
  }
}
</script>
<style lang="scss" scoped>
.shy-cuppy {
  position: relative;
  bottom: -60px;
  animation: slide-out 1s ease-in-out;
}
.hello-cuppy {
  position: relative;
  bottom: 0px;
  animation: slide-in 1s ease-in-out;
}
#cuppy {
  background-image: url('./../../assets/cuppy.svg');
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
  visibility: visible;
}
.invisible {
  opacity: 0;
  visibility: hidden;
}
#CuppyBubble {
  transform: rotate(10deg);
  //transition: opacity 0.5s ease;
  transition: visibility 1s, opacity 2s;
}
.CuppySpeak {
  transform: translate(-80%, -100%);
}
@keyframes slide-in {
  from {
    bottom: -60px;
  }
  to {
    bottom: 0;
  }
}
@keyframes slide-out {
  from {
    bottom: 0;
  }
  to {
    bottom: -60px;
  }
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
