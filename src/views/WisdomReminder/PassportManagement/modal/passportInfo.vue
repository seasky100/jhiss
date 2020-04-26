<template>
  <div>
    <el-dialog :title="title" :visible.sync="visible" width="700px">
      <div class="detail-wrapper">
        <el-scrollbar style="height: 100%;">
          <div class="detail-info">
            <el-form ref="form" :model="form" label-width="120px" size="small">
              <el-form-item label="姓名">
                <el-input v-model="form.userName"></el-input>
              </el-form-item>
              <el-form-item label="证件类型">
                <dic-select class="dic-select" type="证件类型" v-model="form.certificatesType" />
              </el-form-item>
              <el-form-item label="证件号码">
                <el-input v-model="form.certificatesNumber"></el-input>
              </el-form-item>
              <el-form-item label="有效期至">
                <el-date-picker type="date" placeholder="有效期至" v-model="form.issueDate" style="width: 100%;"></el-date-picker>
              </el-form-item>
              <el-form-item label="签发日期">
                <el-date-picker type="date" placeholder="签发日期" v-model="form.validity" style="width: 100%;"></el-date-picker>
              </el-form-item>
              <el-form-item label="证件编号">
                <el-input v-model="form.certificateNo"></el-input>
              </el-form-item>
              <el-form-item label="证件状态">
                <dic-select class="dic-select" type="证件状态" v-model="form.certificatesStatus" />
              </el-form-item>
            </el-form>
          </div>
        </el-scrollbar>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { findPassportById } from '@/api/warn.js';

export default {
  props: {
    title: {
      type: String,
      default: '护照详情'
    }
  },
  data() {
    return {
      visible: false,
      form: {
        userName: '',
        certificatesType: '',
        certificatesNumber: '',
        issueDate: '',
        validity: '',
        certificateNo: '',
        certificatesStatus: ''
      }
    }
  },
  methods: {
    open(option) {
      this.visible = true;
      this.form = option
      // this.getPassportById(option);
    },
    getPassportById(option) {
      const params = {
        id: option.id
      }
      findPassportById(params).then(res => {
        if(res.success) {
          this.form = res.data;
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
.dic-select
  width: 100%;
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
