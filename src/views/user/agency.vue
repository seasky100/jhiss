<template>
  <div class='a_body'>
      <div class='a_head'>在线办公</div>
      <div class='a_conent'style="height: 90%;">
          <div class='a_left'>
                <el-tabs :tab-position="tabPosition" style="height: 200px;">
                        <el-tab-pane label="事项申报">
                                <AgencyRequest/>
                        </el-tab-pane>
                        <el-tab-pane label="事项即报">                           
                            <div>
                                    <e-table
                                        ref="recordSpTableRef"
                                        :tableList="tableList"
                                        :options="options"
                                        :columns="columns"
                                        :operates="operates"
                                        @afterCurrentPageClick="afterCurrentPageClickHandle"
                                    />
                                    </div>
                        </el-tab-pane>
                        <el-tab-pane label="年度报告">

                        </el-tab-pane>
                        <el-tab-pane label="检查通报">

                        </el-tab-pane>
                      </el-tabs>
          </div>
          
      </div>
  </div>
</template>
<script>
  import {
  getWarnPage
} from '../../api/warn.js';
import AttendanceWarning from '../WisdomReminder/WisdomAttendance/AttendanceWarning/index';
import AgencyRequest from '../wisdomSupervision/AgencyRequest';
        export default {
            components: {
                AttendanceWarning,
                AgencyRequest
  },
          name: "a_body",
          data() {
            return {
                tabPosition: 'left',
                userId: '5ba98b66cd3549b9b92ea8723e89207e',
                tableList: [],
                options: {
                    // 每页数据数
                    pageSize: 10,
                    hasIndex: false,
                    // 当前页码
                    currentPage: 1,
                    loading: true,
                    maxHeight: null,
                    height:'500'
                  },
                columns: [
                {
                  prop: 'policeCode',
                  label: '警号',
                  align: 'left'
                },
                {
                  prop: 'userName',
                  label: '姓名',
                  align: 'left'
                },
                {
                  prop: 'department',
                  label: '所属部门',
                  align: 'left'
                },
                {
                  prop: 'warnTime',
                  label: '预警时间',
                  align: 'left',
                  type: 'date',
                  dateFormat: 'yyyy-MM-dd'
                },
                {
                  prop: 'warnReason',
                  label: '预警原因',
                  align: 'left'
                },
                {
                  prop: 'content',
                  label: '反馈内容',
                  align: 'left'
                },
                {
                  prop: 'warnLevel',
                  label: '预警级别',
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
                    //   this.$refs.warningDialog.open(row);
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
            this.init()
          },
          methods: {
                init() {
              this.query();
            },
            reportType_format(row, column, prop){
              // console.log(column.options)
              return column.options[prop]
            },
            gmtCreate_format(row, column, prop){
              return new Date(prop).toLocaleString('chinese', {hour12: false})
            },
            formData_format(row, column, prop){
              return JSON.parse(prop).applyDesc
            },

    // 分页点击事件
    afterCurrentPageClickHandle(val, next) {
        this.query(val);
        next();
      },
    // 查找列表数据
    query(nCurrent = 1) {
        debugger
        const $this = this;
        getWarnPage(
          Object.assign(
            {
              nCurrent: nCurrent,
              nSize: 10,
              user_id: '5ba98b66cd3549b9b92ea8723e89207e',
              isAsc: false,
              orderByField: 'warnTime',
              role: 10,
              warnType: 1
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
        })
      },
          }
        }
        </script>
<style lang="stylus" scoped>

.a_body .bg{
  color:pink;
}
.a_body{
  height: 100%;
}
.a_body .el-container {
  flex-direction: column;
}
.a_body .el-tabs--left, .el-tabs--right {
  height: 100% !important;
  width: 100%;
}
.a_body .el-dialog__body {
  padding: 0px 0px;
  height: 500px !important;
  display: flex;
}
</style>
