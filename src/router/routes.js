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
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'home' }
    }, {
      path: 'login',
      name: 'Login',
      component: () => import('@/views/login'),
      meta: { title: '登录', icon: 'home' }
    }]
  },
]
export default routes