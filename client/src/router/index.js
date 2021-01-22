import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage.vue'
import Genap from '../views/Genap.vue'
import Ganjil from '../views/Ganjil.vue'
import Prima from '../views/Prima.vue'
import Persegi from '../views/Persegi.vue'
import Kubik from '../views/Kubik.vue'
import PersegiPanjang from '../views/PersegiPanjang.vue'
import Segitiga from '../views/Segitiga.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/game',
    name: 'Game',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Game.vue')
  },
  {
    path: '/genap',
    name: 'Genap',
    component: Genap
  },
  {
    path: '/ganjil',
    name: 'Ganjil',
    component: Ganjil
  },
  {
    path: '/prima',
    name: 'Prima',
    component: Prima
  },
  {
    path: '/persegi',
    name: 'Persegi',
    component: Persegi
  },
  {
    path: '/kubik',
    name: 'Kubik',
    component: Kubik
  },
  {
    path: '/persegipanjang',
    name: 'PersegiPanjang',
    component: PersegiPanjang
  },
  {
    path: '/segitiga',
    name: 'Segitiga',
    component: Segitiga
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
