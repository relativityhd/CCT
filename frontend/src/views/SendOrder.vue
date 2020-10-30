<template>
  <div class="buy-wrapper">
    <div v-if="status === 'validate'">
      <div class="action">
        <cv-loading class="loader" :active="true" :overlay="false"></cv-loading>
      </div>
      <h3>{{ $t('Order.validatingData') }}</h3>
      <img class="order-cuppy" src="../assets/images/cuppy/cuppy.svg" alt="Cuppy waiting" />
    </div>

    <div v-else-if="status === 'invalid'">
      <div class="action">
        <cv-button @click="$router.push('/order')" :icon="formIcon">
          {{ $t('Order.fillInformation') }}
        </cv-button>
      </div>
      <h3>{{ $t('Order.invalidData') }}</h3>
      <img class="order-cuppy" src="../assets/images/cuppy/cuppy_neutral.svg" alt="Cuppy fill in" />
    </div>

    <div v-else-if="status === 'empty'">
      <div class="action">
        <cv-button @click="$router.push('/catalogue')" :icon="shopIcon">
          {{ $t('Order.backtoShop') }}
        </cv-button>
      </div>
      <h3>{{ $t('Order.emptyBasket') }}</h3>
      <img class="order-cuppy" src="../assets/images/cuppy/cuppy_neutral.svg" alt="Cuppy has no items" />
    </div>

    <div v-else-if="status === 'sending'">
      <div class="action">
        <cv-loading class="loader" :active="true" :overlay="false"></cv-loading>
      </div>
      <h3>{{ $t('Order.sending') }}</h3>
      <img class="order-cuppy" src="../assets/images/cuppy/cuppy.svg" alt="Cuppy sending data" />
    </div>

    <div v-else-if="status === 'successful'">
      <div class="action">
        <cv-button @click="$router.push('/')" :icon="redirectIcon">
          {{ $t('Order.successfulRedirect') }}
        </cv-button>
      </div>
      <h3>{{ $t('Order.successful') }}</h3>
      <h6>{{ $t('Order.orderId', { id: orderId }) }}</h6>
      <img class="order-cuppy" src="../assets/images/cuppy/cuppy_thanks.svg" alt="Cuppy is successful" />
    </div>

    <div v-else>
      <div class="action">
        <cv-button @click="orderStuff" :icon="redoIcon">
          {{ $t('Order.tryAgain') }}
        </cv-button>
      </div>
      <h3>{{ $t('Order.errored') }}</h3>
      <img class="order-cuppy" src="../assets/images/cuppy/cuppy_sad.svg" alt="Cuppy has error" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import formIcon from '@carbon/icons-vue/es/document/16'
import shopIcon from '@carbon/icons-vue/es/shopping--cart/16'
import redoIcon from '@carbon/icons-vue/es/redo/16'
import redirectIcon from '@carbon/icons-vue/es/home/16'

export default {
  name: 'OrderConfirmation',
  data() {
    return {
      formIcon,
      shopIcon,
      redoIcon,
      redirectIcon,
      orderId: 0,
      // validate, invalid (Userdata), empty (Basket), sending, errored, successful
      status: 'validate'
    }
  },
  mounted() {
    if (this.$store.state.basket.items.length === 0) {
      this.status = 'empty'
      return
    }

    this.$store.dispatch('customer/validate')
    if (this.$store.state.customer.hasInvalids) {
      this.status = 'invalid'
      return
    }

    this.orderStuff()
  },
  methods: {
    orderStuff() {
      this.status = 'sending'

      const postObject = {
        orderDate: new Date().toISOString(),
        country: this.$store.state.locals.location,
        customer: this.$store.getters['customer/customerData'](),
        price: this.$store.getters['basket/orderPrice'](),
        products: this.$store.getters['basket/orderItems']()
      }
      console.log('--DEBUG : mounted -> postObject', postObject)
      Vue.axios
        .post('/order', postObject)
        .then(res => {
          this.orderId = res.data.orderId
          this.status = 'successful'
          // this.$store.commit('basket/clearBasket')
        })
        .catch(() => {
          this.status = 'errored'
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.buy-wrapper {
  width: 98%;
  max-width: 400px;
  margin: auto auto;
}

.buy-wrapper div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.order-cuppy {
  margin-top: 30px;
  width: 400px;
  height: 35vh;
  object-fit: contain;
}

.loader {
  max-width: 200px;
}

.action {
  height: 15vh;
  min-height: 150px;
}

.to-shop-btn {
  margin-top: 15px;
}
</style>
