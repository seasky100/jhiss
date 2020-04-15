<template>
  <div class="Org_relationship">
    <div class="individual_title"></div>
    <div class="explain">
      <li class="explain_li" style="color:#A0C5A2;"><span>正常</span></li>
      <li class="explain_li" style="color:#FFAC42;"><span>注意</span></li>
      <li class="explain_li" style="color:#E85C43;"><span>危险</span></li>
    </div>
		<div class="relationship">
			<org-tree :data="tree_data" :path_url="path_url" :dep_list="dep_list"></org-tree>
		</div>
  </div>
</template>
<script>
import { treeAndUser } from '@/api/report.js';
export default {
	name: "Org_relationship",
  data() {
    return {
      tree_data: null,
      // 部门跳转地址
      path_url: 'Departmental_level',
      dep_list: []
			// 
    }
  },
  watch: {},
  mounted() {
    this.init()
    // this.getData()
  },
  methods: {
    init() {
      if(!window.localStorage.tree_data){
        this.getData()
      }else{
        this.tree_data = JSON.parse(window.localStorage.tree_data)
        // console.log(this.tree_data)
        this.dep_list = JSON.parse(window.localStorage.dep_list)
      }
    },
    getData(){
      const _this = this
      treeAndUser(
        Object.assign(
          {
            currentId: '' // 当前区域id
          }
        )
      ).then(res => {
        // console.log(res)
        let data = res.data[0]
        let tree_data = JSON.stringify(data)
        let reg=new RegExp('childrens','g')
        tree_data=tree_data.replace(reg,'children')
        tree_data = JSON.parse(tree_data)
        tree_data.children[0].name = tree_data.name
        tree_data = tree_data.children[0]
        tree_data.children_dep = tree_data.children
        tree_data.children = tree_data.userList
        // console.log(tree_data)
        // _this.tree_data = tree_data
        _this.data_collation(tree_data)
      })
    },
    // 转化获取列属性对象
    flatten(arr) { 
      return [].concat( ...arr.map(x => Array.isArray(x.children) ? this.flatten(x.children) : x.userList) ) 
    },
    data_collation(data){
      const _this = this
      let arr1 = [...data.children]
      let arr2 = [...data.children_dep]
      let child = []
      for(let i=0;i<arr1.length;i++) {
        let obj = arr1[i]
        let arr3 = _this.flatten(JSON.parse(JSON.stringify(arr2)))
        // console.log(arr3)
        obj.index = i
        obj.level = 2
        obj.expand = true
        let children = []
        for(let j=0;j<arr2.length;j++){
          let obj2 = arr2[j]
          if(obj2.userPname.includes(obj.realName)){
            children.push(obj2)
          }
        }
        let dep = {dep: children,level: 3}
        // obj.children = children
        if(children.length > 0){
          obj.children = [dep]
        }
        child.push(obj)
      }
      data.children = child
      // console.log(data)
      data.level = 1
      data.expand = true
      data.children_dep = null
      _this.tree_data = data
      window.localStorage.tree_data = JSON.stringify(data)
      _this.dep_list = arr2
      window.localStorage.dep_list = JSON.stringify(arr2)
    }
		// 
  }
}
</script>
<style lang="stylus" scoped>
/*滚动条样式*/
::-webkit-scrollbar { width: 6px; height: 6px; background-color: #666;}
::-webkit-scrollbar-track { border-radius: 10px; background-color: #666;}
::-webkit-scrollbar-thumb { border-radius: 10px; background-color: #222;}
.individual_title{
  height:70px;
  background: url('../../../assets/images/bg/top_bg.png');
  background-size: 100% 100%;
}
.relationship{
  width: 100%;
	height: calc(100% - 70px);
  text-align: center;
  overflow: auto;
}
.explain
  position absolute
  margin-left 30px
  margin-top 13px
  .explain_li
      width 100%
      float left
      color #AB2C31
      font-size 23px
      line-height 20px
      span 
        font-size 13px
        color #7A7A7A
        position relative
        left -10px
        top -3px
.Org_relationship
	height 100%
	width 100%
  font-size 12px
.individual_title
	height:70px;
.entrance
	width 15%
	height 35px
	line-height 35px
	display inline-block
	text-align center
	background #fff
	margin 10px 0.8%
</style>
