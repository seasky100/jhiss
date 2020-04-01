<template>
  <div class="container">
    <div class="page-title">
      <img style="margin-right:8px;" src='@/utils/img/home_round_bar@2x.png' /> 
      <span>护照管理管控</span>
    </div>
    <div class="content">
      <div class="search-wrap" style="min-width:1000px;">
        <!-- <div class="section-title">查询条件</div> -->
        <e-search
          class="search-form"
          @handleSearch="handleSearch"
          :searchData="searchData"
          :searchForm="searchForm" />
      </div>
      <div class="search-wrap" style="height:444px;">
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
  </div>
</template>

<script>
import { getAbroadRecordPage } from '@/api/integrity-risk-serve.js';

export default {
  data() {
    return {
      searchData: {
        userName: '',
        policeCode: '',
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
          options: [{label:'治安部门', value:'0'},{label:'交通管理部门', value:'1'}],
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
      tableList: [],
      options: {
        // 每页数据数
        pageSize: 10,
        hasIndex: false,
        // 当前页码
        currentPage: 1,
        loading: true,
        maxHeight: null,
        height:'730'
      },
      columns: [
        {
          prop: 'userName',
          label: '申请人',
          align: 'left'
        },
        {
          prop: 'passportId',
          label: '证件号码',
          align: 'left'
        },
        {
          prop: 'certificateType',
          label: '证件类型',
          align: 'left'
        },
        {
          prop: 'place',
          label: '目的地',
          align: 'left'
        },
        {
          prop: 'startTime',
          label: '出国时间',
          align: 'left',
          type: 'date'
        },
        {
          prop: 'endTime',
          label: '归国时间',
          align: 'left',
          type: 'date'
        },
        {
          prop: 'workType',
          label: '操作类型',
          align: 'left'
        },
        {
          prop: 'agency',
          label: '操作人',
          align: 'left'
        },
        {
          prop: 'actualStartTime',
          label: '领取时间',
          align: 'left',
          type: 'date'
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
              console.log('row', row);
            },
            showCallback: () => {
              return true;
            }
          }
        ]
      }
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
      getAbroadRecordPage(
        Object.assign(
          {
            nCurrent: nCurrent,
            nSize: 10
          },
          $this.searchData
        )
      ).then(res => {
        // console.log(res)
        this.$refs.recordSpTableRef.setPageInfo(
          nCurrent,
          res.data.size,
          res.data.total,
          res.data.records
        );
      })
    },
  },
  mounted() {
    this.query();
  }
}
</script>

<style lang="stylus" scoped>
@import "../../../styles/common.styl"
</style>
