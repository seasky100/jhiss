<template>
  <div class="MenuPage">
    <div class="pageTop">头部标题</div>
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
  min-height: 400px;
  height: calc(100vh - 50px);
  overflow-y: auto;
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
    overflow auto
</style>
