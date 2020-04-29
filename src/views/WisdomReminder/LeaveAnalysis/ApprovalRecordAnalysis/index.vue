<template>
    <div class="container">
        <div class="page-title">
            <img style="margin-right:8px;" src='@/utils/img/home_round_bar@2x.png' /> 
            <span>审批记录分析</span>
        </div>
        <div class="content">
            <el-row class="bg-fff">
                <el-col :span="12">
                    <HistogramChart
                            :chart-data="checkingInResult.data"
                            :label-map="checkingInResult.labelMap"
                            title="审批数量"
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
            <div class="search-wrap" style="min-width:1245px;">
                <!-- <div class="section-title">查询条件</div> -->
                <e-search
                        class="search-form"
                        @handleSearch="handleSearch"
                        :searchData="searchData"
                        :searchForm="searchForm"
                />
            </div>
            <div class="search-wrap" style="height:608px;">
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
import LineChart from '@/components/line-chart';
import {getApplyException, getVacationApplyByMonth, getFindVacationPage} from '@/api/wisdom-reminder/leave-analysis.js'
import LeaveSituationDetails from './model/leaveSituationDetails'
import { getList } from '@/api/user-server.js';
import { mapGetters } from 'vuex';
export default {
    components: {
        HistogramChart,
        LineChart,
        LeaveSituationDetails
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
            searchData: {
                userName: '',
                policeCode: '',
                department: '',
                startTime: '',
                endTime: '',
                applyType: ''
            },
            searchForm: [
                // {type: 'input', prop: 'police_code', width: '120px', placeholder: '警号'},
                {type: 'input', prop: 'userName', width: '120px', placeholder: '姓名'},
                // {
                //     type: 'select',
                //     prop: 'department',
                //     width: '150px',
                //     options: [],
                //     change: row => console.log(row),
                //     placeholder: '所属部门'
                // },
                {
                    // label: '所属部门',
                    type: 'select_tree',
                    prop: 'department',
                    options: this.orgData,
                    config: {
                        value: 'name',
                        label: 'name',
                        children: 'childrens',
                        disabled: true
                    },
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
                    type: "select",
                    prop: "applyType",
                    width: "150px",
                    options: this.listData,
                    change: row => console.log(row),
                    placeholder: "请假类型"
                },
                // {
                //     type: 'select',
                //     prop: 'applyType',
                //     width: '150px',
                //     options: [],
                //     change: row => console.log(row),
                //     placeholder: '请假类型'
                // }
            ],
            options: {
                pageSize: 10,
                hasIndex: false,
                currentPage: 1,
                loading: true,
                maxHeight: null,
                height: '535'
            },
            columns: [
                // {
                //     prop: 'policeCode',
                //     label: '警号',
                //     align: 'left'
                // },
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
                    prop: 'approvalState',
                    label: '审批状态',
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
            listData:[],
            userParams: {
                userId: '',
                deptId: '111',
                role: '111'
            }
        }
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
        // 字典值
        getList() {
            getList(
                Object.assign(
                    {
                        appId: 'c62d6b0a56b045b597b2069cd9b9e6b9',
                        type: '请假类型'
                    },
                )
            ).then(res => {
                if (res.success) {
                    const dicData = res.data
                    console.log('请假类型', dicData)
                    for (let i = 0; i < dicData.length; i++) {
                        const list = {
                            label: dicData[i].label,
                            value: dicData[i].value
                        }
                        this.listData.push(list)
                    }
                    // const aa = dicData.map(inventor => `label:${inventor.label},value:${inventor.value}`)
                    // console.log(aa)
                    this.searchForm[3].options = this.listData
                }
            })
        },
        // 查询列表
        query(nCurrent = 1) {
            const $this = this;
            getFindVacationPage(Object.assign({
                nCurrent: nCurrent,
                nSize: 10,
                userId: $this.userParams.userId
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
    computed: {
        ...mapGetters([
            'orgData'
        ])
    },
    created() {
        this.searchForm[1].options = this.orgData
        const userInfo = JSON.parse(sessionStorage.userInfo)
        this.userId = userInfo.info
        // 分页表格
        this.query();
        this.getList();
        // 审批情况统计
        getApplyException(this.userParams).then((res) => {
            let arr = []
            for (let key in res) {
                arr.push({
                    type: key,
                    num: res[key]
                })
            }
            this.checkingInResult.data.rows = arr
        });

        // 请假按月份统计
        getVacationApplyByMonth(this.userParams).then((res) => {
            this.workTime.data.rows = res.map((item) => {
                return {
                    month: item.month + '月',
                    applynum: item.applynum
                }
            })
        });
    }
};
</script>

<style lang="stylus" scoped>
@import "../../../../styles/common.styl";
</style>
