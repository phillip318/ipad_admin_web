import Cookies from 'js-cookie'
import { getToken } from '@/utils/auth'
const state = {
  sidebar: {
    opened: !+Cookies.get('sidebarStatus'),
    withoutAnimation: false
  },
  device: 'desktop',
  token: getToken(),
  name: '',
  avatar: '',
  userId: '',
  roles: [],
  phone: null
}

export default  state