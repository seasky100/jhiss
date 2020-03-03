<template>
    <el-container class="wisdom-attendance-container full-height">
        <el-header height="40px">审批记录分析</el-header>
        <el-main>
            <div class="main">
                <el-row :gutter="16" class="top-chart">
                    <el-col :span="12">
                        <RingChart
                                :chart-data="checkingInResult.data"
                                :label-map="checkingInResult.labelMap"
                                title="数量"
                        />
                    </el-col>
                    <el-col :span="12">
                        <LineChart
                                :chart-data="workTime.data"
                                :label-map="workTime.labelMap"
                                :yAxisName="workTime.yAxisName"
                                title="请假次数"
                        />
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <div class="comtainer">
                                <div class="query-condition">
                                    <div class="title">查询条件</div>
                                    <div class="search">
                                        <el-input placeholder="警号" size="mini" />
                                        <el-input placeholder="姓名" size="mini" />
                                        <el-select v-model="value" size="mini">
                                            <el-option
                                                    v-for="item in options"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value"
                                            ></el-option>
                                        </el-select>
                                        <br />
                                        <div style="margin-bottom: 8px"></div>
                                        <el-date-picker
                                                v-model="value1"
                                                type="daterange"
                                                range-separator="至"
                                                start-placeholder="开始日期"
                                                end-placeholder="结束日期"
                                                size="mini"
                                                style="margin-right: 8px"
                                        >
                                        </el-date-picker>
                                        <el-select v-model="value3" size="mini">
                                            <el-option
                                                    v-for="item in options3"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value"
                                            ></el-option>
                                        </el-select>
                                        <el-button size="mini">清空</el-button>
                                        <el-button type="primary" size="mini">查询</el-button>
                                    </div>
                                </div>
                                <el-table
                                        :data="tableData"
                                        style="width: 100%"
                                        size="mini"
                                >
                                    <el-table-column
                                            prop="userId"
                                            label="警号"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                            prop="userName"
                                            label="姓名"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                            prop="department"
                                            label="部门">
                                    </el-table-column>
                                    <el-table-column
                                            prop="applyTime"
                                            label="请假时间">
                                    </el-table-column>
                                    <el-table-column
                                            prop="applyType"
                                            label="请假类型">
                                    </el-table-column>
                                    <el-table-column
                                            prop="approvalState"
                                            label="审核状态">
                                    </el-table-column>
                                    <el-table-column
                                            prop="isException"
                                            label="是否异常">
                                    </el-table-column>
                                    <el-table-column
                                            prop="operation"
                                            label="操作">
                                        <template  slot-scope="scope">
                                            <el-button @click="handleClick(scope.row)" size="mini">详情</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <div class="pagination">
                                    <el-pagination
                                            background
                                            layout="prev, pager, next"
                                            :total="total"
                                            :current-page="current"
                                            :page-size="10"
                                            @current-change="handleCurrentChange"
                                    >
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
  import RingChart from '@/components/ring-chart';
  import { getApplyException, getVacationApplyByMonth, getFindVacationPage } from '@/api/wisdom-reminder/leave-analysis.js'

  export default {
    components: {
      HistogramChart,
      LineChart,
      RingChart
    },
    data() {
      return {
        // 审批情况
        checkingInResult: {
          data: {
            columns: ['type', 'num'],
            rows: []
          },
          labelMap: {
            num: '数量'
          }
        },
        // 请假次数
        workTime: {
          data: {
            columns: ['month', 'applynum'],
            rows: []
          },
          labelMap: {
            applynum: '次数'
          }
        },
        // 审批记录分析表格
        tableData: [],
        total: 0,
        params: {
          userId: '123',
          deptId: '123',
          role: '123'
        }
      }
    },
    methods: {
      // getTableData(current) {
      //   console.log(current);
      // }
    },
    created() {
      // 审批情况统计
      getApplyException(this.params).then((res) => {
        let arr = []
        for (let key in res) {
          arr.push({
            type: key,
            num: res[key]
          })
        }
        this.checkingInResult.data.rows = arr
      })

      // 请假按月份统计
      getVacationApplyByMonth(this.params).then((res) => {
         this.workTime.data.rows = res.map((item) => {
            return {
                month: item.month + '月',
                applynum: item.applynum
            }
         })
      })

      // getFindVacationPage().then((res) => {
      //   console.log(res);
      //   this.tableData= res.data
      //   this.total= res.total
      // })
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

    .comtainer {
        height: 100%;
    }
    .comtainer  .query-condition {
        border: 1px solid #E5E9F4;
    }
    .comtainer  .query-condition .title {
        background-color: #F5F6F7;
        padding: 8px;
        border-bottom: 1px solid #E5E9F4;
    }
    .comtainer  .query-condition  .search {
        padding: 8px;
    }
    .comtainer  .query-condition  .search .el-input {
        width: 150px;
        margin-right: 8px;
    }
    .comtainer  .query-condition  .search .el-select {
        width: 150px;
        margin-right: 8px;
    }
    .comtainer  .query-condition  .search  .el-date-picker {
        width: 158px;
    }
    .comtainer  .pagination {
        display: flex;
        justify-content: center;
        padding-top: 16px;
    }
</style>
