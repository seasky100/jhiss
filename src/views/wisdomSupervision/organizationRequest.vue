<template>
        <div class='organization_request flex flex-column w-full'>
                <div class='bg-fff' style="padding: '8px 16px'">
                  <span class='txt-bold' style="font-Size: 1.2em; color: #121518">事项申报</span>
                </div>
                <div class='flex flex-column flex-grow bg-fff' style="margin: 8px 12px">
                  <div class='flex flex-column flex-grow pxy10'>
                    <div class='flex flex-column r2' style="border: 1px solid #E5E9F4">
                      <div class='flex flex-align-center pl8 h32 txt-bold' style="color: #323232; background: #F5F6F7; border-Bottom: 1px solid #E5E9F4">
                        查询条件
                      </div>
                      <div class='flex flex-column' style="color: #6C7284; padding: 10px 0 12px 10px">
                        <div class='flex flex-align-center'>
                          <input type='text' class='h32 pl4 r2 border-box' style="border: 1px solid #E5E9F2; width: 150px; margin-right: 20px"
                            placeholder='发起人警号' />
                          <input class='h32 pl4 r2 border-box' style="border: 1px solid #E5E9F2; width: 150px; margin-right: 20px" type='text'
                            placeholder='发起人姓名'/>
                          <select class='h32 pl4 r2 border-box' style="border: 1px solid #E5E9F2;width: 150px; margin-right: 20px">
                            <option>-- 所属部门 --</option>
                          </select>
                        </div>
                        <div class='flex flex-align-center mt8'>
                                <!-- <div class="block">
                                        <span class="demonstration"></span>
                                        <el-date-picker
                                          v-model="value1"
                                          type="daterange"
                                          range-separator="至"
                                          start-placeholder="开始日期"
                                          end-placeholder="结束日期">
                                        </el-date-picker>
                                      </div> -->
                            <!-- <DateRange start={this.state.dateStart} end={this.state.dateEnd} onChange={this.changeDate} style={{marginRight: '20px'}} /> -->
                            <select class='h32 pl4 r2 border-box' style="border: 1px solid #E5E9F2; width: 150px; margin-right: 20px">
                                <option v-for="item in typeMap" :key="item.code" :label="item.name" :value="item.code">
                                </option>
                            </select>
                            <select class='h32 pl4 r2 border-box' style="border: 1px solid #E5E9F2; width: 150px; margin-right: 20px">
                                <option v-for="item in statusMap" :key="item.code" :label="item.name" :value="item.code">
                                </option>
                            </select>
                            <button class='flex flex-no-shrink px8 txt-normal' style="color: #235FF5">
                                清空
                            </button>
                            <button class='flex flex-no-shrink r2 mx6 h32 color-fff txt-normal' style="border: '1px solid #E5E9F2'; padding: '0 14px'; background: #235FF5">
                                查询
                            </button>
                            <button @click='add' class='flex flex-align-center flex-justify-center bg-fff r2 mx6 h32 txt-deco-none' style="border: 1px solid #E5E9F2; padding: 0 14px">
                                新增
                            </button>
                            <!-- <Link to={`${this.props.match.path}/add`} class='flex flex-align-center flex-justify-center bg-fff r2 mx6 h32 txt-deco-none'
                                                    style="border: 1px solid #E5E9F2; padding: 0 14px">新增申请
                                 </Link> -->
                        </div>
                      </div>
                    </div>
                    <div class='mt8' style="border: 1px solid #E5E9F4">
                      <table class='w-full align-l font12'>
                        <thead style="background: #DADEE2">
                          <tr class='h32'>
                            <th class='pl8'>发起人警号</th>
                            <th class='pl8'>发起人姓名</th>
                            <th class='pl8'>发起人部门</th>
                            <th class='pl8'>申报类型</th>
                            <th class='pl8'>申报事由</th>
                            <th class='pl8'>申报时间</th>
                            <th class='pl8'>审批状态</th>
                            <th class='pl8'>操作</th>
                          </tr>
                        </thead>
                        <tbody class='pos-tr-even-odd-bg hov-tr-bg' v-for="(item,index) in tableData" :key="index">
                         
                              <tr key={id} class='h32'>
                                <td class='pl8'>{{item.policeCode}}</td>
                                <td class='pl8'>{{item.approvalName}}</td>
                                <td class='pl8'>{{item.department}}</td>
                                <td class='pl8'>{{item.reportType}}</td>
                                <td class='pl8'>{{JSON.parse(item.formData).applyDesc}}</td>
                                <td class='pl8'>{{new Date(item.gmtCreate).toLocaleString('chinese', {hour12: false})}}</td>
                                <td class='pl8'>{{item.approvalStatus}}</td>
                                <td class='pl8'>
                                <template >
                                        <el-button
                                            size="mini"
                                            type="text"
                          
                                            @click="addOrModifyNotice(item.flowCode)">
                                        详情</el-button>
                                    </template>
                                </td>
                                <!-- <td class='pl8'>
                                        <router-link class='txt-deco-none' style="color: #467cd4" :to="{ path: 'talk2', query: { approvalId: '' }}">详情</router-link>
                   
                                </td> -->
                              </tr>
                            
                          
                        </tbody> 
                      </table>
                    </div>
                    <!-- <Pager
                      class='mt-auto'
                      pageNo={this.props.pageNo}
                      pageSize={this.props.pageSize}
                      total={this.props.total}
                      onChange={this.onPageChange}
                    /> -->
                  </div>
                </div>
              </div>
</template>
<script>
export default {
            data() {
                return {
                    value1: '',
                    pageNo: 1,
                    pageSize:10, 
                    userId:'5ba98b66cd3549b9b92ea8723e89207e',
                    name:'',
                    policeNo:'',
                    approvalId:'',
                    type:2,
                    status:'',
                    dateStart:'',
                    dateEnd:'',
                    tableData:[],
                    typeMap: [
                        {
                            code: 2,
                            name: '-- 申报类型(不限) --'
                        },
                        {
                            code: 201,
                            name: '饮酒'
                        },
                        {
                            code: 202,
                            name: '离开辖区'
                        },
                        {
                            code: 203,
                            name: '离开单位'
                        },
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
        this.getData()
    },
    methods: {
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
        // // 清除查询条件
        // clear() {
        //     this.page = 1
        //     this.formData = {}
        //     this.getData()
        // },
        // // 新增或修改敏感词
        add() {
            // debugger
            this.$router.push({ path: '/organizationRequestAdd'})
        }
    },
}
</script>
<style  scoped>
        @import'../css/assembly.css';
        @import "../css/hover-min.css";
        @import "../css/media.css";
        @import "../css/pseudo_classes.css";
</style>