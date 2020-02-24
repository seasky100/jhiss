import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import MenuPage from "../views/MenuPage.vue";
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
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
      // 服务监管
      { path: '/talk', component: () => import('../views/wisdomSupervision/talk.vue') }, // 设备
            // 服务监管
      { path: '/talk2', component: () => import('../views/wisdomSupervision/talk2.vue') }, // 设备

    ]
  }

  
  //
];

const router = new VueRouter({
  routes
});

export default router;
