import Vue from 'vue'
import VueRouter from 'vue-router'
import Locations from '../views/Locations.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Locations',
    component: Locations,
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
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: 'About'
    }
  },
  {
    path: '/tool',
    name: 'Tool',
    component: () => import('../views/Tool.vue'),
    meta: {
      title: 'Tool'
    }
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
  document.title = `CCT - ${to.meta.title}` || 'Cupboard Limited CCT'
  next()
})

export default router
