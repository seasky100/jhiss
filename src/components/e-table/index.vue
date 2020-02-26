<template>
  <div class="e-table flex-column">
    <el-row class="flex-1">
      <el-col class="table-outer" :span="24">
        <el-table
          ref="elTable"
          class="public-sp-el-table table-self"
          :style="{ marginTop: optionsComputed.marginTop }"
          size="middle"
          row-key="id"
          :expand-row-keys="expands"
          @row-click="rowClick"
          :border="false"
          :tree-props="treeProps"
          :max-height="optionsComputed.maxHeight"
          :height="optionsComputed.height"
          :data="tableListCopy"
          :stripe="optionsComputed.stripe"
          @selection-change="selectionChangeHandle"
          @select="select"
          @current-change="currentChangeHandle"
        >
          <el-table-column v-if="optionsComputed.expand" type="expand">
            <template slot-scope="props">
              <slot name="configForm" :rowData="props.row"></slot>
            </template>
          </el-table-column>
          <el-table-column
            v-if="optionsComputed.mutiSelect"
            type="selection"
          ></el-table-column>
          <el-table-column
            type="index"
            align="center"
            width="60"
            label="序号"
            v-if="optionsComputed.hasIndex"
          >
            <template slot-scope="scope">
              {{
                scope.$index + 1 + (currentPage - 1) * optionsComputed.pageSize
              }}
            </template>
          </el-table-column>

          <template v-for="(column, index) in columnsCopy">
            <el-table-column
              :prop="column.prop"
              :key="column.label"
              :label="column.label"
              :align="column.align"
              :min-width="column.width"
              :fixed="column.fixed ? column.fixed : false"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <template v-if="!column.render && !column.method">
                  <template v-if="column.formatter">
                    <span
                      v-html="
                        column.formatter(
                          scope.row,
                          column,
                          scope.row[column.prop]
                        )
                      "
                    ></span>
                  </template>

                  <template v-else-if="column.type === 'date'">
                    {{ formatTime(column, scope.row) }}
                  </template>

                  <template v-else-if="column.type === 'dic'">
                    {{ formatDic(column, scope.row) }}
                  </template>

                  <template v-else-if="column.type === 'org'">
                    {{ formatOrg(column, scope.row) }}
                  </template>

                  <template v-else>
                    <span>{{ scope.row[column.prop] }}</span>
                  </template>
                </template>

                <template v-else-if="column.render && column.type === 'switch'">
                  <expand-dom
                    :column="column"
                    :row="scope.row"
                    :render="column.render"
                    :index="index"
                  ></expand-dom>
                  <el-switch
                    v-model="scope.row[column.prop]"
                    active-color="#0e90fe"
                    inactive-color="#dcdfe6"
                    :active-value="column.statusObj.activeValue"
                    :inactive-value="column.statusObj.inactiveValue"
                    @change="column.method(scope.row)"
                  ></el-switch>
                </template>

                <template v-else-if="column.method">
                  <el-link
                    :underline="false"
                    @click.stop.native.prevent="column.method(scope.row)"
                    >{{ scope.row[column.prop] }}</el-link
                  >
                </template>

                <template v-else>
                  <expand-dom
                    :column="column"
                    :row="scope.row"
                    :render="column.render"
                    :index="index"
                  ></expand-dom>
                </template>
              </template>
            </el-table-column>
          </template>

          <template v-if="operates">
            <el-table-column
              label="操作"
              align="center"
              :width="operates.width"
              :fixed="operates.fixed"
              v-if="operates.list.filter((_x) => _x.show === true).length > 0"
            >
              <template slot-scope="scope">
                <span class="operate-group">
                  <template v-for="(btn, key) in operates.list">
                    <span
                      class="item"
                      v-if="btn.showCallback && btn.showCallback(scope.row)"
                      :key="btn.id"
                    >
                      <el-link
                        :type="btn.type || 'primary'"
                        class="public-sp-el-link"
                        :disabled="
                          typeof btn.disabled === 'undefined'
                            ? false
                            : btn.disabled
                        "
                        :underline="
                          typeof btn.underline === 'undefined'
                            ? false
                            : btn.underline
                        "
                        @click.stop.native.prevent="btn.method(key, scope.row)"
                      >
                        <i
                          class="iconfont"
                          v-if="btn.icon"
                          v-html="btn.icon"
                        ></i>
                        <!-- <EImg
                          class="iconfont"
                          v-else-if="btn"
                          size="14px"
                          :icon="btn"
                        /> -->
                        {{ btn.label }}
                      </el-link>
                    </span>
                  </template>
                </span>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </el-col>
    </el-row>
    <el-row v-if="optionsComputed.hasPagination">
      <el-col :span="24" class="pagination-col">
        <e-pagination
          class="pagination"
          :total="optionsComputed.total"
          :pageSize="optionsComputed.pageSize"
          :current="currentPage"
          @currentPageClick="currentPageClickHandle"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import EImg from '@/components/e-img/index';
// import EPagination from '../e-pagination/index';
import { format } from 'date-fns';
/**
 * @param {Array} tableList - 表格数据.
 * @param {Object} columns - 表格列数据.
 * @param {Object} columns.formatter:method - 格式化:文字链接
 * @param {Object} columns.type date时间转换 dic字典转换(转换类型label) org机构转换名字
 * @param {Object} operates - 表格操作按钮配置.
 * @param {Object} operates.fixed - 表格整体配置(`true`,`left`,`right`).
 * @param {Object} options - 表格整体配置.
 * @param {Boolean} options.hasIndex:expand:mutiSelect - 是否包含序号:展开内容:选择框
 * @param {Boolean} options.stripe - 是否为斑马纹.
 * @param {Boolean} options.highlightCurrentRow - 是否开启高亮当前行.
 * @param {Boolean} options marginTop:maxHeight:height - 表格距离上距离的高度:最大高度:高度.
 * @param {Boolean} options hasPagination:total:pageSize - 表格是否有分页:数据条数总和:每页条数
 * @author ddcome.
 * @description 云监管平台的表格组件.
 */
export default {
  props: {
    // 表格数据
    tableList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    selectable: {
      type: Function
    },
    columns: {
      type: Array,
      default: () => {
        return [];
      }
    },
    operates: {
      type: Object,
      default: () => {
        return {
          minWidth: '0px',
          fixed: null,
          list: []
        };
      }
    },
    options: {
      type: Object,
      default: () => {
        return {};
      }
    },
    treeProps: {
      type: Object,
      default() {
        return { children: 'children' };
      }
    }
  },
  computed: {
    optionsComputed: {
      get: function() {
        let temp = Object.assign({}, this.optionsDefault);
        for (let index in this.options) {
          temp[index] = this.options[index];
        }
        return temp;
      },
      set: function(obj) {
        this.optionsDefault = Object.assign(this.optionsDefault, obj);
      }
    }
  },
  //组件
  components: {
    expandDom: {
      functional: false,
      props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
          type: Object,
          default: null
        }
      },
      render: function(h) {
        return this.render(h, this.row);
      }
    }
  },
  data() {
    return {
      expands: [],
      tableListCopy: this.tableList,
      columnsCopy: this.columns,
      // 当前页码
      currentPage: 1,
      multipleSelection: [], // 多行选中
      optionsDefault: {
        // 数据总数
        total: 0,
        // 每页数据数
        pageSize: 10,
        hasIndex: true,
        stripe: true,
        highlightCurrentRow: true,
        hasPagination: true,
        maxHeight: '700px',
        height: '100%',
        marginTop: '0px',
        showHeader: true
      }
    };
  },
  methods: {
    //时间格式化
    formatTime(column, row) {
      return format(
        row[column.prop],
        column.dateFormat || 'yyyy-MM-dd HH:mm:ss'
      );
    },
    //字典格式化
    // formatDic(column, row) {
    //   const dicLabel = this.$store.getters.getLabelDicByTypeAndValue(
    //     column.label,
    //     row[column.prop]
    //   );
    //   return dicLabel;
    // },
    //机构code转name
    // formatOrg(column, row) {
    //   const orgName = this.$store.getters.getOrgNameByCode(row[column.prop]);
    //   return orgName;
    // },
    setCurrentPage(val) {
      this.currentPage = val;
    },
    setTableList(data) {
      this.tableListCopy = data;
    },
    setColumns(data) {
      this.columnsCopy = data;
    },
    setTotal(val) {
      this.optionsComputed = {
        total: val
      };
    },
    setPageSize(val) {
      this.optionsComputed = {
        pageSize: val
      };
    },
    setPageInfo(current, size, total, tableList) {
      this.setCurrentPage(current);
      this.setPageSize(size);
      this.setTotal(total);
      this.setTableList(tableList);
    },
    setPageInfoWithoutPagination(tableList) {
      this.setTableList(tableList);
    },
    select(selected, row) {
      this.$emit('select', selected, row);
    },
    selectionChangeHandle(val) {
      this.multipleSelection = val;
      this.$emit('selectionChangeHandle', val);
    },
    //取消勾选
    toggleRowSelection(row, state) {
      if (row) {
        this.$refs.elTable.toggleRowSelection(row, state);
      } else {
        this.$refs.elTable.clearSelection();
      }
    },
    selectionChangeSingleSelect(val) {
      if (val.length > 1) {
        this.$refs.elTable.clearSelection();
        this.$refs.elTable.toggleRowSelection(val.pop());
      }
    },
    showActionTableDialog() {
      this.$emit('handelAction');
    },
    currentPageClickHandle(val) {
      const $this = this;
      $this.setCurrentPage(val);
      $this.$emit('afterCurrentPageClick', val, function() {});
    },
    currentChangeHandle() {
      this.$emit('currentChange');
    },
    setSelectedData(val) {
      this.$refs.elTable.clearSelection();
      if (val && val.length > 0) {
        for (let i in val) {
          this.$refs.elTable.toggleRowSelection(val[i], true);
        }
      }
    },
    setAllSelection() {
      this.$refs.elTable.toggleAllSelection();
    },
    rowClick(row, event, column) {
      if (this.expands.indexOf(row.id) < 0) {
        this.expands.push(row.id);
      } else {
        let index = this.expands.indexOf(row.id);
        if (index > -1) {
          this.expands.splice(index, 1);
        }
      }
    }
  },
  mounted() {
    this.$emit('afterReady');
  }
};
</script>
<!--
<style lang="scss" scoped>
.e-table {
  width: 100%;
  .el-row {
    .pagination-col {
      margin-top: 20px;
      margin-bottom: 20px;

      .pagination {
        text-align: center;
      }
    }

    .operate-group {
      .item {
        padding: 0 3px;
      }
    }

    .table-outer {
      height: 100%;
    }
  }
}

/deep/ .el-table {
  border-top: 1px solid rgba(241, 241, 241, 1);
  border-bottom: 1px solid rgba(241, 241, 241, 1);

  th {
    background-color: #f6fafd !important;
    height: 53px !important;
    font-size: 14px !important;
    font-family: Microsoft YaHei !important;
    font-weight: 400 !important;
    color: rgba(51, 51, 51, 1) !important;
  }

  .el-table__row--striped td {
    background-color: rgba(247, 250, 255, 1) !important;
  }
}

/deep/ .el-table__header-wrapper {
  /deep/ .el-table__header {
    /deep/ .el-checkbox {
      display: none;
    }
  }
}
</style>-->
