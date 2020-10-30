<template>
  <div class="ConfigProposal">
    <div class="configHelperText">
      {{ $t('Cuppy.configHelper.helperText') }}
    </div>
    <div class="preset-recommendation">
      <cv-dropdown
      :placeholder="'Chose a preset'"
      value="value"
      v-model="selected"
      >
        <cv-doprdown-item 
          v-for="preset in ()=>{return getPresets('fridge')}" 
          :key="preset" 
          :value="3">
          {{ preset.name }}
        </cv-doprdown-item>
      </cv-dropdown>
    </div>
    <table class="buttons">
      <tr><td><cv-button @click="()=>{return pushConfiguration(selected)}">
        {{ $t('Cuppy.configHelper.positive') }}
      </cv-button></td></tr>
      <tr><td><cv-button>
        {{ $t('Cuppy.configHelper.negative') }}
      </cv-button></td></tr>
    </table>
  </div>
</template>
<script>
import {presets}from './configurations'

export default {
  data: ()=> {
    return{
      selected: {},
      //presets: presets
    }
  },
  methods:{
    pushConfiguration(configuration) {
      console.log(configuration)
    },
    getPresets(category) {
      //Only configurations with selected category
      return presets.filter(config => config.category == category)
    }
  }
}
</script>
<style lang="scss" scoped>

button{
  width: 100%;
  font-size: 1rem;
  border: none;
  margin: 5px 0 5px 0;
  cursor: pointer;
}
</style>