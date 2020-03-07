export default [
    {
        title: '用户信息',
        path: "/UserInfo",
        hidden:true,
        component: () => import('../views/user/UserInfo.vue')

    },
    {
        title: '工资信息',
        path: "/Salary",
        hidden:true,
        component: () => import('../views/user/salary.vue')

    },
    {
        title: '代办箱',
        path: "/agency",
        hidden:true,
        component: () => import('../views/user/agency.vue')

    },
]