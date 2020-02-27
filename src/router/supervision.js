import wa from '@/views/WisdomReminder/WisdomAttendance/AttendanceWarning'
export default [
    {
        title: '智慧监督',
        path: '/supervision',
        icon: 'el-icon-menu',
        component: () => import('@/views/Supervision'),
        children: [
            {
                title: '考勤预警管控',
                icon: 'el-icon-menu',
                name: 'AttendanceWarning',
                path: "/attendance-warning",
                component: () => import('@/views/Supervision'),
                children: [
                    {
                        title: '考勤分析',
                        path: '/attendanceanalysis',
                        component: () => import('@/views/WisdomReminder/WisdomAttendance/AttendanceWarning')
                    },
                    {
                        title: '考勤预警',
                        path: '/AttendanceWarning',
                        component: () => import('@/views/WisdomReminder/WisdomAttendance/AttendanceWarning')
                    }
                ]

            }, 
            // {
            //     title: '违规车管控',
            //     icon: 'el-icon-menu',
            //     name: 'ViolationsCarManage',
            //     path: "/violation",
            //     component: () => import('@/views/ViolationsCarManage')
            // },
        ]
    }
]