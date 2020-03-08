<template>
  <div class="report-container">
		<div class="report-title">
      <span>担保借贷</span>
    </div>
		<div class="report-content">
			<div class="tip">
        本人为经营业务做担保人的情况；本人发生大额借贷情况，借贷款单次30万元以上、累计100万元以上的情况，事后7日内报告。
			</div>

      <div class="form-content">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" size="small" label-position="top">
          <el-form-item label="类型" prop="type">
            <el-select v-model="ruleForm.type" placeholder="请选择">
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="借贷对象名称" prop="borrower">
            <el-input v-model="ruleForm.borrower"></el-input>
          </el-form-item>
          <el-form-item label="借贷对象工作单位" prop="workCompany">
            <el-input v-model="ruleForm.workCompany"></el-input>
          </el-form-item>
          <el-form-item label="借入/借出" prop="isBorrow">
            <el-select v-model="ruleForm.isBorrow" placeholder="请选择">
              <el-option
                v-for="item in borrowOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="借款事由" prop="borrowReason">
            <el-input v-model="ruleForm.borrowReason"></el-input>
          </el-form-item>
          <el-form-item label="金额（万元）" prop="amount">
            <el-input v-model="ruleForm.amount"></el-input>
          </el-form-item>
          <el-form-item label="约定利息" prop="interest">
            <el-input v-model="ruleForm.interest">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
          <el-form-item label="期限（月）" prop="term">
            <el-input v-model="ruleForm.term"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="comment">
            <el-input v-model="ruleForm.comment"></el-input>
          </el-form-item>
          <el-form-item label="附件">
            <e-upload />
          </el-form-item>
          <el-form-item label="审批人" required>
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
          <el-form-item style="text-align: center;">
            <el-button type="primary" @click="submit">提交</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
		</div>
  </div>
</template>
<script>
import { saveSecuredLoan } from '@/api/report.js';
import { getUserList } from '@/api/user-server.js';

import getFlowNode from '../../../mixin/getFlowNode.js';

import { mapGetters } from 'vuex';

export default {
  mixins: [getFlowNode],
  data() {
    return {
      ruleForm: {
        type: '',
        borrower: '',
        workCompany: '',
        isBorrow: '',
        borrowReason: '',
        amount: '',
        interest: '',
        term: '',
        comment: '',
        department: '',
        approvalId: ''
      },
      rules: {
        type: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        borrower: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        workCompany: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        isBorrow: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        borrowReason: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        amount: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        interest: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        term: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        department: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        approvalId: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      typeOptions: [
        {label:'担保', value:'0'},
        {label:'借贷', value:'1'}
      ],
      borrowOptions: [
        {label:'借入', value:'0'},
        {label:'借出', value:'1'}
      ],
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
  methods: {
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
          const params = {
            flowProcess: {
              flowId: this.flowId,
              reportType: '110',
              sponsorId: this.userId,
              sponsorName: this.realName,
              department: this.orgName,
              policeCode: this.userInfo.policeCode,
              flowHistory: this.flowNodeList.map((item, index) => ({
                node: item.orders,
                name: item.name,
                approvalId: this.approvalList[index].id,
                approvalName: this.approvalList[index].realName
              }))
            },
            amount: this.ruleForm.amount,
            borrowReason: this.ruleForm.borrowReason,
            borrower: this.ruleForm.borrower,
            comment: this.ruleForm.comment,
            interest: this.ruleForm.interest,
            isBorrow: this.ruleForm.isBorrow,
            term: this.ruleForm.term,
            type: this.ruleForm.type,
            workCompany: this.ruleForm.workCompany
          }
          saveSecuredLoan(params).then(res => {
            // console.log(res);
            if(res.success) {
              this.$message({
                type: 'success',
                message: '提交成功'
              })
              this.$router.push('/IndividualReport')
            }else {
              this.$message({
                type: 'error',
                message: '提交失败'
              })
            }
          })
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
  },
  mounted() {
    this.getData('201')
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
    padding: 20px 0 0 40px;
    box-sizing: border-box;
    .tip
      padding: 10px;
      color: rgb(230, 160, 97);
      background: rgb(249, 242, 236);
      user-select: text;
      margin-bottom: 10px;
    .line
      text-align: center;
/deep/ .el-select
  width: 100%;
/deep/ .el-form--label-top .el-form-item__label
  padding: 0;
/deep/ .el-input-group__append
  padding: 0;
  width: 50px;
  text-align: center;
</style>
