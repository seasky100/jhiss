<template>
  <div>
    <el-upload
      class="upload-demo"
      action="alert"
      accept=".jpg,.jpeg,.png,.pdf,.xlsx,.xls,.txt,.docx,.doc"
      :auto-upload="false"
      :show-file-list="false"
      :on-change="handleChange">
        <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // fileList: []
    }
  },
  methods: {
    handleChange(file, fileList) {
      this.$emit('changeHandler', fileList)
    }
  }
}
</script>
