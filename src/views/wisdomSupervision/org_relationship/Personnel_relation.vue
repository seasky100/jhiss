<template>
  <div class="person_home">
    <div class="police_career">
    </div>
    <!-- 风险提醒 -->
    <div class="police_career" style="height:calc(100% - 140px);background:none;">
			<!-- 个人信息 -->
      <div class="fengxian" style="width:520px;">
        <div class="person_title">头部图片</div>
        <div class="con photoImg" style="height:250px;background:#ccc;">
          
        </div>
        <div class="con labelCon">
          <span class="top_title">标签</span>
          <span class="label_body" v-for="(item,index) of labelList" :key="index">
            {{item.label}}
          </span>
        </div>
        <div class="con projectCon" style="height:90px;">
          <span class="top_title">项目</span>
          <li class="project_li" v-for="(item,index) of projectList" :key="index">
            <span>{{item.name}}</span>
          </li>
        </div>
        <div class="con orgTreeCon" style="height:200px;margin-bottom:0;">
          <org-tree :data="tree_data" :collapsable="false" :expandAll="true"></org-tree>
        </div>
      </div>
			<!-- 领导属下信息 -->
      <div class="fengxian" style="width:calc(99% - 520px);margin-left:0.7%;">
        <div class="person_title">
          <div class="submenu" @click="subMenuClick(index)"
            :style="[{'border-bottom':active==index?'4px solid #AB2C31':'none'}]"
            v-for="(item,index) of submenuList" :key="index">
            {{item.name}}
          </div>
        </div>
        <div class="relationBody">
          <org-relation></org-relation>
        </div>
      </div>      
    </div>
  </div>
</template>
<script>
import treeData from './treeData.js';
export default {
  name: "Personnel_relation",
  data() {
    return {
      active: 0,
      labelList: [
        {label: '党员'},
        {label: '岗位状态'},
        {label: '岗位状态'}
      ],
      projectList: [
        {name: '工作日志'},
        {name: '岗位预警'},
        {name: '谈话谈心'},
        {name: '责任清单'}
      ],
      submenuList: [
        {name:'我的直属领导', path:''},
        {name:'我的下属同事', path:''}
      ],
      tree_data: null
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getData()
    },
    getData(){
      const _this = this
      _this.tree_data = treeData.treeData2
    },
    subMenuClick(index){
      this.active = index
    }
  }
}
</script>
<style lang="stylus" scoped>
.person_home{
  margin: 1%;
	width 98%;
	height:98%;
}
.police_career{
  height: 120px;
  background:#fff;
  margin-bottom 15px;
}
.fengxian{
  float:left;
  background #fff;
  height:100%;
}
.person_title{
  height:45px;
  margin: 10px;
  margin-bottom 0;
  font-size:16px;
  font-weight:bold;
  line-height:45px;
  border-bottom: 1px solid #ccc;
  padding-left: 5px
}
.con
  margin 0px 25px
  margin-bottom 25px
  font-size 14px
  .top_title 
    display block
    margin-bottom 10px
  .label_body
    padding: 5px 10px
    background #ccc
    border-radius 15px
    maegin: 5px
    margin-right 10px
  .project_li
    width 50%
    float left
    color #AB2C31
    font-size 16px
    span 
      font-size 14px
      color #333
.submenu
  float left 
  height 40px
  line-height 40px
  text-align center
  width 130px
  margin-right 20px
.relationBody
  height calc(100% - 60px)
  margin 10px
</style>
