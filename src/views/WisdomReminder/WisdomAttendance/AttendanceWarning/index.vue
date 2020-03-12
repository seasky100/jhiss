<template>
  <div class="container">
    <div class="page-title">
      <span>考勤预警管控</span>
    </div>
    <div class="content">
      <el-row class="bg-fff">
        <el-col :span="12">
          <!-- 预警处置情况统计 -->
          <e-histogram
            :chartSettings="warnStatusSettings"
            :title="warnStatusTitle"
            :chartData="warnStatusStatistics"
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
          :operates="operates"
          @afterCurrentPageClick="afterCurrentPageClickHandle"
        />
      </div>
    </div>
    <!-- 预警详情 -->
    <warning-detail ref="warningDialog" />
  </div>
</template>

<script>
import {
  getHumanStatistics,
  getWarnStatusStatistics,
  getWarnPage
} from '@/api/warn.js';
import { mapGetters } from 'vuex';
import warningDetail from './modal/warningDetail';

export default {
  components: {
    warningDetail
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  data() {
    this.chartExtend = {
      series: {
        smooth: false
      }
    };
    this.chartSettings = {
      labelMap: {
        warnnum: '次数'
      }
    }
    // this.chartSettings1 = {
    //   labelMap: {
    //     num: '数量'
    //   }
    // }
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
          prop: 'warnTime',
          label: '预警时间',
          align: 'left',
          type: 'date',
          dateFormat: 'yyyy-MM-dd'
        },
        {
          prop: 'warnReason',
          label: '预警原因',
          align: 'left'
        },
        {
          prop: 'content',
          label: '反馈内容',
          align: 'left'
        },
        {
          prop: 'warnLevel',
          label: '预警级别',
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
              this.$refs.warningDialog.open(row);
            },
            showCallback: () => {
              return true;
            }
          }
        ]
      },
      warnStatusTitle: {
        text: '预警处置情况统计'
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
        columns: ['user_name', 'warnnum'],
        rows: []
      },
      title: {
        text: '考勤预警人员统计',
        left: 'center'
      }
    }
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
    // 获取考勤预警按人员名称统计
    getHumanStatistics() {
      const params = {
        userId: this.userId
      }
      getHumanStatistics(params).then(res => {
        // console.log(res)
        if (res.success) {
          this.humanStatistics.rows = res.data;
        }
      })
    },
    // 预警处置情况统计x未反馈，已反馈，y轴对应次数
    getWarnStatusStatistics() {
      const params = {
        userId: this.userId
      }
      getWarnStatusStatistics(params).then(res => {
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
        }
      })
    },
    // 查找列表数据
    query(nCurrent = 1) {
      const userInfo = JSON.parse(sessionStorage.userInfo)
      const userId = userInfo.info
      const $this = this;
      getWarnPage(
        Object.assign(
          {
            nCurrent: nCurrent,
            nSize: 10,
            user_id: userId,
            isAsc: false,
            orderByField: 'warnTime',
            role: 10,
            warnType: 1
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
    this.getHumanStatistics();
    this.getWarnStatusStatistics();
    this.query();
  }
}
</script>

<style lang="stylus" scoped>
@import "../../../../styles/common.styl"
</style>
