<template>
  <div>
    <!-- :show-close="false" -->
    <el-dialog :title="title" :visible.sync="visible" :show-close="true">
      <div class="detail-wrapper">
        <el-scrollbar style="height: 100%;">
          <div class="detail-info">
            <el-form>
              <el-form-item label="部门：">
                <span>{{detailInfo.department ? detailInfo.department : ''}}</span>
              </el-form-item>
              <el-form-item label="姓名：">
                <span>{{detailInfo.userName ? detailInfo.userName : ''}}</span>
              </el-form-item>
              <el-form-item label="预警原因：">
                <span>{{detailInfo.warnReason ? detailInfo.warnReason : ''}}</span>
              </el-form-item>
              <el-form-item label="预警时间：">
                <span>{{detailInfo.warnTime | formatTime}}</span>
              </el-form-item>
              <el-form-item label="预警数据来源：">
                <span>{{detailInfo.source ? detailInfo.source : ''}}</span>
              </el-form-item>
              <el-form-item label="预警详情：">
                <span>{{detailInfo.comment ? detailInfo.comment : ''}}</span>
              </el-form-item>
              <el-form-item label="本人反馈：">
                <!-- <span>{{detailInfo.content||'未反馈'}}</span>
                <p v-if="detailInfo.content">反馈时间：{{detailInfo.gmtCreate | formatTime}}</p> -->
                <div v-if="detailInfo.is_self">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 3, maxRows: 6}"
                    placeholder="请输入内容"
                    v-model="detailInfo.content"
                  ></el-input>
                </div>
                <template v-else>
                  <span>{{detailInfo.content||'未反馈'}}</span>
                  <p v-if="detailInfo.content">反馈时间：{{detailInfo.gmtCreate | formatTime}}</p>
                </template>
              </el-form-item>
              <el-form-item v-if="detailInfo.warnLevel == 2 || detailInfo.warnLevel == 3">
                <p>反馈时间：{{detailInfo.gmtBranch | formatTime}}</p>
                <p>层级领导反馈：</p>
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows: 6}"
                  placeholder="请输入内容"
                  v-model="detailInfo.leaderAdvice"
                ></el-input>
              </el-form-item>
              <el-form-item v-if="detailInfo.warnLevel == 3">
                <p>反馈时间：{{detailInfo.gmtLeader | formatTime}}</p>
                <p>职能部门反馈：</p>
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows: 6}"
                  placeholder="请输入内容"
                  v-model="detailInfo.branchAdvice"
                ></el-input>
              </el-form-item>
              <el-form-item v-if="detailInfo.is_self" style="text-align:center;">
                <el-button type="primary" plain size="default" @click="handleSubmit">提交</el-button>
                <el-button type="info" plain size="default" @click="visible = false">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-scrollbar>
      </div>
    </el-dialog>
  </div>
</template>
    
    <script>
import { format } from "date-fns";
import { responseAuditWarning } from '@/api/warn.js'
export default {
  props: {
    title: {
      type: String,
      default: "详情"
    }
  },
  filters: {
    formatTime(val, type = "yyyy-MM-dd HH:mm:ss") {
      if (val) {
        return format(val, type);
      }
    }
  },
  data() {
    return {
      visible: false,
      detailInfo: {}
    };
  },
  methods: {
    open(option) {
      this.visible = true;
      if(option.userId == sessionStorage.userId && (!option.content)){
        option.is_self = true
      }else{
        option.is_leader = true
      }
      // console.log("用户信息", option)
      this.detailInfo = option
    },
    handleSubmit(){
      let role = 1
      let leaderId = ''
      if(this.detailInfo.userId.includes(sessionStorage.userId)){
        role = 1
        leaderId = sessionStorage.userPid
      }else{
        role = 2
        leaderId = sessionStorage.userId
      }
      const params = {
        userId: sessionStorage.userId,
        warnId: this.detailInfo.id,
        leaderId: leaderId,
        role: role,
        content: this.detailInfo.content,
        leaderAdvice: '', // 领导意见
        branchAdvice: '', // 部门意见
      }
      console.log('提交', params)
      responseAuditWarning(params).then(res => {
        let option = res.data
        if(option.userId == sessionStorage.userId && (!option.content)){
          option.is_self = true
        }
        this.detailInfo = option
      })
      
    },
  }
};
</script>
<style lang="stylus" scoped>
.detail-wrapper {
  height: 55vh;
  .detail-info {
    padding: 5px 20px;
  }
}

/deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>