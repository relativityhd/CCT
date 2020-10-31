<template>
  <div v-bind:class="{ 'hello-cuppy': showCuppy, 'shy-cuppy': !showCuppy }">
    <div class="cuppy-hoveraround">
      <div id="cuppy" @click="cuppyButton">
        <div id="CuppyBubble" v-bind:class="{ visible: showCuppy, invisible: !showCuppy }">
          <div class="CuppySpeak" @click.stop="">
            <CuppySpeak :showCuppyBubble="showCuppy">

              <NewConfigHelper
               :category="'highboards'"
               v-if="$router.currentRoute.name == 'Catalogue' && !onTour">
               </NewConfigHelper>
              <RoomHeightHelper v-else-if="$router.currentRoute.name == 'Tool' && !onTour"
              :cupboardHeight="150"
              :cupboardDepth="30"
              ></RoomHeightHelper>
              <WebsiteTourHelper v-else-if="$router.currentRoute.name == 'Hoempage' && !alreadyToured">
              </WebsiteTourHelper>
              <RouterHelper v-else></RouterHelper>
            </CuppySpeak>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CuppySpeak from './CuppySpeak'
import RouterHelper from './RouterHelper'
import NewConfigHelper from './NewConfigHelper'
import RoomHeightHelper from './RoomHeightHelper'
import WebsiteTourHelper from './WebsiteTourHelper'
const timeToCup = 30
export default {
  components: {
    CuppySpeak,
    RouterHelper,
    NewConfigHelper,
    RoomHeightHelper,
    WebsiteTourHelper
  },

  methods: {
    cuppyButton() {
      this.showCuppy = !this.showCuppy
    },
    summonCuppy() {
      this.showCuppy = true
    },
    endTour(){
      this.onTour = false
      this.alreadyToured = true

    },
    startTour(){
      this.onTour = true
    }
    
  },
  data: () => {
    return {
      showCuppy: false,
      idleTime: 0,
      interval: Function,
      onTour: false,
      alreadyToured: false
    }
  },
  watch: {
    idleTime: function() {
      if (this.idleTime > timeToCup) {
        this.summonCuppy()
      }
    },
  },
  created() {
    this.interval = setInterval(() => {
      this.idleTime++
    }, 1000)
    document.body.addEventListener(
      'click',
      () => {
        this.idleTime = 0
      },
      true
    )
  },
  beforeDestroy() {
    clearInterval(this.interval)
  }
}
</script>
<style lang="scss" scoped>
$cuppy-hidden: -100px;

.shy-cuppy {
  position: relative;
  bottom: $cuppy-hidden;
  animation: slide-out 1s ease-in-out;
}
.hello-cuppy {
  position: relative;
  bottom: 0px;
  animation: slide-in 1s ease-in-out;
}
#cuppy {
  background-image: url('./../../assets/images/cuppy/cuppy.svg');
  background-repeat: no-repeat;
  background-size: contain;
  height: 15rem;
  width: 10rem;
  overflow: visible;
  transform: rotate(-10deg);
}
cuppy:not(:first-child){
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
    bottom: $cuppy-hidden;
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
    bottom: $cuppy-hidden;
  }
}
@keyframes hoveraround {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(1.5vh);
  }
}
</style>
