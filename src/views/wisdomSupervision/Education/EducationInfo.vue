<template>
  <div>
    <el-dialog :title="title" :visible.sync="visible" width="700px">
      <div class="detail-wrapper">
        <el-scrollbar style="height: 100%;">
          <div class="detail-info">
            <div class="report-content">
              <!-- <div class="tip">
                本表须由党员干部本人亲笔填写11111111111111
              </div> -->
              <div class="search-wrap" style="height:460px;">
                <e-table style="padding:0;"
                  ref="educationTableRef"
                  :tableList="tableList"
                  :options="options"
                  :columns="columns"
                  @afterCurrentPageClick="afterCurrentPageClickHandle"
                />
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { format } from 'date-fns';
import { saveAnnualReport, updateReportApproval } from '@/api/report.js';
import { findExposureStudyRecord } from "@/api/warn.js";
import getFlowNode from '../../../mixin/getFlowNode.js';
import { mapGetters } from 'vuex';

export default {
  props: {
    title: {
      type: String,
      default: '新增年报'
    },
    dialogType: {
      type: Number,
      default:() => {
        return 1
      }
    }
  },
  mixins: [getFlowNode],
  data() {
    return {
      userObj: null,
      visible: false,
      tableList:[],
			options: {
        // 每页数据数
        pageSize: 10,
        hasIndex: false,
        // 当前页码
        currentPage: 1,
        loading: true,
        maxHeight: null,
        height:'380'
			},
			columns: [
        {
          prop: 'title',
          label: '标题',
          align: 'left'
        },
        {
          prop: 'content',
          label: '内容',
          align: 'left'
        }
      ],
    }
  },
  computed: {
    ...mapGetters([
      'orgData'
    ])
  },
  mounted() {
  },
  methods: {
    open(option = null) {
      this.userObj = option
      this.visible = true
      this.query()
    },
    // 分页点击事件
    afterCurrentPageClickHandle(val, next) {
      this.query(val);
      // console.log(val)
      next();
    },
    // 查询列表
    query(nCurrent = 1) {
      // console.log(nCurrent)
      const _this = this;
      const params = {
        userId: _this.userObj.id,
        status: 2, // 学习情况(1:已学习 2:未学习)
        nCurrent: nCurrent,
        nSize: 10
      }
      findExposureStudyRecord(params).then(res => {
        console.log(res) 
        this.$refs.educationTableRef.setPageInfo(
          nCurrent,
          res.data.size,
          res.data.total,
          res.data.records
        );
      });
    },
  }
}
</script>
<style lang="stylus" scoped>
.report-container
  .report-title
    padding: 8px 16px;
    span
      font-size: 16px;
      color: #121518;
      font-weight: 700;
      height 26px;
      padding-left: 10px;
      position: relative
      &:before
        position: absolute;
        top: 0;
        left: 0;
        content: ' ';
        width: 5px;
        height: 100%;
        border-radius: 5px;
        background: #005BFF;
.report-content
  width: 600px;
  box-sizing: border-box;
  .tip
    padding: 10px;
    color: rgb(230, 160, 97);
    background: rgb(249, 242, 236);
    user-select: text;
    margin-bottom: 25px;
/deep/ .el-select
  width: 100%;
/deep/ .el-form--label-top .el-form-item__label
  padding: 0;
.detail-wrapper
  height: 55vh;
  .detail-info
    padding: 5px 20px;
    color: #606266;
    .user-info
      span
        margin-right: 10px;
    .advice
      p
        margin-bottom: 10px;
  .line
    text-align: center;
.dic-select
  width: 100%;
.mb-ten
  margin-bottom: 10px;
/deep/ .el-textarea{
  width: 100%;
  height: auto;
  .el-textarea__inner{
    margin-left: 0;
  }
}
/deep/ .el-scrollbar__wrap
  overflow-x: hidden;
.optionsCon >>> .el-form-item__content
  margin-left auto !important
</style>
