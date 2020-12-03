import Layout from '../views/layout'
const routes = [
  { path: '/login', component: () => import('@/views/login/index')},
  { path: '/404', component: () => import('@/views/404')},
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home'),
      meta: { title: '模板管理' }
    }, {
      path: 'vaccin',
      name: 'Vaccin',
      component: () => import('@/views/vaccin'),
      meta: { title: '接种记录' }
    }, {
      path: 'login',
      name: 'Login',
      component: () => import('@/views/login'),
      meta: { title: '登录', icon: 'home' }
    }]
  },
]
export default routes