<template>
  <div class="AnnualReportInfo" ref="printTableCon" id="printTableCon">
		<div class="individual_title">
      报告人基本情况
    </div>
    <!-- 夫妻关系 -->
    <table>
      <tr>
        <td style="width:10%;">姓名</td>
        <td style="width:10%;">
          {{formObj.name}}
          <!-- <el-input v-model="formObj.name"></el-input> -->
        </td>
        <td style="width:10%;">性别</td>
        <td style="width:10%;">
          <!-- <el-input v-model="formObj.sex"></el-input> -->
          {{formObj.sex}}
        </td>
        <td style="width:10%;">民族</td>
        <td style="width:10%;">
          <!-- <el-input v-model="formObj.value1"></el-input> -->
          {{formObj.value1}}
        </td>
        <td style="width:10%;">政治面貌</td>
        <td style="width:10%;">
          <!-- <el-input v-model="formObj.value2"></el-input> -->
          {{formObj.value2}}
        </td>
        <td style="width:10%;">在职状态</td>
        <td style="width:10%;">
          <!-- <el-radio-group v-model="formObj.value3"> -->
          <el-radio-group :value="formObj.value3">
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
          <!-- <el-input v-model="formObj.value4"></el-input> -->
          {{formObj.value4}}
        </td>
        <td colspan="4">
          <!-- <el-input v-model="formObj.value5"></el-input> -->
          {{formObj.value5}}
        </td>
        <td>
          <!-- <el-input v-model="formObj.value6"></el-input> -->
          {{formObj.value6}}
        </td>
      </tr>
      <tr>
        <td colspan="3">身份证号码</td>
        <td colspan="7">
          <!-- <el-input v-model="formObj.value7"></el-input> -->
          {{formObj.value7}}
        </td>
      </tr>
      <tr>
        <td colspan="3">户籍地址</td>
        <td colspan="7">
          <!-- <el-input v-model="formObj.value8"></el-input> -->
          {{formObj.value8}}
        </td>
      </tr>
      <!-- 家庭主要成员 -->
      <tr>
        <td :rowspan="formObj.familyList.length + 1">家庭主要成员</td>
        <td>称谓</td>
        <td>姓名</td>
        <td>政治面貌</td>
        <td colspan="6">工作单位及职务</td>
      </tr>
      <!-- eslint-disable-next-line -->
      <template v-for="(item,index) of formObj.familyList">
        <tr :key="index + '_label'">
          <td>
            <!-- <el-input v-model="item.value1"></el-input> -->
            {{item.value1}}
          </td>
          <td>
            <!-- <el-input v-model="item.value2"></el-input> -->
            {{item.value2}}
          </td>
          <td>
            <!-- <el-input v-model="item.value3"></el-input> -->
            {{item.value3}}
          </td>
          <td colspan="6">
            <!-- <el-input v-model="item.value4"></el-input> -->
            {{item.value4}}
          </td>
        </tr>
      </template>
      <!-- 主要社会关系 -->
      <tr>
        <td :rowspan="formObj.socialRelations.length + 1">主要社会关系</td>
        <td>称谓</td>
        <td>姓名</td>
        <td>政治面貌</td>
        <td colspan="6">工作单位及职务</td>
      </tr>
      <!-- eslint-disable-next-line -->
      <template v-for="(item,index) of formObj.socialRelations">
        <tr :key="index + 'label'">
          <td>
            <!-- <el-input v-model="item.value1"></el-input> -->
            {{item.value1}}
          </td>
          <td>
            <!-- <el-input v-model="item.value2"></el-input> -->
            {{item.value2}}
          </td>
          <td>
            <!-- <el-input v-model="item.value3"></el-input> -->
            {{item.value3}}
          </td>
          <td colspan="6">
            <!-- <el-input v-model="item.value4"></el-input> -->
            {{item.value4}}
          </td>
        </tr>
      </template>
    </table>
    <div class="printDiv">
      <el-button class="printBtn" @click="PrintRow">打印</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnnualReportInfo',
  data() {
    return {
      formObj: {
        name: '',
        value3: '1',
        // 家庭主要成员
        familyList: [
          {value1:'',value2:'',value3:'',value4:''},
          {value1:'',value2:'',value3:'',value4:''},
          {value1:'',value2:'',value3:'',value4:''},
          {value1:'',value2:'',value3:'',value4:''},
          {value1:'',value2:'',value3:'',value4:''},
        ],
        // 主要社会关系
        socialRelations: [
          {value1:'',value2:'',value3:'',value4:''},
          {value1:'',value2:'',value3:'',value4:''},
          {value1:'',value2:'',value3:'',value4:''},
          {value1:'',value2:'',value3:'',value4:''},
          {value1:'',value2:'',value3:'',value4:''},
        ],
      },
      workStatus: [
        {name: '现职', value:'1'},
        {name: '退出现职尚未办理退休手续', value:'2'},
      ],
      // 
    }
  },
  watch: {
    formObj: {
      handler(cval, oval) {
        console.log(cval)
      },
      deep: true
    }
  },
  mounted() {
  },
  methods: {
    //打印
    PrintRow(index, row){
      this.$print(this.$refs.printTableCon) 
    }, 
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
	.individual_title
		height 40px
		line-height 40px
		background #fff
		padding 0 10px
		font-size 16px
		font-weight bold
	table
		margin 20px 10%
		background #ffffff
		tr td
			text-align center
			padding 12px 5px
			line-height 23px
			color #606266
			font-size 14px
			border 1px solid #EBEEF5
</style>
