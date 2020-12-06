import { fetch } from '@/plugins/http';
import { setToken } from '@/utils/auth'
import { USER_LOGIN_URL } from '@/api'
const actions = {
  // 登录
  Login ({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      fetch(USER_LOGIN_URL, userInfo).then(response => {
        const data = response.data
        const tokenStr = data.tokenHead + data.token
        setToken(tokenStr)
        commit('SET_TOKEN', tokenStr)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
}



export default actions