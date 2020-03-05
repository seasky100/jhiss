<template>
    <el-container class="wisdom-attendance-container full-height">
        <el-header height="40px">刷卡情况分析</el-header>
        <el-main>
            <div class="main">
                <el-row :gutter="16" class="top-chart">
                    <el-col :span="12">
                        <HistogramChart
                                :chart-data="creditCardSite.data"
                                :label-map="creditCardSite.labelMap"
                                title="刷卡次数(接口无数据)"
                        />
                    </el-col>
                    <el-col :span="12">
                        <LineChart
                                :chart-data="creditCardTime.data"
                                :label-map="creditCardTime.labelMap"
                                title="次数(接口无数据)"
                        />
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <div class="search-comtainer">
                            <div class="query-condition">
                                <div class="title">查询条件</div>
                                <div class="search">
                                    <e-search
                                            class="search-form"
                                            @handleSearch="handleSearch"
                                            :searchData="searchData"
                                            :searchForm="searchForm" />
                                </div>
                            </div>
                            <el-table
                                    :data="tableData"
                                    style="width: 100%"
                                    size="mini">
                                <el-table-column
                                        prop="policeCode"
                                        label="警号">
                                </el-table-column>
                                <el-table-column
                                        prop="userName"
                                        label="姓名">
                                </el-table-column>
                                <el-table-column
                                        prop="department"
                                        label="部门">
                                </el-table-column>
                                <el-table-column
                                        prop="reimbursementTime"
                                        label="刷卡地点">
                                </el-table-column>
                                <el-table-column
                                        prop="reasons"
                                        label="刷卡时间">
                                </el-table-column>
                                <el-table-column
                                        prop="startTime"
                                        label="金额">
                                </el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <el-button size="mini" >详情</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="pagination">
                                <el-pagination
                                        background
                                        layout="prev, pager, next"
                                        :total="total">
                                </el-pagination>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import HistogramChart from "@/components/histogram-chart";
import LineChart from '@/components/line-chart';
import { getTimesStatistics, getDayTimesStatistics, getFindMealRecordPage } from '@/api/wisdom-reminder/perceptual-wisdom.js'

export default {
  components: {
    HistogramChart,
    LineChart
  },
  data() {
    return {
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
          prop: 'cardPlace',
          width: '150px',
          options: [{label: '超市', value: 'cs'},{label: '食堂', value: 'st'},{label: '等等', value: 'dd'}],
          change: row => console.log(row),
          placeholder: '刷卡地点'
        }
      ],
      // 刷卡情况（月）柱状图x轴刷卡地点y轴次数
      creditCardSite: {
        data: {
          columns: ['place', 'num'],
          rows: [
            { place: '食堂1', num: 1 },
            { place: '食堂2', num: 2 },
            { place: '超市', num: 3 }
          ]
        },
        labelMap: {
          num: '刷卡次数'
        }
      },
      // 报销额统计，今年 折线图x轴每个月，y轴费用
      creditCardTime: {
        data: {
          columns: ['month', 'expenses'],
          rows: [
            { month: '1月', expenses: 2300 },
            { month: '2月', expenses: 1300 },
            { month: '3月', expenses: 2800 },
            { month: '4月', expenses: 1500 },
            { month: '5月', expenses: 3400 },
            { month: '6月', expenses: 1500 },
            { month: '7月', expenses: 1600 },
            { month: '8月', expenses: 1230 },
            { month: '9月', expenses: 5300 },
            { month: '10月', expenses: 1200 },
            { month: '11月', expenses: 1400 },
            { month: '12月', expenses: 3300 },
          ]
        },
        labelMap: {
          expenses: '费用'
        }
      },
      // 获取刷卡记录分页
      params: {
        nCurrent: 1, // 当前页(大于等于0)
        nSize: 10, // 每页记录数量
        orderByField: '', // 排序字段
        isAsc: '', // 是否升序
        userId: '', // 用户id
        policeCode: '', // 警员编号
        userName: '', // 用户名称
        department: '', // 部门
        recordPlace: '', // 刷卡地点
        startTime: '', // 开始时间
        endTime: '', // 结束时间
        bulletinType: '' // 通报类型
      },
      tableData: [],
      total: 0
    }
  },
  methods: {
    handleSearch() {}
  },
  created() {
    // 刷卡情况（月）柱状图x轴刷卡地点y轴次数
    getTimesStatistics({userId: ''}).then((res) => {
      console.log(res);
    })

    // 刷卡情况（月）x轴每天y轴次数
    getDayTimesStatistics({userId: '123'}).then((res) => {
      console.log(res);
    })

    // 获取刷卡记录分页
    getFindMealRecordPage(this.params).then(() => {})
  }
};
</script>

<style scoped>
.full-height {
    height: 100%;
}
.wisdom-attendance-container {
    background-color: #f2f5f7;
}
.wisdom-attendance-container .main {
    background-color: #fff;
    padding: 16px;
}
.wisdom-attendance-container .el-header {
    display: flex;
    align-items: center;
    background-color: #fff;
    font-size: 20px;
}
.wisdom-attendance-container .top-chart {
    height: 250px;
}
.wisdom-attendance-container .el-row {
    margin-bottom: 16px;
}
.wisdom-attendance-container .el-row:last-of-type {
    margin-bottom: 0;
}

.wisdom-attendance-container .table {
    height: 70%;
}
.el-col {
    height: 100%;
}
.search-comtainer {
    height: 100%;
}

.search-comtainer .query-condition {
    border: 1px solid #E5E9F4;
}

.search-comtainer .query-condition .title {
    background-color: #F5F6F7;
    padding: 8px;
    border-bottom: 1px solid #E5E9F4;
}

.search-comtainer .query-condition .search {
    padding: 8px;
}
.search-comtainer .pagination {
    display: flex;
    justify-content: center;
    padding-top: 16px;
}
</style>
