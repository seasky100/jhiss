<template>
  <div class="container">
        <e-table
          ref="recordSpTableRef"
          :tableList="tableList"
          :options="options"
          :columns="columns"
          :operates="operates"
          @afterCurrentPageClick="afterCurrentPageClickHandle"
        />
  </div>
</template>
<script>
import { getUserListByUserId } from '@/api/user-server.js';
import { findReportPage } from '@/api/report.js';
import { mapGetters } from 'vuex';
export default {
  name: "IndividualReport",
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  data() {
    return {
      userIds:'',
			tableList:[],
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
          prop: 'policeCode',
          label: '发起人警号',
          align: 'left'
        },
        {
          prop: 'sponsorName',
          label: '发起人姓名',
          align: 'left'
        },
        {
          prop: 'department',
          label: '发起人部门',
          align: 'left'
        },
        {
          prop: 'reportType',
          label: '即报类型',
          formatter: 'reportType_format',
          options: {
            101: '婚姻情况',
            102: '婚丧宴请',
            103: '收受礼金',
            104: '因私出境',
            105: '移居国外',
            106: '亲属从业',
            107: '违法违纪及意外',
            108: '房产变更',
            109: '境外投资',
            110: '担保借贷',
            111: '亲属经商',
            112: '境外存款',
            113: '其他'
          },
          align: 'left'
        },
        {
          prop: 'gmtCreate',
          label: '申请时间',
          align: 'left',
          type: 'date'
				},
				{
          prop: 'approvalStatus',
          formatter: 'approval_format',
          options: {
            1: '审批中',
            2: '已通过',
            3: '已驳回'
          },
          label: '审批状态',
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
              console.log('row', row);
              this.$router.push({path: '/organizationRequestDetail', query: { flowCode: row.flowCode }})
            },
            showCallback: () => {
              return true;
            }
          }
        ]
      },
    }
  },
  watch: {},
  mounted() {
    this.getUserListByUserId()
    // this.init()
  },
  methods: {
		init() {
      this.query();
    },
    	// 根据用户ID查询所有下属用户
		getUserListByUserId() {
        const _this= this;
        const params = {
          userId: _this.userId 
        }
        getUserListByUserId(params).then(res => {
          if (res.success) {
            _this.userIds = res.data.map(item => item.id).join()
            this.query();
          }
        })
      },
    approval_format(row, column, prop) {
      return column.options[prop]
    },
    reportType_format(row, column, prop){
      // console.log(column.options)
      return column.options[prop]
    },

		// 分页点击事件
    afterCurrentPageClickHandle(val, next) {
			this.query(val);
      next();
		},
		ApplyReport(value){
			this.$router.push({ path: value.path });
		},
		// 查询列表
    query(nCurrent = 1) {
      const $this = this;
      findReportPage(
        Object.assign(
          {
            nCurrent: nCurrent,
            nSize: 10,
            userId: $this.userId + ','+ $this.userIds,
            approvalId: '',
            reportType: '1'
          },
          $this.searchData
        )
      ).then(res => {
        this.$refs.recordSpTableRef.setPageInfo(
          nCurrent,
          res.data.size,
          res.data.total,
          res.data.records
        );
      })
    },
  }
}
</script>
<style lang="stylus" scoped>
@import "../../styles/common.styl";

.Individual_type{
  padding: 10px 10px 0;
  cursor: pointer;
  span{
		
    padding: 3px 14px;
		border-radius: 2px;
		color: #515A6E;
    display: block;
  }
  .block_image{
    padding: 5px 0;
    text-align: center;
    border-right: 1px solid #eff2f6;
    display: inline-block;
    box-sizing: border-box;
    vertical-align: top;
  }
}

</style>
