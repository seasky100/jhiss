<template>
  <div id="app" class="app" v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <router-view/>
        <!-- 封装的loading 组件 -->
    <loading v-if='LOADING'/> 
    <!-- <div v-show='message' class='yjtk'>
        <span></span><div class='a_tip'>您有新的预警信息</div>
      <div style="text-align: -webkit-center;margin-top: 10px;"><div class='a_handle'>立即处理</div></div>
    </div> -->
  </div>
</template>
<script>
import { treeAndUser } from "@/api/report.js";
import { warnInfoUserStatistics } from "@/api/warn.js";
import { getUserListByUserId } from "@/api/user-server.js";
import { mapGetters } from 'vuex';
import {mapState} from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapGetters([
      'userId',
      // 'userInfo',
      'orgId',
      'token'
    ]),
    ...mapState([
        'LOADING'
    ])
  },
  provide () {
    return {
      AppComponent: this
    }
  },
  data () {
    return {
      countotal: 0,
      timer:'',
      message: false,
      loading: false,
    }
  },
  created() {
    this.$store.dispatch('user/getOrgData')
  },
  watch: {
    'countotal': {
      handler(newVal, oldVal) {
        if (newVal > oldVal) {
          // this.message = true
          const h = this.$createElement
          this.$notify({
            title: '',
            dangerouslyUseHTMLString: true,
            message: h('div', { class: 'message' }, [
              h('div', { class: 'title',style:"margin-top: -8px;" }, '温馨提示：'),
              h('div', { class: 'info',style:"color:red;margin-left: 51px; font-size:16px;"}, '您有新的预警信息！！！'),
              h('btnlist', { class: 'info', on: { click: this.onClick },style:"float: right;margin-top: 9px;cursor: pointer;background-color: red; color: white;width: 38px;text-align: -webkit-center;font-size: 10px;padding: 0px 8px;background: #FA7F79; color: white;border-radius: 18px;"}, '处理')
            ]),
            // message:'<strong><div style="margin-top: -8px;" >温馨提示：</div><span style="color:red;margin-left: 51px; font-size:16px;">您有新的预警信息！！！</span><div onclick="this.onClick">去处理</div>></strong>',
            position: 'bottom-right',
            duration: 0
          })
        }
      }
    }
  },
  mounted() {
    // this.getLeaderList()
    this.setTimer();
    // const token = sessionStorage.getItem('token')
    // console.log(window.location.href)   
    // if(token){
    //   window.location.href ;
    // }else{
    //   this.$router.push({ path: '/login' });
    // }
    //this.$router.push({ path: '/PersonalHome' });
    // this.init()
  },
  methods: {
    setTimer() { //动态展示近90天的考勤数据
      const $this = this
      $this.timer = setInterval(() => {
        //  const aa =  $this.$store.getters.countotal
         $this.countotal = localStorage.getItem('countotal')
        }, 3000)
    },
    onClick(){
      this.$router.push('/RiskControl')
    },
    // 局领导级别人员
    getLeaderList(){
      // this.loading = true
      getUserListByUserId({
        userId: '39411b303f3346c69c7a7c507a6d0afd',
      }).then(res => {
        let leaderStr = res.data.map(item => {
          return item.id
        })
        leaderStr.unshift('39411b303f3346c69c7a7c507a6d0afd')
        leaderStr = leaderStr.join(',')
        window.sessionStorage.leaderStr = leaderStr
        // console.log(window.sessionStorage.leaderStr)
        // this.loading = false
      });
    },
    // 
  }
}
</script>
<style>
html, body { margin: 0 auto; width:100%; height:100%; overflow: hidden; -webkit-font-smoothing: antialiased;  -moz-osx-font-smoothing: grayscale;}
html{font-size:62.5%;}
body{ font-size:12px; color: #333; font-size:1.2rem; font-family: "Microsoft yahei"; width:100%; height:100%; background-size: 100% 100%;}

body >>> .el-dropdown-menu__item--divided:before{
  background:#00081d !important;
}
body >>> .el-dropdown-menu__item--divided{
  border-top:1px solid #00081d !important;
}
body >>> .el-popper .popper__arrow::after{
  border-top-color:#00081d;
}
.el-notification.right {
  border: 1px solid rosybrown;
  margin-right: 28px !important;
  background-color: blanchedalmond;
  margin-bottom: 32px !important;
  border-left: 10px solid red;
}
.el-notification {
  width: 283px !important;
  padding: 11px 20px 3px 14px !important;
}
.el-notification__group {
    margin-left: -5px !important;
    /* margin-right: 2px; */
}
/* .title{
  background: url(./utils/img/yjkbj.png);
} */
.yjtk{
  width: 193px;
  z-index: 9999999;
  height: 160px;
  position: absolute;
  bottom: 44px;
  margin-top: 100px;
  right: 18px;
  background: url(./utils/img/yjkbj.png)no-repeat center / cover;
}
</style>
<style scoped>
.app{width:100%;height:100%;}
.a_tip{
  margin-top: 94px;
  /* margin: 0 auto; */
  width: 50%;
  margin-left: 37px;


}
.a_handle{
    font-size: 10px;
    padding: 4px 11px;
    background: #006eff;
    color: #fff;
    border-radius: 18px;
    width: 49px;
}
</style>