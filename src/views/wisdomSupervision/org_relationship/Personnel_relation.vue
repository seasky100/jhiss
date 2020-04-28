<template>
  <div class="person_home">
    <div class="page-title">
      <img style="margin-right:8px;" src='@/utils/img/home_round_bar@2x.png' /> 
      <span>层级管理</span>
      <el-button class="titleBtn" size="mini" @click="returnClick">返回上一级</el-button>
    </div>
    <div class="individual_title"></div>
    <div class="police_career" style="background:none;">
      <div class="fengxian" style="width:430px;">
        <div class="relationTitle">我的工作台</div>
        <!-- <img style="margin: 15px 3%;width:94%;" src="../../../assets/images/bg/ship_bg.png" /> -->
        <div class="con photoImg">
          <div class="photo_img_con" style="border:3px solid #afafaf;">
            <!-- <img class="photo_img" src="@/assets/images/bg/person.png" /> -->
            <el-image class="photo_img"
              :src="getPhotoPath(personInfo.userInfo)" fit="fill" lazy>
              <div slot="error" class="image-slot">
                <el-image fit="fill" class="photo_img" :src="require('@/assets/images/bg/person.png')"></el-image>
              </div>
            </el-image>
          </div>
          <div class="img_name">{{personInfo.realName}}</div>
        </div>
        <div class="con labelCon">
          <!-- <span class="top_title">标签</span> -->
          <span :style="[{background:color_arr[index].bg,color:color_arr[index].color}]"
            class="label_body" 
            v-for="(item,index) of labelList" :key="index">
            {{item.label}}
          </span>
        </div>  
        <div class="con projectCon" style="height:110px;">
          <span class="project_li" @click="handleClick(item)"
            v-for="(item,index) of projectList" :key="index">
            <img class="menuImg" :src="item.imgPath" />
            <span>{{item.name}}</span>
          </span>
        </div>
        <div class="con orgTreeCon">
          <span class="top_title">级别关系</span>
          <org-tree :data="tree_data" 
            :collapsable="false" 
            :model="model"
            :expandAll="true">
          </org-tree>
        </div>
      </div>
			<!-- 领导属下信息 -->
      <div class="fengxian" style="width:calc(99% - 460px);margin-left:0.7%;">
        <div class="person_title">
          <div class="submenu" @click="subMenuClick(index)"
            :style="[{'border-bottom':active==index?'4px solid #235FF6':'none','color':active==index?'#235FF6':'#7F7E84'}]"
            v-for="(item,index) of submenuList" :key="index">
            {{item.name}}
          </div>
        </div>
        <div class="relationBody">
          <org-relation v-if="person_data.length > 0" :data="person_data"></org-relation>
        </div>
      </div>      
    </div>
    <!-- 岗位预警 -->
    <el-dialog v-if="warningInfo != null" class="dialog_info" title="人员信息" :visible.sync="dialogVisible">
      <div>
        <img style="float:left;" class="photo_img" src="@/assets/images/bg/person.png" />
        <div style="float:left;padding:15px;line-height:25px;">
          <span class="dialogName">{{warningInfo.userName}}</span>
          <span style="color:#ccc;">警号：</span>{{warningInfo.policeCode}}
          <span style="color:#ccc;margin-left:10px;">职务：</span>{{warningInfo.orgName}}
          <span style="color:#ccc;margin-left:10px;">部门：</span>{{warningInfo.postName}}
          <span style="color:#ccc;margin-left:10px;">职级：</span>{{warningInfo.orgName}}
        </div>
      </div>
      <el-table :data="warningInfo.riskContentList" class="diaTab">
        <el-table-column property="workMatters" label="工作事项"></el-table-column>
        <el-table-column property="riskContent" label="岗位廉政风险"></el-table-column>
        <el-table-column property="riskMesure" label="防控措施"></el-table-column>
      </el-table>
    </el-dialog>
    <!-- 责任清单 -->
    <el-dialog class="dialog_info" title="责任清单" :visible.sync="dialogVisible2">
      <div>责任清单</div>
    </el-dialog>
  </div>
</template>
<script>
// import treeData from './treeData.js';
import { getUserInfo } from '@/api/user-server.js';
import { getRiskByUserId } from '@/api/report.js';
import { myPhotoSrc } from '@/utils/common.js';
export default {
  name: "Personnel_relation",
  inject: ['MenuPage'],
  data() {
    return {
      personInfo:{},
      active: 1,
      labelList: [
        {label: '党员'},
        {label: '在岗'},
      ],
      projectList: [
        {name: '工作日志', path: '/HierEvaluation', imgPath: require('@/assets/images/bg/menu1.png')},
        {name: '岗位预警', imgPath: require('@/assets/images/bg/menu2.png')},
        {name: '谈话谈心', path: '/talks', imgPath: require('@/assets/images/bg/menu3.png')},
        {name: '责任清单', imgPath: require('@/assets/images/bg/menu4.png')}
      ],
      submenuList: [
        {name:'我的直属领导'},
        {name:'我的下属同事'}
      ],
      tree_data: {},
      person_data: [],
      color_arr: [
        {bg: '#EAE9EF',color: '#A52126'},
        {bg: '#E6FAF5',color: '#81D5C0'},
        {bg: '#D6E9FF',color: '#4D86F0'}
      ],
      model: 'person_info',
      level: 2, // 1: 只有上级；2：上下级都有；3：只有下级
      dialogVisible: false, // 岗位预警
      dialogVisible2: false, // 责任清单
      warningInfo: null,
      gridData: [],
    }
  },
  watch:{
    // person_data: {
    //   immediate: true,
    //   handler (val) {
    //     this.person_data=val
    //   }
    // }
  },
  mounted() {
    this.init()
  },
  methods: {
    returnClick(){
      this.$router.push({path: '/Departmental_level'})
    },
    getPhotoPath(userInfo){
      let path = myPhotoSrc(userInfo)
      return path
    },
    init() {
      let query = this.$route.query
      this.personInfo = query.value
      // this.labelList = [this.personInfo.orgName,this.personInfo.orgPname]
      this.getData(query)
    },
    getChildren(node, newchildren) {
      let childrens = node.childrens || []; //当前岗位下的子节点
      let userList = node.userList; //当前岗位的用户节点
      //把当前岗位的节点当作子节点
      for (var i = 0; i < userList.length; i++) {
        userList[i].userPid = node.userPid;
        userList[i].children = [];
        newchildren.push(userList[i]);
      }
      for (var m = 0; m < childrens.length; m++) {
        for (var n = 0; n < newchildren.length; n++) {
          if (childrens[m].userPid == newchildren[n].id) {
            this.getChildren(childrens[m], newchildren[n].children);
          }
        }
      }
    },
    getData(query){
      this.tree_data = query.value
      
      if(this.tree_data.children == null){
        // this.submenuList = this.submenuList.splice(0,1)
        this.submenuList = [{name:'我的直属领导'}]
        this.level = 1
        this.active = 0
      }
      this.person_data = this.tree_data.children
      let data = [...this.person_data]
      this.person_data = data.map(item => {
        item.label = [item.orgName,item.orgPname]
        return item
      })
      const _this = this
      const params = {
        userId:query.value.userPid
      }
      getUserInfo(params).then(res => {
        if (res.success == true) {
          let post = res.data.posts
          let data=res.data
          // console.log(post)
          if(post.length > 0 && post[0].userPname != null){
            let  
            tree_obj={
              realName:data.realName,
              children:[_this.tree_data]
            }
            console.log(_this.tree_data)
            _this.tree_data = tree_obj
          }else{
            // _this.submenuList = _this.submenuList.splice(1,1)
            this.submenuList = [{name:'我的下属同事'}]
            _this.level = 3
            this.active = 0
          }
        } else {
          console.log(res.message)
        }
      })
      .catch(error => {
        console.log(error)
      })
    },
    subMenuClick(index){
      if(this.level != 2){
        return
      }
      this.active = index
      if(index == 0){
        this.person_data = [this.tree_data]
      }else{
        this.person_data = this.tree_data.children[0].children
      }
    },
    handleClick(value){
      if(value.path == null){
        if(value.name=='岗位预警') {
          // let userId = this.personInfo.id
          let userId = this.personInfo.userInfo.id
          this.getRiskByUserData(userId)
        }else{
          // console.log('责任清单')
          console.log('人员ID：',this.personInfo.userInfo.id)
          this.dialogVisible2 = true
        }
      }else {
        this.MenuPage.activeMenu = value.path
        this.$router.push({path: value.path})
      }
    },
    // 个人岗位预警
    getRiskByUserData(userId){
      const _this = this
      getRiskByUserId(
        Object.assign(
          {
            userId: JSON.parse(sessionStorage.userInfo).id
          },
        )
      ).then(res => {
				// console.log(res)
				if (res.success == true) {
          this.warningInfo = res.data[0]
          _this.dialogVisible = true
        } else {
          console.log(res.message)
        }
			})
    }
    // 
  }
}
</script>
<style lang="stylus" scoped>
.person_home{
  width: 100%;
  height: 100%;
}
.individual_title{
  height:70px;
  background: url('../../../assets/images/bg/top_bg.png');
  background-size: 100% 100%;
}
.police_career{
  height:calc(100% - 145px);
  background:#fff;
  margin 15px;
}
.fengxian{
  float:left;
  background #fff;
  height:100%;
}
.fengxian_left{
  background: url('../../../assets/images/bg/ship_bg.png');
  background-size: 100% 100%;
}
.relationTitle{
  padding: 20px 20px 0px;
  font-size:16px;
  font-weight:bold;
  color: #0015ff;
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
.orgTreeCon{
  height:200px;
  position: relative;
  left: -10px;
  margin: 0px !important;
  text-align: center;
}
.photoImg{
  margin-top:60px !important;
  margin-bottom: 5px !important;
  text-align: center;
}
.photoImg .photo_img_con{
  display: inline-block;
  width: 80px;
  height: 80px;
  border-radius: 45px;
}
.photoImg .photo_img{
  height: 98%;
  width: 79%;
  border-radius: 45px;
}
.img_name{
  margin: 10px 0;
  font-size:13px;
  font-family:Source Han Sans CN;
  font-weight:400;
  color: #AB2C31;
  color: #333333;
  font-weight: bold;
}
.individual_title{
  height:70px;
  background: url('../../../assets/images/bg/top_bg.png');
  background-size: 100% 100%;
}
.con
  margin 0px 25px
  margin-bottom 30px
  line-height 20px
  font-size 14px
  text-align center
  .top_title 
    display block
    margin-bottom 10px
    text-align left 
    margin-left 30px
    font-weight bold
    font-size 14px
  .label_body
    padding: 5px 10px
    background #ccc
    border-radius 5px
    maegin: 5px
    margin-right 10px
  .project_li
    width 25%
    margin 30px 0 5px 0
    float left
    color #AB2C31
    font-size 16px
    cursor pointer
    text-align center
    .menuImg
      width 45px
      height 45px
      border-radius 40px
    span 
      font-size 13px
      margin-top 5px
      display block
      color #333
      &:hover
        color #ab2c31
.projectCon
  border-top 1px solid #cccccc
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
  overflow-x auto
.dialog_info
  .dialogName
    display block
    font-size 16px
    font-weight bold
    color #2070c1
  .diaTab >>> td,.diaTab >>> th
    text-align center
  >>> .el-dialog__body
    padding 30px 35px
	>>> .el-dialog__header
		border 1px solid #cccccc
  
</style>
