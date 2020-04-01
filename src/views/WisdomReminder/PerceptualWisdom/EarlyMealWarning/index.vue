<template>
    <div class="container">
        <div class="page-title">
            <img style="margin-right:8px;" src='@/utils/img/home_round_bar@2x.png' /> 
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
            <div class="search-wrap" style="min-width:1245px;">
                <!-- <div class="section-title">查询条件</div> -->
                <e-search
                        class="search-form"
                        @handleSearch="handleSearch"
                        :searchData="searchData"
                        :searchForm="searchForm"
                />
            </div>
            <div class="search-wrap" style="height:750px;">
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
import { getRepastSiteWarnStatistics, getRepastWarnTimesStatistics, getFindMealCardPage } from '@/api/wisdom-reminder/perceptual-wisdom.js'
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
            userInfo:{},
          columns: ['record_place', 'warnnum'],
          rows: []
        },
        labelMap: {
          warnnum: '次数'
        }
      },
      // 就餐预警次数统计
      creditCardTime: {
        data: {
          columns: ['record_time', 'warnnum'],
          rows: []
        },
        labelMap: {
          warnnum: '次数'
        }
      },
      // 表格
      searchData: {
          policeCode: '',
          userName: '',
          department: '',
          startTime: '',
          endTime: '',
          recordPlace: ''
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
            },
            {
                type: 'select',
                prop: 'recordPlace',
                width: '150px',
                options: [{label: '超市', value: '超市'},{label: '食堂', value: '食堂'}],
                change: row => console.log(row),
                placeholder: '刷卡地点'
            }
      ],
      options: {
            pageSize: 10,
            hasIndex: false,
            currentPage: 1,
            loading: true,
            maxHeight: null,
            height: '368'
        },
      columns: [
            {
                prop: 'police_code',
                label: '警号',
                align: 'left'
            },
            {
                prop: 'user_name',
                label: '姓名',
                align: 'left'
            },
            {
                prop: 'department',
                label: '部门',
                align: 'left'
            },
            {
                prop: 'record_time',
                label: '刷卡时间',
                align: 'left',
                type: 'date',
                dateFormat: 'yyyy-MM-dd'
            },
            {
                prop: 'record_place',
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
          deptId: '123',
          role: '11'
      }
    }
  },
  methods: {
        // 查询
        handleSearch(params) {
            Object.assign(this.searchData, params);
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
            getFindMealCardPage(Object.assign({
                nCurrent: nCurrent,
                nSize: 10,
                orderByField: ''
            }, $this.searchData, {userId: this.userParams.userID, role: '2020'})).then((res) => {
                console.log(res);
                this.$refs.recordSpTableRef.setPageInfo(
                    nCurrent,
                    res.size,
                    res.total,
                    res.data
                );
            });
        }
    },
  created() {
    this.userInfo = JSON.parse(sessionStorage.userInfo)
    this.userParams.userID = this.userInfo.info
    // 就餐地点预警地点统计 (给参数userParams会无数据)
    getRepastSiteWarnStatistics().then((res) => {
        this.repastPlace.data.rows = res
    })

    // 每日就餐预警次数统计 (给参数userParams会无数据)
    getRepastWarnTimesStatistics().then((res) => {
        this.creditCardTime.data.rows = res
    })

    // 提前就餐分页
    this.query()
  }
};
</script>

<style lang="stylus" scoped>
@import "../../../../styles/common.styl";
</style>
