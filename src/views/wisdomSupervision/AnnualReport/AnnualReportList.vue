<template>
  <div class="container IndividualReport">
    <div class="page-title">
      <img style="margin-right:8px;" src='@/utils/img/home_round_bar@2x.png' /> 
      <span>年度报告</span>
    </div>
    <div class="content">
      <div class="search-wrap" style="min-width:800px;">
        <!-- <p>查询条件</p> -->
        <e-search style="display:inline-block;"
          class="search-form"
          @handleSearch="handleSearch"
          :searchData="searchData"
          :searchForm="searchForm" />
        <div style="display:inline-block;position:relative;top:8px;left:-15px;">
          <el-button size="small" type="default" class="addBtn" @click="addFormClick">
            新增
          </el-button>
        </div>
      </div>
      <div class="search-wrap" style="height:760px;">
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
    <!-- 弹出框 -->
		<report-info :title="reportTitle" :dialogType="dialogType" ref="reportInfo" />
  </div>
</template>
<script>
import { getUserList, findAnnualReportPage, getReportById } from '@/api/report.js';
import reportInfo from './AnnualReportAdd';
export default {
  name: "AnnualReportList",
  components: {
    reportInfo
  },
  data() {
    return {
      userId: '2020',
      dialogType: 1, // 1.新增年报 2.修改年报
      reportTitle: '审批内容',
			searchData: {
				policeCode: '',
				policeName: ''
			},
			searchForm: [
				{label:'警号：', type: 'input', prop: 'policeCode', width: '200px', placeholder: '发起人警号'},
				{label:'姓名：', type: 'input', prop: 'policeName', width: '200px', placeholder: '发起人姓名'},
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
        height:'680'
			},
			columns: [
        {
          prop: 'rapporteur',
          label: '填报人',
          align: 'left'
        },
        {
          prop: 'company',
          label: '所属单位',
          align: 'left'
        },
        {
          prop: 'reportTime',
          // formatter: 'gmtCreate_format',
          label: '填报时间',
          align: 'left'
				}
      ],
      operates: {
        width: 200,
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
              // console.log('row', row)
              this.findReportById(row)
            },
            showCallback: () => {
              return true;
            }
          },
          {
            id: '2',
            label: '提交审批',
            show: true,
            underline: false,
            icon: '<i class="el-icon-edit-outline"></i>',
            disabled: false,
            method: (key, row) => {
              this.reportTitle = '提交审批'
              this.dialogType = 2
              this.$nextTick(() => {
                this.$refs.reportInfo.open(row);
              })
            },
            showCallback: (row) => {
              if(row.approvalId == null || row.approvalId == ''){
                return true
              }else{
                return false
              }
            }
          },
          {
            id: '3',
            label: '查看进度',
            show: true,
            underline: false,
            icon: '<i class="el-icon-view"></i>',
            disabled: false,
            method: (key, row) => {
              console.log('查看进度', row)
            },
            showCallback: (row) => {
              if(row.approvalId == null || row.approvalId == ''){
                return false
              }else{
                // return true
                return false
              }
            }
          }
        ]
			},
			testList: [
				{policeCode: '1234',policeName: '1234',depment: '1234', time: '1234'},
				{policeCode: '1234',policeName: '1234',depment: '1234', time: '1234'},
				{policeCode: '1234',policeName: '1234',depment: '1234', time: '1234'},
				{policeCode: '1234',policeName: '1234',depment: '1234', time: '1234'},
				{policeCode: '1234',policeName: '1234',depment: '1234', time: '1234'}
			]
    }
  },
  watch: {},
  mounted() {
    this.init()
  },
  methods: {
    addFormClick(){
      this.reportTitle = '新增年报'
      this.dialogType = 1
      this.$nextTick(() => {
        this.$refs.reportInfo.open()
      })
    },
    findReportById(row){
      // console.log(row)
      const _this = this
      getReportById(
        Object.assign(
          {
            id: row.id,
            // idNumber: row.idNumber,
            // reportTime: row.specificYear
            idNumber: '1245652255426',
            reportTime: '2019'
          }
        )
      ).then(res => {
        // console.log(res.data)
        let reportInfo = res.data
        _this.$router.push({path: '/AnnualReportSet', query: {row,reportInfo}})
      })
    },
		init() {
      this.query();
    },
    gmtCreate_format(row, column, prop){
      return new Date(prop).toLocaleString('chinese', {hour12: false})
    },
    interviewType_formatter(row, column, prop){
      // console.log(row)
      // console.log(prop)
      return column.options[prop]
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
    // 查询列表
    query(nCurrent = 1) {
			// console.log(nCurrent)
      const _this = this;
      findAnnualReportPage(
        Object.assign(
          {
            nCurrent: nCurrent,
            nSize: 10,
            // userId: _this.userId,
            userId: '1008611',
            // approvalId: '123456001'
          },
          _this.searchData
        )
      ).then(res => {
        // console.log(res)
        this.$refs.recordTalksTableRef.setPageInfo(
          nCurrent,
          res.data.size,
          res.data.total,
          res.data.records
        );
      })
    },
		// 查询列表
    query2(nCurrent = 1) {
			// console.log(nCurrent)
			const _this = this;
			this.$refs.recordTalksTableRef.setPageInfo(
          1,
          10,
					5,
					_this.testList
				)
      getUserList(
        Object.assign(
          {
            nCurrent: nCurrent,
            nSize: 10,
            isAsc: false,
						orderByField: 'interviewTime',
						orderFlag: false,

          },
          _this.searchData
        )
      ).then(res => {
        console.log(res)
        // this.$refs.recordTalksTableRef.setPageInfo(
        //   nCurrent,
        //   res.data.size,
				// 	res.data.total,
				// 	res.data.records
        // );
      })
    },
  }
}
</script>
<style lang="stylus" scoped>
@import "../../../styles/common.styl"
.individual_title
	height:40px;
	line-height:40px;
	background:#fff;
	padding:0 10px;
	font-size 16px
	font-weight bold
</style>
