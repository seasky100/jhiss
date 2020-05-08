<template>
    <div class="container">
        <div class="content">
            <div class="search-wrap" style="height:811px;">
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
        <!-- <GoAbroadDetail ref="goAbroadDetail" /> -->
    </div>
</template>

<script>
import {
    getFindAbroadRecordPage
} from "@/api/wisdom-reminder/go-abroad.js";
// import GoAbroadDetail from './model/goAbroadDetail'
import { getUserInfo } from '../../api/user-server.js';
export default {
    name: 'UserAbroad',
    components: {
    // GoAbroadDetail
    },
    props: {
        Id: String
    },
    data() {
    return {
        // 获取出勤出境分页
        searchData: {
            policeCode: '',
            department: '',
            startTime: '',
            endTime: ''
        },
        searchForm: [
            // {type: 'input', prop: 'policeCode', width: '120px', placeholder: '警号'},
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
            //     prop: '',
            //     width: '150px',
            //     options: [
            //         {label: '保管',value: '保管'},
            //         {label: '借出',value: '借出'}
            //     ],
            //     change: row => console.log(row),
            //     placeholder: '护照情况'
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
        //   {
        //       prop: 'policeCode',
        //       label: '警号',
        //       align: 'left'
        //   },
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
            prop: 'reason',
            label: '出国原因',
            align: 'left'
            },
            {
                prop: 'startTime',
                label: '开始时间',
                align: 'left',
                type: 'date',
                dateFormat: 'yyyy-MM-dd'
            },
            {
                prop: 'endTime',
                label: '结束时间',
                align: 'left',
                type: 'date',
                dateFormat: 'yyyy-MM-dd'
            },
        //   {
        //       prop: 'certificateType',
        //       label: '护照情况',
        //       align: 'left'
        //   },
        //   {
        //       prop: 'isException',
        //       label: '是否异常',
        //       align: 'left'
        //   }
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
                    //   this.$refs.goAbroadDetail.open(row);
                    },
                    showCallback: () => {
                        return true;
                    }
                }
            ]
        },
        tableList: [],
        name: ''
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
            getFindAbroadRecordPage(Object.assign({
                nCurrent: nCurrent,
                nSize: 10,
                // userId: sessionStorage.id,
                userId: $this.id,
                orderByField: ''
            }, $this.searchData)).then((res) => {
                this.$refs.recordSpTableRef.setPageInfo(
                    nCurrent,
                    res.size,
                    res.total,
                    res.data
                );
            })
        },
        init() {
            // 获取用户信息
            getUserInfo({ userId: this.Id }).then(res => {
                this.name = res.data.realName
                this.query();
            }).catch(error => {

            })
        },
    },
    created() {
    // 获取出境分页
    this.init()
    }
};
</script>
<style lang="stylus" scoped>
@import "../../styles/common.styl";
</style>
    