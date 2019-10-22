// import Vue from 'vue'
import Vuex from '../packages/ems/vuex.mjs'
import appStore from './appStore.js'
import mainStore from './mainStore.js'
// import authStore from './authStore.js'

window.vuex = Vuex
Vuex.jimber = true

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    appStore,
    mainStore
    // authStore
  }
})
