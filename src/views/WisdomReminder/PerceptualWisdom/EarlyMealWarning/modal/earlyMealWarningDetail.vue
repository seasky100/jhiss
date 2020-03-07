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
                            <span>刷卡时间：</span>
                            <span>{{detailInfo.record_time | formatTime}}</span>
                        </div>
                        <div class="mb-ten">
                            <span>刷卡地点：</span>
                            <span>{{detailInfo.record_place ? detailInfo.record_place : ''}}</span>
                        </div>
                        <div class="mb-ten">
                            <span>刷卡金额：</span>
                            <span></span>
                        </div>
                        <div class="mb-ten">
                            <span>卡号：</span>
                            <span></span>
                        </div>
                        <div class="mb-ten">
                            <span>预警时间：</span>
                            <span>{{detailInfo.warn_time | formatTime}}</span>
                        </div>
                        <div class="mb-ten">
                            <span>预警内容：</span>
                            <span></span>
                        </div>
                        <div class="advice">
                            <p>反馈时间：.2019年12月2日 16:00:52</p>
                            <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 3, maxRows: 6}"
                                    placeholder="请输入内容"
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