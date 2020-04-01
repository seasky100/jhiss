<template>
  <div class="report-container">
		<div class="report-title">
      <span>因私出境</span>
    </div>
		<div class="report-content">
			<div class="tip">
        本人因私出国（境）出发前7日内，报告出发的时间、同行人员、事由、所赴国家（地区）及停留时间，资金来源等。回国后10日内将本人因私出国（境）证照交政工部门集中保管列为公安机关登记备案人员”等。
			</div>

      <div class="form-content">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" size="small" label-position="top">
          <el-form-item label="所到国家（地区）" prop="exitCountry">
            <el-input v-model="ruleForm.exitCountry"></el-input>
          </el-form-item>
          <el-form-item label="事由" prop="cause">
            <el-select v-model="ruleForm.cause" placeholder="请选择">
              <el-option
                v-for="item in causeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="同行人名字" prop="peers">
            <el-input v-model="ruleForm.peers"></el-input>
          </el-form-item>
          <el-form-item label="出发时间" prop="startTime">
            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="ruleForm.startTime" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="归国时间" prop="endTime">
            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="ruleForm.endTime" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="资金来源" prop="capitalSource">
            <el-input v-model="ruleForm.capitalSource"></el-input>
          </el-form-item>
          <el-form-item label="护照类型" prop="certificateType">
            <el-select v-model="ruleForm.certificateType" placeholder="请选择">
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
          <el-form-item label="其它说明" prop="comment">
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
import { saveDeclareExit } from '@/api/report.js';
import { getUserList } from '@/api/user-server.js';

import getFlowNode from '../../../mixin/getFlowNode.js';

import { mapGetters } from 'vuex';

export default {
  mixins: [getFlowNode],
  data() {
    return {
      ruleForm: {
        exitCountry: '',
        cause: '',
        peers: '',
        startTime: '',
        endTime: '',
        capitalSource: '',
        certificateType: '',
        certificateNumber: '',
        comment: '',
        department: '',
        approvalId: ''
      },
      rules: {
        exitCountry: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        peers: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        cause: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        startTime: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        endTime: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        capitalSource: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        certificateType: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        certificateNumber: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        department: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        approvalId: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      causeOptions: [
        {label:'探亲', value:'0'},
        {label:'访友', value:'1'},
        {label:'学术交流', value:'2'},
        {label:'就医', value:'3'},
        {label:'旅游', value:'4'},
        {label:'继承、接受或处理财产', value:'5'},
        {label:'其它', value:'6'}
      ],
      certificateOptions: [
        {label:'护照', value:'0'},
        {label:'港澳通行证', value:'1'},
        {label:'其他', value:'2'}
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
        debugger
        if (valid) {
          // let flowNode = this.flowNodeList.shift();
          const params = {
            flowProcess: {
              flowId: this.flowId,
              reportType: '104',
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
            certificateType: this.ruleForm.certificateType,
            certificateNumber: this.ruleForm.certificateNumber,
            startTime: this.ruleForm.startTime,
            endTime: this.ruleForm.endTime,
            peers: this.ruleForm.peers,
            cause: this.ruleForm.cause,
            exitCountry: this.ruleForm.exitCountry,
            capitalSource: this.ruleForm.capitalSource,
            comment: this.ruleForm.comment
          }
          saveDeclareExit(params).then(res => {
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
</style>
