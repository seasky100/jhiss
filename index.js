import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import MenuPage from "../views/MenuPage.vue";
// 个人首页
import PersonalHome from "../views/PersonalHome";
import PersonalHome2 from "../views/PersonalHome2";

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
      }
    ]
  }
  //
];

const router = new VueRouter({
  routes
});

export default router;
