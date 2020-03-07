<template>
    <div>
        <el-dialog :title="title" :visible.sync="visible" fullscreen="true">
            <el-scrollbar style="height: 100%;">
                <div class="content">
                    <div class="search-wrap">
                        <el-row class="detail-box">
                            <el-col :span="2">图片</el-col>
                            <el-col :span="22">
                                <div class="mb-ten">王剑</div>
                                <div>
                                    <span>性别：</span>
                                    <span class="text-message mr-tweFive">男</span>
                                    <span>民族：</span>
                                    <span class="text-message mr-tweFive">汉族</span>
                                    <span>年龄：</span>
                                    <span class="text-message mr-tweFive">52</span>
                                    <span>生日：</span>
                                    <span class="text-message mr-tweFive">1968-05</span>
                                    <span>籍贯：</span>
                                    <span class="text-message mr-tweFive">浙江省永康市</span>
                                    <span>手机号：</span>
                                    <span class="text-message mr-tweFive">13505792858</span>
                                    <span>手机串号：</span>
                                    <span class="text-message mr-tweFive">865452044317607</span>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="search-wrap">
                        <div class="section-title">基本信息</div>
                        <el-row>
                            <el-col :span="8">
                                <ul>
                                    <li class="mb-twe">
                                        <span>部门：</span>
                                        <span class="text-message">局领导</span>
                                    </li>
                                    <li class="mb-twe">
                                        <span>政治面貌：</span>
                                        <span class="text-message">中共党员</span>
                                    </li>
                                    <li class="mb-twe">
                                        <span>职级：</span>
                                        <span class="text-message">副处级</span>
                                    </li>
                                    <li class="mb-twe">
                                        <span>工作年限：</span>
                                        <span class="text-message">31年</span>
                                    </li>
                                    <li class="mb-twe">
                                        <span>技术职称：</span>
                                        <span class="text-message">中专</span>
                                    </li>
                                    <li class="mb-twe">
                                        <span>授权时间：</span>
                                        <span class="text-message">2012-03-20</span>
                                    </li>
                                    <li class="mb-twe">
                                        <span>参加工作时间：</span>
                                        <span class="text-message">1989-08-01</span>
                                    </li>
                                    <li class="mb-twe">
                                        <span>任职时间：</span>
                                        <span class="text-message">2014-11-20</span>
                                    </li>
                                </ul>
                            </el-col>
                            <el-col :span="8">
                                <ul>
                                    <li class="mb-twe">
                                        <span>警号：</span>
                                        <span class="text-message">12123018</span>
                                    </li>
                                    <li class="mb-twe">
                                        <span>警衔：</span>
                                        <span class="text-message">一级警督</span>
                                    </li>
                                    <li class="mb-twe">
                                        <span>公安短号：</span>
                                        <span class="text-message">672296</span>
                                    </li>
                                    <li class="mb-twe">
                                        <span>毕业学校：</span>
                                        <span class="text-message">浙江省人民警察学校</span>
                                    </li>
                                    <li class="mb-twe">
                                        <span>学历：</span>
                                        <span class="text-message">中专</span>
                                    </li>
                                    <li class="mb-twe">
                                        <span>入党团时间：</span>
                                        <span class="text-message">1994-03-11</span>
                                    </li>
                                    <li class="mb-twe">
                                        <span>参加公安工作时间：</span>
                                        <span class="text-message">1989-08-01</span>
                                    </li>
                                    <li class="mb-twe">
                                        <span>任职及时间：</span>
                                        <span class="text-message">2017-05-17</span>
                                    </li>
                                </ul>
                            </el-col>
                            <el-col :span="8">
                                <ul>
                                    <li class="mb-twe">
                                        <span>车牌号：</span>
                                        <span class="text-message">浙江G66E68,浙江G10976</span>
                                    </li>
                                    <li class="mb-twe">
                                        <span>住址：</span>
                                        <span class="text-message">海淀区龙域中路融泽嘉园1号院1号楼3单元303</span>
                                    </li>
                                    <li class="mb-twe">
                                        <span>身份证：</span>
                                        <span class="text-message">33010619680501415X</span>
                                    </li>
                                    <li class="mb-twe">
                                        <span>职务：</span>
                                        <span class="text-message">金华市公安局党委委员、副局长、二级高级警长</span>
                                    </li>
                                    <li class="mb-twe">
                                        <span>分局：</span>
                                        <span class="text-message">金华市局</span>
                                    </li>
                                    <li class="mb-twe">
                                        <span>入职形式：</span>
                                        <span class="text-message">公安院校毕业</span>
                                    </li>
                                    <li class="mb-twe">
                                        <span>专业：</span>
                                        <span class="text-message">公安保卫</span>
                                    </li>
                                    <li class="mb-twe">
                                        <span>人员类别：</span>
                                        <span class="text-message">民警</span>
                                    </li>
                                </ul>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="search-wrap">
                        <div class="section-title">工作情况</div>
                        <div class="summary-score">
                            <div class="summary-score-box">
                                <span>本年度日志填写</span>
                                <span class="color-number color-red">300</span>
                                <span class="text-message">篇</span>
                            </div>
                            <div class="summary-score-box">
                                <span>年度平均分</span>
                                <span class="color-number color-blue">9.3</span>
                                <span class="text-message">分</span>
                            </div>
                            <div class="summary-score-box">
                                <span>一季度日志平均分</span>
                                <span class="color-number color-orange">8.3</span>
                                <span class="text-message">分</span>
                            </div>
                            <div class="summary-score-box">
                                <span>二季度日志平均分</span>
                                <span class="color-number color-purple">7.2</span>
                                <span class="text-message">分</span>
                            </div>
                            <div class="summary-score-box">
                                <span>三季度日志平均分</span>
                                <span class="color-number color-green">6.8</span>
                                <span class="text-message">分</span>
                            </div>
                        </div>
                        <div>
                            <div class="feedback">
                                <div class="mb-ten">
                                    <span>本人反馈：</span>
                                    <span>家里有事</span>
                                </div>
                                <div>
                                    <span>层级领导反馈：</span>
                                    <span>已和本人沟通</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="feedback">
                                <div class="mb-ten">
                                    <span>本人反馈：</span>
                                    <span>家里有事</span>
                                </div>
                                <div>
                                    <span>层级领导反馈：</span>
                                    <span>已和本人沟通</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="feedback">
                                <div class="mb-ten">
                                    <span>本人反馈：</span>
                                    <span>家里有事</span>
                                </div>
                                <div>
                                    <span>层级领导反馈：</span>
                                    <span>已和本人沟通</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="search-wrap">
                        <div class="section-title">考勤情况</div>
                        <div class="summary-score">
                            <div class="summary-score-box">
                                <span>上班</span>
                                <span class="color-number color-green">300</span>
                                <span class="text-message">天</span>
                            </div>
                            <div class="summary-score-box">
                                <span>加班</span>
                                <span class="color-number color-blue">9.3</span>
                                <span class="text-message">天</span>
                            </div>
                            <div class="summary-score-box">
                                <span>出差</span>
                                <span class="color-number color-orange">8.3</span>
                                <span class="text-message">天</span>
                            </div>
                            <div class="summary-score-box">
                                <span>请假</span>
                                <span class="color-number color-red">7.2</span>
                                <span class="text-message">天</span>
                            </div>
                        </div>
                        <div>
                            <div class="feedback">
                                <div class="warning-title mb-ten">2019年12月3日 11:46:31 迟到</div>
                                <div class="mb-ten">
                                    <span>本人反馈：</span>
                                    <span>家里有事</span>
                                </div>
                                <div>
                                    <span>层级领导反馈：</span>
                                    <span>已和本人沟通</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="feedback">
                                <div class="warning-title mb-ten">2019年12月3日 11:46:31 迟到</div>
                                <div class="mb-ten">
                                    <span>本人反馈：</span>
                                    <span>家里有事</span>
                                </div>
                                <div>
                                    <span>层级领导反馈：</span>
                                    <span>已和本人沟通</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="feedback">
                                <div class="warning-title mb-ten">2019年12月3日 11:46:31 迟到</div>
                                <div class="mb-ten">
                                    <span>本人反馈：</span>
                                    <span>家里有事</span>
                                </div>
                                <div>
                                    <span>层级领导反馈：</span>
                                    <span>已和本人沟通</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="search-wrap">
                        <div class="section-title">处分问责</div>
                        <div>
                            <div class="feedback punishment">
                                <div class="mb-ten">
                                    <span>事由：</span>
                                    <span class="origin">工作时间饮酒</span>
                                </div>
                                <div>
                                    <span>影响期2019年12月3日 11:49:40 - 2019年12月3日 11:49:42</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="feedback punishment">
                                <div class="mb-ten">
                                    <span>事由：</span>
                                    <span class="origin">工作时间饮酒</span>
                                </div>
                                <div>
                                    <span>影响期2019年12月3日 11:49:40 - 2019年12月3日 11:49:42</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="feedback punishment">
                                <div class="mb-ten">
                                    <span>事由：</span>
                                    <span class="origin">工作时间饮酒</span>
                                </div>
                                <div>
                                    <span>影响期2019年12月3日 11:49:40 - 2019年12月3日 11:49:42</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="search-wrap">
                        <div class="section-title">事项即报</div>
                        <div>
                            <div class="feedback">
                                <div>2019年12月3日 11:50:26  房产变更  购买xx地xx小区3-2-1402号  金额13200000元，贷款500000元</div>
                            </div>
                        </div>
                        <div>
                            <div class="feedback">
                                <div>2019年12月3日 11:50:26  因私出境 目的地 法国  旅游</div>
                            </div>
                        </div>
                        <div>
                            <div class="feedback">
                                <div>2019年12月3日 11:50:26 亲属工作情况 儿子在xxx单位工作</div>
                            </div>
                        </div>
                    </div>
                    <div class="search-wrap">
                        <div class="section-title">廉政档案</div>
                        <div>
                            <div class="feedback">
                                <div class="mb-ten">
                                    <span>访谈人：</span>
                                    <span>层级领导</span>
                                </div>
                                <div>
                                    <span>访谈内容：</span>
                                    <span>内容你萨德克里夫就考试拉德芳斯对接开发接收到法拉盛代理费时代峰峻拉三等奖弗兰克撒旦法十来块的房间里sad发</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="feedback">
                                <div class="mb-ten">
                                    <span>访谈人：</span>
                                    <span>层级领导</span>
                                </div>
                                <div>
                                    <span>访谈内容：</span>
                                    <span>内容你萨德克里夫就考试拉德芳斯对接开发接收到法拉盛代理费时代峰峻拉三等奖弗兰克撒旦法十来块的房间里sad发</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="feedback">
                                <div class="mb-ten">
                                    <span>访谈人：</span>
                                    <span>层级领导</span>
                                </div>
                                <div>
                                    <span>访谈内容：</span>
                                    <span>内容你萨德克里夫就考试拉德芳斯对接开发接收到法拉盛代理费时代峰峻拉三等奖弗兰克撒旦法十来块的房间里sad发</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-scrollbar>
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
            this.visible = true
        }
    }
}
</script>

<style lang="stylus" scoped>
@import "../../../../styles/common.styl"
/*
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
                margin-bottom: 10px;*/

.mb-ten
    margin-bottom: 10px;
.mb-twe
    margin-bottom 20px;

/deep/ .el-textarea {
    width: 100%;
    height: auto;

    .el-textarea__inner {
        margin-left: 0;
    }
}

/deep/ .el-scrollbar__wrap
    overflow-x: hidden;

.mr-tweFive
    margin-right 25px;
.detail-box
    padding 20px
.text-message
    color: #333;
    font-weight 700;
.summary-score
    display flex;
    justify-content space-around;
    .summary-score-box
        display flex;
        justify-content center;
        align-items center;
        border 1px solid #E5E9F4;
        height 70px;
        width 100%
    .color-number
        font-size 30px;
        font-weight 700;
        margin 0 10px;
    .color-red
        color #DE2810;
    .color-blue
        color #235FF6;
    .color-orange
        color #F09B38;
    .color-purple
        color #8674F6;
    .color-green
        color #73CD6C;
.feedback
    background-color #F5F6F7;
    margin: 10px;
    padding: 10px;
    color: #333;
    .warning-title
        display inline-block;
        background-color #235FF5;
        color #fff
        border-radius 5px;
        text-align center;
        padding 2px 30px;
.punishment
    background-color #FFF9EB;
    .origin
        color red;
</style>