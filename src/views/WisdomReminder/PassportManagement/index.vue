<template>
  <div class="container">
    <div class="page-title">
      <img style="margin-right:8px;" src='@/utils/img/home_round_bar@2x.png' /> 
      <span>护照管理</span>
    </div>
    <div class="content">
      <el-row class="bg-fff">
        <el-col :span="8" style="width:calc(33.3% - 5px);margin-right:8px;">
          <!-- 以部门进行分类统计 -->
          <e-histogram
            :chartSettings="departmentSettings"
            :title="departmentTitle"
            :chartData="departData"
          />
        </el-col>
        <el-col :span="8" style="width:calc(33.3% - 5px);margin-right:8px;">
          <!-- 问题性质分类统计 -->
          <!-- <ve-histogram :data="chartData"></ve-histogram> -->
          <e-histogram
            :chartSettings="monthlySettings"
            :title="monthlyTitle"
            :chartData="monthlyData"
          />
        </el-col>
        <el-col :span="8" style="width:calc(33.3% - 5px);">
          <!-- 按月统计 -->
          <e-histogram
            :chartSettings="exceptionSettings"
            :title="exceptionTitle"
            :chartData="exceptionData"
          />
        </el-col>
      </el-row>
      <div class="search-wrap" style="min-width:1090px;">
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
    <passport-info ref="passportInfo" />
  </div>
</template>

<script>
import {
  findPassport,
  StatisticsCustodyStatus,
  StatisticsPassportType,
  bulletinExceptionStatistics,
} from '@/api/warn.js';
import { mapGetters } from 'vuex';
import passportInfo from './modal/passportInfo';

export default {
  components: {
    passportInfo
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  data() {
    return {
      departmentTitle: {
        text: '根据护照的保管状态进行统计护照的数量'
      },
      departmentSettings: {
        labelMap: {
          bulletinNum: '通报次数'
        }
      },
      departData: {
        columns: ['department', 'bulletinNum'],
        rows: [
          // { 'department': '纪检委', 'bulletinNum': 1}
        ]
      },
      exceptionTitle: {
        text: '11111'
      },
      exceptionSettings: {
        labelMap: {
          times: '次数'
        }
      },
      exceptionData: {
        columns: ['exception', 'times'],
        rows: [
          // { 'exception': '1', 'times': 1}
        ]
      },
      monthlyTitle: {
        text: '问题性质分类统计'
      },
      monthlySettings: {
        labelMap: {
          COUNT: '次数'
        }
      },
      monthlyData: {
        columns: ['department', 'bulletinNum'],
        rows: [
          // { 'months': '2020-02-11', 'COUNT': 1}
        ]
      },
      searchData: {
        userName: '',
        policeCode: '',
        department: '',
        problemType: '',
        startTime: '',
        endTime: ''
      },
      searchForm: [
        {type: 'input', prop: 'policeCode', width: '120px', placeholder: '姓名'},
        {
          type: 'select',
          prop: 'department',
          width: '150px',
          options: [{label:'治安部门', value:'0'},{label:'交通管理部门', value:'1'}],
          change: row => console.log(row),
          placeholder: '所属部门'
        },
        {
          type: 'select',
          prop: 'problemType',
          width: '150px',
          options: [{label:'表彰通报', value:'0'},{label:'批评通报', value:'1'}],
          change: row => console.log(row),
          placeholder: '护照状态'
        },
      ],
      tableList: [
        // {
        //   id: '123',
        //   enterprise: '123',
        //   reportedTime: '',
        //   reportedNum: '丰炳春',
        //   channelsNum: '局领导',
        //   isolationNum: '123123'
        // }
      ],
      options: {
        // 每页数据数
        pageSize: 10,
        hasIndex: false,
        // 当前页码
        currentPage: 1,
        loading: true,
        maxHeight: null,
        height:'372'
      },
      columns: [
        {
          prop: 'userName',
          label: '姓名',
          align: 'left'
        },
        {
          prop: 'certificatesType',
          label: '证件类型',
          formatter: 'certificatesType_format',
          options: {
            1: '护照',
            2: '港澳通行证',
            3: '中华人民共和国出入证',
            4: '其他'
          },
          align: 'left'
        },
        {
          prop: 'certificatesNumber',
          label: '证件号码',
          align: 'left'
        },
        {
          prop: 'issueDate',
          label: '有效期至',
          align: 'left'
        },
        {
          prop: 'validity',
          label: '签发日期',
          align: 'left'
        },
        {
          prop: 'certificateNo',
          label: '证件编号',
          align: 'left'
        },
        {
          prop: 'certificatesStatus',
          label: '证件状态',
          formatter: 'certificatesStatus_format',
          options: {
            1: '统一保管',
            2: '本人领取',
            3: '过期退回',
            4: '退休满两年',
            5: '单位调出',
            6: '其他'
          },
          align: 'left'
        },
      ],
      operates: {
        width: 250,
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
              // console.log(row)
              this.$refs.passportInfo.open(row);
            },
            showCallback: () => {
              return true;
            }
          },{
            id: '2',
            label: '修改',
            show: true,
            underline: false,
            icon: '<i class="el-icon-edit-outline"></i>',
            disabled: false,
            method: (key, row) => {
              console.log('修改',row)
            },
            showCallback: () => {
              return true;
            }
          },{
            id: '3',
            label: '删除',
            show: true,
            underline: false,
            icon: '<i class="el-icon-delete"></i>',
            disabled: false,
            method: (key, row) => {
              console.log('删除',row)
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
    certificatesType_format(row, column, prop){
      // console.log(column.options)
      return column.options[prop]
    },
    certificatesStatus_format(row, column, prop){
      return column.options[prop]
    },
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
    // 查询列表
    query(nCurrent = 1) {
      const $this = this;
      findPassport(
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
    // 根据护照的保管状态进行统计护照的数量 
    getStatisticsCustodyStatus() {
      const params = {
        userId: this.userId
      }
      StatisticsCustodyStatus(params).then(res => {
        // console.log(res)
        if (res.success && res.data) {
          let result = [];
          for (let item in res.data) {
            result.push({
              department: item,
              bulletinNum: res.data[item]
            })
          }
          this.departData.rows = result;
        }
      })
    },
    // 问题性质
    getBulletinExceptionStatistics() {
      const params = {
        userId: this.userId
      }
      bulletinExceptionStatistics(params).then(res => {
        // console.log(res)
        if (res.success && res.data) {
          let result = [];
          for (let item in res.data) {
            result.push({
              exception: item,
              times: res.data[item]
            })
          }
          this.exceptionData.rows = result;
        }
      })
    },
    // 根据护照类型统计
    // getStatisticsPassportType() {
    //   const params = {
    //     userId: this.userId
    //   }
    //   StatisticsPassportType(params).then(res => {
    //     // console.log(res)
    //     if (res.success && res.data) {
    //       let result = [];
    //       for (let item in res.data) {
    //         result.push({
    //           exception: item,
    //           times: res.data[item]
    //         })
    //       }
    //       this.monthlyData.rows = result;
    //       // this.monthlyData.rows = res.data;
    //     }
    //   })
    // },
    // 根据护照的保管状态进行统计护照的数量 
    getStatisticsPassportType() {
      const params = {
        userId: this.userId
      }
      StatisticsPassportType(params).then(res => {
        // console.log(res)
        if (res.success && res.data) {
          let result = [];
          for (let item in res.data) {
            result.push({
              department: item,
              bulletinNum: res.data[item]
            })
          }
          this.monthlyData.rows = result;
        }
      })
    },
  },
  mounted() {
    this.getStatisticsCustodyStatus();
    this.getStatisticsPassportType();
    this.getBulletinExceptionStatistics();
    this.query();
  }
}
</script>

<style lang="stylus" scoped>
@import "../../../styles/common.styl"
</style>
