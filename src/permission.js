import router from './router'
import store from './store'
import { constantRoutes } from '@/router/index.js'

// 控制用户菜单权限
router.beforeEach(async (to, from, next) => {
    const token = sessionStorage.getItem('token')
    if (token) {
        store.dispatch('permission/getRoutes')
        const permValueArr = sessionStorage.userPermissions
        if (to.permValue && permValueArr.length > 0) {
            if (permValueArr.includes(to.meta.permValue)) {
                next()
            } else {
                next('/404')
            }
        }
        next()
    } else {
        if (to.path === '/login') {
            next()
        } else {
            next('/login')
        }
    }
})

// router.beforeEach(async(to, from, next) => {
//     const token = sessionStorage.getItem('token')
//     if (token) {
//         constantRoutes.forEach(route =>{
//             const tmp = {...route}
//             if(tmp.children){
//                 const data = tmp.children
//                 for (let i = 0; i < data.length; i++) {
//                     if(data[i].title=='智慧提醒'){
//                         if(sessionStorage.orgId=== '831'){
//                             data[i].hidden = false
//                         }
//                     }
                    
//                 }
//             }
//         })
//         next()
//     } else {
//         if(to.path === '/login'){
//             next()
//         }else{
//             next('/login') 
//         }
      
//     }
// })
