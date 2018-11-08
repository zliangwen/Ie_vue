<!--账户设置-->
<template>
  <div class="setting">
    <div class="main">
      <!-- 标题 -->
      <div class="title">
        <i></i>
        <span>个人资料</span>
      </div>
      <div class="accDetail">
        <!-- 手机号 -->
        <div class="divList">
          <div class="left"><img src="../../../images/my/7.png" alt=""></div>
          <div class="middle">
            <p class="p1">手机号码：已绑定{{userMsg.mobile}}</p>
            <p class="p2">用于登录和接收通知，是您重要的身份凭证，如需修改，请拨打客服电话400-006-2140</p>
          </div>
        </div>
        <!-- 实名认证 -->
        <div class="divList">
          <div class="left">
            <img src="../../../images/my/7.png" alt="">
          </div>
          <div class="middle">
            <p class="p1" v-if="userMsg.realStatus == 0">实名绑卡：未认证</p>
            <p class="p1" v-if="userMsg.realStatus == 1">实名绑卡：已认证 {{realMsg.name}} {{realMsg.idNo}}</p>
            <p class="p2">实名绑卡是充值、提现和投资的必要条件</p>
          </div>
          <div class="right">
            <p @click="$router.push('/account/accountSettingCard')" v-if="userMsg.realStatus == 0">认证</p>
          </div>
        </div>
        <!-- 登录密码 -->
        <div class="divList">
          <div class="left">
            <img src="../../../images/my/7.png" alt="">
          </div>
          <div class="middle">
            <p class="p1">登录密码：已设置</p>
            <p class="p2">为了您的账户安全，建议定期更换</p>
          </div>
          <div class="right">
            <p class="raadyP" @click="$router.push('/account/accountSettingLogin')">修改</p>
          </div>
        </div>
        <!-- 交易密码 -->
        <div class="divList">
          <div class="left">
            <img src="../../../images/my/7.png" alt="">
          </div>
          <div class="middle">
            <p class="p1" v-if="userMsg.bizSet == 0">交易密码：未设置</p>
            <p class="p1" v-if="userMsg.bizSet == 1">交易密码：已设置</p>
            <p class="p2">为了保证账户资产安全，充值提现和投资需输入交易密码</p>
          </div>
          <div class="right">
            <p v-if="userMsg.bizSet == 0" @click="payClick(1)">设置</p>
            <p v-if="userMsg.bizSet == 1" class="raadyP" @click="payClick(2)">修改</p>
          </div>
        </div>
        <!-- 风险评估 -->
        <div class="divList">
          <div class="left">
            <img src="../../../images/my/7.png" alt="">
          </div>
          <div class="middle">
            <p class="p1" v-if="userMsg.riskResult == 0">风险测评：未测评</p>
            <p class="p1" v-if="userMsg.riskResult == 1">风险测评：已测评 保守型</p>
            <p class="p1" v-if="userMsg.riskResult == 2">风险测评：已测评 稳健型</p>
            <p class="p1" v-if="userMsg.riskResult == 3">风险测评：已测评 平衡型</p>
            <p class="p1" v-if="userMsg.riskResult == 4">风险测评：已测评 积极型</p>
            <p class="p2">为了保证账户资产安全，投资前需要先进行个人风险测评</p>
          </div>
          <div class="right">
            <p @click="$router.push('/account/accountSettingRisk')" v-if="userMsg.riskResult == 0" style=" cursor: pointer;">测评</p>
            <p class="raadyP" @click="$router.push('/account/accountSettingRisk')" v-if="userMsg.riskResult != 0" style=" cursor: pointer;">查看</p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
//import {upload,realNameSubmit,getRealNameStatus,getIsRealName,getAccountInfomation,getAddPaymentCode,getUpdatePaypassword,getUpdatePhone,getUpdatePhoneByIdCard,
        //getToBandCard,getUpdatePasswd,getEmailData,getUserinfoData,getPhoneData,getUserMsg,getImgCheck,getCheckCode,unBind} from '@/services/getDetail'
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm2.newpass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var JYPass = (rule, value, callback) => {
      var mobile = /^[0-9]*$/;
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.JYmima.reNewJYpassword !== '') {
          this.$refs.JYmima.validateField('reNewJYpassword');
        }
        callback();
      }
    };
    var JYPass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.JYmima.newJYpassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      type:'',
      realMsg:{},
      //xjf,实名认证
      realNameMask:true,
      isRealName:false, //通过页面信息接口获取次状态
      checkStatus:'',
      realNameForm: {
        realName:'',
        identityCard:'',
        imageFront:'',
        imageBack:'',
        imageHand:''
      },
      userMsg:'',
      accountStatus:'',
      //个人资料是否设置
      isUserDetail:false,
      //电子邮箱是否设置
      isEmail:false,
      //银行卡是否绑定
      isBank:false,
      //是否设置支付密码
      isPay :false,
      imageUrl:"",
      //切换手机号/身份证,1为手机号，2为身份证
      phoneOrCard:1,
      //是否实名认证，，这个实名验证勿删
      // isShiMing:null,
      // img_left:"../../../../static/imgs/ident_1.png",
      // img_right:"../../../../static/imgs/ident_2.png",
      // img_heard:"../../../../static/imgs/ident_3.png",
      //修改密码
      ruleForm2: {
        oldPass:'',
        newpass: '',
        checkPass: ''
      },
      JYmima: {
        //修改交易密码输入框手机号
        JYShouJi:'',
        //交易密码验证码
         JYCode:'',
        //交易密码
          newJYpassword: '',
        //新交易密码
          reNewJYpassword: ''
        },
        rules2: {
          newpass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        },
          rules3: {
          newJYpassword: [
            { validator: JYPass, trigger: 'blur' }
          ],
          reNewJYpassword: [
            { validator: JYPass2, trigger: 'blur' }
          ]
        },
        //以下是弹框弹出关闭变量
      bindEmail:false,
      amendPay:false,
      setAmendPay:false,
      dialogFormVisible: false,
      changePassword:false,
      changePayWord:false,
      dialogFormKaiqi:false,
      // 手机号
      phoneOldCs:true,
      phoneNewCs:true,
      identityCs:false,
      // tux验证码
      checkImg:'',
      checkImg1:'',
      checkPayImg:'',
      isGetCode:false,
      time:60,
      times:60,
      isGetCode1:false,
      //以上是弹框弹出关闭变量
      // 实名认证
      trueName:'',
      identityCard:'',
      form: {
        //邮箱
        eamil:'',
        //用户旧手机号
        oldPhone:'',
        //旧手机号验证码
        oldRandCode:'',
        // 新、旧手机号图形验证码
        imgCheck:'',
        imgCheck1:'',
        imgPayCheck:'',
        randomCode:'',
        //用户新手机号
        userPhone:'',
        //验证码
        randCode:'',
        //身份证持卡人姓名
        realName:'',
        //身份证卡号
        idCard:'',
        // 支付图形验证码
        imgPayCheck:'',
      },
      formLabelWidth: '120px'    
    }
  },
  methods:{
    //获取用户详情信息，进入页面立即执行
    getuser() {
      var that = this;
      that.service({
        url: "/user/index.json",
        method: "post",
        data: {
          device: that.device
        }
      }).then(res => {
        if (res.code == 200) {
          that.userMsg = res.data.user;
        }
      }).catch(res => {
        console.log(res)
      })
    },
    // 获取身份证信息
    getreal() {
      var that = this;
      that.service({
        url: "/user/real.json?action=info",
        method: "post",
        data: {
          device: that.device
        }
      }).then(res => {
        if (res.code == 200) {

          that.realMsg = res.data;
        }
      }).catch(res => {
        console.log(res)
      })
    },
    // 跳转到交易密码
    payClick(type) {
      this.$router.push({
        name: 'accountSettingPay',
        params: {
          type: type
        }
      })
    },
    changePhoneWay(){
      this.identityCs = false;
      this.phoneOldCs = true;
      this.phoneNewCs = true;
      this.phoneOrCard=1;
    },      
    //修改登录密码
    setPasswd(oldpasswd,newpasswd,checkPass){
      if(newpasswd==checkPass){
        var data={
          oldUserPasswd:oldpasswd,
          userPasswd:checkPass
        };
        getUpdatePasswd(data).then(res=>{
          // console.log(res);
          if(res.state){
            this.changePassword=false;
          if(res.state){
            this.$message({
                message: '密码设置成功',
                type: 'success'
              });
            };
          }  
        });
        this.changePassword = false;
      }else{
        alert("两次密码输入不一致");
      }
    },
    closeRealNameMask() {
      this.realNameForm.realName = ''
      this.realNameForm.identityCard = ''
      this.realNameForm.imageFront = ''
      this.realNameForm.imageBack = ''
      this.realNameForm.imageHand = ''
      this.realNameMask = false
    },
    //实名认证，图片上传
    handleFile1 (e) {
      let $target = e.target || e.srcElement
      let file = $target.files[0]
      this.photoCompress(file,150,'front')
    },
    handleFile2 (e) {
      let $target = e.target || e.srcElement
      let file = $target.files[0]
      this.photoCompress(file,150,'back')
    },
    handleFile3 (e) {
      let $target = e.target || e.srcElement
      let file = $target.files[0]
      this.photoCompress(file,150,'hand')
    },
    //图片转换base64
    photoCompress(file,w,target){
      var that = this;
      var ready=new FileReader();     
      ready.onload = (data) => {
        //console.log(data)
        let res = data.target || data.srcElement
        // console.log(res)
         var re = res.result  
         this.canvasDataURL(re,w,target)                 
      }
      ready.readAsDataURL(file);
    },
    //图片压缩
    canvasDataURL(re,w,target){       
        var that = this;
        var newImg=new Image();
        newImg.src=re;
        var imgWidth,imgHeight,offsetX=0,offsetY=0;
        newImg.onload=function(){
          var img=document.createElement("img");
          img.src=newImg.src;
          imgWidth=img.width;
          imgHeight=img.height;
          var canvas=document.createElement("canvas");
          canvas.width=w;
          canvas.height=w;
          var ctx=canvas.getContext("2d");
          ctx.clearRect(0,0,w,w);
          if(imgWidth>imgHeight){
              imgWidth=w*imgWidth/imgHeight;
              imgHeight=w;
              offsetX=-Math.round((imgWidth-w)/2);
          }else{
              imgHeight=w*imgHeight/imgWidth;
              imgWidth=w;
              offsetY=-Math.round((imgHeight-w)/2);
          }
          ctx.drawImage(img,offsetX,offsetY,imgWidth,imgHeight);
          var base64=canvas.toDataURL("image/jpeg",0.7);
          // console.log(base64)
          that.saveImg(target,base64)
        }
    },
    // 上传图片保存
    saveImg(target,dataUrl){
      // console.log(dataUrl)
      var data = {
        file:dataUrl
      }
      upload(data).then(res=>{
        // console.log(res)
        if(res.state){
          if(target == 'front') {
            this.realNameForm.imageFront = res.data.netUrl
          }else if(target == 'back') {
            this.realNameForm.imageBack = res.data.netUrl                     
          }else if(target == 'hand') {
            this.realNameForm.imageHand = res.data.netUrl
          }
          // console.log(this.realNameForm)
        }else {
          // console.log(res.msg)
        }
      })
    },
    // 实名认证，相关表单验证
    realNameSubmit(){
      var data = {
        realName:this.realNameForm.realName,
        identityCard:this.realNameForm.identityCard,
        imageFrontId:this.realNameForm.imageFront,
        imageBackId:this.realNameForm.imageBack,
        imageHandId:this.realNameForm.imageHand
      };
      //姓名验证
      if(!(/^[\u4e00-\u9fa5]{2,7}$/.test(this.realNameForm.realName))) {
        this.$message.error('请输入正确的姓名（2-7位汉字）');
      }else {
        // 身份证号验证
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
       
        if(!reg.test(this.realNameForm.identityCard)) {
          this.$message.error('请输入正确的身份证号(注意尾号是X的请用大写)');
        }else {
          realNameSubmit(data).then(res=>{
            // console.log(res)
            if (res.state) {
              this.$message({
                message: res.msg,
                type: 'success'
              });
              this.getRealNameStatus()
              //关闭弹窗，清空数据
              this.closeRealNameMask()
            }else {
              this.$message.error(res.msg);
            }
          })
        }
      }
    },
    // 上传成功，等待审核
    getRealNameStatus() {
      getRealNameStatus().then(res => {
        // console.log(res)
        if(res.state) {
          this.checkStatus = res.data.checkStatus
        }else {
          // console.log(res.msg)
        }
      })
    },
    //绑定银行卡
    setBankCard(){
      this.$confirm('此操作将注销开户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          unBind().then(res =>{
            //console.log(res)
            if(res.state){
              this.getuser();
              this.$message({
                type:"info",
                message:res.msg
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
    },
    //修改手机号
    changePhone(){
      //旧手机号码更改
      if(this.phoneOrCard==1){
        if(this.form.oldPhone!=this.form.userOldPhone){
            // alert("旧手机号请输入登录时的手机号");
            this.$message.error('旧手机号请输入登录时的手机号');
            return;
        };
        var data={
          oldPhone:this.form.oldPhone,
          oldRandCode:this.form.oldRandCode,
          userPhone:this.form.userPhone,
          randCode:this.form.randCode
        };
        if(this.form.oldPhone=='' ||this.form.oldRandCode==''||this.form.userPhone==''||this.form.randCode==''){
           this.$message.error('表单不能有空值');
          // alert("表单不能有空值");
        }else{
          getUpdatePhone(data).then(res=>{
            // console.log(res);
            if(res.state){
            this.$message({
                message: '恭喜你，手机号码更新成功',
                type: 'success'
              });
            };
            this.dialogFormVisible = false
          })
        }
      };
      //身份证更改手机号码
      if(this.phoneOrCard==2){
        //将切换变量复位，以保证下次进入页面时，是旧手机号更改页面提交
        this.phoneOrCard=1;
        var data={
          realName:this.form.realName,
          idCard:this.form.idCard,
          userPhone:this.form.userPhone,
          randCode:this.form.randCode
        };
        getUpdatePhoneByIdCard(data).then(res=>{
          // console.log(res);
          if(res.state){
            this.$message({
              message: '恭喜你，手机号码更新成功',
              type: 'success'
            });
          };
          this.dialogFormVisible = false
        })
      }
    },
    // 获取旧手机号图形验证码
    getoldImgCheck() {
      getImgCheck().then(res =>{
        // debugger;
        // console.log(res)
        if(res.state) {
          this.checkImg = 'data:image/png;base64,'+res.data.image
          this.form.randomCode = res.data.randomCode
        }else {
          this.$message(res.msg);
        }
      })
    },
    // 获取旧手机号短信验证码
    getoldPhoneCheck() {
      var data = {
        userPhone: this.form.oldPhone,
        setImgCode: this.form.imgCheck,
        randomCode: this.form.randomCode,
      }
      if(this.form.oldPhone!=this.form.userOldPhone){
       this.$message.error('旧手机号请输入登录时的手机号');
        // alert("旧手机号请输入登录时的手机号");
        return;
      };
      var interval = null;
      getCheckCode(data).then(res =>{
        // debugger;
        // console.log(res)
        if(res.state) {
          //短信发送成功，倒计时120秒 
          this.isGetCode = true;
          interval = window.setInterval(() => {
            if ((this.time--) <= 0) {
              this.time = 60;
              this.isGetCode = false;
              window.clearInterval(interval);
            }
          }, 1000);
          this.$message(res.msg);
        }else {
          this.$message(res.msg);
        }
      })
    },
    // 获取新手机号图形验证码
    getnewImgCheck() {
      getImgCheck().then(res =>{
        // debugger;
        // console.log(res)
        if(res.state) {
          this.checkImg1 = 'data:image/png;base64,'+res.data.image
          this.form.randomCode = res.data.randomCode
        }else {
          this.$message(res.msg);
        }
      })
    },
    // 获取新手机号短信验证码
    getnewPhoneCheck() {
      var data = {
        userPhone: this.form.userPhone,
        setImgCode: this.form.imgCheck1,
        randomCode: this.form.randomCode,
      }
      var interval = null;
      var phoneRule = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/
      if(!phoneRule.test(this.form.userPhone)){
        this.$message.error('请输入正确的手机号')
        return
      }
      getCheckCode(data).then(res =>{
        // debugger;
        // console.log(res)
        if(res.state) {
          //短信发送成功，倒计时120秒 
          this.isGetCode1 = true;
          interval = window.setInterval(() => {
            if ((this.times--) <= 0) {
              this.times = 60;
              this.isGetCode1 = false;
              window.clearInterval(interval);
            }
          }, 1000);
          this.$message(res.msg);
        }else {
          this.$message(res.msg);
        }
      })
    },
    // 获取修改交易密码的图形验证码
    getImgPayCheck() {
      getImgCheck().then(res =>{
        // debugger;
        // console.log(res)
        if(res.state) {
          this.checkPayImg = 'data:image/png;base64,'+res.data.image
          this.form.randomCode = res.data.randomCode
        }else {
          this.$message(res.msg);
        }
      })
    },
    // 获取修改交易密码的短信验证码
    getPayCheck() {
      var data = {
        userPhone: this.JYmima.JYShouJi,
        setImgCode: this.form.imgPayCheck,
        randomCode: this.form.randomCode,
      }
      var interval = null;
      getCheckCode(data).then(res =>{
        // debugger;
        // console.log(res)
        if(res.state) {
          //短信发送成功，倒计时120秒 
          this.isGetCode1 = true;
          interval = window.setInterval(() => {
            if ((this.time--) <= 0) {
              this.time = 120;
              this.isGetCode1 = false;
              window.clearInterval(interval);
            }
          }, 1000);
          this.$message(res.msg);
        }else{
          this.$message(res.msg);
        }
      })
    },
    //设置交易密码
    UpdatePaypassword(newJYpassword){        
      var data={
        paymentCode:newJYpassword
      }
      getAddPaymentCode(data).then(res=>{
        // console.log(res);
        if(res.state){
          this.$message({
            message: '恭喜你，支付密码设置成功',
            type: 'success'
          });
          this.getAccountInfomation();
        };
        this.setAmendPay = false;
      })
    },
    //修改交易密码
    setUpdatePaypassword(JYShouJi,JYCode,newJYpassword){    
      if(this.form.userOldPhone!=JYShouJi){ 
        this.$message.error('手机号输入不正确，请重新输入！');
          return;
      }
      var data={
        userPhone:JYShouJi,
        randCode:JYCode,
        newPasswd:newJYpassword
      }
      getUpdatePaypassword(data).then(res=>{
        // console.log(res);
        if(res.state){
          this.$message({
            message: '恭喜你，支付密码修改成功',
            type: 'success'
          });
        };
        this.amendPay = false;
      })
    },
    //是否实名认证
    getIsRealName() {
      getIsRealName().then(res => {
        // console.log(res)
        if(res.state) {
          if(res.data.flag) {
            this.isRealName = true
          }else {
            this.isRealName = false
          }
        }else {
          // console.log(res.msg)
        }
      })

    }
  },

  mounted(){
    // this.getIsRealName()
    // this.getRealNameStatus()
    // 进入页面立即获取用户资料
    this.getuser();
    this.getreal()
    // this.getoldImgCheck()
    // this.getnewImgCheck()
    // this.getImgPayCheck()
  }
}
</script>
<style lang="scss" scoped>  
  .setting{
      width:100%;
      margin:0 auto;
      background-color: #fff;
      overflow: hidden;
      .main{
        .title{margin: 10px 0 20px;i{background: #f22e3b;padding:10px 2px;}span{padding-left:20px;font-size:18px;}}
        .accDetail{
          padding:10px 0 30px 50px;
          .divList{
            overflow:hidden;padding:30px 0;border-bottom:1px solid #eee;
            .left{float:left;padding:6px 20px 0 0;}
            .middle{
              float:left;
              .p1{color:#666;font-size:16px;padding-bottom:5px;}
              .p2{color:#999;font-size:12px;}
            }
            .right{
              float:right;
              p{background:#f22e53;font-size:14px;color:#fff;padding:5px 15px;margin-top:5px;border-radius:5px;cursor: pointer;}
              .raadyP{background:#fff;color:#999;border:1px solid #d7d7d7;}
            }
          }
        }
        .body_content{
          background-color: #fff;
          color: #666;
          padding:20px 30px;
          font-size:14px;
            /*标题*/
            h3{
              font-size:16px;
              padding-bottom:10px;
              color:#000;
              a{
                color: #e52921;
                padding-bottom:10px;
              }
              div{
                margin:12px 0;
                overflow: hidden;
                .name_left{
                  float:left;
                  width:50%;
                  div{
                    float:left;
                    img{
                      /*padding-right:20px;*/
                      width:70px;
                      height:70px;
                      vertical-align: middle;
                      background-color:#ccc; 
                    }
                    p{
                      font-size:14px;
                      line-height:25px;
                    }
                  }
                }
                .name_right{
                  float:left;
                  width:30%;
                  padding-top:25px;
                  p{
                    font-size:14px;
                  }
                }
              }
            }
            /*个人信息*/
            .first_li{
              margin-top:20px;
              color:#666;
              .title{
                color:#000;
                border-bottom:1px solid #eee;
                padding-bottom:20px;
              }
              ul{
                li{
                  border-bottom:1px solid #eee;
                  padding:0 30px;
                  overflow: hidden;
                }
                .msg{
                  p{
                    float:left;
                    padding:0;
                    line-height:60px;
                    img{vertical-align: sub;padding-right: 5px;}
                  }
                  .p1{width:45%;}
                  .p2{width:45%;}
                  .p3{width:10%;color: #e52921;cursor:pointer;}
                }
              }
            }
          }
      }
  }
  /*弹窗*/
  .mask{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,.5);
    z-index: 999;
    .dialog{
      overflow: hidden;
      margin: 180px auto 0;
      width: 400px;
      padding: 40px 20px;
      background-color: #fff;
      border-radius: 6px;
    }
    .maskName{
      overflow: hidden;
      margin: 120px auto 0;
      margin-top: 20px;
      width: 600px;
      padding: 40px 20px;
      background-color: #fff;
      border-radius: 6px;
      .upLoad {
        .upImg {
          margin: 0 auto;
          float: left;
          margin-right: 10px;
          margin-left: 25px;
          label {
            display: inline-block;
            width: 230px;
            height: 146px;
            /*background-color: red;*/
            img{
              width:230px;
              height:150px;
            }
          }
          .label1{background: url("../../../images/ident_1.png")}
          .label2{background: url("../../../images/ident_2.png")}
          .label3{background: url("../../../images/ident_1.png")}
        }
      }
    }
    .maskRisk{
      overflow: hidden;
      margin: 120px auto 0;
      width: 640px;
      padding: 40px 20px;
      background-color: #fff;
      border-radius: 6px;
      .form_title{padding:0;}
      .dialog-footer{margin-top:30px;}
      .risk_list{
        p{width:100%;}
      }
    }
      .form_title{
        text-align: center;
        font-size:22px;
        color: #333;
        padding:0 0 30px;
      }
      .dialog-footer{padding-left:28px;}
  }
  /*图形验证码*/
  .imgCheck{
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;
    width: 100px;
    height: 42px;
  }
  /*验证码*/
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
</style> 
<style lang="scss">
.el-button--primary.is-plain{
  color:white;
}
.setting{
  .el-dialog{
    width: 390px;
  }
  .el-dialog__title{
      font-size: 22px;
  }
  .el-form-item__content{
    width: 305px;
    margin: 0px auto !important;
  }
  .el-input{
    width: auto;;
  }
  .el-input__inner{
      border: 0px;
  }
  .el-button--primary{
      height: 45px;
      width: 92%;
      background-color: red;
      border-color: red;
  }
  .el-button--primary:focus{
    background-color: red;
    border-color: red;
  }
  .el-button--primary:hover{
    background-color: red;
    border-color: red;
  }
  .TelCSS{
    border: 1px#C0C0C0 solid;
    border-radius: 5px;
  }

  .yanzhengfangshi{
    text-decoration: underline;
    color: #B0B0B0;
    padding-left: 15px
  }
  .yanzhengma{
      font-size: 15px;
    padding-left: 25px;
    color: red;
  }
  .el-dialog__footer{
    margin-top: -25px;
  }
  .SignedConditionsNeirong{
    line-height: 28px !important;
    font-size: 16px;
      color: #A0A0A0 !important;
  }
  .UlLi{
    padding: 0px 1px !important;
    border: none !important;
    height: 28px ;
    font-size: 16px;
      color: #A0A0A0 !important;
  }
  .H3Name{
    font-size: 35px !important;
    color: #A0A0A0 !important;
  }
  .SignedConditionsH3Name{
    width: 180px;
    border: 1px dashed;
    border-radius: 3px;
    margin: 0 auto;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .dialog-footer1{margin-left:18px;}
  .dialog-footer1>.el-button{width:95%;}
  .el-dialog__footer {
      padding: 10px 12px 20px;
  }
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    float:left;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 220px;
    height: 140px;
    line-height: 140px;
    text-align: center;
    background-image: url("../../../images/ident_1.png")
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
   
  }
    .GuanBi{
      cursor:default;
    float:right !important;
    margin-top:-40px;
    margin-right:5px
  }
</style>
  