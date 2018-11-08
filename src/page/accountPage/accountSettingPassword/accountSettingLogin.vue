<template>
    <div class="openKH">
        <!-- 修改登录密码 -->
        <div class="bindCard" v-if="noPass">
            <div class="title">
                <i></i>
                <span>修改登录密码</span>
            </div>
            <el-form ref="formamend" :model="form" label-width="80px" :rules="rules1">
                <el-form-item label="当前密码" prop="oldpass">
                    <el-input type="password" v-model="form.oldpass" placeholder="请输入当前密码" maxlength="16"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newpass">
                    <el-input type="password" v-model="form.newpass" placeholder="6-16位数字和字母组合" maxlength="16"></el-input>
                </el-form-item>
                <el-form-item label="重复密码" prop="checkpass">
                    <el-input type="password" v-model="form.checkpass" placeholder="请重复输入新密码" maxlength="16"></el-input>
                </el-form-item>
                <el-form-item>
                     <el-button type="danger" :plain="true" @click="amend('formamend')">提交</el-button>
                </el-form-item>
                <div class="tishi">
                    <p @click="forget()">忘记密码？</p>
                </div>
            </el-form>
        </div>
        <!-- 忘记登录密码 -->
        <div v-if="!noPass">
            <div class="title">
                <i></i>
                <span>忘记登录密码</span>
            </div>
            <el-form ref="formsave" :model="form" label-width="80px" :rules="rules1">
                <el-form-item label="新密码" prop="newpass">
                    <el-input type="password" v-model="form.newpass" placeholder="6-16位数字和字母组合" maxlength="16"></el-input>
                </el-form-item>
                <el-form-item label="重复密码" prop="checkpass">
                    <el-input type="password" v-model="form.checkpass" placeholder="请重复输入新密码" maxlength="16"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="form.phone" placeholder="请输入您的手机号" maxlength="11"></el-input>
                </el-form-item>
                <el-form-item label="短信验证码" prop="msgCode">
                    <el-input v-model="form.msgCode" placeholder="请输入短信验证码" style="width:25%"></el-input>
                    <el-button :plain="true" v-if="!yzm" @click="getPhoneCheck" style="margin-top:0;width:120px;margin-left:10px;">获取验证码</el-button>
                    <el-button type="danger" :plain="true" v-if="yzm" style="margin-top:0;width:120px">已发送({{time}}s)</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" :plain="true" @click="save('formsave')">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
//import {getAccountInfomation,getIsRealName,openAccountSubmit,getBranchBankList,getFyBankList,getFyProvinceAreaList,getFyAreaList,openHu} from '@/services/getDetail'

export default {
    name: 'account',
    data () {
        // 旧密码
        var loginpsd = (rule, value, callback) => {
            var psdRule = /^(?=.*\d)(?=.*[A-Za-z])[\da-zA-Z]{6,16}$/
            if (value == '') {
                callback(new Error('请输入当前密码'))
                this.getQueryNull()
            }else if (!psdRule.test(value)) {
                callback(new Error('请输入正确密码'))
                this.getQueryNull()
            } else {
                this.getQueryNull()
            }
            callback()
        }
        // 新密码
        var validatePass = (rule, value, callback) => {
            var psdRule1 = /^(?=.*\d)(?=.*[A-Za-z])[\da-zA-Z]{6,16}$/
            if (value == '') {
                callback(new Error('请输入新密码'))
                this.getQueryNull()
            } else if (!psdRule1.test(value)) {
                callback(new Error('请输入6-16位数字和字母组合'))
                this.getQueryNull()
            }
            callback()
        }
        // 重复新密码
        var validatePass1 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入新密码'));
                this.getQueryNull()
            } else if (value !== this.form.newpass) {
                callback(new Error('两次输入密码不一致!'));
                this.getQueryNull()
            } 
            callback()
        };
        // 手机号
        var loginPhone = (rule, value, callback) => {
            var mobile = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            if (value == '') {
                callback(new Error('请输入手机号'))
                this.getQueryNull()
            } else if (!mobile.test(value)) {
                callback(new Error('请输入正确手机号'))
                this.getQueryNull()
            } else {
                this.getQueryNull()
                // this.getImgCheck(value)
            }
            callback()
        }
        // 验证码
        var yzm = (rule, value, callback) => {
            if (value == '') {
                callback(new Error('请输入校验码'))
                this.getQueryNull()
            } else {
                this.getQueryNull()
            }
            callback()
        }
        return {
            rules1: {
                oldpass: [
                    { validator: loginpsd, trigger: 'blur' }
                ],
                newpass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkpass: [
                    { validator: validatePass1, trigger: 'blur' }
                ],
                phone: [
                    { validator: loginPhone, trigger: 'blur' }
                ],
                msgCode: [
                    { validator: yzm, trigger: 'blur' }
                ],
            },
            //表单内容
            form:{
                oldpass:'',//旧密码
                newpass:'',//新密码
                checkpass:'',//重复输入新密码
                phone:'',//手机号
                msgCode:''//验证码
            },
            noPass:true,
            //验证码按钮
            yzm:false,
            time:60,
        }
    },
    methods:{
        forget() {
          var that = this;
          that.noPass = false;
        },
        getUser() {
            var that = this;
            that.service({
                url: "/user/index.json",
                method: "post",
                device: 4
            }).then(res => {
                if (res.code == 200) {
                    console.log(res)
                    that.user = res.data.user;
                    that.account = res.data.account;
                    thta.avatar = res.data.avatar;
                }
            }).catch(res => {
                console.log(res)
            })
        },
        // 验证
        getQueryNull() {
            if (this.form.oldpass != '' && this.form.newpass != '' && this.form.checkpass != '' && this.form.phone != '' && this.form.msgCode != '') {
               
            } else {
                
            }
        },
        // 修改密码
        amend(formName) {
            var data = {
                old: this.form.oldpass,
                pwd: this.form.newpass,
            }
            // console.log(data)
            var that = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    that.service({
                        url: "/user/updatePwd.json",
                        method: "post",
                        data: JSON.stringify(data),
                    }).then(res => {
                        // console.log(res)
                        if (res.code == 200) {
                            this.$message({
                                message: '修改密码成功',
                                type: 'success',
                                showClose: true,
                                duration: 3 * 1000
                            })
                            this.$router.push('/login')
                        } else {
                            that.$router.push('/login')
                        }
                    }).catch(res => {
                        console.log(res)
                    })
                } else {
                    return false;
                }
            });
        },
        // 忘记密码
        save(formName1) {
            var data = {              
                pwd: this.form.newpass,
                mobile:this.form.phone,
                code: this.form.msgCode,
            }
            // console.log(data)
            var that = this;
            this.$refs[formName1].validate((valid) => {
                if (valid) {
                    that.service({
                        url: "/forgetPwd.json",
                        method: "post",
                        data: JSON.stringify(data),
                    }).then(res => {
                        // console.log(res)
                        if (res.code == 200) {
                            this.$message({
                                message: '重置密码成功',
                                type: 'success',
                                showClose: true,
                                duration: 3 * 1000
                            })
                            // that.$router.push('/login')
                        } else {
                            // that.$router.push('/login')
                        }
                    }).catch(res => {
                        console.log(res)
                    })
                } else {
                    return false;
                }
            });
        },
        // 获取验证码
        getPhoneCheck() {
            // console.log(this.device)
            var data = {
                mobile: this.form.phone,
                device: this.device
            }
            if (this.form.phone == '') {
                this.$message({
                    message: '手机号码不可为空',
                    type: 'error',
                    showClose: true,
                    duration: 3 * 1000
                })
                return
            }
            // console.log(data)
            var interval = null;
            let that = this;
            that.service({
                url: "/forgetPwd.json?action=code",
                method: "post",
                data: JSON.stringify(data)
            }).then(response => {
                // console.log(response)
                if (response.code == 200) {
                    that.$message({
                        message: '短信发送成功',
                        type: 'success',
                        showClose: true,
                        duration: 3 * 1000
                    })
                    //短信发送成功，倒计时120秒 
                    that.yzm = true;
                    interval = window.setInterval(() => {
                        if ((this.time--) <= 0) {
                            this.time = 120;
                            this.yzm = false;
                            window.clearInterval(interval);
                        }
                    }, 1000);
                } else if (response.code == 9999) {
                    that.$message({
                        message: response.resultMsg,
                        type: 'error',
                        showClose: true,
                        duration: 3 * 1000
                    })
                }
            }).catch(response => {
                console.log(response)
            })
        },
  },
  mounted() {
    
  }
}
</script>
<style lang="scss">
.openKH{
    .el-select{
        float: none;
    }
    .title{margin: 10px 0 20px;i{background: #f22e3b;padding:10px 2px;}span{padding-left:20px;font-size:18px;}}
    .el-form{
        margin-top: 25px;
        margin-left:55px;
        button{
            width: 100px;
            margin-left: 95px;
            margin-top: 20px;
        }
        .el-button--danger.is-plain{
            color: white;
            background-color: #f22e3b;
        }
    }
    .el-form-item__label{
        width: auto !important;
        // color: red;
    }
    .el-input{
        width: 50%;
    }
    .Myselect{
      .el-input{
         width: 100%;
      }
      .el-select{
          width: 50%;
      }
    }
}
.addDetail{padding:20px 60px 20px;}
.addDetail .top{background: #eee;padding:10px 15px;margin-bottom:20px;p{font-size:14px;line-height:25px;}}
.addDetail .Sbottom{}
.tishi{font-size:12px;color:#999;line-height:25px;padding-left:335px;}
</style>