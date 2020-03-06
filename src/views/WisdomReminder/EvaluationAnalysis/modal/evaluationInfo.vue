<template>
    <div>
        <el-dialog :title="title" :visible.sync="visible">
            <div class="detail-wrapper">
                <el-scrollbar style="height: 100%;">
                    <div class="detail-info">
                        <div class="user-info mb-ten">
                            <span>{{detailInfo.user_name ? detailInfo.user_name : ''}}</span>
                            <span>{{detailInfo.police_code ? detailInfo.police_code : ''}}</span>
                            <span>{{detailInfo.department ? detailInfo.department : ''}}</span>
                        </div>
                        <div class="mb-ten">
                            <span>日志填写时间：</span>
                            <span>{{detailInfo.note_date | formatTime}}</span>
                        </div>
                        <div class="mb-ten">
                            <span>日志内容：</span>
                            <span></span>
                        </div>
                        <div class="mb-ten">
                            <span>评价时间：</span>
                            <span>{{detailInfo.remark_time | formatTime}}</span>
                        </div>
                        <div class="mb-ten">
                            <span>评价人：</span>
                            <span></span>
                        </div>
                        <div class="mb-ten">
                            <span>评价情况：</span>
                            <span>{{detailInfo.note_score ? detailInfo.note_score : ''}}</span>
                        </div>
                        <div class="mb-ten">
                            <span>评价备注：</span>
                            <span>已阅/无</span>
                        </div>
                        <div class="mb-ten">
                            <span>预警时间：</span>
                            <span>{{detailInfo.warn_time | formatTime}}</span>
                        </div>
                        <div class="mb-ten">
                            <span>预警原因：</span>
                            <span>{{detailInfo.warn_reason}}</span>
                        </div>
                        <div class="advice">
                            <p>本人反馈：</p>
                            <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 3, maxRows: 6}"
                                    placeholder="请输入内容"
                                    v-model="detailInfo.content"
                            >
                            </el-input>
                        </div>
                        <div class="advice">
                            <p>层级领导反馈：</p>
                            <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 3, maxRows: 6}"
                                    placeholder="请输入内容"
                                    v-model="detailInfo.leader_id"
                            >
                            </el-input>
                        </div>
                        <div class="advice">
                            <p>职能部门反馈：</p>
                            <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 3, maxRows: 6}"
                                    placeholder="请输入内容"
                                    v-model="detailInfo.comment"
                            >
                            </el-input>
                        </div>
                    </div>
                </el-scrollbar>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getAuditWarningById } from '@/api/wisdom-reminder/evaluation-analysis.js'
import { format } from 'date-fns';

export default {
    props: {
        title: {
            type: String,
            default: '评价预警'
        }
    },
    filters: {
        formatTime(val, type = 'yyyy-MM-dd HH:mm:ss') {
            if(val) {
                return format(val, type);
            }
        }
    },
    data() {
        return {
            visible: false,
            detailInfo: {}
        }
    },
    methods: {
        open() {
            this.visible = true;
            this.getDetailInfo();
        },
        getDetailInfo() {
            const params = {auditWarnId: '1014'}
            getAuditWarningById(params).then((res) => {
                if(res.success) {
                    this.detailInfo = res.data;
                }
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
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
.dic-select
    width: 100%;

.mb-ten
    margin-bottom: 10px;

/deep/ .el-textarea {
    width: 100%;
    height: auto;

    .el-textarea__inner {
        margin-left: 0;
    }
}

/deep/ .el-scrollbar__wrap
    overflow-x: hidden;
</style>