<template>
  <div class="MenuPage">
    <div class="pageTop">
        <div class='app flex flex-column h-full'>
          <header ref='header' class='flex flex-align-center flex-no-shrink border-box' style="height: 100%">
            <div class='m-left' style="width: 80%">
              <img src='../utils/img/header_logo2.png' class='h48 m_title m_logal' />
              <img src='../utils/img/header_title.png' class='h48 m_title' />
            </div>
            <div v-show='flag' style=" position: relative" @mouseenter="enter()" @mouseleave="leave()">
              <el-card class="box-card m_info">
                <div style="height: 100%; width: 100%">
                  <div style="line-height: 78px;">
                    <span style="font-weight: 700;font-size: inherit">{{name}}</span>
                    <el-avatar :src="src"></el-avatar>
                    <span style="font-family: monospace;font-size: unset;font-weight: 600">{{organizationNames}}</span>
                  </div>
                  <div style="height: 30%;float: left;margin-left: 10px;">
                    <img src='../utils/img/star_on.svg' class='w24 h24 mx4' />
                    <img src='../utils/img/star_on.svg' class='w24 h24 mx4' />
                    <img src='../utils/img/star_on.svg' class='w24 h24 mx4' />
                    <img src='../utils/img/star_off.svg' class='w24 h24 mx4' />
                    <img src='../utils/img/star_off.svg' class='w24 h24 mx4' />
                  </div>
                  <div class='' style="border-left: 1px solid #ccc; margin: 0 1em"></div>
                  <div class='m_conf'>
                    <!-- <img src={`/images/${politicalStatus === '中共党员' ? 'user_menu_party_on@2x' : 'user_menu_party_off@2x'}.png`} class='w24 h24 px4 r-half' /> -->
                    <img src='../utils/img/user_menu_passport_on@2x.png' class='' />
                    <img src='../utils/img/user_menu_salary_on@2x.png' @click='goTo' />
                    <img src='../utils/img/user_menu_more@2x.png' @click='go' />
                  </div>
                </div>
              </el-card>
            </div>
            <img class='m_img' :src='src' />
            <div class='px4' style="color: white" @mouseenter="enter()" @mouseleave="leave()">{{name}}</div>
            <img class='t_img' src='../utils/img/header_alarm@2x.png' @click='agency' /> <!--@click="dialogVisible = true" -->
            <button title='退出登录' @click='signOut' >
              <img className='m_img' style="vertical-align: inherit;margin-left: 10px;" src='../utils/img/header_logout@2x.png' />
            </button>
          </header>
          <!-- <el-dialog title="" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <div class="m_body" v-for="(item,index) in tabelData" :key="index">
              <div class='m_message'>
                <span>{{item.name}}</span>
                <span class="m_code">{{item.code}}</span>
                <span class="m_code">{{item.dept}}</span>
              </div>
              <div class="m_things">
                预警时间：{{item.time}}
              </div>
              <div class="m_things">
                预警原因：{{item.reason}}
              </div>
              <div class="m_unusual" v-for="(item1,index2) in item.list" :key="index2">
                <div class="m_message">
                  {{item1.name}}
                </div>
              </div>
              <div class="m_message renack">
                <div class="m_message">本人反馈</div>
                <div class="m_message m_center">
                  <div class="m_message m_time">
                    2020年2月22日 11:35:23
                  </div>
                  <div class="m_message m_content">小孩突然发高烧，事关紧急未及时汇报</div>
                </div>
              </div>
              <div class="m_message m_textarea">层级领导反馈</div>
              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
              </el-input>
              <div class="m_message m_textarea">职能部门反馈</div>
              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
              </el-input>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
          </el-dialog> -->
          <!-- 代办箱 -->
         <!-- <agencyBox ref="agencyBox" /> -->
        </div>
    </div>
    <div class="page_body">
      <div class="m_left"  :style="[{maxWidth:isCollapse?'50px':'190px'}]">
        <el-button type="primary" @click="switchClick" style="width:100%;">
          切换
        </el-button>
        <!-- router="true" -->
        <el-menu :default-active="activeMenu" :active="activeMenu"  class="el-menu-vertical-demo" :router="true"
          background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
          @open="handleOpen" @close="handleClose" @select="handleSelect" :collapse="isCollapse">
          <!-- 一级 -->
          <nav-menu :navMenus="routes"></nav-menu>
        </el-menu>
 
      </div>
      <div class="bodyContent" > <!-- :style="[{width:isCollapse?'calc(100% - 70px)':'calc(100% - 150px)'}]" -->
        <router-view/>
      </div>
    </div>
  </div>
</template>
<script>
import NavMenu from "@/components/NavMenu.vue";
import { myPhotoSrc } from '../utils/common.js'
import { mapActions } from 'vuex'
export default {
  name: 'MenuPage',
  provide () {
    return {
      MenuPage: this
    }
  },
  data() {
    return {
      isCollapse: false,
      flag:false,
      dialogVisible: false,
      textarea: '',
      src:'',
      name:'',
      organizationNames:'',
      tabelData: [
        {
          name: '张三',
          code: '001',
          dept: '机关纪委',
          time: '2019年12月20日 11:50:32',
          reason: '本人累计迟到3次及以上',
          list: [
            {
              name: '异常记录1：2019年12月21日 09:23:56 迟到 考勤方式 门禁'
            },
            {
              name: '异常记录1：2019年12月21日 09:23:56 迟到 考勤方式 门禁'
            },
            {
              name: '异常记录1：2019年12月21日 09:23:56 迟到 考勤方式 门禁'
            }
          ]
        }
      ],
      activeMenu: '',
    }
},
  components: { NavMenu },
  watch: {
  },
  computed: {
    // 获取当前路由的子路由
    routes(){
      var routes = {
        children: this.$router.options.routes
      };
      console.log(routes)
      var routesArr = routes.children[0].children
      // this.activeMenu = routes.routes[0].path
      return routesArr
    }
  },
  mounted() {
    // this.$root.eventHub.$on("changeParam", (n)=>{
    //     this.getTraffData()
    // });
    this.userInfo = JSON.parse(sessionStorage.userInfo)
    this.name = sessionStorage.realName
    this.organizationNames = sessionStorage.orgName
    this.src = myPhotoSrc(this.userInfo)
    this.init();
  },
  methods: {
    // agency(){
    //   this.$refs.agencyBox.open();
    // },
    agency(){
      this.$router.push('/agency')
    },
    init() {
      if(this.routes != null && this.routes != undefined){
        this.activeMenu = this.routes[0].path
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      this.activeMenu = key
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    switchClick(){
      this.isCollapse = !this.isCollapse
    },
    enter(){
      this.flag = true
    },
    leave(){
      this.flag = false
    },
    go() {
      this.$router.push({
        path: '/UserInfo'
      })
    },
    goTo(){
      this.$router.push({
        path: '/Salary'
      })
    },
    // agencyBox(){
    //   this.$refs.agencyBox.open();
    // },
    ...mapActions('user', [
            'logout'
        ]),
        // 退出登录
        signOut() {
            // 清除所有数据
            this.logout()
            this.$router.push('/login')
        },
    // handleClose(done) {
    //   this.$confirm('确认关闭？')
    //     .then(_ => {
    //       done();
    //     })
    //     .catch(_ => {});
    // }
  },
}

</script>
<style lang="stylus" scoped>
/*滚动条样式*/
::-webkit-scrollbar { width: 6px; height: 6px; background-color: #666;}
::-webkit-scrollbar-track { border-radius: 10px; background-color: #666;}
::-webkit-scrollbar-thumb { border-radius: 10px; background-color: #222;}
.page_body >>> .el-menu-item.is-active{
  background: #409EFF !important;
  color: #fff !important;
}
.m_left{
  float:left;
  height:100%;
  background:#545c64
  }
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-height: 400px;
  height:calc(100vh-100px);
  height: calc(100vh - 100px);
  overflow-y: auto;
}
.el-menu--collapse {
    width: 50px !important;
}
.h48{
  height: 2.428em!important;
}
.m_img{
  border-radius: 37px;
  margin-right: 10px;
  height: 35px;
}
.m_title{
  float: left;
  /* margin-top: 15px; */
}
.m_textarea{
  margin-left: 60px !important;
}
.m_body{
  height: 650px;
  border: 1px solid;
  margin: 10px;
  overflow: auto;
}

.text {
    font-size: 14px;
  }
.m_things{
  line-height: 24px;
  text-align: left;
  margin-left: 25px;
}
.m_message{
  text-align: left; 
  margin-left: 25px;
  line-height: 40px;
}
.m_code{
  margin-left: 10px;
}
.m_center{
  border: 1px solid;
  width: 90%;
  margin: 0 auto;
}
  .item {
    padding: 18px 0;
  }
  .el-avatar {
    width: 50px !important;
    height: 68px !important;
    /* line-height: 40px; */
    font-size: 14px;
}
  .box-card {
    width: 480px;
  }
  .h24 {
    height: 1.4em!important;
}

.w24 {
    width: 1.4em!important;
}
.mx4 {
    margin-left: 0.285em!important;
    margin-right: 0.285em!important;
}
.m_conf img{
  margin-right: 10px;
}
.flex-column {
    -webkit-flex-direction: column!important;
    flex-direction: column!important;
}
.flex {
    display: -webkit-flex!important;
    display: flex!important;
}
.flex-no-shrink {
    -webkit-flex-shrink: 0!important;
    flex-shrink: 0!important;
}
.flex-align-center {
    -webkit-align-items: center!important;
    align-items: center!important;
}
.border-box {
    box-sizing: border-box!important;
    background: url(../utils/img/header_bg@2x.png) no-repeat center / cover
}
.h-full {
    height: 100%!important;
}
.m_logal{
  margin-left: 30px;
}
img{
    max-width: 100%;
    vertical-align: top;
}
.t_img{
  height: 20px;

}
.m_info{
  position: absolute;
    margin-top: 38px;
    /* right: initial; */
    height: 180px;
    overflow: inherit;
    left: -159px;
    z-index: 99;
}
.MenuPage{
	width:100%;
	height:100%
}
.pageTop{
  width:100%;
  height:70px;
  background :#545c64;
  font-size: 20px;
  line-height: 100px;
  text-align: center;
}
.page_body{
  width:100%;
  height:calc(100% - 69px)
}
  .bodyContent{
    /* float:left; */
    background:#f2f5f7;
    height: 100%;
    overflow: auto;
    overflow: auto;
    overflow-x: hidden;
  }
</style>
