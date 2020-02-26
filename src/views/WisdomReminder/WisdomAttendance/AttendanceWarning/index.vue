<template>
  <div>
    <el-row>
      <el-col :span="12">
        <ve-histogram :data="warnStatusStatistics" :legend-visible="false" :settings="chartSettings1"></ve-histogram>
      </el-col>
      <el-col :span="12">
        <ve-line :data="humanStatistics" :extend="chartExtend" :settings="chartSettings" :legend-visible="false"></ve-line>
      </el-col>
    </el-row>
    <div>
      <div class="section-title">查询条件</div>
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
import { getHumanStatistics, getWarnStatusStatistics, getWarnPage } from '@/api/warn.js';

export default {
  data() {
    this.chartExtend = {
      series: {
        smooth: false
      }
    };
    this.chartSettings = {
      labelMap: {
        warnnum: '数量'
      }
    }
    this.chartSettings1 = {
      labelMap: {
        num: '数量'
      }
    }
    return {
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
        {type: 'input', prop: 'userName', width: '120px', placeholder: '姓名'},
        {type: 'input', prop: 'reason', width: '120px', placeholder: '预警原因'},
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
          prop: 'dept_id',
          width: '150px',
          options: [{label:'治安部门', value:'0'},{label:'交通管理部门', value:'1'}],
          change: row => console.log(row),
          placeholder: '所属部门'
        },
        {
          type: 'select',
          prop: 'response',
          width: '150px',
          options: [{label:'否', value: 0},{label:'是', value: 1}],
          change: row => console.log(row),
          placeholder: '是否反馈'
        },
      ],
      tableData: [],
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
          label: '警号',
          align: 'left'
        },
        {
          prop: 'policeCode',
          label: '姓名',
          align: 'left'
        },
        {
          prop: 'bulletinObject',
          label: '所属部门',
          align: 'left'
        },
        {
          prop: 'bulletinDate',
          label: '预警时间',
          align: 'left'
        },
        {
          prop: 'problemNature',
          label: '预警原因',
          align: 'left'
        },
        {
          prop: 'problemNature',
          label: '反馈内容',
          align: 'left'
        },
        {
          prop: 'problemNature',
          label: '预警级别',
          align: 'left'
        }
      ],
      warnStatusStatistics: {
        columns: ['status', 'num'],
        rows: []
      },
      humanStatistics: {
        columns: ['user_name', 'warnnum'],
        rows: []
      }
    }
  },
  methods: {
    // 查询
    handleSearch(params) {
      Object.assign(this.searchData, params);
      console.log(params)
      this.query();
    },
    // 获取考勤预警按人员名称统计
    getHumanStatistics() {
      const params = {
        userId: '5ba98b66cd3549b9b92ea8723e89207e'
      }
      getHumanStatistics(params).then(res => {
        console.log(res)
        if (res.success) {
          this.humanStatistics.rows = res.data;
        }
      })
    },
    // 预警处置情况统计x未反馈，已反馈，y轴对应次数
    getWarnStatusStatistics() {
      const params = {
        userId: '5ba98b66cd3549b9b92ea8723e89207e'
      }
      getWarnStatusStatistics(params).then(res => {
        console.log(res)
        if (res.success) {
          let result = [];
          for (let item in res.data) {
            result.push({
              status: item,
              num: res.data[item]
            })
          }
          console.log(result);
          this.warnStatusStatistics.rows = result;
        }
      })
    },
    // 查找列表数据
    query(nCurrent = 1) {
      const $this = this;
      getWarnPage(
        Object.assign(
          {
            nCurrent: nCurrent,
            nSize: 10,
            user_id: '5ba98b66cd3549b9b92ea8723e89207e',
            isAsc: false,
            orderByField: 'warnTime',
            role: 10
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
  },
  mounted() {
    this.getHumanStatistics();
    this.getWarnStatusStatistics();
    this.query();
  }
}
</script>

<style lang="stylus" scoped>
.section-title{
  color: rgb(50, 50, 50);
  background: rgb(245, 246, 247);
  font-weight: 700;
  padding: 8px;
}
</style>
