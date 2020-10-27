<template>
  <div>
    <div class="edit-wrapper">
      <Interior
        ref="interiors"
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
    ext: Object
  },
  mounted() {
    this.setInteriors()
  },
  watch: {
    ext() {
      this.setInteriors()
    }
  },
  methods: {
    setInteriors() {
      this.selectables.forEach((s, i) => {
        const int = this.ext.interiors.find(int => int.id === s.id)
        const ref = this.$refs.interiors[i]
        if (int) {
          ref.quantity = int.quantity
        } else {
          ref.quantity = 0
        }
      })
    },
    addInterior(id) {
      const existingInt = this.ext.interiors.find(int => int.id === id)
      if (existingInt) {
        existingInt.quantity = 1
      } else {
        const newInterior = { ...this.selectables.find(s => s.id === id) }
        newInterior._uid = uuidv4()
        newInterior.quantity = 1
        this.ext.interiors.push(newInterior)
      }
      this.$emit('change-items')
    },
    changeInterior(id, quantity) {
      const existingInt = this.ext.interiors.find(int => int.id === id)
      if (!existingInt) return
      existingInt.quantity = quantity
      this.$emit('change-items')
    },
    deleteInterior(id) {
      const i = this.ext.interiors.findIndex(int => int.id === id)
      if (i === -1) return
      this.ext.interiors.splice(i, 1)
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
