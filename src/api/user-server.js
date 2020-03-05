import request from '@/utils/request';
import DEFAULT_URL from '@/config/rest-url';

// 登录
export function signIn(params) {
    return request({
        url: DEFAULT_URL.user.login,
        method: 'get',
        params
      })
}
// // 获取userId,userName,token
export function checkTokenByAppKey(params) {
    return request({
        url: DEFAULT_URL.user.checkToken,
        method: 'get',
        params
      })
}
// //获取用户信息（菜单权限）
export function getUserInfo (params) {
    return request({
      url: DEFAULT_URL.user.getUserInfo,
      method: 'get',
      params
    })
}
// // 修改密码
// export function changePwd(params) {
//     return postOrPut(RESTURL.USER.updatePassword, params)
// }
// // 获取用户所属机构
// export function getOrgUserTree(params) {
//     return get(RESTURL.USER.getOrgUserTree, params)
// }
// 退出登录
export function signOut(params) {
    return request({
        url: DEFAULT_URL.user.getUserInfo,
        method: 'post',
        params
      })
}

// 用户机构树
export function getOrganization (params) {
  return request({
    url: DEFAULT_URL.user.getOrganization,
    method: 'get',
    params
  })
}

// 用户机构树对应的用户
export function getUserList (params) {
  return request({
    url: DEFAULT_URL.user.getUserList,
    method: 'get',
    params
  })
}

// 根据type 获取flowcode
export function getFlowByCondition (params) {
  return request({
    url: DEFAULT_URL.user.getFlowByCondition,
    method: 'get',
    params
  })
}

// 根据flowcode节点
export function getNodeByFlowCode (params) {
  return request({
    url: DEFAULT_URL.user.getNodeByFlowCode,
    method: 'get',
    params
  })
}

