export default [
    {
        title: '层级管理',
        icon: 'el-icon-menu',
        path: "/PersonalHome2",
        component: () => import('@/views/OrganizeManage'),
        children: [
            {
                title: '事项申报',
                icon: 'el-icon-menu',
                path: "/organizationRequest",
                component: () => import('@/views/wisdomSupervision/organizationRequest')
            },
            {
                title:'事项申报新增',
                hidden:true,
                icon: 'el-icon-menu',
                path: "/organizationRequestAdd",
                name: "organizationRequestAdd",
                component: () => import('@/views/wisdomSupervision/organizationRequestAdd')
              },
            {
                title:'事项申报详情',
                hidden:true,
                icon: 'el-icon-menu',
                path: "/organizationRequestDetail",
                name: "organizationRequestDetail",
                component: () => import('@/views/wisdomSupervision/organizationRequestDetail')
            },
            {
                title:'谈话谈心',
                icon: 'el-icon-menu',
                path: "/talks",
                name: "talks",
                component: () => import('@/views/wisdomSupervision/talks')
            },
            {
                title:'新增谈话谈心',
                hidden:true,
                icon: 'el-icon-menu',
                path: "/TalkAdd",
                name: "TalkAdd",
                component: () => import('@/views/wisdomSupervision/TalkAdd')
            },
            {
                title:'个人即报',
                icon: 'el-icon-menu',
                path: "/IndividualReport",
                name: "IndividualReport",
                component: () => import('@/views/wisdomSupervision/IndividualReport')
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
                title:'警示教育',
                icon: 'el-icon-menu',
                path: "/Caution",
                name: "Caution",
                component: () => import('@/views/wisdomSupervision/Caution')
            },
            {
                title: '检查通报',
                icon: 'el-icon-menu',
                name: 'InspectionBulletin',
                path: "/inspectionbulletin",
                component: () => import('@/views/WisdomReminder/InspectionBulletin')
            },
        ]
    },
]