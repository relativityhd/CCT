<template>
  <div>
    <cv-number-input
      :label="$t('width')"
      v-model="custom.width"
      :mobile="$store.state.mobile"
      :invalid-message="invalids.width"
      @input="changeCustom('width')"
    ></cv-number-input>

    <br />

    <cv-number-input
      :label="$t('height')"
      v-model="custom.height"
      :mobile="$store.state.mobile"
      :invalid-message="invalids.height"
      @input="changeCustom('height')"
    ></cv-number-input>

    <br />

    <cv-number-input
      :label="$t('depth')"
      v-model="custom.depth"
      :mobile="$store.state.mobile"
      :invalid-message="invalids.depth"
      @input="changeCustom('depth')"
    ></cv-number-input>
  </div>
</template>

<script>
export default {
  name: 'ProductCustomization',
  props: {
    custom: Object
  },
  data() {
    return {
      invalids: {
        width: '',
        height: '',
        depth: ''
      }
    }
  },
  methods: {
    changeCustom(key) {
      if (Number.isNaN(parseInt(this.custom[key]))) {
        this.invalids[key] = this.$t('invalidNumber', { min: 0, max: 1000 })
        return
      }
      if (parseInt(this.custom[key]) < 0 || parseInt(this.custom[key]) > 1000) {
        this.invalids[key] = this.$t('invalidNumber', { min: 0, max: 1000 })
        return
      }
      this.invalids[key] = ''
      this.custom.customized = this.custom.width !== 0 && this.custom.height !== 0 && this.custom.depth !== 0
    }
  }
}
</script>
