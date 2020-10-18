import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Locations',
    component: () => import('../views/Locations.vue'),
    meta: {
      title: 'Locations'
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/About.vue'),
    meta: {
      title: 'About'
    }
  },
  {
    path: '/tool',
    name: 'Tool',
    component: () => import('../views/Tool.vue')
  },
  {
    path: '/basket',
    name: 'Basket',
    component: () => import('../views/Basket.vue'),
    meta: {
      title: 'Basket'
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
