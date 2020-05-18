import { constantRoutes } from '@/router/index.js'
import { getUserInfo } from '@/api/user-server.js'
import store from '../index.js'

// function getPermValue() {
//     var permArr = []
//     constantRoutes.forEach(item => {
//         if(item.children) {
//             item.children.forEach(child => {
//                 if(child.permValue) {
//                     permArr.push(child.permValue)
//                 }
//             })
//         } else {
//             if(item && item.permValue) {
//                 permArr.push(item.permValue)
//             }
//         }
//     })
//     return permArr
// }
function collectRouters(routers){
    let arr = []
    routers.forEach(route =>{
        if (route.meta && route.meta.userId) {
            // console.log(route.meta.userId.includes(sessionStorage.userId))
            // console.log(route.meta.userId.includes('others'))
            // route.hidden = true
            let mateId = route.meta.userId
            if(mateId.includes(sessionStorage.userId)){
                route.hidden = false
            }
            // console.log(route)
            arr.push(route)
        } else{
            arr.push(route)
        }
        if(route.children && route.children.length > 0){
            collectRouters(route.children)
        }
    })
    return arr
}
// 过滤路由
function filterAsyncRoutes(constantRoutes, permValueArr) {
    // 存放最终菜单的数组
    const res = []
    // console.log(constantRoutes[0].children)
    // let arrRouters = collectRouters(constantRoutes)
    // console.log(arrRouters)
    // 遍历路由配置，设置用户菜单权限
    constantRoutes.forEach(route => {
        const tmp = { ...route }
        // 存放子菜单没用标识时候的数组（即不在菜单栏显示的菜单）
        const hideMenuArr = []
        // 记录有权限时菜单的个数
        let i = 1
        res.push(tmp)
        if (tmp.children) {
            tmp.children.forEach(item => {
                // console.log(item)
                // 如果路由配置里面有 permValue 字段
                if (item.meta&&item.meta.permValue) {
                    // 如果该字段存在返回的菜单权限数组
                    if (permValueArr.includes(item.meta.permValue)) {
                        i++
                        // item.hidden = false
                    } else {
                        hideMenuArr.push(item)
                        // item.hidden = true 
                    }
                } else {
                    if (!item.hidden) {
                    // hideMenuArr.push(item)
                    // item.hidden = true
                    }
                }
            })
            // 没权限菜单将路由数组里的总title设置不在菜单栏上显示
            if (hideMenuArr.length > 0 && i === 1) {
                tmp.hidden = true
            }
            // console.log('需要隐藏的菜单')
            // console.log(hideMenuArr)
        } else {
            if (tmp.hidden) {
                return true
            } else {
                tmp.hidden = false
            }
        }
    })
    // 整合后的
    return res
}

// const state = {
//     // 菜单数组
//     routes: [],
//     // 菜单权限配置
//     permValueArr: getPermValue()
// }

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.routes = routes
    },
    SET_PERVALUE: (state, permValueArr) => {
        state.permValueArr = permValueArr
    }
}

const actions = {
    getRoutes({ commit, state }) {
        const userId = store.state.user.userId
        getUserInfo({ userId }).then(res => {
            // console.log(res.data.permissions)
            let permValueArr = []
            let finalyRouter
            res.data.permissions.forEach(item => {
                if (item.permValue) {
                    permValueArr.push(item.permValue)
                }
            })
            // console.log(permValueArr)
            finalyRouter = filterAsyncRoutes(constantRoutes, permValueArr)
            commit('SET_PERVALUE', permValueArr)
            commit('SET_ROUTES', finalyRouter)
        })
    }
}

export default {
    namespaced: true,
    // state,
    mutations,
    actions
}
