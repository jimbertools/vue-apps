
module.exports = {
  name: 'home',
  components: {},
  props: [],
  data () {
    return {

    }
  },
  computed: {
    ...window.vuex.mapGetters([
      'activeApps'
    ])
  },
  mounted () {
  },
  methods: {
  }
}
