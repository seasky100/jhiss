<template>
  <div class="report-container">
		<div class="report-title">
      <span>婚丧宴请</span>
    </div>
		<div class="report-content">
			<div class="tip">
        本人及直系亲属婚(喜庆)事、直系亲属丧事的办理情况,包括是否举办宴请、宴请对象范围、酒席桌数、餐费标准等，婚(喜庆)事事前7日内报告；丧事事后7日内报告。收受礼金、礼品等情况，事后7日内报告。
			</div>

      <div class="form-content">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" size="small" label-position="top">
          <el-form-item label="办理类型" prop="banquetState">
            <el-select v-model="ruleForm.banquetState" placeholder="请选择">
              <el-option
                v-for="item in banquetOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否宴请" prop="isBanquet">
            <el-select v-model="ruleForm.isBanquet" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="宴请对象范围" prop="banquetScope">
            <el-checkbox-group v-model="ruleForm.banquetScope">
              <el-checkbox v-for="(item, index) in banquetArr" :label="item.value" :key="index">{{item.label}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="酒席桌数（桌）" prop="count">
            <el-input v-model="ruleForm.count"></el-input>
          </el-form-item>
          <el-form-item label="餐费标准（元）" prop="mealsPrice">
            <el-input v-model="ruleForm.mealsPrice"></el-input>
          </el-form-item>
          <el-form-item label="与本人关系" prop="banquetRelation">
            <el-select v-model="ruleForm.banquetRelation" placeholder="请选择">
              <el-option
                v-for="item in relationOptions"
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
import { saveWeddingBanquet } from '@/api/report.js';
import { getUserList } from '@/api/user-server.js';

import getFlowNode from '../../../mixin/getFlowNode.js';

import { mapGetters } from 'vuex';

export default {
  mixins: [getFlowNode],
  data() {
    return {
      ruleForm: {
        banquetState: '',
        isBanquet: '',
        banquetScope: [],
        count: '',
        mealsPrice: '',
        banquetRelation: '',
        comment: '',
        department: '',
        approvalId: ''
      },
      rules: {
        banquetState: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        isBanquet: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        banquetScope: [
          { type: 'array', required: true, message: '请至少', trigger: 'change' }
        ],
        count: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        mealsPrice: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        department: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        approvalId: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      banquetOptions: [
        {label:'婚（喜庆）事', value:'0'},
        {label:'丧事', value:'1'}
      ],
      options: [
        {label:'否', value:'0'},
        {label:'是', value:'1'}
      ],
      banquetArr: [
        {label:'亲戚', value:'0'},
        {label:'朋友', value:'1'},
        {label:'同事', value:'2'},
        {label:'同学', value:'3'},
        {label:'其它', value:'4'}
      ],
      relationOptions: [
        {label:'本人', value:'0'},
        {label:'子女', value:'1'},
        {label:'父母', value:'2'},
        {label:'祖父母', value:'3'},
        {label:'外祖父母', value:'4'}
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
              reportType: '102',
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
            banquetRelation: this.ruleForm.banquetRelation,
            banquetScope: this.ruleForm.banquetScope,
            banquetState: this.ruleForm.banquetState,
            comment: this.ruleForm.comment,
            count: this.ruleForm.count,
            isBanquet: this.ruleForm.isBanquet,
            mealsPrice: this.ruleForm.mealsPrice
          }
          saveWeddingBanquet(params).then(res => {
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
