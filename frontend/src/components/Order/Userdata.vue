<template>
  <div>
    <h3>{{ $t('Order.userdata') }}</h3>
    <cv-text-input
      :label="$t('Order.customer.firstname')"
      v-model="customerData.firstname"
      @input="change('firstname')"
      :invalid-message="invalids.firstname"
    ></cv-text-input>
    <cv-text-input
      :label="$t('Order.customer.middlename')"
      v-model="customerData.middlename"
      @input="change('middlename')"
      :invalid-message="invalids.middlename"
    ></cv-text-input>
    <cv-text-input
      :label="$t('Order.customer.lastname')"
      v-model="customerData.lastname"
      @input="change('lastname')"
      :invalid-message="invalids.lastname"
    ></cv-text-input>
    <cv-text-input
      :label="$t('Order.customer.address')"
      v-model="customerData.address"
      @input="change('address')"
      :invalid-message="invalids.address"
    ></cv-text-input>
    <cv-text-input
      :label="$t('Order.customer.postalCode')"
      v-model="customerData.postalCode"
      @input="change('postalCode')"
      :invalid-message="invalids.postalCode"
    ></cv-text-input>
    <cv-text-input
      :label="$t('Order.customer.city')"
      v-model="customerData.city"
      @input="change('city')"
      :invalid-message="invalids.city"
    ></cv-text-input>
    <cv-text-input
      :label="$t('Order.customer.country')"
      v-model="customerData.country"
      @input="change('country')"
      :invalid-message="invalids.country"
    ></cv-text-input>
    <cv-text-input
      :label="$t('Order.customer.phone')"
      v-model="customerData.phone"
      @input="change('phone')"
      :invalid-message="invalids.phone"
    ></cv-text-input>
    <cv-text-input
      :label="$t('Order.customer.email')"
      v-model="customerData.email"
      @input="change('email')"
      :invalid-message="invalids.email"
    ></cv-text-input>
  </div>
</template>

<script>
export default {
  name: 'OrderUserdata',
  data() {
    return {
      customerData: this.$store.state.customer.customerData,
      invalids: this.$store.state.customer.invalids
    }
  },
  methods: {
    change(key) {
      this.lastTimechanged = Date.now()
      setTimeout(
        (() => {
          if (Date.now() - this.lastTimechanged >= 500) {
            this.$store.getters['customer/validateSingle'](key)
            this.$store.commit('customer/revalidate')
          }
        }).bind(this),
        500
      )
    }
  }
}
</script>
