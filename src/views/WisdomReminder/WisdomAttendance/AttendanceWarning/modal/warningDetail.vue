<template>
  <div>
    <el-dialog :title="title" :visible.sync="visible">
      <div class="detail-info">
        <div class="user-info mb-ten">
          <span>{{detailInfo.userName ? detailInfo.userName : ''}}</span>
          <span>{{detailInfo.policeCode ? detailInfo.policeCode : ''}}</span>
          <span>{{detailInfo.department ? detailInfo.department : ''}}</span>
        </div>
        <div class="mb-ten">
          <span>预警时间：</span>
          <span>{{detailInfo.warnTime | formatTime}}</span>
        </div>
        <div class="mb-ten">
          <span>预警原因：</span>
          <span>{{detailInfo.warnReason ? detailInfo.warnReason : ''}}</span>
        </div>
        <ul v-if="detailInfo.source && detailInfo.source.length > 0">
          <li v-for="(item, index) in detailInfo.source" :key="index">{{item}}</li>
        </ul>
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
    </el-dialog>
  </div>
</template>

<script>
import { format } from 'date-fns';
import { getWarnInfo } from '@/api/warn.js';

export default {
  props: {
    title: {
      type: String,
      default: '预警详情'
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
        userId: option.userId,
        deptId: option.id
      }
      getWarnInfo(params).then(res => {
        // console.log(res);
        if(res.success) {
          this.detailInfo = res.data;
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.detail-info
  font-size: 16px;
  .user-info
    span
      margin-right: 10px;
  .advice
    p
      margin-bottom: 10px;

.mb-ten
  margin-bottom: 10px;
</style>
