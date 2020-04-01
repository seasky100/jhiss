<template>
    <div class="container">
        <div class="page-title">
            <span>刷卡情况分析</span>
        </div>
        <div class="content">
            <el-row class="bg-fff">
                <el-col :span="12">
                    <HistogramChart
                            :chart-data="creditCardSite.data"
                            :label-map="creditCardSite.labelMap"
                            title="刷卡次数"
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
        <CreditCardDetail ref="creditCardDetail" />
    </div>
</template>

<script>
import HistogramChart from "@/components/histogram-chart";
import LineChart from '@/components/line-chart';
import { getTimesStatistics, getDayTimesStatistics, getFindMealRecordPage } from '@/api/wisdom-reminder/perceptual-wisdom.js'
import CreditCardDetail from './modal/creditCardDetail'

export default {
  components: {
    HistogramChart,
    LineChart,
    CreditCardDetail
  },
  data() {
    return {
      // 刷卡情况（月）柱状图x轴刷卡地点y轴次数
      creditCardSite: {
        data: {
          columns: ['place', 'num'],
          rows: []
        },
        labelMap: {
          num: '次数'
        }
      },
      // 报销额统计，今年 折线图x轴每个月，y轴费用
      creditCardTime: {
        data: {
          columns: ['months', 'COUNT'],
          rows: []
        },
        labelMap: {
          COUNT: '次数'
        }
      },
      // 获取刷卡记录分页
      searchData: {
          policeCode: '',
          userName: '',
          department: '',
          recordPlace: '',
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
            },
            {
                type: 'select',
                prop: 'recordPlace',
                width: '150px',
                options: [{label: '超市', value: '超市'},{label: '食堂', value: '食堂'},{label: '等等', value: '等等'}],
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
                prop: 'recordPlace',
                label: '刷卡地点',
                align: 'left',
            },
            {
                prop: 'recordTime',
                label: '刷卡时间',
                align: 'left',
                type: 'date',
                dateFormat: 'yyyy-MM-dd'
            },
            {
                prop: 'money',
                label: '金额',
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
                        this.$refs.creditCardDetail.open(row);
                    },
                    showCallback: () => {
                        return true;
                    }
                }
            ]
        },
      tableList: [],
      userId: {
          userId: ''
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
            getFindMealRecordPage(Object.assign({
                nCurrent: nCurrent,
                nSize: 10,
                orderByField: 'recordTime',
                bulletinType: '',
                isAsc : false,
                userId :  $this.userId
            }, $this.searchData)).then((res) => {
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
      debugger
      this.userId = sessionStorage.userId
      const data = {
          userId : this.userId
      }
    // 刷卡情况（月）柱状图x轴刷卡地点y轴次数
    getTimesStatistics(data).then((res) => {
        for (let key in res) {
            this.creditCardSite.data.rows.push({
                place: key,
                num: res[key]
            })
        }
    });

    // 刷卡情况（月）x轴每天y轴次数
    getDayTimesStatistics(data).then((res) => {
        this.creditCardTime.data.rows = res
    });

    // 获取刷卡记录分页
    this.query()
  }
};
</script>

<style lang="stylus" scoped>
@import "../../../../styles/common.styl"
</style>
