import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

Vue.use(Router)
const router = new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})


router.afterEach(() => {
  NProgress.done() // 结束Progress
})

export default router;