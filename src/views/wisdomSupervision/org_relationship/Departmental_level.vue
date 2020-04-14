<template>
  <div class="Org_relationship">
    <div class="page-title">
      <img style="margin-right:8px;" src='@/utils/img/home_round_bar@2x.png' /> 
      <span>层级管理</span>
      <el-button class="titleBtn" size="mini" @click="returnClick">返回上一级</el-button>
    </div>
    <div class="individual_title"></div>
    <div class=""></div>
    <div class="dep_list" style="width:100%;text-align:center;">
      <div @mousedown="changeScroll('left')" @mouseup="stopScroll" style="display:inline-block;position: relative;bottom: 65px;cursor:pointer;">
        <img style="width:30px;" src="@/assets/images/bg/dir_left.png" />
      </div>
      <div ref="dep_list" class="dep_Con">
        <!--   background: url('../../../assets/images/bg/dep_bg_level.png') no-repeat;
          background-size: 100% 100%; -->
        <div class="entrance" @click="handleClickDep(item)"
          :style="[{border:active==item.id?'3px solid #bf1730':'none'}]" 
          v-for="(item,index) of entranceList" :key="index" ref="dep_box">
          <img style="height:40px;margin:8px 0;" 
            :src="index%2==0?require('../../../assets/images/bg/dep_bg.png'):require('../../../assets/images/bg/dep_bg2.png')" />
          <div class="panel_info">
            <span style="display:block;">{{item.name}}</span>
            <span style="font-weight:normal;color:#ccc;">{{item.userPname}}</span>
          </div>
        </div>
      </div>
      <div @mousedown="changeScroll('right')" @mouseup="stopScroll" style="display:inline-block;position: relative;bottom: 65px;cursor:pointer;">
        <img style="width:30px;" src="@/assets/images/bg/dir_right.png" />
      </div>
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
        :model="model"
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
      entranceList: [],
      tree_data: null,
      horizontal: true,
      // 人员关系跳转地址
      path_url: 'Personnel_relation',
      model: '',
      timer: null,
			// 
    }
  },
  watch: {
    tree_data(newVal,oldVal){
      this.$store.state.depInfo.value = newVal
    },
    active(newVal,oldVal){
      this.$store.state.depInfo.value.id = newVal
    },
    entranceList(newVal,oldVal){
      this.$store.state.depInfo.list = newVal
    },
    model(newVal,oldVal){
      this.$store.state.depInfo.model = newVal
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    returnClick(){
      this.$router.push({path: '/Org_relationship'})
    },
    init() {
      let query = this.$route.query
      if(Object.keys(this.$route.query).length == 0){
        query = this.$store.state.depInfo
      }else{
        this.$store.state.depInfo = query
      }
      this.tree_data = query.value
      this.active = query.value.id
      this.entranceList = query.list
      this.model = query.model
      const _this = this
      let n = 0
      for(let i=0;i<this.entranceList.length;i++){
        let obj = this.entranceList[i]
        if(obj.id == this.active){
          n = i
          break;
        }
      }
      // let width = this.$refs.dep_list.offsetWidth
      this.$nextTick(() => {
        // let scroll = width - _this.$refs.dep_box[n].offsetWidth
        let scroll = _this.$refs.dep_box[n].offsetLeft - 400
        $(_this.$refs.dep_list).animate({scrollLeft : scroll },2000)
      });
    },
    changeScroll(direction = 'right'){
      // const _this = this
      let scroll = this.$refs.dep_list.scrollLeft
      let width = this.$refs.dep_list.scrollWidth
      let n = 0
      if(direction == 'left'){
        // $(this.$refs.dep_list).animate({scrollLeft: scroll - 300 },1000)
        this.timer = setInterval(() =>{ 
          if(n > scroll){
            clearInterval(this.timer)
          }
          $(this.$refs.dep_list).animate({scrollLeft: scroll - n },0)
          n++
        }, 0);
      }else {
        // $(this.$refs.dep_list).animate({scrollLeft: width },width - scroll)
        this.timer = setInterval(() =>{ 
          if(n + scroll > width){
            clearInterval(this.timer)
          }
          $(this.$refs.dep_list).animate({scrollLeft: scroll + n },0)
          n++
        }, 0);
      }
    },
    stopScroll(){
      clearInterval(this.timer)
      this.timer = null
    },
    handleClickDep(value){
      console.log(value)
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
  background: #ffffff;
}
.entrance .panel_info{
  font-weight: bold;
  color: #bf1730;
}
.dep_Con{
  display:inline-block;
  width:calc(100% - 80px);
  overflow:hidden;
  white-space: nowrap;
}
.Org_relationship{
  height: 100%;
	width: 100%;
  font-size: 12px;
}
.page-title
  background #fff
  padding 10px 16px
  span 
    font-size 16px
    color #121518
    font-weight 700
  .titleBtn
    position absolute
    right 20px
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
	height calc(100% - 265px)
	text-align center
	overflow auto
</style>
