<template>
  <div class="report-container">
		<div class="report-title">
      <span>亲属经商</span>
    </div>
		<div class="report-content">
			<div class="tip">
        配偶、子女及其他直系亲属拟在本人单位或所管辖的单位安排工作或就业的，事前10日内报告；配偶、子女及其配偶从业变化情况，事后7日内报告。
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
          <el-form-item label="企业或其它市场主体名称" prop="companyName">
            <el-input v-model="ruleForm.companyName"></el-input>
          </el-form-item>
          <el-form-item label="企业或其它市场主体类型" prop="companyType">
            <el-select v-model="ruleForm.companyType" placeholder="请选择">
              <el-option
                v-for="item in companyTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="成立日期" prop="buildTime">
            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="ruleForm.buildTime" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="经营范围" prop="businessScope">
            <el-input v-model="ruleForm.businessScope"></el-input>
          </el-form-item>
          <el-form-item label="注册地" prop="registered">
            <el-input v-model="ruleForm.registered"></el-input>
          </el-form-item>
          <el-form-item label="注册资本（金）或资金数额（出资额）" prop="registeredCapital">
            <el-input v-model="ruleForm.registeredCapital">
              <template slot="append">万元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="经营地" prop="businessPlace">
            <el-input v-model="ruleForm.businessPlace"></el-input>
          </el-form-item>
          <el-form-item label="统一社会信用代码/注册号" prop="creditCode">
            <el-input v-model="ruleForm.creditCode"></el-input>
          </el-form-item>
          <el-form-item label="个人认缴出资或个人出资额" prop="personalContribution">
            <el-input v-model="ruleForm.personalContribution">
              <template slot="append">万元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="个人认缴出资或个人出资比例" prop="personalRatio">
            <el-input v-model="ruleForm.personalRatio">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>

          <el-form-item label="备注" prop="comment">
            <el-input v-model="ruleForm.comment"></el-input>
          </el-form-item>
          <el-form-item label="附件">
            <e-upload @changeHandler="changeHandler" />
          </el-form-item>
          <el-form-item label="本部门审批人" required>
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
                <el-form-item prop="id1">
                  <el-select v-model="id1"  placeholder="第一审批人" @change="selectChange1">
                    <el-option
                      v-for="item in approvalArr"
                      :key="item.id"
                      :label="item.realName"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item v-show='shenpi' prop="id2">
                    <el-select v-model="id2"  placeholder="第二审批人" @change="selectChange2">
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
          <el-form-item v-show='shenpi' label="局领导审批">
              <el-col :span="11">
                <el-form-item prop="department1">
                  <select-tree 
                    v-model="ruleForm.department1"
                    :props="config"
                    :treeData="orgData"
                    @change="orgChange"
                    placeholder="请选择领导部门" />
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-form-item prop="id3">
                  <el-select v-model="id3"  placeholder="审批人" @change="selectChange3">
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
import { saveRelativesBusiness } from '@/api/report.js';
import { getUserList } from '@/api/user-server.js';
import { uploadMultiple } from '@/api/warn.js';
import getFlowNode from '../../../mixin/getFlowNode.js';
import { mapGetters } from 'vuex';
export default {
  mixins: [getFlowNode],
  data() {
    return {
      id1:'',
      id2:'',
      id3:'',
      shenpi: false,
      ruleForm: {
        name: '',
        relation: '',
        companyName: '',
        companyType: '',
        buildTime: '',
        businessScope: '',
        registered: '',
        registeredCapital: '',
        businessPlace: '',
        creditCode: '',
        personalContribution: '',
        personalRatio: '',
        comment: '',
        department: sessionStorage.orgId,
        department1: '',
        approvalId: '',
        contentUrl: '',
        flowHistory: [],
      },
      rules: {
        name: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        relation: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        companyName: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        companyType: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        buildTime: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        businessScope: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        registered: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        registeredCapital: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        businessPlace: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        creditCode: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        personalContribution: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        personalRatio: [
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
        {label:'本人', value:'0'},
        {label:'妻子', value:'1'},
        {label:'丈夫', value:'2'},
        {label:'儿子', value:'3'},
        {label:'女儿', value:'4'},
        {label:'儿媳', value:'5'},
        {label:'女婿', value:'6'}
      ],
      companyTypeOptions: [
        {label:'股份有限公司', value:'0'},
        {label:'有限责任公司', value:'1'},
        {label:'个体工商户', value:'2'},
        {label:'个人独资企业', value:'3'},
        {label:'合伙企业', value:'4'},
        {label:'在国（境）外注册公司或者投资入股', value:'5'},
        {label:'其他', value:'6'}
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
      approvalList1: [],
      approvalList2: [],
      approvalList3: [],
      files: []
    }
  },
  watch: {
    'id1': {
      handler() {
        if(this.id1){
          this.shenpi = true
        }
      }
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
        let approvalList = (this.approvalList1.concat(this.approvalList2)).concat(this.approvalList3)
        console.log(approvalList)
        // return     
        // let approvalList = this.approvalList.reduce((prev,curr)=>{  // 二维数组转一维数组
        //   return prev.concat(curr)
        // },[])
        const _this = this
        let arryData 
        for (let i = 0; i < approvalList.length; i++) {
          arryData = {
            approvalId : approvalList[i].id,
            approvalName : approvalList[i].realName,
            node : _this.flowNodeList[i].orders,
            name : _this.flowNodeList[i].name
          }   
          _this.ruleForm.flowHistory.push(arryData) 
        } 
        if (valid) {
          const params = {
            flowProcess: {
              flowId: this.flowId,
              reportType: '111',
              sponsorId: this.userId,
              sponsorName: this.realName,
              department: this.orgName,
              policeCode: this.userInfo.policeCode,
              flowHistory: this.ruleForm.flowHistory
            },
            buildTime: this.ruleForm.buildTime,
            businessPlace: this.ruleForm.businessPlace,
            businessScope: this.ruleForm.businessScope,
            comment: this.ruleForm.comment,
            companyName: this.ruleForm.companyName,
            companyType: this.ruleForm.companyType,
            creditCode: this.ruleForm.creditCode,
            personalContribution: this.ruleForm.personalContribution,
            name: this.ruleForm.name,
            personalRatio: this.ruleForm.personalRatio,
            registered: this.ruleForm.registered,
            registeredCapital: this.ruleForm.registeredCapital,
            relation: this.ruleForm.relation,
            contentUrl: this.ruleForm.contentUrl
          }
          saveRelativesBusiness(params).then(res => {
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
    selectChange1(val) {
      const result = this.approvalArr.filter(item => {
        return item.id === val;
      })
      this.approvalList1 = result;
    },
    selectChange2(val) {
      const result = this.approvalArr.filter(item => {
        return item.id === val;
      })
      this.approvalList2 = result;
    },
    selectChange3(val) {
      const result = this.approvalArr.filter(item => {
        return item.id === val;
      })
      this.approvalList3 = result;
    }
  },
  mounted() {
    this.getData('107')
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
/deep/ .el-input-group__append
  padding: 0;
  width: 50px;
  text-align: center;
</style>
