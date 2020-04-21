<template>
  <div class="Org_relationship">
    <div class="individual_title"></div>
    <div class="explain">
      <li class="explain_li" style="color:#A0C5A2;"><span>正常</span></li>
      <li class="explain_li" style="color:#FFAC42;"><span>注意</span></li>
      <li class="explain_li" style="color:#E85C43;"><span>危险</span></li>
    </div>
    <div class="relationship">
      <org-tree
        :data="tree_data"
        :path_url="path_url"
        :dep_list="dep_list"
      ></org-tree>
    </div>
  </div>
</template>
<script>
import { treeAndUser } from '@/api/report.js';
import { getUserInfo } from '@/api/user-server.js';
export default {
  name: 'Org_relationship',
  data() {
    return {
      tree_data: {},
      // 部门跳转地址
      path_url: 'Departmental_level',
      dep_list: [],
      //
    };
  },
  watch: {},
  created() {
    this.init();
  },
  mounted() {
    // this.getData()
  },
  methods: {
    init() {
      this.getData();
    },
    getData() {
      if (window.localStorage.tree_data) {
        this.collectData();
        // console.log(this.tree_data)
        // this.dep_list = JSON.parse(window.localStorage.dep_list)
      } else {
        treeAndUser(
          Object.assign({
            currentId: '', // 当前区域id
          })
        ).then((res) => {
          let tree_data = res.data[0];
          tree_data.children = tree_data.childrens[0].userList;
          tree_data.level = 1;
          tree_data.expand = true;
          window.localStorage.tree_data = JSON.stringify(tree_data);
          this.collectData();
        });
      }
    },
    collectData(data) {
      // this.tree_data = JSON.parse(window.localStorage.tree_data);
      let tree_data = JSON.parse(window.localStorage.tree_data);
      tree_data.userInfo = tree_data.userList[0];
      this.getDeptChidren(tree_data);
    },
    //处理第三次部门的数据
    getDeptChidren(data) {
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
      this.tree_data = data;
      this.dep_list = arr2;
      window.localStorage.dep_list = JSON.stringify(arr2);
    },
    // 转化获取列属性对象
    flatten(arr) {
      return [].concat(
        ...arr.map((x) =>
          Array.isArray(x.childrens) ? this.flatten(x.childrens) : x.userList
        )
      );
    },
    data_collation(data) {
      const _this = this;
      let arr1 = [...data.childrens];
      let arr2 = [...data.children_dep];
      let child = [];
      for (let i = 0; i < arr1.length; i++) {
        let obj = arr1[i];
        let arr3 = _this.flatten(JSON.parse(JSON.stringify(arr2)));
        // console.log(arr3)
        obj.index = i;
        obj.level = 2;
        obj.expand = true;
        let children = [];
        for (let j = 0; j < arr2.length; j++) {
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
        child.push(obj);
      }
      data.children = child;
      // console.log(data)
      data.level = 1;
      data.expand = true;
      data.children_dep = null;
      _this.getPostUserInfo(data);
      _this.dep_list = arr2;
      window.localStorage.dep_list = JSON.stringify(arr2);
    },
    getPostUserInfo(data) {
      const _this = this;
      const params = {
        userId: data.userPid,
      };
      getUserInfo(params)
        .then((res) => {
          if (res.success == true) {
            let userInfo = res.data.userInfo;
            data.userInfo = userInfo;
            _this.tree_data = data;
            window.localStorage.tree_data = JSON.stringify(data);
          } else {
            console.log(res.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //
  },
};
</script>
<style lang="stylus" scoped>
/* 滚动条样式 */
::-webkit-scrollbar {
  background-color: #ccc;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #ccc;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #555;
}
::-webkit-scrollbar-thumb:hover {
  border-radius: 10px;
  background-color: #000;
}

.individual_title {
  height: 70px;
  background: url('../../../assets/images/bg/top_bg.png');
  background-size: 100% 100%;
}

.relationship {
  width: 99.8%;
  height: calc(100% - 75px);
  text-align: center;
  overflow: auto;
}

.explain {
  position: absolute;
  margin-left: 30px;
  margin-top: 13px;

  .explain_li {
    width: 100%;
    float: left;
    color: #AB2C31;
    font-size: 23px;
    line-height: 20px;

    span {
      font-size: 13px;
      color: #7A7A7A;
      position: relative;
      left: -10px;
      top: -3px;
    }
  }
}

.Org_relationship {
  height: 100%;

  width 100% {
    font-size: 12px;
  }
}

.individual_title {
  height: 70px;
}

.entrance {
  width: 15%;
  height: 35px;
  line-height: 35px;
  display: inline-block;
  text-align: center;
  background: #fff;
  margin: 10px 0.8%;
}
</style>
