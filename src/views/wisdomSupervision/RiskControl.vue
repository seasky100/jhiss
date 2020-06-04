<template>
    <div class="container">
        <div class="page-title">
            <span>预警管控</span>
            </div>
        <div class="content">
            <div class="search-wrap">
                <div class="section-title">查询条件</div>
                <div style="display: flex;margin-top: 9px;">
                    <div class='department'>
                        <select-tree v-model="ruleForm.department1"   :props="config" :treeData="arryData" @change="orgChange" placeholder="请选择部门"
                        />
                    </div>
                    <div class='department'>
                        <el-select v-model="id3" placeholder="姓名" @change="selectChange3">
                            <el-option v-for="item in approvalArr" :key="item.id" :label="item.realName" :value="item.id">
                            </el-option>
                        </el-select>
                    </div> 
                     <!-- <el-select :disabled="disabled"                  
                    clearable
                    v-model="searchData[item.prop]"
                    :style="{width: item.width}"
                    @change="item.change(searchData[item.prop])">
                      <el-option
                        v-for="option in item.options"
                        :label="option.label"
                        :value="option.label"
                        :key="option.value">
                      </el-option>
                  </el-select> -->
                     <!-- <el-button style="height: 36px;margin-left: 9px;" type="primary" @click="handleSearch">查询</el-button>
                    <el-button style="height: 36px;margin-left: 9px;" @click="resetForm" type="danger">清空</el-button> -->
                 
               <div>
                <e-search
                class="search-form"
                @handleSearch="handleSearch"
                :searchData="searchData"
                :searchForm="searchForm"
                :btnsConfig="btnsConfig"
                @addClickHandle="addClickHandle" /> 
            </div>
            </div>
            </div>
            <div style="text-align: -webkit-auto;margin-bottom: 12px;margin-left: 10px;">
                    <el-switch v-model='value' @change='group' active-text='我的预警' active-color='#13ce66' inactive-text='我的下属' inactive-color='#ff4949'>
                      </el-switch>
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
import { getUserListByUserId,getUserList } from "@/api/user-server.js";
import { getPostByUserId } from "@/api/report.js";
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
        value: true,
        disabled: true,
        id3: '',
        arryData:[],
        ruleForm: {
            department1: sessionStorage.orgName,

        },
        config: {
        value: 'id',
        label: 'name',
        children: 'childrens',
        disabled: true
      },
            // 表格
        searchData2: {
            dept_id: '',
            // dept_id: sessionStorage.orgId,
            userName:'',
            startTime: '',
            endTime: '',
            orderByField: 'warnTime',
            isAsc: false,
        },
      // 表格
      searchData: {
          userName: '',
          // dept_id: sessionStorage.orgId,
          startTime: '',
          endTime: '',
          orderByField: 'warnTime',
          isAsc: false,
      },
      searchForm: [
            // {label:'警号：',type: 'input', prop: 'policeCode', width: '120px', placeholder: ''},
            // {
            //     // label: '所属部门',
            //     type: 'select_tree',
            //     prop: 'dept_id',
            //     options: this.orgData,
            //     config: {
            //         value: 'id',
            //         label: 'name',
            //         children: 'childrens',
            //         disabled: true
            //     },
            // },
            // { label: '', type: 'input', prop: 'userName', width: '120px', placeholder: '姓名' },
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
            // {
            //     prop: 'userName',
            //     label: '姓名',
            //     align: 'left'
            // },
            
            // {
            //     prop: 'department',
            //     label: '部门',
            //     align: 'left'
            // },
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
      approvalArr: [],
      approvalList: [],
      userParams: {
          userID: '',
          deptId: '123',
          role: '11'
      }
    }
  },
    mounted() {
        debugger
        const grade = sessionStorage.grade
        if (grade && grade == 2 ||grade == 3) {
            this.config = {
                value: 'orgId',
                label: 'name',
                children: 'childrens',
                disabled: true
            },
            this.getPostByUserId()
        } else if (grade && grade == 1) {

            this.arryData = this.orgData

        }  else if (grade && grade == 4) {

            const data = this.orgData[0].childrens
            const orgId = sessionStorage.orgId
            this.orgChange(orgId)
            this.ruleForm.department1 = orgId
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === orgId) {
                    this.arryData.push(data[i])
                }
            }
            // this.searchForm[0].options = this.arryData;

        }else {
            const data = this.orgData[0].childrens
            const orgId = sessionStorage.orgId
            this.orgChange(orgId)
            this.ruleForm.department1 = orgId
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === orgId) {
                    this.arryData.push(data[i])
                }
            }
            this.id3 = sessionStorage.realName
            // this.searchForm[0].options = this.arryData;
        }
       

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
      // 提交
    //   submitForm() {
    //       alert(2)
    //     //   if (this.rules) {
    //     //       return this.$refs["ruleForm"].validate(valid => {
    //     //           if (!valid) return false;
    //     //           this.$emit("handleSearch", this.searchData);
    //     //       });
    //     //   }
    //     //   this.$emit("handleSearch", this.searchData);
    //   },
      // 重置
      resetForm() {
          this.id3 = ''
          this.resetForm.department1=''
          this.searchData2.userName = ''
        //   this.searchData2.dept_id = ''
      },
		// 查询
		handleSearch(params) {
            debugger
				Object.assign(this.searchData2, params);
                // console.log(params)
                this.searchData2.user_id = ''
				this.query();
        },
      selectChange3(val) {
          debugger
          const result = this.approvalArr.filter(item => {
              return item.id === val;
          })
          this.approvalList = result;
          this.searchData2.userName = result[0].realName;
      },
		// 查询列表
      query(nCurrent = 1) {
          debugger
          getUserListByUserId({
              userId: sessionStorage.userId,
          }).then(res => {
              let leaderStr = res.data.map(item => {
                  return item.id
              })
              if(this.value==true){
                leaderStr = sessionStorage.userId
              }else{
                // leaderStr.unshift(sessionStorage.userId)
                leaderStr = leaderStr.join(',')
              }
              // console.log(leaderStr)
              this.getDataList(nCurrent, leaderStr)
          });
          // this.getDataList(nCurrent)
      },
      getPostByUserId() { // 根据id获取个人岗位
          const params = {
            userId: sessionStorage.userId
          }
          getPostByUserId(params).then(res => {
              if (res.success && res.data && res.data.length > 0) {
                  this.arryData = res.data;
              }
          })
      },

      getDataList(nCurrent = 1, leaderStr) {
          const $this = this;
          getFindMealCardPage(Object.assign({
              nCurrent: nCurrent,
              nSize: 10,
              user_id: leaderStr,
              warnType: 11,
              orderByField: ''
          }, $this.searchData2)).then((res) => {
              // console.log(res.data)
              this.$refs.recordSpTableRef.setPageInfo(
                  nCurrent,
                  res.size,
                  res.total,
                  res.data
              );
          });
      },
      group() {
          if (this.value == true) {
              this.query()
          } else {
              this.query()
          }
      },
      // 机构人员 下拉change事件
      orgChange(orgId) {
          debugger
          this.searchData2.dept_id = orgId
          this.getUserListData(orgId);
      },
      goBack() {
          this.$router.go(-1)
      },
      // 获取机构对应的人员
        getUserListData(id) {
            const grade = sessionStorage.grade
            const params = {
                orgId: id
            }
            if (grade == 4) {
                getUserListByUserId({
                    userId: sessionStorage.userId,
                }).then(res => {
                    this.approvalArr = res.data;
                });

            } else {
                getUserList(params).then(res => {
                    if (res.success && res.data && res.data.length > 0) {
                        this.approvalArr = res.data;
                    }
                })
            }

        },
    //   getUserListByUserId() {
    //       getUserListByUserId({
    //           userId: sessionStorage.userId,
    //       }).then(res => {
    //           let leaderStr = res.data.map(item => {
    //               return item.id
    //           })
    //           if(this.value==true){
    //             leaderStr = sessionStorage.userId
    //           }else{
    //             // leaderStr.unshift(sessionStorage.userId)
    //             leaderStr = leaderStr.join(',')
    //           }
    //           // console.log(leaderStr)
    //           this.getDataList(nCurrent, leaderStr)
    //       });
    //       // this.getDataList(nCurrent)
    //   },
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
		let realName = this.$route.query.realName
		if(realName != null && realName != ''){
			this.searchData.userName = realName
		}
    this.userInfo = JSON.parse(sessionStorage.userInfo)
    this.userParams.userID = this.userInfo.info
    // 就餐地点预警地点统计 (给参数userParams会无数据)
    const params = {
        warnType: 11,
    }
    // getRepastSiteWarnStatistics(params).then((res) => {
    //     const data = res.sort(this.sortfunc('warnnum')) // 排序后获得前五组数值最大的数据
    //     const arry = data.splice(0,5)
    //     this.repastPlace.data.rows = arry
    // })

    // // 每日就餐预警次数统计 (给参数userParams会无数据)
    // getRepastWarnTimesStatistics(params).then((res) => {
    //     this.creditCardTime.data.rows = res
    // })

    // 提前就餐分页
    this.query()
  }
};
</script>

<style>
.el-input__inner {
    height: 34px !important;
}
</style>
<style lang="stylus" scoped>
@import "../../styles/common.styl";
.department{
    margin-left: 10px;
    margin-top: 14px;
}

</style>
