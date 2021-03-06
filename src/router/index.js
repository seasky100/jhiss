import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import MenuPage from "../views/MenuPage.vue";
import login from "../views/Login.vue";

// 个人首页
import PersonalHome from "../views/PersonalHome";
import Gateway from "../views/AgencyJump/Gateway.vue";
import Cooperation from "../views/AgencyJump/Cooperation.vue";

import organizationRouter from './organization'

import wisdomReminderRouter from './modules/wisdomreminder';
// import integrityRiskRouter from './modules/integrityRisk';
//云上政工
import cloudpoliticalRouter from './modules/cloudpolitical'
import UserRouter from './user'
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
}
Vue.use(VueRouter);

export const constantRoutes = [
  // {
  //   path: "/Home",
  //   name: "home",
  //   component: Home
  // },
  // 根目录导航页
  {
    path: "/",
    name: "MenuPaage",
    meta: {
      permValue: 'ZHKQ',
    },
    component: MenuPage,
    children: [
      {
        title: '个人首页',
        img: 'left_home@2x.png',
        icon: 'el-icon-s-home',
        // icon: 'el-icon-location',
        path: "/PersonalHome",
        meta: {
          permValue: 'ZHKQ',
        },
        name: "PersonalHome",
        component: PersonalHome
      },
      // {
      //   title: '市局门户',
      //   img: 'left_attendance@2x.png',
      //   icon: 'el-icon-s-home',
      //   // icon: 'el-icon-location',
      //   path: "/Gateway",
      //   name: "Gateway",
      //   component: Gateway
      // },
      ...organizationRouter,
      {
        title: '协作提效',
        img: 'left_sensing@2x.png',
        icon: 'el-icon-s-home',
        // icon: 'el-icon-location',
        path: "/Cooperation",
        name: "Cooperation",
        meta: {
          permValue: 'ZHKQ',
        },
        component: Cooperation
      },
      ...cloudpoliticalRouter,
      ...wisdomReminderRouter,
      // ...integrityRiskRouter,

      ...UserRouter,

    ]
  },
  {
    path: "/login",
    name: "login",
    hidden: true,
    component: login
  },
  {
    path: "/404",
    name: "notFound",
    component: () => import('@/views/error')
  }, {
    path: "*", // 此处需特别注意置于最底部
    redirect: "/404"
  },

  // {
  //   path: "/agency",
  //   name: "agency",
  //   hidden:true,
  //   component: agency
  // },
  //
];

const createRouter = () => new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
});
const router = createRouter()
// const router = new VueRouter({
//   routes,
// });

export default router;
