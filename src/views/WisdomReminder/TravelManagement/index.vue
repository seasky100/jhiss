<template>
    <el-container class="wisdom-attendance-container full-height">
        <el-header height="40px">报销异常分析</el-header>
        <el-main>
            <div class="main">
                <el-row :gutter="16" class="top-chart">
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
                                    title="费用(接口无数据data: [])"
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
                                        label="报销时间">
                                </el-table-column>
                                <el-table-column
                                        prop="reasons"
                                        label="出差事由">
                                </el-table-column>
                                <el-table-column
                                        prop="startTime"
                                        label="出差时间">
                                </el-table-column>
                                <el-table-column
                                        prop="endTime"
                                        label="归队时间">
                                </el-table-column>
                                <el-table-column
                                        prop="place"
                                        label="出差地点">
                                </el-table-column>
                                <el-table-column
                                        prop="isException"
                                        label="分析结果">
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
import { getTripPlaceStatistics, getTripMoneyStatistics, getFindTravelPage } from '@/api/wisdom-reminder/travel-management.js'

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
      // 差旅信息表格
      params: {
        nCurrent: 1, // 当前页(大于等于0)
        nSize: 10, // 每页记录数量
        orderByField: '', // 排序字段
        isAsc: '', // 是否升序
        policeCode: '', // 警员编号
        userName: '', // 用户名称
        department: '', // 部门
        startTime: '', // 开始时间
        endTime: '', // 结束时间
        userId: '' // 用户ID
      },
      tableData: [],
      total: 0
    }
  },
  methods: {
    // getTableData(current) {
    //   console.log(current);
    // }
    handleSearch() {}
  },
  created() {
    // 出差地点统计今年次数 柱状图x轴地点，y轴次数
    getTripPlaceStatistics({userId: ''}).then((res) => {
      for (let key in res) {
        this.businessTrip.data.rows.push({place: key, num: res[key]})
      }
    })

    // 报销额统计，今年 折线图x轴每个月，y轴费用
    getTripMoneyStatistics({userId: ''}).then((res) => {
      console.log(res); // 无数据data: []
    })

    // 报销额统计，今年 折线图x轴每个月，y轴费用
    getFindTravelPage({nCurrent: 1, nSize: 10}).then((res) => {
      // console.log(res);
      this.tableData = res.data
      this.total = res.total
    })
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
