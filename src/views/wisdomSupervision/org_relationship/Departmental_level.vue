<template>
  <div class="Org_relationship">
    <div class="individual_title"></div>
    <div class="dep_list" style="width:100%;text-align:center;">
      <div @click="changeScroll('left')" style="display:inline-block;position: relative;bottom: 65px;">《《</div>
      <div ref="dep_list" class="dep_Con">
        <div class="entrance" @click="handleClickDep(item)"
          :style="[{border:active==item.id?'3px solid #bf1730':'none'}]" 
          v-for="(item,index) of entranceList" :key="index">
          <div class="panel_info">
            <span style="display:block;">{{item.name}}</span>
            <span style="font-weight:normal;color:#ccc;">{{item.userPname}}</span>
          </div>
        </div>
      </div>
      <div @click="changeScroll('right')" style="display:inline-block;position: relative;bottom: 65px;">》》</div>
    </div>
    <div class="post_status">
      <span>岗位状态颜色说明：</span>
      <li style="color:#DABC85;">一般</li>
      <li style="color:#1ACE80;">良好</li>
      <li style="color:#AB2C31;">注意</li>
    </div>
		<div class="relationship">
			<org-tree :data="tree_data" 
        :horizontal="horizontal" 
        :path_url="path_url" 
        :collapsable="false"
        :expandAll="true"
        :settingFlag="false">
      </org-tree>
		</div>
  </div>
</template>
<script>
// import treeData from './treeData.js';
export default {
	name: "Departmental_level",
  data() {
    return {
      active: 0,
			entranceList: [
				{name: '事项申报', path: ''},
				{name: '个人即报', path: ''},
				{name: '警示教育', path: ''},
				{name: '廉政教育', path: ''},
				{name: '年度报告', path: ''},
        {name: '廉政台账', path: ''},
        {name: '事项申报', path: ''},
				{name: '个人即报', path: ''},
				{name: '警示教育', path: ''},
				{name: '廉政教育', path: ''},
				{name: '年度报告', path: ''},
				{name: '廉政台账', path: ''}
      ],
      tree_data: null,
      horizontal: true,
      // 人员关系跳转地址
      path_url: 'Personnel_relation'
			// 
    }
  },
  watch: {},
  mounted() {
    let query = this.$route.query
    console.log(query)
    this.tree_data = query.value
    this.active = query.value.id
    this.entranceList = query.list
    this.init()
  },
  methods: {
    init() {
      // this.getData()
    },
    getData(){
      // const _this = this
      // _this.tree_data = treeData.treeData1
    },
    changeScroll(direction = 'right'){
      let scroll = this.$refs.dep_list.scrollLeft
      if(direction == 'left'){
        this.$refs.dep_list.scrollLeft = scroll - 300
      }else {
        this.$refs.dep_list.scrollLeft = scroll + 300
      }
    },
    handleClickDep(value){
      // console.log(value)
      this.active = value.id
      this.tree_data = value
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
.entrance{
  border-radius: 20px;
  background: url('../../../assets/images/bg/dep_bg.png') no-repeat;
  background-size: 100% 100%;
}
.entrance .panel_info{
  position: relative;
  top: 55px;
  font-weight: bold;
  color: #bf1730;
}
.dep_Con{
  display:inline-block;
  width:calc(100% - 80px);
  overflow:auto;
  white-space: nowrap;
}
.Org_relationship{
  height: 100%;
	width: 100%;
  font-size: 12px;
}
.post_status
  position: fixed
  width: 200px
  margin: 20px 40px
  span 
    display block
  li
    width 50px
    float left
    margin-top 5px
.dep_list_span
  cursor:pointer;
  position:relative;
  bottom: 60px;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
.entrance
	width 120px
	height 100px
	display inline-block
	text-align center
	margin 10px 0.8%
.relationship
	margin 0 0.8%
	height calc(100% - 205px)
	text-align center
	overflow auto
</style>
