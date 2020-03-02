<template>
  <div class="container">
    <div class="page-title">
      <span>涉嫌违法管控</span>
    </div>
    <div class="content">
      <el-row class="bg-fff">
        <el-col :span="12">
          <!-- 被查询系统次数统计 -->
          <e-histogram
            :chartSettings="warnStatusSettings"
            :title="warnStatusTitle"
            :chartData="warnStatusStatistics"
            :xAxis="axisOptions"
          />
        </el-col>
        <el-col :span="12">
          <!-- 次数统计 -->
          <ve-line
            :title="title"
            :data="humanStatistics"
            :extend="chartExtend"
            :settings="chartSettings"
            :legend-visible="false">
          </ve-line>
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
  </div>
</template>

<script>
import {
  findIllgalPage,
  illgalBySource,
  illgalByDayStatistics
} from '@/api/warn.js';

export default {
  data() {
    this.chartExtend = {
      series: {
        smooth: false
      },
      'xAxis.0.axisLabel.rotate': 30
    };
    this.chartSettings = {
      labelMap: {
        warnnum: '次数'
      }
    }
    this.axisOptions = {
      axisLabel: {
        rotate: 30
      }
    }
    // this.chartSettings1 = {
    //   labelMap: {
    //     num: '数量'
    //   }
    // }
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
          prop: 'dept_id',
          width: '150px',
          options: [{label:'治安部门', value:'0'},{label:'交通管理部门', value:'1'}],
          change: row => console.log(row),
          placeholder: '所属部门'
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
        height:'500'
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
          prop: 'warnTime',
          label: '来源',
          align: 'left'
        },
        {
          prop: 'warnReason',
          label: '事由',
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
              // this.$refs.warningDialog.open(row);
            },
            showCallback: () => {
              return true;
            }
          }
        ]
      },
      warnStatusTitle: {
        text: '涉嫌违法统计'
      },
      warnStatusSettings: {
        labelMap: {
          warnnum: '次数'
        }
      },
      warnStatusStatistics: {
        columns: ['source', 'warnnum'],
        rows: []
      },
      humanStatistics: {
        columns: ['warndate', 'warnnum'],
        rows: []
      },
      title: {
        text: '次数统计',
        left: 'center'
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
    // 折线图
    getillgalByDayStatistics() {
      const params = {
        userId: '5ba98b66cd3549b9b92ea8723e89207e'
      }
      illgalByDayStatistics(params).then(res => {
        console.log(res)
        if (res.success) {
          this.humanStatistics.rows = res.data;
        }
      })
    },
    // 柱状图
    getillgalBySource() {
      const params = {
        userId: '5ba98b66cd3549b9b92ea8723e89207e'
      }
      illgalBySource(params).then(res => {
        if (res.success) {
          this.warnStatusStatistics.rows = res.data;
        }
      })
    },
    // 查找列表数据
    query(nCurrent = 1) {
      const $this = this;
      findIllgalPage(
        Object.assign(
          {
            nCurrent: nCurrent,
            nSize: 10,
            user_id: '5ba98b66cd3549b9b92ea8723e89207e',
            dept_id: '123',
            role: '123'
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
    this.getillgalByDayStatistics();
    this.getillgalBySource();
    this.query();
  }
}
</script>

<style lang="stylus" scoped>
@import "../../../styles/common.styl"
</style>
