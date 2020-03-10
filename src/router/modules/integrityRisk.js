const integrityRiskRouter = [
  {
    title: '廉政风险',
    path: '/integrity-risk',
    name: 'integrityRisk',
    icon: 'el-icon-document',
    img: 'left_ledger@2x.png',
    component: () => import('@/views/Supervision'),
    children: [
      {
        title: '请假加班',
        icon: 'el-icon-menu',
        img: 'left_ledger@2x.png',
        name: 'WisdomAttendance',
        path: "/leave-overtime",
        component: () => import('@/views/IntegrityRisk/LeaveAndOvertime')
      },
      {
        title: '违规查询',
        icon: 'el-icon-menu',
        img: 'left_ledger@2x.png',
        name: 'WisdomAttendance',
        path: "/violation-enquiry",
        component: () => import('@/views/IntegrityRisk/ViolationEnquiry')
      },
      {
        title: '护照管理',
        icon: 'el-icon-menu',
        img: 'left_ledger@2x.png',
        name: 'WisdomAttendance',
        path: "/passport",
        component: () => import('@/views/IntegrityRisk/PassportManage')
      },
      {
        title: '涉嫌违法',
        icon: 'el-icon-menu',
        img: 'left_ledger@2x.png',
        name: 'WisdomAttendance',
        path: "/suspected",
        component: () => import('@/views/IntegrityRisk/SuspectedViolation')
      }
    ]
  }
]

export default integrityRiskRouter;
