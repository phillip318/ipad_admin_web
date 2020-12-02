import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import datePlugins from '@/plugins/date'
import Http from '@/plugins/http'
import '@/styles/index.scss'

Vue.use(ElementUI)
Vue.use(Http)
Vue.use(datePlugins)