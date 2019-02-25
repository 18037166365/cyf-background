import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import HospitalEdit from './views/Hospital-edit.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/',
      // path: '/hospitalList',
      name: 'hospitalList',
      component: () => import('./views/Hospital-list.vue')
    },
    {
      path: '/hospitalEdit',
      name: 'hospitalEdit',
      // component: () => import(/* webpackChunkName: "hospitalEdit" */ './views/Hospital-edit.vue')
      component: HospitalEdit
    },
    {
      path: '/newsList',
      name: 'newsList',
      component: () => import('./views/News-list.vue'),
    },
    {
      path: '/newsEdit',
      name: 'newsEdit',
      component: () => import('./views/News-edit.vue')
    },
  ]
})
