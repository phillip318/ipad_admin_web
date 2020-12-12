import { formatDate } from '@/utils/date'
const timeFotmat = {
  'year-month': 'yyyy-MM',
  'date': 'yyyy-MM-dd',
  'time': 'yyyy-MM-dd hh:mm:ss'
}
export default {
  install (Vue) {
    // date 类型 格式化
    Vue.filter('filterDateByCustom', function (value, dateType) {
      return value ? formatDate(new Date(Number(value)), timeFotmat[dateType]) : ''
    })
  }
}
