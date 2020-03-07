<template>
    <div class="container">
        <div class="page-title">
            <span>报销异常分析</span>
        </div>
        <div class="content">
            <el-row class="bg-fff">
                <el-col :span="12">
                    <HistogramChart
                            :chart-data="businessTrip.data"
                            :label-map="businessTrip.labelMap"
                            title="出差次数"
                    />
                </el-col>
                <el-col :span="12">
                    <LineChart
                            :chart-data="reimburse.data"
                            :label-map="reimburse.labelMap"
                            title="费用"
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
        <TraveManagementDetail ref="traveManagementDetail" />
    </div>
</template>

<script>
import HistogramChart from "@/components/histogram-chart";
import LineChart from '@/components/line-chart';
import { getTripPlaceStatistics, getTripMoneyStatistics, getFindTravelPage } from '@/api/wisdom-reminder/travel-management.js'
import TraveManagementDetail from './modal/traveManagementDetail';

export default {
  components: {
    HistogramChart,
    LineChart,
    TraveManagementDetail
  },
  data() {
    return {
      // 出差地点统计今年次数 柱状图x轴地点，y轴次数
      businessTrip: {
        data: {
          columns: ['place', 'num'],
          rows: []
        },
        labelMap: {
          num: '出差次数'
        }
      },
      // 报销额统计，今年 折线图x轴每个月，y轴费用
      reimburse: {
        data: {
          columns: ['months', 'COUNT'],
          rows: []
        },
        labelMap: {
            COUNT: '费用'
        }
      },
      // 差旅信息表格
      searchData: {
          policeCode: '',
          userName: '',
          department: '',
          startTime: '',
          endTime: ''
      },
      searchForm: [
            {type: 'input', prop: 'policeCode', width: '120px', placeholder: '警号'},
            {type: 'input', prop: 'userName', width: '120px', placeholder: '姓名'},
            {
                type: 'select',
                prop: 'dept_id',
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
              prop: 'reimbursementTime',
              label: '报销时间',
              align: 'left',
              type: 'date',
              dateFormat: 'yyyy-MM-dd'
          },
          {
              prop: 'reasons',
              label: '出差事由',
              align: 'left'
          },
          {
              prop: 'startTime',
              label: '出差时间',
              align: 'left',
              type: 'date',
              dateFormat: 'yyyy-MM-dd'
          },
          {
              prop: 'endTime',
              label: '归队时间',
              align: 'left',
              type: 'date',
              dateFormat: 'yyyy-MM-dd'
          },
          {
              prop: 'place',
              label: '出差地点',
              align: 'left'
          },
          {
              prop: 'isException',
              label: '分析结果',
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
                      this.$refs.traveManagementDetail.open(row);
                  },
                  showCallback: () => {
                      return true;
                  }
              }
          ]
      },
      tableList: [],
      userId: {
        userId: '2020'
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
            getFindTravelPage(Object.assign({
                nCurrent: nCurrent,
                nSize: 10,
                orderByField: ''
                // isAsc: ''
            }, $this.searchData, $this.userId)).then((res) => {
                this.$refs.recordSpTableRef.setPageInfo(
                    nCurrent,
                    res.size,
                    res.total,
                    res.data
                );
            })
        }
    },
  created() {
    // 出差地点统计今年次数 柱状图x轴地点，y轴次数
    getTripPlaceStatistics({userId: ''}).then((res) => {
      for (let key in res) {
        this.businessTrip.data.rows.push({place: key, num: res[key]})
      }
    })

    // 报销额统计，今年 折线图x轴每个月，y轴费用
    getTripMoneyStatistics({userId: '2020'}).then((res) => {
        this.reimburse.data.rows = res
    })

    // 报销额统计，今年 折线图x轴每个月，y轴费用
    this.query();
  }
};
</script>

<style lang="stylus" scoped>
@import "../../../styles/common.styl"
</style>
