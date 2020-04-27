<template>
  <div>
    <!-- <template v-for="(item,index) in navMenus"> -->
    <!-- 含有子菜单 -->
    <!-- <el-submenu v-if="item.children && item.children.length>0" :key="index" :index="index+''"> -->
    <!-- <template slot="title"> -->
    <!-- <i :class="item.icon"></i> -->
    <!-- <img v-if="item.img != undefined" style="margin-right:5px;width:18px;" :src="require(`@/assets/images/menu/${item.img}`)" /> -->
    <!-- <span slot="title">{{item.title}}</span> -->
    <!-- </template> -->
    <!-- <nav-menu :navMenus="item.children"></nav-menu> -->
    <!-- </el-submenu> -->
    <!-- 最后一级 -->
    <!-- <el-menu-item v-show="!item.hidden" v-else :key="index" :index="item.path"> -->
    <!-- <el-menu-item v-if="item.children == null && (!item.hidden)" :key="index" :index="item.path"> -->
    <!-- <i :class="item.icon"></i> -->
    <!-- <img v-if="item.img != undefined" style="margin-right:5px;width:18px;" :src="require(`@/assets/images/menu/${item.img}`)" /> -->
    <!-- <span slot="title">{{item.title}}</span> -->
    <!-- </el-menu-item> -->
    <!-- </template> -->
    <div class='menu_switch_div'>
      <img :src='isCollapse?collapseImg:openImg' @click="switchClick">
      <span v-show="!isCollapse"> 导航切换</span>
    </div>
    <!-- #545c64 -->
    <el-menu :default-active="activeMenu" :active="activeMenu" class="el-menu-vertical-demo" :router="true" background-color="#0A0B1C" text-color="#fff" active-text-color="#ffd04b" @open="handleOpen" @close="handleClose" @select="handleSelect" :collapse="isCollapse">
      <!-- 第一层 -->
      <template v-for="(item,index) in navMenus">
        <el-submenu v-if="item.children && item.children.length>0 && (!item.hidden)" :key="index" :index="index+''">
          <template slot="title">
            <img v-if="item.img != undefined" style="margin-right:5px;width:18px;" :src="require(`@/assets/images/menu/${item.img}`)" />
            <span slot="title">{{item.title}}</span>
          </template>
          <!-- 第一次子循环 -->
          <template v-for="(firstitem,firstindex) in item.children">
            <el-submenu v-if="firstitem.children && firstitem.children.length>0" :key="firstindex+'f'" :index="firstindex+'f'">
              <template slot="title">
                <img v-if="firstitem.img != undefined" style="margin-right:5px;width:18px;" :src="require(`@/assets/images/menu/${firstitem.img}`)" />
                <span slot="title">{{firstitem.title}}</span>
              </template>
              <!-- 第二次子循环 -->
              <template v-for="(seconditem,secondindex) in firstitem.children">
                <el-submenu v-if="seconditem.children && seconditem.children.length>0" :key="secondindex+'s'" :index="secondindex+'s'">
                  <template slot="title">
                    <img v-if="seconditem.img != undefined" style="margin-right:5px;width:18px;" :src="require(`@/assets/images/menu/${seconditem.img}`)" />
                    <span slot="title">{{seconditem.title}}</span>
                  </template>
                  <!-- 第三次子循环 -->
                  <template v-for="(thirdItem,thirdIndex) in seconditem.children">
                    <el-submenu v-if="thirdItem.children && thirdItem.children.length>0" :key="thirdIndex+'t'" :index="thirdIndex+'t'">
                      <template slot="title">
                        <img v-if="thirdItem.img != undefined" style="margin-right:5px;width:18px;" :src="require(`@/assets/images/menu/${seconditem.img}`)" />
                        <span slot="title">{{thirdItem.title}}</span>
                      </template>
                    </el-submenu>
                    <el-menu-item v-if="thirdItem.children == null && (!thirdItem.hidden)" :key="thirdIndex+'t'" :index="thirdItem.path">
                      <img v-if="thirdItem.img != undefined" style="margin-right:5px;width:18px;" :src="require(`@/assets/images/menu/${seconditem.img}`)" />
                      <span slot="title">{{thirdItem.title}}</span>
                    </el-menu-item>
                  </template>
                </el-submenu>
                <el-menu-item v-if="seconditem.children == null && (!seconditem.hidden)" :key="secondindex+'s'" :index="seconditem.path">
                  <img v-if="seconditem.img != undefined" style="margin-right:5px;width:18px;" :src="require(`@/assets/images/menu/${seconditem.img}`)" />
                  <span slot="title">{{seconditem.title}}</span>
                </el-menu-item>
              </template>
            </el-submenu>

            <el-menu-item v-if="firstitem.children == null && (!firstitem.hidden)" :key="firstindex+'f'" :index="firstitem.path">
              <img v-if="firstitem.img != undefined" style="margin-right:5px;width:18px;" :src="require(`@/assets/images/menu/${firstitem.img}`)" />
              <span slot="title">{{firstitem.title}}</span>
            </el-menu-item>
          </template>

        </el-submenu>
        <!-- 第一层没有子节点 -->
        <el-menu-item v-if="item.children == null && (!item.hidden)" :key="index" :index="item.path">
          <img v-if="item.img != undefined" style="margin-right:5px;width:18px;" :src="require(`@/assets/images/menu/${item.img}`)" />
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: 'NavMenu',
  props: {
    navMenus: {}
  },
  data() {
    return {
      imgPath: 'left_menu_sub_hierarchy.png',
      activeMenu: '',
      isCollapse: false,
      routes: [],
      collapseImg: require('../assets/images/menu/menu_off.png'),
      openImg: require('../assets/images/menu/menu_on.png')
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (this.routes != null && this.routes != undefined) {
        this.activeMenu = this.$route.path;
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    switchClick() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>
<style lang="stylus" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-height: 400px;
  height: calc(100vh - 120px);
  overflow-y: auto;
}

.el-menu--collapse {
  width: 70px !important;
  min-height: calc(100vh - 120px);
}

.menu_switch_div {
  background: #0d122f;
  color: #fff;
  padding: 15px 20px;
  line-height: 20px;
}
</style>