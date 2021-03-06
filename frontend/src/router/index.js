import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Homepage',
    component: () => import(/* webpackChunkName: "Homepage" */ '../views/Homepage.vue'),
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "About" */ '../views/About.vue'),
    meta: {
      title: 'About'
    }
  },
  {
    path: '/catalogue',
    alias: ['/tool'],
    name: 'Catalogue',
    component: () => import(/* webpackCunkName: "Catalogue" */ '../views/Catalogue.vue'),
    meta: {
      title: 'Catalogue'
    }
  },
  {
    path: '/tool/:id',
    name: 'Tool',
    component: () => import(/* webpackChunkName: "Tool" */ '../views/Tool.vue')
  },
  {
    path: '/basket',
    name: 'Basket',
    component: () => import(/* webpackChunkName: "BasketPage" */ '../views/Basket.vue'),
    meta: {
      title: 'Basket'
    }
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import(/* webpackChunkName: "Order" */ '../views/Order.vue'),
    meta: {
      title: 'Order'
    }
  },
  {
    path: '/sendorder',
    name: 'Send',
    component: () => import(/* webpackChunkName: "OrderSend" */ '../views/SendOrder.vue'),
    meta: {
      title: 'Sending Order'
    }
  },
  {
    path: '/imprint',
    name: 'Imprint',
    component: () => import(/* webpackCunkName: "Imprint" */ '../views/Imprint.vue'),
    meta: {
      title: 'Imprint'
    }
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import(/* webpackCunkName: "Test" */ '../components/Visualization/Visualization.vue')
  },
  {
    path: '*',
    name: 'P404',
    component: () => import(/* webpackCunkName: "P404" */ '../views/P404.vue'),
    meta: {
      title: '404'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `CCT - ${to.meta.title || 'Cupboard Limited'}`
  next()
})

export default router
