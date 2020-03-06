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
                        <div>报销读取协作提效内容</div>
                        <div>钉钉出差期间打卡位置</div>
                        <div class="mb-ten">
                            <span>预警时间：</span>
                            <span>2019年12月4日 12:14:29</span>
                        </div>
                        <div class="mb-ten">
                            <span>预警原因：</span>
                            <span>出差地点与报销地点城市不符</span>
                        </div>
                        <div class="advice">
                            <p>本人反馈：</p>
                            <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 3, maxRows: 6}"
                                    placeholder="请输入内容"
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