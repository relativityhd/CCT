<template>
  <cv-modal
    ref="updateModal"
    class="update-modale"
    :close-aria-label="$t('App.close')"
    size="xs"
    @primary-click="updateNow"
    :primary-button-disabled="!updateExists"
  >
    <template slot="label">{{ $t('App.update.label') }}</template>
    <template slot="title">{{ $t('App.update.title') }}</template>
    <template slot="content">
      <p>{{ $t('App.update.body') }}</p>
    </template>
    <template slot="secondary-button">{{ $t('App.update.later') }}</template>
    <template slot="primary-button">{{ $t('App.update.now') }}</template>
  </cv-modal>
</template>

<script>
export default {
  name: 'AppUpdate',
  data() {
    return {
      refreshing: false,
      registration: null,
      updateExists: false
    }
  },
  mounted() {
    document.addEventListener('swUpdated', this.showModal, { once: true })

    if (!navigator.serviceWorker) return

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (this.refreshing) return
      this.refreshing = true
      window.location.reload()
    })
  },
  methods: {
    showModal(e) {
      this.registration = e.detail
      this.updateExists = true
      this.$refs.updateModal.show()
    },
    updateNow() {
      this.$refs.updateModal.show()
      this.updateExists = false
      if (!this.registration || !this.registration.waiting) return
      this.registration.waiting.postMessage('skipWaiting')
    }
  }
}
</script>

<style lang="scss" scoped>
.update-modale {
  text-align: left;
}
</style>
