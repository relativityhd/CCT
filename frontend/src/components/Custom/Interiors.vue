<template>
  <div>
    <div class="selection-wrapper">
      <cv-button :icon="Edit16" kind="primary" @click="$refs.addModal.show()">
        {{ $t('Tool.interior.add') }}
      </cv-button>

      <cv-modal :close-aria-label="$t('close')" ref="addModal" @primary-click="addInteriors">
        <template slot="label">{{ $t('Tool.interior.addLabel') }}</template>
        <template slot="title">{{ $t('Tool.interior.addTitle') }}</template>
        <template slot="content">
          <Selectable
            ref="selectables"
            v-for="selectable in selectables"
            :key="selectable.id"
            :selectable="selectable"
            :customizable="false"
          />
        </template>
        <template slot="secondary-button">{{ $t('close') }}</template>
        <template slot="primary-button">{{ $t('Tool.interior.add') }}</template>
      </cv-modal>
    </div>

    <hr />

    <div class="edit-wrapper">
      <Interior
        v-for="interior in interiors"
        :key="interior._uid"
        :interior="interior"
        v-on:delete="deleteInterior(interior._uid)"
        v-on:change-quantity="$emit('change-items')"
      />
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import Interior from '../Selectables/Interior'
import Selectable from '../Selectables/Selectable'
import Edit16 from '@carbon/icons-vue/es/edit/16'

export default {
  name: 'Exteriors',
  components: {
    Interior,
    Selectable
  },
  props: {
    selectables: Array,
    interiors: Array
  },
  data() {
    return {
      Edit16
    }
  },
  methods: {
    addInteriors() {
      this.selectables.forEach((s, i) => {
        const { selected, quantity } = this.$refs.selectables[i].getInputs()
        this.$refs.selectables[i].clearInputs()
        if (selected) {
          for (let _ = 0; _ < quantity; _++) {
            const newInterior = { ...s }
            newInterior._uid = uuidv4()
            newInterior.quantity = 1
            this.interiors.push(newInterior)
          }
        }
      })
      this.$refs.addModal.hide()
      this.$emit('change-items')
    },
    deleteInterior(_uid) {
      const i = this.interiors.findIndex(ext => ext._uid === _uid)
      if (i === -1) return
      this.interiors.splice(i, 1)
      this.$emit('change-items')
    }
  }
}
</script>
