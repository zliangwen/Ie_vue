<template>
  <div id="accountDetail">
    <div v-if="isAll==1">
      <div class="detailHead">
        <div class="accountMsg">
          <img :src="avatar" alt="" class="headImg" @click="isAll = 4" >
          <div class="user">
            <p class="up1">尊敬的{{user.mobile}}，您好</p>
            <p class="up2">欢迎使用麦麦理财</p>
            <ul class="topUl">
              <router-link v-for="(item,index) in userList" :key="index" tag="li" :to="item.target">
                <div>
                  <img :src="item.img" alt="" style="display:inline-block">
                </div>
                <p>{{item.title}}</p>
              </router-link>
            </ul>
          </div>
        </div>
        <!-- <div @click="route('/account/accountSetting')" class="accountMsg" v-if="userMsg.userHeadPortrait==''">
              <img src="../../../assets/imgs/P2PLogo (2).png" alt="" style="background-color:white">
              <div class="user">
                <p>{{userMsg.userPhone}}</p>
              </div>
            </div> -->
      </div>
      
      <div class="detailBody">
        <div class="first">
          <div class="title">
            <i></i>
            <span>账户总览</span>
          </div>
          <ul class="clearfix">
            <li>
              <p>我的资产（元）</p>
              <div>{{allMoney|tofixed}}</div>
            </li>
            <li>
              <p>已收收益（元）</p>
              <div>{{account.repaidInt|tofixed}}</div>
            </li>
            <li>
              <p>待收收益（元）</p>
              <div>{{account.intBearing|tofixed}}</div>
            </li>
          </ul>
        </div>
      
        <div class="second">
          <div class="title">
            <i></i>
            <span>账户资金</span>
            <span class="spMore" @click="$router.push('/account/moneyRecord')">查看资金记录>></span>
          </div>
          <div class="thirdDetail">
            <div class="left">
              <p>可用余额（元）</p>
              <div>{{account.balance|tofixed}}</div>
            </div>
            <div class="right">
              <span @click="isPay()">充值</span>
              <span @click="isFund()">提现</span>
            </div>
          </div>
        </div>
      
        <div class="third">
          <div class="title">
            <i></i>
            <span>资产分布</span>
          </div>
          <ul>
            <li>
              <p style="width:115px;">投资中本金</p>
              <p>（元）:</p>
              <span style="padding-left:5px;float:left;display:block">
                <p>{{account.inInvestMoney|tofixed}}</p>
              </span>
            </li>
            <li>
              <p style="width:115px;">账户余额</p>
              <p>（元）:</p>
              <span style="padding-left:5px;float:left;display:block">
                <p>{{account.balance|tofixed}}</p>
              </span>
            </li>
            <li>
              <p style="width:115px;">投资中冻结资金</p>
              <p>（元）:</p>
              <span style="padding-left:5px;float:left;display:block">
                <p>{{account.freezeInvest|tofixed}}</p>
              </span>
            </li>
            <li>
              <p style="width:115px;">提现中冻结资金</p>
              <p>（元）:</p>
              <span style="padding-left:5px;float:left;display:block">
                <p>{{account.freezeCash|tofixed}}</p>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 上传头像 -->
    <div v-if="isAll==4">
      <div class="title">
        <i></i>
        <span>上传头像</span>
      </div>
      <div class="cashValue">
        <div class="upImg" style="position:relative">
          <img v-if="imageUrl" :src="imageUrl" class="avatar" >
          <i v-else class="el-icon-plus" style="text-align:center;line-height:176px;width:176px;font-size:20px;color:#999"></i>
          <input type="file" id="inputClick" style="opacity:0;position:absolute;top:0;left:0;width:100%;height:100%;" @change="handleFile"/>
        </div>
         <div class="buttons">
            <el-button class="close" type="danger" @click="cancel()">取 消</el-button>
            <el-button class="submit" type="danger" color="#e52921" @click="uploadImg">上传</el-button>
          </div>
      </div>
    </div>
    <!-- 充值 -->
    <div v-if="isAll==2">
      <div class="title">
        <i></i>
        <span>充值</span>
      </div>
      <div class="cashValue">
        <el-form :rules="rules" ref="formRecharge">
          <el-form-item label="可用余额：">
            <p class="money"><span>{{account.balance|tofixed}}</span>元</p>
          </el-form-item>
          <!-- <el-form-item label="银行名称：" class="Myselect">
            <el-select v-model="form.bankId" filterable placeholder="请选择优先银行名称">
              <el-option v-for="bank in BankList" :key='bank.id' :label="bank.bankName" :value="bank.bankCode">
              </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="充值金额：" >
            <el-input v-model="form.money" placeholder="请输入充值金额" ></el-input>
          </el-form-item>
          <el-form-item label="交易密码：" >
            <el-input v-model="form.payPsd" placeholder="请输入交易密码" type="password" autocomplete="new-password" maxlength="6"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="close" type="danger" @click="cancel()">取 消</el-button>
            <el-button class="submit" type="danger" color="#e52921" @click="rechargeSubmit(form)">确认充值</el-button>
          </el-form-item>
          <div class="tishi">
            <p>温馨提示：</p>
            <p>网上银行充值过程中请耐心等待，充值成功后金额才能打入您的账户，如有问题，请与我们联系； 认证支付需要先绑定银行卡</p>
          </div>
        </el-form>
      </div>
    </div>

    <!-- 提现 -->
    <div v-if="isAll == 3">
      <div class="title">
        <i></i>
        <span>提现</span>
      </div>
      <div class="cashValue">
        <el-form>
          <el-form-item label="可用余额：">
            <p class="money">
              <span>{{account.balance|tofixed}}</span>元</p>
          </el-form-item>
          <!-- <el-form-item label="银行名称：" class="Myselect">
            <el-select v-model="form.bankId" filterable placeholder="请选择优先银行名称">
              <el-option v-for="bank in BankList" :key='bank.id' :label="bank.bankName" :value="bank.bankCode">
              </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="提现金额：">
            <el-input v-model="form.money" placeholder="请输入提现金额"></el-input>
          </el-form-item>
          <el-form-item label="交易密码：">
            <el-input v-model="form.payPsd" placeholder="请输入交易密码" type="password" autocomplete="new-password" maxlength="6"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="close" type="danger" @click="cancel()">取 消</el-button>
            <el-button class="submit" type="danger" color="#e52921" @click="withdrawSubmit(form)">确认提现</el-button>
          </el-form-item>
          <div class="tishi">
            <p>温馨提示：</p>
            <p>为了您的资金安全，确保您的提现银行卡号和您进行实名认证的姓名一致； 正常工作日16点前提现当日到账，16点以后将在T+1个工作日到达银行卡； 如遇双休日或节假日延至下个工作日到达银行卡具体到达银行卡时间以银行时间为准</p>
          </div>
        </el-form>
      </div>
    </div>
   
  </div>
</template>
<script>
export default {
  name: 'account',
  data () {
    //withdraw
    var withdrawMoney = (rule,value,callback) => {
      if(value == '') {
        callback(new Error('请输入充值金额'))
      }else if(value <1) {
        callback(new Error('最小提现金额1元'))        
      }
      callback()
    }
    var withdrawCard = (rule,value,callback) => {
      if(value == '') {
        callback(new Error('请选择提现银行卡'))
      }
      callback()
    }
    //recharge
    var rechargeMoney = (rule,value,callback) => {
      if(value == '') {
        callback(new Error('请输入充值金额'))
      }else if(value <1) {
        callback(new Error('最小充值金额1元'))        
      }
      callback()
    }
    return {
      userList:[
        { img: require('../../../images/my/1.png'), title: '银行卡', target: '/account/accountSettingCard' },
        { img: require('../../../images/my/2.png'), title: '登录密码', target: '/account/accountSettingLogin' },
        { img: require('../../../images/my/3.png'), title: '个人资料', target: '/account/accountSetting' },
        // { img: require("@/assets/imgs/my/4.png"), title: '风险评估', target: '' },
      ],
      user:{},
      account:{},
      avatar:require('../../../images/people.png'),
      isAll:1,
      // 充值
      isRecharge: false,
      isWithdraw: false,
      form:{
        money:'',
        payPsd:'',

      },
      suForm:{},
      userMsg:'',
      moneyMsg:'',
      popularity:'',
      isMask:false,
      isSign: false,
      hasCard: false,
      rechargeForm:{
        money:'',
        card:''
      },
      rules:{
        money:[
          { required: true,validator:rechargeMoney,trigger: 'blur'}
        ]
      },
      withdrawForm:{
        money:'',
        card:''
      },
      rules1:{
        money:[
          {validator:withdrawMoney,trigger: 'blur'}
        ],
        card:[
          {validator:withdrawCard,trigger: 'blur'}
        ]
      },
      withdrawRuleData:'',
      cardList:[],
      time: new Date(),
      timePickData:'',
      tempForm:{},
      subForm:{},
      isTiXian:1,
      bankList:[],
      bankValue:"",
      imageUrl:"",
      haveImg:false,
      allMoney:''
    }
  },
  methods:{
    //上传头像
    handleFile(e) {
        var that = this;
        let target = e.target || e.srcElement
        let file = target.files[0]
          var reader = new FileReader()
            reader.onload = (data) => {
              let res = data.target || data.srcElement
              let img = new Image()
              img.onload = () => {
                // 回调更新父组件数据;
                that.imageUrl = res.result
              }
              img.src = res.result
            }
            reader.readAsDataURL(file)
    
    },
    uploadImg(){
      let img = this.imageUrl.split(',')
      if(!this.imageUrl){
         this.$message({
            message: '请选择图片再上传',
            type: 'error',
            showClose: true,
            duration: 3 * 1000
          })
          return;
      }
      this.service({
        url:"/user/avatar.json",
        method:"post",
        data:{
          imageStr:img[1]
        }
      }).then(res =>{
        if(res.code == 200){
          this.isAll = 1;
          this.getUser();
          this.$message({
            message: '图片上传成功',
            type: 'success',
            showClose: true,
            duration: 3 * 1000
          })
        }
      }).catch(res=>{
        console.log(res)
      })
    },
    // 初始化个人中心数据
    getUser() {
      var that = this;
      that.service({
        url: "/user/index.json",
        method: "post",
        data: {
          device: that.device
        }
      }).then(res => {
        if (res.code == 200) {
          that.user = res.data.user;
          that.account = res.data.account;
          if(res.data.avatar != ''){
            that.avatar = res.data.avatar;
          }
          that.allMoney = parseFloat((res.data.account.balance + res.data.account.freezeCash + res.data.account.inInvestMoney).toFixed(2))  
        }
      }).catch(res => {
        console.log(res)
      })
    },
    // 充值出现
    isPay() {
      var that = this;
      that.isAll = 2;
    },
    // 充值取消
    cancel(){
      this.isAll = 1;
    },
    // 提现出现
    isFund() {
      var that = this;
      that.isAll = 3;
    },
    // 提现
    route(target) {
      this.$router.push(target)
    },
    rechangeBank(){
      rechangeBank().then(res =>{
        if(res.state){
          this.bankList = res.data;
        }
      })
    },
    changeBank(item){

      this.bankValue=item
    },
   
    //充值弹窗
    rechargeMask() {
      this.getIsRealName('recharge')
    },
    //充值/充值未假
    rechargeSubmit(formName) {
        var data = {
          money: formName.money,
          bizPwd:formName.payPsd,
          device:this.device
        }
        if(formName.money == ''){
           this.$message({
            message: '请输入充值金额(不能为0)',
            type: 'error',
            showClose: true,
            duration: 3 * 1000
          })
          return
        }
        if(formName.payPsd == ''){
           this.$message({
            message: '请输入交易密码',
            type: 'error',
            showClose: true,
            duration: 3 * 1000
          })
         return
        }

      // alert(data.tradeAmt);
      var that = this;
      that.service({
        url:"/user/account/charge.json?action=charge&v=2",
        method:"post",
        data:JSON.stringify(data)
      }).then(res =>{
        console.log(res)
        if (res.code == 200){
          this.$message({
            message: '充值成功',
            type: 'success',
            showClose: true,
            duration: 3 * 1000
          })
        } else {
          this.$message({
            message: res.resultMsg,
            type: 'error',
            showClose: true,
            duration: 3 * 1000
          })
        }
      }).catch(res=>{
        console.log(res)
      })
    },
    //提现
    withdrawSubmit(formName) {
      if(formName.money == ''){
        this.$message({
            message: '请输入提现金额',
            type: 'error',
            showClose: true,
            duration: 3 * 1000
          })
          return;
      }
      if(formName.money > this.account.balance){
          this.$message({
            message: '可提现金额不足',
            type: 'error',
            showClose: true,
            duration: 3 * 1000
          })
          return;
      }
      if(formName.payPsd == ''){
          this.$message({
            message: '请输入交易密码',
            type: 'error',
            showClose: true,
            duration: 3 * 1000
          })
          return;
      }
      var that= this;
      var data={
        money:formName.money,
        bizPwd:formName.payPsd,
        device:this.device
      }
      that.service({
        url:"/user/account/cash.json?action=apply",
        method:"post",
        data:JSON.stringify(data),
      }).then(res=>{

        if(res.code == 203){
            this.$message({
              message: '提现申请已提交',
              type: 'success',
              showClose: true,
              duration: 3 * 1000
            })
            that.isWithdraw = false;
            that.isAll = 1;
            that.getUser()
            that.form.money='';
            that.form.payPsd = '';
        }else if(res.code == 9999){
            this.$message({
              message: res.resultMsg,
              type: 'error',
              showClose: true,
              duration: 3 * 1000
            })
        }else if(res.code == 8004){
          this.$message({
              message: res.resultMsg,
              type: 'error',
              showClose: true,
              duration: 3 * 1000
            })
        }
      }).catch(res=>{
        console.log(res)
      })
    },
    getUserMsg() {
      getUserMsg().then(res => {
        // console.log(res)
        if(res.state) {
          this.userMsg = res.data
        }else {
          // console.log(res.msg)
          // this.$router.push('/login')
        }
      })
    },
    getMoneyMsg() {
      getMoneyMsg().then(res => {
        // console.log(res)
        if(res.state) {
          this.moneyMsg = res.data
        }else {
          // console.log(res.msg)
        }
      })
    },
    //实名认证判断
    getIsRealName(i) {
      getIsRealName().then(res => {
        // console.log(res)
        if(res.data.flag) {
          this.getCardList(i);
        }else {
          this.$message({
            message: '您尚未实名认证,前往账号设置进行验证！',
            type: 'warning'
          });
          setTimeout(()=>{
            this.$router.push('/account/accountSetting')
          },2000)
        }
      })
    },
    //实名认证后才能获取是否开户认证
    getCardList(i) {
      isOpenAccount().then(res=>{
        // console.log(res);
        // debugger;
        if(!res.data.flag){
           this.$message({
              message: '您尚未开户,前往开户页面！',
              type: 'warning'
            });
            setTimeout(()=>{
              this.$router.push('/account/accountSettingOpening')
            },2000)
        }else {
          if(i=='recharge'){
            this.isRecharge=true;
          }
          if(i=='withdraw'){
            this.isWithdraw=true;
          }
         
        }
      })
      // getCardList().then(res => {
      //   // console.log(res)
      //   if(res.state) {
      //     if(res.data.dataList == 0) {
      //       this.$message({
      //         message: '您尚未绑定银行卡,前往绑卡页面！',
      //         type: 'warning'
      //       });
      //       setTimeout(()=>{
      //         this.$router.push('/account/accountSettingCard')
      //       },2000)
      //     }else {
      //       if(i == 'recharge') {
      //         this.isRecharge = true
      //       }else {
      //         this.isWithdraw = true
      //       }
      //       this.cardList = res.data.dataList
      //     }
      //   }else {
      //     // console.log(res.msg)
      //     sessionStorage.removeItem('accesstoken')
      //     this.$message({
      //       message: res.msg,
      //       type: 'warning'
      //     });
      //     setTimeout(()=>{
      //       this.$store.commit('isLogout') //切换为登出状态
      //       this.$store.commit('changeActive',5)
      //       this.$router.push('/login')
      //     },2000)
      //   }
      // })
    },
    getWithdrawRule() {
      getWithdrawRule().then(res => {
        if(res.state) {
          this.withdrawRuleData = res.data
        }else {
          // console.log(res.msg)
        }
      })
    },
    //日历数据
    getTimePickData() {
      var year = this.time.getFullYear()
      var month = this.time.getMonth()+1
      var day = this.time.getDate()
      if(month < 10) {
        month = '0' + month
      }
      if(day <10) {
        day = '0' + day
      }
      var pickTime = year + '-' + month + '-' + day
      var data = {
        planDate: pickTime
      }
      getTimePickData(data).then(res => {
        // console.log(res)
        if(res.state) {
          this.timePickData = res.data
        }
      })
    },
    initData() {
      // this.getUserMsg()
      // this.getMoneyMsg()
      // this.getWithdrawRule()
      // this.getTimePickData()
      this.getUser()
    }
  },
  filters: {
    fixed:function(val,num) {
      return parseFloat(val).toFixed(num)
    },
    tofixed: function (val) {
      if (val != '' || val != null) {
        return parseFloat(val).toFixed(2)
      }
    },
    timeRule(time,status) {
      var year = time.getFullYear()
      var month = time.getMonth()+1
      var day = time.getDate()
      if(month < 10) {
        month = '0' + month
      }
      if(day <10) {
        day = '0' + day
      }
      if(status == '1') {
        return year + '-' + month
      }else {
        return year + '-' + month + '-' + day        
      }
    }
  },
  mounted() {
    if(decodeURIComponent(this.$route.query.i)=='去充值'){
      this.isAll = 2
    }
    var accesstoken = sessionStorage.getItem('accesstoken');
    if(accesstoken != null){
        this.initData()
    }else{
      setTimeout(()=>{
        this.$router.push('/login')
      },5)
    }
   
  }
}
</script>
<style lang="scss" scoped>
$exColor: #e52921;
$fontColorLight: #888;
.detailHead {
  margin-left: 34px;
  padding: 38px 0;
  overflow: hidden;
  border-bottom:1px solid #f4f4f4;
    .accountMsg {
      cursor: pointer;
      padding: 5px 0;
      float: left;
      .headImg {
        float: left;
        width: 74px;
        height: 74px;
        margin-right: 15px;
        border-radius: 50%;
        background-color: #ccc;
      }
      .user {
        font-size: 14px;
        float:left;
        .up1{font-size:16px;font-weight:600;}
        .up2{font-size:14px;color:#999;padding:10px 0 20px;border-bottom:1px solid #eee;}
        .topUl li{
          float:left;
          text-align:center;
          width:90px;
          padding-top:20px;
        }
      }
    }
    .signIn {
      width: 290px;
      float: left;
      margin-top: 15px;
      padding: 5px 0;
      border-right: 1px solid #f4f4f4;      
      text-align: center;
      .signInIcon {
        position: absolute;
        color: $exColor;
        padding: 0 3px;
        border-radius: 6px;
	      border: solid 1px $exColor;
        font-size: 16px;
        margin-left: -55px;
      }
      .signInIconed {
        position: absolute;
        color: $fontColorLight;
        padding: 0 3px;
        border-radius: 6px;
	      border: solid 1px $fontColorLight;
        font-size: 16px;
        margin-left: -60px;
      }
      p {
        padding-left: 40px;
        margin-bottom: 10px;
      }
      span {
        cursor: pointer;
        margin: 0 5px;
        font-size: 14px;
      }
    }
    .money {
      width: 290px;
      float: left;
      text-align: center;
      margin-top: 15px;
      p {
        text-align: center;
        margin-bottom: 10px;
      }
      .btnMoney {
        cursor: pointer;
        // padding: 14 14px;
        padding-left: 14px;
        padding-right: 14px;
        padding-top: 4px;
        padding-bottom: 4px;
        border:1px solid $exColor;
        border-radius: 6px;
      }
      .recharge {
        color: #fff;
        background-color: $exColor;
      }
    }
}
.title i{background: #f22e3b;padding:0px 2px;}
.title span{padding-left:20px;font-size:18px;}
.title .spMore{font-size:14px;color:#999;float:right;cursor: pointer;}
.detailBody .first ul{padding:50px 0 60px;}
.detailBody .first li{flex:1;text-align: center;float:left;width:33.3%;p{color:#666;font-size:16px;}div{color:#666;font-size:25px;font-weight: 600;padding-top:30px;}}
.detailBody .second .thirdDetail{padding:50px 0 50px 60px;overflow: hidden;}
.detailBody .second .thirdDetail .left{float:left;p{color:#666;font-size:16px;}div{color:#666;font-size:25px;font-weight: 600;padding-top:20px;}}
.detailBody .second .thirdDetail .right{float:right;margin-top:33px;}
.detailBody .second .thirdDetail .right span{font-size:16px;padding:10px 40px;border:1px solid #f22e3b;color:#f22e3b;border-radius:5px;cursor: pointer;}
.detailBody .third ul{padding:50px 0 60px 60px;}
.detailBody .third ul li{line-height:30px;clear: both;}
.detailBody .third ul li p{font-size:16px;color:#666;float:left;}
.cashValue{padding:40px 70px 20px;}
.cashValue .money span{color:#f22e3b;}
.cashValue .tishi{color:#999;font-size:12px;line-height:25px;}
.el-input {position: none;font-size: 14px;display: inline-block;width: 30%;}
.el-button--danger {color: #fff;background-color: #f22e3b;border-color: #f22e3b;}
.upImg{
  width:178px;
  height:178px;
  border:1px dashed #eee;
  cursor: pointer;
  position: relative;
}
.buttons{
  margin-top:20px;
}
</style>
<style>
   .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
