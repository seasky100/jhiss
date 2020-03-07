<template>
  <div class="container">
    <div class="page-title">
      <span>请假加班</span>
    </div>
    <div class="content">
      <el-row class="bg-fff">
        <el-col :span="12">
          <!-- 预警处置情况统计 -->
          <e-histogram
            :chartSettings="warnStatusSettings"
            :title="warnStatusTitle"
            :chartData="warnStatusStatistics"
            :xAxis="axisOptions"
          />
        </el-col>
        <el-col :span="12">
          <!-- 考勤预警人员统计 -->
          <ve-line
            :title="title"
            :data="humanStatistics"
            :extend="chartExtend"
            :settings="chartSettings"
            :legend-visible="false">
          </ve-line>
        </el-col>
      </el-row>
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
import { getHumanStatistics, getWarnStatusStatistics, getWarnPage } from '@/api/warn.js';

import {
  getVacationPage,
  getVacationApplyByMonth,
  getVacationExceptionStatistics
  } from '@/api/integrity-risk-serve.js';
  import { mapGetters } from 'vuex';

export default {
  data() {
    this.chartExtend = {
      series: {
        smooth: false
      }
    };
    this.chartSettings = {
      labelMap: {
        applynum: '次数'
      }
    }
    this.axisOptions = {
      axisLabel: {
        rotate: 30
      }
    }
    return {
      searchData: {
        userName: '',
        department: '',
        applyType: '',
        startTime: '',
        endTime: ''
      },
      searchForm: [
        {type: 'input', prop: 'userName', width: '120px', placeholder: '用户名称'},
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
          prop: 'applyType',
          width: '150px',
          options: [{label:'否', value: 0},{label:'是', value: 1}],
          change: row => console.log(row),
          placeholder: '申请类型'
        },
      ],
      tableList: [],
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
          label: '警号',
          align: 'left'
        },
        {
          prop: 'userName',
          label: '姓名',
          align: 'left'
        },
        {
          prop: 'department',
          label: '所属部门',
          align: 'left'
        },
        {
          prop: 'applyTime',
          label: '预警时间',
          align: 'left',
          type: 'date'
        },
        {
          prop: 'exceptionReason',
          label: '请假原因',
          align: 'left'
        },
        {
          prop: 'applyType',
          label: '请假类型',
          align: 'left'
        },
        {
          prop: 'approvalState',
          label: '审批状态',
          align: 'left'
        },
        {
          prop: 'isException',
          label: '是否异常',
          align: 'left'
        },
        {
          prop: 'exceptionReason',
          label: '异常原因',
          align: 'left'
        }
      ],
      warnStatusTitle: {
        text: '请假异常情况统计'
      },
      warnStatusSettings: {
        labelMap: {
          num: '次数'
        }
      },
      warnStatusStatistics: {
        columns: ['status', 'num'],
        rows: []
      },
      humanStatistics: {
        columns: ['month', 'applynum'],
        rows: []
      },
      title: {
        text: '请假统计',
        left: 'center'
      }
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  methods: {
    // 查询
    handleSearch(params) {
      Object.assign(this.searchData, params);
      // console.log(params)
      this.query();
    },
    // 分页点击事件
    afterCurrentPageClickHandle(val, next) {
      this.query(val);
      next();
    },
    // 请假按月统计
    getVacationApply() {
      const params = {
        userId: this.userId,
        deptId: '111',
        role: '10'
      }
      getVacationApplyByMonth(params).then(res => {
        // console.log(res)
        if (res.success && res.data && res.data.length > 0) {
          const vacationData = res.data;
          vacationData.forEach(item => {
            item.month = item.month + '月'
          })
          this.humanStatistics.rows = vacationData;
        }
      })
    },
    // 请假异常情况统计
    getExceptionStatistics() {
      const params = {
        userId: this.userId
      }
      getVacationExceptionStatistics(params).then(res => {
        // console.log(res)
        if (res.success && res.data) {
          let result = [];
          for (let item in res.data) {
            result.push({
              status: item,
              num: res.data[item]
            })
          }
          // console.log(result);
          this.warnStatusStatistics.rows = result;
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    // 查找列表数据
    query(nCurrent = 1) {
      const $this = this;
      getVacationPage(
        Object.assign(
          {
            nCurrent: nCurrent,
            nSize: 10,
            user_id: $this.userId
          },
          $this.searchData
        )
      ).then(res => {
        // console.log(res)
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
    this.getVacationApply();
    this.getExceptionStatistics();
    this.query();
  }
}
</script>

<style lang="stylus" scoped>
@import "../../../styles/common.styl"
</style>
