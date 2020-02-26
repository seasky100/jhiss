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

<!--
<style lang="scss" scoped>
$color1: #0e90fe;
$color2: rgba(243, 243, 243, 1);
$color3: #fff;
$color4: rgb(244, 244, 244);
$color5: rgba(220, 220, 220, 1);
$color6: #303133;
$radius: 4px;
$color-size: 14px;
.sp-pagenation {
  /deep/ .btn-prev,
  /deep/ .btn-next {
    border: 1px solid $color5 !important;
    background: center center no-repeat $color4 !important;
    padding-left: 0;
    padding-right: 0;
    padding: 0 8px;
    border-radius: $radius;
    font-size: $color-size;
  }
  /deep/ .btn-prev:hover,
  /deep/ .btn-next:hover {
    color: $color1;
  }
  /deep/ .el-pagination__total {
    margin: 0 10px;
    color: $color6;
    font-size: $color-size;
  }
  /deep/ .el-pagination__jump {
    margin: 0;
    color: $color6;
    font-size: $color-size;
  }
  /deep/ .el-pager {
    .number {
      border: 1px solid $color5;
      border-radius: $radius;
      margin: 0 5px;
    }
    .number:hover {
      border: 1px solid $color5;
      color: $color1;
    }
    .active {
      background-color: $color1;
      border: 1px solid $color5;
      color: $color3;
      pointer-events: none;
    }
  }
}
</style>-->
