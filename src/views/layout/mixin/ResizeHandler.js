const { body } = document
const WIDTH = 1024
const RATIO = 3

export default {
  watch: {
    $route () {
    }
  },
  beforeMount () {
    // window.addEventListener('resize', this.resizeHandler)
  },
  mounted () {
  },
  methods: {
    isMobile () {
      const rect = body.getBoundingClientRect()
      return rect.width - RATIO < WIDTH
    },
    resizeHandler () {
    }
  }
}
