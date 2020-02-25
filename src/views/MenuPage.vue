<template>
  <div class="MenuPage">
    <div class="pageTop">头部标题</div>
    <div class="page_body">
      <div style="float:left;height:100%;background:#545c64">
        <el-button type="primary" @click="switchClick" style="width:100%;">
          切换
        </el-button>
        <!-- router="true" -->
        <el-menu :default-active="routes[0].path"  class="el-menu-vertical-demo" router="true"
          background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
          @open="handleOpen" @close="handleClose" :collapse="isCollapse">
          <!-- 一级 -->
          <template v-for="(item,index) of routes">
            <el-submenu :index="item.path" :key="index" v-if="item.children != null">
              <template slot="title">
                <i :class="item.icon"></i>
                <span slot="title">{{item.title}}</span>
              </template>
              <!-- 二级 -->
              <template v-for="(item2,index2) of item.children">
                <el-submenu :index="item2.path" :key="index2" v-if="item2.children != null">
                  <template slot="title">
                    <i :class="item2.icon"></i>
                    <span slot="title">{{item2.title}}</span>
                  </template>
                  <!-- 三级 -->
                  <template v-for="(item3,index3) of item2.children">
                    <el-submenu :index="item3.path" :key="index3" v-if="item3.children != null">
                      <template slot="title">
                        <i :class="item3.icon"></i>
                        <span slot="title">{{item3.title}}</span>
                      </template>
                      <!-- 四级 -->
                      <template v-for="(item4,index4) of item3.children">
                        <el-submenu :index="item4.path" :key="index4" v-if="item4.children != null">
                          <template slot="title">
                            <i :class="item4.icon"></i>
                            <span slot="title">{{item4.title}}</span>
                          </template>
                        </el-submenu>
                        <el-menu-item :index="item4.path" :key="index4" v-else>
                          <i :class="item4.icon"></i>
                          <span slot="title">{{item4.title}}</span>
                        </el-menu-item>
                      </template>
                      <!-- 四级结束 -->
                    </el-submenu>
                    <el-menu-item :index="item3.path" :key="index3" v-else>
                      <i :class="item3.icon"></i>
                      <span slot="title">{{item3.title}}</span>
                    </el-menu-item>
                  </template>
                  <!-- 三级结束 -->
                </el-submenu>
                <el-menu-item :index="item2.path" :key="index2" v-else>
                  <i :class="item2.icon"></i>
                  <span slot="title">{{item2.title}}</span>
                </el-menu-item>
              </template>
              <!-- <el-submenu index="1-4">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span slot="title">选项4</span>
                </template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu> -->
            </el-submenu>
            <!-- 1111111 -->
            <el-menu-item :index="item.path" :key="index" v-else>
              <i :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </el-menu-item>
          </template>
          
          <!-- 1111111111 -->
          <!-- <el-menu-item :index="item.path" v-for="(item,index) of routes" :key="index">
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item> -->
          <!-- 33333333333 -->
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
      menuList2: [
        {index: '1',title:'导航一', path: 1, icon: 'el-icon-location',children:[{
          index: '1-1',title:'二级', path: 1, icon: 'el-icon-location',children:[{
            index: '1-1-1',title:'三级', path: 1, icon: 'el-icon-location'
          }]
        },
          {index: '1-2',title:'二级2', path: 1, icon: 'el-icon-location'}
        ]},
        {index: '2',title:'导航二', path: 1, icon: 'el-icon-location'},
      ],
      // menuList: [
      //   {title:'个人首页',path:1,icon:'el-icon-location'},
      //   {title:'市局门户',path:2,icon:'el-icon-menu'},
      //   {title:'协作提效',path:3,icon:'el-icon-document'},
      //   {title:'层级管理',path:4,icon:'el-icon-setting'},
      //   {title:'精细管理',path:5,icon:'el-icon-menu'},
      //   {title:'智慧监督',path:6,icon:'el-icon-menu'}
      // ]
    }
  },
  watch: {},
  computed: {
    // 获取当前路由的子路由
    routes(){
      var routes = {
        // children: this.$router.options.routes
        children: this.$router.options.routesMenu
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
    overflow auto
</style>
