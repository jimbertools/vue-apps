
module.exports = {
    name: 'app',
components: {},
  props: [],
data () {
  return {
    showDialog: false,
  showBadge: true,
  menu: false
}
},
computed: {
    ...window.vuex.mapGetters([
      'apps',
      'activeApps',
      'currentRoom',
      'account'
    ]),
  routes () {
    return window.router.options.routes
},
  topRoutes () {
    var routes = this.routes.filter(r => r.meta.position === 'top' && !r.meta.hidden && !r.meta.appName)
  var activeApps = this.activeApps(window.router.options.routes)

  return routes.concat(activeApps)
},
  bottomRoutes () {
    return this.routes.filter(r => r.meta.position === 'bottom' && !r.meta.hidden)
},
  showOverlay () {
    var hasApps = this.apps && !!this.apps.length
  var isLoading = false //this.$wait.is('getApps')
  return !hasApps && isLoading
},
  bottomNavApps () {
    return this.topRoutes.concat(this.bottomRoutes)
}
},
mounted () {
    this.getApps()
  },
methods: {
    ...window.vuex.mapActions([
      'getApps',
      'logout',
      'clearCurrentRoom'
    ]),
  signOut () {
    this.logout()
    window.router.push({name: 'login' })
},
  switchApplication (route) {
    console.log('Going from ' + window.router.currentRoute.name + ' to ' + route.name)

    if (window.router.currentRoute.name === 'connect' || window.router.currentRoute.name === 'connectWithRoom') {
    // Disconnect from room.
    this.clearCurrentRoom()
  }

  if (window.router.currentRoute.name !== route.name) {
    window.router.push(route)
  }
  }
}
}