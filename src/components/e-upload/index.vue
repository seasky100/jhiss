<template>
  <div>
    <el-upload
      :show-file-list="false"
      class="upload-demo"
      action="alert"
      accept=".jpg,.jpeg,.png,.pdf,.xlsx,.xls,.txt,.docx,.doc"
      :auto-upload="false"
      :limit="limit"
      :on-exceed="handleExceed"
      :on-change="handleChange">
        <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>

<script>
export default {
  props: {
    limit: {
      type: Number,
      default:() => {
        return 10
      }
    }
  },
  data() {
    return {
      // fileList: []
    }
  },
  methods: {
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件`);
    },
    handleChange(file, fileList) {
      this.$emit('changeHandler', fileList)
    }
  }
}
</script>
