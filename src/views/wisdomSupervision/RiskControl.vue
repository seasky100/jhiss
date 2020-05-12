<template>
    <div class="container">
        <div class="page-title">
            <span>预警管控</span>
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

            <div class="search-wrap" style="height:637px;">
                <e-table
                        ref="recordSpTableRef"
                        :options="options"
                        :columns="columns"
                        :operates="operates"
                        :tableList="tableList"
                        @afterCurrentPageClick="afterCurrentPageClickHandle"
                />
            </div>
        </div>
        <!--详情-->
        <earlyWarningDetail ref="earlyWarningDetail" />
    </div>
</template>

<script>
import { getRepastSiteWarnStatistics, getRepastWarnTimesStatistics, getFindMealCardPage } from '@/api/wisdom-reminder/perceptual-wisdom.js'
import earlyWarningDetail from './modal/earlyWarningDetail'
import { mapGetters } from "vuex";
export default {
  components: {
    earlyWarningDetail
  },
   computed: {
    ...mapGetters(["orgData"])
  },
  data() {
    return {
      // 表格
      searchData: {
          userName: '',
          dept_id: sessionStorage.orgId,
          startTime: '',
          endTime: '',
          orderByField: 'warnTime',
          isAsc: false,
      },
      searchForm: [
            { label: '', type: 'input', prop: 'userName', width: '120px', placeholder: '姓名' },
            // {label:'警号：',type: 'input', prop: 'policeCode', width: '120px', placeholder: ''},
            {
                // label: '所属部门',
                type: 'select_tree',
                prop: 'dept_id',
                options: this.orgData,
                config: {
                    value: 'id',
                    label: 'name',
                    children: 'childrens',
                    disabled: true
                },
            },
            {
                type: 'select1',
                prop: 'warnType',
                width: '150px',
                options: [
                    {label:'考勤预警', value:'1'},
                    {label:'请假预警', value:'2'},
                    {label:'事项申报预警', value:'3'},
                    {label:'违规查询预警', value:'4'},
                    {label:'日志预警', value:'5'},
                    {label:'涉嫌违法预警', value:'6'},
                    {label:'用车预警', value:'7'},
                    {label:'出国预警', value:'8'},
                    {label:'差旅预警', value:'9'},
                    {label:'刷卡预警', value:'10'},
                    {label:'就餐预警', value:'11'},
                    {label:'审批预警', value:'12'},
                ],
                change: row => console.log(row),
                placeholder: '--预警类别--'
            },
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

      options: {
            pageSize: 10,
            hasIndex: false,
            currentPage: 1,
            loading: true,
            maxHeight: null,
            height: '556'
        },
      columns: [
            // {
            //     prop: 'police_code',
            //     label: '警号',
            //     align: 'left'
            // },
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
            // {
            //     prop: 'warnReason',
            //     label: '预警原因',
            //     align: 'left'
			// },
			{
				prop: 'warnType',
				formatter: 'warnType_format',
				options: {
					1: '考勤预警',
					2: '请假预警',
					3: '事项申报预警',
					4: '违规查询预警',
					5: '日志预警',
					6: '涉嫌违法预警',
					7: '用车预警',
					8: '出国预警',
					9: '差旅预警',
					10: '刷卡预警',
					11: '就餐预警',
					12: '审批预警',
				},
                label: '预警类别',
                align: 'left'
            },
            {
                prop: 'warnTime',
                label: '预警时间',
                align: 'left',
                type: 'date',
                dateFormat: 'yyyy-MM-dd HH:mm:ss'
            },
            {
                prop: 'comment',
                label: '预警内容',
                align: 'left',
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
                        this.$refs.earlyWarningDetail.open(row);
                    },
                    showCallback: () => {
                        return true;
                    }
                }
            ]
        },
      tableList: [],
      userParams: {
          userID: '',
          deptId: '123',
          role: '11'
      }
    }
  },
   mounted() {
    this.searchForm[1].options = this.orgData;
    this.userId = sessionStorage.userId;
    this.orgName = sessionStorage.orgName;
  },
  methods: {
		warnType_format(row, column, prop){
			return column.options[prop]
		},
      // 分页点击事件
      afterCurrentPageClickHandle(val, next) {
          this.query(val);
          next();
      },
      // 查询
      handleSearch(params) {
          Object.assign(this.searchData, params);
          // console.log(params)
          this.query();
      },
      // 查询列表
      query(nCurrent = 1) {
          const $this = this;
          getFindMealCardPage(Object.assign({
              nCurrent: nCurrent,
              nSize: 10,
              orderByField: ''
          }, $this.searchData)).then((res) => {
              console.log(res.data)
              this.$refs.recordSpTableRef.setPageInfo(
                  nCurrent,
                  res.size,
                  res.total,
                  res.data
              );
          });
      },
      sortfunc(attr, rev) {
          if (rev == undefined) {
              rev = 1
          }
          return (a, b) => {
              a = a[attr]
              b = b[attr]
              if (a < b) {
                  return rev * 1
              }
              if (a > b) {
                  return rev * -1
              }
              return 0
          }
      },
    },
  created() {
    this.userInfo = JSON.parse(sessionStorage.userInfo)
    this.userParams.userID = this.userInfo.info
    // 就餐地点预警地点统计 (给参数userParams会无数据)
    const params = {
        warnType: 11,
    }
    getRepastSiteWarnStatistics(params).then((res) => {
        const data = res.sort(this.sortfunc('warnnum')) // 排序后获得前五组数值最大的数据
        const arry = data.splice(0,5)
        this.repastPlace.data.rows = arry
    })

    // 每日就餐预警次数统计 (给参数userParams会无数据)
    getRepastWarnTimesStatistics(params).then((res) => {
        this.creditCardTime.data.rows = res
    })

    // 提前就餐分页
    this.query()
  }
};
</script>

<style lang="stylus" scoped>
@import "../../styles/common.styl";
</style>
