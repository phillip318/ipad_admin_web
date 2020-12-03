import Vue from 'vue'
import ElementUI from 'element-ui'
import datePlugins from '@/plugins/date'
import Http from '@/plugins/http'
import VueQuillEditor from 'vue-quill-editor'
import '@/styles/index.scss'
import 'element-ui/lib/theme-chalk/index.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)
Vue.use(ElementUI)
Vue.use(Http)
Vue.use(datePlugins)