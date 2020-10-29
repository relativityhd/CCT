<template>
  <div>
    <cv-modal
      class="add-modal"
      :close-aria-label="$t('close')"
      ref="addModal"
      @primary-click="addExteriors"
      :primary-button-disabled="!addable"
    >
      <template slot="label">{{ $t('Tool.ext.addLabel') }}</template>
      <template slot="title">{{ $t('Tool.ext.add') }}</template>
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
      <template slot="primary-button">{{ $t('Tool.ext.add') }}</template>
    </cv-modal>

    <div class="edit-wrapper">
      <Exterior
        ref="exteriors"
        v-for="exterior in exteriors"
        :key="exterior._uid"
        :exterior="exterior"
        :selected="selectedExt._uid === exterior._uid"
        v-on:delete="deleteExterior(exterior._uid)"
        v-on:select="$emit('select', exterior._uid)"
      />

      <div class="add-btn" v-if="notFull">
        <cv-tile class="add-tile" kind="clickable" @click="openModal">
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
    selectedExt: Object
  },
  data() {
    return {
      addable: false,
      notFull: this.exteriors.length < 5
    }
  },
  mounted() {
    if (!this.selectables || !this.selectables.length || this.exteriors.length > 1) return
    const { custom } = this.$refs.selectables[0].getInputs()
    const newExterior = { ...this.selectables[0] }
    newExterior._uid = uuidv4()
    newExterior.quantity = 1
    newExterior.custom = custom
    newExterior.interiors = []
    newExterior.accessories = []
    newExterior.material = this.standardMat
    this.exteriors.push(newExterior)
    this.$emit('select', newExterior._uid)
    this.$emit('change-items')
  },
  methods: {
    openModal() {
      this.$refs.addModal.show()
      this.checkSelects()
    },
    checkSelects() {
      this.addable = false
      let newLength = this.exteriors.length
      for (let i = 0; i < this.selectables.length; i++) {
        const { selected, quantity } = this.$refs.selectables[i].getInputs()
        newLength += quantity
        if (newLength > 5) {
          this.addable = false
          this.$refs.selectables[i].invalidMessage = this.$t('invalidNumber', { min: 1, max: 5 - this.exteriors.length })
          break
        }
        if (selected) this.addable = true
      }
    },
    checkFull() {
      this.notFull = this.exteriors.length < 5
    },
    addExteriors() {
      this.selectables.forEach((s, i) => {
        const { selected, quantity, custom } = this.$refs.selectables[i].getInputs()
        this.$refs.selectables[i].clearInputs()
        if (selected) {
          for (let _ = 0; _ < quantity; _++) {
            if (this.exteriors.length >= 5) return
            const newExterior = { ...s }
            newExterior._uid = uuidv4()
            newExterior.quantity = 1
            newExterior.custom = custom
            newExterior.interiors = []
            newExterior.accessories = []
            newExterior.material = this.standardMat
            this.exteriors.push(newExterior)
          }
        }
      })
      this.$refs.addModal.hide()
      this.$emit('change-items')
      if (this.exteriors.length === 0) return
      this.$emit('select', this.exteriors[this.exteriors.length - 1]._uid)
      this.checkFull()
    },
    deleteExterior(_uid) {
      const i = this.exteriors.findIndex(ext => ext._uid === _uid)
      if (i === -1) return
      this.exteriors.splice(i, 1)
      this.$emit('change-items')
      this.$emit('select', '')
      this.checkFull()
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
  outline: 2px solid $interactive-03;
  outline-offset: -2px;
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
