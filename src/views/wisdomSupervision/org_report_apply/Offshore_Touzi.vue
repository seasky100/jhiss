<template>
  <div class="report-container">
		<div class="report-title">
      <span>境外投资</span>
    </div>
		<div class="report-content">
			<div class="tip">
        父母、配偶、子女及其配偶投资非上市公司、企业的情况，注册个体工商户、个人独资企业或合伙企业的情况，以及本人、配偶、共同生活的子女在国（境）外投资、存款等情况，事后7日内报告。
			</div>

      <div class="form-content">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" size="small" label-position="top">
          <el-form-item label="投资人姓名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="与本人关系" prop="relation">
            <el-select v-model="ruleForm.relation" placeholder="请选择">
              <el-option
                v-for="item in relationOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="投资的国家（地区）及城市" prop="country">
            <el-input v-model="ruleForm.country"></el-input>
          </el-form-item>
          <el-form-item label="投资情况" prop="investmentSituation">
            <el-select v-model="ruleForm.investmentSituation" placeholder="请选择">
              <el-option
                v-for="item in investmentOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="币种" prop="currency">
            <el-input v-model="ruleForm.currency"></el-input>
          </el-form-item>
          <el-form-item label="投资金额" prop="amountPaid">
            <el-input v-model="ruleForm.amountPaid"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="comment">
            <el-input v-model="ruleForm.comment"></el-input>
          </el-form-item>
          <el-form-item label="附件">
            <e-upload @changeHandler="changeHandler" />
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
            <el-button @click="goBack">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
		</div>
  </div>
</template>
<script>
import { saveOverseasInvestment } from '@/api/report.js';
import { getUserList } from '@/api/user-server.js';
import { uploadMultiple } from '@/api/warn.js';
import getFlowNode from '../../../mixin/getFlowNode.js';
import { mapGetters } from 'vuex';

export default {
  mixins: [getFlowNode],
  data() {
    return {
      ruleForm: {
        name: '',
        relation: '',
        country: '',
        investmentSituation: '',
        currency: '',
        amountPaid: '',
        comment: '',
        department: sessionStorage.orgId,
        approvalId: '',
        contentUrl: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        relation: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        country: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        investmentSituation: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        currency: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        amountPaid: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        department: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        approvalId: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      relationOptions: [
        {label:'妻子', value:'1'},
        {label:'丈夫', value:'2'},
        {label:'儿子（共同生活）', value:'3'},
        {label:'女儿（共同生活）', value:'4'}
      ],
      investmentOptions: [
        {label:'房产', value:'0'},
        {label:'投资', value:'1'},
        {label:'股票', value:'2'},
        {label:'基金', value:'3'},
        {label:'投资型保险', value:'4'},
        {label:'其他', value:'5'}
      ],
      causeOptions: [
        {label:'学习', value:'0'},
        {label:'工作', value:'1'},
        {label:'陪读', value:'2'},
        {label:'移民', value:'3'}
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
      approvalList: [],
      files: []
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
    // 文件
    changeHandler(fileList) {
      const data = fileList;
      for (let i = 0; i < data.length; i++) {
        const cur = data[i].raw;
        this.files.push(cur)  
      }
      this.uploadFile();
    },
    uploadFile(){
      const _this = this
      const params = {
        userId : sessionStorage.userId,
        userName : sessionStorage.realName,
        file : this.files
      }
      uploadMultiple(params).then(res => {
        if (res.success) {
          _this.ruleForm.contentUrl = res.data
          this.$message({
            type: 'success',
            message: '上传成功'
          })
        } else {
          this.$message({
            type: 'error',
            message: '上传失败'
          })
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
              reportType: '109',
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
            name: this.ruleForm.name,
            cause: this.ruleForm.cause,
            city: this.ruleForm.city,
            comment: this.ruleForm.comment,
            country: this.ruleForm.country,
            emigrateState: this.ruleForm.emigrateState,
            endTime: this.ruleForm.endTime,
            relation: this.ruleForm.relation,
            strartTime: this.ruleForm.strartTime,
            contentUrl: this.ruleForm.contentUrl,
          }
          saveOverseasInvestment(params).then(res => {
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
    goBack() {
      this.$router.go(-1)
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
    const orgId = this.ruleForm.department
    this.getUserListData(orgId);
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
</style>
