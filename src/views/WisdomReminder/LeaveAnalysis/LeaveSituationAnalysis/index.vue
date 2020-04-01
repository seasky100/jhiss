<template>
    <div class="container">
        <div class="page-title">
            <img style="margin-right:8px;" src='@/utils/img/home_round_bar@2x.png' /> 
            <span>请假情况分析</span>
        </div>
        <div class="content">
            <el-row class="bg-fff">
                <el-col :span="12">
                    <HistogramChart
                            :chart-data="leaveTime.data"
                            :label-map="leaveTime.labelMap"
                            title="请假次数"
                    />
                </el-col>
                <el-col :span="12">
                    <HistogramChart
                            :chart-data="approvalNumber.data"
                            :label-map="approvalNumber.labelMap"
                            title="异常次数"
                    />
                </el-col>
            </el-row>
            <div class="search-wrap" style="min-width:1245px;">
                <!-- <div class="section-title">查询条件</div> -->
                <e-search
                        class="search-form"
                        @handleSearch="handleSearch"
                        :searchData="searchData"
                        :searchForm="searchForm"
                />
            </div>
            <div class="search-wrap" style="height:750px;">
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
        <LeaveSituationDetails ref="leaveSituationDetails" />
    </div>
</template>

<script>
import HistogramChart from "@/components/histogram-chart";
import {
    getAskForLeave,
    getVacationExceptionStatistics,
    getFindVacationPage
} from "@/api/wisdom-reminder/leave-analysis.js";
import LeaveSituationDetails from './model/leaveSituationDetails'

export default {
    components: {
        HistogramChart,
        LeaveSituationDetails
    },
    data() {
        return {
            // 请假次数
            leaveTime: {
                data: {
                    columns: ["type", "number"],
                    rows: []
                },
                labelMap: {
                    number: "次数"
                }
            },
            // 审批异常数量
            approvalNumber: {
                data: {
                    columns: ["type", "number"],
                    rows: []
                },
                labelMap: {
                    number: "数量"
                }
            },
            // 分页表格
            searchData: {
                policeCode: '',
                userName: '',
                department: '',
                startTime: '',
                endTime: '',
                applyType: ''
            },
            searchForm: [
                {type: 'input', prop: 'police_code', width: '120px', placeholder: '警号'},
                {type: 'input', prop: 'user_name', width: '120px', placeholder: '姓名'},
                {
                    type: 'select',
                    prop: 'department',
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
                },
                {
                    type: 'select',
                    prop: 'applyType',
                    width: '150px',
                    options: [],
                    change: row => console.log(row),
                    placeholder: '请假类型'
                }
            ],
            userId: {
              userId: '2020'
            },
            options: {
                pageSize: 10,
                hasIndex: false,
                currentPage: 1,
                loading: true,
                maxHeight: null,
                height: '368'
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
                    prop: 'leaveTime',
                    label: '请假时间',
                    align: 'left',
                    // type: 'date',
                    // dateFormat: 'yyyy-MM-dd'
                },
                {
                    prop: 'applyType',
                    label: '请假类型',
                    align: 'left'
                },
                {
                    prop: 'isException',
                    label: '是否异常',
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
                            this.$refs.leaveSituationDetails.open(row);
                        },
                        showCallback: () => {
                            return true;
                        }
                    }
                ]
            },
            tableList: [],
            id:''
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
            getFindVacationPage(Object.assign({
                nCurrent: nCurrent,
                nSize: 10,
                userId: $this.id
            }, $this.searchData)).then((res) => {
                console.log(res);
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
        const userInfo = JSON.parse(sessionStorage.userInfo)
        this.id = userInfo.info
        const data ={
            userId : this.id
        }
        // 请假次数
        getAskForLeave(data).then((res) => {
            let arr = [];
            for (let key in res) {
                arr.push({type: key, number: res[key]});
            }
            this.leaveTime.data.rows = arr;
        });

        // 请假异常情况统计
        getVacationExceptionStatistics(data).then((res) => {
            let arr = [];
            for (let key in res) {
                arr.push({type: key, number: res[key]});
            }
            this.approvalNumber.data.rows = arr;
        });

        // 分页表格
        this.query();
    }
};
</script>

<style lang="stylus" scoped>
@import "../../../../styles/common.styl";
</style>
