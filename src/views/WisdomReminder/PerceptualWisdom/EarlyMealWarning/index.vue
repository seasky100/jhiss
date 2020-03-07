<template>
    <div class="container">
        <div class="page-title">
            <span>提前就餐预警</span>
        </div>
        <div class="content">
            <el-row class="bg-fff">
                <el-col :span="12">
                    <HistogramChart
                            :chart-data="repastPlace.data"
                            :label-map="repastPlace.labelMap"
                            title="预警次数"
                    />
                </el-col>
                <el-col :span="12">
                    <LineChart
                            :chart-data="creditCardTime.data"
                            :label-map="creditCardTime.labelMap"
                            title="次数"
                    />
                </el-col>
            </el-row>
            <div class="search-wrap">
                <div class="section-title">查询条件</div>
                <e-search
                        class="search-form"
                        @handleSearch="handleSearch"
                        :searchData="searchData"
                        :searchForm="searchForm"
                />
            </div>
            <div>
                <e-table
                        ref="recordSpTableRef"
                        :options="options"
                        :columns="columns"
                        :operates="operates"
                        :tableList="tableList"
                        @afterCurrentPageClick="afterCurrentPageClickHandle"
                />
            </div>
        </div>
        <!--详情-->
        <EarlyMealWarningDetail ref="earlyMealWarningDetail" />
    </div>
</template>

<script>
import HistogramChart from "@/components/histogram-chart";
import LineChart from '@/components/line-chart';
import { getRepastSiteWarnStatistics, getRepastWarnTimesStatistics } from '@/api/wisdom-reminder/perceptual-wisdom.js'
import EarlyMealWarningDetail from './modal/earlyMealWarningDetail'

export default {
  components: {
    HistogramChart,
    LineChart,
    EarlyMealWarningDetail
  },
  data() {
    return {
      // 就餐预警地点统计
      repastPlace: {
        data: {
          columns: ['place', 'num'],
          rows: [
            { place: '食堂1', num: 1 },
            { place: '食堂2', num: 2 },
            { place: '超市', num: 3 }
          ]
        },
        labelMap: {
          num: '次数'
        }
      },
      // 就餐预警次数统计
      creditCardTime: {
        data: {
          columns: ['date', 'num'],
          rows: [
            { date: '1', num: 2300 },
            { date: '2', num: 1300 },
            { date: '3', num: 2800 },
            { date: '4', num: 1500 },
            { date: '5', num: 3400 },
            { date: '6', num: 1500 },
            { date: '7', num: 1600 },
            { date: '8', num: 1230 },
            { date: '9', num: 5300 },
            { date: '10', num: 1200 },
            { date: '11', num: 1400 },
            { date: '12', num: 3300 },
          ]
        },
        labelMap: {
          num: '次数'
        }
      },
      // 表格
      searchData: {
          policeCode: '',
          userName: '',
          department: '',
          startTime: '',
          endTime: '',
          cardPlace: ''
      },
      searchForm: [
            {type: 'input', prop: 'policeCode', width: '120px', placeholder: '警号'},
            {type: 'input', prop: 'userName', width: '120px', placeholder: '姓名'},
            {
                type: 'select',
                prop: 'department',
                width: '150px',
                options: [],
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
                        placeholder: '起始日期'
                    },
                    {
                        prop: 'endTime',
                        format: '',
                        valueformat: '',
                        placeholder: '结束日期'
                    }
                ]
            }
      ],
      options: {
            pageSize: 10,
            hasIndex: false,
            currentPage: 1,
            loading: true,
            maxHeight: null,
            height: '500'
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
                prop: 'recordTime',
                label: '刷卡时间',
                align: 'left',
                type: 'date',
                dateFormat: 'yyyy-MM-dd'
            },
            {
                prop: 'recordPlace',
                label: '刷卡地点',
                align: 'left',
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
                        this.$refs.earlyMealWarningDetail.open(row);
                    },
                    showCallback: () => {
                        return true;
                    }
                }
            ]
        },
      tableList: [],
      userParams: {
          userID: '',
          deptId: '',
          role: ''
      }
    }
  },
  methods: {
        // 查询
        handleSearch(params) {
            // Object.assign(this.searchData, params);
            // this.query();
        },

        // 分页点击事件
        afterCurrentPageClickHandle(val, next) {
            // this.query(val);
            // next();
        },

        // 查询列表
        // query(nCurrent = 1) {
        //     const $this = this;
        //     getFindMealRecordPage(Object.assign({
        //         nCurrent: nCurrent,
        //         nSize: 10,
        //         orderByField: '',
        //         bulletinType: '',
        //         // isAsc: ''
        //     }, $this.searchData, $this.userId)).then((res) => {
        //         console.log(res);
        //         this.$refs.recordSpTableRef.setPageInfo(
        //             nCurrent,
        //             res.size,
        //             res.total,
        //             res.data
        //         );
        //     });
        // }
    },
  created() {
    // 就餐地点预警地点统计
    getRepastSiteWarnStatistics(this.userParams).then(() => {})

    // 每日就餐预警次数统计
    getRepastWarnTimesStatistics(this.userParams).then(() => {})
  }
};
</script>

<style lang="stylus" scoped>
@import "../../../../styles/common.styl"
</style>
