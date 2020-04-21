<template>
  <div class="customTab">
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
          <el-radio-group :disabled="!customData[0].edit" v-model="customData[0].relation">
            <template v-for="(item,index) of relationship1">
              <el-radio style="margin:2px;" :label="item.value" :key="index">{{item.name}}</el-radio>
            </template>
          </el-radio-group>
        </td>
        <td rowspan="2">
          <!-- <el-input v-model="customData[0].name"></el-input> -->
          <template v-if="customData[0].edit">
            <el-input v-model="customData[0].name"></el-input>
          </template>
          <template v-else>
            {{customData[0].name}}
          </template>
        </td>
        <td>
          <!-- <el-input v-model="customData[0].value1"></el-input> -->
          <template v-if="customData[0].edit">
            <el-input v-model="customData[0].workCompany"></el-input>
          </template>
          <template v-else>
            {{customData[0].workCompany}}
          </template>
        </td>
        <td>
          <!-- <el-input v-model="customData[0].value2"></el-input> -->
          <template v-if="customData[0].edit">
            <el-input v-model="customData[0].post"></el-input>
          </template>
          <template v-else>
            {{customData[0].post}}
          </template>
        </td>
        <td colspan="2">
          <el-radio-group :disabled="!customData[0].edit" v-model="customData[0].value3">
            <template v-for="(item,index) of unitNature">
              <el-radio style="margin:2px;" :label="item.value" :key="index">{{item.name}}</el-radio>
            </template>
          </el-radio-group>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <span style="margin-right:10px;">是否在国（境）外</span>
          <el-radio-group :disabled="!customData[0].edit" v-model="customData[0].isAbroad">
            <template v-for="(item,index) of whetherList">
              <el-radio style="margin:2px;" :label="item.value" :key="index">{{item.name}}</el-radio>
            </template>
          </el-radio-group>
        </td>
        <td>
          <el-radio-group :disabled="!customData[0].edit" v-model="customData[0].value5">
            <template v-for="(item,index) of unitInfoNature">
              <el-radio style="margin:2px;" :label="item.value" :key="index">{{item.name}}</el-radio>
            </template>
          </el-radio-group>
        </td>
        <td>
          <span style="margin-right:10px;">是否担任高级职务</span>
          <el-radio-group :disabled="!customData[0].edit" v-model="customData[0].isDuty">
            <template v-for="(item,index) of whetherList">
              <el-radio style="margin:2px;" :label="item.value" :key="index">{{item.name}}</el-radio>
            </template>
          </el-radio-group>
        </td>
      </tr>
      <tr>
        <td>证件名称</td>
        <td colspan="4">
          <!-- <el-input v-model="customData[0].value7"></el-input> -->
          <template v-if="customData[0].edit">
            <el-input v-model="customData[0].certificateName"></el-input>
          </template>
          <template v-else>
            {{customData[0].certificateName}}
          </template>
        </td>
      </tr>
      <tr>
        <td>证件号码</td>
        <td colspan="4">
          <!-- <el-input v-model="customData[0].value8"></el-input> -->
          <template v-if="customData[0].edit">
            <el-input v-model="customData[0].certificateNum"></el-input>
          </template>
          <template v-else>
            {{customData[0].certificateNum}}
          </template>
        </td>
      </tr>
    </table>
    <!-- 子女关系 -->
    <template v-for="(item,index) of customData">
      <table :key="index" v-if="index > 0">
        <tr>
          <td>子女{{cnNums[index]}}</td>
          <td width="60">姓名</td>
          <td>是否为共同生活子女</td>
          <td>工作（学习）单位</td>
          <td>现任职务</td>
          <td colspan="2">单位性质</td>
        </tr>
        <tr>
          <td rowspan="4">
            <el-radio-group :disabled="!item.edit" v-model="item.relation">
              <template v-for="(item,index) of relationship2">
                <el-radio style="margin:2px;" :label="item.value" :key="index">{{item.name}}</el-radio>
              </template>
            </el-radio-group>
          </td>
          <td rowspan="2">
            <!-- <el-input v-model="item.name"></el-input> -->
            <template v-if="item.edit">
              <el-input v-model="item.name"></el-input>
            </template>
            <template v-else>
              {{item.name}}
            </template>
          </td>
          <td rowspan="2">
            <el-radio-group :disabled="!item.edit" v-model="item.isLife">
              <template v-for="(item,index) of whetherList">
                <el-radio style="margin:2px;" :label="item.value" :key="index">{{item.name}}</el-radio>
              </template>
            </el-radio-group>
          </td>
          <td>
            <!-- <el-input v-model="customData[0].value1"></el-input> -->
            <template v-if="item.edit">
              <el-input v-model="item.workCompany"></el-input>
            </template>
            <template v-else>
              {{item.workCompany}}
            </template>
          </td>
          <td>
            <!-- <el-input v-model="customData[0].value2"></el-input> -->
            <template v-if="item.edit">
              <el-input v-model="item.post"></el-input>
            </template>
            <template v-else>
              {{item.post}}
            </template>
          </td>
          <td colspan="2">
            <el-radio-group :disabled="!item.edit" v-model="customData[0].value3">
              <template v-for="(item,index) of unitNature">
                <el-radio style="margin:2px;" :label="item.value" :key="index">{{item.name}}</el-radio>
              </template>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <span style="margin-right:10px;">是否在国（境）外</span>
            <el-radio-group :disabled="!item.edit" v-model="customData[0].isAbroad">
              <template v-for="(item,index) of whetherList">
                <el-radio style="margin:2px;" :label="item.value" :key="index">{{item.name}}</el-radio>
              </template>
            </el-radio-group>
          </td>
          <td>
            <el-radio-group :disabled="!item.edit" v-model="customData[0].value5">
              <template v-for="(item,index) of unitInfoNature">
                <el-radio style="margin:2px;" :label="item.value" :key="index">{{item.name}}</el-radio>
              </template>
            </el-radio-group>
          </td>
          <td>
            <span style="margin-right:10px;">是否担任高级职务</span>
            <el-radio-group :disabled="!item.edit" v-model="customData[0].isDuty">
              <template v-for="(item,index) of whetherList">
                <el-radio style="margin:2px;" :label="item.value" :key="index">{{item.name}}</el-radio>
              </template>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td>证件名称</td>
          <td colspan="5">
            <!-- <el-input v-model="customData[0].value7"></el-input> -->
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
            <!-- <el-input v-model="customData[0].value8"></el-input> -->
            <template v-if="item.edit">
              <el-input v-model="item.certificateNum"></el-input>
            </template>
            <template v-else>
              {{item.certificateNum}}
            </template>
          </td>
        </tr>
        <!-- 配偶信息 -->
        <tr>
          <td rowspan="5"></td>
          <td>配偶姓名</td>
          <td>工作（学习）单位</td>
          <td colspan="2">现任职务</td>
          <td colspan="2">单位性质</td>
        </tr>
        <tr>
          <td rowspan="2">
            <!-- <el-input v-model="customData[0].name2"></el-input> -->
            <template v-if="item.edit">
              <el-input v-model="item.name2"></el-input>
            </template>
            <template v-else>
              {{item.name2}}
            </template>
          </td>
          <td>
            <!-- <el-input v-model="customData[0].value"></el-input> -->
            <template v-if="item.edit">
              <el-input v-model="item.value"></el-input>
            </template>
            <template v-else>
              {{item.value}}
            </template>
          </td>
          <td colspan="2">
            <!-- <el-input v-model="customData[0].value"></el-input> -->
            <template v-if="item.edit">
              <el-input v-model="item.value"></el-input>
            </template>
            <template v-else>
              {{item.value}}
            </template>
          </td>
          <td colspan="2">
            <el-radio-group :disabled="!item.edit" v-model="customData[0].value3">
              <template v-for="(item,index) of unitNature">
                <el-radio style="margin:2px;" :label="item.value" :key="index">{{item.name}}</el-radio>
              </template>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <span style="margin-right:10px;">是否在国（境）外</span>
            <el-radio-group :disabled="!item.edit" v-model="customData[0].value4">
              <template v-for="(item,index) of whetherList">
                <el-radio style="margin:2px;" :label="item.value" :key="index">{{item.name}}</el-radio>
              </template>
            </el-radio-group>
          </td>
          <td>
            <el-radio-group :disabled="!item.edit" v-model="customData[0].value5">
              <template v-for="(item,index) of unitInfoNature">
                <el-radio style="margin:2px;" :label="item.value" :key="index">{{item.name}}</el-radio>
              </template>
            </el-radio-group>
          </td>
          <td>
            <span style="margin-right:10px;">是否担任高级职务</span>
            <el-radio-group :disabled="!item.edit" v-model="customData[0].value6">
              <template v-for="(item,index) of whetherList">
                <el-radio style="margin:2px;" :label="item.value" :key="index">{{item.name}}</el-radio>
              </template>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td>证件名称</td>
          <td colspan="5">
            <!-- <el-input v-model="customData[0].value7"></el-input> -->
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
            <!-- <el-input v-model="customData[0].value8"></el-input> -->
            <template v-if="item.edit">
              <el-input v-model="item.certificateNum"></el-input>
            </template>
            <template v-else>
              {{item.certificateNum}}
            </template>
          </td>
        </tr>
      </table>
    </template>
  </div>
</template>

<script>
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
  },
  data() {
    return {
      // customData: [
      //   {name: '',},
      //   {name: '',},
      //   {name: '',}
      // ],
      // '零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'
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
        {name: '其他', value:'6'},
      ],
      // 单位性质细则
      unitInfoNature:[
        {name: '个体工商户', value:'1'},
        {name: '私营企业', value:'2'},
        {name: '外商投资企业', value:'3'},
        {name: '境内从事生产经营活动的外国（地区）企业', value:'4'},
        {name: '外国（地区）企业常驻境内代表机构', value:'5'},
        {name: '境外非政府组织的境内代表机构', value:'6'},
      ],
      // 是否选项
      whetherList: [
        {name: '是', value:'1'},
        {name: '否', value:'2'},
      ],
    }
  },
  watch: {
    customData: {
      handler(cval, oval) {
        console.log(cval)
      },
      deep: true
    }
  },
  mounted() {
  },
  methods: {
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
</style>
