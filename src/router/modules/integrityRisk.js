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
      }
    ]
  }
]

export default integrityRiskRouter;
