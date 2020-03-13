<template>
    <div class='u_content'>
        <div class='u_img'>
                <img :src='src' class='' style="max-height: 100px;border-radius: 24px;float: right;margin-top: 20%"/>
                <!-- src={myPhotoSrc(userInfo)} -->
        </div>
        <div class='u_name'>
            <div class='m_xin'><span>姓名：</span>{{name}}</div>
            <div class='m_xin'><span>警号：</span>{{userInfo.policeCode}}</div>
            <div class='m_xin'><span>部门：</span>{{organizationNames}}</div>
            <div class='m_xin'><span>警衔：</span>{{userInfo.policeRank}}</div>
            <div v-if="userInfo.awardDate !=''&&userInfo.awardDate !=undefined&&userInfo.awardDate !='undefined'">
            <div class='m_xin'>
                <span>授衔时间：</span>{{new Date(userInfo.awardDate).toLocaleDateString() || ''}}</div>
            </div>
            <div else>
                <div class='m_xin'>
                    <span>授衔时间：</span>
                </div>
            </div>
            <div class='m_xin'><span>身份证号：</span>{{userInfo.cardNum}}</div>
            <div class='m_xin'><span>性别：</span>{{userInfo.userSex}}</div>
            <div class='m_xin'><span>民族：</span>{{userInfo.nation}}</div>
            <div class='m_xin'><span>年龄：</span>{{userInfo.age}}</div>
            <div v-if="userInfo.birthDate !=''&&userInfo.birthDate !=undefined&&userInfo.birthDate !='undefined'">
            <div class='m_xin'>
                <span>生日：</span>{{new Date(userInfo.birthDate).toLocaleDateString() || ''}}</div>
            </div>
            <div else>
                <div class='m_xin'>
                    <span>生日：</span>
                </div>
            </div>
            <div class='m_xin'><span>籍贯：</span>{{userInfo.nativePlace}}</div>
            <div class='m_xin'><span>政治面貌：</span>{{userInfo.politicalStatus}}</div>
            <div class='m_xin'><span>手机号：</span>{{userInfo.phone}}</div>
            <div class='m_xin'><span>公安短号：</span>{{userInfo.policeTelphone}}</div>
            <div class='m_xin'><span>车牌号：</span>{{userInfo.carNoList}}</div>
            <div class='m_xin'><span>住址：</span>{{userInfo.liveAddress}}</div>
            <div class='m_xin'><span>学历：</span>{{userInfo.education}}</div>
            <div class='m_xin'><span>毕业学校：</span>{{userInfo.graduateSchool}}</div>
            <div class='m_xin'><span>专业：</span>{{userInfo.major}}</div>
            <div class='m_xin'><span>人员类别：</span>{{userInfo.policeType}}</div>
            <div class='m_xin'><span>职务：</span>{{userInfo.job}}</div>
            <div v-if="userInfo.entryDate !=''&&userInfo.entryDate !=undefined&&userInfo.entryDate !='undefined'">
                <div class='m_xin'>
                    <span>任职时间：</span>{{new Date(userInfo.entryDate).toLocaleDateString() || ''}}</div>
            </div>
            <div else>
                <div class='m_xin'>
                    <span>任职时间：</span>
                </div>
            </div>
            <div class='m_xin'><span>职级：</span>{{userInfo.postLevel}}</div>
            <div class='m_xin'><span>籍贯：</span>{{userInfo.realName}}</div>
            <div class='m_xin'><span>技术职称：</span>{{userInfo.technicalTitle}}</div>
            <div v-if="userInfo.startWorkTime !=''&&userInfo.startWorkTime !=undefined&&userInfo.startWorkTime !='undefined'">
                <div class='m_xin'>
                    <span>参加工作时间：</span>{{new Date(userInfo.startWorkTime).toLocaleDateString() || ''}}</div>
            </div>
            <div else>
                <div class='m_xin'>
                    <span>参加工作时间：</span>
                </div>
            </div>
            <div v-if="userInfo.joinPoliceTime !=''&&userInfo.joinPoliceTime !=undefined&&userInfo.joinPoliceTime !='undefined'">
                <div class='m_xin'>
                    <span>参加公安工作时间：</span>{{new Date(userInfo.joinPoliceTime).toLocaleDateString() || ''}}</div>
            </div>
            <div else>
                <div class='m_xin'>
                    <span>参加公安工作时间：</span>
                </div>
            </div>
            <div v-if="userInfo.joinPartyTime !=''&&userInfo.joinPartyTime !=undefined&&userInfo.joinPartyTime !='undefined'">
                <div class='m_xin'>
                    <span>入党(团)时间：</span>{{new Date(userInfo.joinPartyTime).toLocaleDateString() || ''}}</div>
            </div>
            <div else>
                <div class='m_xin'>
                    <span>入党(团)时间：</span>
                </div>
            </div>
            <div class='m_xin'><span>入职形式：</span>{{userInfo.entryForm}}</div>
            <div class='m_xin'><span>工作年限：</span>{{userInfo.workingLife}}</div>
 
                <!-- <span>楼华安</span> -->
                <!-- <img src='../../utils/img/lha.png' class='' style=" max-height: 100px;border-radius: 24px; "/> -->
            <!-- <span>机关纪委</span> -->
        </div>
    </div>
</template>
<script>
import { getUserInfo } from '../../api/user-server.js';
import { myPhotoSrc } from '../../utils/common.js'
    export default {
        name: 'MenuPage',
        data() {
            return {
                isCollapse: false,
                flag: false,
                userInfo:[],
                src:'',
                name:'',
                organizationNames:''
            }
        },
        mounted() {
            this.userInfo = JSON.parse(sessionStorage.userInfo)
            this.name = sessionStorage.realName
            this.organizationNames = sessionStorage.orgName
            this.src = myPhotoSrc(this.userInfo)
        },
        methods: {
        }
    }
</script>
<style>
.u_content{
    width: 90%;
    background-color: white;
    height: 98%;
    margin: 0 auto;
    position: relative;
}
.u_name{
    font-size: larger;
    font-weight: 800;
    width: 80%;
    float: right;
    margin-top: 84px;
    height: 100%;
}
.u_name span{
    color: #8593A7
}
.u_img{
    width: 20%;
    position: absolute;
    height: 100%;
    float: left;
}
.m_xin{
    width: 35%;
    margin-left: 30px;
    float: left;
    line-height: 50px;
}
</style>