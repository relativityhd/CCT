<template>
  <div id="speak" class="speech-bubble">
    <h6 id="greet">
      {{ cuppyGreet }}
    </h6>
    <div id="bubblecontent">
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
      const puns = this.$t('CuppySpeak.puns')
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
