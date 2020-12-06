<template>
  <div class="scroll-container"
       ref="scrollContainer"
       @wheel.prevent="handleScroll"
       @click="refresh">
    <div class="scroll-wrapper"
         ref="scrollWrapper"
         :style="{top: top + 'px'}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { getToken } from '../../utils/auth'
export default {
  name: 'scrollBar',
  data () {
    return {
      top: 0
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  mounted () {
  },
  methods: {
    refresh () {
      if (this.token !== localStorage.getItem('loginToken')) {
        window.location.reload()
      }
    },
    handleScroll () {
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../styles/variables.scss";

.scroll-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: $menuBg;
  .scroll-wrapper {
    position: absolute;
    width: 100% !important;
  }
}
</style>
