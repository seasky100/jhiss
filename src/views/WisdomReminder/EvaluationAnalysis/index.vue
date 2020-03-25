<template>
    <div class="container">
        <div class="page-title">
            <img style="margin-right:8px;" src='@/utils/img/home_round_bar@2x.png' /> 
            <span>评价分析预警</span>
        </div>
        <div class="content">
            <el-row class="bg-fff">
                <el-col :span="12">
                    <HistogramChart
                            :chart-data="warningType.data"
                            :label-map="warningType.labelMap"
                            title="预警次数"
                    />
                </el-col>
                <el-col :span="12">
                    <LineChart
                            :chart-data="warningNumber.data"
                            :label-map="warningNumber.labelMap"
                            title="次数"
                    />
                </el-col>
            </el-row>
            <div class="search-wrap" style="min-width:1000px;">
                <!-- <div class="section-title">查询条件</div> -->
                <e-search
                        class="search-form"
                        @handleSearch="handleSearch"
                        :searchData="searchData"
                        :searchForm="searchForm"
                />
            </div>
            <div class="search-wrap" style="height:760px;">
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
        <EvaluationInfo ref="evaluationInfo"/>
    </div>
</template>

<script>
import HistogramChart from "@/components/histogram-chart";
import LineChart from "@/components/line-chart";
import {
    getAuditWarnBarChat,
    getAuditWarnLineChat,
    getFindAuditWarningPage
} from "@/api/wisdom-reminder/evaluation-analysis.js";
import EvaluationInfo from './modal/evaluationInfo'

export default {
    components: {
        HistogramChart,
        LineChart,
        EvaluationInfo
    },
    data() {
        return {
            searchData: {
                police_code: '',
                user_name: '',
                department: '',
                startTime: '',
                endTime: ''
            },
            searchForm: [
                {type: 'input', prop: 'police_code', width: '120px', placeholder: '警号'},
                {type: 'input', prop: 'user_name', width: '120px', placeholder: '姓名'},
                {
                    type: 'select',
                    prop: 'department',
                    width: '150px',
                    options: [{label: '十分局', value: '十分局'}],
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
            // 预警类型次数
            warningType: {
                data: {
                    columns: ["matter", "warnnum"],
                    rows: []
                },
                labelMap: {
                    warnnum: "数量"
                }
            },
            // 预警次数
            warningNumber: {
                data: {
                    columns: ["everyday", "warnnum"],
                    rows: []
                },
                labelMap: {
                    warnnum: "数量"
                }
            },
            // 评价分析预警分页
            userParams: {
                userId: '123',
                deptId: '123',
                role: '123'
            },
            options: {
                pageSize: 10,
                hasIndex: false,
                currentPage: 1,
                loading: true,
                maxHeight: null,
                height: '740'
            },
            columns: [
                {
                    prop: 'police_code',
                    label: '警号',
                    align: 'left'
                },
                {
                    prop: 'user_name',
                    label: '姓名',
                    align: 'left'
                },
                {
                    prop: 'department',
                    label: '部门',
                    align: 'left'
                },
                {
                    prop: 'warn_time',
                    label: '预警时间',
                    align: 'left',
                    type: 'date',
                    dateFormat: 'yyyy-MM-dd'
                },
                {
                    prop: 'warn_reason',
                    label: '预警原因',
                    align: 'left'
                },
                {
                    prop: 'note_score',
                    label: '得分',
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
                            this.$refs.evaluationInfo.open(row);
                        },
                        showCallback: () => {
                            return true;
                        }
                    }
                ]
            },
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
            getFindAuditWarningPage(Object.assign({
                nCurrent: nCurrent,
                nSize: 10
            }, $this.searchData, $this.userParams)).then((res) => {
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
        // 日志预警柱线图
        getAuditWarnBarChat(this.userParams).then((res) => {
            this.warningType.data.rows = res
        });

        // 日志预警柱线图
        getAuditWarnLineChat(this.userParams).then((res) => {
            this.warningNumber.data.rows = res
        });

        // 日志预警分页
        this.query();
    }
};
</script>

<style lang="stylus" scoped>
@import "../../../styles/common.styl"
</style>
