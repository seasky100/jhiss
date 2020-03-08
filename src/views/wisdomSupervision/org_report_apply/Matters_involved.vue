<template>
  <div class="report-container">
		<div class="report-title">
      <span>涉纪涉诉事项</span>
    </div>
		<div class="report-content">
			<div class="tip">
        本人、父母、配偶、子女及其配偶涉及民事诉讼的情况，事发7日内报告。
			</div>

      <div class="form-content">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" size="small" label-position="top">
          <el-form-item label="姓名" prop="name">
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
          <el-form-item label="类型" prop="illegalType">
            <el-select v-model="ruleForm.illegalType" placeholder="请选择">
              <el-option
                v-for="item in illegalOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发生时间" prop="happenTime">
            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="ruleForm.happenTime" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="事由" prop="cause">
            <el-input v-model="ruleForm.cause"></el-input>
          </el-form-item>
           <el-form-item label="处理阶段" prop="stage">
            <el-select v-model="ruleForm.stage" placeholder="请选择">
              <el-option
                v-for="item in stageOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="处理结果" prop="result">
            <el-input v-model="ruleForm.result"></el-input>
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
import { saveRelativesIllegal } from '@/api/report.js';
import { getUserList } from '@/api/user-server.js';

import getFlowNode from '../../../mixin/getFlowNode.js';

import { mapGetters } from 'vuex';

export default {
  mixins: [getFlowNode],
  data() {
    return {
      ruleForm: {
        name: '',
        relation: '',
        illegalType: '',
        happenTime: '',
        cause: '',
        stage: '',
        result: '',
        comment: '',
        department: '',
        approvalId: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        relation: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        illegalType: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        happenTime: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        cause: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        stage: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        result: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        department: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        approvalId: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      relationOptions: [
        {label:'配偶', value:'0'},
        {label:'子女', value:'1'},
        {label:'子女配偶', value:'2'}
      ],
      illegalOptions: [
        {label:'民事诉讼', value:'0'},
        {label:'执纪执法机关查处', value:'1'},
        {label:'涉嫌犯罪', value:'2'},
        {label:'非正常死亡', value:'3'}
      ],
      stageOptions: [
        {label:'立案侦查', value:'0'},
        {label:'审查起诉', value:'1'},
        {label:'刑事审判', value:'2'},
        {label:'刑罚执行', value:'3'},
        {label:'执行完毕', value:'4'},
        {label:'其它', value:'5'}
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
              reportType: '107',
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
            cause: this.ruleForm.cause,
            comment: this.ruleForm.comment,
            happenTime: this.ruleForm.happenTime,
            illegalType: this.ruleForm.illegalType,
            name: this.ruleForm.name,
            relation: this.ruleForm.relation,
            result: this.ruleForm.result,
            stage: this.ruleForm.stage
          }
          saveRelativesIllegal(params).then(res => {
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
