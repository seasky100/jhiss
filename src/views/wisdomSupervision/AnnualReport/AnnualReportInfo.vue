<template>
  <div class="AnnualReportInfo">
		<h2 class="individual_title">
      {{title.label}}
      <template>
        <!-- <span class="imgAdd" title="编辑信息" @click="addFormData" ></span>
        <span class="saveImg" title="保存" @click="saveFormData" ></span> -->
        <el-button class="opertion" size="mini" type="primary" icon="el-icon-edit" circle @click="addFormData"></el-button>
        <el-button class="opertion" size="mini" type="success" icon="el-icon-check" circle @click="saveFormData"></el-button>
      </template>
    </h2>
    <span class="explain tip">
      {{title.explain?title.explain:''}}
    </span>
    <!-- 夫妻关系 -->
    <table v-loading="loading">
      <tr>
        <td style="width:10%;">姓名</td>
        <td style="width:10%;">
          <template v-if="formObj.edit">
            <el-input v-model="formObj.name"></el-input>
          </template>
          <template v-else>
            {{formObj.name}}
          </template>
        </td>
        <td style="width:10%;">性别</td>
        <td style="width:10%;">
          <template v-if="formObj.edit">
            <el-input v-model="formObj.sex2"></el-input>
          </template>
          <template v-else>
            {{formObj.sex2}}
          </template>
        </td>
        <td style="width:10%;">民族</td>
        <td style="width:10%;">
          <template v-if="formObj.edit">
            <el-input v-model="formObj.nation"></el-input>
          </template>
          <template v-else>
            {{formObj.nation}}
          </template>
        </td>
        <td style="width:10%;">政治面貌</td>
        <td style="width:10%;">
          <template v-if="formObj.edit">
            <el-input v-model="formObj.politicalStatus"></el-input>
          </template>
          <template v-else>
            {{formObj.politicalStatus}}
          </template>
        </td>
        <td style="width:10%;">在职状态</td>
        <td style="width:10%;">
          <el-radio-group :disabled="!formObj.edit" v-model="formObj.workingStatus">
            <template v-for="(item,index) of workStatus">
              <el-radio style="margin:2px;" :label="item.value" :key="index">{{item.name}}</el-radio>
            </template>
          </el-radio-group>
        </td>
      </tr>
      <tr>
        <td colspan="5">工作单位</td>
        <td colspan="4">现任职务</td>
        <td>职级</td>
      </tr>
      <tr>
        <td colspan="5">
          <template v-if="formObj.edit">
            <el-input v-model="formObj.employer"></el-input>
          </template>
          <template v-else>
            {{formObj.employer}}
          </template>
        </td>
        <td colspan="4">
          <template v-if="formObj.edit">
            <el-input v-model="formObj.currentPosition"></el-input>
          </template>
          <template v-else>
            {{formObj.currentPosition}}
          </template>
        </td>
        <td>
          <template v-if="formObj.edit">
            <el-input v-model="formObj.rank"></el-input>
          </template>
          <template v-else>
            {{formObj.rank}}
          </template>
        </td>
      </tr>
      <tr>
        <td colspan="3">身份证号码</td>
        <td colspan="7">
          <template v-if="formObj.edit">
            <el-input v-model="formObj.cardNum"></el-input>
          </template>
          <template v-else>
            {{formObj.cardNum}}
          </template>
        </td>
      </tr>
      <tr>
        <td colspan="3">户籍地址</td>
        <td colspan="7">
          <template v-if="formObj.edit">
            <el-input v-model="formObj.residenceAddress"></el-input>
          </template>
          <template v-else>
            {{formObj.residenceAddress}}
          </template>
        </td>
      </tr>
      <!-- 家庭主要成员 -->
      <tr>
        <td :rowspan="formObj.userRelationVoList.length + 1">
          家庭主要成员
          <span class="imgAdd img_person opertion" title="添加成员" @click="adduserRelationVoList" ></span>
        </td>
        <td></td>
        <td>称谓</td>
        <td>姓名</td>
        <td>政治面貌</td>
        <td colspan="4">工作单位</td>
        <td>职务</td>
      </tr>
      <!-- eslint-disable-next-line -->
      <template v-for="(item,index) of formObj.userRelationVoList">
        <tr :key="index + '_label'">
          <td>
            <img class="delImg" @click="delRelationVoList(item,index)" src="@/assets/images/del.png" />
          </td>
          <td>
            <template v-if="item.edit">
              <el-input v-model="item.title"></el-input>
            </template>
            <template v-else>
              {{item.title}}
            </template>
          </td>
          <td>
            <template v-if="item.edit">
              <el-input v-model="item.name"></el-input>
            </template>
            <template v-else>
              {{item.name}}
            </template>
          </td>
          <td>
            <template v-if="item.edit">
              <el-input v-model="item.politicsStatus"></el-input>
            </template>
            <template v-else>
              {{item.politicsStatus}}
            </template>
          </td>
          <td colspan="4">
            <template v-if="item.edit">
              <el-input v-model="item.workUnit"></el-input>
            </template>
            <template v-else>
              {{item.workUnit}}
            </template>
          </td>
          <td>
            <template v-if="item.edit">
              <el-input v-model="item.duty"></el-input>
            </template>
            <template v-else>
              {{item.duty}}
            </template>
          </td>
        </tr>
      </template>
      <!-- 主要社会关系 -->
      <tr>
        <td :rowspan="formObj.socialRelationship.length + 1">
          主要社会关系
          <span class="imgAdd img_person opertion" title="添加成员" @click="addsocialRelationship" ></span>
        </td>
        <td></td>
        <td>称谓</td>
        <td>姓名</td>
        <td>政治面貌</td>
        <td colspan="4">工作单位</td>
        <td>职务</td>
      </tr>
      <!-- eslint-disable-next-line -->
      <template v-for="(item,index) of formObj.socialRelationship">
        <tr :key="index + 'label'">
          <td>
            <img class="delImg" @click="delRelationSocial(item,index)" src="@/assets/images/del.png" />
          </td>
          <td>
            <template v-if="item.edit">
              <el-input v-model="item.title"></el-input>
            </template>
            <template v-else>
              {{item.title}}
            </template>
          </td>
          <td>
            <template v-if="item.edit">
              <el-input v-model="item.name"></el-input>
            </template>
            <template v-else>
              {{item.name}}
            </template>
          </td>
          <td>
            <template v-if="item.edit">
              <el-input v-model="item.politicsStatus"></el-input>
            </template>
            <template v-else>
              {{item.politicsStatus}}
            </template>
          </td>
          <td colspan="4">
            <template v-if="item.edit">
              <el-input v-model="item.workUnit"></el-input>
            </template>
            <template v-else>
              {{item.workUnit}}
            </template>
          </td>
          <td>
            <template v-if="item.edit">
              <el-input v-model="item.duty"></el-input>
            </template>
            <template v-else>
              {{item.duty}}
            </template>
          </td>
        </tr>
      </template>
    </table>
    <!-- <div class="printDiv">
      <el-button class="printBtn" @click="PrintRow">打印</el-button>
    </div> -->
  </div>
</template>

<script>
import { format } from 'date-fns';
import { saveBasicAnnual } from '@/api/report.js'
export default {
  name: 'AnnualReportInfo',
  props: {
    reportInfoData: {
      type: Object,
      default: () => {
        return null;
      }
    },
  },
  data() {
    return {
      title: {
        label: '本人基本信息情况', 
        explain: `说明：①工作单位应填写全称或规范简称，同时担任多个职务的，请逐个分行填写。②身份证号码应填写18位公民身份号码。③户籍地址应填写居民户口簿“住址”栏的详细地址。④家庭主要成员包括配偶、子女及其配偶等；主要社会关系主要包括本人和配偶的兄弟姐妹等；本人和配偶的父母视情在“家庭主要成员”和“主要社会关系”中进行填报。首次填报的，应把内容填写完整；再次填报的，填写变化情况。`
      },
      formObj: {
        edit: false,
        name: '',
        sex: '',
        sex2: '',
        // 家庭主要成员
        userRelationVoList: [],
        // 主要社会关系
        socialRelationship: [],
      },
      workStatus: [
        {name: '现职', value:'1'},
        {name: '退出现职尚未办理退休手续', value:'2'},
      ],
      loading: false,
      // 
    }
  },
  watch: {
    formObj: {
      handler(cval, oval) {
        // console.log(cval)
      },
      deep: true
    }
  },
  mounted() {
    if(this.reportInfoData != null){
      this.formObj = this.reportInfoData
      this.$set(this.formObj, 'sex2', this.formObj.sex == 1 ? '男':'女')
    }
  },
  methods: {
    addFormData(){
      this.$set(this.formObj,'edit',true)
    }, 
    saveFormData(flag = true){
      if((!JSON.stringify(this.formObj).includes('true')) && flag){
        this.$message({
          type: 'warning',
          message: '没有修改！'
        })
        return
      }
      this.loading = true
      const flowProcess = {
        id: '',
        reportId: this.$parent.reportObj.id,
        reportType: 300,
        gmtCreate: format(new Date(), 'yyyy-MM-dd'),
        gmtModified: format(new Date(), 'yyyy-MM-dd'),
      }
      const param = this.formObj
      param.sex2 == '男' ? param.sex = 1 : param.sex = 0
      param.flowProcessDto = flowProcess
      saveBasicAnnual(param).then(res => {
        if(res.success){
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          this.loading = false
          // 页面操作
          this.$set(this.formObj,'edit',false)
          let userRelationVoList = this.formObj.userRelationVoList.map(obj => {
            obj.edit = false
            return obj
          })
          let socialRelationship = this.formObj.socialRelationship.map(obj => {
            obj.edit = false
            return obj
          })
          this.$set(this.formObj,'userRelationVoList',userRelationVoList)
          this.$set(this.formObj,'socialRelationship',socialRelationship)
        }else{
          this.loading = false
          this.$message({
            type: 'error',
            message: '保存失败'
          })
        }
      })
      
    },
    adduserRelationVoList(){
      let userRelationVoList = this.formObj.userRelationVoList
      userRelationVoList.push({edit:true})
      this.$set(this.formObj,'userRelationVoList',userRelationVoList)
    },
    addsocialRelationship(){
      let socialRelationship = this.formObj.socialRelationship
      socialRelationship.push({edit:true})
      this.$set(this.formObj,'socialRelationship',socialRelationship)
    },
    // 删除家庭主要成员
    delRelationVoList(data, index){
      // console.log('家庭成员', data, index)
      this.$confirm('删除该成员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.formObj.userRelationVoList.splice(index, 1)
        this.saveFormData(false)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    // 删除社会关系成员
    delRelationSocial(data, index){
      // console.log('社会关系', data, index)
      this.$confirm('删除该成员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.formObj.socialRelationship.splice(index, 1)
        this.saveFormData(false)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    // 
  },
};
</script>

<style lang="stylus" scoped>
.printDiv
  position relative
  bottom 0
  width 100%
  height 60px
  line-height 60px
  text-align center
  .printBtn
    background #545c64
    color #ffffff
.AnnualReportInfo
  .explain
    display inline-block
    font-size 14px
    line-height 20px
    margin-bottom 10px
  .individual_title
    font-weight bold
    font-size 18px
    margin-bottom 5px
    .saveImg
      left 10px
      background url('../../../assets/images/save.png') no-repeat
      background-size 100% 100%
.imgAdd,.saveImg
  display inline-block
  position relative
  top 5px
  left 3px
  width 20px
  height 20px
  background url('../../../assets/images/add.png') no-repeat
  background-size 100% 100%
	table
		background #ffffff
		tr td
			text-align center
			padding 12px 5px
			line-height 23px
			color #606266
			font-size 14px
			border 1px solid #EBEEF5
.img_person
  background url('../../../assets/images/add_person.png') no-repeat
  background-size 100% 100%
  cursor pointer
.tip
  padding: 10px;
  color: rgb(230, 160, 97);
  background: rgb(249, 242, 236);
  user-select: text;
  margin-bottom: 25px;
.delImg
  height:25px;
  width:25px;
  cursor:pointer;
</style>
