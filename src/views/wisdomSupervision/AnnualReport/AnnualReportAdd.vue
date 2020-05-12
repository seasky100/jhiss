<template>
  <div>
    <el-dialog :title="title" :visible.sync="visible" width="700px">
      <div class="detail-wrapper">
        <el-scrollbar style="height: 100%;">
          <div class="detail-info">
            <div class="report-content">
              <div class="tip">
                本表须由党员干部本人亲笔填写
              </div>
              <div class="form-content">
                <el-form label-width="135px" :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" size="small" label-position="right">
                  <el-form-item label="报告人" prop="rapporteur">
                    <el-input v-model="ruleForm.rapporteur"></el-input>
                  </el-form-item>
                  <el-form-item label="报告人身份证号" prop="idNumber">
                    <el-input v-model="ruleForm.idNumber"></el-input>
                  </el-form-item>
                  <el-form-item label="所属单位名称" prop="company">
                    <el-input v-model="ruleForm.company"></el-input>
                  </el-form-item>
                  <el-form-item label="报告日期" prop="reportTime">
                    <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="ruleForm.reportTime" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                  <!-- <el-form-item label="审批内容" prop="comment">
                    <el-input v-model="ruleForm.comment"></el-input>
                  </el-form-item> -->
                  <el-form-item v-if="dialogType != 1" label="审批人" required>
                    <el-col :span="11">
                      <el-form-item prop="department">
                        <select-tree 
                          v-model="ruleForm.department"
                          :props="config"
                          :treeData="orgData"
                          @change="orgChange"
                          placeholder="请选择部门" />
                      </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                      <el-form-item prop="approvalId">
                        <el-select v-model="ruleForm.approvalId" placeholder="请选择" @change="selectChange">
                          <el-option
                            v-for="item in approvalArr"
                            :key="item.id"
                            :label="item.realName"
                            :value="item.id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-form-item>
                  <el-form-item class="optionsCon" style="text-align: center;">
                    <el-button type="primary" @click="submit">提交</el-button>
                    <el-button @click="visible = false">取消</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { format } from 'date-fns';
import { saveAnnualReport, updateReportApproval } from '@/api/report.js';
import { getUserList } from '@/api/user-server.js';
import getFlowNode from '../../../mixin/getFlowNode.js';
import { mapGetters } from 'vuex';

export default {
  props: {
    title: {
      type: String,
      default: '新增年报'
    },
    dialogType: {
      type: Number,
      default:() => {
        return 1
      }
    }
  },
  mixins: [getFlowNode],
  data() {
    return {
      userObj: null,
      visible: false,
      ruleForm: {
        rapporteur: '',
        idNumber: '',
        company: '',
        reportTime: '',
        comment: '',
        department: '',
        approvalId: ''
      },
      rules: {
        rapporteur: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        idNumber: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        company: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        reportTime: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        // comment: [
        //   { required: true, message: '请输入', trigger: 'blur' },
        // ],
        department: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        approvalId: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      // 部门配置
      config: {
        value: 'id',
        label: 'name',
        children: 'childrens',
        disabled: true
      },
      // 审批人
      approvalArr: [],
      // 审批人对象
      approvalList: []
    }
  },
  computed: {
    ...mapGetters([
      'orgData'
    ])
  },
  mounted() {
    // this.getData('201')
  },
  methods: {
    open(option = null) {
      // console.log(this.dialogType)
      this.visible = true
      if(option == null){
        this.infoFlag = false
        this.ruleForm = {
          rapporteur: this.$store.state.user.realName,
          idNumber: this.$store.state.user.userInfo.cardNum,
          company: this.$store.state.user.orgName,
          reportTime: format(new Date(), 'yyyy-MM-dd'),
          comment: '',
          department: '',
          approvalId: ''
        }
      }else{
        this.ruleForm = option
      }
      // this.getPassportById(option);
    },
    // 机构人员 下拉change事件
    orgChange(orgId) {
      this.getUserListData(orgId);
    },
    // 获取机构对应的人员
    getUserListData(id) {
      const params = {
        orgId: id
      }
      getUserList(params).then(res => {
        if(res.success && res.data && res.data.length > 0) {
          this.approvalArr = res.data;
        }
      })
    },
    // 提交
    submit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // let flowNode = this.flowNodeList.shift();
          const annualReportInformation = {
            rapporteur: this.ruleForm.rapporteur,
            idNumber: this.ruleForm.idNumber,
            company: this.ruleForm.company,
            reportTime: this.ruleForm.reportTime,
            // rapporteurId: this.userId,
            // rapporteurId: '1008611',
            rapporteurId: sessionStorage.userId,
            comment: this.ruleForm.comment,
            department: this.ruleForm.department,
            approvalId: this.ruleForm.approvalId,
            // approvalId: '123456001',
            specificYear: format(new Date(), 'yyyy') - 1, // 年报 (格式 yyyy )
          }
          if(this.dialogType == 1){
            saveAnnualReport(annualReportInformation).then(res => {
              // console.log(res);
              if(res.success) {
                this.$message({
                  type: 'success',
                  message: '提交成功'
                })
                this.visible = false
                // this.$router.push('/AnnualReportList')
                this.$parent.query()
              }else {
                this.$message({
                  type: 'error',
                  message: '提交失败'
                })
              }
            })
          }else{
            annualReportInformation.id = this.ruleForm.id
            updateReportApproval(annualReportInformation).then(res => {
              // console.log(res);
              if(res.success) {
                this.$message({
                  type: 'success',
                  message: '提交成功'
                })
                this.visible = false
                // this.$router.push('/AnnualReportList')
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
    selectChange(val) {
      const result = this.approvalArr.filter(item => {
        return item.id === val;
      })
      this.approvalList = result;
    }
  }
}
</script>
<style lang="stylus" scoped>
.report-container
  .report-title
    padding: 8px 16px;
    span
      font-size: 16px;
      color: #121518;
      font-weight: 700;
      height 26px;
      padding-left: 10px;
      position: relative
      &:before
        position: absolute;
        top: 0;
        left: 0;
        content: ' ';
        width: 5px;
        height: 100%;
        border-radius: 5px;
        background: #005BFF;
.report-content
  width: 600px;
  box-sizing: border-box;
  .tip
    padding: 10px;
    color: rgb(230, 160, 97);
    background: rgb(249, 242, 236);
    user-select: text;
    margin-bottom: 25px;
/deep/ .el-select
  width: 100%;
/deep/ .el-form--label-top .el-form-item__label
  padding: 0;
.detail-wrapper
  max-height: 55vh;
  .detail-info
    padding: 5px 20px;
    color: #606266;
    .user-info
      span
        margin-right: 10px;
    .advice
      p
        margin-bottom: 10px;
  .line
    text-align: center;
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
