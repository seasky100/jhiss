<template>
  <div class="container">
    <div class="page-title">
      <span>检查通报</span>
    </div>
    <div class="content">
      <el-row class="bg-fff">
        <el-col :span="8">
          <!-- 以部门进行分类统计 -->
          <e-histogram
            :chartSettings="departmentSettings"
            :title="departmentTitle"
            :chartData="departData"
          />
        </el-col>
        <el-col :span="8">
          <!-- 问题性质分类统计 -->
          <!-- <ve-histogram :data="chartData"></ve-histogram> -->
          <e-histogram
            :chartSettings="exceptionSettings"
            :title="exceptionTitle"
            :chartData="exceptionData"
          />
        </el-col>
        <el-col :span="8">
          <!-- 按月统计 -->
          <e-histogram
            :chartSettings="monthlySettings"
            :title="monthlyTitle"
            :chartData="monthlyData"
          />
        </el-col>
      </el-row>
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
    <bulletin-info ref="bulletinInfo" />
  </div>
</template>

<script>
import {
  findBulletinPage,
  bulletinTypeStatistics,
  bulletinExceptionStatistics,
  bulletinTimesStatistics
} from '@/api/warn.js';
import { mapGetters } from 'vuex';
import BulletinInfo from './modal/bulletinInfo';

export default {
  components: {
    BulletinInfo
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  data() {
    return {
      departmentTitle: {
        text: '部门通报次数统计'
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
        text: '问题性质分类统计'
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
        text: '按月检查通报统计次数'
      },
      monthlySettings: {
        labelMap: {
          COUNT: '次数'
        }
      },
      monthlyData: {
        columns: ['months', 'COUNT'],
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
        {type: 'input', prop: 'policeCode', width: '120px', placeholder: '警号'},
        {type: 'input', prop: 'userName', width: '120px', placeholder: '通报对象'},
        {
          type: 'select',
          prop: 'department',
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
        },
        {
          type: 'select',
          prop: 'problemType',
          width: '150px',
          options: [{label:'表彰通报', value:'0'},{label:'批评通报', value:'1'}],
          change: row => console.log(row),
          placeholder: '通报类型'
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
        height:'560'
      },
      columns: [
        {
          prop: 'bulletinTitle',
          label: '标题',
          align: 'left'
        },
        {
          prop: 'policeCode',
          label: '警号',
          align: 'left'
        },
        {
          prop: 'bulletinObject',
          label: '被通报对象',
          align: 'left'
        },
        {
          prop: 'bulletinDate',
          label: '通报时间',
          align: 'left'
        },
        {
          prop: 'problemNature',
          label: '问题性质',
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
              this.$refs.bulletinInfo.open(row);
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
    // 查询列表
    query(nCurrent = 1) {
      const $this = this;
      findBulletinPage(
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
    // 部门通报次数
    getBulletinTypeStatistics() {
      const params = {
        userId: this.userId
      }
      bulletinTypeStatistics(params).then(res => {
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
    // 按月统计
    getBulletinTimesStatistics() {
      const params = {
        userId: this.userId
      }
      bulletinTimesStatistics(params).then(res => {
        // console.log(res)
        if (res.success && res.data) {
          this.monthlyData.rows = res.data;
        }
      })
    }
  },
  mounted() {
    this.getBulletinTypeStatistics();
    this.getBulletinExceptionStatistics();
    this.getBulletinTimesStatistics();
    this.query();
  }
}
</script>

<style lang="stylus" scoped>
@import "../../../styles/common.styl"
</style>
