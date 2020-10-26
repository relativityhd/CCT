<template>
  <div>
    <cv-modal class="add-modal" :close-aria-label="$t('close')" ref="addModal" @primary-click="addExteriors" :primary-button-disabled="!addable">
      <template slot="label">{{ $t('Tool.exterior.addLabel') }}</template>
      <template slot="title">{{ $t('Tool.exterior.addTitle') }}</template>
      <template slot="content">
        <div class="selectables-wrapper">
          <Selectable
            ref="selectables"
            v-for="selectable in selectables"
            :key="selectable.id"
            :selectable="selectable"
            :customizable="true"
            v-on:select="checkSelects"
          />
        </div>
      </template>
      <template slot="secondary-button">{{ $t('close') }}</template>
      <template slot="primary-button">{{ $t('Tool.addExterior') }}</template>
    </cv-modal>

    <div class="edit-wrapper">
      <Exterior
        v-for="exterior in exteriors"
        :key="exterior._uid"
        :exterior="exterior"
        v-on:delete="deleteExterior(exterior._uid)"
        v-on:change-quantity="$emit('change-items')"
        v-on:select="$emit('select', exterior._uid)"
      />

      <div class="add-btn">
        <cv-tile class="add-tile" kind="clickable" @click="$refs.addModal.show()">
          <Add32 class="add-icon" />
        </cv-tile>
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import Exterior from '../Selectables/Exterior'
import Selectable from '../Selectables/Selectable'
import Add32 from '@carbon/icons-vue/es/add/32'

export default {
  name: 'Exteriors',
  components: {
    Add32,
    Exterior,
    Selectable
  },
  props: {
    selectables: Array,
    exteriors: Array,
    standardMat: Object,

  },
  data() {
    return {
      addable: false
    }
  },
  methods: {
    checkSelects() {
      this.addable = false
      for (let i=0; i<this.selectables.length; i++) {
        const { selected } = this.$refs.selectables[i].getInputs()
        if (selected) this.addable = true
        break
      }
    },
    addExteriors() {
      this.selectables.forEach((s, i) => {
        const { selected, quantity, custom } = this.$refs.selectables[i].getInputs()
        this.$refs.selectables[i].clearInputs()
        if (selected) {
          for (let _ = 0; _ < quantity; _++) {
            const newExterior = { ...s }
            newExterior._uid = uuidv4()
            newExterior.quantity = 1
            newExterior.custom = custom
            newExterior.interiors = []
            newExterior.material = this.standardMat
            this.exteriors.push(newExterior)
          }
        }
      })
      this.$refs.addModal.hide()
      this.$emit('change-items')
    },
    deleteExterior(_uid) {
      const i = this.exteriors.findIndex(ext => ext._uid === _uid)
      if (i === -1) return
      this.exteriors.splice(i, 1)
      this.$emit('change-items')
      this.$emit('select', '')
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-wrapper {
  display: grid;
  grid-auto-flow: row;
  gap: 5px;
}

.add-modal {
  text-align: left;
}

.selectables-wrapper {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}

.add-btn {
  border: 1px dashed $ui-04;
}

.add-btn:hover {
  border: 2px solid $interactive-03;
}

.add-tile {
  opacity: 0.3;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 143px;
}

.add-tile:hover {
  opacity: 1;
}

.add-icon {
  height: 64px;
  width: 64px;
}
</style>
