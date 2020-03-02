<template>
  <el-pagination
    class="sp-pagenation"
    @current-change="handleCurrentChange"
    :current-page="current"
    :page-size="pageSize"
    prev-text="上一页"
    next-text="下一页"
    layout="prev, pager, next, total, jumper"
    :total="total"
    v-if="total >= pageSize"
  >
  </el-pagination>
</template>

<script>
export default {
  props: {
    total: {
      default: 0,
      type: Number
    },
    pageSize: {
      default: 10,
      type: Number
    },
    current: {
      default: 1,
      type: Number
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit('currentPageClick', val);
    }
  }
};
</script>

<style lang="stylus" scoped>
.sp-pagenation {
  /deep/ .btn-prev,
  /deep/ .btn-next {
    border: 1px solid rgba(220, 220, 220, 1) !important;
    background: center center no-repeat rgb(244, 244, 244) !important;
    padding-left: 0;
    padding-right: 0;
    padding: 0 8px;
    border-radius: $radius;
    font-size: 14px;
  }
  /deep/ .btn-prev:hover,
  /deep/ .btn-next:hover {
    color: #0e90fe;
  }
  /deep/ .el-pagination__total {
    margin: 0 10px;
    color: #303133;
    font-size: 14px;
  }
  /deep/ .el-pagination__jump {
    margin: 0;
    color: #303133;
    font-size: 14px;
  }
  /deep/ .el-pager {
    .number {
      border: 1px solid rgba(220, 220, 220, 1);
      border-radius: 4px;
      margin: 0 5px;
    }
    .number:hover {
      border: 1px solid rgba(220, 220, 220, 1);
      color: #0e90fe;
    }
    .active {
      background-color: #0e90fe;
      border: 1px solid rgba(220, 220, 220, 1);
      color: #fff;
      pointer-events: none;
    }
  }
}
</style>
