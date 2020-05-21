export default [
    {
        title: '云上政工',
        img: 'left_ledger@2x.png',
        icon: 'el-icon-s-home',
        path: "/cloudpolitical",
        meta: {
            permValue: 'ZHKQ',
        },
        name: "cloudpolitical",
        component: () => import('@/views/CloudPolitical/'),
        // component: () =>import("../views/AgencyJump/Refinement.vue");
    },
]