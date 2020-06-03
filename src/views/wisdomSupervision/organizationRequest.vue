<template>
  <div class="container">
    <div class="page-title">
      <span>层级报备</span>
      <img style="margin-right:8px;" src='@/utils/img/home_round_bar@2x.png' /> 
    </div>
		<div class="content">
      <div class="search-wrap">
        <div class="section-title">查询条件</div>
        <e-search
          class="search-form"
          @handleSearch="handleSearch"
          :searchData="searchData"
          :searchForm="searchForm"
          :addForm="addForm" />
      </div>
      <div style="text-align: -webkit-auto;margin-bottom: 12px;margin-left: 10px;">
          <el-switch v-model='value' @change='group' active-text='我的报备' active-color='#13ce66' inactive-text='待我审批' inactive-color='#ff4949'>
            </el-switch>
        </div>
      <div>
        <e-table
          ref="recordTableRef"
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
import { findReportPage } from '@/api/report.js';
import { getUserListByUserId } from '@/api/user-server.js';
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
      addForm: '/organizationRequestAdd',
			searchData: {
        userName: '',
        policeCode: '',
        approvalId: '',
        code: '',
        startTime: '',
        endTime: ''
      },
      userIds:'',
      id:'',
      value: '',
			searchForm: [
        // {type: 'input', prop: 'policeCode', width: '120px', placeholder: '发起人警号'},
        {type: 'input', prop: 'userName', width: '120px', placeholder: '发起人姓名'},
        // {
        //   type: 'select',
        //   prop: 'approvalId',
        //   width: '150px',
        //   options: [
        //     {label:'治安部门', value:'0'},
        //     {label:'交通管理部门', value:'1'}
        //   ],
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
              format: 'yyyy-MM-dd',
              valueformat: 'yyyy-MM-dd',
              placeholder: '起始时间'
            },
            {
              prop: 'endTime',
              format: 'yyyy-MM-dd',
              valueformat: 'yyyy-MM-dd',
              placeholder: '结束时间'
            }
          ]
        },
        {
          type: 'select1',
          prop: 'code',
          width: '150px',
          options: [
            {label:'饮酒', value:'201'},
            {label:'离开辖区', value:'202'},
            {label:'离开单位', value:'203'}
          ],
          change: row => console.log(row),
          placeholder: '--申报类型--'
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
          placeholder: '--审批状态--'
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
          prop: 'formData',
          formatter: 'formData_format2',
          options: {
            201: '饮酒',
            202: '离开辖区',
            203: '离开单位'
          },
          label: '申报类型',
          align: 'left'
        },
        {
          prop: 'formData',
          formatter: 'formData_format',
          label: '申报事由',
          align: 'left'
        },
        {
          prop: 'gmtCreate',
          formatter: 'gmtCreate_format',
          label: '申报时间',
          width:'90px',
          align: 'left'
        },
        {
          prop: 'approvalStatus',
          formatter: 'reportType_format',
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
    this.init();
    this.searchForm[1].options = this.orgData
    // this.getUserListByUserId()
  },
  methods: {
		init() {
      this.id = this.userId
      this.query();
    },
    reportType_format(row, column, prop){
      // console.log(column.options)
      return column.options[prop]
    },
    
    gmtCreate_format(row, column, prop){
      return new Date(prop).toLocaleDateString()
    },
    formData_format(row, column, prop){    
      return JSON.parse(prop).applyDesc
    },
    formData_format2(row, column, prop){
      return column.options[JSON.parse(prop).applyType]
    },
		// 查询
    handleSearch(params) {
      Object.assign(this.searchData, params);
      // console.log(params)
      this.query();
		},
		// 分页点击事件
    afterCurrentPageClickHandle(val, next) {
			this.query(val);
			// console.log(val)
      next();
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
			// console.log(nCurrent)
      const _this = this;
      findReportPage(
        Object.assign(
          {
            nCurrent: nCurrent,
            nSize: 10,
            userId:  _this.id + ','+ _this.userIds,
            approvalId:'',
            reportType: '2'
          },
          _this.searchData
        )
      ).then(res => {
        // console.log(res)
        this.$refs.recordTableRef.setPageInfo(
          nCurrent,
          res.data.size,
          res.data.total,
          res.data.records
        );
      })
    },
  }
}
</script>
<style lang="stylus" scoped>
@import "../../styles/common.styl";
</style>
