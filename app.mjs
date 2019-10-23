
// import Vue from './packages/vue.mjs' Currently not possible, vuetify doesnt like vue EMS
import httpVueLoader from './packages/ems/httpVueLoader.mjs'
import VueRouter from './packages/ems/vue-router.mjs'
import './packages/legacy/fontawesome-pro/js/all.js'
import config from './config/index.js'
import store from './store/index.mjs'

Vue.prototype.$rules = {
  required: v => !!v || 'This is required',
  email: v => (/.+@.+\..+/.test(v) || !v) || 'E-mail must be valid',
  noLongerThan100: v => (v && v.length <= 100) || 'This must be less than 100 characters'
}

window.config = config

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
