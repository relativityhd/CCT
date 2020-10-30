<template>
<div class="roomHeightHelper">
  <div class="height-text">
    {{ $t('Cuppy.heightHelper.helperText') }}
  </div>
  <cv-number-input class="height-input"
    :helperText="'Use cm'"
    v-model="userRoomHeight">
  </cv-number-input>
  <div v-bind:class="{'fit-or-dont': true, 'fit': fitsInRoom, 'dont-fit': !fitsInRoom }">
    {{ fitsInRoom ? $t('Cuppy.heightHelper.fit') : $t('Cuppy.heightHelper.dontFit') }}
  </div>
</div>
</template>

<script>
export default {
  props:{
    cupboardHeight: Number,
    cupboardDepth: Number
  },
  data(){
    return{
      userRoomHeight: Number
    }
  },
  computed: {
    fitsInRoom: function(){
      console.log('Calculated!')
      const cupboardDiagonal = Math.sqrt((this.cupboardDepth ** 2) + (this.cupboardHeight ** 2))
      return this.userRoomHeight > (cupboardDiagonal + 2)
    }
  }
}
</script>
<style lang="scss" scoped>
.roomHeightHelper{
  width: 10rem;
}
.height-input{
  width: 3rem
}
.fit-or-dont{
  margin-top: 1rem;
  font-size: 120%;;
}
.fit{
  color: green
}
.dont-fit{
  color: red
}
</style>