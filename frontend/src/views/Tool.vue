<template>
  <div class="tool">
    <h1>{{ $t('title') }}</h1>
    <div class="tool-body">
      <div class="dropdowns">
        <div class="dropdown-container" v-for="dd in dropdowns" :key="dd.name">
          <cv-dropdown
            :label="dd.name"
            :value="dd.selected"
            v-model="dd.selected"
            @change="calcOffer"
          >
            <cv-dropdown-item
              v-for="option in dd.options"
              :key="option.value"
              :value="option.value"
            >
              {{ option.text }}
            </cv-dropdown-item>
          </cv-dropdown>
        </div>
      </div>

      <div class="offer">{{ offermessage }}</div><!--vorher: {{ $t('offer') }}-->
      
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'Tool',
  data() {
    return {
      // This is hardcoded sample data, needs to be replaced!
      dropdowns: {
        bodies: {
          name: this.$i18n.t('dropdowns.ola'),
          options:[] ,
          selected: '0'
        },
        doors: {
          name: this.$i18n.t('dropdowns.hi'),
          options: [],
          selected: '0'
        },
        boards: {
          name: this.$i18n.t('dropdowns.ah'),
          options: [],
          selected: '0'
        }
      },

      offermessage: 'offer'
    }
  },
  methods: {
    calcOffer() {
      const summedprice = this.dropdowns.bodies.options[this.dropdowns.bodies.selected].price + this.dropdowns.doors.options[this.dropdowns.doors.selected].price + this.dropdowns.boards.options[this.dropdowns.boards.selected].price
      const offersummary = this.dropdowns.bodies.options[this.dropdowns.bodies.selected].text + ': ' + this.dropdowns.bodies.options[this.dropdowns.bodies.selected].price + ' |\n' + this.dropdowns.doors.options[this.dropdowns.doors.selected].text + ': ' + this.dropdowns.doors.options[this.dropdowns.doors.selected].price + ' |\n' + this.dropdowns.boards.options[this.dropdowns.boards.selected].text + ': ' + this.dropdowns.boards.options[this.dropdowns.boards.selected].price + ' |\n' + 'offer: ' + summedprice
      console.log(offersummary)
      this.offermessage = offersummary
    }
  },
  mounted() {

    const bodiesProm = new Promise((res) => {
      Vue.axios
      .get('https://5f75b9991cf3c900161ce5f4.mockapi.io/productservice/bodies')
      .then(resp => {
          console.log(resp.data)
          this.dropdowns.bodies.options = resp.data.map((option,i) => ({
              text: option.name, 
              price: option.price,
              value: i.toString()
          }))
          res()
      })
    })

    const doorsProm = new Promise((res) => {
      Vue.axios
      .get('https://5f75b9991cf3c900161ce5f4.mockapi.io/productservice/doors')
      .then(resp => {
          console.log(resp.data)
          this.dropdowns.doors.options = resp.data.map((option,i) => ({
              text: option.name,
              price: option.price,
              value: i.toString()
          }))
          res()
      })
    })

    const boardsProm = new Promise((res) => {
      Vue.axios
      .get('https://5f75b9991cf3c900161ce5f4.mockapi.io/productservice/boards')
      .then(resp => {
          console.log(resp.data)
          this.dropdowns.boards.options = resp.data.map((option,i) => ({
              text: option.name,
              price: option.price,
              value: i.toString()
          }))
          res()
      })
    })

    Promise.allSettled([
      bodiesProm,
      doorsProm,
      boardsProm
    ]).then(this.calcOffer)

  }
}
</script>

<style lang="sass" scoped>
@import '~@carbon/themes/scss/themes'
@import '../assets/sass/style'
$carbon--theme: $carbon--theme--what
@include carbon--theme()

.tool-body
  display: flex
  flex-direction: row
  flex-wrap: wrap
  justify-content: center

.dropdowns
  display: flex
  flex-direction: row
  flex-wrap: wrap
  justify-content: center
  width: 100%

.dropdown-container
  width: 100%
  max-width: 500px
  padding: 5px

.offer
  width: 100%
  background-color: $ui-04
  height: 100px

@media screen and (min-width: 1300px)
  .dropdowns
    max-width: 1500px
  .offer
    max-width: 400px
</style>

<i18n>
{
  "en": {
    "title": "Tool",
    "dropdowns": {
      "ola": "Select Ola",
      "hi": "Select Hi",
      "ah": "Select Ah"
    },
    "offer": "Offer"
  },
  "de": {
    "title": "Konfigurator",
    "dropdowns": {
      "ola": "Wähle Ola",
      "hi": "Wähle Hi",
      "ah": "Wähle Ah"
    },
    "offer": "Angebot"
  }
}
</i18n>
