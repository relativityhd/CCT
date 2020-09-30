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

      <div class="offer">{{ $t('offer') }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tool',
  data() {
    return {
      // This is hardcoded sample data, needs to be replaced!
      dropdowns: [
        {
          name: this.$i18n.t('dropdowns.ola'),
          options: [
            { value: '0', text: 'Ola' },
            { value: '1', text: 'Olala' },
            { value: '2', text: 'Olalala' },
            { value: '3', text: 'Olalalala' }
          ],
          selected: '0'
        },
        {
          name: this.$i18n.t('dropdowns.hi'),
          options: [
            { value: '0', text: 'Hi' },
            { value: '1', text: 'Hihi' },
            { value: '2', text: 'Hihihi' },
            { value: '3', text: 'Hihihihi' }
          ],
          selected: '0'
        },
        {
          name: this.$i18n.t('dropdowns.ah'),
          options: [
            { value: '0', text: 'Ah' },
            { value: '1', text: 'Ahah' },
            { value: '2', text: 'Ahahaha' },
            { value: '3', text: 'Ahahahaha' }
          ],
          selected: '0'
        }
      ]
    }
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
