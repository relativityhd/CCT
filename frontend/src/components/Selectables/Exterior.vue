<template>
  <div>
    <cv-tile :class="{ selected: selected }" kind="clickable" @click="$emit('select')" :value="`${exterior._uid}`">
      <div class="ext-wrapper">
        <img class="ext-img" :src="exterior.imageUrl" :alt="$t('altMsg', { name: exterior.name })" />

        <div class="ext-info">
          <h6>{{ exterior.name }}</h6>
          <p>{{ $store.getters.formatPrice(exterior.price) }}</p>
        </div>

        <div class="ext-actions">
          <cv-button class="select-btn" @click="$emit('select')" :icon="iconEdit">
            {{ $t('Tool.ext.select') }}
          </cv-button>
          <cv-icon-button
            class="delete-btn"
            kind="ghost"
            :icon="iconDelete"
            :label="$t('Tool.ext.delete')"
            tip-position="left"
            tip-alignment="start"
            @click="$emit('delete')"
          />
        </div>

        <div class="ext-custom">
          <cv-accordion v-if="exterior.customizable">
            <cv-accordion-item>
              <template slot="title">{{ `${$t('customize')} ${exterior.name}` }}</template>
              <template slot="content">
                <ProductCustomization :custom="exterior.custom" v-on:change-custom="$emit('change-custom')" />
              </template>
            </cv-accordion-item>
          </cv-accordion>
          <p v-else>{{ $t('Tool.ext.notEditable') }}</p>
        </div>
      </div>
    </cv-tile>
  </div>
</template>

<script>
import TrashCan16 from '@carbon/icons-vue/es/trash-can/16'
import Edit16 from '@carbon/icons-vue/es/edit/16'
import ProductCustomization from '../Product/ProductCustomization'

export default {
  name: 'SingleExterior',
  components: {
    ProductCustomization
  },
  props: {
    exterior: Object,
    selected: Boolean
  },
  data() {
    return {
      iconDelete: TrashCan16,
      iconEdit: Edit16,
      invalidMessage: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.ext-wrapper {
  display: grid;
  grid-template-areas:
    'img actions'
    'info custom';
  gap: 5px;
}

.ext-img {
  width: 64px;
  height: 64px;
  object-fit: contain;
  background-color: $ui-background;
  grid-area: img;
}

.ext-info {
  grid-area: info;
  text-align: left;
}

.ext-actions {
  grid-area: actions;
  display: grid;
  grid-auto-flow: column;
  justify-content: end;
  gap: 5px;
}

.select-btn,
.delete-btn {
  justify-self: center;
  align-self: end;
}

.ext-custom {
  grid-area: custom;
}

.selected {
  background: $ui-03;
  outline: 2px solid $active-primary;
  outline-offset: -2px;
}
</style>
