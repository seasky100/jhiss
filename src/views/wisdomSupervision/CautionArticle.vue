<template>
    <div class='c_body'>
        <div style="text-align: center;font-size: -webkit-xxx-large; color: red;">曝光警示通报</div>
        <div class='' style="font-size: 16px;padding-right: 114px;padding-left: 114px;line-height: 30px;" v-html = 'listData.content' ></div>
        <div style="margin-left: 10px;font-weight: bold;">评论区</div>
        <div class='hotnode' v-for="(item,index) in nodeData" :key="index">
                <div class='c_top'>
                    <div class='c_portrait'>
                        <img style="border-radius: 27px;" :src='item.headUrl' />
                        <span style="margin-left: 8px;">{{item.name}}</span>
                    </div>
                    <div class='c_right' style="width: 93%;">
                    <div class='c_introduce'>{{item.noteContent}}</div>
                    <div style="display: flex">
                    <div class='e_date' style="text-align: end;margin-bottom: 12px; width: 100%;">{{item.gmtCreate}}</div>
                    <div class='h32' style="display: flex; cursor: pointer; margin-left: 10px;" title='我要点赞' @click='updateLike(item)'>
                        <img style="width: 15px;height:12px;" src='../../utils/img/zan.png' />
                        <div style="margin-top: -2px;">{{item.praiseCount}}</div>
                    </div>
                </div>

                </div>
                </div>
        </div>
        <div v-show='flag' style="text-align: center;margin-bottom: 15px;">
            <el-button @click='goBack'>返回</el-button>
            <el-button type="primary" @click="mnode">评论</el-button>
            <!-- <div v-show='flag' class='mnode' @click='mnode'>我要评论</div> -->
        </div>  
        <!-- <div v-show='flag' class='mnode' @click='mnode'>我要评论</div> -->
        <div v-show='!flag' class='c_node'>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" size="small" label-position="top">
                <el-form-item prop="input">
                    <el-input placeholder="请填写评价内容" type="textarea" v-model="ruleForm.input" :rows="4"></el-input>
                </el-form-item>
                <el-form-item style="text-align: center;">
                    <el-button type="primary" @click="submit">提交</el-button>
                    <el-button @click='goBack'>返回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    import { getExposureById ,saveExposureNote,queryExposureNote,updateLike } from '@/api/warn.js';
    import { mapGetters } from 'vuex';
    import { myPhotoSrc } from '../../utils/common.js';
    export default {
      name: 'MenuPage',
            computed: {
                ...mapGetters([
                    'userId'
                ])
            },
      data() {
        return {
            flag: true,
            id: '',
            userId: '',
            src:'',
            title:'',
            userInfo:{},
            ruleForm: {
                input:'',
                userId: '',
            },
            listData:{},
            nodeData:[],
            rules: {
            input: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },

        }
    },
      watch: {
      },
      computed: {
  
      },
      mounted() {
          this.userInfo = JSON.parse(sessionStorage.userInfo)
          this.id = this.$route.query.id;
          this.userId = this.$route.query.userId;
          this.queryExposureNote();
          this.getExposureById();
      },
      methods: {
		// 查询曝光栏内容详情
        getExposureById() {
            const _this = this;
            const params = {
                id: _this.id,
                userId: _this.userId,
            }
            getExposureById(params).then(res => {
                if (res.success) {
                    _this.listData = res.data
                    _this.title = res.data.title
                }
            })
        },
        // 查看评论
        queryExposureNote() {
            const _this = this;
            const params = {
            exposureId: _this.id
            }
            queryExposureNote(params).then(res => {
                if (res.success) {
                    _this.nodeData = res.data
                    console.log(666,res.data)
                    const data = res.data
                    for (let i = 0; i < data.length; i++) {
                        if(data[i].headUrl){
                        data[i].headUrl = 'http://10.121.252.53:1001/View_file/UserImage/'+ data[i].headUrl.split('\\').slice(-1)[0]
                        // myPhotoSrc(data[i].headUrl)
                        console.log(data[i].headUrl)   
                        }
            
                    }
                }
            })
        },
        // 添加点赞
        updateLike(data) {
            const _this = this;
            const params = {
                version: data.version,
                praiseCount:data.praiseCount,
                id: data.id,
            }
            updateLike(params).then(res => {
                // console.log(res);
                if (res.success) {
                    this.$message({
                        type: 'success',
                        message: '评价成功'
                    })
                    _this.queryExposureNote()
                } else {
                    this.$message({
                        type: 'error',
                        message: '提交失败'
                    })
                }
            })
        },
        goBack(){
            this.$router.go(-1)
        },
        mnode(){
            this.flag = !this.flag
        },
         // 提交评论
        submit() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    const _this = this;
                    const params = {
                        userId: _this.userId,
                        noteContent: _this.ruleForm.input,
                        name: sessionStorage.realName,
                        exposureId: _this.id,
                        exposureTitle: _this.title,
                        headUrl: _this.userInfo.fileId
                    }
                    saveExposureNote(params).then(res => {
                        // console.log(res);
                        if (res.success) {
                            this.$message({
                                type: 'success',
                                message: '评价成功'
                            })
                            this.$router.go(-1)
                        } else {
                            this.$message({
                                type: 'error',
                                message: '提交失败'
                            })
                        }
                    })
                } else {
                    this.$message({
                        type: 'warning',
                        message: '请填写表单'
                    })
                    return false;
                }
            });
        },
      },
    } 
</script>
<style lang="stylus" scoped>
     @import '../css/pseudo_classes.css';
    .c_body{
      height: 100%;
      width: 100%;
    }
    .c_title{
      height: 10%;
    }
    .title{
      text-align: center;
      padding-top: 20px;
    }
    .c_node{
        height: 18%;
        width: 100%;
        /* background-color: beige; */
    }
    .hotnode{
        /* height: 50%; */
        width: 100%;
        overflow: auto;
        margin-bottom: 15px;
        border: 1px dashed lightslategray;
        margin: 1%;
        /* background-color: beige;  */
    }
    .c_start{
	width: 64px;
    height: 20px;
    color: white;
    background-color: #66b1ff;
    border-radius: 14px;
	text-align: center;
    cursor: pointer;
    margin-bottom: 23px;
    margin-left: 45%;
  }
  .c_back{
	width: 64px;
    height: 20px;
    color: white;
    background-color: gray;
    border-radius: 14px;
	text-align: center;
    cursor: pointer;
    margin-bottom: 23px;
    margin-left: 15px;
  }
  .c_top{
	  /* height: 10%; */
	  padding-top: 22px;
	  padding-left: 15px;
	  display: flex;
  }
  .ctitle{
	  width: 80%;
	  font-size: 16px;
	  font-family: Microsoft YaHei;
	  font-weight: bold;
	  color: rgba(51,51,51,1);
  }
  .c_cetitle{
	  width: 30%;
	  padding-left: 24px;
	  /* color: #ff0e02; */
	  margin-top: 20px;
	  font-size: 14px;
	  font-weight: bolder;
  }
  .c_introduce{
	  font-size: 14px;
	  font-family: Microsoft YaHei;
	  font-weight: 400;
	  color: #515a6e;
	  margin-top: 5px;
	  margin-right: 10px;
	  /* margin-left: 28px; */
	  text-indent: 24px;
	  line-height: 22px;
	  letter-spacing: 1px;
  }
  .mnode{
    height: 20%;
    text-align: end;
    cursor: pointer;
    margin-right: 20px;
    color: #006EFF;
  }
  .c_portrait{
    width: 5%;
    height: 100%;
    margin-bottom: 10px;
  }
</style>