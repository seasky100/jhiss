<template>
  <div>
    <p>检查通报</p>
    <el-row>
      <el-col :span="8">
        <ve-histogram :data="chartData"></ve-histogram>
      </el-col>
      <el-col :span="8">
        <ve-histogram :data="chartData"></ve-histogram>
      </el-col>
      <el-col :span="8">
        <ve-histogram :data="chartData"></ve-histogram>
      </el-col>
    </el-row>
    <div>
      <p>查询条件</p>
      <e-search 
        @handleSearch="handleSearch"
        :searchData="searchData"
        :searchForm="searchForm" />
      <e-table
        ref="recordSpTableRef"
        :tableList="tableList"
        :options="options"
        :columns="columns"
        @afterCurrentPageClick="afterCurrentPageClickHandle"
      />
    </div>
  </div>
</template>

<script>
import {
  findBulletinPage,
  bulletinTypeStatistics,
  bulletinExceptionStatistics,
  bulletinTimesStatistics
} from '@/api/warn.js';

export default {
  data() {
    return {
      chartData: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
          { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
          { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
          { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
          { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
          { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
        ]
      },
      searchData: {
        userName: '',
        policeCode: '',
        department: '',
        problemType: '',
        startTime: '',
        endTime: ''
      },
      searchForm: [
        {type: 'input', prop: 'policeCode', width: '120px', placeholder: '警号'},
        {type: 'input', prop: 'userName', width: '120px', placeholder: '通报对象'},
        {
          type: 'select',
          prop: 'department',
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
          options: [{label:'表彰通报', value:'0'},{label:'批评通报', value:'1'}],
          change: row => console.log(row),
          placeholder: '通报类型'
        },
      ],
      tableList: [
        // {
        //   id: '123',
        //   enterprise: '123',
        //   reportedTime: '',
        //   reportedNum: '丰炳春',
        //   channelsNum: '局领导',
        //   isolationNum: '123123'
        // }
      ],
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
          prop: 'bulletinTitle',
          label: '标题',
          align: 'left'
        },
        {
          prop: 'policeCode',
          label: '警号',
          align: 'left'
        },
        {
          prop: 'bulletinObject',
          label: '被通报对象',
          align: 'left'
        },
        {
          prop: 'bulletinDate',
          label: '通报时间',
          width: '180px',
          align: 'left'
        },
        {
          prop: 'problemNature',
          label: '问题性质',
          align: 'left'
        }
      ]
    }
  },
  methods: {
    // 查询
    handleSearch(params) {
      Object.assign(this.searchData, params);
      console.log(params)
      this.query();
    },
    // 分页点击事件
    afterCurrentPageClickHandle(val, next) {
      this.query(val);
      next();
    },
    // 查询列表
    query(nCurrent = 1) {
      const $this = this;
      findBulletinPage(
        Object.assign(
          {
            nCurrent: nCurrent,
            nSize: 10
          },
          $this.searchData
        )
      ).then(res => {
        console.log(res)
        this.$refs.recordSpTableRef.setPageInfo(
          nCurrent,
          res.data.size,
          res.data.total,
          res.data.records
        );
      })
    },
    // 图标分析
    getBulletinTypeStatistics() {
      const params = {
        userId: '5ba98b66cd3549b9b92ea8723e89207e'
      }
      bulletinTypeStatistics(params).then(res => {
        console.log(res)
      })
    },
    getBulletinExceptionStatistics() {
      const params = {
        userId: '5ba98b66cd3549b9b92ea8723e89207e'
      }
      bulletinExceptionStatistics(params).then(res => {
        console.log(res)
      })
    },
    getBulletinTimesStatistics() {
      const params = {
        userId: '5ba98b66cd3549b9b92ea8723e89207e'
      }
      bulletinTimesStatistics(params).then(res => {
        console.log(res)
      })
    }
  },
  mounted() {
    this.getBulletinTypeStatistics();
    this.getBulletinExceptionStatistics();
    this.getBulletinTimesStatistics();
    this.query();
  }
}
</script>

