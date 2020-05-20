<template>
  <div class="Org_relationship">
    <div class="individual_title"></div>
    <div class="explain">
      <li class="explain_li" v-for="(item, index) of explainList" :key="index"
        :style="[{'color': item.color}]">
        <span style="margin-right:5px;">{{item.label}}</span>
        <span v-if="index > 0" style="font-weight:bold;">{{item.num}}</span>
      </li>
      <!-- <li class="explain_li" style="color:#FFAC42;"><span>关注</span></li>
      <li class="explain_li" style="color:#E85C43;"><span>预警</span></li> -->
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
import { warnInfoCountByType } from '@/api/warn.js'
export default {
  name: 'Org_relationship',//全局层级关系图
  data() {
    return {
      tree_data: {},
      explainList: [
        {label: '正常', color: '#A0C5A2', num: 0},
        {label: '关注', color: '#FFAC42', num: 0},
        {label: '预警', color: '#E85C43', num: 0},
      ],
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
      this.getWarmCount()
    },
    getWarmCount(){
      warnInfoCountByType().then((res) => {
        // console.log(res.data)
        let data = res.data
        let num1 = 0
        let num2 = 0
        for(let key in data){
          num1 += data[key]['关注']
          num2 += data[key]['预警']
        }
        // console.log(num1, num2)
        this.explainList[1].num = num1
        this.explainList[2].num = num2
      })
    },
    getData() {
      if (window.sessionStorage.tree_data) {
        this.collectData();
      } else {
        treeAndUser(
          Object.assign({
            currentId: '', // 当前区域id
          })
        ).then((res) => {
          let tree_data = res.data[0];
          console.log(res)
          tree_data.children = tree_data.childrens[0].userList;
          window.sessionStorage.tree_data = JSON.stringify(tree_data);
          this.collectData();
        });
      }
    },
    collectData(data) {
      let tree_data = JSON.parse(window.sessionStorage.tree_data);
      // console.log(tree_data)
      tree_data.userInfo = tree_data.userList[0];
      tree_data.level = 1;
      tree_data.expand = true;
      let returnObjcet=this.getDeptChidren(tree_data);
      this.tree_data = returnObjcet.data;
      this.dep_list =returnObjcet.arr2;
    },
    //处理第三层部门的数据
    getDeptChidren(data) {
      let arr1 = data.children; //第二层的人员
      let arr2 = data.childrens[0].childrens; //第三次的人员
      //对数据进行排序
      const userIds=data.childrens[0].userIds;
      arr1.sort((a,b)=>{
        var order=userIds.split(",");
        return order.indexOf(a.id)-order.indexOf(b.id)
      })
      arr1=arr1.filter(item=>userIds.includes(item.id));
      data.children=arr1;
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
      if(!window.sessionStorage.dep_list){
        window.sessionStorage.dep_list = JSON.stringify(arr2);
      }
      return {data,arr2}
    },
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
