let envone = 'http://8.129.54.175:8111/ym-admin'
// let envone = 'http://172.16.13.244:8084'


// 登录
export const USER_LOGIN_URL = `${envone}/member/login`
// 添加模板
export const ADD_MUBAN_URL = `${envone}/template/addOrEditTemplate`
// 模板列表
export const FETCH_MUBAN_LIST = `${envone}//template/findTemplates`
// 模板详情
export const FETCH_MUBAN_DETAIL = `${envone}/template/findTemplateById`
// 接种记录列表
export const FETCH_VACCIN_LIST = `${envone}/vaccination/findVaccinationDetails`
// 接种记录详情
export const FETCH_VACCIN_DETAIL = `${envone}/vaccination/findVaccinationDetailById`
// 新增接种人档案
export const ADD_RECIPIENT_FILE = `${envone}/vaccination/addOrEditVaccinationDetail`
// 查询指令
export const FETCH_ZHILING_URL = `${envone}/execCommand/findExecCommand`