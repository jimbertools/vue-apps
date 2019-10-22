
// import Vue from './packages/vue.mjs' Currently not possible, vuetify doesnt like vue EMS
import httpVueLoader from './packages/ems/httpVueLoader.mjs'
import VueRouter from './packages/ems/vue-router.mjs'
import './packages/legacy/fontawesome-pro/js/all.js'

import store from './store/index.mjs'

const router = new VueRouter({
  routes: [{
    path: '/',
    component: httpVueLoader('./views/home/index.vue'),
    name: 'home',
    meta: { icon: 'fa-home', position: 'top' }
  }, {
    path: '/appstore',
    component: httpVueLoader('./views/appstore/index.vue'),
    name: 'appstore',
    meta: { icon: 'fa-th', position: 'bottom' }
  }, {
    path: '/login',
    name: 'login',
    component: httpVueLoader('./views/login/index.vue'),
    meta: {
      position: 'none'
    }
  }]
})

store.dispatch('setRoutes', router.options.routes)

var app = new Vue({
  el: '#app', // This should be the same as your <div id=""> from earlier.
  vuetify: new Vuetify({
    iconfont: 'fa',
    theme: {
      themes: {
        light: {
          primary: '#2d4052',
          secondary: '#57be8e'
        }
      }
    }
  }),
  components: {
    'app': httpVueLoader('./App/index.vue')
  },
  router,
  store,
  template: '<app></app>'
})
