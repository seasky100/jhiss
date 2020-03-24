<template>
  <div class="IndividualReport">
    <div class="individual_title">
      年度报告
    </div>
		<div style="margin:0 15px;">
      <p>查询条件</p>
      <e-search
        @handleSearch="handleSearch"
        :searchData="searchData"
        :searchForm="searchForm"
        :addForm="addForm" />
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
</template>
<script>
import { getUserList } from '@/api/report.js';
export default {
  name: "AnnualReportList",
  data() {
    return {
			// userId: '5ba98b66cd3549b9b92ea8723e89207e',
			userId: '2020',
      addForm: 'AnnualReportAdd', // 新增路由地址
			searchData: {
				policeCode: '',
				policeName: ''
			},
			searchForm: [
				{label:'警号：', type: 'input', prop: 'policeCode', width: '200px', placeholder: '发起人警号'},
				{label:'姓名：', type: 'input', prop: 'policeName', width: '200px', placeholder: '发起人姓名'},
        // {
        //   type: 'select',
        //   prop: 'deptId',
        //   width: '150px',
        //   options: [{label:'治安部门', value:'0'},{label:'交通管理部门', value:'1'}],
        //   change: row => console.log(row),
        //   placeholder: '所属部门'
        // },
        // {
        //   type: 'daterange',
        //   options: [
        //     {
        //       prop: 'startTime',
        //       format: 'yyyy-MM-dd',
        //       valueformat: 'yyyy-MM-dd',
        //       placeholder: '起始时间'
        //     },
        //     {
        //       prop: 'endTime',
        //       format: 'yyyy-MM-dd',
        //       valueformat: 'yyyy-MM-dd',
        //       placeholder: '结束时间'
        //     }
        //   ]
				// },
				// {
        //   type: 'select',
        //   prop: 'approvalStatus',
        //   width: '150px',
        //   options: [
        //     {label:'审批中', value:'1'},
        //     {label:'已通过', value:'2'},
        //     {label:'已驳回', value:'3'}
        //   ],
        //   change: row => console.log(row),
        //   placeholder: '--审批状态--'
        // }
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
          label: '警号',
          align: 'left'
        },
        {
          prop: 'policeName',
          label: '姓名',
          align: 'left'
        },
        {
          prop: 'depment',
          label: '所属部门',
          align: 'left'
        },
        {
          prop: 'time',
          label: '填报时间',
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
              console.log('row', row)
              this.$router.push({path: '/AnnualReportInfo', query: row})
            },
            showCallback: () => {
              return true;
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
		init() {
      this.query();
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
.individual_title
	height:40px;
	line-height:40px;
	background:#fff;
	padding:0 10px;
	font-size 16px
	font-weight bold
</style>
