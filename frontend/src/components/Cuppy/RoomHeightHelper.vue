<template>
  <div class="roomHeightHelper">
    <div class="height-text">
      {{ $t('Cuppy.heightHelper.helperText') }}
    </div>
    <div class="inputs">
      <cv-number-input
        class="closet-height"
        :helper-text="$t('Cuppy.heightHelper.height')"
        v-model="cupboardHeight"
        min="0"
      ></cv-number-input>
      <cv-number-input
        class="closet-depth"
        :helper-text="$t('Cuppy.heightHelper.depth')"
        v-model="cupboardDepth"
        min="0"
      ></cv-number-input>
      <cv-number-input
        class="room-height-input"
        :helperText="$t('Cuppy.heightHelper.roomHeight')"
        v-model="userRoomHeight"
        min="0"
      ></cv-number-input>
    </div>

    <div v-bind:class="{ 'fit-or-dont': true, fit: fitsInRoom, 'dont-fit': !fitsInRoom }">
      {{ fitsInRoom ? $t('Cuppy.heightHelper.fit') : $t('Cuppy.heightHelper.dontFit') }}
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      cupboardHeight: 160,
      cupboardDepth: 80,
      userRoomHeight: 220
    }
  },
  computed: {
    fitsInRoom: function() {
      const cupboardDiagonal = Math.sqrt(this.cupboardDepth ** 2 + this.cupboardHeight ** 2)
      return this.userRoomHeight > cupboardDiagonal + 2
    }
  }
}
</script>
<style lang="scss" scoped>
.roomHeightHelper {
  width: 13rem;
}
.inputs {
  display: flex;
  flex-direction: column;
}
.room-height-input {
  width: 100%;
}
.fit-or-dont {
  margin-top: 1rem;
  font-size: 120%;
}
.fit {
  color: green;
}
.dont-fit {
  color: red;
}
</style>
