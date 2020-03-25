<template>
  <div class="container">
    <div class="page-title">
      <img style="margin-right:8px;" src='@/utils/img/home_round_bar@2x.png' /> 
      <span>违规查询预警管控</span>
    </div>
    <div class="content">
      <el-row class="bg-fff">
        <el-col :span="12" style="margin-right:10px;">
          <!-- 被查询系统次数统计 -->
          <e-histogram
            :chartSettings="warnStatusSettings"
            :title="warnStatusTitle"
            :chartData="warnStatusStatistics"
          />
        </el-col>
        <el-col :span="12">
          <!-- 次数统计 -->
          <ve-line
            :title="title"
            :data="humanStatistics"
            :extend="chartExtend"
            :settings="chartSettings"
            :legend-visible="false">
          </ve-line>
        </el-col>
      </el-row>
      <div class="search-wrap" style="min-width:1245px;">
        <!-- <div class="section-title">查询条件</div> -->
        <e-search
          class="search-form"
          @handleSearch="handleSearch"
          :searchData="searchData"
          :searchForm="searchForm" />
      </div>
      <div class="search-wrap" style="height:350px;">
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
    <violation-info ref="violationInfo" />
  </div>
</template>

<script>
import { getHumanStatistics, getWarnStatusStatistics, getWarnPage } from '@/api/warn.js';
import ViolationInfo from './modal/violationInfo';
import { mapGetters } from 'vuex';

export default {
  components: {
    ViolationInfo
  },
  data() {
    this.chartExtend = {
      grid: {
          top: '70',
          bottom: '15',
          left: '25',
          right: '25'
      },
      series: {
        smooth: true
      }
    };
    this.chartSettings = {
      labelMap: {
        warnnum: '次数'
      },
      area: true,//是否显示为面积图
      itemStyle:{ //面积图颜色设置
        color:{
            type:'linear',
            x:0,
            y:0,
            x2:0,
            y2:1,
            colorStops:[
                {
                    offset: 0,
                    color: '#3182FF', // 0% 处的颜色
                }, 
                {
                    offset: 1, 
                    color: '#3182FF' // 100% 处的颜色
                },
            ],
            globalCoord: false // 缺省为 false
        }
      },
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
        height:'320'
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
              this.$refs.violationInfo.open(row);
            },
            showCallback: () => {
              return true;
            }
          }
        ]
      },
      warnStatusTitle: {
        text: '被查询系统次数'
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
        text: '次数统计',
        top: '15',
        left: '20',
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
      const $this = this;
      getWarnPage(
        Object.assign(
          {
            nCurrent: nCurrent,
            nSize: 10,
            user_id: $this.userId,
            isAsc: false,
            orderByField: 'warnTime',
            role: 10,
            warnType: 4
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
@import "../../../styles/common.styl"
</style>
