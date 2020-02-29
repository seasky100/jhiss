const integrityRiskRouter = [
  {
    title: '廉政风险',
    path: '/integrity-risk',
    name: 'integrityRisk',
    icon: 'el-icon-menu',
    component: () => import('@/views/Supervision'),
    children: [
      {
        title: '请假加班',
        icon: 'el-icon-menu',
        name: 'WisdomAttendance',
        path: "/leave-overtime",
        component: () => import('@/views/IntegrityRisk/LeaveAndOvertime')
      },
      {
        title: '违规查询',
        icon: 'el-icon-menu',
        name: 'WisdomAttendance',
        path: "/violation-enquiry",
        component: () => import('@/views/IntegrityRisk/ViolationEnquiry')
      },
      {
        title: '护照管理',
        icon: 'el-icon-menu',
        name: 'WisdomAttendance',
        path: "/passport",
        component: () => import('@/views/IntegrityRisk/PassportManage')
      }
    ]
  }
]

export default integrityRiskRouter;
