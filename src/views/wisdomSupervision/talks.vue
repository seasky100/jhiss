<template>
  <div class="IndividualReport">
    <div class="individual_title">
      谈话谈心
    </div>
		<div>
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
import { findInterViewPage } from '@/api/report.js';
export default {
  name: "IndividualReport",
  data() {
    return {
      userId: '5ba98b66cd3549b9b92ea8723e89207e',
      addForm: '/TalkAdd',
			searchData: {
        userName: '',
        policeCode: '',
        department: '',
        problemType: '',
        startTime: '',
        endTime: ''
			},
			searchForm: [
        {label:'姓名：',type: 'input', prop: 'interviewMan', width: '120px', placeholder: ''},
        {
          label:'所属部门：',
          type: 'select',
          prop: 'deptId',
          width: '150px',
          options: [{label:'治安部门', value:'0'},{label:'交通管理部门', value:'1'}],
          change: row => console.log(row),
          placeholder: '所属部门'
        },
        {
          label:'筛选时间：',
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
				}
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
          prop: 'interviewTime',
          label: '谈话时间',
          align: 'left'
        },
        {
          prop: 'interviewMan',
          label: '被谈话人',
          align: 'left'
        },
        {
          prop: 'userName',
          label: '谈话领导',
          align: 'left'
        },
        {
          prop: 'interviewType',
          formatter: 'interviewType_formatter',
          options: {
            1: '谈话谈心',
            2: '家庭走访',
            3: '约谈提醒',
            4: '帮助教育',
            5: '其他'
          },
          label: '谈话类型',
          align: 'left'
        },
        {
          prop: 'deptName',
          label: '所属部门',
          align: 'left'
				}
      ],
      operates: {
        width: 150,
        fixed: 'right',
        list: [
          {
            id: '1',
            label: '查看',
            show: true,
            underline: false,
            icon: '<i class="el-icon-view"></i>',
            disabled: false,
            method: (key, row) => {
              // console.log('row', row);
              this.$router.push({path: '/TalkAdd', query: row})
            },
            showCallback: () => {
              return true;
            }
          }
        ]
      }
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
      findInterViewPage(
        Object.assign(
          {
            nCurrent: nCurrent,
            nSize: 10,
            userId: _this.userId,
            isAsc: false,
            orderByField: 'interviewTime'
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
