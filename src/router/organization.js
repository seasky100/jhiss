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
                title: '检查通报',
                icon: 'el-icon-menu',
                name: 'InspectionBulletin',
                path: "/inspectionbulletin",
                component: () => import('@/views/WisdomReminder/InspectionBulletin')
            },
        ]
    },
]