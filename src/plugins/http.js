import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 全局配置
const service = axios.create({
  timeout: 10000,   // 请求的超时时间
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'X-Version': '1.0'
  }
 });

// 拦截器
// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers.common['Authorization'] = getToken()  // 让每个请求携带自定义token 请根据实际情况自行修改
    if (parseInt(localStorage.getItem('timeOut')) + 30 * 60 * 1000 < Date.parse(new Date())) {
      store.dispatch('FedLogOut')
      window.location.reload()
    } else {
      localStorage.setItem('timeOut', Date.parse(new Date()))
    }
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      Message({
        message: res.message,
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(res)
    } else {
      return res
    }
  },
    error => {
    console.log('err' + error)// for debug
    return Promise.reject(error)
  }
)

const fetch = (url, params) => {
  return service.get(url, {params});
};

const post = (url, data = {}) => {
  return service.post(url, data, { allowDots: true }, {
    headers: {
      'Content-Type': 'application/json'
    },
  });
};

export {
  fetch,
  post
}

export default {
  install(Vue) {
    Vue.http = { fetch, post };
    Vue.prototype.$http = Vue.http;
  }
};