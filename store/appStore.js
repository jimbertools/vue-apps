import appService from '../services/appServices.mjs'
export default ({
  state: {
    apps: []
  },
  actions: {
    getApps: (context) => {
      context.dispatch('wait/start', 'getApps', { root: true })
      appService.getApps().then(response => {
        context.dispatch('wait/end', 'getApps', { root: true })
        context.commit('setApps', response.data.apps)
      })
    },
    installApp: (context, app) => {
      context.dispatch('wait/start', 'installApp', { root: true })
      appService.installApp(app).then(response => {
        context.dispatch('wait/end', 'installApp', { root: true })
        context.dispatch('getApps')
      })
    },
    uninstallApp: (context, app) => {
      context.dispatch('wait/start', 'uninstallApp', { root: true })
      appService.uninstallApp(app).then(response => {
        context.dispatch('wait/end', 'uninstallApp', { root: true })
        context.dispatch('getApps')
      })
    }
  },
  mutations: {
    setApps: (state, apps) => { state.apps = apps },
    updateApp: (state, app) => {
      state.apps.find(x => x.name === app.name).installed = app.installed
    }
  },
  getters: {
    apps: (state) => state.apps,
    activeApps: (state) => state.apps.filter(a => a.installed)

  }
})
