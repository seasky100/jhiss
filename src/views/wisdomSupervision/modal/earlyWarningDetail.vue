<template>
  <div>
    <el-dialog :title="title" :visible.sync="visible">
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
                <span>{{detailInfo.content||'未反馈'}}</span>
                <p v-if="detailInfo.content">反馈时间：{{detailInfo.gmtCreate | formatTime}}</p>
                <!-- <div v-if="!detailInfo.content">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 3, maxRows: 6}"
                    placeholder="请输入内容"
                    v-model="detailInfo.content"
                  ></el-input>
                </div> -->
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
            </el-form>
          </div>
        </el-scrollbar>
      </div>
    </el-dialog>
  </div>
</template>
    
    <script>
import { format } from "date-fns";

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
      console.log("77", option);
      this.detailInfo = option;
    }
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