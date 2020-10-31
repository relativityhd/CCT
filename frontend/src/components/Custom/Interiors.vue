<template>
  <div>
    <div class="edit-wrapper">
      <Interior
        ref="interiors"
        v-for="interior in selectableInteriors"
        :key="interior.id"
        :interior="interior"
        :ext="ext"
        v-on:delete="deleteInterior"
        v-on:change-quantity="changeInterior"
        v-on:add="addInterior"
      />
      <Interior
        ref="accessories"
        v-for="accessory in selectableAccessories"
        :key="accessory.id"
        :interior="accessory"
        :ext="ext"
        v-on:delete="deleteAccessory"
        v-on:change-quantity="changeAccessory"
        v-on:add="addAccessory"
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
    selectableInteriors: Array,
    selectableAccessories: Array,
    ext: Object
  },
  mounted() {
    this.setInteriors()
    this.setAccessory()
  },
  watch: {
    ext() {
      this.setInteriors()
      this.setAccessory()
    }
  },
  methods: {
    setInteriors() {
      this.selectableInteriors.forEach((s, i) => {
        const int = this.ext.interiors.find(int => int.id === s.id)
        const ref = this.$refs.interiors[i]
        if (int) {
          ref.quantity = int.quantity
        } else {
          ref.quantity = 0
        }
      })
    },
    setAccessory() {
      this.selectableAccessories.forEach((s, i) => {
        const acc = this.ext.accessories.find(acc => acc.id === s.id)
        const ref = this.$refs.accessories[i]
        if (acc) {
          ref.quantity = acc.quantity
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
        const newInterior = { ...this.selectableInteriors.find(s => s.id === id) }
        newInterior._uid = uuidv4()
        newInterior.quantity = 1
        this.ext.interiors.push(newInterior)
      }
      this.$emit('change-items')
    },
    addAccessory(id) {
      const existingAcc = this.ext.accessories.find(acc => acc.id === id)
      if (existingAcc) {
        existingAcc.quantity = 1
      } else {
        const newAccessory = { ...this.selectableAccessories.find(s => s.id === id) }
        newAccessory._uid = uuidv4()
        newAccessory.quantity = 1
        this.ext.accessories.push(newAccessory)
      }
      this.$emit('change-items')
    },
    changeInterior(id, quantity) {
      const existingInt = this.ext.interiors.find(int => int.id === id)
      if (!existingInt) return
      existingInt.quantity = quantity
      this.$emit('change-items')
    },
    changeAccessory(id, quantity) {
      const existingAcc = this.ext.accessories.find(acc => acc.id === id)
      if (!existingAcc) return
      existingAcc.quantity = quantity
      this.$emit('change-items')
    },
    deleteInterior(id) {
      const i = this.ext.interiors.findIndex(int => int.id === id)
      if (i === -1) return
      this.ext.interiors.splice(i, 1)
      this.$emit('change-items')
    },
    deleteAccessory(id) {
      const i = this.ext.accessories.findIndex(acc => acc.id === id)
      if (i === -1) return
      this.ext.accessories.splice(i, 1)
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
