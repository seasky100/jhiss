<template>
    <div class='p_content'>
    <el-tabs  v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="人员信息" name="first">
            <Userinfo :id='userId'/>
        </el-tab-pane>
        <el-tab-pane label="我的日志信息" name="second">
                <UserLog :id='infoId'/>
        </el-tab-pane>
        <el-tab-pane label="我的即报 " name="third">
                <UserReport :id='userId'/>
        </el-tab-pane>
        <el-tab-pane label="我的加班信息" name="fourth">
                <UserOvertime :id='infoId'/>
        </el-tab-pane>
        <el-tab-pane label="我的请假申请" name="five">
                <UserLeave :Id='infoId'/>
        </el-tab-pane>
        <el-tab-pane label="我的出国申请" name="six">
                <UserAbroad :Id='infoId'/>
        </el-tab-pane>
        <el-tab-pane label="谈心谈话信息" name="seven">
                <UserTalk :id='userId'/>
        </el-tab-pane>
        <el-tab-pane label="我的工资" name="eight">
                <UserSalary :id='userId'/>
        </el-tab-pane>
    </el-tabs>
</div>
</template>
<script>
import Userinfo from '../../../user/UserInfo';
import UserLog from '../../../user/UserLog';
import UserLeave from '../../../user/UserLeave';
import UserAbroad from '../../../user/UserAbroad';
import UserTalk from '../../../user/UserTalk';
import UserReport from '../../../user/UserReport';
import UserOvertime from '../../../user/UserOvertime';
import UserSalary from '../../../user/UserSalary';

export default {
    components: {
        Userinfo,
        UserLog,
        UserLeave,
        UserAbroad,
        UserTalk,
        UserReport,
        UserOvertime,
        UserSalary            
  },
    data() {
        return {
            userId:'',
            infoId: '',
            activeName: 'first',
        };
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
    },
    created(){
        this.userId = this.$route.query.id
        this.infoId = this.$route.query.infoId
    }
};
</script>
<style lang="stylus" scoped>
 .p_content{
    margin: 15px;
    background-color: #fff;
    height: calc(100% - 30px);
 }       
</style>