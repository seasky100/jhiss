import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import MenuPage from "../views/MenuPage.vue";
import login from "../views/Login.vue";
// 个人首页
import PersonalHome from "../views/PersonalHome";

import organizationRouter from './organization'

import wisdomReminderRouter from './modules/wisdomreminder';
import integrityRiskRouter from './modules/integrityRisk';
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
        icon: 'el-icon-location',
        path: "/PersonalHome",
        name: "PersonalHome",
        component: PersonalHome
      },
      ...wisdomReminderRouter,
      ...integrityRiskRouter,
      ...organizationRouter,
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
  //
];
console.log(routes);

const router = new VueRouter({
  routes,
});

export default router;
