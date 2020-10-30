<template>
  <div id="speak" class="speech-bubble">
    <h5 class="greet">
      {{ cuppyGreet }}
    </h5>
    <div class="bubble-content">
      <slot>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cuppyGreet: "Hi I'm Cuppy"
    }
  },
  props: {
    showCuppyBubble: {
      type: Boolean
    }
  },
  methods: {
    greetUser() {
      const puns = this.$t('Cuppy.puns')
      return puns[Math.floor(Math.random() * 4)]
    },
    
  },
  watch: {
    showCuppyBubble: function(oldVal) {
      if (oldVal) {
        this.cuppyGreet = this.greetUser()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.speech-bubble {
  position: relative;
  background: #ffffff;
  border-radius: 0.4em;
}

.speech-bubble:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 90%;
  width: 0;
  height: 0;
  border: 20px solid transparent;
  border-top-color: #ffffff;
  border-bottom: 0;
  border-left: 0;
  margin-left: -10px;
  margin-bottom: -20px;
}

#speak {
  display: flex;
  flex-direction: column;
  height: max-content;
  width: min-content;
}

.greet{
  margin-bottom: .3rem;
}

.bubble-content {
  margin: 10px 10px 10px 10px;
}
</style>
