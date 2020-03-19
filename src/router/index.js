import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import MenuPage from "../views/MenuPage.vue";
import login from "../views/Login.vue";

// 个人首页
import PersonalHome from "../views/PersonalHome";
import Gateway from "../views/AgencyJump/Gateway.vue";
import Cooperation from "../views/AgencyJump/Cooperation.vue";
import Refinement from "../views/AgencyJump/Refinement.vue";

import organizationRouter from './organization'

import wisdomReminderRouter from './modules/wisdomreminder';
// import integrityRiskRouter from './modules/integrityRisk';
import UserRouter from './user'
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
        img: 'left_home@2x.png',
        icon: 'el-icon-s-home',
        // icon: 'el-icon-location',
        path: "/PersonalHome",
        name: "PersonalHome",
        component: PersonalHome
      },
      {
        title: '市局门户',
        img: 'left_attendance@2x.png',
        icon: 'el-icon-s-home',
        // icon: 'el-icon-location',
        path: "/Gateway",
        name: "Gateway",
        component: Gateway
      },
      ...organizationRouter,
      {
        title: '协作提效',
        img: 'left_sensing@2x.png',
        icon: 'el-icon-s-home',
        // icon: 'el-icon-location',
        path: "/Cooperation",
        name: "Cooperation",
        component: Cooperation
      },
      {
        title: '精细管理',
        img: 'left_ledger@2x.png',
        icon: 'el-icon-s-home',
        // icon: 'el-icon-location', left_organization@2x.png
        path: "/Refinement",
        name: "Refinement",
        component: Refinement
      },
      ...wisdomReminderRouter,
      // ...integrityRiskRouter,
      
      ...UserRouter,

    ]
  },
  {
    path: "/404",
    name: "notFound",
    component: () => import('@/views/error')
  }, {
    path: "*", // 此处需特别注意置于最底部
    redirect: "/404"
  },
  {
    path: "/login",
    name: "login",
    hidden:true,
    component: login
  },
  // {
  //   path: "/agency",
  //   name: "agency",
  //   hidden:true,
  //   component: agency
  // },
  //
];
console.log(routes);

const router = new VueRouter({
  routes,
});

export default router;
