<!--登录页面-->
<template>
  <div id="login">
    <div class="header">
      <div class="header_div">
          <div class="login">
              <div class="login-top">
                <span>用户登录</span>
                <router-link tag="p" to="/regist">注册</router-link>
              </div>
              <div class="loginBody">
                <div class="loginModel">
                  <el-form :model="loginForm" :rules="rules1" ref="formLogin">
                    <el-form-item prop="phone">
                      <el-input type="text" v-model="loginForm.phone" placeholder="请输入手机号码" :maxlength=11></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                      <el-input type="password" v-model="loginForm.password"  placeholder="请输入密码" :maxlength=20 @keyup.enter.native="login('formLogin')"></el-input>
                    </el-form-item>
                    <div @click="login('formLogin')" style="width:100%;height:40px;line-height:40px;text-align:center;font-size:14px;background:red;color:#fff; cursor: pointer;" v-if="loginForm.phone!='' && loginForm.password !=''">登录</div>
                    <div   style="width:100%;background:#b3b3b3;color:#333;height:40px;line-height:40px;text-align:center;font-size:14px; cursor: pointer;" v-if="loginForm.phone=='' || loginForm.password ==''">登录</div>
                  </el-form>
                  <div class="forget">
                    <router-link to="/forget" style="display:block">忘记密码?</router-link>
                  </div>
                </div>
              </div>
          </div>
      </div>   
    </div>
  </div>
</template>

<script>
//import {login} from '@/services/getDetail'
export default {
  name: 'Login',
  data () {
    //login
    var loginPhone = (rule,value,callback) => {
      var mobile = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
      if(value == '') {
        callback(new Error('请输入手机号'))
        this.getQueryNull()
      }else if(!mobile.test(value)) {
        callback(new Error('请输入正确手机号'))
        this.getQueryNull()
      }else{
        this.getQueryNull()
        this.getImgCheck(value)
      }
      callback()
    }
    var loginPsd = (rule,value,callback) => {
      if(value == '') {
        callback(new Error('请输入密码'))
        this.getQueryNull()
      }else{
        this.getQueryNull()
      }
      callback()
    }
    var yzm = (rule,value,callback) => {
      if(value == '') {
        callback(new Error('请输入校验码'))
        this.getQueryNull()
      }else{
        this.getQueryNull()
      }
      callback()
    }
    return {
      active:1,
      isShow:false,
      checkImg:'',
      loginForm:{
        phone:'',
        password:'',
        yzm:""
      },
      isLoginBtn:false,
      registFormLength:true,
      rules1:{
        phone:[
          {validator:loginPhone,trigger: 'blur'}
        ],
        password:[
          {validator:loginPsd,trigger: 'blur'}
        ],
        yzm:[
          {validator:yzm,trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    getQueryNull(){
      if(this.loginForm.phone != '' && this.loginForm.password != '' && this.loginForm.yzm != ''){
        this.isLoginBtn = true
      }else{
         this.isLoginBtn = false
      }
    },
     getImgCheck(value) {
      
      var that = this;
      //that.registForm.phone = value
      if(value.length == 11){
          that.registFormLength = false;
         that.checkImg = 'http://tpi.maimailc.com/joy/mobileCodeImage.json?mobile='+value
         //return;
      }
    },
    login(formName) {
      var data = {
        mobile: this.loginForm.phone,
        password: this.loginForm.password,
        // yzm:this.loginForm.yzm,
        joy:1,
        device:this.device
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.service({
            url:"/login.json",
            method:"post",
            data:JSON.stringify(data)
          }).then(res=>{
            if(res.code == 200){
              sessionStorage.setItem('accesstoken',res.data)
              // sessionStorage.setItem('mobile',this.loginForm.phone)
              this.$store.commit('isLogin') //切换为登录状态
              let phone = this.loginForm.phone.substring(0,3)+'****'+this.loginForm.phone.substring(7,11)
              this.$store.commit('mobile',phone)
              this.$router.push('/account/accountDetail')
              this.$message({
                message:'登录成功',
                type: 'success',
                showClose: true,
                duration: 3 * 1000
              })
            }else{
              this.$message({
                message: res.resultMsg,
                type: 'error',
                showClose: true,
                duration: 3*1000
              })
            }
          })
        } else {
          return false;
        }
      });
    }
  },
  mounted() {
    // if(sessionStorage.getItem('mobile')){
    //    this.loginForm.phone = sessionStorage.getItem('mobile')
    //    this.getImgCheck(sessionStorage.getItem('mobile'))
    // }
    // sessionStorage.setItem('active',5) //保证刷新时，active的状态s
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->  
<style lang="scss" scoped>  
.header {
 
  height: 600px;
  background: url("../../images/login/banner.png") no-repeat;
  background-size: 100% 100%;
  .header_div{
    width:1000px;
    position: relative;
    height:100%;
    margin:0 auto;
  }
  .login {
    width: 366px;
    height: 374px;
    background-color: #fff;
    border-radius: 10px;
    position: absolute;
    top:0;
    right:0%;
    bottom:0;
    margin:auto;
    .login-top{
      width:80%;
      margin:0 auto;
      padding:20px 0 ;
      span{
        float:left;
        font-size: 18px;
      }
      p{
        float: right;
        font-size: 14px;
        color:#666;
        cursor: pointer;
      }
    }
    .loginHead {
      overflow: hidden;
      margin-left: 80px;
      li {
        float: left;
        padding: 10px 0;
        margin-right: 150px;
        &.isActive {
          color: red;
          border-bottom: 3px solid red;
        }
        &:last-of-type {
          margin: 0;
        }
      }
    }
    .loginBody {
      width: 80%;
      margin:30px auto 0;
      .el-form-item {
        margin-bottom: 25px;
        position: relative;
        .input{
          width:50%;
          float:left;
        }
        .yzm{
          width:40%;
          float:right;
          border:1px solid #eee;
          height:40px;
        }
      }
      .el-button {
        padding: 10px;
        margin: 5px auto 0;
        font-size: 14px;
        background-color: #e52921;
        border:none;
      }
      .forget {
        margin-top: 10px;
        text-align: right;
        a {
          padding: 5px;
          font-size: 14px;
          color: #333;
        }
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