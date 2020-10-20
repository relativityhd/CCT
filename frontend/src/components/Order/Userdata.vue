<template>
  <div class="usr-wrapper">
    <h3>{{ $t('Order.userdata') }}</h3>
    <div class="userdata-wrapper">
      <div class="userdata-container">
        <h6>{{ $t('Order.name') }}</h6>
        <cv-text-input
          class="usr-inp"
          :label="$t('Order.customer.firstname')"
          v-model="customerData.firstname"
          @input="change('firstname')"
          :invalid-message="invalids.firstname"
        ></cv-text-input>
        <cv-text-input
          class="usr-inp"
          :label="$t('Order.customer.middlename')"
          v-model="customerData.middlename"
          @input="change('middlename')"
          :invalid-message="invalids.middlename"
        ></cv-text-input>
        <cv-text-input
          class="usr-inp"
          :label="$t('Order.customer.lastname')"
          v-model="customerData.lastname"
          @input="change('lastname')"
          :invalid-message="invalids.lastname"
        ></cv-text-input>
      </div>

      <div class="userdata-container">
        <h6>{{ $t('Order.address') }}</h6>
        <cv-text-input
          class="usr-inp"
          :label="$t('Order.customer.address')"
          v-model="customerData.address"
          @input="change('address')"
          :invalid-message="invalids.address"
        ></cv-text-input>
        <cv-text-input
          class="usr-inp"
          :label="$t('Order.customer.postalCode')"
          v-model="customerData.postalCode"
          @input="change('postalCode')"
          :invalid-message="invalids.postalCode"
        ></cv-text-input>
        <cv-text-input
          class="usr-inp"
          :label="$t('Order.customer.city')"
          v-model="customerData.city"
          @input="change('city')"
          :invalid-message="invalids.city"
        ></cv-text-input>
        <cv-text-input
          class="usr-inp"
          :label="$t('Order.customer.country')"
          v-model="customerData.country"
          @input="change('country')"
          :invalid-message="invalids.country"
        ></cv-text-input>
      </div>

      <div class="userdata-container">
        <h6>{{ $t('Order.contact') }}</h6>
        <cv-text-input
          class="usr-inp"
          :label="$t('Order.customer.phone')"
          v-model="customerData.phone"
          @input="change('phone')"
          :invalid-message="invalids.phone"
        ></cv-text-input>
        <cv-text-input
          class="usr-inp"
          :label="$t('Order.customer.email')"
          v-model="customerData.email"
          @input="change('email')"
          :invalid-message="invalids.email"
        ></cv-text-input>
      </div>
    </div>
    <div class="btns">
      <slot></slot>
    </div>
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
      this.$store.dispatch('customer/validateInput', key)
    }
  }
}
</script>

<style lang="scss" scoped>
.usr-wrapper {
  width: auto;
}

.userdata-wrapper {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
  max-width: 792px;
  margin: 0 auto;
  justify-content: center;
}

.userdata-container {
  margin: 30px 20px;
  width: 224px;
}

.usr-inp {
  margin-top: 15px;
  height: 84px;
}

.btns {
  width: 100%;
  max-width: 752px;
  margin: 0 auto;
}
</style>
