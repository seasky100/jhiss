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
                            <span style="font-weight: 700;font-size: inherit">楼华安</span>
                            <el-avatar src="../utils/img/lha.png"></el-avatar>
                            
                            <span style="font-family: monospace;font-size: unset;font-weight: 600">机关纪委</span>
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
            <img class='m_img'  src='../utils/img/lha.png'/>              
              <div class='px4' style="color: white" @mouseenter="enter()" @mouseleave="leave()"> 超级管理员</div>   
            
            </header>           
          </div>
    </div>
    <div class="page_body">
      <div style="float:left;height:100%;background:#545c64">
        <el-button type="primary" @click="switchClick" style="width:100%;">
          切换
        </el-button>
        <!-- router="true" -->
        <el-menu :default-active="routes[0].path"  class="el-menu-vertical-demo" :router="true"
          background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
          @open="handleOpen" @close="handleClose" :collapse="isCollapse">
          <!-- 一级 -->
          <NavMenu :navMenus="routes"></NavMenu>
        </el-menu>
      </div>
      <div class="bodyContent" :style="[{width:isCollapse?'calc(100% - 70px)':'calc(100% - 205px)'}]">
        <router-view/>
      </div>
    </div>
  </div>
</template>
<script>
import NavMenu from "@/components/NavMenu.vue";
export default {
  name: 'MenuPage',
  data() {
    return {
      isCollapse: false,
      flag:false
    }
  },
  components: { NavMenu },
  watch: {},
  computed: {
    // 获取当前路由的子路由
    routes(){
      var routes = {
        children: this.$router.options.routes
      };
      console.log(routes)
      return routes.children[0].children
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    switchClick(){
      this.isCollapse = !this.isCollapse;
    },
    enter(){
      this.flag = true
    },
    leave(){
      this.flag = false
    },
    go() {
      debugger
      this.$router.push({
        path: '/UserInfo'
      })
    },
    goTo(){
      this.$router.push({
        path: '/salary'
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import './css/hover-min.css';
  @import './css/media.css';
  @import './css/pseudo_classes.css';
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
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
.text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }
  .el-avatar {
    width: 64px !important;
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
.m_info{
  position: absolute;
    margin-top: 38px;
    /* right: initial; */
    height: 180px;
    overflow: inherit;
    left: -159px;
}
.MenuPage
	width:100%
	height:100%
.pageTop
  width 100%
  height 76px
  background #545c64
  font-size 20px
  line-height 100px
  text-align center
.page_body
  width:100%
  height:calc(100% - 100px)
  .bodyContent
    float left
    height 100%
    background:#f2f5f7
    overflow auto
</style>
