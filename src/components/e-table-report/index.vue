<template>
  <div class="reportTableCom">
    <h2 class="title" ref="title">
      {{title.label}}      
      <template v-if="headerTab == 1">
        <span class="imgAdd" @click="addTabData"></span>
        <span class="saveImg" @click="saveBtnClick"></span>
        <span style="color:red;margin-left:10px;">
          注：保存按钮可获取新增数组数据
        </span>
      </template>
    </h2>
    <span class="explain">
      {{title.explain?title.explain:''}}
    </span>
    <div class="changeBtn">
      <el-radio-group v-model="changeFlag">
        <el-radio :label="1">有变化</el-radio>
        <el-radio :label="0">无变化</el-radio>
      </el-radio-group>
    </div>
    <!-- 普通表格 -->
    <el-table class="generalTab" v-if="headerTab == 1"
      @cell-dblclick="cellHandleDbClick"
      :span-method="arraySpanMethod" border
      :data="tableData2" 
      style="width:100%;">
      <nav-table :columns="columns2"></nav-table>
    </el-table>
    <!-- 表头表格 -->
    <el-table :class="['headerTab']" v-if="headerTab == 2"
      :span-method="arraySpanMethod" border
      :data="[]" 
      style="width:100%;">
      <nav-table :columns="columns2" :headerTab="headerTab" :headerParam="headerParam"></nav-table>
      <!-- 追加表头 -->
      <template v-if="headerAppend.length > 0" slot="append" class="appendTab">
        <el-table
          :data="[]"
          style="width: 100%">
          <nav-table :columns="headerAppend" :headerTab="headerTab" :headerParam="headerParam"></nav-table>
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
                  <el-input v-model="headerParam.message"></el-input>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table>
      </template>
    </el-table>
    <!-- 自定义表格 -->
    <template v-if="headerTab == 3">
      <customTable></customTable>
    </template>
  </div>
</template>

<script>
import NavTable from './NavTable'
import customTable from './customTable'
export default {
  components: { 
    NavTable,
    customTable 
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
      menuKey: 1
    }
  },
  watch: {
    columns(newV, oldV){
      if(JSON.stringify(newV) == JSON.stringify(oldV)){
        return
      }
      this.columns2 = this.columns
    }
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
    },
    // 转化获取列属性对象
    flatten(arr) { 
      return [].concat( ...arr.map(x => Array.isArray(x.children) ? this.flatten(x.children) : {prop:x.prop,type:x.type}) ) 
    },
    // 修改后获取新增数据保存
    saveBtnClick(){
      let paramArr = []
      let arr = [...this.tableData]
      for(let i=0;i<arr.length;i++){
        let obj = arr[i]
        if(obj.edit){
          paramArr.push(obj)
        }
      }
      // console.log('编辑信息：', paramArr)
      this.$emit('editData', paramArr)
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
    color red
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
</style>
