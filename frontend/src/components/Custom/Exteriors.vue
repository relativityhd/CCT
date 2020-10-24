<template>
  <div>
    <div class="selection-wrapper">
      <cv-button :icon="Edit16" kind="primary" @click="$refs.addModal.show()">
        {{ $t('Tool.addExterior') }}
      </cv-button>

      <cv-modal
        :close-aria-label="$t('close')"
        ref="addModal"
        @primary-click="addExteriors"
      >
        <template slot="label">{{$t('Tool.exterior.addLabel')}}</template>
        <template slot="title">{{$t('Tool.exterior.addTitle')}}</template>
        <template slot="content">
          <Selectable
            ref="selectables"
            v-for="selectable in selectables"
            :key="selectable.id"
            :selectable="selectable"
          />
        </template>
        <template slot="secondary-button">{{ $t('close') }}</template>
        <template slot="primary-button">{{ $t('Tool.addExterior') }}</template>
      </cv-modal>
    </div>

    <hr />

    <div class="edit-wrapper">
      <Exterior
        v-for="exterior in exteriors"
        :key="exterior._uid"
        :exterior="exterior"
        v-on:delete="deleteExterior(exterior._uid)"
        v-on:quantity="$emit('changes')" />
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import Exterior from '../Selectables/Exterior'
import Selectable from '../Selectables/Selectable'
import Edit16 from '@carbon/icons-vue/es/edit/16'

export default {
  name: 'Exteriors',
  components: {
    Exterior,
    Selectable
  },
  props: {
    selectables: Array,
    exteriors: Array
  },
  data () { return {
    Edit16,
    addIds: []
  }},
  methods: {
    addExteriors () {
      this.selectables.forEach((s, i) => {
        const { selected, quantity, custom } = this.$refs.selectables[i].getInputs()
        if (selected) {
          for (let _=0; _<quantity; _++) {
            const newExterior = { ...s }
            newExterior._uid = uuidv4()
            newExterior.quantity = 1
            newExterior.custom = custom
            this.exteriors.push(newExterior)
          }
        }
      })
      this.$emit('changes')
    },
    deleteExterior (_uid) {
      const i = this.exteriors.findIndex(ext => ext._uid === _uid)
      if (i === -1) return
      this.exteriors.splice(i, 1)
      this.$emit('changes')
    }
  }
}
</script>
