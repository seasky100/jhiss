const wisdomReminderRouter = [
  {
    title: '智慧提醒',
    path: '/wisdom-reminder',
    name: 'WisdomReminder',
    icon: 'el-icon-menu',
    component: () => import('@/views/Supervision'),
    children: [
      {
        title: '智慧考勤',
        icon: 'el-icon-menu',
        name: 'WisdomAttendance',
        path: "",
        component: () => import('@/views/Supervision'),
        children: [
          {
            title: '智慧考勤分析',
            name: 'AttendanceAnalysis',
            path: '/attendance-analysis',
            component: () => import('@/views/WisdomReminder/WisdomAttendance/AttendanceAnalysis')
          },
          {
            title: '考勤预警管控',
            name: 'AttendanceWarning',
            path: '/attendance-warning',
            component: () => import('@/views/WisdomReminder/WisdomAttendance/AttendanceWarning')
          }
        ]
      },
      {
        title: '检查通报',
        icon: 'el-icon-menu',
        name: 'InspectionBulletin',
        path: "/bulletin",
        component: () => import('@/views/WisdomReminder/InspectionBulletin')
      },
      {
        title: '用车分析',
        icon: 'el-icon-menu',
        name: 'AnalysisUse',
        path: "analysis-use",
        component: () => import('@/views/Supervision'),
        children: [
          {
            title: '公车使用分析',
            name: 'AnalysisBusUse',
            path: '/organization-car',
            component: () => import('@/views/WisdomReminder/AnalysisBusUse')
          },
          {
            title: '违规用车管控',
            name: 'ViolationsCarManage',
            path: '/violation',
            component: () => import('@/views/WisdomReminder/ViolationsCarManage')
          }
        ]
      }
    ]
  }
]

export default wisdomReminderRouter;
