<template>
  <div id="speak" class="speech-bubble">
    <h5 class="greet">
      {{ $t(`Cuppy.puns[${punNr}]`) }}
    </h5>
    <div class="bubble-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CuppySpeak',
  props: {
    showCuppyBubble: {
      type: Boolean
    }
  },
  data() {
    return {
      punNr: 0
    }
  },
  watch: {
    showCuppyBubble: function(oldVal) {
      if (oldVal) this.punNr = Math.floor(Math.random() * 4)
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
  box-shadow: 0px 0px 13px 0px rgba(50, 50, 50, 0.7);
  display: flex;
  flex-direction: column;
  height: max-content;
  min-width: 250px;
}

.greet {
  margin-bottom: 0.3rem;
}

.bubble-content {
  margin: 10px 10px 10px 10px;
  overflow-y: auto;
  max-height: 320px;
}
</style>
