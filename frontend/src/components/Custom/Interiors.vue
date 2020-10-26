<template>
  <div>
    <div class="edit-wrapper">
      <Interior
        v-for="interior in selectables"
        :key="interior.id"
        :interior="interior"
        v-on:delete="deleteInterior"
        v-on:change-quantity="changeInterior"
        v-on:add="addInterior"
      />
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import Interior from '../Selectables/Interior'

export default {
  name: 'Interiors',
  components: {
    Interior
  },
  props: {
    selectables: Array,
    interiors: Array
  },
  methods: {
    addInterior(id) {
      const existingInt = this.interiors.find(int => int.id === id)
      if (existingInt) {
        existingInt.quantity = 1
      } else {
        const newInterior = { ...this.selectables.find(s => s.id === id) }
        newInterior._uid = uuidv4()
        newInterior.quantity = 1
        this.interiors.push(newInterior)
      }
      this.$emit('change-items')
    },
    changeInterior(id, quantity) {
      const existingInt = this.interiors.find(int => int.id === id)
      if (!existingInt) return
      existingInt.quantity = quantity
      this.$emit('change-items')
    },
    deleteInterior(id) {
      const i = this.interiors.findIndex(int => int.id === id)
      if (i === -1) return
      this.interiors.splice(i, 1)
      this.$emit('change-items')
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
</style>
