<template>
  <div class="container">
    <div class="page-title">
      <span>学习教育</span>
    </div>
    <div class="content">
      <div class="search-wrap" style="min-width:800px;height:65px;">
        <!-- <div class="section-title">查询条件</div> -->
        <e-search
          class="search-form"
          @handleSearch="handleSearch"
          :searchData="searchData"
          :searchForm="searchForm"
          :btnsConfig="btnsConfig"
          @addClickHandle="addClickHandle"
        />
      </div>
      <div class="search-wrap" style="height:760px;">
        <e-table
          ref="recordTalksTableRef"
          :tableList="tableList"
          :options="options"
          :columns="columns"
          :operates="operates"
          @afterCurrentPageClick="afterCurrentPageClickHandle"
        />
      </div>
    </div>
    <!-- 弹出框 -->
		<education-info :title="educationTitle" :dialogType="dialogType" ref="educationInfo" />
  </div>
</template>
<script>
import { findInterViewPage, deleteInterView } from "@/api/report.js";
import { getRiskByUserId, getRiskPage } from "@/api/report.js";
import { getUserListByUserId } from '@/api/user-server.js';
import { mapGetters } from "vuex";
import educationInfo from './EducationInfo'
export default {
  name: "IndividualReport",
  components: {
    educationInfo
  },
  data() {
    return {
      educationTitle: '学习记录',
      dialogType: '',
      userId: "",
      userIds: '',
      orgName: "",
      searchData: {
        userName: "",
        department: "",
        startTime: "",
        endTime: "",
        policeCode: ""
      },
      searchForm: [
        {
          label: "姓名：",
          type: "input",
          prop: "userName",
          width: "120px",
          placeholder: ""
        },
        // {label:'警号：',type: 'input', prop: 'policeCode', width: '120px', placeholder: ''},
        {
          // label: '所属部门',
          type: "select_tree",
          prop: "department",
          options: this.orgData,
          config: {
            value: "id",
            label: "name",
            children: "childrens",
            disabled: true
          }
        }
        // {
        // label:'筛选时间：',
        // type: 'daterange',
        // options: [
        //     {
        //     prop: 'startTime',
        //     format: 'yyyy-MM-dd',
        //     valueformat: 'yyyy-MM-dd',
        //     placeholder: '起始时间'
        //     },
        //     {
        //     prop: 'endTime',
        //     format: 'yyyy-MM-dd',
        //     valueformat: 'yyyy-MM-dd',
        //     placeholder: '结束时间'
        //     }
        // ]
        //         }
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
        height: "680"
      },
      columns: [
        {
          prop: "realName",
          label: "用户名称",
          align: "left"
        },

        {
          prop: "jobName",
          formatter: 'jobName_formatter',
          label: "岗位名称",
          align: "left"
        },
        {
          prop: "organizationNames",
          label: "所属部门",
          align: "left"
        },
        {
          prop: "graduateSchool",
          formatter: 'graduate_formatter',
          label: "毕业院校",
          align: "left"
        }
      ],
      operates: {
        width: 150,
        fixed: "right",
        list: [
          {
            id: "1",
            label: "详情",
            show: true,
            underline: false,
            icon: '<i class="el-icon-view"></i>',
            disabled: false,
            method: (key, row) => {
              // console.log(row)
              this.$refs.educationInfo.open(row);
            },
            showCallback: () => {
              return true;
            }
          }
        ]
      }
    };
  },
  watch: {},
  mounted() {
    this.searchForm[1].options = this.orgData;
    this.userId = sessionStorage.userId;
    this.orgName = sessionStorage.orgName;
    this.init();
  },
  computed: {
    ...mapGetters(["orgData"])
  },
  methods: {
    jobName_formatter(row, column, prop){
      return row.userInfo.job
    },
    graduate_formatter(row, column, prop){
      return `${row.userInfo.entryForm} ${row.userInfo.graduateSchool}`
    },
    init() {
      // this.getUserListByUserId()
      this.query();
    },
    interviewType_formatter(row, column, prop) {
      // console.log(row)
      // console.log(prop)
      return column.options[prop];
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
      // console.log(val)
      next();
    },
    // 查询列表
    query(nCurrent = 1) {
      // console.log(nCurrent)
      const _this = this;
      getUserListByUserId(
        Object.assign(
          {
            // userId: _this.$store.state.user.userInfo.id,
            userId: _this.userId,
            nCurrent: nCurrent,
            nSize: 30
          },
          _this.searchData
        )
      ).then(res => {
        // console.log(res)
        this.$refs.recordTalksTableRef.setPageInfo(
          1, 30, 0, res.data
          // nCurrent,
          // res.data.size,
          // res.data.total,
          // res.data.records
        );
      });
    },
    // 根据用户ID查询所有下属用户
    getUserListByUserId() {
        const _this = this;
        const params = {
          userId: _this.$store.state.user.userInfo.id 
        }
        getUserListByUserId(params).then(res => {
          if (res.success) {
            // _this.userIds = res.data.map(item => item.userInfo.info).join()
            _this.userIds = res.data.map(item => item.userInfo.id).join()
            // _this.query()
          }
        })
    },
    // 新增
    addClickHandle() {
      this.$refs.educationInfo.open();
    }
  }
};
</script>
        <style lang="stylus" scoped>
        @import '../../../styles/common.styl';
</style>
        