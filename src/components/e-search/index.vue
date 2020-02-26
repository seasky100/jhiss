<template>
  <el-form :model="searchData" :rules="rules" ref="ruleForm" class="demo-ruleForm" :size="size" inline>
    <el-form-item :label="item.label" :prop="item.prop" v-for="(item, index) in searchForm" :key="index">
      <!-- 输入框 -->
      <el-input
        v-if="item.type === 'input'"
        clearable
        v-model="searchData[item.prop]"
        :placeholder="item.placeholder"
        :style="{width: item.width}" />
      <!-- 下拉框 -->
      <el-select
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
      <el-radio-group
        v-else-if="item.type==='radio'"
        v-model="searchData[item.prop]">
          <el-radio
            v-for="radio in item.radios"
            :label="radio.value"
            :key="radio.value">{{radio.label}}</el-radio>
      </el-radio-group>
      <!-- 复选框 -->
      <el-checkbox-group
        v-else-if="item.type==='checkbox'"
        :style="{width: item.width}"
        v-model="searchData[item.prop]" >
          <el-checkbox
            v-for="checkbox in item.checkboxs"
            :label="checkbox.value"
            :key="checkbox.value">{{checkbox.label}}</el-checkbox>
      </el-checkbox-group>
      <!-- 日期 -->
      <el-date-picker
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
      <el-switch
        v-else-if="item.type==='switch'"
        v-model="searchData[item.prop]" ></el-switch>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">查询</el-button>
      <el-button @click="resetForm">清空</el-button>
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
    }
  },
  data() {
    return {
      endTime: {},
      startTime: {}
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
  methods: {
    submitForm() {
      if (this.rules) {
        return this.$refs["ruleForm"].validate(valid => {
          if (!valid) return false;
          this.$emit("handleSearch", this.searchData);
        });
      }
      this.$emit("handleSearch", this.searchData);
    },
    resetForm() {
      this.$refs['ruleForm'].resetFields();
      this.searchForm.forEach(item => {
        if(item.type === 'daterange') {
          this.searchData[item.options[0].prop] = '';
          this.searchData[item.options[1].prop] = '';
        }
      })
      this.$emit("handleSearch", this.searchData);
    }
  }
}
</script>
