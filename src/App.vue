<template>
  <div id="app" @click.stop="refresh">
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  components: {
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['token'])
  },
  methods: {
    refresh () {
      if (this.token !== localStorage.getItem('loginToken')) {
        window.location.reload()
      }
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-size: 16px;
  font-family:"Microsoft YaHei",微软雅黑,"MicrosoftJhengHei",华文细黑,STHeiti,MingLiu 
}
</style>
