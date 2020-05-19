<template>
  <div id="app" class="app" v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <router-view/>
        <!-- 封装的loading 组件 -->
    <loading v-if='LOADING'/> 
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
          const h = this.$createElement
          this.$notify({
            title: '',
            dangerouslyUseHTMLString: true,
            message: h('div', { class: 'message' }, [
              h('div', { class: 'title',style:"margin-top: -8px;" }, '温馨提示：'),
              h('div', { class: 'info',style:"color:red;margin-left: 51px; font-size:16px;"}, '您有新的预警信息！！！'),
              h('btnlist', { class: 'info', on: { click: this.onClick },style:"font-size: 13px;float: right;margin-top: 9px; cursor: pointer;"}, '处理')
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
    this.warnInfoUserStatistics()
    this.getLeaderList()
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
      this.$router.push('/agency')
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
    // 预警人员数据
    warnInfoUserStatistics(){
      warnInfoUserStatistics().then(res => {
        console.log('预警列表', res)
      });
    },
    // 查询层级数据
    getData() {
      this.loading = true
      // 层级数据
      treeAndUser().then(res => {
        let tree_data = res.data[0];
        tree_data.children = tree_data.childrens[0].userList;
        tree_data.level = 1;
        tree_data.expand = true;
        window.sessionStorage.tree_data = JSON.stringify(tree_data);
        this.getDeptChidren(tree_data);
        this.loading = false
      });
    },
    //处理第三层部门的数据
    getDeptChidren(data) {
      data.userInfo = data.userList[0];
      let arr1 = data.children; //第二层的人员
      let arr2 = data.childrens[0].childrens; //第三次的人员
      for (let i = 0; i < arr1.length; i++) {
        //遍历第二次人员
        let obj = arr1[i];
        obj.index = i;
        obj.level = 2;
        obj.expand = true;
        obj.name = data.childrens[0].name;
        obj.orgName = data.childrens[0].orgName;
        let children = [];
        for (let j = 0; j < arr2.length; j++) {
          //遍历第三次人员，如果相等则把部门名称加到第二层的children里面
          let obj2 = arr2[j];
          if (obj2.userPname.includes(obj.realName)) {
            children.push(obj2);
          }
        }
        let dep = { dep: children, level: 3 };
        // obj.children = children
        if (children.length > 0) {
          obj.children = [dep];
        }
        window.sessionStorage.dep_list = JSON.stringify(arr2);
        
        this.entranceList = arr2;
        for (let i = 0; i < this.entranceList.length; i++) {
          let obj = this.entranceList[i];
          if (obj.id == sessionStorage.orgId || obj.orgId == sessionStorage.orgId) {
            this.getTreeData(obj);
            break;
          }
        }
      }
    },
    getTreeData(value) {
      // this.active = value.id;
      let tree_data = {
        children: [],
        realName: value.userList[0].realName,
        expand: true,
        level: 1,
        userInfo: value.userList[0].userInfo
      };
      this.getChildren(value, tree_data.children);
      if (tree_data.children.length > 1) {
        tree_data.children[1].level = 2;
        tree_data.children[1].children.forEach(element => {
          element.level = 3;
          element.expand = false;
        });
        tree_data.children[0].children.push(tree_data.children[1]);
      }
      if(sessionStorage.userId != '5ba98b66cd3549b9b92ea8723e89207e'){
        let personInfo = this.findPathByLeafId(sessionStorage.userId, [tree_data.children[0]])
        // console.log(personInfo)
        window.sessionStorage.personInfo = JSON.stringify(personInfo)
      }
    },
    findPathByLeafId(id, nodes, path) {
      if(path === undefined) {
        path = [];
      }
      for(var i = 0; i < nodes.length; i++) {
          var tmpPath = path.concat();
          tmpPath.push(nodes[i]);
          if(id == nodes[i].id) {
            return nodes[i];
          }else if(nodes[i].children) {
            var resultData = this.findPathByLeafId(id, nodes[i].children, tmpPath);
            if(resultData) {
              return resultData;
            }
          }
      }
    },
    //子节点
    getChildren(node, newchildren, t = 1) {
      let childrens = node.childrens || []; //当前岗位下的子节点
      let userList = node.userList; //当前岗位的用户节点
      //把当前岗位的节点当作子节点
      for (var i = 0; i < userList.length; i++) {
        // userList[i].userPid = node.userPid;
        // userList[i].children = [];
        // userList[i].level = t;
        // userList[i].index = i;

        let child = {
          userPid: node.userPid,
          id: userList[i].id,
          children: [],
          level: t,
          index: i,
          expand: false,
          realName: userList[i].realName,
          userInfo: userList[i].userInfo
        };
        if (t < 3) {
          child.expand = true;
        }
        newchildren.push(child);
      }
      t++;
      for (var m = 0; m < childrens.length; m++) {
        for (var n = 0; n < newchildren.length; n++) {
          if (childrens[m].userPid == newchildren[n].id) {
            this.getChildren(childrens[m], newchildren[n].children, t);
          }
        }
      }
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
</style>
<style scoped>
.app{width:100%;height:100%;}
</style>