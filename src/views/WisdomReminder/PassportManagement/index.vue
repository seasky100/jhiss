<template>
  <div class="container">
    <div class="page-title">
      <img style="margin-right:8px;" src='@/utils/img/home_round_bar@2x.png' /> 
      <span>护照管理</span>
    </div>
    <div class="content">
      <el-row class="bg-fff">
        <el-col :span="8" style="width:calc(33.3% - 5px);margin-right:8px;">
          <!-- 保管状态统计 -->
          <e-histogram
            :chartSettings="departmentSettings"
            :title="departmentTitle"
            :chartData="departData"
          />
        </el-col>
        <el-col :span="8" style="width:calc(33.3% - 5px);margin-right:8px;">
          <!-- 护照类型统计 -->
          <!-- <ve-histogram :data="chartData"></ve-histogram> -->
          <e-histogram
            :chartSettings="monthlySettings"
            :title="monthlyTitle"
            :chartData="monthlyData"
          />
        </el-col>
        <el-col :span="8" style="width:calc(33.3% - 5px);">
          <!-- 有无护照情况 -->
          <e-histogram
            :chartSettings="exceptionSettings"
            :title="exceptionTitle"
            :chartData="exceptionData"
          />
        </el-col>
      </el-row>
      <div class="search-wrap" style="min-width:1090px;">
        <!-- <div class="section-title">查询条件</div> -->
        <e-search style="display:inline-block;"
          class="search-form"
          @handleSearch="handleSearch"
          :searchData="searchData"
          :searchForm="searchForm" />
          <div style="display:inline-block;position:relative;top:8px;left:-15px;">
            <el-button size="small" type="default" class="addBtn" @click="addFormClick">
              新增
            </el-button>
            <el-button size="small" type="default" class="addBtn" @click="export2Excel">
              导出excel
            </el-button>
            <e-upload class="addBtn" :limit="1"
              titleLabel="上传模板数据"
              style="display:inline-block"
              @changeHandler="addExcelClick" />
            <el-link style="margin-left:15px;" type="default" :href="path+'护照导入模板.xlsx'">
              下载模板 <i class="el-icon-download"></i>
            </el-link>
          </div>
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
    <passport-info :title="passportTitle" :dialogType="dialogType" ref="passportInfo" />
  </div>
</template>

<script>
import {
  findPassport,
  StatisticsCustodyStatus,
  StatisticsPassportType,
  StatisticsPassportwhether,
  ImportExcelPassport,
  deletePassport,
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
      path: process.env.BASE_URL,
      passportTitle: '',
      dialogType: 1, // 1.详情 2.添加 3.修改
      departmentTitle: {
        text: '保管状态统计'
      },
      departmentSettings: {
        labelMap: {
          bulletinNum: '保管数量'
        }
      },
      departData: {
        columns: ['department', 'bulletinNum'],
        rows: [
          // { 'department': '纪检委', 'bulletinNum': 1}
        ]
      },
      exceptionTitle: {
        text: '民警持有证件情况'
      },
      exceptionSettings: {
        labelMap: {
          NoPassport: '数量'
        }
      },
      exceptionData: {
        columns: ['havePassport', 'NoPassport'],
        rows: [
          // { 'exception': '1', 'times': 1}
        ]
      },
      monthlyTitle: {
        text: '护照类型统计'
      },
      monthlySettings: {
        labelMap: {
          bulletinNum: '护照数量'
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
        endTime: '',
        certificatesStatus: null,
      },
      searchForm: [
        {type: 'input', prop: 'userName', width: '120px', placeholder: '姓名'},
        // {
        //   type: 'select',
        //   prop: 'department',
        //   width: '150px',
        //   options: [{label:'治安部门', value:'0'},{label:'交通管理部门', value:'1'}],
        //   change: row => console.log(row),
        //   placeholder: '所属部门'
        // },
        {
          type: 'select',
          prop: 'certificatesStatus',
          width: '150px',
          options: [
            {label:'统一保管', value:'1'},
            {label:'本人领取', value:'2'},
            {label:'过期退回', value:'3'},
            {label:'退休满两年', value:'4'},
            {label:'单位调出', value:'5'},
            {label:'其他', value:'6'},
          ],
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
      tableData: [],
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
          prop: 'certificateNo',
          label: '证件编号',
          align: 'left'
        },
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
            3: '台湾通行证',
            4: '中华人民共和国出入证',
            5: '其他'
          },
          align: 'left'
        },
        {
          prop: 'certificatesNumber',
          label: '证件号码',
          align: 'left'
        },
        {
          prop: 'validity', 
          label: '有效期至',
          align: 'left'
        },
        {
          prop: 'issueDate',
          label: '签发日期',
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
              this.passportTitle = '护照详情'
              this.dialogType = 1
              this.$nextTick(() => {
                this.$refs.passportInfo.open(row);
              })
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
              // console.log('修改',row)
              this.passportTitle = '修改护照信息'
              this.dialogType = 3
              this.$nextTick(() => {
                this.$refs.passportInfo.open(row);
              })
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
              // console.log('删除',row)
              this.deleteHandlerPassport(row)
            },
            showCallback: () => {
              return true;
            }
          }
        ]
      }
    }
  },
  mounted() {
    this.getStatisticsCustodyStatus();
    this.getStatisticsPassportType();
    this.getStatisticsPassportwhether();
    this.query();
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
      this.$store.commit('showLoading')
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
        this.tableData = res.data.records
        this.$store.commit('hideLoading')
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
          const options = {
            1: '统一保管',
            2: '本人领取',
            3: '过期退回',
            4: '退休满两年',
            5: '单位调出',
            6: '其他'
          }
          for (let item in res.data) {
            result.push({
              department: options[item],
              bulletinNum: res.data[item]
            })
          }
          this.departData.rows = result;
        }
      })
    },
    // 统计民警有护照没护照情况 StatisticsPassportwhether
    getStatisticsPassportwhether() {
      const params = {
        userId: this.userId
      }
      StatisticsPassportwhether(params).then(res => {
        // console.log(res)
        if (res.success && res.data) {
          let result = [];
          for (let item in res.data) {
            result.push({
              havePassport: item.includes('have')?'有护照':'无护照',
              NoPassport: res.data[item]
            })
          }
          this.exceptionData.rows = result;
        }
      })
    },
    // 根据护照类型统计 
    getStatisticsPassportType() {
      const params = {
        userId: this.userId
      }
      StatisticsPassportType(params).then(res => {
        // console.log(res)
        if (res.success && res.data) {
          let result = [];
          const options = {
            1: '护照',
            2: '港澳通行证',
            3: '台湾通行证',
            4: '中华人民共和国出入证',
            5: '其他'
          }
          for (let item in res.data) {
            result.push({
              department: options[item],
              bulletinNum: res.data[item]
            })
          }
          this.monthlyData.rows = result;
        }
      })
    },
    // 根据护照类型统计 
    deleteHandlerPassport(row) {
      const params = {
        id: row.id,
        version: row.version
      }
      deletePassport(params).then(res => {
        // console.log(res)
        if (res.success && res.data) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.query()
        }else{
          this.$message({
            type: 'error',
            message: '删除失败'
          })
        }
      })
    },
    addFormClick(){
      this.passportTitle = '新增护照信息'
      this.dialogType = 2
      this.$nextTick(() => {
        this.$refs.passportInfo.open()
      })
    },
    // 导入excel护照信息
    addExcelClick(fileList){
      // console.log(fileList)
      this.$store.commit('showLoading')
      const params = {
        file: fileList[0].raw,
        uploadFile: fileList[0].raw
      }
      ImportExcelPassport(params).then(res => {
        // console.log(res)
        if (res.success && res.data) {
          this.$store.commit('hideLoading')
        }
      })
    },
    // 导出excel表格
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    export2Excel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require('@/vendor/Export2Excel')
        const tHeader = ['姓名', '证件类型', '证件号码', '有效期至', '签发日期', '证件编号', '证件状态']
        const filterVal = ['userName', 'certificatesType', 'certificatesNumber', 'validity', 'issueDate', 'certificateNo', 'certificatesStatus']
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '护照信息')
      })
    },
    // 
  }
}
</script>

<style lang="stylus" scoped>
@import "../../../styles/common.styl"
.addBtn
  margin-left 10px
</style>
