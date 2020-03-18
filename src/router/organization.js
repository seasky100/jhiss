export default [
    {
        title: '层级管理',
        icon: 'el-icon-user-solid',
        img: 'left_organization@2x.png',
        path: "/PersonalHome2",
        component: () => import('@/views/OrganizeManage'),
        children: [
            // 层级关系
            {
                title: '层级关系',
                icon: 'left_organization@2x.png',
                img: 'left_organization@2x.png',
                path: "/Org_relationship",
                component: () => import('@/views/wisdomSupervision/org_relationship/Org_relationship')
            },
            {
                title: '部门级别',
                hidden: true,
                icon: 'el-icon-menu',
                img: 'left_organization@2x.png',
                path: "/Departmental_level",
                component: () => import('@/views/wisdomSupervision/org_relationship/Departmental_level')
            },
            {
                title: '人员关系',
                hidden: true,
                icon: 'el-icon-menu',
                img: 'left_organization@2x.png',
                path: "/Personnel_relation",
                component: () => import('@/views/wisdomSupervision/org_relationship/Personnel_relation')
            }, 
            {
                title: '层级履职',
                icon: 'el-icon-menu',
                img: 'left_menu_sub_talk.png',
                name: '',
                path: "",
                component: () => import('@/views/OrganizeManage'),
                children: [
                    {
                        title: '层级评价',
                        icon: 'el-icon-menu',
                        img: 'left_menu_sub_evaluate.png',
                        path: "/HierEvaluation",
                        component: () => import('@/views/wisdomSupervision/HierEvaluation')
                    },
                    // 谈话谈心
                    {
                        title:'谈话谈心',
                        icon: 'el-icon-menu',
                        img: 'left_menu_sub_talk.png',
                        path: "/talks",
                        name: "talks",
                        component: () => import('@/views/wisdomSupervision/talks')
                    }, 
                ]
            },
            //   
            {
                title:'事项申报新增',
                hidden:true,
                icon: 'el-icon-menu',
                img: 'left_organization@2x.png',
                path: "/organizationRequestAdd",
                name: "organizationRequestAdd",
                component: () => import('@/views/wisdomSupervision/organizationRequestAdd')
              },
            {
                title:'事项申报详情',
                hidden:true,
                icon: 'el-icon-menu',
                img: 'left_organization@2x.png',
                path: "/organizationRequestDetail",
                name: "organizationRequestDetail",
                component: () => import('@/views/wisdomSupervision/organizationRequestDetail')
            },
            {
                title:'新增谈话谈心', 
                hidden:true,
                icon: 'el-icon-menu',
                path: "/TalkAdd",
                name: "TalkAdd",
                component: () => import('@/views/wisdomSupervision/TalkAdd')
            },
            // 个人即报类型申请
            {
                title:'因私出境',
                hidden:true,
                icon: 'el-icon-menu',
                path: "/Private_exit",
                name: "Private_exit",
                component: () => import('@/views/wisdomSupervision/org_report_apply/Private_exit')
            },
            {
                title:'房产变更',
                hidden:true,
                icon: 'el-icon-menu',
                path: "/House_property",
                name: "House_property",
                component: () => import('@/views/wisdomSupervision/org_report_apply/House_property')
            },
            {
                title:'婚姻情况',
                hidden:true,
                icon: 'el-icon-menu',
                path: "/Marital_status",
                name: "Marital_status",
                component: () => import('@/views/wisdomSupervision/org_report_apply/Marital_status')
            },
            {
                title:'婚丧宴请',
                hidden:true,
                icon: 'el-icon-menu',
                path: "/Weddings",
                name: "Weddings",
                component: () => import('@/views/wisdomSupervision/org_report_apply/Weddings')
            },
            {
                title:'收受礼金',
                hidden:true,
                icon: 'el-icon-menu',
                path: "/Accepting_gifts",
                name: "Accepting_gifts",
                component: () => import('@/views/wisdomSupervision/org_report_apply/Accepting_gifts')
            },
            {
                title:'亲属从业',
                hidden:true,
                icon: 'el-icon-menu',
                path: "/Kinship_work",
                name: "Kinship_work",
                component: () => import('@/views/wisdomSupervision/org_report_apply/Kinship_work')
            },
            {
                title:'移居国外',
                hidden:true,
                icon: 'el-icon-menu',
                path: "/Emigrate",
                name: "Emigrate",
                component: () => import('@/views/wisdomSupervision/org_report_apply/Emigrate')
            },
            {
                title:'境外投资',
                hidden:true,
                icon: 'el-icon-menu',
                path: "/Offshore_Touzi",
                name: "Offshore_Touzi",
                component: () => import('@/views/wisdomSupervision/org_report_apply/Offshore_Touzi')
            },
            {
                title:'亲属经商',
                hidden:true,
                icon: 'el-icon-menu',
                path: "/Relatives_business",
                name: "Relatives_business",
                component: () => import('@/views/wisdomSupervision/org_report_apply/Relatives_business')
            },
            {
                title:'境外存款',
                hidden:true,
                icon: 'el-icon-menu',
                path: "/Offshore_deposits",
                name: "Offshore_deposits",
                component: () => import('@/views/wisdomSupervision/org_report_apply/Offshore_deposits')
            },
            {
                title:'担保借贷',
                hidden:true,
                icon: 'el-icon-menu',
                path: "/Secured_lending",
                name: "Secured_lending",
                component: () => import('@/views/wisdomSupervision/org_report_apply/Secured_lending')
            },
            {
                title:'涉纪涉诉事项',
                hidden:true,
                icon: 'el-icon-menu',
                path: "/Matters_involved",
                name: "Matters_involved",
                component: () => import('@/views/wisdomSupervision/org_report_apply/Matters_involved')
            },
            {
                title:'其他即报',
                hidden:true,
                icon: 'el-icon-menu',
                path: "/Other_matters",
                name: "Other_matters",
                component: () => import('@/views/wisdomSupervision/org_report_apply/Other_matters')
            },
            {
                title:'年度报告详情',
                hidden: true,
                icon: 'el-icon-menu',
                path: "/AnnualReportInfo",
                name: "AnnualReportInfo",
                component: () => import('@/views/wisdomSupervision/AnnualReport/AnnualReportInfo')
            },
            {
                title:'警示教育',
                icon: 'el-icon-menu',
                img: 'left_menu_sub_caution.png',
                path: "/Caution",
                name: "Caution",
                component: () => import('@/views/wisdomSupervision/Caution')
            },
            {
                title:'廉政文化课堂',
                icon: 'el-icon-menu',
                img: 'left_menu_sub_education.png',
                path: "/government_Clture",
                name: "government_Clture",
                component: () => import('@/views/wisdomSupervision/government_Clture')
            },
            {
                title: '事项申报',
                icon: 'el-icon-menu',
                img: 'left_menu_sub_year.png',
                name: 'IndividualReport',
                path: "/IndividualReport",
                component: () => import('@/views/OrganizeManage'),
                children: [
                    // 个人即报
                    {
                        title:'个人即报',
                        icon: 'el-icon-menu',
                        img: 'left_menu_sub_instant.png',
                        path: "/IndividualReport",
                        name: "IndividualReport",
                        component: () => import('@/views/wisdomSupervision/IndividualReport')
                    },
                    // 事项申报
                    {
                        title: '事项申报',
                        icon: 'el-icon-menu',
                        img: 'left_menu_sub_declare.png',
                        path: "/organizationRequest",
                        component: () => import('@/views/wisdomSupervision/organizationRequest')
                    },
                    {
                        title:'年度报告',
                        icon: 'el-icon-menu',
                        img: 'left_menu_sub_year.png',
                        path: "/AnnualReportList",
                        name: "AnnualReportList",
                        component: () => import('@/views/wisdomSupervision/AnnualReport/AnnualReportList')
                    },
                ]
            },
            {
                title: '检查通报',
                icon: 'el-icon-menu',
                img: 'left_organization@2x.png',
                name: 'InspectionBulletin',
                path: "/inspectionbulletin",
                component: () => import('@/views/WisdomReminder/InspectionBulletin')
            },
            {
                title: '台账管理',
                icon: 'el-icon-menu',
                img: 'left_menu_sub_ledger.png',
                name: 'PersonnelParameter',
                path: '/personnel-parameter',
                component: () => import('@/views/wisdomSupervision/PersonnelParameter')
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