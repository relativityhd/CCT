<template>
  <div class="ConfigProposal">
    <div class="configHelperText">
      {{ $t('Cuppy.configHelper.helperText') }}
    </div>
    <div class="preset-recommendation">
      <cv-dropdown
      :placeholder="'Chose a preset'"
      v-model="selected"
      >
        <cv-dropdown-item 
          v-for="(preset, index) in getPresets('fridge')" 
          :key="`${index}`" 
          :value="`${index}`">
          {{ preset.name }}
        </cv-dropdown-item>
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
import {presets} from './configurations'

export default {
  data: ()=> {
    return{
      selected: '',
      //presets: presets
    }
  },
  props:{
    category: {
      type: String,
      required: true
    }
  },
  methods:{
    pushConfiguration(id) {
      const preset = this.getPresets(this.category)[id]
      console.log(preset)
      this.$router.push(`/tool/2/${preset.uid}`)
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