<template>
    <el-container class="wisdom-attendance-container full-height">
        <el-header height="40px">提前就餐预警</el-header>
        <el-main>
            <div class="main">
                <el-row :gutter="16" class="top-chart">
                    <el-col :span="12">
                        <HistogramChart
                                :chart-data="repastPlace.data"
                                :label-map="repastPlace.labelMap"
                                title="预警次数(接口无数据)"
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
                                        prop="reasons"
                                        label="刷卡时间">
                                </el-table-column>
                                <el-table-column
                                        prop="reimbursementTime"
                                        label="刷卡地点">
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
import { getRepastSiteWarnStatistics } from '@/api/wisdom-reminder/perceptual-wisdom.js'

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
      params: {},
      tableData: [],
      total: 0
    }
  },
  methods: {
    handleSearch() {}
  },
  created() {
    // 就餐地点预警地点统计
    getRepastSiteWarnStatistics({userID: '',deptId: '',role: ''}).then(() => {})
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
