<template>
    <div class='organization_request_add flex flex-column flex-grow bg-fff' style="padding-bottom: 40px">
        <div class='flex flex-align-center h48 w-full border-box' style="padding-left: 0.8em; color: #121518">
          <!-- <img src='/images/home_round_bar@2x.png' /> -->
          <span class='pl8 txt-bold' style="font-size: 16px">个人事项申报</span>
        </div>
        <div class='' style="margin-left: 40px; margin-top: 10px; width: 36em">
          <div class='flex flex-column'>
            <div class='flex flex-column my6'>
              <div>
                <!-- {required} -->
                <span class='txt-bold ml4' style="color: #121518">事由</span>
              </div>
              <input type='text' class='py8 border-wx0 border-wt0' placeholder='请输入事由' style="color: #3B3B3B; padding-left: 0.8em; border-bottom: 1px solid #E4E9F3"
               />
            </div>
            <div class='flex flex-column my6'>
              <div>
                <!-- {required} -->
                <span class='txt-bold ml4' style="color: #121518">事项类型</span>
              </div>
              <select class='border-wx0 border-wt0' style="color: #3B3B3B; padding: 1em 0 0.5em 0.4em; border-bottom: 1px solid #E4E9F3">
                <option v-for="item in typeMap" :key="item.code" :label="item.name" :value="item.code">
                </option>
            </select>
            </div>
            <div class='flex flex-column my6'>
              <div>
                <!-- {required} -->
                <span class='txt-bold ml4' style="color: #121518">申报开始时间</span>
              </div>
              <div class="block">
                <span class="demonstration"></span>
                <el-date-picker class='date_pick'
                  v-model="value1"
                  type="date"
                  placeholder="开始日期">
                </el-date-picker>
              </div>
            </div>
            <div class='flex flex-column my6'>
              <div>
                <!-- {required} -->
                <span class='txt-bold ml4' style="color: #121518">申报结束时间</span>
                </div>
                <div class="block">
                    <span class="demonstration"></span>
                    <el-date-picker class='date_pick' 
                      v-model="value1"
                      type="date"
                      placeholder="结束日期">
                    </el-date-picker>
                  </div>
              <!-- <FormDatePicker value={this.state.dateEnd} onChange={this.changeEndDate} /> -->
            </div>
            <div class='my6'>
              <div>
                <!-- {required} -->
                <span class='txt-bold ml4' style="color: #121518">审批人</span>
              </div>
              <div class="shenpi_person">
                <el-input readonly @click.native="changelag"
                  style="float:left;width:50%;"
                  placeholder="输入关键字进行过滤"
                  v-model="org_id.name">
                </el-input>
                <el-select v-model="person_id" placeholder="请选择" style="float:left;width:50%;">
                  <el-option
                    v-for="item in person_arr"
                    :key="item.id"
                    :label="item.realName"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
              <div v-show="org_flag" class="selectDiv">
                <el-input
                  placeholder="输入关键字进行过滤"
                  v-model="filterText">
                </el-input>
                <el-tree
                  class="filter-tree el-scrollbar el-scrollbar__wrap"
                  @node-click="nodeClick"
                  :data="dataTree"
                  :props="defaultProps"
                  default-expand-all
                  :filter-node-method="filterNode"
                  ref="tree">
                </el-tree>
              </div>
              <!-- <CrewSelect onSelect={this.changeApproval} /> -->
            </div>
            <div class='flex my6'>
              <button class='flex flex-align-center flex-justify-center color-fff r2 mx6 h24'
                style="border: #E5E9F2; padding: 0 14px; background: #235FF5"
             >提交
              </button>
              <!-- <Link to={parentOf(this.props.match.path)} class='flex flex-align-center flex-justify-center color-fff r2 mx6 h24 txt-deco-none'
                style="border: '#E5E9F2', padding: '0 14px', background: '#235FF5'">取消
              </Link> -->
            </div>
          </div>
        </div>
      </div>
</template>
<script>
export default {
    data() {
        return {
          org_id: '',
          person_id: '',
          org_flag:false,
          filterText: '',
          dataTree:[],
          person_arr: [],
          defaultProps: {
            children: 'childrens',
            label: 'name'
          },
            value1: '',
            typeMap: [
                {
                    code: 201,
                    name: '饮酒'
                },
                {
                    code: 202,
                    name: '离开单位'
                },
                {
                    code: 203,
                    name: '离开辖区'
                }
            ],
            statusMap: [
                {
                    code: 0,
                    name: '-- 审批状态(不限) --'
                },
                {
                    code: 1,
                    name: '审批中'
                },
                {
                    code: 2,
                    name: '已通过'
                },
                {
                    code: 3,
                    name: '已驳回'
                },
            ]
        }
    },
    created() {
      // debugger
      // this.getData()
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init(){
        this.getOrgData()
      },
      changelag(){
        this.org_flag = !this.org_flag
      },
      nodeClick(obj){
        console.log(obj)
        this.org_id = obj
        this.person_id = ''
        this.org_flag = false
        this.getPersonData()
        // console.log(node)
        // console.log(com)
      },
        // 表格勾选回调函数
        // handleSelectionChange(val) {
        //     this.checkedList = val
        // },
        // 查询敏感词列表数据
        async getData(){
            // debugger
            this.$request.get(`/police/gaism-server/weddingBanquet/findReportPage?nCurrent=${this.pageNo}&nSize=${this.pageSize}&userId=${this.userId}&userName=${this.name}&policeCode=${this.policeNo}&approvalId=${this.approvalId}&reportType=${this.type}&status=${this.status}&startTime=${this.dateStart}&endTime=${this.dateEnd}`)
                .then(res => {
                    if (res.success == true) {
                        this.tableData = res.data.records
                        // this.total = res.result.total
                    } else {
                        console.log(res.message)
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getOrgData(){
            this.$request.get(`/api/uums-server/organization/tree`)
            .then(res => {
                console.log(res.data)
                this.dataTree = res.data
            })
            .catch(error => {
                console.log(error)
            })
        },
        getPersonData(){
            this.$request.get(`/api/uums-server/user/getUserListByOrgId?orgId=${this.org_id.id}`)
            .then(res => {
                console.log(res.data)
                this.person_arr = res.data
            })
            .catch(error => {
                console.log(error)
            })
        },
        filterNode(value, data) {
          if (!value) return true;
          return data.name.indexOf(value) !== -1;
        },
        // // 清除查询条件
        // clear() {
        //     this.page = 1
        //     this.formData = {}
        //     this.getData()
        // },
        // // 新增或修改敏感词
        add() {
            debugger
            this.$router.push({ path: '/organizationRequestAdd'})
        }
    },
}
</script>
<style scoped>
/*滚动条样式*/
::-webkit-scrollbar { width: 6px; height: 6px; background-color: #666;}
::-webkit-scrollbar-track { border-radius: 10px; background-color: #666;}
::-webkit-scrollbar-thumb { border-radius: 10px; background-color: #222;}
.date_pick{
    width: 100% !important;
}
.selectDiv{
  height:350px;
}
.el-scrollbar .el-scrollbar__wrap {overflow-y: hidden;}
.selectDiv .el-tree>.el-tree-node{display:inline-block;}
</style>