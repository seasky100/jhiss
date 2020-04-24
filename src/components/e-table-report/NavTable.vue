<template>
  <div>
    <!-- show-overflow-tooltip :render-header="renderContent" -->
    <div v-for="(item,index) of list" :key="index">
      <el-table-column :key="index" :index="item.index"
				:prop="item.prop" :label="item.label"
				:align="item.align"
        :min-width="item.width ? item.width : 'auto'"
				:fixed="item.fixed ? item.fixed : false"
				show-overflow-tooltip>
				<template v-if="item.children && item.children.length > 0">
					<nav-table :tableData="tableData" :columns="item.children" :headerTab="headerTab" :headerParam="headerParam"></nav-table>
				</template>
        <!-- 表格数据 -->
        <template v-if="!item.children || item.children.length == 0" slot-scope="scope">
          <span v-if="scope.row.edit">
            <!-- 文本框 -->
            <el-input v-if="(!item.type) || item.type == '' || item.type == 'text'" v-model="scope.row[item.prop]"></el-input>
            <!-- 单选按钮 -->
            <el-radio-group v-else-if="item.type == 'checkbox'" v-model="scope.row[item.prop]">
              <template v-for="(item2,index2) of item.option">
                <el-radio style="margin:2px;" :label="item2.value" :key="index2">{{item2.name}}</el-radio>
                <br />
              </template>
            </el-radio-group>
            <!-- 组合单选集 -->
            <template v-else-if="item.type == 'checkboxArr'">
              <div class="checkboxArr" style="margin-bottom:5px;">
                <el-radio-group v-model="scope.row[item.prop]">
                  <template v-for="(item2,index2) of item.option">
                    <el-radio style="margin:2px;" :label="item2.value" :key="index2">{{item2.name}}</el-radio>
                    <br />
                  </template>
                </el-radio-group>
              </div>
              <div class="checkboxArr">
                <el-radio-group v-model="scope.row[item.prop]">
                  <template v-for="(item2,index2) of item.option2">
                    <el-radio style="margin:2px;" :label="item2.value" :key="index2">{{item2.name}}</el-radio>
                    <br />
                  </template>
                </el-radio-group>
              </div>
            </template>
            <template v-else-if="item.type == 'date'">
              <el-input @change="verificationDate" v-model="scope.row[item.prop]"></el-input>
            </template>
          </span>
          <span v-else-if="(!item.formatter) && (!scope.row.summaryfunc)">
            <!-- {{scope.row[item.prop]}} -->
            <template v-if="item.type == 'date'">
              {{scope.row[item.prop] != null ? formatterDate(scope.row[item.prop]) : ''}}
            </template>
            <template v-else>
              {{scope.row[item.prop]}}
            </template>
          </span>
          <span v-else v-html="format(scope.row, item)"></span>
        </template>
        <!-- 表头数据 -->
        <!-- eslint-disable-next-line -->
        <template slot="header" slot-scope="scope">
          <span v-if="headerTab == 1">{{item.label}}</span>
          <span v-else-if="headerTab == 2">
            <!-- 首次进入 -->
            <template v-if="tableData.length == 0">
              <span v-if="(!item.type) || item.type == null || item.type == ''">
                {{item.label}}
              </span>
              <span v-else-if="item.type == 'text'">
                <template v-if="item.status != 'fixedState'">
                  {{headerParam[item.prop2]}}
                </template>
                <template v-else-if="headerParam.edit">
                  <el-input v-model="headerParam[item.prop2]"></el-input>
                </template>
                <template v-else>
                  {{headerParam[item.prop2]}}
                </template>
              </span>
              <span v-else-if="item.type == 'date'">
                <template v-if="item.status != 'fixedState'">
                  {{headerParam[item.prop2]}}
                </template>
                <template v-else-if="headerParam.edit">
                  <el-input @change="verificationDate" v-model="headerParam[item.prop2]"></el-input>
                </template>
                <template v-else>
                  {{headerParam[item.prop2] != null ? formatterDate(headerParam[item.prop2]) : ''}}
                </template>
              </span>
              <span v-else-if="item.type == 'checkbox'">
                <el-radio-group v-if="item.status != 'fixedState'" :disabled="true" v-model="headerParam[item.prop2]">
                  <template v-for="(item,index) of item.option">
                    <el-radio style="margin:2px;" :label="item.value" :key="index">{{item.name}}</el-radio>
                  </template>
                </el-radio-group>
                <el-radio-group v-else :disabled="!headerParam.edit" v-model="headerParam[item.prop2]">
                  <template v-for="(item,index) of item.option">
                    <el-radio style="margin:2px;" :label="item.value" :key="index">{{item.name}}</el-radio>
                  </template>
                </el-radio-group>
              </span>
            </template>
            <!-- 不是首次进入 -->
            <template v-if="tableData.length > 0">
              <span v-if="(!item.type) || item.type == null || item.type == ''">
                {{item.label}}
              </span>
              <span v-else-if="item.type == 'text'">
                <template v-if="item.status == 'fixedState'">
                  {{headerParam[item.prop]}}
                </template>
                <template v-else-if="headerParam.edit">
                  <el-input v-model="headerParam[item.prop]"></el-input>
                </template>
                <template v-else>
                  {{headerParam[item.prop]}}
                </template>
              </span>
              <span v-else-if="item.type == 'date'">
                <template v-if="item.status == 'fixedState'">
                  {{headerParam[item.prop]}}
                </template>
                <template v-if="headerParam.edit">
                  <el-input @change="verificationDate" v-model="headerParam[item.prop]"></el-input>
                </template>
                <template v-else>
                  {{headerParam[item.prop] != null ? formatterDate(headerParam[item.prop]) : ''}}
                </template>
              </span>
              <span v-else-if="item.type == 'checkbox'">
                <el-radio-group v-if="item.status == 'fixedState'" :disabled="true" v-model="headerParam[item.prop]">
                  <template v-for="(item,index) of item.option">
                    <el-radio style="margin:2px;" :label="item.value" :key="index">{{item.name}}</el-radio>
                  </template>
                </el-radio-group>
                <el-radio-group v-else :disabled="!headerParam.edit" v-model="headerParam[item.prop]">
                  <template v-for="(item,index) of item.option">
                    <el-radio style="margin:2px;" :label="item.value" :key="index">{{item.name}}</el-radio>
                  </template>
                </el-radio-group>
              </span>
            </template>
          </span>
          <!-- 11111 -->
          <span v-else-if="(!item.type) || item.type == null || item.type == ''">
            {{item.label}}
          </span>
          <span v-else-if="item.type == 'text'">
            <template v-if="headerParam.edit">
              <el-input v-model="headerParam[item.prop]"></el-input>
            </template>
            <template v-else>
              {{headerParam[item.prop]}}
            </template>
          </span>
          <span v-else-if="item.type == 'date'">
            <template v-if="headerParam.edit">
              <el-input @change="verificationDate" v-model="headerParam[item.prop]"></el-input>
            </template>
            <template v-else>
              {{headerParam[item.prop] != null ? formatterDate(headerParam[item.prop]) : ''}}
            </template>
          </span>
          <!-- headerParam[item.prop] -->
          <span v-else-if="item.type == 'checkbox'">
            <el-radio-group :disabled="!headerParam.edit" v-model="headerParam[item.prop]">
              <template v-for="(item,index) of item.option">
                <el-radio style="margin:2px;" :label="item.value" :key="index">{{item.name}}</el-radio>
              </template>
            </el-radio-group>
          </span>
          <span v-else>
            111
          </span>
        </template>
        <!-- 结束 -->
			</el-table-column>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns';
export default {
  name: 'NavTable',
  inject: ['orgAdd', 'reportTab'],
  props: {
    // 表头数据
    columns: {
      type: Array,
      default: () => {
        return [];
      }
    },
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
    tableData: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  watch: {
    columns(newV, oldV){
      if(JSON.stringify(newV) == JSON.stringify(oldV)){
        return
      }
      this.list = newV
    },
    // headerParam(newV, oldV){
    //   console.log(newV)
    // }
  },
  data() {
    return {
      list: [],
    }
  },
  mounted() {
    this.list = this.columns
    // this.list = this.recursionList(this.columns)
  },
  methods: {
    formatterDate(dataString){
      return format(new Date(dataString), 'yyyy-MM-dd')
    },
		renderContent(h, { column, $index }){
      // console.log(column)
      return column.label
    },
    // 日期验证
    verificationDate(val){
      // console.log(val)
      if(!(isNaN(val)&&!isNaN(Date.parse(val)))){
        this.reportTab.verificationDateFlag = false
        this.$message({
          type: 'warning',
          message: '请输入正确的日期'
        })
      }
    },
    format(row, columns){
      let data = ''
      if(row.summaryfunc){
        data = this.orgAdd[row.summaryfunc](row, columns)
      }else{
        data = this.orgAdd[columns.formatter](row, columns)
      }
      return data
    }
    // 
  },
};
</script>

<style lang="stylus" scoped>
.checkboxArr
  background #f5f7fa
  border-radius 5px
  padding 5px 0
/deep/ .el-table 
  th
    text-align center
  td
    text-align center
</style>
