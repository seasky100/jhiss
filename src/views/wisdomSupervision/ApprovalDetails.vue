<template>
  <div class="report-container">
		<div class="report-title">
      <span>详情</span>
    </div>
		<div class="report-content">
      <div class="form-content">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" size="small" label-position="top">
          <el-form-item label="事项类型" prop="applyType">
            <el-select v-model="ruleForm.applyType" placeholder="请选择" :disabled="disabled">
              <el-option
                v-for="item in applyOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申报开始时间" prop="applyTime">
            <el-date-picker :disabled="disabled" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="ruleForm.applyTime" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="申报结束时间" prop="applyEnd">
            <el-date-picker :disabled="disabled" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="ruleForm.applyEnd" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="事由" prop="applyDesc">
            <el-input :disabled="disabled" type="textarea" v-model="ruleForm.applyDesc" :rows="4"></el-input>
          </el-form-item>
          <el-form-item label="附件">
            <e-upload />
          </el-form-item>
          <el-form-item label="审批人" required>
            <el-col :span="11">
              <el-form-item prop="department">
                <select-tree 
                  :disabled="disabled"
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
                <el-select v-model="ruleForm.approvalId" placeholder="请选择" @change="selectChange" :disabled="disabled">
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
import { saveAffairApply, getApprovalById } from '@/api/report.js';
import { getUserList } from '@/api/user-server.js';

import getFlowNode from '../../mixin/getFlowNode.js';

import { mapGetters } from 'vuex';
import { format } from 'date-fns';

export default {
  mixins: [getFlowNode],
  data() {
    return {
      disabled: false,
      ruleForm: {
        applyType: '',
        applyTime: '',
        applyEnd: '',
        applyDesc: '',
        department: '',
        approvalId: ''
      },
      rules: {
        applyType: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        applyTime: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        applyEnd: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        applyDesc: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        department: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        approvalId: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      applyOptions: [
        {label:'饮酒', value: 201},
        {label:'离开辖区', value: 202},
        {label:'离开单位', value: 203}
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
          let flowNode = this.flowNodeList.shift();
          const params = {
            flowProcess: {
              flowId: this.flowId,
              reportType: '201',
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
            applyType: this.ruleForm.applyType,
            applyTime: this.ruleForm.applyTime,
            applyEnd: this.ruleForm.applyEnd,
            applyDesc: this.ruleForm.applyDesc
          }
          saveAffairApply(params).then(res => {
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
    },
    // 获取详情
    getDetailInfo() {
      const flowCode = this.$route.query.flowCode;
      if(flowCode) {
        const params = {
          flowCode
        }
        getApprovalById(params).then(res => {
          if(res.success) {
            const formData = JSON.parse(res.data.formData);
            console.log(formData)
            this.disabled = true;
            this.ruleForm = {
              applyType: formData.applyType,
              applyTime: format(formData.applyTime, 'yyyy-MM-dd'),
              applyEnd: format(formData.applyEnd, 'yyyy-MM-dd'),
              applyDesc: formData.applyDesc,
              department: '',
              approvalId: ''
            };
          }
        })
      }
    }
  },
  mounted() {
    this.getData('104');
    this.getDetailInfo();
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
/deep/ .el-textarea
  width: 100%;
</style>
