<template>
  <div>
    <el-dialog :title="title" :visible.sync="visible" width="700px">
      <div class="detail-wrapper">
        <el-scrollbar style="height: 100%;">
          <div class="detail-info">
            <el-form ref="form" :model="form" label-width="120px" size="small">
              <el-form-item label="标题">
                <el-input v-model="form.bulletinTitle"></el-input>
              </el-form-item>
              <el-form-item label="被通报人">
                <el-input v-model="form.bulletinObject"></el-input>
              </el-form-item>
              <el-form-item label="所在通报单位">
                <el-input v-model="form.publishUnit"></el-input>
              </el-form-item>
              <el-form-item label="通报时间">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.bulletinDate" style="width: 100%;"></el-date-picker>
              </el-form-item>
              <el-form-item label="问题性质">
                <dic-select class="dic-select" type="通报问题性质" v-model="form.problemNature" />
              </el-form-item>
              <el-form-item label="发起单位">
                <el-input v-model="form.publishUnit"></el-input>
              </el-form-item>
              <el-form-item label="填报人">
                <el-input v-model="form.userCreate"></el-input>
              </el-form-item>
              <el-form-item label="内容">
                <el-input type="textarea" v-model="form.content"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-scrollbar>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBulletinById } from '@/api/warn.js';

export default {
  props: {
    title: {
      type: String,
      default: '通报详情'
    }
  },
  data() {
    return {
      visible: false,
      form: {
        bulletinTitle: '',
        bulletinObject: '',
        publishUnit: '',
        bulletinDate: '',
        problemNature: '',
        publishUnit: '',
        userCreate: '',
        content: ''
      }
    }
  },
  methods: {
    open(option) {
      this.visible = true;
      this.getDetailInfo(option);
    },
    getDetailInfo(option) {
      const params = {
        id: option.id
      }
      getBulletinById(params).then(res => {
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
