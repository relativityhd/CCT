<template>
  <div>
    <h3>{{ $t('Tool.mats.title') }}</h3>

    <hr />

    <div class="materials-wrapper">
      <cv-tile
        v-for="mat in materials"
        :key="mat.id"
        kind="selectable"
        :value="`${mat.id}`"
        :selected="selections.find(s => s.id === mat.id).selected"
        @change="selectMat(mat.id)">
        <div class="mat-container">
          <img class="mat-img" :src="mat.imageUrl" alt="Image of material">
          <div>
            <h6>{{ mat.name }}</h6>
            <p>{{ $store.getters.formatPrice(mat.price) }}</p>
          </div>
        </div>
      </cv-tile>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Materials',
  props: {
    materials: Array,
    ext: Object
  },
  data() {
    return {
      selectedMaterialId: this.materials[0].id,
      selections: Array.from(this.materials, mat => ({
        id: mat.id,
        selected: (mat.id === this.materials[0].id)
        }))
  }},
  watch: {
    ext: function () {
      if (!this.ext.material) return
      this.selections = Array.from(this.materials, mat => ({
        id: mat.id,
        selected: (mat.id === this.ext.material.id)
        }))
    }
  },
  methods: {
    selectMat(id) {
      this.selections.forEach(s => { s.selected = false })
      this.selections.find(s => s.id === id).selected = true
      this.ext.material = this.materials.find(m => m.id === id)
      this.$emit('change-items')
    }
  }
}
</script>

<style lang="scss" scoped>
.materials-wrapper{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.mat-container{
  display: flex;
  flex-direction: row;
  gap: 5px;
}

.mat-img {
  width: 64px;
  height: 64px;
}
</style>
