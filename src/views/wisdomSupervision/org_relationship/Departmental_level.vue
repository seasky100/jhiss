<template>
  <div class="Org_relationship">
    <div class="individual_title">
      部门领导级别
    </div>
    <div class="dep_list" style="width:100%;text-align:center;">
      <span class="dep_list_span" @click="changeScroll('left')" style="right: 10px;">
        《《
      </span>
      <div ref="dep_list" style="display:inline-block;width:90%;overflow:auto;white-space: nowrap;">
        <div class="entrance" v-for="(item,index) of entranceList" :key="index">
          {{item.name}}
        </div>
      </div>
      <span class="dep_list_span" @click="changeScroll('right')" style="left: 10px;">
        》》
      </span>
    </div>
    <div class="post_status">
      <span>岗位状态颜色说明：</span>
      <li style="color:#DABC85;">一般</li>
      <li style="color:#1ACE80;">良好</li>
      <li style="color:#AB2C31;">注意</li>
    </div>
		<div class="relationship">
			<org-tree :data="tree_data" :horizontal="horizontal" :path_url="path_url"></org-tree>
		</div>
  </div>
</template>
<script>
import treeData from './treeData.js';
export default {
	name: "Departmental_level",
  data() {
    return {
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
    this.init()
  },
  methods: {
    init() {
      this.getData()
    },
    getData(){
      const _this = this
      _this.tree_data = treeData
    },
    changeScroll(direction = 'right'){
      let scroll = this.$refs.dep_list.scrollLeft
      if(direction == 'left'){
        this.$refs.dep_list.scrollLeft = scroll - 300
      }else {
        this.$refs.dep_list.scrollLeft = scroll + 300
      }
      
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
.Org_relationship
	height 100%
	width 100%
.individual_title
	height:40px;
	line-height:40px;
	background:#fff;
	padding:0 10px;
	font-size 16px
	font-weight bold
.entrance
	width 120px
	height 100px
	line-height 35px
	display inline-block
	text-align center
	background #fff
	margin 10px 0.8%
.relationship
	margin 0 0.8%
	background #fff
	height calc(100% - 175px)
	text-align center
	overflow auto
</style>
