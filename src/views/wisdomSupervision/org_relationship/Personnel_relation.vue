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
        <div class="relationTitle">层级履职</div>
        <!-- <img style="margin: 15px 3%;width:94%;" src="../../../assets/images/bg/ship_bg.png" /> -->
        <div class="con photoImg">
          <div class="photo_img_con" style="border:0px solid #afafaf;">
            <!-- <img class="photo_img" src="@/assets/images/bg/person.png" /> -->
            <el-image class="photo_img"
              :src="getPhotoPath(personInfo.userInfo)" fit="fill" lazy>
              <div slot="error" class="image-slot">
                <el-image fit="fill" class="photo_img" :src="require('@/assets/images/bg/person.png')"></el-image>
              </div>
            </el-image>
          </div>
          <div class="img_name"> <img src="../../../assets/images/dangyuan.png"/>{{personInfo.realName}}</div>
        </div>
        <div class="con labelCon">
          <!-- <span class="top_title">标签</span> -->
          <span :style="[{color:color_arr[0].color}]"
            class="label_body" >
            <img style="height:21px" src="@/assets/images/bg/yujing1.png"/>
          </span>
          <!-- <img src="@/assets/images/bg/menu3.png"/> -->
          <span :style="[{color:color_arr[0].color}]"
          class="label_body" @click="responsibility(personInfo)"><img src="../../../assets/images/dzzrs.png"/>责任书
        </span>
        </div>  
        <div class="con projectCon" style="height:128px;">
          <span class="project_li" @click="handleClick(item,'')"
            v-for="(item,index) of projectList" :key="index">
            <img class="menuImg" :src="item.imgPath" />
            <span>{{item.name}}</span>
          </span>
        </div>
        <div class="con orgTreeCon">
          <span class="top_title">层级关系</span>
          <org-tree style="overflow-x:auto;"
            :personId="personInfo.id"
            :data="tree_data" 
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
          <org-relation v-if="person_data.length > 0" :data="person_data" :level="org_level"></org-relation>
        </div>
      </div>      
    </div>
    <!-- 岗位预警 -->
    <el-dialog  class="dialog_info" title="风险信息" :visible.sync="dialogVisible">
      <div v-if="warningInfo != null && warningInfo != ''">
     <div v-show='lslist'>
      <div>
        <span v-if='warningInfo.fileUrl'>
            <img style="float:left; width: 55px;" class="photo_img" :src="warningInfo.fileUrl" />
        </span>
        <span v-else>
            <img style="float:left;" class="photo_img" src="@/assets/images/bg/person.png" />
        </span>
        <div style="float:left;padding:15px;line-height:25px;">
          <span class="dialogName">{{warningInfo.userName}}</span>
          <span style="color:#ccc;">警号：</span>{{warningInfo.policeCode}}
          <span style="color:#ccc;margin-left:10px;">职务：</span>{{warningInfo.orgName}}
          <span style="color:#ccc;margin-left:10px;">部门：</span>{{warningInfo.postName}}
          <!-- <span style="color:#ccc;margin-left:10px;">职级：</span>{{warningInfo.orgName}} -->
        </div>
      </div>
      <el-table :data="warningInfo.riskContentList" class="diaTab">
        <el-table-column property="workMatters" label="岗位职责"></el-table-column>
        <el-table-column property="riskContent" label="廉政风险"></el-table-column>
        <el-table-column property="riskMesure" label="防控措施"></el-table-column>
      </el-table>
      <div v-if="leData != null && leData != ''">
        <div style="margin-bottom: 17px;margin-top: 15px;font-size: 15px;font-weight: 600;color: #2070c1;">领导评价：</div>
      <div>
          <img style="float:left;width: 55px;" class="photo_img" :src="leData[0].leaderUrl" />
          <div style="float:left;padding:15px;line-height:25px;">
            <span class="dialogName">{{leData[0].leaderName}}</span>
            <span style="color:#ccc;">警号：</span>{{leData[0].leaderCode}}
            <span style="color:#ccc;margin-left:10px;">职务：</span>{{leData[0].leaderPost}}
            <span style="color:#ccc;margin-left:10px;">部门：</span>{{leData[0].leaderDept}}
            <!-- <span style="color:#ccc;margin-left:10px;">职级：</span>{{this.leadInfo.policeRank}} -->
          </div>
        </div>
        <el-table :data="leData[0].riskContentList" class="diaTab">
          <el-table-column property="workMatters" label="岗位职责"></el-table-column>
          <el-table-column property="riskContent" label="廉政风险"></el-table-column>
          <el-table-column property="riskMesure" label="防控措施"></el-table-column>
        </el-table>
      </div>
    </div>
    <div v-show='!lslist'>
      <div class="page-title">
          <span>风险评估</span>
        </div>
        <div class="content">
          <div>
            <e-table
              ref="recordTalksTableRef"
              :tableList="tableList"
              :options="options"
              :columns="columns"
              :operates="operates"
              @afterCurrentPageClick="afterCurrentPageClickHandle"
            />
          </div>
        </div>
    </div>
      <div v-show='aaa' style="text-align: -webkit-center;margin-top: 50px;">
          <el-button type="primary" @click="addClickHandle">新增</el-button>
          <el-button @click="back">取消</el-button>
          <div style="text-align: -webkit-right;">
              <el-button type="primary" @click="historylist">历史列表</el-button>
          </div>
          
      </div>
      <div v-show='!aaa' style="text-align: -webkit-center;margin-top: 20px;">
        <div  v-if="leData == null || leData == ''">
          <div style="text-align: -webkit-right;" v-show='Pleader'>
          <el-button type="primary" @click="leaderClickHandle(add)">领导评价</el-button>
        </div>
        </div>
        <div style="text-align: -webkit-right;" v-else>
            <el-button type="primary" @click="leaderClickHandle(edit)">编辑</el-button>
        </div>
        <div v-show='!Pleader'>
        <div class='pingjia'  >岗位职责:</div>
        <el-input v-model="matters" type="textarea"></el-input>            
        <div class='pingjia'  >廉政风险:</div>
        <el-input v-model="content" type="textarea"></el-input>
        <div class='pingjia'  >防控措施:</div>
        <el-input v-model="mesure" type="textarea"></el-input>
        <el-button type="primary" @click="leadClickHandle">评价</el-button>
        <el-button @click="back">取消</el-button>
      </div>
      </div>
    </div>
    <div style="text-align: -webkit-center;font-size: 16px;font-weight: 800;color: red;" v-else>
      暂无数据
    </div>
    </el-dialog>
    <!-- 责任清单 -->
    <el-dialog class="dialog_info" title="责任清单" :visible.sync="dialogVisible2">
      <div>责任清单</div>
    </el-dialog>
    <!-- 责任书皮 -->
    <div class="dialog_info" title="" v-show="dialogVisible5">
        <div style="height: 523px;width: 389px;z-index: 2000;top: 218px;left: 422px;position: absolute;" class='zrsp'>
          <div style="width: 100%;height: 20px;text-align: -webkit-center;margin-top: 35%;color: #FFD521;" >
            第（<input v-model="ruleForm.lever"  style="border: 0px solid rgb(255, 213, 33); width: 36px;color: rgb(255, 213, 33); text-align:center"></input>）级
          </div>
           <div style="width: 100%;height: 20px;text-align: -webkit-center;margin-top: 60%;color: #FFD521;font-size: 15px;" ><div><!--<el-date-picker :disabled="disabled" :picker-options = 'pickerOptions0' type="datetime" value-format="yyyy-MM-dd hh:mm:ss" placeholder="选择日期"  style="width:50%;height:30px;"></el-date-picker> -->
           <div style="margin-top: 10px;" ><span style="letter-spacing: 5px;">{{orgName}}</span></div>
           <div style="margin-top: 10px;" ><span style="letter-spacing: 2px;">{{year}}年{{month}}月</span></div>
           <button v-show='look' style="height: 22px; width: 33px;float: right; margin-right: 28px;margin-top: 30px; " type="primary" @click="addrespons">查看</button>
            <button style="height: 22px; width: 33px;float: right; margin-right: 28px;margin-top: 31px; " type="primary" @click="backrespons">关闭</button>
            <button v-show='!look' style="height: 22px; width: 33px;float: right; margin-right: 28px;margin-top: 31px; " type="primary" @click="addrespons">创建</button>
          </div></div>
        </div>
    </div>
    <!-- 责任书 -->
    <el-dialog class="dialog_response" style=" width: 88%;text-align: center;border: 0px solid #ccc;padding: 4px 35px;" title=""
      :visible.sync="dialogVisible3">
      <div v-show='dialogVisible4'>
        <div class='p_title'>
          金华市公安局党员领导干部
        </div>
        <div class='title'>
          党风廉政建设责任书
        </div>
        <div style="text-align: -webkit-auto;margin-bottom: 12px;margin-left: 10px;">
            <el-switch v-model='value' @change='group' active-text='群发' active-color='#13ce66' inactive-text='私发' inactive-color='#ff4949'>
            </el-switch>
          </div>
        <el-form ref="form" :model="form" label-width="80px" size="small">
          <el-form-item v-show="disabled1" label="部门" prop="deptId">
            <select-tree :disabled="disabled" v-model="form.deptId" :props="config" :treeData="arryData" @change="orgChange" placeholder="请选择部门"
            />
          </el-form-item>
          <el-form-item v-show="groupsend"  label="责任人:" prop="ids">
            <el-select v-model="form.ids" multiple placeholder="责任人" @change="selectChange" :disabled="disabled">
              <el-option v-for="item in interviewMans" :key="item.id" :label="item.realName" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <editor :binddata.sync="ruleForm.content " ref="editor" style="height:260px">
        </editor>
        <div class='response'>
            <span v-show='flagLeader' class='leader'>主管领导：<img style="height: 20px;margin-left: 10px;" class="photo_img" :src="ruleForm.leadSignature" /></span>          
            <!-- <span  v-show='flagLeader' class='person'>责任人:<img style="height: 20px;margin-left: 10px;" class="photo_img" :src="signatureData" /><button v-show='flag' @click='signature' >获取电子签名</button></span> -->
          
        </div>
        <!-- <el-form-item label="申报结束时间" prop="applyEnd">
                  <el-date-picker :disabled="disabled" :picker-options = 'pickerOptions0' type="datetime" value-format="yyyy-MM-dd hh:mm:ss" placeholder="选择日期" v-model="ruleForm.applyEnd" style="width: 100%;"></el-date-picker>
                </el-form-item> -->
        <el-button type="primary" @click="submit">下发</el-button>
        <el-button @click="goBack">取消</el-button>
      </div>
    <div v-show='!dialogVisible4'>
      <div class='p_title'>
        金华市公安局党员领导干部
      </div>
      <div class='p_response'>
        党风廉政建设责任书
      </div>
      <div class='title'>
        <div class='' style="font-size: 14px; margin-bottom: 10px;">
          ({{responseData.title}})
        </div>
        <div style="text-align: -webkit-auto; padding: 10px 10px;width: 100%;" class='' v-html='responseData.content'></div>
        <div class='response' style="display:flex">
          <div class='p_leader'>
              <span class=''>主管领导：<img style="height: 20px;margin-left: 10px;" class="photo_img" :src="ruleForm.leadSignature" /></span>
              <div>日期：{{responseData.gmtCreate}}</div>
          </div>
          <div class='per_response' >
              <span class='person'>责任人:<img style="height: 20px;margin-left: 10px;" class="photo_img" :src="ruleForm.selfSignature" /></span>
              <button v-show='flag' @click='signature' >获取电子签名</button>
              <div>日期：{{responseData.selfCreate}}</div>
          </div>
        </div>
        <el-button v-show ='editFlag' type="primary" @click="edit">编辑</el-button>
        <div style="text-align: -webkit-right;">
            <el-button v-show='prev' type="primary" @click="prevPiece">下一篇</el-button>
            <el-button v-show='next' type="primary" @click="nextPiece">上一篇</el-button>
          </div>
      </div>
    </div>
    </el-dialog>
        <!-- 新增风险 -->
        <JobriskAdd ref="JobriskAdd"/>
            <!-- 学习教育 -->
    <el-dialog class="dialog_info" title="学习教育" :visible.sync="dialogVisible_edu">
      <div>
        <el-switch style="margin-bottom:10px;"
          v-model="switch_edu"
          active-text="已学习"
          inactive-text="未学习">
        </el-switch>
        <div class="search-wrap" style="height:500px;">
          <e-table style="padding:0;"
            ref="educationTableRef"
            :tableList="eduTableList"
            :options="options_edu"
            :columns="columns_edu"
            @afterCurrentPageClick="afterCurrentPageClickHandle_edu"
          />
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import treeData from './treeData.js';
import { getUserInfo,getUserList,getList,getUserListByUserId, getSubordinateList  } from '@/api/user-server.js';
import { findExposureStudyRecord } from "@/api/warn.js";
import { getRiskByUserId,saveElectronicResponsibility,updateElectronicResponsibility,getElectronicResponsibilityById,findElectronicResponsibilityPage,getSignatureById,getRiskPage,saveUserRisk,updateUserRisk } from '@/api/report.js';
import { myPhotoSrc } from '@/utils/common.js';
import editor from "@/components/editor.vue";
import JobriskAdd from "../JobriskAdd";
import { mapGetters } from 'vuex';
// import Jobrisk from "../JobRisk";
export default {
  name: "Personnel_relation",
  inject: ['MenuPage'],
  data() {
    return {
      personInfo:{},
      active: 1,
      disabled: false,
      disabled1: false,
      next: true,
      prev:true,
      look:false,
      orgName: sessionStorage.orgName,
      value: '',
      year: new Date().getFullYear(),
      month: new Date().getMonth()+1,
      parentId:'',
      nCurrent: 1,
      zrsId:'',
      mesure:'',
      content:'',
      realName:"",
      groupsend: false,
      matters:'',
      arryData:[],
      interviewMans: [],
      leadInfo:{},
      type:'', // 新增或编辑
      leData:[], // 领导评价数据
      id:'',
      responseData:{},
      config: {
        value: 'id',
        label: 'name',
        children: 'childrens',
        disabled: true
      },
      formData: {
        ifMyEntering: 0,
        riskContent: [
          {
            workMatters: "",
            riskContent: "",
            riskMesure: ""
          }
        ]
      },
      form: {
        deptId: sessionStorage.orgId,
        lever:'',
        ids: []
      },
      leaderName:'',
      signatureData:'',//个人电子签名
      flag:true,
      flagLeader: false,
      editFlag: true,
      aaa:true,
      Pleader: true,
      lslist:true,
      tableList: [],
      options: {
        // 每页数据数
        pageSize: 10,
        hasIndex: false,
        // 当前页码
        currentPage: 1,
        loading: true,
        maxHeight: null,
        height: "377"
      },
      columns: [
        {
          prop: "userName",
          label: "姓名",
          align: "left"
        },

        {
          prop: "orgName",
          label: "所属部门",
          align: "left"
        },
        {
          prop: "postName",
          label: "岗位",
          align: "left"
        },
        {
          prop: "leaderName",
          label: "责任领导",
          align: "left"
        }
      ],
      operates: {
        width: 150,
        fixed: "right",
        list: [
          {
            id: "1",
            label: "详情",
            show: true,
            underline: false,
            icon: '<i class="el-icon-view"></i>',
            disabled: false,
            method: (key, row) => {
              this.getRiskData(row.userId);
            },
            showCallback: () => {
              return true;
            }
          },
          {
            id: "2",
            label: "修改",
            show: false,
            underline: false,
            icon: '<i class="el-icon-edit-outline"></i>',
            disabled: false,
            method: (key, row) => {
              this.$refs.JobriskAdd.open("update", row);
            },
            showCallback: () => {
              return true;
            }
          },
          {
            id: "3",
            label: "删除",
            show: false,
            underline: false,
            icon: '<i class="el-icon-delete"></i>',
            disabled: false,
            method: (key, row) => {
              const $this = this;
              $this
                .$confirm("是否删除？", "确认信息", {
                  distinguishCancelAndClose: true,
                  confirmButtonText: "删除",
                  cancelButtonText: "取消"
                })
                .then(() => {
                  deleteInterView({ id: row.id }).then(res => {
                    try {
                      if (res.success) {
                        $this.$message({
                          type: "success",
                          message: "删除成功"
                        });
                        $this.init();
                      }
                    } catch (e) {
                      console.log("ERROR", e);
                    }
                  });
                })
                .catch(() => {
                  return;
                });
            },
            showCallback: () => {
              return true;
            }
          }
        ]
      },
      labelList: [
        {label: '预警'},
        // {label: '在岗'},
      ],
      ruleForm: {
        title: '',
        userId: '', //用户id
        leadId: '', // 领导id
        userCreate:'', // 创建人
        content : '',
        id: '', // 责任书id
        leadSignature   :'', //领导电子签名
        selfSignature: '' // 本人的电子签名
      },
      projectList: [
        // {name: '工作日志', path: '/Refinement', imgPath: require('@/assets/images/bg/menu1.png')},
        {name: '岗位风险', imgPath: require('@/assets/images/bg/menu3.png')},
        {name: '谈话谈心', path: '/talks', imgPath: require('@/assets/images/bg/menu2.png')},
        // {name: '责任清单', imgPath: require('@/assets/images/bg/menu4.png')},
        // {name: '风险评估', path: '/JobRisk', imgPath: require('@/assets/images/bg/xxjy.png')},
        {name: '预警管控', path: '/RiskControl',imgPath: require('@/assets/images/bg/yjgk.png')},
        {name: '学习教育', imgPath: require('@/assets/images/bg/fxpg.png')},
        // {name: '责任清单', imgPath: require('@/assets/images/bg/menu4.png')}
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
      dialogVisible3: false, // 责任书
      dialogVisible4: true,
      dialogVisible5: false,
      warningInfo: null,
      gridData: [],
      dialogVisible_edu: false,
      switch_edu: true,
      eduTableList:[],
			options_edu: {
        // 每页数据数
        pageSize: 10,
        hasIndex: false,
        // 当前页码
        currentPage: 1,
        loading: true,
        maxHeight: null,
        height:'450'
			},
			columns_edu: [
        {
          prop: 'title',
          label: '标题',
          align: 'left'
        },
        {
          prop: 'content',
          label: '内容',
          align: 'left'
        }
      ],
    }
  },
  components: { editor,JobriskAdd},
  computed: {
    ...mapGetters([
      'orgData'
    ])
  },
  watch:{
    // person_data: {
    //   immediate: true,
    //   handler (val) {
    //     this.person_data=val
    //   }
    // }
    switch_edu(newVal, oldVal){
      this.eduTableList = []
      this.getEduTableData()
    },
    dialogVisible_edu(newVal, oldVal){
      if(!newVal){
        this.switch_edu = true
      }
    },
  },
  mounted() {
    this.leadInfo = JSON.parse(sessionStorage.userInfo) 
    this.init();
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
      // query.value = JSON.parse(window.sessionStorage.personInfo)
      // this.personInfo = query.value
      if(Object.prototype.toString.call(query.value) === '[object Object]' && query.id == null){
        this.personInfo = query.value
        window.sessionStorage.personInfo = JSON.stringify(query.value)
        this.getData(query)
      }else{
        let userId = sessionStorage.userId
        let realName = sessionStorage.realName
        let userInfo = JSON.parse(sessionStorage.userInfo)
        if(query.id != null){
          userId = query.id
          realName = query.realName
          userInfo = query.userInfo
        }
        // console.log(userId,realName, userInfo)
        this.init2(userId, realName, userInfo)
      }
    },
    init2(userId, realName, userInfo){
      Promise.all([this.getSubordinateList(userId),this.getPostUserInfo(userId)]).then((res) => {
        // console.log(res, 'promise all 方法')
        let children = res[0]
        let posts = res[1]
        let userPid = ''
        if(posts.length > 0){
          userPid = posts[0].userPid
        }
        let obj = {
          id: userId,
          expand: true,
          realName: realName,
          userInfo: userInfo,
          children: children,
          userPid: userPid
        }
        this.personInfo = obj
        let query = {
          value: obj
        }
        this.getData(query)
      })
    },
    // 查询上级id getUserInfo(params).then(res => {
    getPostUserInfo(userId){
      return new Promise((resolve, reject) => {
        getUserInfo({
          userId: userId
        }).then( res => {
          // console.log(res.data)
          resolve(res.data.posts)
        }).catch(err => {
          reject()
        });
      });
    },
    // 下属信息
    getSubordinateList(userId){
      return new Promise((resolve, reject) => {
        getSubordinateList({
          userId: userId
        }).then( res => {
          // console.log(res.data)
          resolve(res.data)
        }).catch(err => {
          reject()
        });
      });
    },
    // 机构人员 下拉change事件
    orgChange(orgId) {
      const item = this.deepQuery(orgId);
      this.orgName = item.name;
      this.getUserListData(orgId);
    },
    // 根据id找名字
    deepQuery(id) {
      const tree = this.orgData;
      var stark = [];
      stark = stark.concat(tree);

      while (stark.length) {
        var temp = stark.shift();
        if (temp.childrens) {
          stark = temp.childrens.concat(stark);
        }
        if (id === temp.id) {
          return temp;
        }
      }
    },
    // 获取机构对应的人员
    // getUserListData(id) {
    //   const params = {
    //     orgId: id
    //   }
    //   getUserList(params).then(res => {
    //     if (res.success && res.data && res.data.length > 0) {
    //       this.interviewMans = res.data;
    //       this.form.ids.data.map(item => item.id).join()
    //     }
    //   })
    // },
    getUserListData(id) {
      const params = {
        userId: id
      }
        getSubordinateList(params).then(res => {
          if (res.success && res.data && res.data.length > 0) {
            this.interviewMans = res.data;
            let data = res.data;
            const ids =[]
            for (let i = 0; i < data.length; i++) {       
              this.form.ids.push(data[i].id)             
            }
          }
        })
    },
    // 人员下拉
    selectChange(val) {
      let optionId = val
      this.interviewMans.map(item => {
        if (item.id === val) {
          this.realName = item.realName;
        }
      })
      // this.getRiskByUserData(optionId)
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
      if(this.tree_data.children == null || this.tree_data.children.length == 0){
        // this.submenuList = this.submenuList.splice(0,1)
        this.submenuList = [{name:'我的直属领导'}]
        this.org_level = 0 // 上级
        this.level = 1
        this.active = 0
      }
      this.person_data = this.tree_data.children
      let data = [...this.person_data]
      this.person_data = data.map(item => {
        item.label = [item.orgName,item.orgPname]
        return item
      })
      if(query.value.userPid == null || query.value.userPid == ''){
        this.submenuList = [{name:'我的下属同事'}]
        this.level = 3
        this.org_level = 1 // 下级
        this.active = 0
        return
      }
      const _this = this
      // console.log(query)
      const params = {
        userId:query.value.userPid
      }
      getUserInfo(params).then(res => {
        if (res.success == true) {
          // let post = res.data.posts
          let data = res.data
          this.leaderName = data.realName
          // console.log(post)
          let tree_obj={
            id: data.id,
            userInfo: data.userInfo,
            realName:data.realName,
            children:[_this.tree_data]
          }
          _this.tree_data = tree_obj
          if(_this.level == 1){
            _this.org_level = 0 // 上级
            _this.person_data = [_this.tree_data]
          }
          // console.log(_this.tree_data)
        } else {
          console.log(res.message)
        }
      })
      .catch(error => {
        console.log(error)
      })
    },
    getRiskData(userId) {
      const _this = this;
      getRiskByUserId({ userId }).then(res => {
        if (res.success == true) {
          this.warningInfo = res.data[0];
          // _this.dialogVisible = true;
          _this.lslist = !_this.lslist;
        } else {
          console.log(res.message);
        }
      });
    },
    subMenuClick(index){
      if(this.level != 2){
        return
      }
      this.active = index
      if(index == 0){
        this.person_data = [this.tree_data]
        this.org_level = 0
      }else{
        this.person_data = this.tree_data.children[0].children
        this.org_level = 1
      }
    },
    handleClick(value, personInfo){
      if(personInfo == ''){
        personInfo = this.personInfo
      }
      if(value.path == null){
        if(value.name=='岗位风险') {
          // let userId = this.personInfo.id
          let userId = personInfo.userInfo.id
          this.getRiskByUserData(userId)
        }else if(value.name=='学习教育'){
          let userId = personInfo.userInfo.id
          this.dialogVisible_edu = true
          this.personId = userId
          // console.log('学习教育', userId)
          this.eduTableList = []
          this.getEduTableData()
        }else{
          console.log('人员ID：',this.personInfo.userInfo.id)
          this.dialogVisible2 = true
        }
      }else {
        this.MenuPage.activeMenu = value.path
        this.$router.push({path: value.path})
      }
    },
    // 分页点击事件
    afterCurrentPageClickHandle_edu(val, next) {
      this.getEduTableData(val);
      next();
    },
    getEduTableData(nCurrent = 1){
      const _this = this;
      let status = _this.switch_edu ? 1 : 2
      const params = {
        userId: _this.personId,
        status: status, // 学习情况(1:已学习 2:未学习)
        nCurrent: nCurrent,
        nSize: 10
      }
      findExposureStudyRecord(params).then(res => {
        // console.log(res.data) 
        this.$refs.educationTableRef.setPageInfo(
          nCurrent,
          res.data.size,
          res.data.total,
          res.data.records
        );
      });
    },
    backrespons(){
      this.dialogVisible5 = false
    },
    addrespons(){
      this.dialogVisible5 = false
      this.dialogVisible3 = true
      this.findElectronic()
      // this.signatLeader()
    },
    findElectronic(){
      debugger
      const _this = this
      _this.responseData = ''
      findElectronicResponsibilityPage(
        Object.assign(
          {
            userId: _this.zrsId,
            nCurrent:_this.nCurrent,
            isAsc:false,
            orderByField:'gmtCreate',
            nSize:1,
          },
        )
      ).then(res => {
        if (res.success == true) {
          if(res.data.records == null ||res.data.records.length == 0){
            // _this.flagLeader = false 
            _this.look = false
            _this.signatLeader()  
            _this.dialogVisible4 = true
          }else{
            _this.look = true
            let userId = JSON.parse(sessionStorage.userInfo).id
            let data = res.data.records
            if(_this.nCurrent == res.data.pages && _this.nCurrent > 1){
              this.next = false
              this.prev = true
            }else if(_this.nCurrent == 1 && res.data.pages >1){
              this.next = true
              this.prev = false
            }else if(res.data.pages == 1){
              this.next = false
              this.prev = false
            }else{
              this.next = true
              this.prev = true
            }
            for (let i = 0; i < data.length; i++) {
                _this.responseData = data[i]
                _this.ruleForm.selfSignature = data[i].selfSignature   
                data[i].gmtCreate = new Date(data[i].gmtCreate).toLocaleDateString()
                data[i].selfCreate = new Date(data[i].selfCreate).toLocaleDateString()
                if(data[i].selfSignature){
                     _this.flag = false
                }else{
                  _this.flag = true
                }                             
            }
            _this.dialogVisible4 = false
            if(_this.level == 2){
              _this.editFlag = false
            }
            _this.ruleForm.title = res.data.records[0].title
            _this.ruleForm.content = res.data.records[0].content
            _this.ruleForm.leadId = res.data.records[0].leadId
            _this.ruleForm.userCreate = res.data.records[0].userCreate
            _this.ruleForm.id = res.data.records[0].id 
            _this.ruleForm.leadSignature = res.data.records[0].leadSignature 
            // _this.signatLeader()
          }
        } else {
          console.log(res.message)
        }
      })
    },
    responsibility(value) {
      this.zrsId = value.id
      console.log('领导责',this.zrsId)
      this.dialogVisible5 = true
      const data = this.orgData[0].childrens
      const orgId = sessionStorage.orgId
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === orgId) {
          this.arryData.push(data[i])
        }
      }
      this.findElectronic()
      this.parentId = sessionStorage.userId
      this.getUserListData(this.parentId);
    }, 
    prevPiece(){
      this.nCurrent = this.nCurrent-1
      this.findElectronic()
    },
    nextPiece(){
      this.nCurrent = this.nCurrent+1
      this.findElectronic()
    },
   // 个人岗位预警
    getRiskByUserData(userId) {
      this.leData = []
      const id = JSON.parse(sessionStorage.userInfo).id
      if (userId != id) {
        this.aaa = false
      } else {
        this.aaa = true
      }
      const _this = this
      getRiskByUserId(
        Object.assign(
          {
            userId: userId
          },
        )
      ).then(res => {
        // console.log(res)
        if (res.success == true) {
          _this.dialogVisible = true
          debugger
          if (res.data.length > 0) {
            let data = res.data
            let branchData = []
            for (let i = 0; i < data.length; i++) {
              if (data[i].ifMyEntering == 0) {
                if(data[i].leaderUrl){
                  data[i].leaderUrl = 'http://10.121.252.53:1001/View_file/UserImage/' + data[i].leaderUrl.split('\\').slice(-1)[0]
                }
                this.leData.push(data[i])
              } else {
                branchData.push(data[i])
              }
            }
            if (branchData[0].fileUrl) {
              branchData[0].fileUrl = 'http://10.121.252.53:1001/View_file/UserImage/' + branchData[0].fileUrl.split('\\').slice(-1)[0]
            }
            this.warningInfo = branchData[0]
            console.log('大大阿达的', this.leData)
          } else {
            this.warningInfo = []
          }
        } else {
          console.log(res.message)
        }
      })
    },
    // 个人的电子签名
    signature() {
      const _this = this
      getSignatureById(
        Object.assign(
          {
            userId: JSON.parse(sessionStorage.userInfo).id
          },
        )
      ).then(res => {
        // console.log(res)
        if (res.success == true) {
          _this.ruleForm.selfSignature = res.data
          _this.flag = false
          let qmurl = res.data
          _this.updateElectronic(qmurl)
        } else {
          console.log(res.message)
        }
      })
    },
    updateElectronic(url) {
      if (url) {
        this.ruleForm.selfSignature = url
      }
      const params = {
        id: this.ruleForm.id,
        title: this.ruleForm.title,
        userId: sessionStorage.userId,
        userCreate: this.$route.query.value.id,
        content: this.ruleForm.content,
        selfSignature: this.ruleForm.selfSignature,
      }
      updateElectronicResponsibility(params).then(res => {
        if (res.success) {
          this.$message({
            type: 'success',
            message: ''
          })
        } else {
          this.$message({
            type: 'error',
            message: '提交失败'
          })
        }
      })
    },    
    submit() {
      const params = {
        title: this.ruleForm.title,
        ids: this.form.ids, 
        leadId :sessionStorage.userId,
        userCreate: sessionStorage.userId,
        content: this.ruleForm.content,
        leadSignature: this.ruleForm.leadSignature,
        // selfSignature  :this.ruleForm.selfSignature  
      }
      saveElectronicResponsibility(params).then(res => {
        if (res.success) {
          this.$message({
            type: 'success',
            message: '提交成功'
          })
          this.dialogVisible3 = false
        } else {
          this.$message({
            type: 'error',
            message: '提交失败'
          })
        }
        sessionStorage.orgId,
        this.form.ids = []
        this.form.lever = ''
      })
    },
    leadClickHandle(){ // 领导评价
      const _this = this
      this.formData.riskContent[0].riskContent = _this.content
      this.formData.riskContent[0].riskMesure = _this.mesure
      this.formData.riskContent[0].workMatters = _this.matters
      const leadInfo = JSON.parse(sessionStorage.userInfo)
      let filesParam = new FormData();
      filesParam.append('orgId', this.warningInfo.orgId);
      filesParam.append('leaderName', this.warningInfo.leaderName);
      filesParam.append('userId', this.warningInfo.userId);
      filesParam.append('ifMyEntering', this.formData.ifMyEntering);
      filesParam.append('userName', this.warningInfo.userName);
      filesParam.append('policeCode', this.warningInfo.policeCode);
      filesParam.append('leaderId', this.warningInfo.leaderId);
      filesParam.append('leaderUrl', leadInfo.fileId);
      filesParam.append('leaderCode', leadInfo.policeCode);
      filesParam.append('leaderPost', leadInfo.rank);
      filesParam.append('leaderDept', leadInfo.label);
      filesParam.append('riskContent', JSON.stringify(this.formData.riskContent));
      filesParam.append('riskContent', JSON.stringify(_this.formData.riskContent));
      let res = null;
      if (this.id == this.warningInfo.leaderId) {
        filesParam.append('id', this.id);
         res =  updateUserRisk(filesParam);
      } else {
        res =  saveUserRisk(filesParam); 
      }
      debugger
      if (res && res.success === true) {
        this.$message({
          type: "success",
          message: "评价成功"
        });
        // _this.visible = false;
      } else {
        // this.$message({
        //   type: "error",
        //   message: res.message
        // });
      }
      this.dialogVisible = false
      this.Pleader = true
    },
    // 领导的电子签名
    signatLeader() {
      const _this = this
      getSignatureById(
        Object.assign(
          {
            userId: sessionStorage.userId,
          },
        )
      ).then(res => {
        // console.log(res)
        if (res.success == true) {
          _this.ruleForm.leadSignature  = res.data
        } else {
          console.log(res.message)
        }
      })
    },
    // 查询列表
    QueryData(nCurrent = 1) {
      debugger
      const _this = this;
      getRiskPage(
        Object.assign(
          {
            nCurrent: nCurrent,
            nSize: 10,
            policeCode: JSON.parse(sessionStorage.userInfo).policeCode,
            orgId: sessionStorage.orgId
          },
          // _this.searchData
        )
      ).then(res => {
        this.$refs.recordTalksTableRef.setPageInfo(
          nCurrent,
          res.data.size,
          res.data.total,
          res.data.records
        );
      });
    },
        // 分页点击事件
    afterCurrentPageClickHandle(val, next) {
      this.QueryData(val);
      next();
    },
    edit(){
      this.dialogVisible4 = true
    },
    goBack(){
      this.dialogVisible3= false
    },
    addClickHandle() {
      this.$refs.JobriskAdd.open("add");
    },
    leaderClickHandle(typeData){
      debugger
      if (this.leData.length>0) {
        const data = this.leData
        this.leData = []
        this.mesure = data[0].riskContentList[0].riskMesure
        this.content = data[0].riskContentList[0].riskContent
        this.matters = data[0].riskContentList[0].workMatters
        this.id = data[0].id
      }
      this.type = typeData  
      this.Pleader = false
    },
    back(){
      this.dialogVisible = false
      this.Pleader = true
      this.lslist = true
    },
    historylist(){
      this.lslist = !this.lslist
      this.QueryData();
    },
    group(){
      debugger
      if(this.value==true){ // 群发
        this.groupsend = false
        this.getUserListData(this.parentId)
      }else{ // 私法
        this.groupsend =true
        this.form.ids = []
        // this.value = true
      }
     
    }
  }
}
</script>
<style lang="stylus">
.el-dialog{
  width: 80% !important;
  /* height: 78% !important; */
  margin-left: 26vh;
}
.el-select {
  display: block;
  position: relative;
}
input::-webkit-input-placeholder{
  color: #fdfcf5;
  font-size: 10px;
  padding-left: 5px;
  font-family: monospace;
}
input:-moz-placeholder{
  color: #fdfcf5;
  font-size: 10px;
  padding-left: 5px;
  font-family: monospace;
}
input:-ms-input-placeholder{
  color: #fdfcf5;
  font-size: 10px;
  padding-left: 5px;
  font-family: monospace;
}
/* .el-input__inner {
    color: #606266;
    background-color: red;
    height: 26px;
} */
</style>
<style lang="stylus" scoped>
.person_home{
  width: 100%;
  height: 100%;
}
.pingjia{
  text-align: -webkit-left;
  margin-bottom: 10px;
}
.level{
  margin-left: -478px;
  margin-bottom: 10px;
}
.individual_title{
  height:70px;
  background: url('../../../assets/images/bg/top_bg.png');
  background-size: 100% 100%;
}
.police_career{
  height:calc(100% - 135px);
  background:#fff;
  margin: 10px;
}
.fengxian{
  float:left;
  background: #fff;
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
  height:calc(100% - 435px);
  position: relative;
  left: -10px;
  margin: 0px !important;
  text-align: center;
}
.photoImg{
  margin-top:30px !important;
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
  /* height: 98%; */
  width: 79%;
  /* border-radius: 45px; */
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
.response{
  margin-top: 21px;
  margin-bottom: 30px;
}
.zrsp{
  background: url('../../../assets/images/zrsp.png') no-repeat center / cover
}
.leader{
  margin-left: -187px;
  margin-right: 81px;
}
.p_leader{
  /* margin-left: -187px; */
  margin-right: 81px;
}
.p_title{
  font-size: 20px;
  margin-bottom: 10px;
}
.p_response{
  font-size: 17px;
  margin-bottom: 10px;
}
.con
  margin 5px 25px
  margin-bottom 30px
  line-height 20px
  font-size 14px
  text-align center
  .top_title 
    display block
    /* margin-bottom 10px */
    text-align left 
    margin-left 30px
    font-weight bold
    font-size 14px
  .label_body
    padding: 3px 0px
    background #fff
    border-radius 5px
    maegin: 5px
    cursor: pointer
    margin-right 5px
  .project_li
    width 25%
    margin 20px 0 5px 0
    float left
    color #AB2C31
    font-size 16px
    cursor pointer
    text-align center
    .menuImg
      width 35px
      height 35px
      border-radius 40px
    span 
      font-size 13px
      margin-top 2px
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
  height calc(100% - 75px)
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
		border 0px solid #cccccc
  >>> .el-dialog
    width 88%
  
</style>
