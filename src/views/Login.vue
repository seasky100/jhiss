<template>
    <div ref='login' class='login w-full h-full flex flex-column flex-align-center flex-justify-center'>
        <div class='absolute w-full h-full l_left'></div>
        <div class='absolute w-full h-full l_right'></div>
        <div class='absolute w-full h-full flex flex-align-center flex-justify-center flex-column'>
          <div class='flex flex-column flex-align-center'>
            <img src='../utils/img/login_logo2.png' style="height: 9em" />
            <img src='../utils/img/login_title2.png' class='mt8' style="height: 4em" />
          </div>
          <div class='flex flex-column border-box l_udlogal' style=" width: 25em; padding: 2em; margin-top: 2em">
            <div class='w-full align-center color-fff' style="font-size: 1.6em; letter-spacing: 0.1em">
              用户登录
            </div>
            <div v-show='certification' style="position: relative;width: 100%;text-align: center;">
                <img src='../utils/img/2/login_u.png' style="height: 3em; margin: 2em auto" />
                <div class='align-center color-fff'>
                    证书登录
                </div>
            </div>
            <el-form v-show='!certification' ref='loginForm' :model='form' :rules='rules'>
                <el-form-item prop='username'>
                    <input v-model.trim='form.username' placeholder='用户名' class='focus-username w-full color-fff h48' style="border: 1.4px solid #004b77; border-radius: 2% / 12%; padding-left: 13%"/>
                </el-form-item>
                <el-form-item prop='password'>
                    <input v-model.trim='form.password' placeholder='密码' :type='passwordType' class='focus-password w-full color-fff h48' @keyup.enter.native='onSubmit'style="border: 1.4px solid #004b77; border-radius: 2% / 12%; padding-left: 13%"/>
                </el-form-item>
                <div class='flex flex-justify-between' style="margin-top: 6%">
                    <div class='flex flex-align-center'>
                        <label class='flex color-fff' style="letter-spacing: 0.1em">
                            <input  v-model='checked'  type='checkbox' class='focus-remember-password'/>
                            <span class=''>记住密码</span>
                        </label>
                    </div>
                </div>
            </el-form>
            <button @click='onSubmit' class='w-full color-fff align-center h32 l_login' style="margin-top: 6%; font-size: 1.2em">
              登录
            </button>
            <button @click='change' class='block' style="margin: 3% auto 0; text-decoration: underline; color: #00b8ff">
              <div v-show='certification'>
              <div>切换为用户名登录</div>
            </div>
            <div v-show='!certification'>
              <div>切换为U盾登录</div>
            </div>
            </button>
          </div>
          <div class='absolute' style="bottom: 4.17%">
            <button class='block txt-deco-none' style="color: #00b8ff; margin: 0 auto" onClick={this.toggleDownload}>相关手册以及插件下载</button>
            <span style="color: #ccc">©金华市公安局 技术支持: 北京天耀宏图科技有限公司</span>
          </div>
        </div>
        <!-- {
          this.state.download &&
          <div class='fixed left right top bottom flex flex-justify-center' style={{background: '#CCCCCC60'}} onClick={this.toggleDownload}>
            <iframe src={`${XZTX_BASE}/sys/downloadPage`} style={{border: 0, width: '600px', height: '414px', marginTop: '2em', background: '#F2F5F7'}} />
          </div>
        } -->
      </div>
</template>
<script>
import { encryptByDES, getUrl } from '../utils/common.js'
import { signIn,getUserInfo } from '../api/user-server.js'
export default {
    name: 'login',
    data() {
        return {
            certification: false,
            form: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            },
            passwordType: 'password',
            checked: false,
        }
    },

    mounted() {

    },
    methods: {
        change(){
            this.certification = !this.certification         
        },
        onSubmit() {
            this.$refs['loginForm'].validate((valid) => {
                if (valid) {
                    // 复选框状态
                    if (this.checked === true) {
                        this.setCookie(this.form.username, this.form.password, 7)
                    } else {
                        this.clearCookie()
                    }
                    const params = {
                        username: this.form.username,
                        password: encryptByDES(this.form.password),
                        base64Code: '',
                        service: getUrl() + '/police/',
                        appKey: 'JHGA'
                    }                    
                    signIn(params).then(res => {
                        const _this=this;
                        // console.log(res)
                        if (res.data && res.success === true) {
                            _this.$message({
                                type: 'success',
                                message: '登录成功'
                            })
                            const parameter = {
                                token: res.data.gmsso_cli_ec_key,
                                appKey: 'JHGA'
                            }
                            // 调用checkTokenByAppKey 状态管理userName，token，uesrId
                            _this.$store.dispatch('user/loginSaveToken', parameter)
                                .then(res => { 
                                    if (res.data && res.success === true) {
                                        _this.$store.dispatch('user/getInfo')
                                        _this.$router.push('/PersonalHome')
                                    }                                
                                })
                                .catch(() => {
                                    // this.loading = false
                                    return false
                                })
                        } else {
                            // this.loading = false
                            this.$message.error(res.message)
                            return false
                        }
                    }).catch(error => {
                        // this.loading = false
                        this.$message.error(error.message)
                        return false
                    })                    
                } else {
                    this.$message({
                        type: 'warning',
                        message: '请按规则填写表单'
                    })
                    // this.loading = false
                    return false
                }
            })
        },
        // 设置cookie
        setCookie(c_name, c_pwd, exdays) {
            // 获取时间
            var exdate = new Date()
            // 保存的天数
            exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays)
            // 字符串拼接cookie
            window.document.cookie = 'userName' + '=' + c_name + ';path=/;expires=' + exdate.toGMTString()
            window.document.cookie = 'password' + '=' + c_pwd + ';path=/;expires=' + exdate.toGMTString()
        },
        // 读取cookie
        getCookie: function () {
            if (document.cookie.length > 0) {
                var arr = document.cookie.split('; ')
                for (var i = 0; i < arr.length; i++) {
                    var arr2 = arr[i].split('=')
                    // 判断查找相对应的值
                    if (arr2[0] === 'userName') {
                        // console.log(arr2[1])
                        this.form.username = arr2[1]
                    } else if (arr2[0] === 'password') {
                        // console.log(arr2[1])
                        this.form.password = arr2[1]
                    }
                }
                this.checked = true
            }
        },
        // 清除cookie
        clearCookie: function () {
            // 修改2值都为空，天数为负1天就好了
            this.setCookie('', '', -1)
        }

    },
}

</script>
<style>
    @import './css/assembly.css';
    @import './css/hover-min.css';
    @import './css/media.css';
    @import './css/pseudo_classes.css';
    .login {
        /* background: url(../utils/img/header_bg@2x.png) no-repeat center / cover; */
        background: url(../utils/img/2/login_bg_full.png) currentColor no-repeat center / cover
    }

    .l_left {
        background: url(../utils/img/2/login_bg_left@2x.jpg) no-repeat left center / contain
    }

    .l_right {
        background: url(../utils/img/2/login_bg_right@2x.jpg) no-repeat right 85% / auto 48%;
    }
    .focus-username{
        background: rgba(32,32,32,0.2) url(../utils/img/login_user_input.png) no-repeat 5% center / auto 45%; margin-top: 8%;

    }
    .focus-password{
        background: rgba(32,32,32,0.2) url(../utils/img/login_password_input.png) no-repeat 5% center / auto 45%; margin-top: 8%;
    }
    .l_login{
        background: url(../utils/img/login_commit_button.png) no-repeat center / cover; letter-spacing: 0.5em;
    }
    .l_udlogal{
        background: rgba(59, 59, 142, 0.20);
    }
</style>