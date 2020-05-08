<template>
    <div class="container">
        <div class="content">
            <div class="search-wrap" style="height:811px;">
                <e-table
                        ref="recordSpTableRef"
                        :options="options"
                        :columns="columns"
                        :tableList="tableList"
                        @afterCurrentPageClick="afterCurrentPageClickHandle"
                />
            </div>
        </div>
        <!--详情-->
        <!-- <LeaveSituationDetails ref="leaveSituationDetails" /> -->
    </div>
</template>
<script>
import HistogramChart from "@/components/histogram-chart";
import {
    overtimeApply
} from "@/api/warn.js";
// import LeaveSituationDetails from './model/leaveSituationDetails'
import { getList } from '@/api/user-server.js';
import { getUserInfo } from '../../api/user-server.js';
export default {
    name: 'UserOvertime',
    components: {
        HistogramChart,
        // LeaveSituationDetails
    },
    props: {
        Id: String
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
                    rows: [{number:0,type:0}]
                },
                labelMap: {
                    number: "数量"
                }
            },
            // 分页表格
            searchData: {
                policeCode: '',
                department: '',
                startTime: '',
                endTime: '',
                applyType: ''
            },
            searchForm: [
                // {type: 'input', prop: 'police_code', width: '120px', placeholder: '警号'},
                {type: 'input', prop: 'userName', width: '120px', placeholder: '姓名'},
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
                // {
                //     type: 'select',
                //     prop: 'applyType',
                //     width: '150px',
                //     options: [],
                //     change: row => console.log(row),
                //     placeholder: '请假类型'
                // }
                {
                    type: "select",
                    prop: "applyType",
                    width: "150px",
                    options: this.listData,
                    change: row => console.log(row),
                    placeholder: "请假类型"
                },
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
                    label: '加班时间',
                    align: 'left',
                    // type: 'date',
                    // dateFormat: 'yyyy-MM-dd'
                },
                {
                    prop: 'applyType',
                    label: '加班类型',
                    align: 'left'
                },
                // {
                //     prop: 'isException',
                //     label: '是否异常',
                //     align: 'left'
                // }
            ],
            tableList: [],
            listData: [],
            id:'',
            name:''
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
            overtimeApply(Object.assign({
                nCurrent: nCurrent,
                nSize: 10,
                // userId: sessionStorage.id,
                userId: $this.id
            }, $this.searchData)).then((res) => {
                this.$refs.recordSpTableRef.setPageInfo(
                    nCurrent,
                    res.size,
                    res.total,
                    res.data
                );
            })
        },
    },
    created() {
        this.query();
    },
};
</script>
<style lang="stylus" scoped>
@import "../../styles/common.styl";
</style>
    