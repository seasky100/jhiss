<template>
    <el-container class="wisdom-attendance-container full-height">
        <el-header height="40px">智慧考勤分析</el-header>
        <el-main>
            <div class="main">
                <el-row :gutter="16" class="top-chart">
                    <el-col :span="12">
                        <HistogramChart
                                :chart-data="checkingInResult.data"
                                :label-map="checkingInResult.labelMap"
                                :yAxisName="checkingInResult.yAxisName"
                                title="考勤结果"
                        />
                    </el-col>
                    <el-col :span="12">
                        <LineChart
                                :chart-data="workTime.data"
                                :label-map="workTime.labelMap"
                                :yAxisName="workTime.yAxisName"
                                :rotate="60"
                                title="上班时长"
                        />
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <div class="table-comtainer">
                            <div class="query-condition">
                                <div class="title">查询条件</div>
                                <div class="search">
                                    <e-serach
                                            @handleSearch="handleSearch"
                                            :searchData="searchData"
                                            :searchForm="searchForm"
                                    />
                                    <el-input placeholder="警号" size="mini"/>
                                    <el-input placeholder="姓名" size="mini"/>
                                    <el-select v-model="value" size="mini">
                                        <el-option
                                                v-for="item in options"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                        ></el-option>
                                    </el-select>
                                    <br/>
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
                                        prop="policeCode"
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
                                        prop="clockDate"
                                        label="考勤日期">
                                </el-table-column>
                                <el-table-column
                                        prop="startTime"
                                        label="上班打卡时间">
                                </el-table-column>
                                <el-table-column
                                        prop="endTime"
                                        label="下班打卡时间">
                                </el-table-column>
                                <el-table-column
                                        prop="resultStatus"
                                        label="考勤结果">
                                </el-table-column>
                            </el-table>
                            <div class="pagination">
                                <el-pagination
                                        background
                                        layout="prev, pager, next, jumper, total"
                                        :total="total"
                                        :page-size="10"
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
import LineChart from "@/components/line-chart";
// import AttendanceSheet from './attendance-sheet';
import { getTimesStatistics, getFindClockPage } from "@/api/wisdom-reminder/wisdom-attendance.js";

export default {
    components: {
        HistogramChart,
        LineChart
        // ChartBox,
        // AttendanceSheet
    },
    data() {
        return {
            // 考勤结果 - 柱状图
            checkingInResult: {
                data: {
                    columns: ["kqlx", "cishu"],
                    rows: [
                        { kqlx: "门禁刷脸或刷卡", cishu: 10 },
                        { kqlx: "汽车识别", cishu: 20 },
                        { kqlx: "精细化app打卡", cishu: 30 },
                        { kqlx: "钉钉打卡", cishu: 40 }
                    ]
                },
                labelMap: {
                    cishu: "打卡次数"
                },
                yAxisName: "考勤结果"
            },
            // 上班时长
            workTime: {
                data: {
                    columns: ["date", "duration"],
                    rows: [
                        { date: "2020/2/1", duration: 8 },
                        { date: "2020/2/2", duration: 9 },
                        { date: "2020/2/3", duration: 10 },
                        { date: "2020/2/4", duration: 11 },
                        { date: "2020/2/5", duration: 12 },
                        { date: "2020/2/6", duration: 11 },
                        { date: "2020/2/7", duration: 10 },
                        { date: "2020/2/8", duration: 9 },
                        { date: "2020/2/10", duration: 8 },
                        { date: "2020/2/11", duration: 7 },
                        { date: "2020/2/12", duration: 6 },
                        { date: "2020/2/13", duration: 10 },
                        { date: "2020/2/14", duration: 8 },
                        { date: "2020/2/17", duration: 11 },
                        { date: "2020/2/18", duration: 9.5 },
                        { date: "2020/2/19", duration: 12 },
                        { date: "2020/2/20", duration: 8.5 },
                        { date: "2020/2/21", duration: 7.5 },
                        { date: "2020/2/22", duration: 10.5 }
                    ]
                },
                labelMap: {
                    date: "日期",
                    duration: "时长"
                },
                yAxisName: "上班时长"
            },

            searchData: {
                policeCode: "",
                userName: "",
                department: ""
            },
            searchForm: [
                { type: "input", prop: "policeCode", width: "120px", placeholder: "警号" },
                { type: "input", prop: "userName", width: "120px", placeholder: "姓名" },
                { type: "input", prop: "department", width: "120px", placeholder: "部门" },
                {
                    type: "daterange",
                    options: [
                        {
                            prop: "startTime",
                            format: "",
                            valueformat: "",
                            placeholder: "起始时间"
                        },
                        {
                            prop: "endTime",
                            format: "",
                            valueformat: "",
                            placeholder: "结束时间"
                        }
                    ]
                },
                {
                    type: "select",
                    prop: "dept_id",
                    width: "150px",
                    options: [{ label: "治安部门", value: "0" }, { label: "交通管理部门", value: "1" }],
                    change: row => console.log(row),
                    placeholder: "所属部门"
                },
                {
                    type: "select",
                    prop: "response",
                    width: "150px",
                    options: [{ label: "否", value: 0 }, { label: "是", value: 1 }],
                    change: row => console.log(row),
                    placeholder: "是否反馈"
                }
            ],

            // 底部考勤表格参数
            tableParams: {
                nCurrent: 1, // 当前页(大于等于0)
                nSize: 10, // 每页记录数量
                orderByField: "", // 排序字段
                isAsc: "", // 是否升序
                policeCode: "", // 警员编号
                userName: "", // 用户名称
                department: "", // 部门
                startTime: "", // 开始时间
                endTime: "", // 结束时间
                location: "", // 地点
                userId: "", // 用户ID
                status: "" // 状态
            },
            tableData: [],
            total: 0
        };
    },
    methods: {
        handleSearch() {
        }
    },
    created() {
        // 刷卡情况（月）柱状图x轴刷卡地点y轴次数 // 左一柱状图 - 考勤结果
        getTimesStatistics({ userId: "123456" }).then(() => {
        });

        // 获取考勤信息分页
        getFindClockPage(this.tableParams).then((res) => {
            console.log(res);
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

.wisdom-attendance-container .table {
    height: 70%;
}

.el-col {
    height: 100%;
}

.table-comtainer {
    height: 100%;
}

.table-comtainer .query-condition {
    border: 1px solid #E5E9F4;
}

.table-comtainer .query-condition .title {
    background-color: #F5F6F7;
    padding: 8px;
    border-bottom: 1px solid #E5E9F4;
}

.table-comtainer .query-condition .search {
    padding: 8px;
}

.table-comtainer .query-condition .search .el-input {
    width: 150px;
    margin-right: 8px;
}

.table-comtainer .query-condition .search .el-select {
    width: 150px;
    margin-right: 8px;
}

.table-comtainer .query-condition .search .el-date-picker {
    width: 158px;
}

.table-comtainer .pagination {
    display: flex;
    justify-content: center;
    padding-top: 16px;
}
</style>
