<template>
  <div>
    <el-dialog :title="title" :visible.sync="visible" width="700px">
      <div class="detail-wrapper">
        <el-scrollbar style="height: 100%;">
          <div class="detail-info">
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" size="small">
              <el-form-item label="姓名" prop="userName">
                <el-input :disabled="dialogType == 1" v-model="ruleForm.userName"></el-input>
              </el-form-item>
              <el-form-item label="证件类型" prop="certificatesType">
                <dic-select :readonly="dialogType == 1" class="dic-select" type="证件类型" v-model="ruleForm.certificatesType" />
              </el-form-item>
              <el-form-item label="证件号码" prop="certificatesNumber">
                <el-input :disabled="dialogType == 1" v-model="ruleForm.certificatesNumber"></el-input>
              </el-form-item>
              <el-form-item label="有效期至" prop="validity">
                <el-date-picker :disabled="dialogType == 1" type="date" placeholder="有效期至" value-format="yyyy-MM-dd" v-model="ruleForm.validity" style="width: 100%;"></el-date-picker>
              </el-form-item>
              <el-form-item label="签发日期" prop="issueDate"> 
                <el-date-picker :disabled="dialogType == 1" type="date" placeholder="签发日期" value-format="yyyy-MM-dd" v-model="ruleForm.issueDate" style="width: 100%;"></el-date-picker>
              </el-form-item>
              <el-form-item label="证件编号" prop="certificateNo">
                <el-input :disabled="dialogType == 1" v-model="ruleForm.certificateNo"></el-input>
              </el-form-item>
              <el-form-item label="证件状态" prop="certificatesStatus">
                <dic-select :readonly="dialogType == 1" class="dic-select" type="证件状态" v-model="ruleForm.certificatesStatus" />
              </el-form-item>
              <el-form-item label="保管机构名称" prop="orgId">
                <select-tree :disabled="dialogType == 1"
                  v-model="ruleForm.orgId"
                  :props="config"
                  :treeData="orgData"
                  @change="changeData"
                  placeholder="请选择部门" />
              </el-form-item>
              <el-form-item label="备注" prop="remark">
                <el-input :disabled="dialogType == 1" v-model="ruleForm.remark"></el-input>
              </el-form-item>
              <!-- 操作 -->
              <el-form-item v-if="dialogType != 1" class="optionsCon" style="text-align: center;">
                <el-button type="primary" @click="submit">提交</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="passportHistory" v-if="dialogType == 1">
            <e-table
              ref="recordSpTableRef"
              :tableList="tableList"
              :options="options"
              :columns="columns"
              :operates="operates"
            />
          </div>
        </el-scrollbar>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { format } from 'date-fns';
import { findPassportById, savePassport, updatePassport, findById } from '@/api/warn.js';
import { mapGetters } from 'vuex';
export default {
  props: {
    title: {
      type: String,
      default: '护照详情'
    },
    dialogType: {
      type: Number,
      default:() => {
        return 1
      }
    }
  },
  computed: {
    ...mapGetters([
      'orgData'
    ])
  },
  data() {
    return {
      tableList:this.$parent.tableList,
      options:this.$parent.options,
      columns:this.$parent.columns,
      operates:this.$parent.operates,
      visible: false,
      infoFlag: true,
      // 部门配置
      config: {
        value: 'id',
        label: 'name',
        children: 'childrens',
        disabled: true
      },
      ruleForm: {
        userName: '', // 姓名
        certificatesType: '', // 证件类型
        certificatesNumber: '', // 证件号码
        issueDate: '', // 签发日期
        validity: '', // 有效期至
        certificateNo: '', // 证件编号
        certificatesStatus: '', // 证件状态
        // 
        remark: '', // 备注
        userId: '', // 用户id
        orgId: '', // 保管机构id
        orgName: '' // 保管机构名称
      },
      rules: {
        userName: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        certificatesType: [
          { required: true, message: '请输入', trigger: 'change' },
        ],
        certificatesNumber: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        issueDate: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        validity: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        certificateNo: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        certificatesStatus: [
          { required: true, message: '请输入', trigger: 'change' },
        ],
      }
    }
  },
  methods: {
    open(option = null) {
      // console.log(this.dialogType)
      this.visible = true
      if(option == null){
        this.infoFlag = false
        this.ruleForm = {
          userName: '',
          certificatesType: '',
          certificatesNumber: '',
          issueDate: '',
          validity: '',
          certificateNo: '',
          certificatesStatus: '',
          remark: '', // 备注
          userId: '', // 用户id
          orgId: '', // 保管机构id
          orgName: '' // 保管机构名称
        }
      }else{
        this.infoFlag = true
        this.ruleForm = option
        this.findHistroy()
      }
      // this.getPassportById(option);
    },
    changeData(value, label){
      // console.log(label, value)
      this.$set(this.ruleForm,'orgName',label)
      this.$set(this.ruleForm,'orgId',value)
      // console.log(this.ruleForm)
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
    },
    // 查询护照操作历史 findById
    findHistroy(){
      if(this.dialogType != 1){
        return
      }
      const param = {
        id: this.ruleForm.id
      }
      findById(param).then(res => {
        // console.log(res)
        if(res.success) {
          console.log(res)
        }
      })
    },
    // 提交
    submit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const params = this.ruleForm
          if(this.dialogType == 2){
            params.gmtCreate = format(new Date(), 'yyyy-MM-dd')
            params.gmtModified = format(new Date(), 'yyyy-MM-dd')
            // 新增
            savePassport(params).then(res => {
              // console.log(res)
              if(res.success) {
                this.$message({
                  type: 'success',
                  message: '提交成功'
                })
                this.visible = false
                this.$parent.query()
              }else {
                this.$message({
                  type: 'error',
                  message: '提交失败'
                })
              }
            })
          }else{
            params.gmtModified = format(new Date(), 'yyyy-MM-dd')
            // console.log(params)
            // 修改护照信息
            updatePassport(params).then(res => {
              // console.log(res)
              if(res.success) {
                this.$message({
                  type: 'success',
                  message: '提交成功'
                })
                this.visible = false
                this.$parent.query()
              }else {
                this.$message({
                  type: 'error',
                  message: '提交失败'
                })
              }
            })
          }
          
        } else {
          this.$message({
            type: 'warning',
            message: '请填写表单'
          })
          return false;
        }
      });
    },
    // 
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
.optionsCon >>> .el-form-item__content
  margin-left auto !important
</style>
