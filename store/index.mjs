//import Vue from 'vue'
import vuex from '../packages/ems/vuex.mjs'
import appStore from './appStore.mjs'

let Vuex = vuex;
window.vuex = vuex;
vuex.jimber = true;


import contactStore from './contactStore.js'
import ffcStore from './ffcStore.js'
import authStore from './authStore.js'
import mailStore from './mailStore.js'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    appStore,
 //   contactStore,
   // ffcStore,
   // authStore,
    //mailStore
  }
})
