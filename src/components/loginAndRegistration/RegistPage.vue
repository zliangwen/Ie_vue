<!--注册页面-->
<template>
  <div id="login">
    <div class="header">
        <div class="header-center">
          <div class="login">
              <div class="login-top">
                <span>用户注册</span>
                <router-link tag="p" to="/login">登录</router-link>
              </div>
              <div class="loginBody">
                <div class="registModel">
                  <el-form :model="registForm" :rules="rules2" ref="formRegist">
                    <el-form-item prop="phone">
                      <el-input type="text" v-model="registForm.phone" placeholder="请输入手机号码" :maxlength=11></el-input>
                    </el-form-item>
                     <el-form-item prop="password">
                      <el-input type="password" v-model="registForm.password" placeholder="登录密码必须为6-20位数字和字母" :maxlength=20></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-input type="text" v-model="registForm.invitationCode" placeholder="邀请人手机号(选填)"></el-input>
                    </el-form-item>
                    <el-form-item prop="imgCheck">
                      <el-input type="text" v-model="registForm.imgCheck" placeholder="请输入校验码"  class="input" style="float:left;width:50%"></el-input>
                      <img @click="getImgCheckCode" :src="checkImg" alt="" v-if="!registFormLength">
                      <span style="width:40%;display:block;float:right;text-align:center;background:#eee;" v-if="registFormLength">暂无图片</span>
                    </el-form-item>
                    <el-form-item prop="phoneCheck">
                      <el-input type="text" v-model="registForm.phoneCheck" placeholder="请输入验证码"  class="input" style="width:50%"></el-input>
                      <span v-if="!isGetCode" class="getPhoneCheck"
                      @click="getPhoneCheck"
                      >获取验证码</span>
                      <span v-if="isGetCode" class="getPhoneCheck getPhoneChecked">{{time}}s</span>                
                    </el-form-item>
                   
                    <!-- <el-form-item v-if="isShow" prop="password">
                      <el-input type="text" v-model="registForm.password" placeholder="设置6-16位密码"></el-input>
                      <span @click="togglePsd" class="show">隐藏</span>                
                    </el-form-item> -->
                    
                    <el-form-item prop="agree" style="text-algin:right;font-size:12px;">
                      <el-checkbox v-model="registForm.agree" name="type" style="padding-right:10px;"></el-checkbox>
                      <span style="font-size:12px;">我已阅读和同意</span><span class="rule" @click="isMask = true">《麦麦理财服务协议》</span>
                    </el-form-item>
                    <div @click="regist('formRegist')" type="primary" style="width:100%;font-size:12px;padding:10px 0;text-align:center;border-radius:5px;" v-if="isLoginBtn" >注册即领1088元红包</div>    
                    <div type="primary" style="width:100%;font-size:12px;background:#b3b3b3;color:#333;padding:10px 0;text-align:center;border-radius:5px;"  v-if="!isLoginBtn">注册即领1088元红包</div>          
                  </el-form>
                </div>
              </div>
          </div>
        </div>
    </div>
    <transition name="el-fade-in-linear">
      <div v-if="isMask" class="ruleMask" @click="isMask = false">
        <div class="ruleBox" @click.stop="isMask = true">
          <!-- <h2>{{ruleData.articleName}}</h2> -->
          <div class="content" v-html="ruleData.content"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'regist',
  data () {
    //regist
     var registPhone = (rule,value,callback) => {
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
    var registImgCheck = (rule,value,callback) => {
      if(value == '') {
        callback(new Error('请输入校验码'))
        this.getQueryNull()
      }else{
        this.getQueryNull()
      }
      callback()
    }
    var registPhoneCheck = (rule,value,callback) => {
      if(value == '') {
        callback(new Error('请输入手机验证码'))
        this.getQueryNull()
      }else{
        this.getQueryNull()
      }
      callback()
    }
    var registPsd = (rule,value,callback) => {
      var psdRule = /^(?=.*\d)(?=.*[A-Za-z])[\da-zA-Z]{6,16}$/
      if(value == '') {
        callback(new Error('请输入密码'))
        this.getQueryNull()
      }else if(!psdRule.test(value)) {
        callback(new Error('登录密码必须为6-20位数字和字母'))
        this.getQueryNull()
      }else{
        this.getQueryNull()
      }
      callback()
    }
    var registAgree = (rule,value,callback) => {
      if(!value) {
        // callback(new Error('您必须同意用户协议，才能进行注册~'))
        this.getQueryNull()
      }else{
        this.getQueryNull()
      }
      callback()
    }
    return {
      isMask:false,
      ruleData:'',
      time:120,
      isGetCode:false,
      isShow:false,
      checkImg:'',
      registForm:{
        phone:'',
        imgCheck:'',
        randomCode:'',
        phoneCheck:'',
        password:'',
        invitationCode:'',
        agree:''
      },
      isLoginBtn:false,
      rules2:{
        phone:[
          {validator:registPhone,trigger: 'blur'}
        ],
        imgCheck:[
          {validator:registImgCheck,trigger: 'blur'}
        ],
        password:[
          {validator:registPsd,trigger: 'blur'}
        ],
        phoneCheck:[
          {validator:registPhoneCheck,trigger: 'blur'}
        ],
        agree:[
          {validator:registAgree,trigger: 'change'}
        ]
      },
      registFormLength:true,
    }
  },
  methods: {
    togglePsd() {
      this.isShow = !this.isShow
    },
    getRegistRule() {
      var data = {
        category: '01',
        articleType:'01'
      }
      getRegistRule(data).then(res => {
        // console.log(res)
        if(res.state) {
          this.ruleData = res.data.dataList[0]
        }else {
          // console.log(res.msg)
        }
      })
    },
    getQueryNull:function(){
      if(this.registForm.phone != ''  && this.registForm.password != '' && this.registForm.phoneCheck!='' && this.registForm.agree  && this.registForm.imgCheck != ''){
        this.isLoginBtn = true;
      }else{
        this.isLoginBtn = false;
      }
     
    },
    regist(formName) {
      var data = {
        mobile: this.registForm.phone,
        code: this.registForm.phoneCheck,
        password: this.registForm.password,
        inviteId: this.registForm.invitationCode,
        channel:this.channel,
        device : this.device
      }
      var that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          that.service({
            url:"/register.json",
            method:"post",
            data:JSON.stringify(data),
          }).then(res =>{
            if(res.code == 200){
                this.$message({
                  message: '注册成功！',
                  type: 'success',
                  showClose: true,
                  duration: 3 * 1000
                })
               this.$router.push('/login')
              sessionStorage.setItem('mobile',this.registForm.phone)
              // this.$store.commit('isLogin') //切换为登录状态
            }else{
              that.$router.push('/login')
            }
          }).catch(res=>{
            console.log(res)
          })
          
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    getImgCheckCode(){
      var that = this;
      that.checkImg = 'http://tpi.maimailc.com/joy/pc/mobileCodeImage.json?mobile='+that.registForm.phone
    },
    getImgCheck(value) {
      
      var that = this;
      that.registForm.phone = value
      if(value.length == 11){
          that.registFormLength = false;
         that.checkImg = 'http://tpi.maimailc.com/joy/mobileCodeImage.json?mobile='+value
         //return;
      }
    },
    getPhoneCheck() {
      var data = {
        mobile: this.registForm.phone,
        imgCode: this.registForm.imgCheck,
        device : this.device
      }
      if(this.registForm.phone == ''){
         this.$message({
          message: '手机号码不可为空',
          type: 'error',
          showClose: true,
          duration: 3 * 1000
        })
        return
      }
      var interval = null;
      let that = this;
      that.service({
        url:"/register.json?action=code",
        method:"post",
        data:JSON.stringify(data)
      }).then(response => {
        if(response.code==200){
            that.$message({
              message: '短信发送成功',
              type: 'success',
              showClose: true,
              duration: 3 * 1000
            })
            that.isGetCode = true;
             interval = window.setInterval(() => {
            if ((this.time--) <= 0) {
              this.time = 120;
              this.isGetCode = false;
              window.clearInterval(interval);
            }
          }, 1000);
        }else if(response.code == 9999){
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
    getQueryUrl(name) {
      var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
      // console.log(window.location)
      var search = window.location.href
      var l = search.indexOf('?')
      var r = search.substr(l+1).match(reg);
      // console.log(r)
      if(r!=null)return  decodeURI(unescape(r[2]),"utf-8"); return null;
    }
  },
  mounted() {
    //this.getRegistRule()
    sessionStorage.setItem('active',5) //保证刷新时，active的状态
    //this.getImgCheck()
    var invitationCode = this.getQueryUrl('invitationCode') || '';
    if (invitationCode.length !==0) {
      this.registForm.invitationCode=invitationCode;
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->  
<style lang="scss" scoped>  
.header {
  height: 600px;
  background: url("../../images/login/banner.png") no-repeat;
  background-size: 100% 100%;
  .header-center{
    width:1000px;
    height:100%;
    margin:0 auto;
    position: relative;
  }
  // background-color: red;
  .login {
    width: 366px;
    height:492px;
    background-color: #fff;
    border-radius: 6px;
    position: absolute;
    top:0;
    right:0;
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
      width:80%;
      margin:30px auto 0;
      .el-form-item {
        margin-bottom: 18px;
        position: relative;
        img {
          position: absolute;
          z-index: 2;
          top: 0;
          right: 0;
          width: 40%;
          height: 42px;
          // background-color: red;
        }
        .getPhoneCheck {
          cursor: pointer;
          z-index: 2;
          color:#666;
          border:1px solid #999;
          width: 40%;
          text-align: center;
          border-radius: 5px;
          float: right;
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
        .rule {
          color:#0096ff;
          font-size: 12px;
        }
        .input{
          width:50%;
        }
      }
      .el-button {
        padding: 10px;
        margin: 5px auto 0;
        font-size: 16px;
        background-color: #e52921;
        border:none;
      }
      .forget {
        margin-top: 10px;
        text-align: right;
        a {
          padding: 5px;
          font-size: 14px;
          color: #e52921;
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
.ruleMask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0,0,0,.5);
  z-index: 999;
  .ruleBox {
    margin: 100px auto 0;
    overflow: auto;
    padding: 30px 15px 0;
    width: 800px;
    height: 400px;
    background-color: #fff;
  }
}
</style> 
<style>
.el-checkbox__input.is-checked .el-checkbox__inner{
  background-color: red;
    border-color: red;
}
</style>
 