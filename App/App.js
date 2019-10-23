
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
      'account',
      'routes'
    ]),
    topRoutes () {
      return this.routes.filter(r => r.meta.position === 'top')
    },
    bottomRoutes () {
      return this.routes.filter(r => r.meta.position === 'bottom')
    },
    bottomNavApps () {
      return this.topRoutes.concat(this.bottomRoutes)
    },
    showOverlay () {
      var hasApps = this.apps && !!this.apps.length
      var isLoading = false // this.$wait.is('getApps')
      return !hasApps && isLoading
    }
  },
  mounted () {
    this.getApps()
  },
  methods: {
    ...window.vuex.mapActions([
      'getApps',
      'logout',
      'clearCurrentRoom',
      'addRoute'
    ]),
    signOut () {
      this.logout()
      this.$router.push({ name: 'login' })
    },
    getAllRoutes (app) {
      return app.routes.map(route => {
        console.log(`Adding`, `http://localhost:8082/apps/contacts/${route.component}`)
        return {
          path: `/${app.appname.toLowerCase()}${route.path}`,
          component: httpVueLoader(`http://localhost:8082/apps/contacts/${route.component}`),
          name: `${app.appname.toLowerCase()}-${route.name}`,
          meta: {
            ...route.meta,
            app: true,
            position: 'top'
          }
        }
      })
    },
    async readUrl (url) {
      return (await fetch(url)).text()
    }
  },
  watch: {
    async activeApps (val, oldVal) {
      if (JSON.stringify(val) !== JSON.stringify(oldVal)) {
        for (let app of val) { // Loop all apps from 3bot
          this.getAllRoutes(app).forEach(route => {
            if (!this.routes.some(r => r.name === route.name)) {
              console.log(`Adding ${route.name}`)
              this.addRoute(route)
              this.$router.addRoutes([route])
            } 
          })
          // TODO: Check if there is a store
          const storeName = `${app.appname.toLowerCase()}Store`
          if(!Object.keys(this.$store['_modules'].root['_children']).some(x => x === storeName)){
            this.$store.registerModule(storeName, await import(`http://localhost:8082/apps/contacts/${app.store}`))
          }
        }
      }
    }
  }
}
