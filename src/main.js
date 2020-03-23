import Vue from "vue";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import request from '@/utils/request'
import echarts from 'echarts';
import 'echarts/map/js/china';

import './components';
import dayjs from 'dayjs';
// import Print from 'vue-print-nb';
// Vue.use(Print);
import Print from './plugs/print'
Vue.use(Print)
Vue.prototype.$echarts = echarts;
Vue.prototype.$request = request
Vue.prototype.$findRouter = findRouter
Vue.prototype.$dayjs = dayjs;
// import '@/utils/permission'
import { findRouter } from '@/utils/findRouter'
Vue.config.productionTip = false

import VCharts from 'v-charts';
Vue.use(VCharts);

import Vue2OrgTree from 'vue2-org-tree';
Vue.use(Vue2OrgTree)

Vue.use(ElementUI)
import BaiduMap from 'vue-baidu-map';
Vue.use(BaiduMap, {
      /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
      ak: '0hn8QhIIdXY3F5WnW7X3jYMaKQp1dr6O'
})
Vue.config.productionTip = false
new Vue({
  router,
  store,
  data: {
    eventHub: new Vue()
  },
  render: h => h(App)
}).$mount("#app");
