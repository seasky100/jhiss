<template>
  <div class="report-container">
		<div class="report-title">
      <span>房产变更</span>
    </div>
		<div class="report-content">
			<div class="tip">
        本人、配偶、共同生活的子女房产变更（包括住宅、商用房、厂房、仓库、自建房、车库、车位、储藏间等）、装修等情况（以经备案的房屋买卖合同记载为准），事后7日内报告。
			</div>

      <div class="form-content">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" size="small" label-position="top">
          <el-form-item label="房产类型" prop="houseType">
            <el-select v-model="ruleForm.houseType" placeholder="请选择">
              <el-option
                v-for="item in houseTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="房屋坐落" prop="address" v-if="ruleForm.houseType !== '8'">
            <el-input v-model="ruleForm.address"></el-input>
          </el-form-item>
          <el-form-item label="建筑面积（平方米）" prop="area" v-if="ruleForm.houseType !== '8'">
            <el-input v-model="ruleForm.area"></el-input>
          </el-form-item>
          <el-form-item label="装修情况" prop="decorateStatus" v-if="ruleForm.houseType !== '8'">
            <el-select v-model="ruleForm.decorateStatus" placeholder="请选择">
              <el-option
                v-for="item in decorateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产权归属" prop="ownership" v-if="ruleForm.houseType !== '8'">
            <el-select v-model="ruleForm.ownership" placeholder="请选择">
              <el-option
                v-for="item in ownershipOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <garage-form @setData="setGarage"></garage-form>

          <el-form-item label="房产总额（万元）" prop="total">
            <el-input v-model="ruleForm.total"></el-input>
          </el-form-item>
          <el-form-item label="交易类型" prop="houseSource">
            <el-select v-model="ruleForm.houseSource" placeholder="请选择">
              <el-option
                v-for="item in houseSourceOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="交易时间" prop="tradeTime">
            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="ruleForm.tradeTime" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="贷款情况" prop="isLoan">
            <el-select v-model="ruleForm.isLoan" placeholder="请选择">
              <el-option
                v-for="item in loanOptilons"
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
import { saveDeclareHouse } from '@/api/report.js';
import { getUserList } from '@/api/user-server.js';
import { uploadMultiple } from '@/api/warn.js';
import getFlowNode from '../../../mixin/getFlowNode.js';
import garageForm from './components/garageForm';

import { mapGetters } from 'vuex';

export default {
  components: {
    garageForm
  },
  mixins: [getFlowNode],
  data() {
    return {
      garage: [],
      // 表单
      ruleForm: {
        houseType: '',
        address: '',
        area: '',
        decorateStatus: '',
        ownership: '',
        total: '',
        houseSource: '',
        tradeTime: '',
        isLoan: '',
        comment: '',
        department: sessionStorage.orgId,
        approvalId: '',
        contentUrl:''
      },
      rules: {
        houseType: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        area: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        decorateStatus: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        ownership: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        total: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        houseSource: [
           { required: true, message: '请选择', trigger: 'change' }
        ],
        tradeTime: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        isLoan: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        department: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        approvalId: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      houseTypeOptions: [
        {label:'商品房', value:'0'},
        {label:'福利房', value:'1'},
        {label:'经济适用房', value:'2'},
        {label:'限价房', value:'3'},
        {label:'自建房', value:'4'},
        {label:'商住房', value:'5'},
        {label:'厂房', value:'6'},
        {label:'仓库', value:'7'},
        {label:'其他', value:'8'}
      ],
      decorateOptions: [
        {label:'毛坯', value:'0'},
        {label:'简装', value:'1'},
        {label:'精装', value:'2'}
      ],
      ownershipOptions: [
        {label:'本人', value:'0'},
        {label:'父母', value:'1'},
        {label:'配偶', value:'2'},
        {label:'子女', value:'3'}
      ],
      houseSourceOptions: [
        {label:'购买', value:'0'},
        {label:'继承', value:'1'},
        {label:'接受赠与', value:'2'},
        {label:'分割', value:'3'},
        {label:'合并', value:'4'},
        {label:'变更', value:'5'},
        {label:'交换', value:'6'},
        {label:'析产', value:'7'},
        {label:'赠与他人', value:'8'},
        {label:'其他去向', value:'9'},
        {label:'其他', value:'10'}
      ],
      loanOptilons: [
        {label:'全款', value:'0'},
        {label:'商业贷款', value:'1'},
        {label:'公积金贷款', value:'2'},
        {label:'组合贷款', value:'3'}
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
              reportType: '108',
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
            address: this.ruleForm.address,
            area: this.ruleForm.area,
            comment: this.ruleForm.comment,
            decorateStatus: this.ruleForm.decorateStatus,
            garage: this.garage,
            houseSource: this.ruleForm.houseSource,
            houseType: this.ruleForm.houseType,
            isLoan: this.ruleForm.isLoan,
            ownership: this.ruleForm.ownership,
            total: this.ruleForm.total,
            tradeTime: this.ruleForm.tradeTime,
            contentUrl: this.ruleForm.contentUrl
          }
          saveDeclareHouse(params).then(res => {
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
    // 部门选择回去人员
    selectChange(val) {
      const result = this.approvalArr.filter(item => {
        return item.id === val;
      })
      this.approvalList = result;
    },
    goBack() {
      this.$router.go(-1)
    },   
    // 附房数据
    setGarage(data) {
      if(data.length === 1) {
        this.garage = [];
      }else {
        let res = [];
        data.forEach(item => {
          res.push({
            address: item.address,
            garageArea: item.garageArea,
            garageNumber: item.garageNumber,
            status: item.status
          })
        })
        res.pop();
        this.garage = res;
      }

      console.log(this.garage);
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
.garage
  box-sizing: border-box;
  border: 1px solid #c1d1dc;
  .garage-content
    padding: 10px 20px;
/deep/ .el-select
  width: 100%;
/deep/ .el-form--label-top .el-form-item__label
  padding: 0;
</style>
