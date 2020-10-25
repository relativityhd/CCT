<template>
  <div>
    <div class="selection-wrapper">
      <cv-modal class="add-modal" :close-aria-label="$t('close')" ref="addModal" @primary-click="addInteriors">
        <template slot="label">{{ $t('Tool.interior.addLabel') }}</template>
        <template slot="title">{{ $t('Tool.interior.addTitle') }}</template>
        <template slot="content">
          <div class="selectables-wrapper">
            <Selectable
              ref="selectables"
              v-for="selectable in selectables"
              :key="selectable.id"
              :selectable="selectable"
              :customizable="false"
            />
          </div>
        </template>
        <template slot="secondary-button">{{ $t('close') }}</template>
        <template slot="primary-button">{{ $t('Tool.interior.add') }}</template>
      </cv-modal>
    </div>

    <h3>{{ $t('Tool.interior.title') }}</h3>

    <hr />

    <div class="edit-wrapper">
      <Interior
        v-for="interior in interiors"
        :key="interior._uid"
        :interior="interior"
        v-on:delete="deleteInterior(interior._uid)"
        v-on:change-quantity="$emit('change-items')"
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
import Interior from '../Selectables/Interior'
import Selectable from '../Selectables/Selectable'
import Add32 from '@carbon/icons-vue/es/add/32'

export default {
  name: 'Interiors',
  components: {
    Add32,
    Interior,
    Selectable
  },
  props: {
    selectables: Array,
    interiors: Array
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

<style lang="scss" scoped>
.selection-wrapper {
  text-align: right;
}

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
