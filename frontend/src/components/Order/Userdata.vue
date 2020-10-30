<template>
  <div class="usr-wrapper">
    <h3>{{ $t('Order.userdata') }}</h3>
    <div class="userdata-wrapper">
      <div class="userdata-container">
        <h6>{{ $t('Order.name') }}</h6>
        <cv-text-input
          class="usr-inp"
          :label="$t('Order.customer.firstname')"
          :placeholder="$t('Order.customer.firstname')"
          v-model="customerData.firstname"
          @input="change('firstname')"
        >
          <template v-if="invalids.firstname" slot="invalid-message">
            {{ $t('Order.invalid.firstname') }}
          </template>
        </cv-text-input>
        <cv-text-input
          class="usr-inp"
          :label="$t('Order.customer.middlename')"
          :placeholder="$t('Order.customer.middlename')"
          v-model="customerData.middlename"
          @input="change('middlename')"
        >
          <template v-if="invalids.middlename" slot="invalid-message">
            {{ $t('Order.invalid.middlename') }}
          </template>
        </cv-text-input>
        <cv-text-input
          class="usr-inp"
          :label="$t('Order.customer.lastname')"
          :placeholder="$t('Order.customer.lastname')"
          v-model="customerData.lastname"
          @input="change('lastname')"
        >
          <template v-if="invalids.lastname" slot="invalid-message">
            {{ $t('Order.invalid.lastname') }}
          </template>
        </cv-text-input>
      </div>

      <div class="userdata-container">
        <h6>{{ $t('Order.address') }}</h6>
        <div class="usr-inp bx--form-item">
          <label for="loc-dd" class="bx--label dd-label">{{ $t('Order.customer.country') }}</label>
          <cv-dropdown
            id="loc-dd"
            class="dd-container"
            :value="this.$store.state.locals.location"
            @change="changeLocation"
          >
            <cv-dropdown-item v-for="location in locations" :key="location.isoCode" :value="location.isoCode">
              {{ $t(`App.locations.${location.name}`) }}
            </cv-dropdown-item>
          </cv-dropdown>
        </div>

        <cv-text-input
          class="usr-inp"
          :label="$t('Order.customer.address')"
          :placeholder="$t('Order.customer.address')"
          v-model="customerData.address"
          @input="change('address')"
        >
          <template v-if="invalids.address" slot="invalid-message">
            {{ $t('Order.invalid.address') }}
          </template>
        </cv-text-input>
        <cv-text-input
          class="usr-inp"
          :label="$t('Order.customer.postalCode')"
          :placeholder="$t('Order.customer.postalCode')"
          v-model="customerData.postalCode"
          @input="change('postalCode')"
        >
          <template v-if="invalids.postalCode" slot="invalid-message">
            {{ $t('Order.invalid.postalCode') }}
          </template>
        </cv-text-input>
        <cv-text-input
          class="usr-inp"
          :label="$t('Order.customer.city')"
          :placeholder="$t('Order.customer.city')"
          v-model="customerData.city"
          @input="change('city')"
        >
          <template v-if="invalids.city" slot="invalid-message">
            {{ $t('Order.invalid.city') }}
          </template>
        </cv-text-input>
      </div>

      <div class="userdata-container">
        <h6>{{ $t('Order.contact') }}</h6>
        <cv-text-input
          class="usr-inp"
          :label="$t('Order.customer.phone')"
          :placeholder="$t('Order.customer.phone')"
          v-model="customerData.phone"
          @input="change('phone')"
        >
          <template v-if="invalids.phone" slot="invalid-message">
            {{ $t('Order.invalid.phone') }}
          </template>
        </cv-text-input>
        <cv-text-input
          class="usr-inp"
          :label="$t('Order.customer.email')"
          :placeholder="$t('Order.customer.email')"
          v-model="customerData.email"
          @input="change('email')"
        >
          <template v-if="invalids.email" slot="invalid-message">
            {{ $t('Order.invalid.email') }}
          </template>
        </cv-text-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderUserdata',
  data() {
    return {
      customerData: this.$store.state.customer.customerData,
      invalids: this.$store.state.customer.invalids,
      countryIso: this.$store.state.locals.location,
      locations: this.$store.state.locals.locations
    }
  },
  mounted() {
    this.customerData.country = this.$store.state.locals.location
  },
  methods: {
    change(key) {
      this.$store.dispatch('customer/validateInput', key)
    },
    changeLocation(loc) {
      this.$store.dispatch('setLocation', loc)
      this.customerData.country = this.$store.state.locals.location
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
  gap: 20px;
  margin: 0 auto;
  justify-content: center;
}

.userdata-container {
  width: 250px;
}

.dd-container {
  width: 100%;
}

.dd-label {
  font-weight: 500;
}

.usr-inp {
  margin-top: 15px;
  height: 84px;
}
</style>
