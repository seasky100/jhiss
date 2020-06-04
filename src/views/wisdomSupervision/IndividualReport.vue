<template>
  <div class="container">
    <div class="page-title">
      <img style="margin-right:8px;" src='@/utils/img/home_round_bar@2x.png' /> 
      <span>个人即报</span>
    </div>
    <div class="Individual_type">
     <div class='block_image' title='点击新增'  @click="ApplyReport(item)" v-for="(item,index) of typeList"  :key="index">
       <el-image 
        :alt="item.name"
        style="width: 54px; height: 54px"
      :src="item.url"      
      :fit="fill">
      </el-image>
       <span>{{item.name}}</span>
      </div>
    </div>
    <div class="content">
      <div class="search-wrap">
        <div class="section-title">查询条件</div>
        <div style="display: flex;margin-top: 9px;">
        <div class='department'>
          <select-tree v-model="ruleForm.department1"   :props="config" :treeData="arryData" @change="orgChange" placeholder="请选择部门"
          />
      </div>
      <div class='department'>
          <el-select v-model="id3" placeholder="姓名" @change="selectChange3">
              <el-option v-for="item in approvalArr" :key="item.id" :label="item.realName" :value="item.id">
              </el-option>
          </el-select>
      </div>
        <e-search
          class="search-form"
          @handleSearch="handleSearch"
          :searchData="searchData"
          :searchForm="searchForm" />
        </div>
      </div>
      <div style="text-align: -webkit-auto;margin-bottom: 12px;margin-left: 10px;">
          <el-switch v-model='value' @change='group' active-text='我的即报' active-color='#13ce66' inactive-text='待我审批' inactive-color='#ff4949'>
          </el-switch>
        </div>
      <div>
        <e-table
          ref="recordSpTableRef"
          :tableList="tableList"
          :options="options"
          :columns="columns"
          :operates="operates"
          @afterCurrentPageClick="afterCurrentPageClickHandle"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { getUserListByUserId,getUserList } from '@/api/user-server.js';
import { findReportPage,getPostByUserId } from '@/api/report.js';
import { mapGetters } from 'vuex';

export default {
  name: "IndividualReport",
  computed: {
    ...mapGetters([
      'userId',
      'orgData'
    ])
  },
  data() {
    return {
			typeList:[
				{name:'因私出境',url:require('@/assets/images/individual/private@2x.png'),path:'/Private_exit'},
				{name:'房产变更',url:require('@/assets/images/individual/fcbg@2x.png'),path:'/House_property'},
				{name:'婚姻状况',url:require('@/assets/images/individual/hyzk@2x.png'),path:'/Marital_status'},
				{name:'婚丧宴请',url:require('@/assets/images/individual/hsyq@2x.png'),path:'/Weddings'},
				{name:'收受礼金',url:require('@/assets/images/individual/sslj@2x.png'),path:'/Accepting_gifts'},
				{name:'亲属从业',url:require('@/assets/images/individual/qscy@2x.png'),path:'/Kinship_work'},
				{name:'移居国外',url:require('@/assets/images/individual/yjgw@2x.png'),path:'/Emigrate'},
				{name:'境外投资',url:require('@/assets/images/individual/jwtz@2x.png'),path:'/Offshore_Touzi'},
				{name:'亲属经商',url:require('@/assets/images/individual/qsjs@2x.png'),path:'/Relatives_business'},
				{name:'境外存款',url:require('@/assets/images/individual/jwck@2x.png'),path:'/Offshore_deposits'},
				{name:'借贷担保',url:require('@/assets/images/individual/jddb@2x.png'),path:'/Secured_lending'},
				{name:'涉及诉讼事项',url:require('@/assets/images/individual/sjss@2x.png'),path:'/Matters_involved'},
				{name:'其他',url:require('@/assets/images/individual/qt@2x.png'),path:'/Other_matters'}
			],
      userIds:'',
      id:'',
      id3: '',
      arryData:[],
      approvalArr: [],
      approvalList: [],
      config: {
        value: 'id',
        label: 'name',
        children: 'childrens',
        disabled: true
      },
      ruleForm: {
            department1: sessionStorage.orgName,
        },
      value: '',
			searchData: {
        userName: '',
        policeCode: '',
        approvalId:  '',
        status: '',
        code:'',
        startTime: '',
        endTime: ''
			},
			searchForm: [
        // {type: 'input', prop: 'policeCode', width: '120px', placeholder: '发起人警号'},
        // {type: 'input', prop: 'userName', width: '120px', placeholder: '发起人姓名'},
        // {
        //   type: 'select',
        //   prop: 'approvalId',
        //   width: '150px',
        //   options: [{label:'治安部门', value:'0'},{label:'交通管理部门', value:'1'}],
        //   change: row => console.log(row),
        //   placeholder: '所属部门'
        // },
        // {
				// 	// label: '所属部门',
				// 	type: 'select_tree',
				// 	prop: 'approvalId',
				// 	options: this.orgData,
				// 	config: {
				// 		value: 'id',
				// 		label: 'name',
				// 		children: 'childrens',
				// 		disabled: true
				// 	},
				// },
        {
          type: 'daterange',
          options: [
            {
              prop: 'startTime',
              format: '',
              valueformat: '',
              placeholder: '起始时间'
            },
            {
              prop: 'endTime',
              format: '',
              valueformat: '',
              placeholder: '结束时间'
            }
          ]
				},
				{
          type: 'select1',
          prop: 'code',
          width: '150px',
          options: [
						{label:'婚姻情况', value:'101'},
						{label:'婚丧宴请', value:'102'},
						{label:'收受礼金', value:'103'},
						{label:'因私出境', value:'104'},
						{label:'移居国外', value:'105'},
						{label:'亲属从业', value:'106'},
						{label:'违法违纪及意外', value:'107'},
						{label:'房产变更', value:'108'},
						{label:'境外投资', value:'109'},
						{label:'担保借贷', value:'110'},
						{label:'亲属经商', value:'111'},
						{label:'境外存款', value:'112'},
						{label:'其他', value:'113'},
					],
          change: row => console.log(row),
          placeholder: '即报类型'
				},
				{
          type: 'select1',
          prop: 'status',
          width: '150px',
          options: [
						{label:'审批中', value:'1'},
						{label:'已通过', value:'2'},
						{label:'已驳回', value:'3'}
					],
          change: row => console.log(row),
          placeholder: '审批状态'
        },
			],
			tableList:[],
			options: {
        // 每页数据数
        pageSize: 10,
        hasIndex: false,
        // 当前页码
        currentPage: 1,
        loading: true,
        maxHeight: null,
        height:'560'
			},
			columns: [
        // {
        //   prop: 'policeCode',
        //   label: '发起人警号',
        //   align: 'left'
        // },
        {
          prop: 'sponsorName',
          label: '发起人姓名',
          align: 'left'
        },
        {
          prop: 'department',
          label: '发起人部门',
          align: 'left'
        },
        {
          prop: 'reportType',
          label: '即报类型',
          formatter: 'reportType_format',
          options: {
            101: '婚姻情况',
            102: '婚丧宴请',
            103: '收受礼金',
            104: '因私出境',
            105: '移居国外',
            106: '亲属从业',
            107: '违法违纪及意外',
            108: '房产变更',
            109: '境外投资',
            110: '担保借贷',
            111: '亲属经商',
            112: '境外存款',
            113: '其他'
          },
          align: 'left'
        },
        {
          prop: 'gmtCreate',
          label: '申请时间',
          align: 'left',
          type: 'date'
				},
				{
          prop: 'approvalStatus',
          formatter: 'approval_format',
          options: {
            1: '审批中',
            2: '已通过',
            3: '已驳回'
          },
          label: '审批状态',
          align: 'left'
        }
      ],
      operates: {
        width: 150,
        fixed: 'right',
        list: [
          {
            id: '1',
            label: '详情',
            show: true,
            underline: false,
            icon: '<i class="el-icon-view"></i>',
            disabled: false,
            method: (key, row) => {
              console.log('row', row);
              this.$router.push({path: '/organizationRequestDetail', query: { id: row.id,flowCode: row.flowCode }})
            },
            showCallback: () => {
              return true;
            }
          }
        ]
      },
    }
  },
  watch: {},
  mounted() {
    const grade = sessionStorage.grade
        if (grade && grade == 2 ||grade == 3) {
            this.config = {
                value: 'orgId',
                label: 'name',
                children: 'childrens',
                disabled: true
            },
            this.getPostByUserId()
        } else if (grade && grade == 1) {

            this.arryData = this.orgData

        }  else if (grade && grade == 4) {

            const data = this.orgData[0].childrens
            const orgId = sessionStorage.orgId
            this.orgChange(orgId)
            this.ruleForm.department1 = orgId
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === orgId) {
                    this.arryData.push(data[i])
                }
            }
            // this.searchForm[0].options = this.arryData;

        }else {
            const data = this.orgData[0].childrens
            const orgId = sessionStorage.orgId
            this.orgChange(orgId)
            this.ruleForm.department1 = orgId
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === orgId) {
                    this.arryData.push(data[i])
                }
            }
            this.id3 = sessionStorage.realName
            // this.searchForm[0].options = this.arryData;
        }
       

        this.userId = sessionStorage.userId;
        this.orgName = sessionStorage.orgName;
    // this.searchForm[1].options = this.orgData
    // this.getUserListByUserId()
    this.init()
  },
  methods: {
		init() {
      this.id = this.userId
      this.query();
    },
          // 机构人员 下拉change事件
    orgChange(orgId) {
      // this.searchData.dept_id = orgId
      this.getUserListData(orgId);
    },
            // 获取机构对应的人员
    getUserListData(id) {
      const grade = sessionStorage.grade
      const params = {
        orgId: id
      }
      if (grade == 4) {
        getUserListByUserId({
          userId: sessionStorage.userId,
        }).then(res => {
          this.approvalArr = res.data;
        });

      } else {
        getUserList(params).then(res => {
          if (res.success && res.data && res.data.length > 0) {
            this.approvalArr = res.data;
          }
        })
      }

    },
    	// 根据用户ID查询所有下属用户
		getUserListByUserId() {
        const _this= this;
        const params = {
          userId: _this.userId 
        }
        getUserListByUserId(params).then(res => {
          if (res.success) {
            _this.userIds = res.data.map(item => item.id).join()
            this.searchData.approvalId = sessionStorage.userId
            this.query()
          }
        })

      },
      selectChange3(val) {
          const result = this.approvalArr.filter(item => {
              return item.id === val;
          })
          this.approvalList = result;
          this.searchData.userName = result[0].realName;
      },
    approval_format(row, column, prop) {
      return column.options[prop]
    },
    reportType_format(row, column, prop){
      // console.log(column.options)
      return column.options[prop]
    },
		// 查询
    handleSearch(params) {
      Object.assign(this.searchData, params);
      this.query();
		},
		// 分页点击事件
    afterCurrentPageClickHandle(val, next) {
			this.query(val);
      next();
		},
		ApplyReport(value){
			this.$router.push({ path: value.path });
    },
    group(){
      if(this.value==true){ 
        // 我的
        this.searchData.approvalId = ''
        this.userIds = ''
        this.id = this.userId
        this.query()
      }else{ 
        // 待审批
        this.id = ''
        this.getUserListByUserId()
      }  
    },
		// 查询列表
    query(nCurrent = 1) {
      const $this = this;
      findReportPage(
        Object.assign(
          {
            nCurrent: nCurrent,
            nSize: 10,
            userId: $this.id + ','+ $this.userIds,
            approvalId: '',
            reportType:   $this.searchData.code||'1'
          },
          $this.searchData
        )
      ).then(res => {
        this.$refs.recordSpTableRef.setPageInfo(
          nCurrent,
          res.data.size,
          res.data.total,
          res.data.records
        );
      })
    },
    getPostByUserId() { // 根据id获取个人岗位
          const params = {
            userId: sessionStorage.userId
          }
          getPostByUserId(params).then(res => {
              if (res.success && res.data && res.data.length > 0) {
                  this.arryData = res.data;
              }
          })
      },
  }
}
</script>
<style>
  .el-input__inner {
    height: 34px !important;
}
</style>
<style lang="stylus" scoped>
@import "../../styles/common.styl";
.department{
    margin-left: 10px;
    margin-top: 14px;
}
/* @import "../../styles/report.css"; */
.Individual_type{
  padding: 10px 10px 0;
  cursor: pointer;
  span{
    padding: 3px 14px;
		border-radius: 2px;
		color: #515A6E;
    display: block;
  }
  .block_image{
    padding: 5px 0;
    text-align: center;
    border-right: 1px solid #eff2f6;
    display: inline-block;
    box-sizing: border-box;
    vertical-align: top;
  }
}

</style>
