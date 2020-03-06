<template>
    <div class="container">
        <div class="page-title">
            <span>智慧考勤分析</span>
        </div>
        <div class="content">
            <el-row class="bg-fff">
                <el-col :span="12">
                    <HistogramChart
                            :chart-data="checkingInResult.data"
                            :label-map="checkingInResult.labelMap"
                            title="考勤结果"
                    />
                </el-col>
                <el-col :span="12">
                    <LineChart
                            :chart-data="workTime.data"
                            :label-map="workTime.labelMap"
                            :rotate="60"
                            title="上班时长"
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
                        :tableList="tableList"
                        @afterCurrentPageClick="afterCurrentPageClickHandle"
                />
            </div>
        </div>
    </div>
</template>

<script>
import HistogramChart from "@/components/histogram-chart";
import LineChart from "@/components/line-chart";
import {
    getClockWarnReasonStatistics,
    getClockWarnTimesStatistics,
    getFindClockPage
} from "@/api/wisdom-reminder/wisdom-attendance.js";

export default {
    components: {
        HistogramChart,
        LineChart
    },
    data() {
        return {
            // 考勤结果 - 柱状图
            checkingInResult: {
                data: {
                    columns: ["type", "num"],
                    rows: []
                },
                labelMap: {
                    num: "打卡次数"
                }
            },
            // 上班时长
            workTime: {
                data: {
                    columns: ["date", "duration"],
                    rows: []
                },
                labelMap: {
                    duration: "时长"
                }
            },
            // 底部考勤表格参数
            searchData: {
                policeCode: "",
                userName: "",
                department: "",
                startTime: '',
                endTime: '',
                location: '',
                status: ''
            },
            searchForm: [
                {type: "input", prop: "policeCode", width: "120px", placeholder: "警号"},
                {type: "input", prop: "userName", width: "120px", placeholder: "姓名"},
                {
                    type: 'select',
                    prop: 'department',
                    width: '150px',
                    options: [],
                    change: row => console.log(row),
                    placeholder: '所属部门'
                },
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
                    prop: "location",
                    width: "150px",
                    options: [{label: "门禁", value: "门禁"}, {label: "app", value: "app"}, {label: '钉钉', value: '钉钉'}],
                    change: row => console.log(row),
                    placeholder: "打卡方式"
                },
                {
                    type: "select",
                    prop: "status",
                    width: "150px",
                    options: [{label: '正常', value: '正常'}, {label: '迟到', value: '迟到'}, {
                        label: '早退',
                        value: '早退'
                    }, {label: '请假', value: '请假'}, {label: '未打卡', value: '未打卡'}],
                    change: row => console.log(row),
                    placeholder: "考勤结果"
                }
            ],
            userId: {userId: '2020'},
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
                    prop: 'clockDate',
                    label: '时间',
                    align: 'left'
                },
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
                    prop: 'startTime',
                    label: '上班打卡时间',
                    align: 'left'
                },
                {
                    prop: 'clockWay',
                    label: '打卡方式',
                    align: 'left'
                },
                {
                    prop: 'endTime',
                    label: '下班打卡时间',
                    align: 'left'
                },
                {
                    prop: 'location',
                    label: '下班打卡方式',
                    align: 'left'
                },
                {
                    prop: 'overtime',
                    label: '加班时长',
                    align: 'left'
                },
                {
                    prop: 'resultStatus',
                    label: '考勤结果',
                    align: 'left'
                }
            ],
            tableList: []
        };
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
            getFindClockPage(Object.assign({
                nCurrent: nCurrent,
                nSize: 10
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
        // 刷卡地点次数统计
        getClockWarnReasonStatistics(this.userId).then((res) => {
            console.log(res);
            for (let key in res) {
                this.checkingInResult.data.rows.push({type: key, num: res[key]})
            }
        });

        // 每日工作时长统计
        getClockWarnTimesStatistics(this.userId).then((res) => {
            for (let key in res) {
                this.workTime.data.rows.push({date: key.slice(0, 10), duration: res[key]})
            }
        });

        // 获取考勤信息分页
        this.query()
    }
};
</script>

<style lang="stylus" scoped>
@import "../../../../styles/common.styl"
</style>
