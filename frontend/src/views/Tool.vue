<template>
  <div class="tool">
    <h1 class="p-title">{{ $t('title') }}</h1>
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

      <div class="offer">
        <h3 class="offer-title">{{ $t('offer') }}</h3>
        <hr />
        <div class="pricing">
          <p>{{ `${$t('body')}: $${prices.body}` }}</p>
          <p>{{ `${$t('door')}: $${prices.door}` }}</p>
          <p>{{ `${$t('board')}: $${prices.board}` }}</p>
          <hr />
          <p>{{ `${$t('nonVAT')}: $${prices.nonVat}` }}</p>
          <p>
            {{
              `${$t('VAT')} (${$store.state.vatRate * 100}%): $${prices.vat}`
            }}
          </p>
          <hr />
          <p>{{ `${$t('offerSum')}: $${offerSum}` }}</p>
        </div>
      </div>
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
          name: this.$i18n.t('dropdowns.body'),
          options: [],
          selected: '0'
        },
        doors: {
          name: this.$i18n.t('dropdowns.door'),
          options: [],
          selected: '0'
        },
        boards: {
          name: this.$i18n.t('dropdowns.board'),
          options: [],
          selected: '0'
        }
      },
      prices: {
        vat: 0,
        nonVat: 0,
        body: 0,
        door: 0,
        board: 0
      },
      offerSum: 0
    }
  },
  methods: {
    calcOffer() {
      this.prices.body = this.dropdowns.bodies.options[
        this.dropdowns.bodies.selected
      ].price
      this.prices.door = this.dropdowns.doors.options[
        this.dropdowns.doors.selected
      ].price
      this.prices.board = this.dropdowns.boards.options[
        this.dropdowns.boards.selected
      ].price
      this.offerSum = this.prices.body + this.prices.door + this.prices.board

      this.prices.nonVat = (
        this.offerSum /
        (1 + this.$store.state.vatRate)
      ).toFixed(2)
      this.prices.vat = (
        this.prices.nonVat * this.$store.state.vatRate
      ).toFixed(2)
    }
  },
  mounted() {
    const bodiesProm = new Promise(res => {
      Vue.axios.get('/product-service/bodies').then(resp => {
        console.log(resp.data)
        this.dropdowns.bodies.options = resp.data.map((option, i) => ({
          text: `${option.name} ($${option.price})`,
          price: option.price,
          value: i.toString()
        }))
        res()
      })
    })

    const doorsProm = new Promise(res => {
      Vue.axios.get('/product-service/doors').then(resp => {
        console.log(resp.data)
        this.dropdowns.doors.options = resp.data.map((option, i) => ({
          text: `${option.name} ($${option.price})`,
          price: option.price,
          value: i.toString()
        }))
        res()
      })
    })

    const boardsProm = new Promise(res => {
      Vue.axios.get('/product-service/boards').then(resp => {
        console.log(resp.data)
        this.dropdowns.boards.options = resp.data.map((option, i) => ({
          text: `${option.name} ($${option.price})`,
          price: option.price,
          value: i.toString()
        }))
        res()
      })
    })

    Promise.allSettled([bodiesProm, doorsProm, boardsProm]).then(this.calcOffer)
  }
}
</script>

<style lang="scss" scoped>
.p-title {
  font-size: calc(20px + 3vmin);
}
.tool-body {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
.dropdowns {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}
.dropdown-container {
  width: 100%;
  max-width: 300px;
  padding: 5px;
}
.offer {
  width: 100%;
  max-width: 300px;
}
@media screen and (min-width: 1300px) {
  .dropdowns {
    max-width: 900px;
  }
}
.pricing {
  text-align: left;
  padding: 0px 20px;
}

.offer-title {
  font-size: calc(15px + 1vmin);
}
</style>

<i18n>
{
  "en": {
    "title": "Tool",
    "dropdowns": {
      "body": "Select a body",
      "door": "Select some doors",
      "board": "Select some boards"
    },
    "offer": "Offer",
    "body": "Body",
    "door": "Doors",
    "board": "Boards",
    "offerSum": "Sum",
    "nonVAT": "Net",
    "VAT": "VAT"
  },
  "de": {
    "title": "Konfigurator",
    "dropdowns": {
      "body": "Wähle einen Corpus",
      "door": "Wähle Türen",
      "board": "Wähle Schubladen"
    },
    "offer": "Angebot"
  }
}
</i18n>
