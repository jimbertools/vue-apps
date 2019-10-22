
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
        return {
          path: `/${app.appname.toLowerCase()}${route.path}`,
          component: httpVueLoader(`http://localhost:8081/api/actors/${route.component}`),
          name: `${app.appname.toLowerCase()}-${route.name}`,
          meta: {
            ...route.meta,
            position: 'top'
          }
        }
      })
    },
    async readUrl (url) {
      d
      return (await fetch(url)).text()
    }
  },
  watch: {
    async activeApps (val) {
      for (let app of val) { // Loop all apps from 3bot
        this.$router.addRoutes(this.getAllRoutes(app))
        this.getAllRoutes(app).forEach(route => {
          if (!this.routes.some(r => r.name === route.name)) this.addRoute(route)
        })
        this.$store.registerModule(`${app.appname}Store`, import(`http://localhost:8081/api/actors/${app.store}`))
        // this.$store.registerModule(`${app.appname}Store`, {
        //   state: {
        //     some_items: []
        //   },
        //   getters: {
        //     items: state => state.some_items
        //   },
        //   actions: {
        //     getContacts (context) { console.log(`fdsafds`) }
        //   },
        //   mutations: {}
        // })
        console.log(`this.$store`, this.$store)
      }
    }
  }
}
