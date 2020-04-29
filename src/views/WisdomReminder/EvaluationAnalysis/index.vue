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
            <div class="search-wrap" style="height:444px;">
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
import {findWorkEvaluatePage,workEvaluateStatistics,countWorkNoteByDay} from '@/api/report.js'
// findWorkEvaluatePage

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
                userName: '',
                department: '',
                startTime: '',
                endTime: ''
            },
            searchForm: [
                // {type: 'input', prop: 'police_code', width: '120px', placeholder: '警号'},
                {type: 'input', prop: 'userName', width: '120px', placeholder: '姓名'},
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
                    columns: ["date", "count"],
                    rows: []
                },
                labelMap: {
                    warnnum: "数量"
                }
            },
            // 评价分析预警分页
            userParams: {
                audited: sessionStorage.orgId,
            },
            options: {
                pageSize: 10,
                hasIndex: false,
                currentPage: 1,
                loading: true,
                maxHeight: null,
                height: '430'
            },
            columns: [
                // {
                //     prop: 'police_code',
                //     label: '警号',
                //     align: 'left'
                // },
                {
                    prop: 'userName',
                    label: '姓名',
                    align: 'left'
                },
                {
                    prop: 'deptName',
                    label: '部门',
                    align: 'left'
                },
                {
                    prop: 'noteDate',
                    label: '预警时间',
                    align: 'left',
                    type: 'date',
                    dateFormat: 'yyyy-MM-dd'
                },
                // {
                //     prop: 'content',
                //     label: '预警原因',
                //     align: 'left'
                // },
                    {
                        prop: 'noteScore',
                        label: '得分',
                        align: 'left'
                    },
                {
                    prop: 'content',
                    label: '内容',
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
            findWorkEvaluatePage(Object.assign({
                nCurrent: nCurrent,
                nSize: 10,
                orderByField: 'noteDate',
                orderFlag: false
            }, $this.searchData)).then((res) => {
                console.log(255,res)
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
        workEvaluateStatistics(this.userParams).then((res) => {
            for (let key in res) {
                this.warningType.data.rows.push({matter: key, warnnum: res[key]})
            }    
        });
        
        // 日志预警柱线图
        countWorkNoteByDay(this.userParams).then((res) => {      
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
