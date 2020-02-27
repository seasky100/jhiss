import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import MenuPage from "../views/MenuPage.vue";
// 个人首页
import PersonalHome from "../views/PersonalHome";
import PersonalHome2 from "../views/PersonalHome2";

import organizationRequest from "../views/wisdomSupervision/organizationRequest";
import organizationRequestAdd from "../views/wisdomSupervision/organizationRequestAdd";

const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
}
Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/Home",
  //   name: "home",
  //   component: Home
  // },
  // 根目录导航页
  {
    path: "/",
    name: "MenuPaage",
    component: MenuPage,
    children: [
      {
        title:'个人首页',
        icon: 'el-icon-location',
        path: "/PersonalHome",
        name: "PersonalHome",
        component: PersonalHome
      },
      {
        title:'市局门户',
        icon: 'el-icon-menu',
        path: "/PersonalHome2",
        name: "PersonalHome2",
        component: PersonalHome2
      },
      {
        title:'事项申报',
        icon: 'el-icon-menu',
        path: "/organizationRequest",
        name: "organizationRequest",
        component: organizationRequest
      },
      {
        title:'新增',
        icon: 'el-icon-menu',
        path: "/organizationRequestAdd",
        name: "organizationRequestAdd",
        component: organizationRequestAdd
      },
      {
        title:'考勤预警管控',
        icon: 'el-icon-menu',
        name: 'AttendanceWarning',
        path: "attendance-warning",
        component: () => import('@/views/WisdomReminder/WisdomAttendance/AttendanceWarning')
      },
      {
        title:'检查通报',
        icon: 'el-icon-menu',
        name: 'InspectionBulletin',
        path: "inspection-bulletin",
        component: () => import('@/views/WisdomReminder/InspectionBulletin')
      },
      {
        title:'违规车管控',
        icon: 'el-icon-menu',
        name: 'ViolationsCarManage',
        path: "violation",
        component: () => import('@/views/ViolationsCarManage')
      },
      {
        title:'公车使用分析',
        icon: 'el-icon-menu',
        name: 'AnalysisBusUse',
        path: "analysis-use",
        component: () => import('@/views/AnalysisBusUse')
      }
    ]
  }
  //
];

const routesMenu = [
  {
    path: "/",
    name: "MenuPaage",
    component: MenuPage,
    children: [
      {
        title:'个人首页',
        icon: 'el-icon-location',
        path: "/PersonalHome",
      },
      {
        title:'市局门户',
        icon: 'el-icon-menu',
        path: "/PersonalHome2",
      },
      {
        title:'层级管理',
        icon: 'el-icon-menu',
        path: "/PersonalHome2",
        children:[
          {title:'事项申报', icon: 'el-icon-menu', path: "/organizationRequest"}
        ]
      },
      {
        path: '1',
        title:'导航一', 
        icon: 'el-icon-location',
        children:[{
          path: '1-1',
          title:'二级', 
          icon: 'el-icon-location',
          children:[{
            path: '1-1-1',
            title:'三级', 
            icon: 'el-icon-location',
            children:[
              {path: '1-1-1-1',title:'四级', icon: 'el-icon-location'}
            ]
          }]
          },
          {path: '1-2',title:'二级2', icon: 'el-icon-location'}
        ]},
      {
        path: '2',
        title:'导航二', 
        icon: 'el-icon-location'
      },
      {
        title:'考勤预警管控',
        icon: 'el-icon-menu',
        path: "attendance-warning"
      },
      {
        title:'检查通报',
        icon: 'el-icon-menu',
        path: "inspection-bulletin"
      },
      {
        title:'违规车管控',
        icon: 'el-icon-menu',
        path: "violation"
      },
      {
        title:'公车使用分析',
        icon: 'el-icon-menu',
        path: "analysis-use"
      }
    ]
  }
  //
];

const router = new VueRouter({
  routes,
  routesMenu
});

export default router;
