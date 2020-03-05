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
                            <span>请假时间：</span>
                            <span>2019年12月4日 12:33:05</span>
                        </div>
                        <div class="mb-ten">
                            <span>请假开始时间：</span>
                            <span>2019年12月3日</span>
                        </div>
                        <div class="mb-ten">
                            <span>请假结束时间：</span>
                            <span>2019年12月4日 11:44:55</span>
                        </div>
                        <div class="mb-ten">
                            <span>请假事由：</span>
                            <span>看病</span>
                        </div>
                        <div class="mb-ten">
                            <span>请假时长：</span>
                            <span>1天</span>
                        </div>
                        <div class="mb-ten">
                            <span>审批人：</span>
                            <span>张三</span>
                        </div>
                        <div class="mb-ten">
                            <span>审批时间：</span>
                            <span>2019年12月20日 11:45:48</span>
                        </div>
                        <div class="mb-ten">
                            <span>审批意见：</span>
                            <span>同意</span>
                        </div>
                        <div class="mb-ten">
                            <span>预警时间：</span>
                            <span>2019年12月4日 11:55:18</span>
                        </div>
                        <div class="mb-ten">
                            <span>预警原因：</span>
                            <span>请假时间结束后未及时上班</span>
                        </div>
                        <div class="mb-ten">
                            <span>预警内容：</span>
                            <span>2019年12月4日 未打卡</span>
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
// import { format } from 'date-fns';
// import {getFindVacationPage} from "@/api/wisdom-reminder/leave-analysis.js";

export default {
    props: {
        title: {
            type: String,
            default: '评价预警'
        }
    },
    data() {
        return {
            visible: false
        }
    },
    methods: {
        open() {
            // console.log(option);
            this.visible = true;
            // this.getDetailInfo(option)
        },
        // getDetailInfo(option) {
        //     console.log(option);
        //     const params = {
        //         userId: option.userId,
        //         deptId: option.id
        //     };
        //     getFindVacationPage().then(res => {
        //         // console.log(res);
        //         if(res.success) {
        //             this.detailInfo = res.data;
        //         }
        //     })
        // }
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