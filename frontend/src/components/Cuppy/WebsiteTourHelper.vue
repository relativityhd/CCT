<template>
  <div class="tour-helper">
    <div class="helperText">
      {{ $t(`Cuppy.tourHelper.tour${currentTour.text}`) }}
    </div>
    <cv-button v-if="currentStep != 0" class="next-button" @click="nextStep">
      {{ $t('Cuppy.tourHelper.next') }}
    </cv-button>
    <cv-button v-else @click="startTour">
      {{ $t('Cuppy.tourHelper.startTour') }}
    </cv-button>
  </div>
</template>

<script>
import { tour } from './WebsiteTour'
export default {
  data() {
    return {
      currentStep: 0
    }
  },
  methods: {
    startTour() {
      this.$parent.$parent.startTour()
      this.nextStep()
    },
    nextStep() {
      this.currentStep++
      if (this.currentStep >= tour.length) {
        this.$parent.$parent.endTour()
        return
      }
      this.renderStep(this.currentTour)
    },

    renderStep(step) {
      if (step.site) {
        this.pushRoute(step.site)
      } else if (step.tool) {
        this.pushTool(step.tool)
      }
    },

    pushRoute(route) {
      // These functions exist to be able to implement further logic if needed
      this.$router.push(route)
    },
    pushTool(action) {
      this.$root.$emit(action)
    }
  },
  computed: {
    currentTour: function() {
      return tour[this.currentStep]
    }
  },
  destroyed() {
    this.currentStep = 0
    this.$parent.$parent.endTour()
  }
}
</script>
<style lang="scss" scoped>
.helper-text {
  font-size: 120%;
}
.tour-helper {
  min-width: 10rem;
}
.next-button {
  margin-top: 10px;
}
</style>
