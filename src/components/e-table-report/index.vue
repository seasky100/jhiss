<template>
  <div class="reportTableCom" :key="menuKey+'_'+saveEvent.code">
    <h2 class="title" ref="title">
      {{title.label}}  
      <!-- v-if="headerTab == 1" -->
      <template>
        <span class="imgAdd" @click="addTabData"></span>
        <span class="saveImg" @click="saveBtnClick"></span>
        <!-- <span style="color:red;margin-left:10px;">
          注：保存按钮可获取新增数组数据
        </span> -->
      </template>
    </h2>
    <span class="explain">
      {{title.explain?title.explain:''}}
    </span>
    <!-- <div class="changeBtn">
      <el-radio-group v-model="changeFlag">
        <el-radio :label="1">有变化</el-radio>
        <el-radio :label="0">无变化</el-radio>
      </el-radio-group>
    </div> -->
    <!-- 普通表格 -->
    <el-table class="generalTab" v-if="headerTab == 1"
      @cell-dblclick="cellHandleDbClick"
      :span-method="arraySpanMethod" border
      :data="tableData2" 
      style="width:100%;">
      <nav-table :columns="columns2"></nav-table>
    </el-table>
    <!-- 表头表格 -->
    <el-table v-if="headerTab == 2"
        :class="['headerTab']"
        :span-method="arraySpanMethod" border
        :data="[]" 
        :style="[index > 0 ? {width:'100%','margin-top':'10px'}:{width:'100%'}]">
        <nav-table :tableData="tableData2" :columns="columns2" :headerTab="headerTab" :headerParam="headerParam"></nav-table>
    </el-table>
    <template v-if="headerTab == 4" >
      <template v-if="tableData2.length == 0">
        <div class="customSty">暂无数据</div>
      </template>
      <el-table v-for="(item,index) of tableData2" :key="index"
        :class="['headerTab']" 
        :span-method="arraySpanMethod" border
        :data="[]" 
        :style="[index > 0 ? {width:'100%','margin-top':'10px'}:{width:'100%'}]">
        <nav-table :columns="columns2" :headerTab="headerTab" :headerParam="item"></nav-table>
        <!-- 追加表头 -->
        <template v-if="headerAppend.length > 0" slot="append" class="appendTab">
          <el-table
            :data="[]"
            style="width: 100%">
            <nav-table :columns="headerAppend" :headerTab="headerTab" :headerParam="item"></nav-table>
            <!-- 追加备注 -->
            <template slot="append" class="appendTab">
              <el-table :data="[]" style="width: 100%">
                <el-table-column
                  prop="name"
                  label="备注"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="备注信息">
                  <template slot="header" slot-scope="scope">
                    <template v-if="item.edit">
                      <el-input v-model="item.comment"></el-input>
                    </template>
                    <template v-else>
                      {{item.comment}}
                    </template>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table>
        </template>
      </el-table>
    </template>
    <!-- 自定义表格 -->
    <template v-if="headerTab == 3">
      <customTable :customData="tableData" :headerParam="headerParam"></customTable>
    </template>
  </div>
</template>

<script>
import { format } from 'date-fns'
import NavTable from './NavTable'
import customTable from './customTable'
export default {
  components: { 
    NavTable,
    customTable 
  },
  provide () {
    return {
      reportTab: this
    }
  },
  props: {
    // 是否为表头表格
    headerTab: {
      type: Number,
      default: 1
    },
    headerParam: {
      type: Object,
      default: () => {
        return {};
      }
    },
    headerAppend: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 表格数据
    tableData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    index: {
      type: Number,
      default: () => {
        return 0;
      }
    },
    saveEvent: {
      type: Object,
      default: () => {
        return null;
      }
    },
    appendTab: {
      type: Array,
      default: () => {
        return [];
      }
    },
    columns: {
      type: Array,
      default: () => {
        return [];
      }
    },
    title: {
      type: Object,
      default: () => {
        return {};
      }
    },
    tableIndex: {}
    // selectable: {
    //   type: Function
    // },
  },
  data() {
    return {
      changeFlag: 0,
      columns2: [],
      tableData2: [],
      // columns3: [],
      menuKey: 1,
      verificationDateFlag: true
    }
  },
  watch: {
    columns(newV, oldV){
      if(JSON.stringify(newV) == JSON.stringify(oldV)){
        return
      }
      this.columns2 = this.columns
    },
    // headerParam(newV, oldV){
    //   console.log(newV)
    // }
  },
  mounted() {
    this.columns2 = this.columns
    this.tableData2 = [...this.tableData,...this.appendTab]
    // this.columns3 = this.recursionList(this.columns)
  },
  methods: {
    // 单元格双击事件
    cellHandleDbClick(row, column, cell, event){
      console.log(cell,event)
    },
    // 添加数据
    addTabData(){
      if(this.headerTab == 3){
        // console.log('报表一10',3)
        let addData = { edit: true }
        this.tableData.push(addData)
      // }else if(Object.keys(this.headerParam).length > 0){
      // }else if(this.headerTab == 2){
      }else if(this.headerTab == 2){
        // console.log(this.headerParam)
        this.headerParam.edit = true
        if(this.headerParam.changeTime != null){
          this.headerParam.changeTime = format(new Date(this.headerParam.changeTime), 'yyyy-MM-dd')
        }
        if(this.headerParam.buildTime != null){
          this.headerParam.buildTime = format(new Date(this.headerParam.buildTime), 'yyyy-MM-dd')
        }
        this.menuKey++
      // }else if(this.headerTab == 2 && this.headerAppend.length > 0){

      }else{
        let addData = { edit: true }
        let columnsArr = this.columns2
        let columnsArr2 = this.flatten(columnsArr)
        columnsArr2.map((item,index) => {
          // addData[item.prop] = `aa${index+1}`
          addData[item.prop] = ''
          addData.type = item.type ? item.type : 'text'
          return item
        })
        // console.log(addData)
        this.tableData.push(addData)
        this.tableData2 = [...this.tableData,...this.appendTab]
      }
    },
    // 转化获取列属性对象
    flatten(arr) { 
      return [].concat( ...arr.map(x => Array.isArray(x.children) ? this.flatten(x.children) : {prop:x.prop,type:x.type}) ) 
    },
    // 修改后获取新增数据保存
    saveBtnClick(){
      if(!this.verificationDateFlag){
        this.$message({
          type: 'warning',
          message: '请输入正确的日期'
        })
        return
      }
      let paramData = null
      if(this.headerTab == 1 || this.headerTab == 3 || this.headerAppend.length > 0){
        let paramArr = []
        let arr = [...this.tableData]
        for(let i=0;i<arr.length;i++){
          let obj = arr[i]
          if(obj.edit){
            paramArr.push(obj)
          }
        }
        paramData = paramArr
      } else{
        paramData = this.headerParam
      }
      // console.log('编辑信息：', paramData)
      this.$emit('editData', this.index, paramData, this.saveEvent)
    },
    // 修改table header的背景色
    tableHeaderColor({ row, rowIndex }) {
      // return 'background-color: lightblue;color: #fff;font-weight: 500;'
      return 'background-color: #F5F7FA;color:red;font-weight: 500;'
    },
    // 合并单元格
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if(row.rowSpan){
        if(row.columnIndex == columnIndex){
          return [1,row.rowSpan]
        } else if (columnIndex === 1 || columnIndex === 2 ) {
          return [0, 0];
        }
      }
    },
    // 排序
    recursionList(data){
      let data2 = [...data]
      for (let i = 0; i < data2.length; i++) {
        if (data2[i].children) {
          data2[i].children = this.recursionList(data2[i].children)
        }
      }
      let first = data2[0]
      data2.push(first)
      data2.splice(0,1)
      return data2
    },
    // 求和
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价';
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += ' 元';
        } else {
          sums[index] = 'N/A';
        }
      });

      return sums;
    },
    // #409eff
  }
}
</script>

<style lang="stylus" scoped>
.reportTableCom
  width 100%
  .explain
    display inline-block
    font-size 14px
    line-height 20px
    color #409eff
    margin-bottom 10px
  .title
    font-weight bold
    font-size 18px
    margin-bottom 5px
    .imgAdd,.saveImg
      display inline-block
      position relative
      top 5px
      left 3px
      width 25px
      height 25px
      background url('../../assets/images/add.png') no-repeat
      background-size 100% 100%
    .imgAdd:active
      background url('../../assets/images/addDown.png') no-repeat
      background-size 100% 100%
    .saveImg
      left 10px
      background url('../../assets/images/save.png') no-repeat
      background-size 100% 100%
/deep/ .el-table
  border-left 1px solid #EBEEF5
  th
    text-align center
    background #F5F7FA
    font-weight bold
    border-right 1px solid #EBEEF5
  td
    text-align center
    border-right 1px solid #EBEEF5
/deep/ .el-table.headerTab
  th
    background #fff
    color #606266
    font-weight normal
    border-right 1px solid #EBEEF5
  tbody,.el-table__empty-block
    display none
.changeBtn
  text-align right
  height 25px
  padding-right 20px
.customSty
  background #ffffff
  padding 20px
  text-align center
</style>
