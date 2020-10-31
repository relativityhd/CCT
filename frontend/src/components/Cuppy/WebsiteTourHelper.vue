<template>
  {{ $t(`${currentTour.text}`) }}
  <cv-button 
  class="next-button"
  @click="">
</template>

<script>
  import { tour } from './WebsiteTour'
export default {
  data() {
    return{
      currentStep: 0,
      currentTour: tour[this.currentStep]
    }
  },
  methods: {
    nextStep () {
      this.currentStep++
      this.renderStep(currentTour)
    },
    renderStep(step) {
        if(step.site){
          this.pushRoute(step.site)
        }
        else if(step.tool){
          this.pushTool(step.tool)
        }
      },
    pushRoute(route){
      // Theese functions exist to be able to implement further logic if its needed
      this.$router.push(route)
    },
    pushTool(action){
      this.$root.$emit(action)
    }
  },
  computed:{
    currentTour:function() {
      return tour[this.currentStep]
    }
  }
}
</script>