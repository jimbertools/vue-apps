import Vue from './packages/vue.mjs';
import Router from './packages/vue-router.mjs'
import httpVueLoader from './packages/httpVueLoader.mjs'
//import home from './views/home.vue'
//import settings from './views/settings.vue'

Vue.use(Router)
console.log("router!")
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component:  httpVueLoader('./views/home.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: httpVueLoader('./views/settings.vue')
    }
  ]
})
