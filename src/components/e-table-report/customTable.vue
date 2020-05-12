<template>
  <div class="customTab" :key="pageKey">
    <template v-if="tabData != null">
      <!-- 夫妻关系 -->
      <table>
        <tr>
          <td>配偶</td>
          <td width="60">姓名</td>
          <td>工作（学习）单位</td>
          <td>现任职务</td>
          <td colspan="2">单位性质</td>
        </tr>
        <tr>
          <td rowspan="4">
            <el-radio-group :disabled="!tabData.edit" v-model="tabData.relation">
              <template v-for="(item,index) of relationship1">
                <el-radio style="margin:2px;" :label="item.value" :key="index">{{item.name}}</el-radio>
              </template>
            </el-radio-group>
          </td>
          <td rowspan="2">
            <template v-if="tabData.edit">
              <el-input v-model="tabData.name"></el-input>
            </template>
            <template v-else>
              {{tabData.name}}
            </template>
          </td>
          <td>
            <template v-if="tabData.edit">
              <el-input v-model="tabData.workCompany"></el-input>
            </template>
            <template v-else>
              {{tabData.workCompany}}
            </template>
          </td>
          <td>
            <template v-if="tabData.edit">
              <el-input v-model="tabData.post"></el-input>
            </template>
            <template v-else>
              {{tabData.post}}
            </template>
          </td>
          <td colspan="2">
            <el-radio-group :disabled="!tabData.edit" v-model="tabData.nature">
              <template v-for="(item,index) of unitNature">
                <el-radio style="margin:2px;" :label="item.value" :key="index">{{item.name}}</el-radio>
              </template>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <span style="margin-right:10px;">是否在国（境）外</span>
            <el-radio-group :disabled="!tabData.edit" v-model="tabData.isAbroad">
              <template v-for="(item,index) of whetherList">
                <el-radio style="margin:2px;" :label="item.value" :key="index">{{item.name}}</el-radio>
              </template>
            </el-radio-group>
          </td>
          <td>
            <el-radio-group :disabled="!tabData.edit" v-model="tabData.nature">
              <template v-for="(item,index) of unitInfoNature">
                <el-radio style="margin:2px;" :label="item.value" :key="index">{{item.name}}</el-radio>
              </template>
            </el-radio-group>
          </td>
          <td>
            <span style="margin-right:10px;">是否担任高级职务</span>
            <el-radio-group :disabled="!tabData.edit" v-model="tabData.isDuty">
              <template v-for="(item,index) of isDutyList">
                <el-radio style="margin:2px;" :label="item.value" :key="index">{{item.name}}</el-radio>
              </template>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td>证件名称</td>
          <td colspan="4">
            <template v-if="tabData.edit">
              <el-input v-model="tabData.certificateName"></el-input>
            </template>
            <template v-else>
              {{tabData.certificateName}}
            </template>
          </td>
        </tr>
        <tr>
          <td>证件号码</td>
          <td colspan="4">
            <template v-if="tabData.edit">
              <el-input v-model="tabData.certificateNum"></el-input>
            </template>
            <template v-else>
              {{tabData.certificateNum}}
            </template>
          </td>
        </tr>
      </table>
      <!-- 子女关系 customData -->
      <template v-if="tabData.childRelativesWorkDo.length > 0" >
        <table :key="index" v-for="(item,index) of tabData.childRelativesWorkDo">
          <tr>
            <td>子女{{cnNums[index + 1]}}</td>
            <td width="60">姓名</td>
            <td>是否为共同生活子女</td>
            <td>工作（学习）单位</td>
            <td>现任职务</td>
            <td colspan="2">单位性质</td>
          </tr>
          <tr>
            <td rowspan="4">
              <el-radio-group :disabled="!item.edit" v-model="item.relation">
                <template v-for="(item2,index) of relationship2">
                  <el-radio style="margin:2px;" :label="item2.value" :key="index">{{item2.name}}</el-radio>
                </template>
              </el-radio-group>
            </td>
            <td rowspan="2">
              <template v-if="item.edit">
                <el-input v-model="item.name"></el-input>
              </template>
              <template v-else>
                {{item.name}}
              </template>
            </td>
            <td rowspan="2">
              <el-radio-group :disabled="!item.edit" v-model="item.isLife">
                <template v-for="(item2,index) of whetherList">
                  <el-radio style="margin:2px;" :label="item2.value" :key="index">{{item2.name}}</el-radio>
                </template>
              </el-radio-group>
            </td>
            <td>
              <template v-if="item.edit">
                <el-input v-model="item.workCompany"></el-input>
              </template>
              <template v-else>
                {{item.workCompany}}
              </template>
            </td>
            <td>
              <template v-if="item.edit">
                <el-input v-model="item.post"></el-input>
              </template>
              <template v-else>
                {{item.post}}
              </template>
            </td>
            <td colspan="2">
              <el-radio-group :disabled="!item.edit" v-model="item.nature">
                <template v-for="(item2,index) of unitNature">
                  <el-radio style="margin:2px;" :label="item2.value" :key="index">{{item2.name}}</el-radio>
                </template>
              </el-radio-group>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <span style="margin-right:10px;">是否在国（境）外</span>
              <el-radio-group :disabled="!item.edit" v-model="item.isAbroad">
                <template v-for="(item2,index) of whetherList">
                  <el-radio style="margin:2px;" :label="item2.value" :key="index">{{item2.name}}</el-radio>
                </template>
              </el-radio-group>
            </td>
            <td>
              <el-radio-group :disabled="!item.edit" v-model="item.nature">
                <template v-for="(item2,index) of unitInfoNature">
                  <el-radio style="margin:2px;" :label="item2.value" :key="index">{{item2.name}}</el-radio>
                </template>
              </el-radio-group>
            </td>
            <td>
              <span style="margin-right:10px;">是否担任高级职务</span>
              <el-radio-group :disabled="!item.edit" v-model="item.isDuty">
                <template v-for="(item2,index) of isDutyList">
                  <el-radio style="margin:2px;" :label="item2.value" :key="index">{{item2.name}}</el-radio>
                </template>
              </el-radio-group>
            </td>
          </tr>
          <tr>
            <td>证件名称</td>
            <td colspan="5">
              <template v-if="item.edit">
                <el-input v-model="item.certificateName"></el-input>
              </template>
              <template v-else>
                {{item.certificateName}}
              </template>
            </td>
          </tr>
          <tr>
            <td>证件号码</td>
            <td colspan="5">
              <template v-if="item.edit">
                <el-input v-model="item.certificateNum"></el-input>
              </template>
              <template v-else>
                {{item.certificateNum}}
              </template>
            </td>
          </tr>
          <!-- 配偶信息 -->
          <!-- v-if="item.spouseRelativesWorkDo != null" -->
          <template v-if="item.spouseRelativesWorkDo != null">
            <tr>
              <td rowspan="5"></td>
              <td>配偶姓名</td>
              <td>工作（学习）单位</td>
              <td colspan="2">现任职务</td>
              <td colspan="2">单位性质</td>
            </tr>
            <tr>
              <td rowspan="2">
                <template v-if="item.edit">
                  <el-input v-model="item.spouseRelativesWorkDo.name"></el-input>
                </template>
                <template v-else>
                  {{item.spouseRelativesWorkDo.name}}
                </template>
              </td>
              <td>
                <template v-if="item.edit">
                  <el-input v-model="item.spouseRelativesWorkDo.workCompany"></el-input>
                </template>
                <template v-else>
                  {{item.spouseRelativesWorkDo.workCompany}}
                </template>
              </td>
              <td colspan="2">
                <template v-if="item.edit">
                  <el-input v-model="item.spouseRelativesWorkDo.post"></el-input>
                </template>
                <template v-else>
                  {{item.spouseRelativesWorkDo.post}}
                </template>
              </td>
              <td colspan="2">
                <el-radio-group :disabled="!item.spouseRelativesWorkDo.edit" v-model="item.spouseRelativesWorkDo.nature">
                  <template v-for="(item2,index) of unitNature">
                    <el-radio style="margin:2px;" :label="item2.value" :key="index">{{item2.name}}</el-radio>
                  </template>
                </el-radio-group>
              </td>
            </tr>
            <tr>
              <td colspan="3">
                <span style="margin-right:10px;">是否在国（境）外</span>
                <el-radio-group :disabled="!item.spouseRelativesWorkDo.edit" v-model="item.spouseRelativesWorkDo.isAbroad">
                  <template v-for="(item2,index) of whetherList">
                    <el-radio style="margin:2px;" :label="item2.value" :key="index">{{item2.name}}</el-radio>
                  </template>
                </el-radio-group>
              </td>
              <td>
                <el-radio-group :disabled="!item.spouseRelativesWorkDo.edit" v-model="item.spouseRelativesWorkDo.nature">
                  <template v-for="(item2,index) of unitInfoNature">
                    <el-radio style="margin:2px;" :label="item2.value" :key="index">{{item2.name}}</el-radio>
                  </template>
                </el-radio-group>
              </td>
              <td>
                <span style="margin-right:10px;">是否担任高级职务</span>
                <el-radio-group :disabled="!item.spouseRelativesWorkDo.edit" v-model="item.spouseRelativesWorkDo.isDuty">
                  <template v-for="(item2,index) of isDutyList">
                    <el-radio style="margin:2px;" :label="item2.value" :key="index">{{item2.name}}</el-radio>
                  </template>
                </el-radio-group>
              </td>
            </tr>
            <tr>
              <td>证件名称</td>
              <td colspan="5">
                <template v-if="item.edit">
                  <el-input v-model="item.spouseRelativesWorkDo.certificateName"></el-input>
                </template>
                <template v-else>
                  {{item.spouseRelativesWorkDo.certificateName}}
                </template>
              </td>
            </tr>
            <tr>
              <td>证件号码</td>
              <td colspan="5">
                <template v-if="item.edit">
                  <el-input v-model="item.spouseRelativesWorkDo.certificateNum"></el-input>
                </template>
                <template v-else>
                  {{item.spouseRelativesWorkDo.certificateNum}}
                </template>
              </td>
            </tr>
          </template>
          
        </table>
      </template>
    </template>
    <template v-else>
      <div class="customSty">暂无数据</div>
    </template>
  </div>
</template>

<script>
import { format } from 'date-fns';
import { saveRelativesWorkAnnual } from '@/api/report.js'
export default {
  name: 'customTable',
  inject: ['orgAdd'],
  props: {
    customData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    headerParam: {
      type: Object,
      default: () => {
        return {};
      }
    },
    addCoutusIndex: {
      type: Number,
      default: () => {
        return 0;
      }
    },
    customType: {
      type: String,
      default: () => {
        return '';
      }
    },
  },
  data() {
    return {
      // tabData: {
      //   name:'',
      //   childRelativesWorkDo:[
      //     {name: '', spouseRelativesWorkDo:{name:''}}
      //   ],
      // },
      tabData: null,
      // childRelativesWorkDo: {
      //   certificateName: '',
      //   certificateNum : '',
      //   comment : '',
      //   gmtCreate : '',
      //   gmtModified : '',
      //   isAbroad : '',
      //   isDuty : '',
      //   isLife : '',
      //   name: '',
      //   nature : '',
      //   post : '',
      //   relation : '',
      //   workCompany : '',
      //   spouseRelativesWorkDo: null,
      // },
      pageKey: 0,
      cnNums: ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'],
      relationship1: [
        {name: '妻子', value:'1'},
        {name: '丈夫', value:'2'},
      ],
      relationship2: [
        {name: '儿子', value:'1'},
        {name: '女儿', value:'2'},
      ],
      // 单位性质
      unitNature: [
        {name: '党政机关', value:'1'},
        {name: '事业单位', value:'2'},
        {name: '国有企业', value:'3'},
        {name: '军队', value:'4'},
        {name: '学生', value:'5'},
        {name: '其他', value:'8'},
      ],
      // 单位性质细则
      unitInfoNature:[
        {name: '个体工商户', value:'6'},
        {name: '私营企业', value:'7'},
        {name: '外商投资企业', value:'9'},
        {name: '境内从事生产经营活动的外国（地区）企业', value:'10'},
        {name: '外国（地区）企业常驻境内代表机构', value:'11'},
        {name: '境外非政府组织的境内代表机构', value:'12'},
      ],
      // 是否选项
      whetherList: [
        {name: '是', value:1},
        {name: '否', value:2},
      ],
      // 是否担任高级职务
      isDutyList: [
        {name: '是', value:0},
        {name: '否', value:1},
      ],
    }
  },
  watch: {
    // customData: {
    //   handler(cval, oval) {
    //     // console.log(cval)
    //     this.pageKey++
    //   },
    //   deep: true
    // },
    addCoutusIndex(){
      this.addTabFData()
    },
    customType(){
      if(this.customType == 'add'){
        this.saveCustomData()
      }
    },
  },
  mounted() {
    if(this.customData.length > 0){
      let n = this.customData.length - 1
      let param = this.customData[n]
      if((!param.childRelativesWorkDo) || param.childRelativesWorkDo == null){
        param.childRelativesWorkDo = []
      }
      this.tabData = param
    }
  },
  methods: {
    isArray(o){
      return Object.prototype.toString.call(o)== '[object Array]'
    },
    addTabFData(){
      if(this.tabData == null){
        this.tabData = {
          edit: true,
          name:'',
          childRelativesWorkDo:[],
        }
      }else{
        let childRelativesWorkDo = []
        if(this.isArray(this.tabData.childRelativesWorkDo) && this.tabData.childRelativesWorkDo.length > 0){
          childRelativesWorkDo = this.tabData.childRelativesWorkDo
        }
        childRelativesWorkDo.push({name:'',edit:true,spouseRelativesWorkDo:{name:'',edit:true}})
        this.$set(this.tabData,'childRelativesWorkDo',childRelativesWorkDo)
      }
    },
    saveCustomData(){
      const flowProcess = {
        id: '',
        reportId: this.$parent.$parent.reportObj.id,
        reportType: 310,
        gmtCreate: format(new Date(), 'yyyy-MM-dd'),
        gmtModified: format(new Date(), 'yyyy-MM-dd'),
      }
      const param = this.tabData
      param.gmtCreate = format(new Date(), 'yyyy-MM-dd'),
      param.gmtModified = format(new Date(), 'yyyy-MM-dd'),
      param.flowProcessDto = flowProcess
      saveRelativesWorkAnnual(param).then(res => {
        if(res.success) {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          let data = this.tabData
          data.edit = false
          let childRelativesWorkDo = data.childRelativesWorkDo.map(item => {
            item.edit = false
            let spouseRelativesWorkDo = item.spouseRelativesWorkDo
            if(spouseRelativesWorkDo.edit != null){
              spouseRelativesWorkDo.edit = false
            }
            item.spouseRelativesWorkDo = spouseRelativesWorkDo
            return item
          })
        }else{
          this.$message({
            type: 'error',
            message: '保存失败'
          })
        }
      })
    },
    // 
  },
};
</script>

<style lang="stylus" scoped>
.customTab table
  width 100%
  margin-bottom 10px
  background #ffffff
  tr td
    text-align center
    padding 12px 5px
    line-height 23px
    color #606266
    font-size 14px
    border 1px solid #EBEEF5
.customSty
  background #ffffff
  padding 20px
  text-align center
</style>
