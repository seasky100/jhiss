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
                            <span>刷卡时间：</span>
                            <span>{{detailInfo.recordTime  | formatTime}}</span>
                        </div>
                        <div class="mb-ten">
                            <span>刷卡地点：</span>
                            <span>{{detailInfo.department ? detailInfo.department : ''}}</span>
                        </div>
                        <div class="mb-ten">
                            <span>刷卡金额：</span>
                            <span>{{detailInfo.money ? detailInfo.money : ''}}</span>
                        </div>
                        <div class="mb-ten">
                            <span>卡号：</span>
                            <span>{{detailInfo.cardNumber ? detailInfo.cardNumber : ''}}</span>
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