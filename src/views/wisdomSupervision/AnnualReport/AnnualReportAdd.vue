<template>
  <div class="report-container">
		<div class="report-title">
      <span @click="headerParamClick">个人有关事项报告</span>
    </div>
		<div class="report-body">
      <div class="list report_list" style="width:400px;border-right:1px solid #a5a2a2;">
        <div style="border-bottom:1px solid #a5a2a2;padding-bottom:5px;">
          <el-button v-for="(item,index) of menuBtn" :key="index"
            :class="['menuBtn',index == menu_active? 'menuBtnselect':'']"
            autofocus
            @click="BtnClick(index)"
            :type="item.type"
            plain>
              {{item.label}}
          </el-button>
        </div>
        <div class="menu_list">
          <div :class="['list_son',index==list_active?selectClass:'']" 
            @click="listClick(index)"
            v-for="(item,index) of menu_active == 0?reportList:reportList2" :key="index">
            {{index + 1}}. {{item.label}}
          </div>
        </div>
      </div>
      <div class="list report_content">
        <div class="reportTable" ref="printCon" id="printCon">
          <e-table-report :key="list_active"
            :title="reportTitle" 
            :headerTab="headerTab"
            :headerParam="headerParam"
            :headerAppend="headerAppend"
            :columns="columns" 
            :tableData="tableData"
            :appendTab="appendTab"
            @editData="editDataSave"
            >
          </e-table-report>
        </div>
        <!-- <el-button v-print="'#printCon'">打印</el-button> -->
        <el-button @click="PrintRow">打印</el-button>
      </div>
		</div>
  </div>
</template>
<script>
// import { format } from 'date-fns';
import tableData from '../DeclarationTemplate/eventsTemplate.js'
let { tableData1, tableData2 } = tableData
export default {
  name: 'AnnualReportAdd',
  provide () {
    return {
      orgAdd: this
    }
  },
  data() {
    return {
      menu_active: 0,
      menuBtn: [
        {label: '报表一', type: 'primary'},
        {label: '报表二', type: 'primary'},
      ],
      list_active: 0,
      selectClass: 'selectClass',
      reportTitle: '本人的婚姻情况',
      reportList: [
        {label: '本人的婚姻情况'},
        {label: '本人持有普通护照的情况'},
        {label: '本人因私出国的情况'},
        {label: '本人持有往来港澳通行证、因私持有大陆居民往来台湾通行证的情况'},
        {label: '本人因私往来港澳、台湾的情况'},
        {label: '子女与外国人、无国籍人通婚的情况'},
        {label: '子女与港澳以及台湾居民通婚的情况'},
        {label: '配偶、子女移居国（境）外的情况'},
        {label: '配偶、子女虽未移居国（境）外，但连续在国（境）外工作、生活一年以上的情况'},
        {label: '配偶、子女及其配偶从业情况'},
        {label: '配偶、子女及其配偶被司法机关追究刑事责任的情况'},
      ],
      reportList2: [
        {label: '本人的工资及各类奖金、津贴、补贴等（万元/全年）'},
        {label: '本人从事讲学、写作、咨询、审稿、书画等劳务所得（万元/全年）'},
        {label: '本人、配偶、共同生活的子女为所有权人或者共有人的房产情况'},
        {label: '本人、配偶、共同生活的子女投资或者以其他方式持有股票的情况'},
        {label: '本人、配偶、共同生活的子女投资或者以其他方式持有基金的情况'},
        {label: '本人、配偶、共同生活的子女投资或者以其他方式持有投资型保险的情况  '},
        {label: '配偶、子女及其配偶经商办企业的情况'},
        {label: '本人、配偶、共同生活的子女在国（境）外的存款情况'},
        {label: '本人、配偶、共同生活的子女在国（境）外的投资情况'},
        {label: '本人、配偶、共同生活的子女参与民间借贷的情况'},
      ],
      headerTab: tableData1[0].headerTab ? tableData1[0].headerTab : 1,
      headerParam: tableData1[0].headerParam ? tableData1[0].headerParam : {},
      // 追加表头数据
      headerAppend: tableData1[0].headerAppend ? this.recursionList(JSON.stringify([...tableData1[0].headerAppend])): [],
      tableData: [...tableData1[0].data],
      columns: this.recursionList(JSON.stringify([...tableData1[0].columns])),
      appendTab: [],
      checked: true,
      // 11111
    }
  },
  mounted() {
  },
  methods: {
    //打印
    PrintRow(index, row){
      this.$print(this.$refs.printCon)
    },
    headerParamClick(){
      console.log('表头表格信息',this.headerParam)
    },
    BtnClick(index){
      this.menu_active = index
      this.list_active = -1
    },
    listClick(index){
      this.dataParam = []
      this.list_active = index
      if(this.menu_active == 0){
        // 报告标题
        this.reportTitle = this.reportList[index].label
        // 是否为表头表格
        let headerTab = tableData1[index].headerTab ? tableData1[index].headerTab : 1
        this.headerTab = headerTab
        // 表头表格存储数据
        this.headerParam = tableData1[index].headerParam ? tableData1[index].headerParam : {}
        // 追加表头数据
        let headerAppend = tableData1[index].headerAppend ? tableData1[index].headerAppend : []
        this.headerAppend = this.recursionList(JSON.stringify([...headerAppend]))
        // 列数据
        let columns = tableData1[index].columns
        this.columns = this.recursionList(JSON.stringify([...columns]))
        // 表格数据
        this.tableData = tableData1[index].data
        // 新增数据
        this.appendTab = tableData1[index].appendTab
      }else {
        this.reportTitle = this.reportList2[index].label
        // 是否为表头表格
        this.headerTab = tableData2[index].headerTab ? tableData2[index].headerTab : 1
        // 表头表格存储数据
        this.headerParam = tableData2[index].headerParam ? tableData2[index].headerParam : {}
        // 追加表头数据
        let headerAppend = tableData2[index].headerAppend ? tableData2[index].headerAppend : []
        this.headerAppend = this.recursionList(JSON.stringify([...headerAppend]))
        let columns = tableData2[index].columns
        this.columns = this.recursionList(JSON.stringify([...columns]))
        this.tableData = tableData2[index].data
        this.appendTab = tableData2[index].appendTab
      }
    },
    recursionList(data){
      let data2 = JSON.parse(data)
      for (let i = 0; i < data2.length; i++) {
        if (data2[i].children) {
          data2[i].children = this.recursionList(JSON.stringify(data2[i].children))
        }
      }
      let last = data2[data2.length - 1]
      data2.unshift(last)
      data2.splice(data2.length - 1,1)
      return data2
    },
    // 保存新增编辑信息
    editDataSave(data){
      console.log('新增编辑信息：', data)
    },
    // formatterZip(row, columns){
    //   return `<span style='color:red;'>${row[columns.prop] == null ? '': row[columns.prop]}</span>`
    // },
    // 移居类别
    formatter_lb(row, columns){
      let str = ''
      for(let i=0;i<columns.option.length;i++){
        let obj = columns.option[i]
        str += `<span style="display:inline-block;width:90px;">${obj.name}</span>
        <input style="position:relative;top:2px;left:3px;" type="checkbox" name="checkbox" value="0" disabled=true checked/><br/>`
      }
      return str
    },
    // 处理阶段
    ProcessingStage(row, columns){
      let str = ''
      for(let i=0;i<columns.option.length;i++){
        let obj = columns.option[i]
        str += `<span style="display:inline-block;width:90px;">${obj.name}</span>
        <input style="position:relative;top:2px;left:3px;" type="checkbox" name="checkbox" value="0" disabled=true checked/><br/>`
      }
      return str
    },
    // 房产性质
    propertyNature(row, columns){
      let str = ''
      for(let i=0;i<columns.option.length;i++){
        let obj = columns.option[i]
        str += `<span style="display:inline-block;width:90px;">${obj.name}</span>
        <input style="position:relative;top:2px;left:3px;" type="checkbox" name="checkbox" value="0" disabled=true checked/><br/>`
      }
      return str
    },
    // 房产来源
    propertySource(row, columns){
      let str = `<div style="background:#f5f7fa;border-radius:5px;padding:5px 0;margin-bottom:5px;" >`
      for(let i=0;i<columns.option.length;i++){
        let obj = columns.option[i]
        str += `<span style="display:inline-block;width:60px;">${obj.name}</span>
        <input style="position:relative;top:2px;left:3px;" type="checkbox" name="checkbox" value="0" disabled=true checked/><br/>`
      }
      str += `</div><div style="background:#f5f7fa;border-radius:5px;padding:5px 0;" >`
      for(let i=0;i<columns.option2.length;i++){
        let obj = columns.option2[i]
        str += `<span style="display:inline-block;width:60px;">${obj.name}</span>
        <input style="position:relative;top:2px;left:3px;" type="checkbox" name="checkbox" value="0" disabled=true checked/><br/>`
      }
      str += `</div>`
      return str
    },
    summaryfunc1(row, columns){
      if(row[columns.prop] == null){
        return `测试 总市值`
      }else{
        return row[columns.prop]
      }
    },
    summaryfunc2(row, columns){
      if(row[columns.prop] == null){
        return `测试 总资产`
      }else{
        return row[columns.prop]
      }
    },
    summaryfunc3(row, columns){
      if(row[columns.prop] == null){
        return `测试 备注信息`
      }else{
        return row[columns.prop]
      }
    },
    // 
  }
}
</script>
<style lang="stylus" scoped>
/*滚动条样式*/
::-webkit-scrollbar { width: 6px; height: 6px; background-color: #666;}
::-webkit-scrollbar-track { border-radius: 10px; background-color: #666;}
::-webkit-scrollbar-thumb { border-radius: 10px; background-color: #222;}
.report-container
  height 100%
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
  .report-body
    width: calc(100% - 40px);
    height calc(100% - 55px)
    padding 10px 0
    margin: 5px 20px;
    background #e8ebef
    box-sizing: border-box;
    .tip
      padding: 10px;
      color: rgb(230, 160, 97);
      background: rgb(249, 242, 236);
      user-select: text;
      margin-bottom: 10px;
    .line
      text-align: center;
    .list
      float left
      width calc(100% - 441px)
      padding 5px 10px
      height calc(100% - 20px)
      .menuBtn:focus-within
        background #409EFF 
      .menuBtnselect
        background #409EFF
        color #ffffff
    .menu_list
      height calc(100% - 60px)
      margin: 5px
      overflow-y auto
      .list_son
        padding 15px 10px
        font-size 16px
        font-weight bold
        line-height 24px
      .list_son:hover,.selectClass
        background #409EFF 
        color #ffffff
        border-radius 5px
        cursor pointer
      .list_son:hover
        background #96c9ff
    .reportTable
      height calc(100% - 50px)
      margin-bottom 10px
      padding-right 5px
      overflow-y auto
/deep/ .el-select
  width: 100%;
/deep/ .el-form--label-top .el-form-item__label
  padding: 0;
/deep/ .el-textarea
  width: 100%;
</style>
