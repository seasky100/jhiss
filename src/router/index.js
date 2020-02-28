import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import MenuPage from "../views/MenuPage.vue";
// 个人首页
import PersonalHome from "../views/PersonalHome";
import PersonalHome2 from "../views/PersonalHome2";

import organizationRequestAdd from "../views/wisdomSupervision/organizationRequestAdd";
import organizationRouter from './organization'
import supervisionRouter from './supervision'

import wisdomReminderRouter from './modules/wisdomreminder';
import integrityRiskRouter from './modules/integrityRisk';

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
        title: '个人首页',
        icon: 'el-icon-location',
        path: "/PersonalHome",
        name: "PersonalHome",
        component: PersonalHome
      },
      {
        title: '市局门户',
        icon: 'el-icon-menu',
        path: "/PersonalHome2",
        name: "PersonalHome2",
        component: PersonalHome2
      },
      // {
      //   title: '新增',
      //   icon: 'el-icon-menu',
      //   path: "/organizationRequestAdd",
      //   name: "organizationRequestAdd",
      //   component: organizationRequestAdd
      // },
      // {
      //   title: '考勤预警管控',
      //   icon: 'el-icon-menu',
      //   name: 'AttendanceWarning',
      //   path: "attendance-warning",
      //   component: () => import('@/views/WisdomReminder/WisdomAttendance/AttendanceWarning')
      // },
      // {
      //   title: '违规车管控',
      //   icon: 'el-icon-menu',
      //   name: 'ViolationsCarManage',
      //   path: "violation",
      //   component: () => import('@/views/ViolationsCarManage')
      // },
      ...wisdomReminderRouter,
      ...integrityRiskRouter,
      // ...supervisionRouter,
      ...organizationRouter
    ]
  },
  {
    path: "/404",
    name: "notFound",
    component: () => import('@/views/error')
  }, {
    path: "*", // 此处需特别注意置于最底部
    redirect: "/404"
  }
  //
];
console.log(routes);

const router = new VueRouter({
  routes,
});

export default router;
