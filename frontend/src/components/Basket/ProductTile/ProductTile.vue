<template>
  <cv-tile>
    <h3>{{ item.product.name }}</h3>
    <h6>{{ $store.getters.formatPrice(item.price.sum.gross) }}</h6>

    <Actions class="Actions" :item="item" />

    <!-- <EditModal :item="item" /> -->

    <div
      v-for="ext in item.exteriors"
      :key="ext._uid">
      <cv-tag :label="ext.name" kind="blue" />
      <cv-tag :label="ext.material.name" kind="purple" />
      <cv-tag
        v-for="int in ext.interiors" :key="int._uid" :label="`${int.name} (x${int.quantity})`" kind="cool-gray" />
    </div>
  </cv-tile>
</template>

<script>
import Actions from './Actions'
//import EditModal from './EditModal'

export default {
  name: 'ProductTile',
  props: {
    item: Object
  },
  components: {
    Actions,
    //EditModal
  }
}
</script>
