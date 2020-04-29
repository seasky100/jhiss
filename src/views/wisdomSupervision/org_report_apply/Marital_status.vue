<template>
  <div class="report-container">
		<div class="report-title">
      <span>婚姻情况</span>
    </div>
		<div class="report-content">
			<div class="tip">
         本人的婚姻状况发生变化，新婚、再婚的，事前7日报告；离婚、丧偶的，事后7日内报告。子女与外国人、无国籍人或与港澳及台湾居民通婚的情况，事后7日内报告。 
			</div>

      <div class="form-content">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" size="small" label-position="top">
          <el-form-item label="特殊资源">
            <el-radio-group v-model="ruleForm.isChild">
              <el-radio label="0">本人</el-radio>
              <el-radio label="1">子女与外籍或港澳台通婚</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="婚姻变化情况" prop="marrageState">
            <el-select v-model="ruleForm.marrageState" placeholder="请选择">
              <el-option
                v-for="item in marrageOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="子女姓名" prop="childName" v-if="ruleForm.isChild === '1'">
            <el-input v-model="ruleForm.childName"></el-input>
          </el-form-item>
          <el-form-item label="对方国家（地区）" prop="country" v-if="ruleForm.isChild === '1'">
            <el-input v-model="ruleForm.country"></el-input>
          </el-form-item>
          <el-form-item label="对方姓名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="对方工作单位" prop="workCompany">
            <el-input v-model="ruleForm.workCompany"></el-input>
          </el-form-item>
          <el-form-item label="对方职务" prop="post">
            <el-input v-model="ruleForm.post"></el-input>
          </el-form-item>
          <el-form-item label="对方证件类型" prop="otherCertificate">
            <el-select v-model="ruleForm.otherCertificate" placeholder="请选择">
              <el-option
                v-for="item in certificateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码" prop="certificateNumber">
            <el-input v-model="ruleForm.certificateNumber"></el-input>
          </el-form-item>
          <el-form-item label="对方登记日期" prop="changeTime">
            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="ruleForm.changeTime" style="width: 100%;"></el-date-picker>
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
import { saveMarrage } from '@/api/report.js';
import { getUserList } from '@/api/user-server.js';
import { uploadMultiple } from '@/api/warn.js';
import getFlowNode from '../../../mixin/getFlowNode.js';
import { mapGetters } from 'vuex';
export default {
  mixins: [getFlowNode],
  data() {
    return {
      ruleForm: {
        isChild: '0',
        marrageState: '',
        childName: '',
        country: '',
        name: '',
        workCompany: '',
        post: '',
        otherCertificate: '',
        certificateNumber: '',
        changeTime: '',
        comment: '',
        department: sessionStorage.orgId,
        approvalId: '',
        contentUrl:''
      },
      rules: {
        marrageState: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        childName: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        country: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        workCompany: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        post: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        otherCertificate: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        certificateNumber: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        changeTime: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        department: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        approvalId: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      marrageOptions: [
        {label:'新婚', value:'0'},
        {label:'离婚', value:'1'},
        {label:'丧偶', value:'2'},
        {label:'再婚', value:'3'}
      ],
      certificateOptions: [
        {label:'身份证', value:'0'},
        {label:'护照', value:'1'},
        {label:'军官证', value:'2'},
        {label:'其他', value:'3'}
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
              reportType: '101',
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
            certificateNumber: this.ruleForm.certificateNumber,
            changeTime: this.ruleForm.changeTime,
            childName: this.ruleForm.childName,
            comment: this.ruleForm.comment,
            country: this.ruleForm.country,
            isChild: this.ruleForm.isChild,
            marrageState: this.ruleForm.marrageState,
            name: this.ruleForm.name,
            otherCertificate: this.ruleForm.otherCertificate,
            post: this.ruleForm.post,
            workCompany: this.ruleForm.workCompany,
            contentUrl: this.ruleForm.contentUrl
          }
          saveMarrage(params).then(res => {
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
