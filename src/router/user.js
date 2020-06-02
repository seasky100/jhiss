export default [
    {
        title: '用户信息',
        path: "/UserInfo",
        meta:{
            permValue:'ZHK',
          },
        hidden:true,
        component: () => import('../views/user/UserInfo.vue')

    },
    {
        title: '工资信息',
        path: "/Salary",
        meta:{
            permValue:'ZHK',
          },
        hidden:true,
        component: () => import('../views/user/salary.vue')

    },
    {
        title: '代办箱',
        path: "/agency",
        meta:{
            permValue:'ZHK',
          },
        hidden:true,
        component: () => import('../views/user/agency.vue')

    },
    {
        title: '协作待办',
        path: "/CooperationAgency",
        meta:{
            permValue:'ZHK',
          },
        hidden:true,
        component: () => import('../views/AgencyJump/CooperationAgency.vue')

    },
    {
        title: '审批事项',
        path: "/ApprovalMatters",
        meta:{
            permValue:'ZHK',
          },
        hidden:true,
        component: () => import('../views/AgencyJump/ApprovalMatters.vue')

    },
    {
        title: '用车申请',
        path: "/CarApplication",
        meta:{
            permValue:'ZHK',
          },
        hidden:true,
        component: () => import('../views/AgencyJump/CarApplication.vue')

    },
    {
        title: '差旅申请',
        path: "/TravelApplication",
        meta:{
            permValue:'ZHK',
          },
        hidden:true,
        component: () => import('../views/AgencyJump/TravelApplication.vue')

    },
    {
        title: '公文流转',
        path: "/DocumentLiu",
        meta:{
            permValue:'ZHK',
          },
        hidden:true,
        component: () => import('../views/AgencyJump/DocumentLiu.vue')

    },
    {
        title: '日志信息',
        path: "/UserInfo",
        meta:{
            permValue:'ZHK',
          },
        hidden:true,
        component: () => import('../views/user/UserLog.vue')

    },
    {
        title: '请假信息',
        path: "/UserLeave",
        meta:{
            permValue:'ZHK',
          },
        hidden:true,
        component: () => import('../views/user/UserLeave.vue')

    },
    {
        title: '出国信息',
        path: "/UserAbroad",
        meta:{
            permValue:'ZHK',
          },
        hidden:true,
        component: () => import('../views/user/UserAbroad.vue')

    },
    {
        title: '谈话信息',
        path: "/UserTalk",
        meta:{
            permValue:'ZHK',
          },
        hidden:true,
        component: () => import('../views/user/UserTalk.vue')

    },
    {
        title: '即报信息',
        path: "/UserReport",
        meta:{
            permValue:'ZHK',
          },
        hidden:true,
        component: () => import('../views/user/UserReport.vue')

    },
    {
        title: '加班信息',
        path: "/UserOvertime",
        meta:{
            permValue:'ZHK',
          },
        hidden:true,
        component: () => import('../views/user/UserOvertime.vue')

    },
    {
        title: '申报预警',
        path: "/AgencyRequest",
        meta:{
            permValue:'ZHK',
          },
        hidden:true,
        component: () => import('../views/wisdomSupervision/AgencyRequest.vue')

    },
]