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
// 身份证号登录
export function jhLogin(params) {
  return request({
      url: DEFAULT_URL.user.jhLogin,
      method: 'post',
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
        url: DEFAULT_URL.user.logout,
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

// 从警生涯数据
export function getPoliceCareer(params) {
    return request({
        url: DEFAULT_URL.user.getPoliceCareer,
        method: 'get',
        params
      })
}
// 根据身份证号获取用户信息
export function getUserByCardNum(params) {
  return request({
      url: DEFAULT_URL.user.getUserByCardNum,
      method: 'get',
      params
    })
}
// 从根据userId查询相应层级成员的id列表
export function getUserListByUserId(params) {
  return request({
      url: DEFAULT_URL.user.getUserListByUserId,
      method: 'get',
      params
    })
}
// 从根据userId查询相应层级成员的id列表（分管，协管） getSubordinateUserList
export function getSubordinateUserList(params) {
  return request({
      url: DEFAULT_URL.user.getSubordinateUserList,
      method: 'get',
      params
    })
}
// 查询字典数据
export function getList(params) {
  return request({
      url: DEFAULT_URL.user.getList,
      method: 'get',
      params
    })
}
