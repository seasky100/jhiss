export default [
  {
    title: '层级管理',
    icon: 'el-icon-user-solid',
    img: 'left_organization@2x.png',
    meta: {
      permValue: 'ZHKQ',
    },
    path: "/PersonalHome2",
    component: {
      render: (h) => h('router-view'),
    },
    children: [
      // 层级关系
      {
        title: '层级体系',
        hidden: true,
        meta: {
          permValue: 'ZHKQ',
          userId: '39411b303f3346c69c7a7c507a6d0afd',
        },
        icon: 'left_organization@2x.png',
        img: 'left_organization@2x.png',
        path: "/Org_relationship",
        component: () => import('@/views/wisdomSupervision/org_relationship/Org_relationship')
      },
      {
        title: '层级体系',
        hidden: false,
        meta: {
          permValue: 'ZHKQ',
          userId: 'others'
        },
        icon: 'el-icon-menu',
        img: 'left_organization@2x.png',
        path: "/Departmental_level",
        component: () => import('@/views/wisdomSupervision/org_relationship/Departmental_level')
      },
      // {
      //   title: '人员关系',
      //   hidden: true,
      //   meta: {
      //     permValue: 'ZHKQ',
      //   },
      //   icon: 'el-icon-menu',
      //   img: 'left_organization@2x.png',
      //   path: "/Personnel_relation",
      //   component: () => import('@/views/wisdomSupervision/org_relationship/Personnel_relation')
      // },
      {
        title: '层级履职',
        icon: 'el-icon-menu',
        img: 'left_menu_sub_talk.png',
        name: '',
        meta: {
          permValue: 'ZHKQ',
        },
        path: "/Personnel_relation",
        component: () => import('@/views/wisdomSupervision/org_relationship/Personnel_relation'),
        // component: {
        //   render: (h) => h('router-view'),
        // },
        // children: [
          // {
          //     title: '层级评价',
          //     meta:{
          //         permValue:'ZHKQ',
          //       },
          //     icon: 'el-icon-menu',
          //     img: 'left_menu_sub_evaluate.png',
          //     path: "/HierEvaluation",
          //     component: () => import('@/views/wisdomSupervision/HierEvaluation')
          // },       
        // ]
      },
      // 层级履职隐藏路由
      {
        title: '风险评估',
        icon: 'el-icon-menu',
        hidden: true,
        meta: {
          permValue: 'ZHKQ',
        },
        img: 'left_menu_sub_evaluate.png',
        path: "/JobRisk",
        component: () => import('@/views/wisdomSupervision/JobRisk')
      },
      {
        title: '预警管控',
        icon: 'el-icon-menu',
        hidden: true,
        meta: {
          permValue: 'ZHKQ',
        },
        img: 'left_menu_sub_evaluate.png',
        path: "/RiskControl",
        component: () => import('@/views/wisdomSupervision/RiskControl')
      },
      // 谈话谈心
      {
        title: '谈话谈心',
        icon: 'el-icon-menu',
        hidden: true,
        meta: {
          permValue: 'ZHKQ',
        },
        img: 'left_menu_sub_talk.png',
        path: "/talks",
        name: "talks",
        component: () => import('@/views/wisdomSupervision/talks')
      },

      {
        title: '学习教育',
        icon: 'el-icon-menu',
        hidden: true,
        meta: {
          permValue: 'ZHKQ',
        },
        img: 'left_menu_sub_talk.png',
        path: "/LearnEducation",
        name: "LearnEducation",
        component: () => import('@/views/wisdomSupervision/Education/LearnEducation')
      },
      {
        title: '事项申报',
        icon: 'el-icon-menu',
        meta: {
          permValue: 'ZHKQ',
        },
        img: 'left_menu_sub_year.png',
        name: '',
        path: "/IndividualReport",
        component: {
          render: (h) => h('router-view'),
        },
        children: [
          // 个人即报
          {
            title: '个人即报',
            icon: 'el-icon-menu',
            meta: {
              permValue: 'ZHKQ',
            },
            img: 'left_menu_sub_instant.png',
            path: "/IndividualReport",
            name: "IndividualReport",
            component: () => import('@/views/wisdomSupervision/IndividualReport')
          },
          // 事项申报
          {
            title: '层级报备',
            icon: 'el-icon-menu',
            meta: {
              permValue: 'ZHKQ',
            },
            img: 'left_menu_sub_declare.png',
            path: "/organizationRequest",
            component: () => import('@/views/wisdomSupervision/organizationRequest')
          },
          {
            title: '年度报告',
            icon: 'el-icon-menu',
            meta: {
              permValue: 'ZHKQ',
            },
            img: 'left_menu_sub_year.png',
            path: "/AnnualReportList",
            name: "AnnualReportList",
            component: () => import('@/views/wisdomSupervision/AnnualReport/AnnualReportList')
          },
        ]
      },
      {
        title: '年度报告详情',
        hidden: true,
        icon: 'el-icon-menu',
        meta: {
          permValue: 'ZHKQ',
        },
        img: 'left_menu_sub_year.png',
        path: "/AnnualReportAdd",
        name: "AnnualReportAdd",
        component: () => import('@/views/wisdomSupervision/AnnualReport/AnnualReportAdd')
      },
      {
        title: '年度报告修改',
        hidden: true,
        icon: 'el-icon-menu',
        meta: {
          permValue: 'ZHKQ',
        },
        img: 'left_menu_sub_year.png',
        path: "/AnnualReportSet",
        name: "AnnualReportSet",
        component: () => import('@/views/wisdomSupervision/AnnualReport/AnnualReportSet')
      },
      {
        title: '事项申报新增',
        hidden: true,
        icon: 'el-icon-menu',
        meta: {
          permValue: 'ZHKQ',
        },
        img: 'left_organization@2x.png',
        path: "/organizationRequestAdd",
        name: "organizationRequestAdd",
        component: () => import('@/views/wisdomSupervision/organizationRequestAdd')
      },
      {
        title: '事项申报详情',
        hidden: true,
        icon: 'el-icon-menu',
        meta: {
          permValue: 'ZHKQ',
        },
        img: 'left_organization@2x.png',
        path: "/organizationRequestDetail",
        name: "organizationRequestDetail",
        component: () => import('@/views/wisdomSupervision/organizationRequestDetail')
      },
      // 个人即报类型申请
      {
        title: '因私出境',
        hidden: true,
        meta: {
          permValue: 'ZHKQ',
        },
        icon: 'el-icon-menu',
        path: "/Private_exit",
        name: "Private_exit",
        component: () => import('@/views/wisdomSupervision/org_report_apply/Private_exit')
      },
      {
        title: '房产变更',
        hidden: true,
        meta: {
          permValue: 'ZHKQ',
        },
        icon: 'el-icon-menu',
        path: "/House_property",
        name: "House_property",
        component: () => import('@/views/wisdomSupervision/org_report_apply/House_property')
      },
      {
        title: '婚姻情况',
        hidden: true,
        meta: {
          permValue: 'ZHKQ',
        },
        icon: 'el-icon-menu',
        path: "/Marital_status",
        name: "Marital_status",
        component: () => import('@/views/wisdomSupervision/org_report_apply/Marital_status')
      },
      {
        title: '婚丧宴请',
        hidden: true,
        meta: {
          permValue: 'ZHKQ',
        },
        icon: 'el-icon-menu',
        path: "/Weddings",
        name: "Weddings",
        component: () => import('@/views/wisdomSupervision/org_report_apply/Weddings')
      },
      {
        title: '收受礼金',
        hidden: true,
        meta: {
          permValue: 'ZHKQ',
        },
        icon: 'el-icon-menu',
        path: "/Accepting_gifts",
        name: "Accepting_gifts",
        component: () => import('@/views/wisdomSupervision/org_report_apply/Accepting_gifts')
      },
      {
        title: '亲属从业',
        hidden: true,
        meta: {
          permValue: 'ZHKQ',
        },
        icon: 'el-icon-menu',
        path: "/Kinship_work",
        name: "Kinship_work",
        component: () => import('@/views/wisdomSupervision/org_report_apply/Kinship_work')
      },
      {
        title: '移居国外',
        hidden: true,
        meta: {
          permValue: 'ZHKQ',
        },
        icon: 'el-icon-menu',
        path: "/Emigrate",
        name: "Emigrate",
        component: () => import('@/views/wisdomSupervision/org_report_apply/Emigrate')
      },
      {
        title: '境外投资',
        hidden: true,
        meta: {
          permValue: 'ZHKQ',
        },
        icon: 'el-icon-menu',
        path: "/Offshore_Touzi",
        name: "Offshore_Touzi",
        component: () => import('@/views/wisdomSupervision/org_report_apply/Offshore_Touzi')
      },
      {
        title: '亲属经商',
        hidden: true,
        meta: {
          permValue: 'ZHKQ',
        },
        icon: 'el-icon-menu',
        path: "/Relatives_business",
        name: "Relatives_business",
        component: () => import('@/views/wisdomSupervision/org_report_apply/Relatives_business')
      },
      {
        title: '境外存款',
        hidden: true,
        meta: {
          permValue: 'ZHKQ',
        },
        icon: 'el-icon-menu',
        path: "/Offshore_deposits",
        name: "Offshore_deposits",
        component: () => import('@/views/wisdomSupervision/org_report_apply/Offshore_deposits')
      },
      {
        title: '担保借贷',
        hidden: true,
        meta: {
          permValue: 'ZHKQ',
        },
        icon: 'el-icon-menu',
        path: "/Secured_lending",
        name: "Secured_lending",
        component: () => import('@/views/wisdomSupervision/org_report_apply/Secured_lending')
      },
      {
        title: '涉纪涉诉事项',
        hidden: true,
        meta: {
          permValue: 'ZHKQ',
        },
        icon: 'el-icon-menu',
        path: "/Matters_involved",
        name: "Matters_involved",
        component: () => import('@/views/wisdomSupervision/org_report_apply/Matters_involved')
      },
      {
        title: '其他即报',
        hidden: true,
        meta: {
          permValue: 'ZHKQ',
        },
        icon: 'el-icon-menu',
        path: "/Other_matters",
        name: "Other_matters",
        component: () => import('@/views/wisdomSupervision/org_report_apply/Other_matters')
      },
      {
        title: '年度报告详情',
        hidden: true,
        meta: {
          permValue: 'ZHKQ',
        },
        icon: 'el-icon-menu',
        path: "/AnnualReportInfo",
        name: "AnnualReportInfo",
        component: () => import('@/views/wisdomSupervision/AnnualReport/AnnualReportInfo')
      },
      {
        title: '警示教育',
        icon: 'el-icon-menu',
        meta: {
          permValue: 'ZHKQ',
        },
        img: 'left_menu_sub_caution.png',
        path: "/Caution",
        name: "Caution",
        component: () => import('@/views/wisdomSupervision/Caution')
      },
      {
        title: '警示教育曝光栏详情',
        icon: 'el-icon-menu',
        meta: {
          permValue: 'ZHKQ',
        },
        hidden: true,
        img: 'left_menu_sub_caution.png',
        path: "/CautionArticle",
        name: "CautionArticle",
        component: () => import('@/views/wisdomSupervision/CautionArticle')
      },
      {
        title: '廉政学习',
        meta: {
          permValue: 'ZHKQ',
        },
        icon: 'el-icon-menu',
        img: 'left_menu_sub_education.png',
        path: "/government_Clture",
        name: "government_Clture",
        component: () => import('@/views/wisdomSupervision/government_Clture')
      },
      // {
      //     title: '检查通报',
      //     icon: 'el-icon-menu',
      //     img: 'left_organization@2x.png',
      //     name: 'InspectionBulletin',
      //     path: "/inspectionbulletin",
      //     component: () => import('@/views/WisdomReminder/InspectionBulletin')
      // },
      {
        title: '台账管理',
        meta: {
          permValue: 'ZHKQ',
        },
        icon: 'el-icon-menu',
        img: 'left_menu_sub_ledger.png',
        name: 'PersonnelParameter',
        path: '/personnel-parameter',
        component: () => import('@/views/wisdomSupervision/PersonnelParameter')
      },
      {
        title: '台账管理详情',
        icon: 'el-icon-menu',
        meta: {
          permValue: 'ZHKQ',
        },
        hidden: true,
        img: 'left_menu_sub_ledger.png',
        name: 'parameterDetail',
        path: '/parameterDetail',
        component: () => import('@/views/wisdomSupervision/PersonnelParameter/modal/parameterDetail')
      },
      // {
      //     title: '树图DEMO',
      //     icon: 'el-icon-menu',
      //     img: 'left_menu_sub_ledger.png',
      //     name: 'Tree',
      //     path: '/Tree',
      //     component: () => import('@/views/Tree')
      // }
    ]
  },
]