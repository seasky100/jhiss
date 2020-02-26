<template>
  <div>
    <p>违规车管控</p>
    <el-row>
      <el-col :span="12">
        <ve-histogram :data="chartData"></ve-histogram>
      </el-col>
      <el-col :span="12">
        <ve-histogram :data="chartData"></ve-histogram>
      </el-col>
    </el-row>
    <div>
      <p>查询条件</p>
      <e-search 
        @handleSearch="handleSearch"
        :searchData="searchData"
        :searchForm="searchForm" />
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
</template>

<script>
import {
  findIlluseCarPage,
  monthIllUsecarStatistics,
  illUsecarHumanStatistics
} from '@/api/warn.js';

export default {
  data() {
    return {
      chartData: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
          { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
          { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
          { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
          { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
          { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
        ]
      },
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
        height:'550'
      },
      columns: [
        {
          prop: 'policeCode',
          label: '警号',
          align: 'left'
        },
        {
          prop: 'policeCode',
          label: '使用人',
          align: 'left'
        },
        {
          prop: 'bulletinObject',
          label: '所属部门',
          align: 'left'
        },
        {
          prop: 'bulletinDate',
          label: '车牌号',
          align: 'left'
        },
        {
          prop: 'problemNature',
          label: '用车时间',
          align: 'left'
        },
        {
          prop: 'problemNature',
          label: '还车时间',
          align: 'left'
        },
        {
          prop: 'problemNature',
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
            label: '查看',
            show: true,
            underline: false,
            icon: '<i class="el-icon-view"></i>',
            disabled: false,
            method: (key, row) => {
              console.log('row', row);
              // this.$router.push({
              //   name: 'enterprise-daily-details',
              //   query: {
              //     id: row.companyId,
              //     reportDate: row.reportTime
              //   }
              // });
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
      console.log(params)
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
      findIlluseCarPage(
        Object.assign(
          {
            nCurrent: nCurrent,
            nSize: 10,
            userId: '5ba98b66cd3549b9b92ea8723e89207e',
            role: '123',
            recordPlace: ''
          },
          $this.searchData
        )
      ).then(res => {
        console.log(res)
        this.$refs.recordSpTableRef.setPageInfo(
          nCurrent,
          res.data.size,
          res.data.total,
          res.data.records
        );
      })
    },
    // 图表分析
    getMonthIllUsecarStatistics() {
      const params = {
        userId: '5ba98b66cd3549b9b92ea8723e89207e',
        deptId: '111',
        role: '111'
      }
      monthIllUsecarStatistics(params).then(res => {
        console.log(res)
      })
    },
    getIllUsecarHumanStatistics() {
      const params = {
        userId: '5ba98b66cd3549b9b92ea8723e89207e',
        deptId: '111',
        role: '111'
      }
      illUsecarHumanStatistics(params).then(res => {
        console.log(res)
      })
    }
  },
  mounted() {
    this.getMonthIllUsecarStatistics();
    this.getIllUsecarHumanStatistics();
    this.query();
  }
}
</script>

