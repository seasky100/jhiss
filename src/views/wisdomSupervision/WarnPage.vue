<template>
    <div class="container">
        <!-- <div class="page-title">
            <img style="margin-right:8px;" src='@/utils/img/home_round_bar@2x.png' /> 
            <span>提前就餐预警</span>
        </div> -->
        <div class="content">
            <!-- <el-row class="bg-fff">
                <el-col :span="12">
                    <HistogramChart
                            :chart-data="repastPlace.data"
                            :label-map="repastPlace.labelMap"
                            title="部门预警次数(Top5)"
                    />
                </el-col>
                <el-col :span="12">
                    <LineChart
                            :chart-data="creditCardTime.data"
                            :label-map="creditCardTime.labelMap"
                            title="每日预警次数"
                    />
                </el-col>
            </el-row> -->

            <div class="search-wrap" style="height:430px;">
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
        <earlyWarningDetail ref="earlyWarningDetail" />
    </div>
</template>

<script>
// import HistogramChart from "@/components/histogram-chart";
// import LineChart from '@/components/line-chart';
import { getRepastSiteWarnStatistics, getRepastWarnTimesStatistics, getFindMealCardPage } from '@/api/wisdom-reminder/perceptual-wisdom.js'
import earlyWarningDetail from './modal/earlyWarningDetail'

export default {
  components: {
    // HistogramChart,
    // LineChart,
    earlyWarningDetail
  },
  data() {
    return {
      // 就餐预警地点统计
      repastPlace: {
        data: {
            userInfo:{},
          columns: ['department', 'warnnum'],
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
      // searchData: {
      //     policeCode: '',
      //     userName: '',
      //     department: '',
      //     startTime: '',
      //     endTime: '',
      //     orderByField: 'warnTime',
      //     isAsc: false,
      //     recordPlace: ''
      // },

      options: {
            pageSize: 10,
            hasIndex: false,
            currentPage: 1,
            loading: true,
            maxHeight: null,
            height: '556'
        },
      columns: [
            // {
            //     prop: 'police_code',
            //     label: '警号',
            //     align: 'left'
            // },
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
                prop: 'warnReason',
                label: '预警原因',
                align: 'left'
            },
            {
                prop: 'warnTime',
                label: '预警时间',
                align: 'left',
                type: 'date',
                dateFormat: 'yyyy-MM-dd HH:mm:ss'
            },
            {
                prop: 'comment',
                label: '备注',
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
                        this.$refs.earlyWarningDetail.open(row);
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
            }, $this.searchData)).then((res) => {
                console.log(res.data);
                this.$refs.recordSpTableRef.setPageInfo(
                    nCurrent,
                    res.size,
                    res.total,
                    res.data
                );
            });
        },
      sortfunc(attr, rev) {
          if (rev == undefined) {
              rev = 1
          }
          return (a, b) => {
              a = a[attr]
              b = b[attr]
              if (a < b) {
                  return rev * 1
              }
              if (a > b) {
                  return rev * -1
              }
              return 0
          }
      },
    },
  created() {
    this.userInfo = JSON.parse(sessionStorage.userInfo)
    this.userParams.userID = this.userInfo.info
    // 就餐地点预警地点统计 (给参数userParams会无数据)
    const params = {
        warnType: 11,
    }
    getRepastSiteWarnStatistics(params).then((res) => {
        const data = res.sort(this.sortfunc('warnnum')) // 排序后获得前五组数值最大的数据
        const arry = data.splice(0,5)
        this.repastPlace.data.rows = arry
    })

    // 每日就餐预警次数统计 (给参数userParams会无数据)
    getRepastWarnTimesStatistics(params).then((res) => {
        this.creditCardTime.data.rows = res
    })

    // 提前就餐分页
    this.query()
  }
};
</script>

<style lang="stylus" scoped>
@import "../../styles/common.styl";
</style>
