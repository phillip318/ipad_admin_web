import * as type from './type.js'
const mutations = {
  [type.SET_TOKEN]: (state, token) => {
    state.token = token
  },
}

export default mutations