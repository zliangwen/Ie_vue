<template>
  <div class="openKH">
    <!-- 点击添加银行卡 -->
    <div class="addCard" v-if="card1">
      <div class="title">
        <i></i>
        <span>我的银行卡</span>
      </div>
      <div class="addDetail"  v-if="haveBank == 0">
        <div class="top">
          <p>1. 目前及支持全国二代身份证认证；</p>
          <p>2. 实名认证的姓名必须和绑定的银行卡开户名一致，否则无法提现。</p>
        </div>
        <div class="bottom">
          <img src="../../../images/my/5.png" alt="" @click="addCard1()">
        </div>
       
      </div>
      <div class="addDetail" v-if="haveBank == 1">
        <div class="top">
          <p>1. 资金同卡进出，只支持一张银行卡用于快捷支付和提现</p>
          <p>2. 如您需要更换银行卡，请联系客服热线400-006-2140。</p>
        </div>
        <div class="" style="width:400px;position:relative" >
            <div class="title clearfix" style="margin-bottom:10px;">
              <div class="title-right" style="position:relative">
                <img :src="backInfo.imgUrl" alt="">
                <!-- <span class="name">{{backInfo.bank}}</span> -->
                <p class="cardNo" style="position:absolute;left:70px;bottom:50px;color:#fff;font-size:16px;">**** &nbsp;&nbsp;   **** &nbsp;&nbsp;**** &nbsp;&nbsp; {{backInfo.cardNo}}</p>
                <!-- <p>储蓄卡</p> -->
              </div>
            </div>
            
        </div>
        <p style="margin-top:10px;cursor: pointer;font-size:16px;" @click="sureBank">解绑银行卡</p>
      </div>
    </div>
    <!-- 绑定银行卡 -->
    <div class="bindCard" v-if="card2">
      <div class="title">
        <i></i>
        <span>绑定银行卡</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px" status-icon :rules="rules2">
        <el-form-item label="姓名">
          <!-- <el-input v-model="form.name"></el-input> -->
          <span>{{userInfoCard.name}}</span>
        </el-form-item>
        <el-form-item label="身份证号">
          <!-- <el-input v-model="form.idCode"></el-input> -->
          <span>{{userInfoCard.idNo}}</span>
        </el-form-item>
        <el-form-item label="银行名称" class="Myselect">
          <el-select v-model="form.bankId" filterable placeholder="请选择优先银行名称">
            <el-option v-for="bank in BankList" :key='bank.id' :label="bank.name" :value="bank.name">
            </el-option>
          </el-select>
          <span v-if="form.bankName==''" style="color:red">请优先选择银行名称</span>
        </el-form-item>
        <el-form-item label="银行卡号">
          <el-input v-model="form.cardNo" placeholder="请输入银行卡号"></el-input>
        </el-form-item>
        
        <el-form-item label="手机号">
          <el-input v-model="form.phone" placeholder="请输入银行预留手机号"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="form.msgCode" placeholder="请输入短信验证码" style="width:25%"></el-input>
          <el-button :plain="true" v-if="yzm" @click="bindCard(form)" style="margin-top:0;width:120px;margin-left:10px;">获取验证码</el-button>
          <el-button type="danger" :plain="true" v-if="!yzm" style="margin-top:0;width:120px;margin-left:10px;">已发送({{time}}s)</el-button>

        </el-form-item>
        <!-- <el-form-item label="交易密码" prop="tradePassword">
                    <el-input type="password" v-model="form.tradePassword" auto-complete="off" placeholder="请输入六位数字密码"></el-input>
                </el-form-item>
                <el-form-item label="确认交易密码" prop="reTradePassword">
                    <el-input type="password" v-model="form.reTradePassword" auto-complete="off"></el-input>
                </el-form-item> -->

        <el-form-item>
          <!-- <el-button type="info" @click="isAmend=true" v-if="!isAmend">修改</el-button> -->
          <el-button type="danger" :plain="true" v-if="!isAmend" @click="bindCardSubmit(form)">提交</el-button>
        </el-form-item>
        <div class="tishi">
          <p>温馨提示：</p>
          <p>解绑银行卡将影响您的资金安全及提现操作，请谨慎确认您是否要解绑该银行卡</p>
        </div>
      </el-form>
    </div>
    <!-- 添加成功 -->
    <div class="sccessCard" v-if="card3">
      <div class="title">
        <i></i>
        <span>我的银行卡</span>
      </div>
      <div class="addDetail">
        <div class="top">
          <p>1. 资金同卡进出，只支持一张银行卡用于快捷支付和提现；</p>
          <p>2. 如您需要更换银行卡，请联系客服热线400-xxx-xxxx</p>
        </div>
        <div class="Sbottom">
          <img src="../../../images/my/6.png" alt="">
          <div style="padding-top:10px;font-size:16px;" @click="addCard3()">解绑银行卡</div>
        </div>
      </div>
    </div>
    <!-- 解绑银行卡 -->
    <div class="cancelCard" v-if="card4">
      <div class="title">
        <i></i>
        <span>解绑银行卡</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px" status-icon :rules="rules2">
        <el-form-item label="银行卡号">
          <span>**** **** **** {{backInfo.cardNo}}</span>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name" placeholder="请输入您的真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="form.idCode" placeholder="请输入您的身份证号码"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phone" placeholder="请输入银行预留手机号"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="form.msgCode" placeholder="请输入短信验证码" style="width:25%"></el-input>
          <el-button :plain="true" v-if="yzm" @click="saveyzm(form)" style="margin-top:0;width:120px;margin-left:10px;">获取验证码</el-button>
          <el-button type="danger" :plain="true" v-if="!yzm" style="margin-top:0;width:120px;margin-left:10px;">已发送({{time}}s)</el-button>

        </el-form-item>
        <el-form-item>
          <!-- <el-button type="info" @click="isAmend=true" v-if="!isAmend">修改</el-button> -->
          <el-button type="danger" :plain="true" v-if="!isAmend" @click="save(1,form)">提交</el-button>
        </el-form-item>
        <div class="tishi">
          <p>温馨提示：</p>
          <p>解绑银行卡将影响您的资金安全及提现操作，请谨慎确认您是否要解绑该银行卡</p>
        </div>
      </el-form>
    </div>
    <!-- 实名认证 -->
    <div class="realName" v-if="card5">
      <div class="title">
        <i></i>
        <span>实名认证</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px" status-icon :rules="rules2">
        <el-form-item label="姓名">
          <el-input v-model="form.name" placeholder="请输入您的真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="form.idCode" placeholder="请输入您的身份证号码"></el-input>
        </el-form-item>
        <el-form-item label="银行名称" class="Myselect">
          <el-select v-model="form.bankId" placeholder="请选择优先银行名称" @change="choosebank">
            <el-option v-for="bank in BankList" :key='bank.id' :label="bank.name" :value="bank.name">
            </el-option>
          </el-select>
          <!-- <span v-if="form.bankName==''" style="color:red">请优先选择银行名称</span> -->
        </el-form-item>
        <el-form-item label="银行卡号">
          <el-input v-model="form.cardNo" placeholder="请输入银行卡号"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phone" placeholder="请输入银行预留手机号"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="form.msgCode" placeholder="请输入短信验证码" style="width:25%"></el-input>
          <el-button :plain="true" v-if="yzm" @click="shiming(form)" style="margin-top:0;width:120px;margin-left:10px;">获取验证码</el-button>
          <el-button type="danger" :plain="true" v-if="!yzm" style="margin-top:0;width:120px;margin-left:10px;">已发送({{time}}s)</el-button>

        </el-form-item>
        <el-form-item>
          <!-- <el-button type="info" @click="isAmend=true" v-if="!isAmend">修改</el-button> -->
          <el-button type="danger" :plain="true" v-if="!isAmend" @click="shimingSubmit(form)">提交</el-button>
        </el-form-item>
        <div class="tishi">
          <p>温馨提示：</p>
          <p>解绑银行卡将影响您的资金安全及提现操作，请谨慎确认您是否要解绑该银行卡</p>
        </div>
      </el-form>
    </div>
    <m-dialog type="error" title="解绑银行卡" content="解绑银行卡将影响您的资金安全及提现操作，请谨慎确认您是否要解绑该银行卡~" v-model="dialog" @error="errorClick" errorText="解绑"></m-dialog>
  </div>
</template>
<script>

import mDialog from '../../../components/vue_dialog/dialog'
  export default {
    name: 'account',
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.form.reTradePassword !== '') {
            this.$refs.form.validateField('reTradePassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.tradePassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        rules2: {
          tradePassword: [
            { validator: validatePass, trigger: 'blur' }
          ],
          reTradePassword: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        },
        //表单内容
        form: {
          name:'',
          idCode: '',
          phone:'',
          bankId: '',
          cardNo: '',
          msgCode: "",
          branchBankId: '',
          tradePassword: '',
          reTradePassword: '',
          mchntSsn:""
        },
        haveBank:0,
        // 银行卡
        card1: true,
        card2: false,
        card3: false,
        card4: false,
        card5: false,
        //是否修改
        isAmend: false,
        //银行列表
        BankList: '',
        //省级信息
        province: '',
        //市级信息
        city: '',
        //开户银行具体地址
        branchBank: '',
        //验证码按钮
        yzm: true,
        time: 120,
        backInfo:{},
        dialog:false,
        userInfoCard:{},
        backImgList:[
          {imgUrl:require('../../..//images/bankCardBgs/my_bank_1.png'),type:1},
          {imgUrl:require('../../..//images/bankCardBgs/my_bank_2.png'),type:2},
          {imgUrl:require('../../..//images/bankCardBgs/my_bank_3.png'),type:3},
          {imgUrl:require('../../..//images/bankCardBgs/my_bank_4.png'),type:4},
          {imgUrl:require('../../..//images/bankCardBgs/my_bank_5.png'),type:5},
          {imgUrl:require('../../..//images/bankCardBgs/my_bank_6.png'),type:6},
          {imgUrl:require('../../..//images/bankCardBgs/my_bank_7.png'),type:7},
          {imgUrl:require('../../..//images/bankCardBgs/my_bank_8.png'),type:9},
          {imgUrl:require('../../..//images/bankCardBgs/my_bank_9.png'),type:9},
          {imgUrl:require('../../..//images/bankCardBgs/my_bank_10.png'),type:10},
          {imgUrl:require('../../..//images/bankCardBgs/my_bank_11.png'),type:11},
          {imgUrl:require('../../..//images/bankCardBgs/my_bank_12.png'),type:12},
          {imgUrl:require('../../..//images/bankCardBgs/my_bank_13.png'),type:13},
          {imgUrl:require('../../..//images/bankCardBgs/my_bank_14.png'),type:14},
          {imgUrl:require('../../..//images/bankCardBgs/my_bank_15.png'),type:15},
        ]
      }
    },
    components: {
       mDialog,
    },
    methods: {
      //绑定银行卡发送短信
      bindCard(from){
        console.log(from)
        if(from.bankId==''){
          this.$message.error('请选择银行')
           return
        }
        let phone = /^[1][3,4,5,7,8][0-9]{9}$/;
        if(!phone.test(from.phone)){
          this.$message.error('请输入银行预留手机号码')
          return
        }
        let data={
          account:this.userInfoCard.name,
          idCard:this.userInfoCard.idNo,
          cardNo:from.cardNo,
          mobileNo:from.phone,
          device:this.device
        }
        console.log(data)
        this.service({
          url:"/user/account/bind.json?action=code",
          method:"POST",
          data:JSON.stringify(data)
        }).then(res =>{
          if(res.code == 200){
            this.form.mchntSsn = res.data;
            this.$message({
                message: '短信发送成功',
                type: 'success'
            })
            this.yzm = false;
            let interval = null;
            interval = setInterval(() => {
              if ((this.time--) <= 0) {
                this.time = 120;
                this.yzm = true;
                clearInterval(interval);
              }
            }, 1000);
          }else{
            this.$message({
              message: res.resultMsg,
              type: 'error'
            });
          }
        }).catch(res=>{
          this.$message({
            message: res.resultMsg,
            type: 'error'
          });
        })
      },
      //绑定银行卡提交
      bindCardSubmit(from){
        console.log(from)
          if(from.bankId==''){
            this.$message.error('请选择银行')
            return
          }
          let phone = /^[1][3,4,5,7,8][0-9]{9}$/;
          if(!phone.test(from.phone)){
            this.$message.error('请输入银行预留手机号码')
            return
          }
          if(from.msgCode == ''){
             this.$message.error('请输入短信验证码')
            return
          }
          let data ={
            account:this.userInfoCard.name,
            idCard:this.userInfoCard.idNo,
            bankName:from.bankId,
            cardNo:from.cardNo,
            mobileNo:from.phone,
            mchntSsn:this.form.mchntSsn,
            msgCode:from.msgCode,
            device:this.device
          };
          this.service({
            url:"/user/account/bank.json?action=bind&v=2",
            method:'post',
            data:JSON.stringify(data)
          }).then(res=>{
            if(res.code == 200){
              this.$message.success('绑卡成功')
              this.$router.push('/account/accountDetail')
            }else{
              this.$message.error(res.resultMsg)
            }
          })
      },
      //实名发送短信
      shiming(from){
        console.log(from)
        let nameStr = /^[\u4e00-\u9fa5]+$/
        if(!nameStr.test(from.name)){
          this.$message.error('请输入中文名字')
          return
        }
        let idCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
        if(!idCard.test(from.idCode)){
          this.$message.error('请输入正确的身份证号')
          return
        }
        if(from.bankId==''){
          this.$message.error('请选择银行')
           return
        }
        let phone = /^[1][3,4,5,7,8][0-9]{9}$/;
        if(!phone.test(from.phone)){
          this.$message.error('请输入银行预留手机号码')
          return
        }
        let data={
          account:from.name,
          idCard:from.idCode,
          cardNo:from.cardNo,
          mobileNo:from.phone,
          device:this.device
        }
        console.log(data)
        this.service({
          url:"/user/account/bind.json?action=code",
          method:"POST",
          data:JSON.stringify(data)
        }).then(res =>{
          if(res.code == 200){
            console.log(res)
            this.form.mchntSsn = res.data;
            this.$message({
                message: '短信发送成功',
                type: 'success'
            })
            this.yzm = false;
            let interval = null;
            interval = setInterval(() => {
              if ((this.time--) <= 0) {
                this.time = 120;
                this.yzm = true;
                clearInterval(interval);
              }
            }, 1000);
          }else{
            this.$message({
              message: res.resultMsg,
              type: 'error'
            });
          }
        }).catch(res=>{
          this.$message({
            message: res.resultMsg,
            type: 'error'
          });
        })

      },
      //实名绑定提交
      shimingSubmit(from){
        console.log(from)
        let nameStr = /^[\u4e00-\u9fa5]+$/
        if(!nameStr.test(from.name)){
          this.$message.error('请输入中文名字')
          return
        }
        let idCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
        if(!idCard.test(from.idCode)){
          this.$message.error('请输入正确的身份证号')
          return
        }
        if(from.bankId==''){
          this.$message.error('请选择银行')
           return
        }
        let phone = /^[1][3,4,5,7,8][0-9]{9}$/;
        if(!phone.test(from.phone)){
          this.$message.error('请输入银行预留手机号码')
          return
        }
        if(from.msgCode == ''){
           this.$message.error('请输入短信验证码')
          return
        }
        let data={
          account:from.name,
          idCard:from.idCode,
          bankName:from.bankId,
          cardNo:from.cardNo,
          mobileNo:from.phone,
          device:this.device,
          mchntSsn:this.form.mchntSsn,
          msgCode:from.msgCode,
        }
        console.log(data)
        this.service({
          url:"/user/account/bank.json?action=bind&v=2",
          method:"POST",
          data:JSON.stringify(data)
        }).then(res=>{
          console.log(res)
          if(res.code == 200){
            this.$message({
              message: '恭喜您，实名成功',
              type: 'success'
            });
            this.$router.push('/account/accountDetail')
            this.getCardInfo()
            this.getuserCard() 
          }else {
            this.$message({
              message: res.resultMsg,
              type: 'error'
            });
          }
        })

      },
      //获取银行卡信息
      getCardInfo(){
        var that = this;
        that.service({
          url:"/user/account/bank.json?action=info",
          method:"POST",
          data:{
            device:that.device
          }
        }).then(res=>{
          if(res.code == 200){
            that.haveBank = 1
            //that.backInfo = res.data;
            that.backImgList.forEach(i =>{
              if(i.type == res.data.type){
                that.backInfo = i;
                that.backInfo.cardNo = res.data.cardNo
                //that.backInfo.name = res.data.name
              }
            })
          }

          if(res.code == 7002){
            this.$confirm(res.resultMsg, '提示', {
              confirmButtonText: '去绑定',
              cancelButtonText: '取消',
              type: 'error'
            }).then(() => {
              that.card1 = false;
              that.card2 = true;
            }).catch(() => {
              that.$router.push('/account/accountDetail')      
            });
          }
        }).catch(res =>{
          console.log(res)
        })
      },
      //解绑银行卡
      sureBank(){
        this.dialog = true;
       
      },
      errorClick(){
        this.card1 = false;
        this.card4 = true;
        this.dialog = false;
      },
      addCard1() {
        var that = this;
        that.card1 = false;
        that.card2 = true;
      },
      addCard3() {
        var that = this;
        that.card3 = false;
        that.card4 = true;
      },
      //获取用户信息
      getUserInfo(){
        var that = this;
        that.service({
          url:"/user/index.json",
          method:"post",
          data:{
            device:that.device
          }
        }).then(res=>{
          if(res.code == 200){
            that.userInfo = res.data.account;
            if(res.data.user.realStatus == 0){
                this.$confirm('您没有实名认证', '提示', {
                  confirmButtonText: '去实名',
                  cancelButtonText: '取消',
                  type: 'error'
                }).then(() => {
                  that.card1 = false;
                  that.card5 = true;
                }).catch(() => {
                  that.$router.push('/account/accountDetail')      
                });
            }else{
              that.getCardInfo()
            }
          }
        })
      },
      //银行卡列表
      getCardList(){
        var that = this;
        that.service({
          url:"/common/bank/list.json",
          method:"post",
          data:{
            device:that.device,
          }
        }).then(res=>{
          if(res.code==200){
            that.BankList = res.data
          }
        }).catch(res=>{
          console.log(res)
        })
      },
      //选择银行
      choosebank(value){
        this.form.bankId = value
      },
      // 解绑获取验证码
      saveyzm(form) {
          console.log(form)
          let nameStr = /^[\u4e00-\u9fa5]+$/
          if(!nameStr.test(form.name)){
            this.$message.error('请输入中文名字')
            return
          }
          let idCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
          if(!idCard.test(form.idCode)){
            this.$message.error('请输入正确的身份证号')
            return
          }
        
        let phone = /^[1][3,4,5,7,8][0-9]{9}$/;
        if(!phone.test(form.phone)){
          this.$message.error('请输入银行预留手机号码')
          return
        }
        var interval = null;
        let data={
            account:form.name,
            idCard:form.idCode,
            cardNo:form.cardNo,
            mobile:form.phone,
            device:this.device
          }
          this.service({
            url:"/user/account/unbind.json?action=code",
            method:"POST",
            data:JSON.stringify(data)
          }).then(res =>{
            if(res.code == 200){
              this.form.mchntSsn = res.data;
              this.$message({
                  message: '短信发送成功',
                  type: 'success'
              })
              this.yzm = false;
              interval = setInterval(() => {
                if ((this.time--) <= 0) {
                  this.time = 120;
                  this.yzm = true;
                  clearInterval(interval);
                }
              }, 1000);
            }else{
              this.$message({
                message: res.resultMsg,
                type: 'error'
              });
            }
          }).catch(res=>{
            this.$message({
              message: res.resultMsg,
              type: 'error'
            });
          })      
      },
      // 实名验证
      save(type,form) {
        if(type != 1){
          if (form.bankId == "") {
            this.$message.error('请选择银行名称')
            return
          }
          var bankRule = /^([1-9]{1})(\d{14,19})$/
          if (!bankRule.test(this.form.cardNo)) {
            this.$message.error('请输入正确的银行卡号')
            return
          }
        }
        if(!this.userInfoCard){
          let nameStr = /^[\u4e00-\u9fa5]+$/
          if(!nameStr.test(form.name)){
            this.$message.error('请输入中文名字')
            return
          }
          let idCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
          if(!idCard.test(form.idCode)){
            this.$message.error('请输入正确的身份证号')
            return
          }
        }
       
        let phone = /^[1][3,4,5,7,8][0-9]{9}$/;
        if(!phone.test(form.phone)){
          this.$message.error('请输入银行预留手机号码')
          return
        }
        if(form.msgCode == ''){
          this.$message.error('请输入短信验证码')
          return
        }
       
        if(type != 1){
          console.log(1111)
          if(!this.userInfoCard){
            let data={
              account:form.name,
              idCard:form.idCode,
              bankName:form.bankId,
              cardNo:form.cardNo,
              mobileNo:form.phone,
              device:this.device,
              mchntSsn:this.form.mchntSsn,
              msgCode:form.msgCode,
            }
          }else{
            let data={
              account:this.userInfoCard.name,
              idCard:this.userInfoCard.idNo,
              bankName:form.bankId,
              cardNo:form.cardNo,
              mobileNo:form.phone,
              device:this.device,
              mchntSsn:this.form.mchntSsn,
              msgCode:form.msgCode,
            }
          }
          this.service({
            url:"/user/account/bank.json?action=bind&v=2",
            method:"POST",
            data:JSON.stringify(data)
          }).then(res=>{
            console.log(res)
            if(res.code == 200){
              this.$message({
                message: '恭喜您，绑卡成功',
                type: 'success'
              });
              this.getCardInfo()
            }else {
              this.$message({
                message: res.resultMsg,
                type: 'error'
              });
            }
          })
        }else{

           let data={
            name:form.name,
            idNo:form.idCode,
            bankName:form.bankId,
            cardNo:form.cardNo,
            mobile:form.phone,
            device:this.device,
            code:form.msgCode,
          }
          this.service({
            url:"/user/account/bank.json?action=unbind",
            method:"POST",
            data:JSON.stringify(data)
          }).then(res=>{
            if(res.code == 200){
              this.$message({
                message: '解绑银行卡成功',
                type: 'success'
              });
              this.$router.push('/account/accountDetail')
              //this.getCardInfo()
            }else {
              this.$message({
                message: res.resultMsg,
                type: 'error'
              });
            }
          })
        }
      },
      //获取身份证信息
      getuserCard(){
        this.service({
          method:"post",
          url:"/user/real.json?action=info",
          data:{
            device:this.device
          }
        }).then(res=>{
          if(res.code == 200){
            this.userInfoCard = res.data
          }
        })
      }
    },
    //   filters: {
    //     status:function(val) {
    //       if(val == '01') {
    //         return '未收'
    //       }else if(val == '02') {
    //         return '已收'
    //       }
    //     }
    //   },
    mounted() {
       this.getUserInfo();
       this.getCardList();
       this.getuserCard()
      // this.getFyBankList();
      // this.getFyProvinceAreaList();
    }
  }
</script>
<style lang="scss">
.card{
  width:360px;
  height: 120px;
  border-radius:5px;
  border:1px solid #ddd;
  background:#007f3e;
  padding:5px 20px;;
  
  .title{
    margin-bottom:10px;
    .title-left{
      float: left;
      width:40px;
      height:40px;
    }
    .title-right{
      float: left;
      span{
        padding:0;
        font-size: 14px;
        color:#fff;
      }
      p{
        color:#fff;
        font-size: 12px;
      }
    }
  }
  p.cardNo{
    padding-left:40px;
    color:#fff;
    font-size: 12px;
  }
}
  .openKH {
    .el-select {
      float: none;
    }
    .title {
      margin: 10px 0 20px;
      i {
        background: #f22e3b;
        padding: 10px 2px;
      }
      span {
        padding-left: 20px;
        font-size: 18px;
      }
    }
    .el-form {
      margin-top: 25px;
      margin-left: 55px;
      button {
        width: 100px;
        margin-left: 95px;
        margin-top: 20px;
      }
      .el-button--danger.is-plain {
        color: white;
        background-color: #f56c6c;
      }
    }
    .el-form-item__label {
      width: auto !important; // color: red;
    }
    .el-input {
      width: 50%;
    }
    .Myselect {
      .el-input {
        width: 100%;
      }
      .el-select {
        width: 50%;
      }
    }
  }

  .addDetail {
    padding: 20px 60px 20px;
  }

  .addDetail .top {
    background: #eee;
    padding: 10px 15px;
    margin-bottom: 20px;
    p {
      font-size: 14px;
      line-height: 25px;
    }
  }
  .tishi {
    font-size: 12px;
    color: #999;
    line-height: 25px;
  }
</style>
<style>
  .el-message-box{
  width:300px;
}
.el-message-box__title span{
  display: block;
  text-align: center;
  font-size: 14px;
}
.el-button--small{
  float:left;
}
.el-message-box__btns button:nth-child(2){
  float: right;
  background:red;
  border-color:red;
}
</style>
