<template>
  <div class="Org_relationship">
    <div class="page-title">
      <img style="margin-right:8px;" src="@/utils/img/home_round_bar@2x.png" />
      <span>层级管理</span>
      <el-button class="titleBtn" size="mini" @click="returnClick">层级关系图</el-button>
    </div>
    <div class="individual_title"></div>
    <div class="dep_list" style="width:100%;text-align:center;">
      <div
        @mousedown="changeScroll('left')"
        @mouseup="stopScroll"
        style="display:inline-block;position: relative;bottom: 65px;cursor:pointer;"
      >
        <img style="width:30px;" src="@/assets/images/bg/dir_left.png" />
      </div>
      <div ref="dep_list" class="dep_Con">
        <div
          class="entrance"
          @click="handleClickDep(item)"
          :style="[
            { border: active == item.orgId ? '3px solid #bf1730' : 'none' },
          ]"
          v-for="(item, index) of entranceList"
          :key="index"
          ref="dep_box"
        >
          <img
            style="height:40px;margin:8px 0;"
            :src="require('../../../assets/images/bg/dep_bg.png')"
          />
          <div class="panel_info">
            <span style="display:block;">{{ item.name }}</span>

            <span style="font-weight:normal;color:#ccc;">{{item.userNames}}</span>
          </div>
        </div>
      </div>
      <div
        @mousedown="changeScroll('right')"
        @mouseup="stopScroll"
        style="display:inline-block;position: relative;bottom: 65px;cursor:pointer;"
      >
        <img style="width:30px;" src="@/assets/images/bg/dir_right.png" />
      </div>
    </div>
    <div class="post_status">
      <!-- <div style="margin-bottom:20px">
        排列方式：
        <input type="checkbox" v-model="horizontal" />水平排列
      </div> -->
      <span style="display:block;">岗位状态颜色说明：</span>
      <!-- <li style="color:#1ACE80;">正常</li>
      <li style="color:#DABC85;">关注</li>
      <li style="color:#AB2C31;">预警</li> -->
      <li :style="[{color:item.color}]" v-for="(item,index) of explainList" :key="index+'_explain'">
        <span style="margin-right:5px;">{{item.label}}</span>
        <span v-if="index > 0" style="font-weight:bold;">{{item.num}}</span>
      </li>
    </div>
    <div class="relationship">
      <org-tree
        :warnPersonList="warnPersonList"
        :expandedKeys="expandedKeys"
        :data="tree_data"
        :path_url="path_url"
        :collapsable="true"
        :horizontal="horizontal"
        :model="model"
      ></org-tree>
    </div>
  </div>
</template>
<script>
import { treeAndUser } from "@/api/report.js";
import { warnInfoCountByType, warnInfoTypeBydeptId } from '@/api/warn.js'
import { getUserListByUserId } from "@/api/user-server.js";
export default {
  name: "Departmental_level", //部门层级关系图
  data() {
    return {
      active: 0,
      entranceList: [],
      tree_data: {},
      warnPersonList: null,
      horizontal: false,
      // 人员关系跳转地址
      path_url: "Personnel_relation",
      model: "dep",
      timer: null,
      explainList: [
        {label: '正常', color: '#A0C5A2', num: 0},
        {label: '关注', color: '#FFAC42', num: 0},
        {label: '预警', color: '#E85C43', num: 0},
      ],
      expandedKeys: []
      //
    };
  },
  watch: {
    // active(newVal, oldVal){
    //   this.getWarmCount()
    // },
    // tree_data(newVal, oldVal){
    //   // console.log(newVal)
    //   if(newVal.orgId != oldVal.orgId){
    //     this.getWarnPerson(newVal)
    //   }
    // },
  },
  created(){
    let permissionFlag = false
    // permissionFlag = sessionStorage.userId.includes('39411b303f3346c69c7a7c507a6d0afd')
    // if(permissionFlag && this.$route.query.id == null){
    //   this.$router.push({ path: "/Org_relationship" });
    // }
    if(sessionStorage.leaderStr == null){
      this.getLeaderList()
    }else{
      permissionFlag = sessionStorage.leaderStr.includes(sessionStorage.userId)
      if(permissionFlag && this.$route.query.id == null){
        this.$router.push({ path: "/Org_relationship" });
      }
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    // 查询预警数量
    getWarmCount(){
      const param = {
        deptId: this.active
      }
      warnInfoCountByType(param).then((res) => {
        let data = res.data[0]
        let num1 = 0
        let num2 = 0
        for(let key in data){
          if(key == 'gzcount'){
            num1 = parseInt(num1) + parseInt(data[key])
          }
          if(key == 'yjcount'){
            num2 = parseInt(num2) + parseInt(data[key])
          }
        }
        this.explainList[1].num = num1
        this.explainList[2].num = num2
      })
    },
    // 局领导级别人员
    getLeaderList(){
      getUserListByUserId({
        userId: '39411b303f3346c69c7a7c507a6d0afd',
      }).then(res => {
        let leaderStr = res.data.map(item => {
          return item.id
        })
        leaderStr.unshift('39411b303f3346c69c7a7c507a6d0afd')
        leaderStr = leaderStr.join(',')
        window.sessionStorage.leaderStr = leaderStr
        let permissionFlag = sessionStorage.leaderStr.includes(sessionStorage.userId)
        if(permissionFlag && this.$route.query.id == null){
          this.$router.push({ path: "/Org_relationship" });
        }
      });
    },
    returnClick() {
      this.$router.push({ path: "/Org_relationship" });
    },
    init() {
      let query = this.$route.query;
      this.active = (query && query.id) || sessionStorage.depId;
      this.getWarmCount()
      if (window.sessionStorage.dep_list) {
        this.entranceList = JSON.parse(window.sessionStorage.dep_list);
        let n = 0;
        for (let i = 0; i < this.entranceList.length; i++) {
          let obj = this.entranceList[i];
          if (obj.id == this.active || obj.orgId == this.active) {
            n = i;
            this.getTreeData(obj);
            break;
          }
        }
        //判断有没有传id，
        if(!query||!query.id){
          for (let i = 0; i < this.entranceList.length; i++) {
            let obj = this.entranceList[i];
            let objStr=JSON.stringify(obj)
            if(objStr.includes(window.sessionStorage.userId)){
              n = i;
              this.getTreeData(obj);
              break;
             }
          }
        }
        this.$nextTick(() => {
          let scroll = this.$refs.dep_box[n].offsetLeft - 400;
          $(this.$refs.dep_list).animate({ scrollLeft: scroll }, 2000);
        });
      } else {
        this.getData();
      }

      // let width = this.$refs.dep_list.offsetWidth
    },
    //子节点
    getChildren(node, newchildren, t = 1) {
      let childrens = node.childrens || []; //当前岗位下的子节点
      let userList = node.userList; //当前岗位的用户节点
      //进行节点数据的过滤，只取存在的人员并进行顺序调整。
      const userIds=node.userIds;
      userList.sort((a,b)=>{
        var order=userIds.split(",");
        return order.indexOf(a.id)-order.indexOf(b.id)
      })
      userList=userList.filter(item=>userIds.includes(item.id));
      node.userList=userList;
      //把当前岗位的节点当作子节点
      for (var i = 0; i < userList.length; i++) {
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
            break;
          }
        }
      }
    },
    changeScroll(direction = "right") {
      let scroll = this.$refs.dep_list.scrollLeft;
      let width = this.$refs.dep_list.scrollWidth;
      let n = 0;
      if (direction == "left") {
        // $(this.$refs.dep_list).animate({scrollLeft: scroll - 300 },1000)
        this.timer = setInterval(() => {
          if (n > scroll) {
            clearInterval(this.timer);
          }
          $(this.$refs.dep_list).animate({ scrollLeft: scroll - n }, 0);
          n += 5;
        }, 0);
      } else {
        // $(this.$refs.dep_list).animate({scrollLeft: width },width - scroll)
        this.timer = setInterval(() => {
          if (n + scroll > width) {
            clearInterval(this.timer);
          }
          $(this.$refs.dep_list).animate({ scrollLeft: scroll + n }, 0);
          n += 5;
        }, 0);
      }
    },
    stopScroll() {
      clearInterval(this.timer);
      this.timer = null;
    },
    getTreeData(value) {
      // console.log(value)
      // this.active = value.id;
      let aleadIds =  value.aleadIds?value.aleadIds.split(','):[]
      let pleadIds =  value.pleadIds?value.pleadIds.split(','):[]
      // this.active = value.orgId;
      let tree_data = {
        children: [],
        realName: value.userList[0].realName,
        expand: true,
        level: 1,
        orgId: value.orgId,
        userPid: value.userPid,
        userPids: [value.userPid].concat(aleadIds, pleadIds),
        userInfo: value.userList[0].userInfo
      };
      this.getChildren(value, tree_data.children);
      let userList = tree_data.children
      tree_data.userList = userList
      tree_data.ids = userList.map(item => {
        return item.id
      })
      let childrenArr = []
      userList.forEach(element => {
        childrenArr = childrenArr.concat(element.children)
        element.level = 2;
        element.expand = false;
      });
      tree_data.children = childrenArr
      // this.tree_data = tree_data
      // console.log(tree_data)
      this.getWarnPerson(tree_data)
    },
    getWarnPerson(tree_data){
      const param = {
        deptId: tree_data.orgId
      }
      warnInfoTypeBydeptId(param).then((res) => {
        if(JSON.stringify == '{}'){
          this.warnPersonList
        }else{
          this.warnPersonList = res.data
        } 
        let nodesChildren = this.findPathByLeafId(sessionStorage.userId,[tree_data])
        this.expandedKeys = []
        if(nodesChildren != null){
          this.collectIds([nodesChildren])
        }
        this.tree_data = tree_data
        // console.log(this.expandedKeys)
      })
    },
    findPathByLeafId(leafId, nodes) {
      for(var i = 0; i < nodes.length; i++) {
        if(nodes[i].level == 1 && nodes[i].ids.includes(leafId)){
          return nodes[i]
        }else if(leafId == nodes[i].id) {
          return nodes[i];
        }else if(nodes[i].children) {
          var findResult = this.findPathByLeafId(leafId, nodes[i].children);
          if(findResult) {
            return findResult;
          }
        }
      }
    },
    collectIds(datas){ // 遍历树  获取id数组
      for(var i in datas){
        if(datas[i].level == 1){
          this.expandedKeys.push(sessionStorage.userId)
        }else{
          this.expandedKeys.push(datas[i].id)
        }
        if(datas[i].children){
          this.collectIds(datas[i].children);
        }
      }
    },
    handleClickDep(value) {
      // console.log(value)
      this.active = value.orgId;
      // this.$router.push({
      //   path: "/Departmental_level",
      //   query: { id: value.id }
      // });
      this.getWarmCount()
      this.getTreeData(value)
    },
    // 查询层级数据
    getData() {
      treeAndUser().then(res => {
        let tree_data = res.data[0];
        tree_data.children = tree_data.childrens[0].userList;
        tree_data.level = 1;
        tree_data.expand = true;
        window.sessionStorage.tree_data = JSON.stringify(tree_data);
        this.getDeptChidren(tree_data);
      });
    },
    unique(arr, key) {
      const map = new Map()
      // return arr.filter((item) => !map.has(item[key] + '') && map.set(item[key] + '', 1))
      return arr.filter((item) => {
        let flag = !map.has(item[key] + '') && map.set(item[key] + '', 1) && !(item.name.includes('直管') || item.name.includes('协管'))
        return flag
      })
    },
    //处理第三层部门的数据
    getDeptChidren(data) {
      data.userInfo = data.userList[0];
      let arr1 = data.children; //第二层的人员
      let arr2 = data.childrens[0].childrens; //第三次的人员
      arr2 = this.unique(arr2, 'orgId')
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
        let n = 0;
        let flag = false // 查找当前orgId，跳出循环
        let query = this.$route.query;
          //判断有没有传id，
        if(!query||!query.id){
          for (let i = 0; i < this.entranceList.length; i++) {
            let obj = this.entranceList[i];
            let objStr=JSON.stringify(obj)
            if(objStr.includes(window.sessionStorage.userId)){
              n = i;
              this.getTreeData(obj);
              flag = true
              break;
             }
          }
        }else{
          for (let i = 0; i < this.entranceList.length; i++) {
            let obj = this.entranceList[i];
            if (obj.id == this.active || obj.orgId == this.active) {
              n = i;
              this.getTreeData(obj);
              flag = true
              break;
            }
          }
        }
        this.$nextTick(() => {
          let scroll = this.$refs.dep_box[n].offsetLeft - 400;
          $(this.$refs.dep_list).animate({ scrollLeft: scroll }, 2000);
        });
        if(flag){
          break;
        }
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
/* 滚动条样式 */
::-webkit-scrollbar {
  width: 16px;
  height: 16px;
  background-color: #666;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #666;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #222;
}

.individual_title {
  height: 70px;
  background: url('../../../assets/images/bg/top_bg.png');
  background-size: 100% 100%;
}

.entrance {
  border-radius: 20px;
  background: #ffffff;
}

.entrance .panel_info {
  font-weight: bold;
  color: #95A5BA;
}

.dep_Con {
  display: inline-block;
  width: calc(100% - 80px);
  overflow: hidden;
  white-space: nowrap;
  border-radius: 40px;
}

.Org_relationship {
  height: 100%;
  width: 100%;
  font-size: 12px;
}

.page-title {
  background: #fff;
  padding: 10px 16px;

  span {
    font-size: 16px;
    color: #121518;
    font-weight: 700;
  }

  .titleBtn {
    position: absolute;
    right: 20px;
  }
}

.post_status {
  position: fixed;
  width: 200px;
  margin: 20px 40px;
  z-index: 3;

  span {
    display: inline-block;
  }

  li {
    width: 100%;
    float: left;
    margin-top: 5px;
    font-weight: bold;
  }
}

.dep_list_span {
  cursor: pointer;
  position: relative;
  bottom: 60px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.entrance {
  width: 120px;
  height: 100px;
  display: inline-block;
  text-align: center;
  margin: 10px 0.8%;
}

.relationship {
  margin: 0 0.8%;
  height: calc(100% - 265px);
  text-align: center;
  overflow: auto;
}
</style>
