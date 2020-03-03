<template>
  <div>
    <el-dialog :title="title" :visible.sync="visible">
      <div class="detail-wrapper">
        <el-scrollbar style="height: 100%;">
          <div class="detail-info">
            <div class="user-info mb-ten">
              <span>{{detailInfo.userName ? detailInfo.userName : ''}}</span>
              <span>{{detailInfo.policeCode ? detailInfo.policeCode : ''}}</span>
              <span>{{detailInfo.department ? detailInfo.department : ''}}</span>
            </div>
            <div class="mb-ten">
              <span>申请时间：</span>
              <span></span>
            </div>
            <div class="mb-ten">
              <span>用车时间：</span>
              <span></span>
            </div>
            <div class="mb-ten">
              <span>还车时间：</span>
              <span></span>
            </div>
            <div class="mb-ten">
              <span>事由：</span>
              <span></span>
            </div>
            <div class="mb-ten">
              <span>审批人：</span>
              <span></span>
            </div>
            <div class="mb-ten">
              <span>审批时间：</span>
              <span></span>
            </div>
            <div class="mb-ten">
              <span>审批结果：</span>
              <span></span>
            </div>
            <div class="mb-ten">
              <span>是否异常：</span>
              <span></span>
            </div>
            <div class="mb-ten">
              <span>异常原因：</span>
              <span></span>
            </div>
            <div class="mb-ten">
              <span>预警时间：</span>
              <span></span>
            </div>
            <div class="advice">
              <p>本人反馈：</p>
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 6}"
                placeholder="请输入内容"
                v-model="detailInfo.content">
              </el-input>
            </div>
            <div class="advice">
              <p>层级领导反馈：</p>
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 6}"
                placeholder="请输入内容"
                v-model="detailInfo.leaderAdvice">
              </el-input>
            </div>
            <div class="advice">
              <p>职能部门反馈：</p>
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 6}"
                placeholder="请输入内容"
                v-model="detailInfo.branchAdvice">
              </el-input>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { format } from 'date-fns';
import { getCarCoordinates } from '@/api/warn.js';

export default {
  props: {
    title: {
      type: String,
      default: '车辆轨迹详情'
    }
  },
  filters: {
    formatTime(val, type = 'yyyy-MM-dd HH:mm:ss') {
      if(val) {
        return format(val, type);
      }
    }
  },
  data() {
    return {
      visible: false,
      detailInfo: {}
    }
  },
  methods: {
    open(option) {
      this.visible = true;
      this.getDetailInfo(option);
    },
    getDetailInfo(option) {
      const params = {
        flow_id: option.flowId,
        car_number: option.carNumber
      }
      getCarCoordinates(params).then(res => {
        console.log(res);
        if(res.success) {
          this.detailInfo = res.data;
        }else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.detail-wrapper
  height: 55vh;
  .detail-info
    padding: 5px 20px;
    color: #606266;
    .user-info
      span
        margin-right: 10px;
    .advice
      p
        margin-bottom: 10px;

.mb-ten
  margin-bottom: 10px;
/deep/ .el-textarea{
  width: 100%;
  height: auto;
  .el-textarea__inner{
    margin-left: 0;
  }
}
/deep/ .el-scrollbar__wrap
  overflow-x: hidden;
</style>
