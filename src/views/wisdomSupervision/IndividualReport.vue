<template>
  <div class="container">
    <div class="page-title">
      <span>个人即报</span>
    </div>
    <div class="Individual_type">
      <span @click="ApplyReport(item)" style="display:inline-block;"
        v-for="(item,index) of typeList" 
        :key="index">
        {{item.name}}
      </span>
    </div>
    <div class="content">
      <div class="search-wrap">
        <div class="section-title">查询条件</div>
        <e-search
          class="search-form"
          @handleSearch="handleSearch"
          :searchData="searchData"
          :searchForm="searchForm" />
      </div>
      <div>
        <e-table
          ref="recordSpTableRef"
          :tableList="tableList"
          :options="options"
          :columns="columns"
          @afterCurrentPageClick="afterCurrentPageClickHandle"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { findReportPage } from '@/api/report.js';

export default {
  name: "IndividualReport",
  data() {
    return {
			typeList:[
				{name:'因私出境',path:'/Private_exit'},
				{name:'房产变更',path:'/House_property'},
				{name:'婚姻情况',path:'/Marital_status'},
				{name:'婚丧宴请',path:'/Weddings'},
				{name:'收受礼金',path:'/Accepting_gifts'},
				{name:'亲属从业',path:'/Kinship_work'},
				{name:'移居国外',path:'/Emigrate'},
				{name:'境外投资',path:'/Offshore_Touzi'},
				{name:'亲属经商',path:'/Relatives_business'},
				{name:'境外存款',path:'/Offshore_deposits'},
				{name:'担保借贷',path:'/Secured_lending'},
				{name:'涉纪涉诉事项',path:'/Matters_involved'},
				{name:'其他',path:'/Other_matters'}
			],
			searchData: {
        userName: '',
        policeCode: '',
        approvalId: '',
        status: '',
        startTime: '',
        endTime: ''
			},
			searchForm: [
        {type: 'input', prop: 'policeCode', width: '120px', placeholder: '发起人警号'},
        {type: 'input', prop: 'userName', width: '120px', placeholder: '发起人姓名'},
        {
          type: 'select',
          prop: 'approvalId',
          width: '150px',
          options: [{label:'治安部门', value:'0'},{label:'交通管理部门', value:'1'}],
          change: row => console.log(row),
          placeholder: '所属部门'
        },
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
          type: 'select',
          prop: 'problemType',
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
          type: 'select',
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
        height:'550'
			},
			columns: [
        {
          prop: 'policeCode',
          label: '发起人警号',
          align: 'left'
        },
        {
          prop: 'approvalName',
          label: '发起人姓名',
          align: 'left'
        },
        {
          prop: 'department',
          label: '发起人部门',
          align: 'left'
        },
        {
          prop: 'approvalStatus',
          label: '即报类型',
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
          formatter: 'reportType_format',
          options: {
            1: '审批中',
            2: '已通过',
            3: '已驳回'
          },
          label: '审批状态',
          align: 'left'
        }
      ]
    }
  },
  watch: {},
  mounted() {
    this.init()
  },
  methods: {
		init() {
      this.query();
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
		// 查询列表
    query(nCurrent = 1) {
      const $this = this;
      findReportPage(
        Object.assign(
          {
            nCurrent: nCurrent,
            nSize: 10,
            userId: '5ba98b66cd3549b9b92ea8723e89207e',
            reportType: '1'
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
  }
}
</script>
<style lang="stylus" scoped>
@import "../../styles/common.styl";

.Individual_type{
  padding: 10px 10px 0;
  span{
    margin: 0 10px 5px 0;
		padding: 3px 14px;
		border-radius: 2px;
		background: rgb(35, 95, 245);
		color: #fff;
		cursor: pointer;
  }
}
	
	
</style>
