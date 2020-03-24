<template>
  <div class="reportTableCom">
    <h2 class="title" ref="title">
      {{title}}
      <template v-if="headerTab == 1">
        <span class="imgAdd" @click="addTabData"></span>
        <span class="saveImg" @click="saveBtnClick"></span>
      </template>
    </h2>
    <!-- 普通表格 -->
    <el-table class="generalTab" v-if="headerTab == 1"
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
      type: String,
      default: ''
    },
    tableIndex: {}
    // selectable: {
    //   type: Function
    // },
  },
  data() {
    return {
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
    addTabData(){
      let addData = { edit: true }
      let columnsArr = this.columns2
      let columnsArr2 = this.flatten(columnsArr)
      columnsArr2.map((item,index) => {
        addData[item.prop] = `aa${index+1}`
        addData.type = item.type ? item.type : 'text'
        return item
      })
      // console.log(addData)
      this.tableData.push(addData)
      this.tableData2 = [...this.tableData,...this.appendTab]
    },
    flatten(arr) { 
      return [].concat( ...arr.map(x => Array.isArray(x.children) ? this.flatten(x.children) : {prop:x.prop,type:x.type}) ) 
    },
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
    // 
  }
}
</script>

<style lang="stylus" scoped>
.reportTableCom
  width 100%
  .title
    font-weight bold
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
</style>
