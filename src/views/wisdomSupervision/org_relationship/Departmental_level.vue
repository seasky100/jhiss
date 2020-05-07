<template>
  <div class="Org_relationship">
    <div class="page-title">
      <img style="margin-right:8px;" src="@/utils/img/home_round_bar@2x.png" />
      <span>层级管理</span>
      <el-button class="titleBtn" size="mini" @click="returnClick">层级关系图</el-button>
    </div>
    <div class="individual_title"></div>
    <div class="dep_list" style="width:100%;text-align:center;">
      <div @mousedown="changeScroll('left')" @mouseup="stopScroll" style="display:inline-block;position: relative;bottom: 65px;cursor:pointer;">
        <img style="width:30px;" src="@/assets/images/bg/dir_left.png" />
      </div>
      <div ref="dep_list" class="dep_Con">
        <div class="entrance" @click="handleClickDep(item)" :style="[
            { border: active == item.id ? '3px solid #bf1730' : 'none' },
          ]" v-for="(item, index) of entranceList" :key="index" ref="dep_box">
          <img style="height:40px;margin:8px 0;" :src="require('../../../assets/images/bg/dep_bg.png')" />
          <div class="panel_info">
            <span style="display:block;">{{ item.name }}</span>
         
            <span style="font-weight:normal;color:#ccc;">{{item.userNames}}</span>
          </div>
        </div>
      </div>
      <div @mousedown="changeScroll('right')" @mouseup="stopScroll" style="display:inline-block;position: relative;bottom: 65px;cursor:pointer;">
        <img style="width:30px;" src="@/assets/images/bg/dir_right.png" />
      </div>
    </div>
    <div class="post_status">
      <div style='margin-bottom:20px'>
        排列方式：
        <input type="checkbox" v-model="horizontal">水平排列
      </div>
      <span>岗位状态颜色说明：</span>
      <li style="color:#1ACE80;">正常</li>
      <li style="color:#DABC85;">关注</li>
      <li style="color:#AB2C31;">预警</li>

    </div>
    <div class="relationship">
      <org-tree :data="tree_data" :path_url="path_url" :collapsable="true" :horizontal="horizontal" :model="model">
      </org-tree>
    </div>
  </div>
</template>
<script>
import { treeAndUser } from '@/api/report.js';
export default {
  name: 'Departmental_level', //部门层级关系图
  data() {
    return {
      active: 0,
      entranceList: [],
      tree_data: {},
      horizontal: false,
      // 人员关系跳转地址
      path_url: 'Personnel_relation',
      model: 'dep',
      timer: null
      //
    };
  },
  mounted() {
    this.init();
    // this.getData();
  },
  methods: {
    returnClick() {
      this.$router.push({ path: '/Org_relationship' });
    },
    init() {
      let query = this.$route.query;
      this.active = (query && query.id) || sessionStorage.orgId;
      this.entranceList = JSON.parse(window.localStorage.dep_list);
      let n = 0;
      for (let i = 0; i < this.entranceList.length; i++) {
        let obj = this.entranceList[i];
        if (obj.id == this.active || obj.orgId == this.active) {
          n = i;
          this.getTreeData(obj);
          break;
        }
      }
      // let width = this.$refs.dep_list.offsetWidth
      this.$nextTick(() => {
        let scroll = this.$refs.dep_box[n].offsetLeft - 400;
        $(this.$refs.dep_list).animate({ scrollLeft: scroll }, 2000);
      });
    },
    getChildren(node, newchildren, t = 2) {
      let childrens = node.childrens || []; //当前岗位下的子节点
      let userList = node.userList; //当前岗位的用户节点
      //把当前岗位的节点当作子节点
      for (var i = 0; i < userList.length; i++) {
        // userList[i].userPid = node.userPid;
        // userList[i].children = [];
        // userList[i].level = t;
        // userList[i].index = i;
        const child = {
          userPid: node.userPid,
          id: userList[i].id,
          children: [],
          level: t,
          index: i,
          realName: userList[i].realName,
          userInfo: userList[i].userInfo
        };
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
    changeScroll(direction = 'right') {
      let scroll = this.$refs.dep_list.scrollLeft;
      let width = this.$refs.dep_list.scrollWidth;
      let n = 0;
      if (direction == 'left') {
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
      console.log(value)
      this.active = value.id;
      let tree_data = {
        children: [],
        realName: value.userPname,
        expand:true,
        level: 1,
        userInfo: {}
      };
      this.getChildren(value, tree_data.children);
      this.tree_data = tree_data;
    },
    handleClickDep(value) {
      this.$router.push({
        path: '/Departmental_level',
        query: { id: value.id }
      });
      this.getTreeData(value);
    },
    //
    getData() {
      if (window.localStorage.tree_data) {
        this.getDeptChidren();
        // this.dep_list = JSON.parse(window.localStorage.dep_list)
      } else {
        treeAndUser(
          Object.assign({
            currentId: '' // 当前区域id
          })
        ).then(res => {
          let tree_data = res.data[0];
          tree_data.children = tree_data.childrens[0].userList;
          tree_data.level = 1;
          tree_data.expand = true;
          window.localStorage.tree_data = JSON.stringify(tree_data);
          this.getDeptChidren();
        });
      }
    },
    //处理第三层部门的数据
    getDeptChidren() {
      let data = JSON.parse(window.localStorage.tree_data);
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
      }
      if (!window.localStorage.dep_list) {
        window.localStorage.dep_list = JSON.stringify(arr2);
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
    display: block;
  }

  li {
    width: 50px;
    float: left;
    margin-top: 5px;
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
