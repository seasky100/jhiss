<template>
  <div class="container">
    <div class="page-title">
      <img style="margin-right:8px;" src='@/utils/img/home_round_bar@2x.png' />
      <span>违规车管控</span>
    </div>
    <div class="content">
      <el-row class="bg-fff">
        <el-col :span="12" style="margin-right:10px;">
          <!-- 违规用车按人名统计 -->
          <e-histogram
            :chartSettings="violationSettings"
            :title="violationTitle"
            :chartData="violationTimesHistogram"
          />
        </el-col>
        <el-col :span="12">
          <!-- 违规用车按月统计 -->
          <!-- <ve-line
            :title="monthlyTitle"
            :data="monthlyData"
            :extend="monthlyExtend"
            :settings="monthlySettings"
            :legend-visible="false">
          </ve-line> -->
          <LineChart
          :title="monthlyTitle"
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
      <div class="search-wrap" style="height:360px;">
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
    <coordinate-info ref="coordinateInfo"/>
  </div>
</template>

<script>
import {
  findIlluseCarPage,
  monthIllUsecarStatistics,
  illUsecarHumanStatistics
} from '@/api/warn.js';
import CoordinateInfo from './modal/coordinateInfo';
import LineChart from "@/components/line-chart";
import { mapGetters } from 'vuex';

export default {
  components: {
    CoordinateInfo,
    LineChart
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  data() {
    return {
      violationTitle: {
        text: '违规用车按人名统计'
      },
      violationTimesHistogram: {
        columns: ['user_name', 'warnnum'],
        rows: []
      },
      violationSettings: {
        labelMap: {
          warnnum: '违规次数'
        }
      },
      monthlyTitle:'违规用车按月统计',
      monthlyData: {
        columns: ['everymonth', 'warnnum'],
        rows: []
      },
      monthlyExtend: {
        grid: {
            top: '70',
            bottom: '15',
            left: '25',
            right: '25'
        },
        series: {
          smooth: false
        }
      },
      monthlySettings: {
        labelMap: {
          warnnum: '违规次数'
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
      },
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
          label: '使用人',
          align: 'left'
        },
        {
          prop: 'department',
          label: '所属部门',
          align: 'left'
        },
        {
          prop: 'carNumber',
          label: '车牌号',
          align: 'left'
        },
        {
          prop: 'actualStartTime',
          label: '用车时间',
          align: 'left',
          type: 'date'
        },
        {
          prop: 'actualEndTime',
          label: '还车时间',
          align: 'left',
          type: 'date'
        },
        {
          prop: 'isException',
          label: '是否异常',
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
              this.$refs.coordinateInfo.open(row);
            },
            showCallback: () => {
              return true;
            }
          }
        ]
      },
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
    // 查询列表
    query(nCurrent = 1) {
      const $this = this;
      findIlluseCarPage(
        Object.assign(
          {
            nCurrent: nCurrent,
            nSize: 10,
            userId: $this.userId,
            role: '123',
            recordPlace: ''
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
    // 违规车按月统计
    getMonthIllUsecarStatistics() {
      const params = {
        userId: this.userId,
        deptId: '111',
        role: '111'
      }
      monthIllUsecarStatistics(params).then(res => {
        // console.log(res);
        let result = res.data;
        if (res.success && result && result.length > 0) {
          result.forEach(item => {
            item.everymonth = item.everymonth + '月'
          })
          this.monthlyData.rows = result;
        } 
      })
    },
    // 违规车按人统计
    getIllUsecarHumanStatistics() {
      const params = {
        userId: this.userId,
        deptId: '111',
        role: '111'
      }
      illUsecarHumanStatistics(params).then(res => {
        // console.log(res)
        if (res.success) {
          this.violationTimesHistogram.rows = res.data;
        }
      })
    }
  },
  mounted() {
    this.getMonthIllUsecarStatistics();
    this.getIllUsecarHumanStatistics();
    this.query();
  }
}
</script>

<style lang="stylus" scoped>
@import "../../../styles/common.styl"
</style>
