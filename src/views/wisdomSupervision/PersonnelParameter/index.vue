<template>
    <div class="container">
        <div class="page-title">
            <span>人员台账</span>
        </div>
        <div class="content">
            <div class="search-wrap">
                <div class="section-title">查询条件</div>
                <e-search
                        class="search-form"
                        @handleSearch="handleSearch"
                        :searchData="searchData"
                        :searchForm="searchForm" />
            </div>
            <div>
                <e-table
                        ref="recordSpTableRef"
                        :tableList="tableList"
                        :options="options"
                        :columns="columns"
                        :operates="operates"
                        @afterCurrentPageClick="afterCurrentPageClickHandle"
                />
            </div>
        </div>
        <!-- 预警详情 -->
        <!-- <parameterDetail ref="parameterDetail"  /> -->
    </div>
</template>

<script>
// 接口无数据暂时使用预警接口
// import {
//     getWarnPage
// } from '@/api/warn.js';
import {
    getUserList,
    getUserListByOrg,
    getUserListByUserId
} from '@/api/user-server.js';
// import parameterDetail from './modal/parameterDetail'
// import { getUserList } from '@/api/wisdom-reminder/personnel-parameter.js'

export default {
    components: {
        // parameterDetail
    },
    data() {
        return {
            userIds:'',
            searchData: {
                realName: '',
                // loginName: '',
                // orgId: '',
                // startTime: '',
                // endTime: ''
            },
            searchForm: [
                // {type: 'input', prop: 'loginName', width: '120px', placeholder: '警号'},
                {type: 'input', prop: 'realName', width: '120px', placeholder: '姓名'},
                // {
                //     type: 'select',
                //     prop: 'orgId',
                //     width: '150px',
                //     options: [],
                //     change: row => console.log(row),
                //     placeholder: '所属部门'
                // }
                // {
                //     type: 'daterange',
                //     options: [
                //         {
                //             prop: 'startTime',
                //             format: '',
                //             valueformat: '',
                //             placeholder: '起始时间'
                //         },
                //         {
                //             prop: 'endTime',
                //             format: '',
                //             valueformat: '',
                //             placeholder: '结束时间'
                //         }
                //     ]
                // }
            ],
            tableList: [],
            options: {
                // 每页数据数
                pageSize: 10,
                hasIndex: false,
                // 当前页码
                currentPage: 1,
                loading: true,
                maxHeight: null,
                height:'608'
            },
            columns: [
                // {
                //     prop: 'loginName',
                //     label: '警号',
                //     align: 'left'
                // },
                {
                    prop: 'realName',
                    label: '姓名',
                    align: 'left'
                },
                {
                    prop: 'organizationNames',
                    label: '所属部门',
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
                            console.log(111,row)
                            this.$router.push({path: '/parameterDetail', query:{ id: row.id, infoId: row.userInfo.info }})
                        },
                        showCallback: () => {
                            return true;
                        }
                    }
                ]
            },
        }
    },
    methods: {
        // 查询
        handleSearch(params) {
            Object.assign(this.searchData, params);
            // console.log(params)
            this.query();
        },
        // 分页点击事件
        afterCurrentPageClickHandle(val, next) {
            this.query(val);
            next();
        },
        // 查找列表数据
        query(nCurrent = 1) {
            const $this = this;
            console.log(22)
            console.log('888',sessionStorage.userId + ','+ $this.userIds,)
            getUserListByOrg(
                Object.assign(
                    {
                        // nCurrent: 1,
                        // nSize: 10,
                        userId: sessionStorage.userId + ','+ $this.userIds,
                    },
                    // $this.searchData
                )
            ).then(res => {
                debugger
                console.log(333,res)
                // $this.tableList = res.data
                this.$refs.recordSpTableRef.setPageInfo(
                    1,
                    100,
                    res.data.length,
                    res.data
                );
            })
        },
           // 根据用户ID查询所有下属用户
		getUserListByUserId() {
            debugger
        const _this= this;
        const params = {
          userId: sessionStorage.userId
        }
        getUserListByUserId(params).then(res => {
          if (res.success) {
            _this.userIds = res.data.map(item => item.id).join()
            // this.searchData.approvalId = sessionStorage.userId
            console.log('_this.userIds',_this.userIds)
            this.query()
          }
        })
      },
    },
    mounted() {
        debugger
        console.log(1)
        this.getUserListByUserId();
    }
}
</script>

<style lang="stylus" scoped>
@import "../../../styles/common.styl";
@import "../../../styles/common.css";
</style>
