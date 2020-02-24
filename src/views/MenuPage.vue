<template>
  <div class="MenuPage">
    <div class="pageTop">头部标题</div>
    <div class="page_body">
      <div style="float:left;height:100%;background:#545c64">
        <el-button type="primary" @click="switchClick" style="width:100%;">
          切换
        </el-button>
        <el-menu :default-active="routes[0].path"  class="el-menu-vertical-demo" router="true"
          background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
          @open="handleOpen" @close="handleClose" :collapse="isCollapse">
          <el-menu-item :index="item.path" v-for="(item,index) of routes" :key="index">
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="bodyContent" :style="[{width:isCollapse?'calc(100% - 70px)':'calc(100% - 205px)'}]">
        <router-view/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MenuPage',
  data() {
    return {
      isCollapse: false,
      // menuList: [
      //   {title:'个人首页',path:1,icon:'el-icon-location'},
      //   {title:'市局门户',path:2,icon:'el-icon-menu'},
      //   {title:'协作提效',path:3,icon:'el-icon-document'},
      //   {title:'层级管理',path:4,icon:'el-icon-setting'},
      //   {title:'精细管理',path:5,icon:'el-icon-menu'},
      //   {title:'智慧监督',path:6,icon:'el-icon-menu'}
      // ]
      menuList:[]
    }
  },
  watch: {},
  computed: {
    // 获取当前路由的子路由
    routes(){
      var routes = {
        children: this.$router.options.routes
      };
      var route = this.$route.matched;
      for(var i=0; i<route.length-1; i++){
        routes = routes.children.find((e) => (e.name == route[i].name));
      }
      return routes.children
    }
  },
  mounted() {
    console.log(this.routes)
    // this.$root.eventHub.$on("changeParam", (n)=>{
    //     this.getTraffData()
    // });
    this.init();
  },
  methods: {
    init() {
      // this.$router.push({ path: '/PersonalHome' });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    switchClick(){
      this.isCollapse = !this.isCollapse;
    }
  }
}
</script>
<style lang="stylus" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.MenuPage
	width:100%
	height:100%
.pageTop
  width 100%
  height 100px
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
</style>
