<template>
  <div>
    <template v-for="(item,index) in navMenus">
      <!-- 含有子菜单 -->
      <el-submenu v-if="item.children && item.children.length>0" :key="index" :index="index+''">
        <template slot="title">
          <i :class="item.icon"></i>
          <!-- <img :src="item.info.picUrl" alt=""> -->
          <span slot="title">{{item.title}}</span>
        </template>
        <NavMenu :navMenus="item.children"></NavMenu>
      </el-submenu>
      <!-- 最后一级 -->
      <el-menu-item v-show="!item.hidden" v-else :key="index" :index="item.path">
        <i :class="item.icon"></i>
        <span slot="title">{{item.title}}</span>
      </el-menu-item>
    </template>
  </div>
</template>
<script>
export default {
  name:'NavMenu',
  props:{
    navMenus:{}
  },
  mounted(){
  }
}
</script>
<style lang="stylus" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  height:calc(100vh-100px);
  height: calc(100vh - 100px);
  overflow-y: auto;
}
</style>