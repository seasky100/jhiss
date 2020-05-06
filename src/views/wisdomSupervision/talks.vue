<template>
  <div class="container">
    <div class="page-title">
      <span>谈话谈心</span>
    </div>
		<div class="content">
      <div class="search-wrap">
        <div class="section-title">查询条件</div>
        <e-search
          class="search-form"
          @handleSearch="handleSearch"
          :searchData="searchData"
          :searchForm="searchForm"
          :btnsConfig="btnsConfig"
           @addClickHandle="addClickHandle" />
      </div>
      <div>
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
    <!-- 新增谈话类容 -->
    <talk-modal ref="talkModal" @query="query" />
  </div>
</template>
<script>
import { findInterViewPage, deleteInterView } from '@/api/report.js';

import TalkModal from './modal/talkModal';

export default {
  name: "IndividualReport",
  components: {
    TalkModal
  },
  data() {
    return {
      userId: '',
      orgName:'',
      addForm: '/TalkAdd',
      btnsConfig: {
        showAdd: true
      },
			searchData: {
        userName: '',
        department: '',
        startTime: '',
        endTime: '',
        policeCode: ''
			},
			searchForm: [
        {label:'姓名：',type: 'input', prop: 'userName', width: '120px', placeholder: ''},
        {label:'警号：',type: 'input', prop: 'policeCode', width: '120px', placeholder: ''},
        {
          label:'所属部门：',
          type: 'select',
          prop: 'department',
          width: '150px',
          options: [{label:'治安部门', value:'0'},{label:'交通管理部门', value:'1'}],
          change: row => console.log(row),
          placeholder: '所属部门'
        },
        {
          label:'筛选时间：',
          type: 'daterange',
          options: [
            {
              prop: 'startTime',
              format: 'yyyy-MM-dd',
              valueformat: 'yyyy-MM-dd',
              placeholder: '起始时间'
            },
            {
              prop: 'endTime',
              format: 'yyyy-MM-dd',
              valueformat: 'yyyy-MM-dd',
              placeholder: '结束时间'
            }
          ]
				}
			],
			tableList:[],
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
          prop: 'interviewTime',
          label: '谈话时间',
          align: 'left'
        },
        {
          prop: 'interviewMan',
          label: '被谈话人',
          align: 'left'
        },
        {
          prop: 'userName',
          label: '谈话领导',
          align: 'left'
        },
        {
          prop: 'interviewType',
          formatter: 'interviewType_formatter',
          options: {
            1: '谈话谈心',
            2: '家庭走访',
            3: '约谈提醒',
            4: '帮助教育',
            5: '其他'
          },
          label: '谈话类型',
          align: 'left'
        },
        {
          prop: 'deptName',
          label: '所属部门',
          align: 'left'
				}
      ],
      operates: {
        width: 200,
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
              this.$refs.talkModal.open('view', row);
            },
            showCallback: () => {
              return true;
            }
          },
          {
            id: '2',
            label: '修改',
            show: true,
            underline: false,
            icon: '<i class="el-icon-edit-outline"></i>',
            disabled: false,
            method: (key, row) => {
              this.$refs.talkModal.open('update', row);
            },
            showCallback: () => {
              return true;
            }
          },
          {
            id: '3',
            label: '删除',
            show: true,
            underline: false,
            icon: '<i class="el-icon-delete"></i>',
            disabled: false,
            method: (key, row) => {
              const $this = this;
              $this
                .$confirm('是否删除？', '确认信息', {
                  distinguishCancelAndClose: true,
                  confirmButtonText: '删除',
                  cancelButtonText: '取消'
                })
                .then(() => {
                  deleteInterView({ id: row.id })
                    .then((res) => {
                      try {
                        if (res.success) {
                          $this.$message({
                            type: 'success',
                            message: '删除成功'
                          });
                          $this.init();
                        }
                      } catch (e) {
                        console.log('ERROR', e);
                      }
                    });
                })
                .catch(() => {
                  return;
                });
            },
            showCallback: () => {
              return true;
            }
          }
        ]
      }
    }
  },
  watch: {},
  mounted() {
    this.userId = sessionStorage.userId
    this.orgName = sessionStorage.orgName
    this.init()
  },
  methods: {
		init() {
      this.query();
    },
    interviewType_formatter(row, column, prop){
      // console.log(row)
      // console.log(prop)
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
			// console.log(val)
      next();
		},
		// 查询列表
    query(nCurrent = 1) {
			// console.log(nCurrent)
      const _this = this;
      findInterViewPage(
        Object.assign(
          {
            nCurrent: nCurrent,
            nSize: 10,
            department: _this.orgName,
            orderFlag: false,
            orderByField: 'interviewTime'
          },
          _this.searchData
        )
      ).then(res => {
        // console.log(res)
        this.$refs.recordTalksTableRef.setPageInfo(
          nCurrent,
          res.data.size,
          res.data.total,
          res.data.records
        );
      })
    },
    // 新增
    addClickHandle() {
      this.$refs.talkModal.open('add');
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "../../styles/common.styl";
</style>
