<template>
  <div class="report-container">
		<div class="report-title">
      <span>亲属就业</span>
    </div>
		<div class="report-content">
			<div class="tip">
        配偶、子女及其他直系亲属拟在本人单位或所管辖的单位安排工作或就业的，事前10日内报告；配偶、子女及其配偶从业变化情况，事后7日内报告。
			</div>

      <div class="form-content">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" size="small" label-position="top">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="证件名称" prop="certificateName">
            <el-input v-model="ruleForm.certificateName"></el-input>
          </el-form-item>
          <el-form-item label="证件号码" prop="certificateNum">
            <el-input v-model="ruleForm.certificateNum"></el-input>
          </el-form-item>
          <el-form-item label="工作（学习）单位" prop="workCompany">
            <el-input v-model="ruleForm.workCompany"></el-input>
          </el-form-item>
          <el-form-item label="单位性质" prop="enterpriseType">
            <el-select v-model="ruleForm.enterpriseType" placeholder="请选择">
              <el-option
                v-for="item in enterpriseOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否担任高级职称" prop="isDuty" v-if="ruleForm.enterpriseType === '6' || ruleForm.enterpriseType === '7' || ruleForm.enterpriseType === '8' || ruleForm.enterpriseType === '9' || ruleForm.enterpriseType === '10' || ruleForm.enterpriseType === '11'">
            <el-select v-model="ruleForm.isDuty" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="现任职务" prop="post">
            <el-input v-model="ruleForm.post"></el-input>
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
          <el-form-item label="是否在国（境）外" prop="isAbroad">
            <el-select v-model="ruleForm.isAbroad" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
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
import { saveRelativesWork } from '@/api/report.js';
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
        certificateName: '',
        certificateNum: '',
        workCompany: '',
        enterpriseType: '0',
        isDuty: '0',
        post: '',
        relation: '0',
        isAbroad: '0',
        comment: '',
        department: sessionStorage.orgId,
        approvalId: '',
        contentUrl:''
      },
      rules: {
        name: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        certificateName: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        certificateNum: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        workCompany: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        enterpriseType: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        isDuty: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        post: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        relation: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        isAbroad: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        department: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        approvalId: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      enterpriseOptions: [
        {label:'党政机关', value:'0'},
        {label:'事业单位', value:'1'},
        {label:'国有企业', value:'2'},
        {label:'军队', value:'3'},
        {label:'学生', value:'4'},
        {label:'其它', value:'5'},
        {label:'个体工商户', value:'6'},
        {label:'私营企业', value:'7'},
        {label:'外商投资企业', value:'8'},
        {label:'境内从事生产经营活动的外国（地区）企业', value:'9'},
        {label:'外国（地区）企业常驻境内代表机构', value:'10'},
        {label:'境外非政府组织的境内代表机构', value:'11'}
      ],
      options: [
        {label:'否', value:'0'},
        {label:'是', value:'1'}
      ],
      relationOptions: [
        {label:'妻子', value:'0'},
        {label:'丈夫', value:'1'},
        {label:'儿子', value:'2'},
        {label:'女儿', value:'3'},
        {label:'儿媳', value:'4'},
        {label:'儿婿', value:'5'}
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
    uploadFile() {
      const _this = this
      const params = {
        userId: sessionStorage.userId,
        userName: sessionStorage.realName,
        file: this.files
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
              reportType: '106',
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
            certificateName: this.ruleForm.certificateName,
            certificateNum: this.ruleForm.certificateNum,
            comment: this.ruleForm.comment,
            enterpriseType: this.ruleForm.enterpriseType,
            isAbroad: this.ruleForm.isAbroad,
            isDuty: this.ruleForm.isDuty,
            isLife: '0',
            name: this.ruleForm.name,
            post: this.ruleForm.post,
            relation: this.ruleForm.relation,
            workCompany: this.ruleForm.workCompany,
            contentUrl: this.ruleForm.contentUrl
          }
          saveRelativesWork(params).then(res => {
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
