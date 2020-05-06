<template>
  <div class='a_body'>
      <div class='a_head'>在线办公</div>
      <div class='a_conent'style="height: 93%;">
          <div class='a_left'>
            <el-tabs :tab-position="tabPosition">
                <el-tab-pane label="预警管控">
                    <WarnPage/>
                  </el-tab-pane>
              <el-tab-pane label="事项申报">
                <AgencyRequest/>
              </el-tab-pane>
              <el-tab-pane label="事项即报">
                <AgencyReport/>
              </el-tab-pane>
              <el-tab-pane label="年度报告">
                <AgencyAnnual/>
              </el-tab-pane>
             </el-tabs>
          </div> 
      </div>
  </div>
</template>
<script>
//   import {
//   getWarnPage
// } from '../../api/warn.js';
// import AttendanceWarning from '../WisdomReminder/WisdomAttendance/AttendanceWarning/index';
import AgencyRequest from '../wisdomSupervision/AgencyRequest';
import AgencyReport from '../wisdomSupervision/AgencyReport';
import AgencyAnnual from '../wisdomSupervision/AgencyAnnual';
import WarnPage from '../wisdomSupervision/WarnPage';
        export default {
            components: {
                // AttendanceWarning,
                WarnPage,
                AgencyRequest,
                AgencyReport,
                AgencyAnnual
                
  },
          name: "a_body",
          data() {
            return {
                tabPosition: 'left',
            }
        },
          watch: {},
          mounted() {
            // this.init()
          },
          methods: {
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
