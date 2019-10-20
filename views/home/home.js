import { mapGetters } from 'vuex'

export default {
  name: 'home',
  components: {},
  props: [],
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'activeApps'
    ])
  },
  mounted () {
  },
  methods: {
  }
}
