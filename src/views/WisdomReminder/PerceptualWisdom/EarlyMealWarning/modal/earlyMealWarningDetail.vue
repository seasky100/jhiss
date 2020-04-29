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
                            <span>刷卡地点：</span>
                            <span>{{detailInfo.source ? detailInfo.source : ''}}</span>
                        </div>
                        <div class="mb-ten">
                            <span>预警原因：</span>
                            <span>{{detailInfo.warnReason ? detailInfo.warnReason : ''}}</span>
                        </div>

                        <div class="mb-ten">
                            <span>预警时间：</span>
                            <span>{{detailInfo.warnTime | formatTime}}</span>
                        </div>
                        <div class="mb-ten">
                            <span>备注：</span>
                            <span>{{detailInfo.comment ? detailInfo.comment : ''}}</span>
                        </div>
                        <div class="advice">
                            <p>反馈时间：{{detailInfo.gmtCreate | formatTime}}</p>
                            <p>本人反馈：</p>
                            <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 6}" placeholder="请输入内容" v-model="detailInfo.content">
                            </el-input>
                        </div>
                        <div v-if='detailInfo.warnLevel == 2 || detailInfo.warnLevel == 3' class="advice">
                            <p>反馈时间：{{detailInfo.gmtBranch | formatTime}}</p>
                            <p>层级领导反馈：</p>
                            <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 6}" placeholder="请输入内容" v-model="detailInfo.leaderAdvice">
                            </el-input>
                        </div>
                        <div v-if='detailInfo.warnLevel == 3' class="advice">
                            <p>反馈时间：{{detailInfo.gmtLeader | formatTime}}</p>
                            <p>职能部门反馈：</p>
                            <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 6}" placeholder="请输入内容" v-model="detailInfo.branchAdvice">
                            </el-input>
                        </div>
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
            default: '详情'
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
            console.log('77',option)
            this.detailInfo = option
        },
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