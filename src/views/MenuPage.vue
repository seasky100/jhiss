<template>
  <div class="MenuPage">
    <div class="pageTop">
        <div class='app flex flex-column h-full'>
          <header  ref='header' class='flex flex-align-center flex-no-shrink border-box' style="height: 100%">
            <div class='m-left' style="width: 90%">
              <img src='../utils/img/header_logo2.png' class='h48 m_title m_logal' />
              <img src='../utils/img/header_title.png' class='h48 m_title' />
            </div>
            <!-- v-show='flag' -->
            <div class='m_right'@mouseenter="enter()" @mouseleave="leave()">
            <img class='p_img' :src='src' />
            <div class='px4' style="color: white" @mouseenter="enter()" @mouseleave="leave()">{{name}}</div>
            <!-- <img class='t_img' src='../utils/img/header_alarm@2x.png'/>  -->
            <div title='退出登录' @click='signOut' ></button>
              <img className='m_img' style="vertical-align: inherit;margin-left: 10px;" src='../utils/img/header_logout@2x.png' />
            </div>    
          </div>
          <!-- v-show='flag' -->
          <div v-show='flag' @mouseenter="enter()" @mouseleave="leave()">
              <el-card class="box-card m_info">
                <div class='m_rybj':style="{backgroundImage:'url('+bg2+')'}" >
                  <div class="m_perbg">
                    <el-avatar :src="src"></el-avatar> 
                    <span v-if='politicalStatus =="中共党员"'>
                        <img style=" position: absolute; bottom: 116px;right: 84px;height: 16px;" src='@/assets/images/dangyuan.png' class='' />    

                    </span>    
                  </div>
                  <!-- politicalStatus 党员    policeRank 警司-->
                  <div style="margin-bottom: 6px;"><span style="font-size: unset;font-weight: 600">{{name}}<span style="font-size: 12px; color: forestgreen;">({{policeRank}})</span></span></div>
                  <span style="font-size: 14px;font-weight: 400;color: #A6B1C2;">警号：{{policeCode}}</span>
                  <div style="margin-top: 5px;"><span style="font-size: 14px;color: #006eFF;font-weight: 400;margin-right: 7px;">{{organizationNames}}</span><img style="margin-top: 6px;width: 3px;height: 20px;" src='../utils/img/home_round_bar@2x.png' /> <span  style="font-size: 14px;color: #006eFF;font-weight: 400;">{{rank}}</span></div>
                </div>
                <div style="height: 47%; width: 100%"> <div style="height: 12%;width: 100%;"><span style="font-size: 13px;float: left;font-weight: 400;">个人中心</span></div>
                <!-- <div v-for="(item,index) of typeList"  :key="index">
                    <div class='m_quick'>
                        <span style="margin-left: 10px;"><img class='m_img' :src="item.url"/></span>
                        <div class='m_font'>{{item.name}}</div>
                    </div>
                  </div> -->
                    <div style="text-align: left; display:flex;">
                      <div class='m_quick'@click="goTo('/agency')" >
                          <span style="margin-left: 10px;"><img class='m_img' src='../utils/img/daiban.png'/></span>
                          <div class='m_font'>个人事项</div>
                      </div>
                      <div class='m_quick' @click="goTo('/Salary')">
                          <span style="margin-left: 10px;"><img class='m_img' src='../utils/img/gongzi.png'/></span>
                          <div class='m_font'>工资</div>
                      </div>
                      <div class='m_quick' @click="goTo('/passport')">
                          <span style="margin-left: 10px;"><img class='m_img' src='../utils/img/huzhao.png'/></span>
                          <div class='m_font'>护照</div>
                      </div>
                      <div class='m_quick' @click="goTo('/Salary')">
                          <span style="margin-left: 10px;"><img class='m_img' src='../utils/img/gangwei.png'/></span>
                          <div class='m_font'>岗位风险</div>
                      </div>
                      </div>
                      <div style="text-align: left; display:flex;">
                          <!-- <div class='m_quick' @click="goTo('/attendance-analysis')">
                              <span style="margin-left: 10px;"><img class='m_img' src='../utils/img/kaoqin.png'/></span>
                              <div class='m_font' @click="goTo('/Salary')">考勤</div>
                          </div> -->
                          <div class='m_quick'>
                              <span style="margin-left: 10px;"><img class='m_img' src='../utils/img/qingjia.png'/></span>
                              <div class='m_font'@click="goTo('/LeaveSituationAnalysis')">个人荣誉</div>
                          </div>
                          <div class='m_quick'>
                              <span style="margin-left: 10px;"><img class='m_img' src='../utils/img/qingjia.png'/></span>
                              <div class='m_font'@click="goTo('/LeaveSituationAnalysis')">请假</div>
                          </div>
                          <div class='m_quick'>
                              <span style="margin-left: 10px;"><img class='m_img' src='../utils/img/qingjia.png'/></span>
                              <div class='m_font'@click="goTo('/LeaveSituationAnalysis')">加班</div>
                          </div>
                      </div>
                </div>
              </el-card>
            </div>
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
      <div class="m_left">
          <nav-menu :navMenus="routes"></nav-menu>
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
  import Bg2 from '@/assets/images/rybj.png'
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
        bg2:Bg2,
        name:'',
        organizationNames:'',
        policeCode:'',
        policeRank:'',
        politicalStatus:'',
        rank:'',
        // typeList:[
        // 	{name:'代办',url:require('../utils/img/daiban.png'),path:'/Private_exit'},
        // 	{name:'工资',url:require('../utils/img/gongzi.png'),path:'/House_property'},
        // 	{name:'护照',url:require('../utils/img/huzhao.png'),path:'/Marital_status'},
        // 	{name:'岗位风险',url:require('../utils/img/gangwei.png'),path:'/Weddings'}
  
        // ],
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
      this.policeCode = this.userInfo.policeCode
      this.policeRank = this.userInfo.policeRank
      this.politicalStatus = this.userInfo.politicalStatus
      this.rank = this.userInfo.rank
      this.name = sessionStorage.realName
      this.organizationNames = sessionStorage.orgName
      this.src = myPhotoSrc(this.userInfo)
      this.init();
    },
    methods: {
      // agency(){
      //   this.$refs.agencyBox.open();
      // },
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
      goTo(path){
        this.$router.replace({
          path: path
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
     @import './css/common.css';
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
    height: 26px;
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
      width: 56px !important;
      height: 77px !important;
      /* line-height: 40px; */
      font-size: 14px;
  }
    .box-card {
      width: 231px;
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
  .p_img{
    height: 30px;
    border-radius: 37px;
    margin-right: 5px;
  }
  .m_info{
    position: absolute;
    margin-top: 34px;
    right: 10px;
    height: 347px;
    overflow: inherit;
    /* left: -119px; */
    z-index: 999;
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
    /* line-height: 100px; */
    text-align: center;
  }
  .page_body{
    width:100%;
    height:calc(100% - 69px)
  }
    .bodyContent{
      /* float:left; */
      background: #e2e8ec;
      height: 100%;
      overflow: auto;
      overflow: auto;
      overflow-x: hidden;
    }
    .m_ptitle:before {
      position: absolute;
      top: 51%;
      left: 48%;
      content: ' ';
      width: 4px;
      height: 5%;
      border-radius: 26px;
      background: #005bff;
  }
  .m_quick{
    width: 25%;
    text-align: -webkit-center;
    color: #8193A9;
    margin-top: 10px;
    cursor: pointer;
  }
  .m_font{
    font-size: 13px;
    margin-top: 10px;
  }
  .m_right{
    display: flex;
    margin-right: 10px;
  }
  .m_rybj{
    height: 53%;
    width: 100%;
    position: relative;
    background-size: 88%;
    background-repeat: no-repeat;
    background-position-y: -41px;
    background-position-x: 15px;
  }
  .m_perbg{
    line-height: 11px;
    margin-bottom: 8px;
  }
  </style>
  