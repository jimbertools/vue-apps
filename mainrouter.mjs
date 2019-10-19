import Vue from './packages/ems/vue.mjs';
import Router from './packages/ems/vue-router.mjs'
import httpVueLoader from './packages/ems/httpVueLoader.mjs'
//import home from './views/home.vue'
//import settings from './views/settings.vue'

Vue.use(Router)

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
