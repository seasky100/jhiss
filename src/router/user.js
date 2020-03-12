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
    {
        title: '协作代办',
        path: "/CooperationAgency",
        hidden:true,
        component: () => import('../views/AgencyJump/CooperationAgency.vue')

    },
    {
        title: '审批事项',
        path: "/ApprovalMatters",
        hidden:true,
        component: () => import('../views/AgencyJump/ApprovalMatters.vue')

    },
    {
        title: '用车申请',
        path: "/CarApplication",
        hidden:true,
        component: () => import('../views/AgencyJump/CarApplication.vue')

    },
    {
        title: '差旅申请',
        path: "/TravelApplication",
        hidden:true,
        component: () => import('../views/AgencyJump/TravelApplication.vue')

    },
    {
        title: '公文流转',
        path: "/DocumentLiu",
        hidden:true,
        component: () => import('../views/AgencyJump/DocumentLiu.vue')

    },
]