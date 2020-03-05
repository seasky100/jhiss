<template>
    <el-container class="wisdom-attendance-container full-height">
        <el-header height="40px">出国情况</el-header>
        <el-main>
            <div class="main">
                <el-row :gutter="16" class="top-chart">
                    <el-col :span="8">
                        <RingChart
                                :chart-data="policeNumber.data"
                                :label-map="policeNumber.labelMap"
                                title="民警数量"
                        />
                    </el-col>
                    <el-col :span="8">
                        <RingChart
                                :chart-data="passport.data"
                                :label-map="passport.labelMap"
                                title="民警数量"
                        />
                    </el-col>
                    <el-col :span="8">
                        <HistogramChart
                                :chart-data="goingAbroad.data"
                                :label-map="goingAbroad.labelMap"
                                title="次数"
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
                                        prop="workType"
                                        label="出国原因">
                                </el-table-column>
                                <el-table-column
                                        prop="startTime"
                                        label="开始时间">
                                </el-table-column>
                                <el-table-column
                                        prop="endTime"
                                        label="结束时间">
                                </el-table-column>
                                <el-table-column
                                        prop="passportId"
                                        label="护照情况">
                                </el-table-column>
                                <el-table-column
                                        prop="isException"
                                        label="是否异常">
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
import RingChart from "@/components/ring-chart";
import HistogramChart from "@/components/histogram-chart";
import {
  getCertificateInfoStatistics,
  getPalaceInfoStatistics,
  getFindAbroadRecordPage
} from "@/api/wisdom-reminder/go-abroad.js";

export default {
  components: {
    RingChart,
    HistogramChart
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
              placeholder: '起始时间'
            },
            {
              prop: 'endTime',
              format: '',
              valueformat: '',
              placeholder: '结束时间'
            }
          ]
        }
      ],
      // 显示有护照和没护照的民警数量
      policeNumber: {
        data: {
          columns: ["passport", "number"],
          rows: [
            { passport: "有护照", number: 10 },
            { passport: "没护照", number: 20 }
          ]
        },
        labelMap: {
          number: "数量"
        }
        // yAxisName: '民警数量'
      },
      // 显示当前护照在管和在民警手里的数量
      passport: {
        data: {
          columns: ["passportManage", "number"],
          rows: [
            { passportManage: "当前护照在管", number: 10 },
            { passportManage: "民警到手护照", number: 20 }
          ]
        },
        labelMap: {
          number: "数量"
        }
      },
      // 按目的地显示今年出国次数top10
      goingAbroad: {
        data: {
          columns: ["place", "num"],
          rows: []
        },
        labelMap: {
          num: "次数"
        }
      },
      // 获取出勤出境分页
      params: {
        nCurrent: 1, // 当前页(大于等于0)
        nSize: 10, // 每页记录数量
        orderByField: "", // 排序字段
        policeCode: "", // 警员编号
        userName: "", // 用户名称
        department: "", // 部门
        startTime: "", // 开始时间
        endTime: "" // 结束时间
      },
      tableData: [],
      total: 0
      // value: "ssbm",
      // options: [{
      //   value: "ssbm",
      //   label: "所属部门"
      // }],
      // pickerOptions: {
      //   shortcuts: [{
      //     text: "最近一周",
      //     onClick(picker) {
      //       const end = new Date();
      //       const start = new Date();
      //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      //       picker.$emit("pick", [start, end]);
      //     }
      //   }, {
      //     text: "最近一个月",
      //     onClick(picker) {
      //       const end = new Date();
      //       const start = new Date();
      //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      //       picker.$emit("pick", [start, end]);
      //     }
      //   }, {
      //     text: "最近三个月",
      //     onClick(picker) {
      //       const end = new Date();
      //       const start = new Date();
      //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      //       picker.$emit("pick", [start, end]);
      //     }
      //   }]
      // },
      // value1: "",
      // value2: "",
      // value3: "kqjg",
      // options3: [
      //   {
      //     value: "kqjg",
      //     label: "考勤结果（不限）"
      //   },
      //   {
      //     value: "zc",
      //     label: "正常"
      //   },
      //   {
      //     value: "cd",
      //     label: "迟到"
      //   },
      //   {
      //     value: "zt",
      //     label: "早退"
      //   },
      //   {
      //     value: "wdk",
      //     label: "未打卡"
      //   }
      // ]
    };
  },
  methods: {
    handleSearch() {}
  },
  created() {
    // 显示当前护照在管和在民警手里的数量饼状图
    getCertificateInfoStatistics();

    // 按目的地显示今年出国次数top10
    getPalaceInfoStatistics().then((res) => {
      for (let key in res) {
        this.goingAbroad.data.rows.push({ place: key, num: res[key] })
      }
    })

    // 获取出勤出境分页
    getFindAbroadRecordPage(this.params).then((res) => {
      console.log(res.data);
      this.tableData = res.data;
      this.total = res.total;
    });
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
