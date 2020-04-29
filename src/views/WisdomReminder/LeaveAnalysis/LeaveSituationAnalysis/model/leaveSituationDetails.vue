<template>
    <div>
        <el-dialog :title="title" :visible.sync="visible">
            <div class="detail-wrapper">
                <el-scrollbar style="height: 100%;">
                    <div class="detail-info">
                        <div class="user-info mb-ten">
                            <span>{{detailInfo.userName ? detailInfo.userName : ''}}</span>
                            <span>{{detailInfo.policeCode ? detailInfo.policeCode : ''}}</span>
                            <span>{{detailInfo.department ? detailInfo.department : ''}}</span>
                        </div>
                        <div class="mb-ten">
                            <span>请假时间：</span>
                            <span>{{detailInfo.leaveTime | formatTime}}</span>
                        </div>
                        <div class="mb-ten">
                            <span>请假开始时间：</span>
                            <span>{{detailInfo.startTime | formatTime}}</span>
                        </div>
                        <div class="mb-ten">
                            <span>请假结束时间：</span>
                            <span>{{detailInfo.endTime | formatTime}}</span>
                        </div>
                        <div class="mb-ten">
                            <span>请假事由：</span>
                            <span></span>
                        </div>
                        <div class="mb-ten">
                            <span>请假时长：</span>
                            <span></span>
                        </div>
                        <div class="mb-ten">
                            <span>审批人：</span>
                            <span>{{detailInfo.approvalUserName ? detailInfo.approvalUserName : ''}}</span>
                        </div>
                        <div class="mb-ten">
                            <span>审批时间：</span>
                            <span>{{detailInfo.applyTime | formatTime}}</span>
                        </div>
                        <div class="mb-ten">
                            <span>审批意见：</span>
                            <span></span>
                        </div>
                        <!-- <div class="mb-ten">
                            <span>预警时间：</span>
                            <span></span>
                        </div>
                        <div class="mb-ten">
                            <span>预警原因：</span>
                            <span>{{detailInfo.exceptionReason ? detailInfo.exceptionReason : ''}}</span>
                        </div>
                        <div class="mb-ten">
                            <span>预警内容：</span>
                            <span></span>
                        </div>
                        <div class="advice">
                            <p>本人反馈：</p>
                            <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 3, maxRows: 6}"
                                    placeholder="请输入内容"
                                    v-model="detailInfo.userCreate"
                            >
                            </el-input>
                        </div>
                        <div class="advice">
                            <p>层级领导反馈：</p>
                            <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 3, maxRows: 6}"
                                    placeholder="请输入内容"
                            >
                            </el-input>
                        </div>
                        <div class="advice">
                            <p>职能部门反馈：</p>
                            <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 3, maxRows: 6}"
                                    placeholder="请输入内容"
                            >
                            </el-input>
                        </div> -->
                    </div>
                </el-scrollbar>
            </div>
        </el-dialog>
    </div>
</template>

<script>
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
        open(option) {
            this.visible = true;
            console.log(option)
            this.detailInfo = option
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