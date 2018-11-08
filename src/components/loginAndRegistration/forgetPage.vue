<!--注册页面-->
<template>
  <div id="login">
    <div class="header">
      <div class="header_div">
        <div class="login">
          <div class="loginHead">
            <p>忘记密码</p>
          </div>
          <div class="loginBody">
            <div class="forgetModel">
              <el-form :model="forgetForm" :rules="rules2" ref="formforget">
                <el-form-item prop="phone">
                  <el-input type="text" v-model="forgetForm.phone" placeholder="请输入手机号码" maxlength="11"></el-input>
                </el-form-item>
                <el-form-item prop="phoneCheck">
                  <el-input type="text" v-model="forgetForm.phoneCheck" placeholder="请输入手机验证码"></el-input>
                  <span v-if="!isGetCode" class="getPhoneCheck" @click="getPhoneCheck">获取验证码</span>
                  <span v-if="isGetCode" class="getPhoneCheck getPhoneChecked">{{time}}</span>
                </el-form-item>
                <el-form-item v-if="!isShow" prop="password">
                  <el-input type="password" v-model="forgetForm.password" placeholder="设置新密码（6-20位数字字母组合）" maxlength="20"></el-input>
                  <span @click="togglePsd" class="show">显示</span>
                </el-form-item>
                <el-form-item v-if="isShow" prop="password">
                  <el-input type="text" v-model="forgetForm.password" placeholder="设置新密码（6-20位数字字母组合）" maxlength="20"></el-input>
                  <span @click="togglePsd" class="show">隐藏</span>
                </el-form-item>
                <el-form-item prop="psdCheck">
                  <el-input type="password" @keyup.enter.native="forget('formforget')" v-model="forgetForm.psdCheck" placeholder="确认您的密码" maxlength="20"></el-input>
                </el-form-item>
                <el-button @click="forget('formforget')" type="primary" style="width:100%">找回密码</el-button>
              </el-form>
        
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import {getImgCheck,getCheckCode,forget} from '@/services/getDetail'
export default {
  name: 'forget',
  data () {
    //forget
     var forgetPhone = (rule,value,callback) => {
      var mobile = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
      if(value == '') {
        callback(new Error('请输入手机号'))
      }
      if(!mobile.test(value)) {
        callback(new Error('请输入正确手机号'))
      }
      callback()
    }
    var forgetImgCheck = (rule,value,callback) => {
      if(value == '') {
        callback(new Error('请输入图形验证码'))
      }
      callback()
    }
    var forgetPhoneCheck = (rule,value,callback) => {
      if(value == '') {
        callback(new Error('请输入手机验证码'))
      }
      callback()
    }
    var forgetPsd = (rule,value,callback) => {
      var psdRule = /^(?=.*\d)(?=.*[A-Za-z])[\da-zA-Z]{6,16}$/
      if(value == '') {
        callback(new Error('请输入密码'))
      }else if(!psdRule.test(value)) {
        callback(new Error('请输入6~16位字符，至少包含数字、字母（区分大小写）两种'))
      }
      callback()
    }
    var forgetPsdCheck = (rule,value,callback) => {
      if(value == '') {
        callback(new Error('请再次输入密码'))
      }else if(value !== this.forgetForm.password) {
        callback(new Error('两次密码不一致'))
      }
      callback()
    }
    return {
      time:120,
      isGetCode:false,
      isShow:false,
      checkImg:'',
      forgetForm:{
        phone:'',
        imgCheck:'',
        randomCode:'',
        phoneCheck:'',
        password:'',
        psdCheck:''
      },
      rules2:{
        phone:[
          {validator:forgetPhone,trigger: 'blur'}
        ],
        imgCheck:[
          {validator:forgetImgCheck,trigger: 'blur'}
        ],
        password:[
          {validator:forgetPsd,trigger: 'blur'}
        ],
        phoneCheck:[
          {validator:forgetPhoneCheck,trigger: 'blur'}
        ],
        psdCheck:[
          {validator:forgetPsdCheck,trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
    togglePsd() {
      this.isShow = !this.isShow
    },
    // 忘记密码
    forget(formName) {
      var data = {
        pwd: this.forgetForm.password,
        mobile: this.forgetForm.phone,
        code: this.forgetForm.phoneCheck,
      }
      // console.log(data)
      var that = this;
      this.$refs[formName].validate((valid) => {
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
              setTimeout(() => {
                this.$router.push('/login')
              }, 2000)
            } else {
              this.$message({
                message: res.resultMsg,
                type: 'error',
                showClose: true,
                duration: 3 * 1000
              })
            }
          }).catch(res => {
            console.log(res)
          })
        } else {
          return false;
        }
      });
    },
    d(formName) {
      var data = {
        userPhone: this.forgetForm.phone,
        randCode: this.forgetForm.phoneCheck,
        userPasswd: this.forgetForm.password,
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          forget(data).then(res =>{
            // console.log(res)
            if(res.state) {
              this.$message({
                message: res.msg,
                type: 'success'
              });
              setTimeout(()=>{
                this.$router.push('/login')
              },2000)
            }else {
              this.$message(res.msg)
            }
          })
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    getImgCheck() {
      getImgCheck().then(res =>{
        // console.log(res)
        if(res.state) {
          this.checkImg = 'data:image/png;base64,'+res.data.image
          this.forgetForm.randomCode = res.data.randomCode
        }else {
          this.$message(res.msg);
        }
      })
    },
    getPhoneCheck() {
      // console.log(this.device)
      var data = {
        mobile: this.forgetForm.phone,
        device: this.device
      }
      if (this.forgetForm.phone == '') {
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
          this.isGetCode = true;
          interval = window.setInterval(() => {
            if ((this.time--) <= 0) {
              this.time = 120;
              this.isGetCode = false;
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
    sessionStorage.setItem('active',5) //保证刷新时，active的状态
    // this.getImgCheck()
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->  
<style lang="scss" scoped>  
.header {
  height: 600px;
  background: url("../../assets/imgs/login/banner.png") no-repeat;
  background-size: 100% 100%;
  // background-color: red;
  .header_div{
    width: 1000px;
    position: relative;
    height: 100%;
    margin: 0 auto;
  }
  .login {
    width:366px;
    height:460px;
    padding: 30px 30px 0;
    background-color: #fff;
    border-radius: 6px;
    position: absolute;
    top: 60px;
    right: 0;
    margin:0 auto;
    .loginHead {
      overflow: hidden;
      p {
        font-size: 18px;
        text-align: center;
      }
    }
    .loginBody {
      margin-top: 40px;
      .el-form-item {
        margin-bottom: 18px;
        position: relative;
        img {
          position: absolute;
          z-index: 2;
          top: 0;
          right: 0;
          width: 100px;
          height: 42px;
        }
        .getPhoneCheck {
          position: absolute;
          z-index: 2;
          top: 0;
          right: 10px;
          color:red;
        }
        .getPhoneChecked {
          color:#888;
        }
        .show {
          position: absolute;
          z-index: 2;
          top: 0;
          right: 10px;
          color: #888;
        }
      }
      .el-button {
        padding: 10px;
        margin: 30px auto 0;
        font-size: 16px;
        background-color: #e52921;
        border:none;
      }
    }
  }
}
.footer {
  text-align: center;
  width: 1120px;
  padding: 50px 0;
  margin: 0 auto;
  p {
    margin-top: 10px;
  }
}
</style>  