<template>
    <div>
        <el-dialog :title="title" :visible.sync="visible">
            <div class="detail-wrapper">
                <el-scrollbar style="height: 100%;">
                    <div class="detail-info">
                        <div class="user-info mb-ten">
                            <span>张三</span>
                            <span>001</span>
                            <span>机关纪委</span>
                        </div>
                        <div class="mb-ten">
                            <span>刷卡时间：</span>
                            <span>2019年12月2日 16:00:52</span>
                        </div>
                        <div class="mb-ten">
                            <span>刷卡地点：</span>
                            <span>1食堂刷卡</span>
                        </div>
                        <div class="mb-ten">
                            <span>刷卡金额：</span>
                            <span>12元</span>
                        </div>
                        <div class="mb-ten">
                            <span>卡号：</span>
                            <span>scsd02023423</span>
                        </div>
                        <div class="mb-ten">
                            <span>预警时间：</span>
                            <span>2019年12月4日 12:31:16</span>
                        </div>
                        <div class="mb-ten">
                            <span>预警内容：</span>
                            <span>早于规定时间就餐</span>
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
export default {
    props: {
        title: {
            type: String,
            default: '详情'
        }
    },
    data() {
        return {
            visible: false
        }
    },
    methods: {
        open() {
            this.visible = true;
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