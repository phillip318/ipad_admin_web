<template>
  <div class="menu-wrapper">
    <template v-for="(item, indx) in routes">
      <router-link v-if="item.children.length <= 0"
        :key="item.id"
        :to="item.uri === null ? '' : item.uri">
        <el-menu-item :index="indx+''">
          <!-- <svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"></svg-icon> -->
          <i :class="item.icon"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu v-else :index="indx+''" :key="item.id">
        <template slot="title">
          <!-- <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon> -->
          <i :class="item.icon"></i>
          <span slot="title">{{item.name}}</span>
        </template>

        <template v-for="(child, ind) in item.children">
          <!-- <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item> -->
          <router-link :to="child.uri === null ? '': child.uri" :key="child.id" v-if="child.type < 2">
            <el-menu-item :index="indx+'-'+ind">
              <!-- <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon> -->
              <span slot="title">{{child.name}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>

    </template>
  </div>
</template>

<script>
// import constRoutes from '@/router/routes'
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  created () {
  },
  watch: {
    'routes': function (newVal) {
      this.addIcons(newVal)
    }
  },
  methods: {
    hasOneShowingChildren (item) {
      if (item.children) {
        const showingChildren = item.children.filter(item => {
          return !item.hidden
        })
        if (showingChildren.length === 1) {
          return true
        }
        return false
      }
    },
    addIcons () {
    }
  }
}
</script>
