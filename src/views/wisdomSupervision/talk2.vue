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
                      <span class='mr6 color-grey'>筛选时间</span>
                      <!-- <DateRange start={this.state.dateStart} end={this.state.dateEnd} onChange={this.changeDate} style={{marginRight: '20px'}} /> -->
                      <div class='flex-inline'>
                        <button class='flex flex-no-shrink px8 txt-normal' style="color: #235FF5">清空</button>
                        <button class='flex flex-no-shrink r2 mx6 py4 color-fff txt-normal' style="border: 1px solid #E5E9F2; padding: 0 14px; background: #235FF5">查询</button>
                        <!-- <Link to={`${this.props.match.path}/add`} class='flex flex-align-center flex-justify-center bg-fff r2 mx6 h32 txt-deco-none'
                            style={{border: '1px solid #E5E9F2', padding: '0 14px'}}>新增
                        </Link> -->
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
                        <!-- <tbody class='pos-tr-even-odd-bg hov-tr-bg'>
                          {
                            this.props.list.map(({id, userName, deptName, interviewType, interviewTime, interviewMan}) =>
                              <tr key={id} class='h32'>
                                <td class='pl8'>{new Date(interviewTime).toLocaleDateString()}</td>
                                <td class='pl8'>{interviewMan}</td>
                                <td class='pl8'>{userName}</td>
                                <td class='pl8'>{typeMap[interviewType]}</td>
                                <td class='pl8'>{deptName}</td>
                                <td class='pl8'>
                                  {/* <Link to={`${this.props.match.path}/detail`} class='txt-deco-none' style={{color: '#467cd4'}}>详情</Link> */}
        
                                  <Link to={location => ({
                                    pathname: `${location.pathname}/detail`,
                                    state: {Id: id}
                                  })} class='txt-deco-none' style={{color: '#467cd4'}}>详情
                                  </Link>
        
                                </td>
                              </tr>
                            )
                          }
                        </tbody> -->
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
// import { getNoticePage, updateNoticePage, delNotice, batchDel, updateIsPublic } from '@/api/notice-server'
// import Pagination from '@/components/Pagination'
// const strategrPublic = {
//     0: '不公开',
//     1: '公开'
// }
export default {
    data() {
        return {
            total: 0,
            page: 1,
            limit: 10,
            tableData: [],
            formData: {

            },
            isPublic: false, // 是否公开
            checkedList: [], // 被选中的行
            disable: true
        }
    },
    // components: {
    //     Pagination
    // },
    created() {
        // this.query()
    },
    methods: {
        // 表格勾选回调函数
        handleSelectionChange(val) {
            this.checkedList = val
        },
        // 查询公告列表数据
        async query(pagination = { page: 1, limit: 10 }) {
            try {
                this.formData.current = pagination.page
                this.formData.size = pagination.limit
                const res = await getNoticePage(this.formData)
                this.tableData = res.data.page
                for (let i = 0, len = this.tableData.length; i < len; i++) {
                    this.tableData[i].isPublic = Boolean(this.tableData[i].isPublic)
                }
                console.log(this.tableData)
                this.total = res.data.recordCount
            } catch (error) {
                console.error(error)
            }
        },
        change(row) {
            const { id } = row
            const isPublic = row.isPublic
            const params = {
                id,
                isPublic: Number(isPublic)
            }
            updateIsPublic(params).then(res => {
                if (res.success) {
                    this.$message({
                        message: `已将该信息设置为${strategrPublic[Number(isPublic)]}`,
                        type: 'success'
                    })
                } else {
                    this.$message({
                        message: '设置失败',
                        type: 'error'
                    })
                }
            })
        },
        goDetail(){
            this.$router.push({ path: '/investigation/detail' })
        },
        // 清除查询条件
        clear() {
            this.page = 1
            this.formData = {}
            this.query()
        },
        // 删除公告信息
        delNotice(type, row) {
            this.$confirm('确定要删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async() => {
                let res = null
                if (type === 'alone') {
                    // 单独删除
                    res = await delNotice({ id: row.id })
                } else if (type === 'batch') {
                    // 批量删除
                    res = await batchDel({ ids: this.checkedidsStr })
                }
                if (res.success) {
                    this.$message({
                        message: '删除成功',
                        type: 'success',
                        duration: 5 * 1000
                    })
                    this.query(this.formData)
                }
            })
        },
        // 新增或修改公告
        addOrModifyNotice(id, title) {
            this.$router.push({ path: '/investigation/addInvestigation',
                // query: { id, title }
            })
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
        checkedList(n, o) {
            if (n.length) {
                this.disable = false
            } else {
                this.disable = true
            }
        }
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
    .el-col {
        div {
            width: 100%;
        }
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
