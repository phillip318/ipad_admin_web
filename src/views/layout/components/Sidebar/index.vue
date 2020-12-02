<template>
  <div>
    <logo v-if="showLogo" :collapse="isCollapse" />
    <scroll-bar>
      <el-menu
        mode="vertical"
        :show-timeout="200"
        :default-active="$route.path"
        :collapse="isCollapse"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
      >
        <sidebar-item :routes="routes"></sidebar-item>
      </el-menu>
    </scroll-bar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'
import Logo from './Logo'
export default {
  data () {
    return {
      showLogo: true,
      routes: []
    }
  },
  components: { SidebarItem, ScrollBar, Logo},
  computed: {
    ...mapGetters([
      'sidebar',
      'userId'
    ]),
    // routes () {
    //   let arr = []
    //   for (let n of this.$router.options.routes) {
    //     if (!n.hidden) {
    //       arr.push(n)
    //     }
    //   }
    //   return arr
    // },
    isCollapse () {
      return !this.sidebar.opened
    }
  },
  mounted () {
  },
  created () {
    this.getMenu()
  },
  methods: {
    getMenu () {
      this.$http.fetch(`/UserPlatform/MerchantPermission`)
        .then(res => {
          if (res.code === 200) {
            this.routes = res.data
            if (this.$route.fullPath === '/basic') {
              if (this.routes.length > 0) {
                let menu = this.routes[0]
                if (menu && menu.children.length > 0) {
                  this.$router.push(menu.children[0].uri)
                } else {
                  this.$router.push(menu.uri)
                }
              }
            }
          }
        })
    }
  }
}
</script>
