<template>
  <div class="container">
    <div class="page-title">
      <img style="margin-right:8px;" src='@/utils/img/home_round_bar@2x.png' /> 
      <span>涉嫌违法管控</span>
    </div>
    <div class="content">
      <el-row class="bg-fff">
        <el-col :span="12" style="margin-right:10px;">
          <!-- 被查询系统次数统计 -->
          <e-histogram
            :chartSettings="warnStatusSettings"
            :title="warnStatusTitle"
            :chartData="warnStatusStatistics"
            :xAxis="axisOptions"
          />
        </el-col>
        <el-col :span="12">
          <!-- 次数统计 -->
          <!-- <ve-line
            :title="title"
            :data="humanStatistics"
            :extend="chartExtend"
            :settings="chartSettings"
            :legend-visible="false">
          </ve-line> -->
          <LineChart
          :title="title"
          :chartData="humanStatistics"
          :chartSettings="chartSettings"
          >
        </LineChart>
        </el-col>
      </el-row>
      <div class="search-wrap" style="min-width:1000px;">
        <!-- <div class="section-title">查询条件</div> -->
        <e-search
          class="search-form"
          @handleSearch="handleSearch"
          :searchData="searchData"
          :searchForm="searchForm" />
      </div>
      <div class="search-wrap" style="height:444px;">
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
    <suspected-info ref="suspectedInfo" />
  </div>
</template>

<script>
import {
  findIllgalPage,
  illgalBySource,
  illgalByDayStatistics
} from '@/api/warn.js';
import SuspectedInfo from './modal/suspectedInfo';
import LineChart from "@/components/line-chart";
import { mapGetters } from 'vuex';

export default {
  components: {
    SuspectedInfo,
    LineChart
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
      },
      'xAxis.0.axisLabel.rotate': 30
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
    this.axisOptions = {
      axisLabel: {
        rotate: 30
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
        startTime: '',
        endTime: ''
      },
      searchForm: [
        {type: 'input', prop: 'policeCode', width: '120px', placeholder: '警号'},
        {type: 'input', prop: 'userName', width: '120px', placeholder: '姓名'},
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
        }
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
        height:'340'
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
          label: '部门',
          align: 'left'
        },
        {
          prop: 'source',
          label: '来源',
          align: 'left'
        },
        {
          prop: 'warnReason',
          label: '事由',
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
              this.$refs.suspectedInfo.open(row);
            },
            showCallback: () => {
              return true;
            }
          }
        ]
      },
      warnStatusTitle: {
        text: '涉嫌违法统计'
      },
      warnStatusSettings: {
        labelMap: {
          warnnum: '次数'
        }
      },
      warnStatusStatistics: {
        columns: ['source', 'warnnum'],
        rows: []
      },
      humanStatistics: {
        columns: ['warndate', 'warnnum'],
        rows: []
      },
      title: '次数统计',
      
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
    // 折线图
    getillgalByDayStatistics() {
      const params = {
        userId: this.userId
      }
      illgalByDayStatistics(params).then(res => {
        // console.log(res)
        if (res.success) {
          this.humanStatistics.rows = res.data;
        }
      })
    },
    // 柱状图
    getillgalBySource() {
      const params = {
        userId: this.userId
      }
      illgalBySource(params).then(res => {
        if (res.success) {
          this.warnStatusStatistics.rows = res.data;
        }
      })
    },
    // 查找列表数据
    query(nCurrent = 1) {
      const $this = this;
      findIllgalPage(
        Object.assign(
          {
            nCurrent: nCurrent,
            nSize: 10,
            user_id: $this.userId,
            dept_id: '1000',
            role: '123'
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
    this.getillgalByDayStatistics();
    this.getillgalBySource();
    this.query();
  }
}
</script>

<style lang="stylus" scoped>
@import "../../../styles/common.styl"
</style>
