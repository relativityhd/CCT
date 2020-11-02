<template>
  <div class="ConfigProposal">
    <div class="configHelperText">
      {{ $t('Cuppy.configHelper.helperText') }}
    </div>
    <div class="preset-recommendation">
      <cv-dropdown :placeholder="'Chose a preset'" v-model="selected">
        <cv-dropdown-item v-for="(preset, index) in getPresets(category)" :key="`${index}`" :value="`${preset.id}`">
          {{ preset.name }}
        </cv-dropdown-item>
      </cv-dropdown>
    </div>
    <div class="buttons">
      <cv-button
        @click="
          () => {
            return pushConfiguration(selected)
          }
        "
      >
        {{ $t('Cuppy.configHelper.positive') }}
      </cv-button>
    </div>
  </div>
</template>
<script>
import presets from '../../assets/preconfigs'

export default {
  name: 'CuppyConfigHelper',
  data: () => {
    return {
      selected: ''
    }
  },
  props: {
    category: {
      type: String,
      required: true
    }
  },
  methods: {
    pushConfiguration(id) {
      this.$store.state.cuppy.pendingConfiguration = id
      this.$router.push('/tool/2')
    },
    getPresets(category) {
      //Only configurations with selected category
      return presets.filter(config => config.category == category)
    }
  }
}
</script>
<style lang="scss" scoped>
button {
  width: 100%;
  font-size: 0.8rem;
  border: none;
  margin: 5px 0 5px 0;
  cursor: pointer;
}
</style>
