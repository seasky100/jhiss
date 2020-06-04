<template>
  <div class="IndividualReport">
      <e-table
        ref="recordTableRef"
        :tableList="tableList"
        :options="options"
        :columns="columns"
        :operates="operates"
        @afterCurrentPageClick="afterCurrentPageClickHandle"
      />
    <!-- <DisposalAgent ref="DisposalAgent" /> -->
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
      'userId'
    ])
  },
  data() {
    return {
      addForm: '/organizationRequestAdd',
			searchData: {
        userName: '',
        policeCode: '',
        approvalId: '',
        problemType: '',
        startTime: '',
        endTime: ''
      },
      userIds:'',
			searchForm: [
        {type: 'input', prop: 'policeCode', width: '120px', placeholder: '发起人警号'},
        {type: 'input', prop: 'approvalName', width: '120px', placeholder: '发起人姓名'},
        {
          type: 'select',
          prop: 'approvalId',
          width: '150px',
          options: [
            {label:'治安部门', value:'0'},
            {label:'交通管理部门', value:'1'}
          ],
          change: row => console.log(row),
          placeholder: '所属部门'
        },
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
          type: 'select',
          prop: 'reportType',
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
          type: 'select',
          prop: 'approvalStatus',
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
        {
          prop: 'policeCode',
          label: '发起人警号',
          align: 'left'
        },
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
          formatter: 'reportType_format',
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
              this.$router.push({path: '/organizationRequestDetail', query: { flowCode: row.flowCode }})
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
    // this.init();
    this.getUserListByUserId()
  },
  methods: {
		init() {
      this.query();
    },
    reportType_format(row, column, prop){
      // console.log(column.options)
      return column.options[prop]
    },
    gmtCreate_format(row, column, prop){
      return new Date(prop).toLocaleString('chinese', {hour12: false})
    },
    formData_format(row, column, prop){
      return JSON.parse(prop).applyDesc
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
            this.query();
          }
        })
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
            // userId:  _this.userId + ','+ _this.userIds,
            userId:  _this.userId ,
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
  @import "../../styles/agency.css";
  .el-table__fixed-body-wrapper{
  top: 53px !important;
}
/* .individual_title{
	height:40px;
	line-height:40px;
	background:#fff;
	padding:0 10px;
	font-size:16px;
    font-weight:bold
} */
</style>
