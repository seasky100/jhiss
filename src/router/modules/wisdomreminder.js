const wisdomReminderRouter = [
  {
    title: '智慧提醒',
    path: '/CreditCard',
    name: 'WisdomReminder',
    icon: 'el-icon-s-opportunity',
    img: 'left_inspection@2x.png',
    component: () => import('@/views/Supervision'),
    children: [
      {
        title: '智慧考勤',
        icon: 'el-icon-menu',
        img: 'float_attendance@2x.png',
        name: 'WisdomAttendance',
        path: "/AttendanceAnalysis",
        component: () => import('@/views/Supervision'),
        children: [
          {
            title: '智慧考勤分析',
            img: 'left_menu_sub_analysis.svg',
            name: 'AttendanceAnalysis',
            path: '/attendance-analysis',
            component: () => import('@/views/WisdomReminder/WisdomAttendance/AttendanceAnalysis')
          },
          {
            title: '考勤预警管控',
            img: 'left_menu_sub_alarm.svg',
            name: 'AttendanceWarning',
            path: '/attendance-warning',
            component: () => import('@/views/WisdomReminder/WisdomAttendance/AttendanceWarning')
          }
        ]
      },
      {
        title: '出国（镜）分析',
        icon: 'el-icon-menu',
        img: 'float_departure@2x.png',
        name: 'GoAbroad',
        path: "/go-abroad",
        component: () => import('@/views/WisdomReminder/GoAbroad')
      },
      {
        title: '测试',
        hidden: true,
        path:'',
      },
      {
        title: '请销假分析',
        icon: 'el-icon-menu',
        img: 'float_absence@2x.png',
        name: 'LeaveAnalysis',
        path: '/leave-analysis',
        component: () => import('@/views/Supervision'),
        children: [
          {
            title: '请假情况分析',
            img: 'float_absence@2x.png',
            path: '/LeaveSituationAnalysis',
            component: () => import('@/views/WisdomReminder/LeaveAnalysis/LeaveSituationAnalysis')
          },
          {
            title: '审批记录分析',
            img: 'float_absence@2x.png',
            path: '/ApprovalRecordAnalysis',
            component: () => import('@/views/WisdomReminder/LeaveAnalysis/ApprovalRecordAnalysis')
          }
        ]
      },
      {
        title: '智慧感知',
        icon: 'el-icon-menu',
        img: 'left_sensing@2x.png',
        name: 'PerceptualWisdom',
        path: "/CreditCard",
        component: () => import('@/views/Supervision'),
        children: [
          {
            title: '刷卡情况分析',
            img: 'float_absence@2x.png',
            path: '/CreditCard',
            component: () => import('@/views/WisdomReminder/PerceptualWisdom/CreditCard')
          },
          {
            title: '提前就餐预警',
            img: 'float_absence@2x.png',
            path: '/EarlyMealWarning',
            component: () => import('@/views/WisdomReminder/PerceptualWisdom/EarlyMealWarning')
          }
        ]
      },
      {
        title: '差旅管理',
        icon: 'el-icon-menu',
        img: 'float_travel@2x.png',
        name: 'TravelManagement',
        path: "/travel-management",
        component: () => import('@/views/WisdomReminder/TravelManagement')
      },
      // 
      {
        title: '检查通报',
        icon: 'el-icon-menu',
        img: 'float_inspection@2x.png',
        name: 'InspectionBulletin',
        path: "/bulletin",
        component: () => import('@/views/WisdomReminder/InspectionBulletin')
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
      },
      {
        title: '用车分析',
        icon: 'el-icon-menu',
        img: 'float_absence@2x.png',
        name: 'AnalysisUse',
        path: "analysis-use",
        component: () => import('@/views/Supervision'),
        children: [
          {
            title: '公车使用分析',
            img: 'float_vehicle@2x.png',
            name: 'AnalysisBusUse',
            path: '/organization-car',
            component: () => import('@/views/WisdomReminder/AnalysisBusUse')
          },
          {
            title: '违规用车管控',
            img: 'float_violation@2x.png',
            name: 'ViolationsCarManage',
            path: '/violation',
            component: () => import('@/views/WisdomReminder/ViolationsCarManage')
          }
        ]
      },
      {
        title: '工作评价',
        img: 'float_absence@2x.png',
        icon: 'el-icon-menu',
        name: 'EvaluationAnalysis',
        path: '/evaluation-analysis',
        component: () => import('@/views/WisdomReminder/EvaluationAnalysis')
      }
    ]
  }
]

export default wisdomReminderRouter;
