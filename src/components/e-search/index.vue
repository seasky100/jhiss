<template>
  <el-form :model="searchData" :rules="rules" ref="ruleForm" :inline="inlineFlag" :label-position="label_position" class="demo-ruleForm" :size="size">
    <el-form-item :label="item.label" :prop="item.prop" v-for="(item, index) in searchForm" :key="index">
      <!-- 输入框 -->
      <el-input :disabled="disabled"
        v-if="item.type === 'input'"
        clearable
        v-model="searchData[item.prop]"
        :placeholder="item.placeholder"
        :style="{width: item.width}" />
      <!-- 文本域 -->
      <el-input :disabled="disabled"
        v-else-if="item.type === 'textarea'"
        clearable
        type="textarea"
        v-model="searchData[item.prop]"
        :placeholder="item.placeholder"
        :style="{width: item.width}" />
      <!-- 下拉框 -->
      <el-select :disabled="disabled"
        v-else-if="item.type==='select'"
        clearable
        :placeholder="item.placeholder"
        v-model="searchData[item.prop]"
        :style="{width: item.width}"
        @change="item.change(searchData[item.prop])">
          <el-option
            v-for="option in item.options"
            :label="option.label"
            :value="option.value"
            :key="option.value">
          </el-option>
      </el-select>
      <!-- 单选 -->
      <el-radio-group :disabled="disabled"
        v-else-if="item.type==='radio'"
        v-model="searchData[item.prop]">
          <el-radio
            v-for="radio in item.radios"
            :label="radio.value"
            :key="radio.value">{{radio.label}}</el-radio>
      </el-radio-group>
      <!-- 复选框 -->
      <el-checkbox-group :disabled="disabled"
        v-else-if="item.type==='checkbox'"
        :style="{width: item.width}"
        v-model="searchData[item.prop]" >
          <el-checkbox
            v-for="checkbox in item.checkboxs"
            :label="checkbox.value"
            :key="checkbox.value">{{checkbox.label}}</el-checkbox>
      </el-checkbox-group>
      <!-- 日期 -->
      <el-date-picker :disabled="disabled"
        v-else-if="item.type==='date'"
        :placeholder="item.placeholder"
        :value-format="item.valueFormat || 'yyyy-MM-dd'"
        v-model="searchData[item.prop]">
      </el-date-picker>
      <!-- 日期范围 -->
      <!-- <el-date-picker
        v-else-if="item.type==='daterange'"
        v-model="searchData[item.prop]"
        type="daterange"
        range-separator="至"
        :value-format="item.valueFormat || 'yyyy-MM-dd'"
        :start-placeholder="item.startPlaceHolder || '开始日期'"
        :end-placeholder="item.endPlaceHolder || '结束日期'">
      </el-date-picker> -->

      <template v-else-if="item.type === 'daterange'">
        <el-date-picker
          style="width: 150px"
          v-model="searchData[item.options[0].prop]"
          type="date"
          :format="item.options[0].format || 'yyyy-MM-dd'"
          :value-format="item.options[0].valueformat || 'yyyy-MM-dd'"
          :placeholder="item.options[0].placeholder"
          :picker-options="startTime(searchData[item.options[1].prop])"
        >
        </el-date-picker>
        <label class="date-range-label" style="padding: 0 5px;">
          至
        </label>
        <el-date-picker
          style="width: 150px"
          v-model="searchData[item.options[1].prop]"
          type="date"
          :format="item.options[1].format || 'yyyy-MM-dd'"
          :value-format="item.options[1].valueformat || 'yyyy-MM-dd'"
          :placeholder="item.options[1].placeholder"
          :picker-options="endTime(searchData[item.options[0].prop])"
        >
        </el-date-picker>
      </template>
      <!-- 开关 -->
      <el-switch :disabled="disabled"
        v-else-if="item.type==='switch'"
        v-model="searchData[item.prop]" ></el-switch>
      <!-- 选择附件 :on-change="handleChange" -->
      <el-upload v-else-if="item.type==='file'"
        v-show="!disabled"
        class="upload-demo" :limit=1
        :http-request="uploadSectionFile"
        action="https://jsonplaceholder.typicode.com/posts/"
        :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
      </el-upload>
      <!-- 审批人 -->
      <template v-else-if="item.type==='select_tree'">
        <el-input readonly @click.native="changelag"
          size="mini" :disabled="disabled"
          style="float:left;width:50%;"
          :placeholder="item.options[0].placeholder"
          v-model="searchData[item.options[0].prop]">
        </el-input>
        <el-select size="mini" v-model="searchData[item.options[1].prop]" :disabled="disabled"
          :placeholder="item.options[1].placeholder" style="float:left;width:50%;">
          <el-option
            v-for="item in person_arr"
            :key="item.id"
            :label="item.realName"
            :value="item.id">
          </el-option>
        </el-select>
        <!-- 组织机构选择器 -->
        <div v-show="org_flag" class="selectDiv">
          <el-input size="mini"
            placeholder="输入关键字进行过滤"
            v-model="filterText">
          </el-input>
          <el-tree
            class="filter-tree el-scrollbar el-scrollbar__wrap"
            @node-click="nodeClick"
            :data="dataTree"
            :props="defaultProps"
            :filter-node-method="filterNode"
            default-expand-all
            ref="tree">
          </el-tree>
        </div>

      </template>
    </el-form-item>
    <el-form-item v-if="!disabled">
      <el-button type="primary" @click="submitForm">查询</el-button>
      <el-button @click="resetForm">清空</el-button>
      <el-button v-if="btnsConfig.showAdd" @click="addClickHandle">新增</el-button>


      <el-button v-if="addForm != ''" @click="addFormClick">新增</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'small'
    },
    searchData: {
      type: Object
    },
    searchForm: {
      type: Array
    },
    rules: {
      type: Object
    },
    btnsConfig: {
      type: Object,
      default: () => {
        return {
          showAdd: false
        }
      }
    },
    inlineFlag: {
      type: Boolean,
      default: true
    },
    label_position: {
      type: String,
      default: 'left'
    },
    addForm: {
      type: String,
      default: ''
    },
    disabled:{
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      endTime: {},
      startTime: {},
      dataTree:[],
      person_arr:[],
      defaultProps: {
        children: 'childrens',
        label: 'name'
      },
      filterText:'',
      org_flag:false,
      fileList:[],
			uploadFile:null,
			uploadFileList:[],
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  created() {
    this.startTime = function(value) {
      return {
        disabledDate(time) {
          return time.getTime() > new Date(value).getTime();
        }
      };
    };
    this.endTime = function(value) {
      return {
        disabledDate(time) {
          return time.getTime() < new Date(value).getTime();
        }
      };
    };
  },
  mounted(){
    // this.getOrgData()
  },
  methods: {
    // 提交
    submitForm() {
      if (this.rules) {
        return this.$refs["ruleForm"].validate(valid => {
          if (!valid) return false;
          this.$emit("handleSearch", this.searchData);
        });
      }
      this.$emit("handleSearch", this.searchData);
    },
    // 重置
    resetForm() {
      this.$refs['ruleForm'].resetFields();
      this.searchForm.forEach(item => {
        if(item.type === 'daterange') {
          this.searchData[item.options[0].prop] = '';
          this.searchData[item.options[1].prop] = '';
        }
      })
      this.$emit("handleSearch", this.searchData);
    },
    // 点击新增
    addClickHandle() {
      this.$emit('addClickHandle');
    },

    addFormClick(){
      const _this = this
      this.$router.push({ path: _this.addForm});
    },
    changelag(){
      this.org_flag = !this.org_flag
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    nodeClick(obj){
      console.log(obj)
      // this.org_id = obj
      // this.person_id = ''
      this.org_flag = false
      // this.getPersonData()
    },
    getPersonData(){
        this.$request.get(`/api/uums-server/user/getUserListByOrgId?orgId=`)
        .then(res => {
            console.log(res.data)
            this.person_arr = res.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    getOrgData(){
      this.$request.get(`/api/uums-server/organization/tree`)
      .then(res => {
          // console.log(res.data)
          this.dataTree = res.data
      })
      .catch(error => {
          console.log(error)
      })
    },
    uploadSectionFile (param) {
      const _this = this
      let fileObj = param.file
      const isLt5M = fileObj.size / 1024 / 1024 < 2
      if (!isLt5M) {
        this.$message.error('上传附件大小不能超过 2MB!')
        // this.fileList = []
        return
      }
      if (fileObj.type === 'image/jpeg') {
				debugger
        this.uploadFile = new File([fileObj], new Date().getTime() + '.jpg', {
          type: 'image/jpeg'
        })
        _this.uploadFileList.push(this.uploadFile)
      } else if (fileObj.type === 'image/png') {
        this.uploadFile = new File([fileObj], new Date().getTime() + '.png', {
          type: 'image/png'
        })
        _this.uploadFileList.push(this.uploadFile)
      } else {
        this.$message.error('只能上传jpg/png文件')
        // this.fileList = []
      }
    }, 
  }
}
</script>
<style scoped>
.demo-ruleForm >>> .el-form-item__label{padding:0 !important;}
/*滚动条样式*/
::-webkit-scrollbar { width: 6px; height: 6px; background-color: #666;}
::-webkit-scrollbar-track { border-radius: 10px; background-color: #666;}
::-webkit-scrollbar-thumb { border-radius: 10px; background-color: #222;}
.date_pick{
    width: 100% !important;
}
.selectDiv{
  position: absolute;
  top: 30px;
  width: 100%;
  height:350px;
  margin-bottom:55px;
  z-index:1;
}
.el-scrollbar .el-scrollbar__wrap {overflow-y: hidden;}
.selectDiv .el-tree>.el-tree-node{display:inline-block;}
</style>
