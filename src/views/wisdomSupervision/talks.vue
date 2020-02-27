<template>
        <div class='organization_ledger flex flex-column w-full'>
                <div class='flex flex-align-center h32 bg-fff pl8 txt-bold font14'>谈话谈心</div>
                <div class='flex flex-grow flex-column scroll-hidden border-box relative bg-fff' style="padding: 10px 14px; margin: 12px">
                  <div class='flex flex-column r2' style="border: 1px solid #E5E9F4">
                    <div class='flex flex-align-center px8 py6 font14 txt-bold' style="background: #F5F6F7; border: 1px solid #e5e9f4">
                      查询条件
                    </div>
                    <div class='' style="padding: 12px 16px">           
                      <span class='mr6 flex-no-shrink color-grey'>姓名</span>
                      <input class='h24 pl4 r2 border-box' style="border: 1px solid #E5E9F2; margin-right: 20px" type='text'/>
                      <span class='mr6 flex-no-shrink color-grey' >所属部门</span>
                      <select class='h24 pl4 r2 border-box' style="border: 1px solid #E5E9F2; margin-right: 20px">
                        <option>-- 所属部门 --</option>
                      </select>
                      <div class='flex-inline'>
                        <button class='flex flex-no-shrink px8 txt-normal' style="color: #235FF5">清空</button>
                        <button class='flex flex-no-shrink r2 mx6 py4 color-fff txt-normal' @click="searchData"
													style="border: 1px solid #E5E9F2; padding: 0 14px; background: #235FF5">查询</button>
                        <button class='flex flex-no-shrink r2 mx6 py4 color-fff txt-normal'
													style="border: 1px solid #E5E9F2; padding: 0 14px;color:#333;" @click="handlePath">新增</button>
                      </div>
                    </div>
                  </div>
                  <div class='flex flex-column flex-grow mt8'>
                    <div style="border: 1px solid #E5E9F4">
                      <table class='w-full align-l'>
                        <thead style="background: #DADEE2">
                          <tr class='h32'> 
                            <th class='pl8' >谈话时间</th>
                            <th class='pl8' >被谈话人</th>                 
                            <th class='pl8' >谈话领导</th>
                            <th class='pl8' >谈话类型</th>
                            <th class='pl8' >所属部门</th>                                                      
                            <th class='pl8' >操作</th>
                          </tr>
                        </thead>
                        <tbody class='pos-tr-even-odd-bg hov-tr-bg'>
                              <tr :key="item.id" class='h32' v-for="item of tableData">
                                <!-- ==null?'':new Date(item.interviewTime).toLocaleDateString() -->
                                <td class='pl8'>{{item.interviewTime}}</td>
                                <td class='pl8'>{{item.interviewMan}}</td>
                                <td class='pl8'>{{item.userName}}</td>
                                <td class='pl8'>{{typeMap[item.interviewType]}}</td>
                                <td class='pl8'>{{item.deptName}}</td>
                                <td class='pl8'>
																		<el-button size="mini" type="text" >
																		详情</el-button>
                                </td>
                                <!-- <td class='pl8'>11111</td>
                                <td class='pl8'>11111111</td>
                                <td class='pl8'>11111111</td>
                                <td class='pl8'>111111111111</td>
                                <td class='pl8'>1111111111</td>
                                <td class='pl8'>
																		<el-button size="mini" type="text" >
																		详情</el-button>
                                </td> -->
                              </tr>
                              <!-- @click="addOrModifyNotice(item.flowCode)" -->
                              <!-- <tr>
                                <td class='pl8'>11111</td>
                                <td class='pl8'>11111111</td>
                                <td class='pl8'>11111111</td>
                                <td class='pl8'>111111111111</td>
                                <td class='pl8'>1111111111</td>
                                <td class='pl8'>
																		<el-button size="mini" type="text" >
																		详情</el-button>
                                </td>
                              </tr> -->
                        </tbody>
                      </table>
                    </div>
                    <div class="block" style="text-align: center;margin-top:10px;">
                      <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page.sync="nCurrent"
                        :page-size="10"
                        layout="prev, pager, next, jumper"
                        :total="total">
                      </el-pagination>
                    </div>
                  </div>
                </div>
              </div>
</template>
<script>
// import { getNoticePage, updateNoticePage, delNotice, batchDel, updateIsPublic } from '@/api/notice-server'
// import Pagination from '@/components/Pagination'
// const strategrPublic = {
//     0: '不公开',
//     1: '公开'
// }
export default {
    data() {
        return {
					userId:'5ba98b66cd3549b9b92ea8723e89207e',
					typeMap: {
						'': '-- 类型选择 --',
							1: '谈话谈心',
							2: '家庭走访',
							3: '约谈提醒',
							4: '帮助教育',
							5: '其他'
					},
					userName:'',
            total: 0,
            nCurrent: 1,
            nSize: 10,
            tableData: [],
            formData: {

            },
            isPublic: false, // 是否公开
            checkedList: [], // 被选中的行
            disable: true
        }
    },
    // computed: {
    //     // 将选中的行数据中的id提取出来转化成字符串
    //     checkedidsStr() {
    //         return this.checkedList.map(itme => {
    //             return itme.id
    //         }).join(',')
    //     }
    // },
    watch: {
        // checkedList(n, o) {
        //     if (n.length) {
        //         this.disable = false
        //     } else {
        //         this.disable = true
        //     }
        // }
    },
    created() {
        // this.query()
    },
    mounted() {
        this.getQueryList()
    },
    methods: {
      handleCurrentChange(val){
          this.nCurrent = val
          this.getQueryList()
				},
        searchData(){
          this.pageNo = 1
          this.getQueryList()
				},
				// 查询谈话谈心列表数据
        getQueryList(){
					this.$request.get(`/police/gaism-server/InterView/findInterViewPage?
							nCurrent=${this.nCurrent}&nSize=${this.nSize}&userId=${this.userId}
							&userName=${this.userName}&isAsc=false&orderByField=interviewTime`)
							.then(res => {
									// console.log(res.data.records)
                  this.tableData = res.data.records
									this.total = res.data.total
							})
							.catch(error => {
									console.log(error)
							})
        },
        handlePath(){
          // debugger
          this.$router.push({ path: '/TalkAdd'});
        },
    }
    
}
</script>
<style  scoped>
    @import'../css/assembly.css';
    @import "../css/hover-min.css";
    @import "../css/media.css";
    @import "../css/pseudo_classes.css";
    .row {
        height: 100%;
    }
    .add {
        margin-right: 20px;
        color: #409EFF;
    }
    .delete {
        color: #F56C6C;
    }

    .t_head{
        font-size: 13px;
        padding: 10px;
        font-weight: 700!important;
        background-color: white;
    }
    .t_content{
        height: 90%;
        padding: 10px 14px;
        margin: 12px;
        background-color: white;
    }
    .t_select{
        height: 10%;
        border: 1px solid rgb(229, 233, 244);
    }
    .t_body{
        width: 100%;
        height: 100%;
        background-color: #F2F5F7;
    }
    .t_title{
        height: 40%;
        padding-left: 0.571em!important;
        padding-top: 0.428em!important;
        font-weight: 700!important;
        background: rgb(245, 246, 247);
        border: 1px solid rgb(229, 233, 244);
    }
    .t_input{
       height: 40%;
       padding: 12px 16px;
    }
    .t_mr6{
       margin-right: 0.428em;
    }
    .h24{
       border: 1px solid #E5E9F2;
        margin-right: 20px;
    }
</style>
