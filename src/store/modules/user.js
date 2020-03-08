import { checkTokenByAppKey, getUserInfo, signOut, getOrganization } from '@/api/user-server.js'

const state = {
    token: sessionStorage.getItem('token') || '',
    userName: sessionStorage.getItem('userName') || '',
    userId: sessionStorage.getItem('userId') || '',
    loginName: sessionStorage.getItem('loginName') || '',
    realName: sessionStorage.getItem('realName') || '',
    orgId: sessionStorage.getItem('orgId') || '',
    userPermissions: sessionStorage.getItem('userPermissions') || [],
    orgCode: sessionStorage.getItem('orgCode') || [],
    orgName: sessionStorage.getItem('orgName') || [],
    orgData: JSON.parse(sessionStorage.getItem('orgData')) || null,
    userInfo: JSON.parse(sessionStorage.getItem('userInfo')) || {}
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
        // 将token存储在sessionStrige里面
        sessionStorage.setItem('token', token)
    },
    SET_USERNAME: (state, userName) => {
        state.userName = userName
        sessionStorage.setItem('userName', userName)
    },
    SET_USERID: (state, userId) => {
        state.userId = userId
        sessionStorage.setItem('userId', userId)
    },
    SET_LOGINNAME: (state, loginName) => {
        state.loginName = loginName
        sessionStorage.setItem('loginName', loginName)
    },
    SET_REALNAME: (state, realName) => {
        state.realName = realName
        sessionStorage.setItem('realName', realName)
    },
    SET_PERMISSIONS: (state, permissions) => {
        state.userPermissions = permissions
        sessionStorage.setItem('userPermissions', permissions)
    },
    SET_ORGID: (state, orgId) => {
        state.orgId = orgId
        sessionStorage.setItem('orgId', orgId)
    },
    SET_ORGCODE: (state, orgCode) => {
        state.orgCode = orgCode
        sessionStorage.setItem('orgCode', orgCode)
    },
    SET_ORGNAME: (state, orgName) => {
        state.orgName = orgName
        sessionStorage.setItem('orgName', orgName)
    },
    SET_USERINFO: (state, userInfo) => {
        state.userInfo = userInfo
        sessionStorage.setItem('userInfo', userInfo)
    },
    CLEAR_SESSION: (state) => {
        sessionStorage.clear()
    },
    SETORGDATA: (state, data) => {
        state.orgData = data
        sessionStorage.setItem('orgData', JSON.stringify(data))
    }
}

const actions = {
    loginSaveToken({ commit }, params) {
        return new Promise((resolve, reject) => {
            checkTokenByAppKey(params).then(res => {
                commit('SET_USERNAME', res.data.userName)
                commit('SET_USERID', res.data.userId)
                commit('SET_TOKEN', res.token)
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 获取用户信息
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getUserInfo({ userId: state.userId }).then(res => {
                // console.log(res)
                const permValueArr = []
                res.data.permissions.forEach(item => {
                    if (item.permValue) {
                        permValueArr.push(item.permValue)
                    }
                })

                commit('SET_REALNAME', res.data.realName)
                commit('SET_LOGINNAME', res.data.loginName)
                commit('SET_PERMISSIONS', res.data.permValueArr)
                commit('SET_ORGID', res.data.organizations[0].id)
                commit('SET_ORGNAME', res.data.organizations[0].name)
                commit('SET_ORGCODE', res.data.orgCode)
                commit('SET_USERINFO', JSON.stringify(res.data.userInfo))
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 退出登录
    logout({ commit, state }) {
        signOut().then(res => {
            if (res && res.success) {
                commit('CLEAR_SESSION')
            }
        })
    },
    // 获取机构
    getOrgData({ commit }) {
        getOrganization().then(res => {
            if (res && res.success) {
                const { data } = res
                commit('SETORGDATA', data)
            }
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
