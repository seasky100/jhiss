const wisdomReminderRouter = [
  {
    title: '智慧监督',
    path: '/wisdom-reminder',
    icon: 'el-icon-s-opportunity',
    img: 'left_inspection@2x.png',
    component: () => import('@/views/Supervision'),
    children: [
      {
        title: '政工监督',
        img: 'left_organization@2x.png',
        path: 'zhenggong',
        component: { render: (h) => h('router-view') },
        children: [
          {
            title: '绩效评价分析',
            icon: 'el-icon-menu',
            name: 'EvaluationAnalysis',
            path: '/evaluation-analysis',
            component: () => import('@/views/WisdomReminder/EvaluationAnalysis'),
          },
          {
            title: '日常规范分析',
            icon: 'el-icon-menu',
            name: 'richangguifan',
            path: '/richangguifan',
            component: { render: (h) => h('router-view') },
            children: [
              {
                title: '提前就餐预警',
                path: '/EarlyMealWarning',
                component: () => import('@/views/WisdomReminder/PerceptualWisdom/EarlyMealWarning'),
              },
            ]
          },
          {
            title: '护照管理分析',
            icon: 'el-icon-menu',
            name: 'huzhaoguanli',
            path: '/huzhaoguanli',
            component: { render: (h) => h('router-view') },
            children: [
              {
                title: '护照管理',
                name: 'PassportManagement',
                path: '/PassportManagement',
                component: () => import('@/views/WisdomReminder/PassportManagement'),
              },
              {
                title: '出国（镜）分析',
                icon: 'el-icon-menu',
                name: 'GoAbroad',
                path: '/go-abroad',
                component: () => import('@/views/WisdomReminder/GoAbroad'),
              },
            ]
          },

        ],
      },
      {
        title: '纪检监督',
        img: 'left_absence@2x.png',
        path: '/suspected',
        component: {
          render: (h) => h('router-view'),
        },
        children: [
          {
            title: '违法预警分析',
            icon: 'el-icon-menu',
            name: 'SuspectedViolation',
            path: '/suspected',
            component: () => import('@/views/IntegrityRisk/SuspectedViolation'),
          },
          {
            title: '异常查询分析',
            icon: 'el-icon-menu',
            name: 'ViolationEnquiry',
            path: '/violation-enquiry',
            component: () => import('@/views/IntegrityRisk/ViolationEnquiry'),
          },
          {
            title: '纪律作风分析',
            icon: 'el-icon-menu',
            name: 'jilvzuofeng',
            path: '/jilvzuofeng',
            component: {
              render: (h) => h('router-view'),
            },
            children: [
              {
                title: '智慧考勤分析',
                name: 'AttendanceAnalysis',
                path: '/attendance-analysis',
                component: () => import('@/views/WisdomReminder/WisdomAttendance/AttendanceAnalysis'),
              },
              {
                title: '考勤预警管控',
                name: 'AttendanceWarning',
                path: '/attendance-warning',
                component: () => import('@/views/WisdomReminder/WisdomAttendance/AttendanceWarning'),
              },
              {
                title: '请假加班',
                icon: 'el-icon-menu',
                name: 'WisdomAttendance',
                path: "/leave-overtime",
                component: () => import('@/views/IntegrityRisk/LeaveAndOvertime')
              },
              {
                title: '请假情况分析',
                path: '/LeaveSituationAnalysis',
                component: () => import('@/views/WisdomReminder/LeaveAnalysis/LeaveSituationAnalysis'),
              },
              {
                title: '审批记录分析',
                path: '/ApprovalRecordAnalysis',
                component: () => import('@/views/WisdomReminder/LeaveAnalysis/ApprovalRecordAnalysis'),
              },
              {
                title: '刷卡情况分析',
                path: '/CreditCard',
                component: () => import('@/views/WisdomReminder/PerceptualWisdom/CreditCard'),
              },
            ]
          },
          {
            title: '工作效能分析',
            name:'gongzuoxiaoneng',
            path: '/gongzuoxiaoneng',
            component: () => import('@/views/unbuild'),
          },
          {
            title: '层级管理分析',
            name:'cengjiguanli',
            path: '/cengjiguanli',
            component: () => import('@/views/unbuild'),
          },
          {
            title: '事项申报分析',
            name:'shixiagnshenbao',
            path: '/shixiagnshenbao',
            component: () => import('@/views/unbuild'),
          },
          {
            title: '违法违纪分析',
            name:'weifaweiji',
            path: '/weifaweiji',
            component: () => import('@/views/unbuild'),
          },
          {
            title: '涉警信访分析',
            name:'shejingxinfang',
            path: '/shejingxinfang',
            component: () => import('@/views/unbuild'),
          },
          {
            title: '内部巡查分析',
            icon: 'el-icon-menu',
            name: 'InspectionBulletin',
            path: '/bulletin',
            component: () => import('@/views/WisdomReminder/InspectionBulletin'),
          },
        ]
      },
      {
        title: '政务监督',
        icon: 'el-icon-menu',
        img: 'left_sensing@2x.png',
        path: '/gognwenliuzhuan',
        component: {
          render: (h) => h('router-view'),
        },
        children: [
          {
            title: '公文流转分析',
            icon: 'el-icon-menu',
            name: 'gognwenliuzhuan',
            path: '/gognwenliuzhuan',
            component: () => import('@/views/unbuild'),
          },
          {
            title: '会议管理分析',
            icon: 'el-icon-menu',
            name: 'huiyiguanli',
            path: '/huiyiguanli',
            component: () => import('@/views/unbuild'),
          },
          {
            title: '审批环节分析',
            icon: 'el-icon-menu',
            name: 'shenpihuanjie',
            path: '/shenpihuanjie',
            component: () => import('@/views/unbuild'),
          },
        ],
      },
      {
        title: '警务监督',
        icon: 'el-icon-menu',
        img: 'left_menu_sub_evaluate.png',
        name: 'jingwujiandu',
        path: '/unbuild',
        component: () => import('@/views/unbuild'),
      },
      {
        title: '法制监督',
        icon: 'el-icon-menu',
        img: 'left_ledger@2x.png',
        name: 'fazhijiandu',
        path: '/unbuild1',
        component: () => import('@/views/unbuild'),
      },
      {
        title: '信访监督',
        icon: 'el-icon-menu',
        img: 'left_menu_sub_declare.png',
        name:'xinfangjiandu',
        path: '/xinfangjiandu',
        component: () => import('@/views/unbuild'),
      },
      {
        title: '审计监督',
        icon: 'el-icon-menu',
        img: 'left_menu_sub_caution.png',
        name:'shenjijiandu',
        path: '/shenjijiandu',
        component: () => import('@/views/unbuild'),
      },
      {
        title: '警保监督',
        icon: 'el-icon-menu',
        img: 'left_travel@2x.png',
        path: '/organization-car',
        component: {
          render: (h) => h('router-view'),
        },
        children: [
          {
            title: '公车使用分析',
            name: 'AnalysisBusUse',
            path: '/organization-car',
            component: () => import('@/views/WisdomReminder/AnalysisBusUse')
          },
          {
            title: '差旅管理分析',
            icon: 'el-icon-menu',
            name: 'TravelManagement',
            path: '/travel-management',
            component: () => import('@/views/WisdomReminder/TravelManagement'),
          },
          {
            title: '公务接待分析',
            icon: 'el-icon-menu',
            name: 'gongwujiedai',
            path: '/gongwujiedai',
            component: () => import('@/views/unbuild'),
          },
          {
            title: '固定资产分析',
            icon: 'el-icon-menu',
            name: 'gudingzichan',
            path: '/gudingzichan',
            component: () => import('@/views/unbuild'),
          },
         
          // {
          //   title: '违规用车管控',
          //   img: 'left_ledger@2x.png',
          //   name: 'ViolationsCarManage',
          //   path: '/violation',
          //   component: () => import('@/views/WisdomReminder/ViolationsCarManage')
          // },
        ],
      },
      {
        title: '部门共享',
        icon: 'el-icon-menu',
        img: 'float_attendance@2x.png',
        path: '/unbuild',
        component: () => import('@/views/unbuild'),
      },
    ],
  },
];

export default wisdomReminderRouter;
