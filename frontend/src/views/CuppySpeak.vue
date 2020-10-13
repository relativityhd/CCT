<template>
<div id=speak class=speech-bubble>
  <div id=bubblecontent>
    <div id=greet>
      {{ cuppyGreet }}
    </div>
    <div id=buttoncontainer>
        <router-link to="/" tag="button">{{ $t('location') }}</router-link>
        <router-link to="/support" tag="button">{{ $t('support') }}</router-link>
        <router-link to="/about" tag="button">{{ $t('imprint') }}</router-link>
        <button>Philipp ist doof</button>
        <button>Christopher ist doof</button>
    </div>
  </div>

</div>
</template>

<script>
export default {
  data(){ 
    return{
      cuppyGreet: "Hi I'm Cuppy"
    }
  },
  props:{
    showCuppyBubble:{
      type: Boolean
    }
  },
  methods:{
    greetUser(){
      const puns = this.$t('puns')
      console.log(puns[0])
      return puns[Math.floor(Math.random() * 4)];
    }
  },
  watch:{
    showCuppyBubble: function(){
      this.cuppyGreet = this.greetUser()
    }
  }
}

</script>
<i18n>
{
  "en":{
    "location": "I'm from somewhere else!",
    "support": "I need some help",
    "imprint": "Who made this page?",
    "puns": [
      "CUPE DIEM", 
      "CUPOW! I’m here to help you",
      "Im Cuppy from Cuptown and im coming to help you",
      "Whats Cup, do you need any Help?"
    ]

  },
  "de":{
    "location": "Ich komme von woanders!",
    "support": "Ich brauche Hilfe",
    "imprint": "Wer ist verantwortlich?",
    "puns": [
      "CUPE DIEM!", 
      "Du kupierst was nicht? Wie kann ich dir helfen?!", 
      "CUPOW! Ich bin hier um dir zu helfen!",
      "Ich bin Cuppy aus Cupstadt und eile zu deiner Hilfe!"
    ]

  },
  "it":{
    "location": "Vengo da un altro posto!",
    "support": "Ho bisogno di aiuto",
    "imprint": "Chi è il responsabile?"
  }
}
</i18n>
<style lang="sass" scoped>
.speech-bubble
	position: relative
	background: #ffffff
	border-radius: .4em


.speech-bubble:after 
	content: ''
	position: absolute
	bottom: 0
	left: 50%
	width: 0
	height: 0
	border: 20px solid transparent
	border-top-color: #ffffff
	border-bottom: 0
	border-left: 0
	margin-left: -10px
	margin-bottom: -20px


#speak
  display: flex
  flex-direction: column
  height: max-content
  width: min-content
#buttoncontainer
  margin: 10px 10px 10px 10px
  display: flex
  flex-direction: column
button
  border: none
  width: max-content
  margin-top: 3px

</style>