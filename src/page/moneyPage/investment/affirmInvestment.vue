<!--理财-立即投资-确认投资-->
<template>
    <div class="myOrder">
        
        <div class="concont">
            <h1>投资列表>{{projectData.name}}>确认投资</h1>
            <!-- 投标详情 -->
            <div class="project-detail">
                <div class="tender-details">
                    投标详情
                </div>
                <div class="project">
                    <h1>{{projectData.name}}</h1>
                    <ul class="clearfix">
                        <li>预期年化收益率：{{projectData.rate}}%</li>
                        <li>投资期限：{{projectData.cycle}}天</li>
                        <li>投资金额：{{totalMoney}}元</li>
                        <li>到期收益：{{projectData.projectInMoney}}元</li>
                    </ul>
                </div>
            </div>
            <!-- 券包使用 -->
            <div class="project-detail" style="margin-top:30px;" v-if="pageList.length != 0">
                <div class="tender-details">
                    券包使用
                </div>
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item,index) in pageList" :key="index" @click="chooseQuanbao(item,index)" style="margin-right:50px;">
                            <div class="item-left clearfix">
                                <p>投资期限 ≥ {{item.limitCycle}}天</p>
                                <p>投资金额 ≥ {{item.limitMoney}}元</p>
                                <p v-if="item.applyProject == 1">适用项目：新手专享除外</p>
                                <p v-if="item.applyProject == 2">适用项目：仅适用于精品区</p>
                                <p v-if="item.applyProject == 3">适用项目：仅适用于活动区</p>
                                <p v-if="item.applyProject == 4">适用项目：仅适用于爆款区</p>
                                <p v-if="item.applyProject == 5">适用项目：仅适用于精品及活动区</p>
                            </div>
                            <div class="item-right clearfix">
                                <span v-if="item.type == 0">￥{{item.value}}</span>
                                    <span v-if="item.type == 1">{{item.value}}%</span>
                                <p v-if="item.type == 0">折扣券</p>
                                <p v-if="item.type == 1">加息券</p>
                            </div>
                            <div class="item-time clearfix">
                                有效期:{{item.validTime|substr }} - {{item.invalidTime|substr}}
                            </div>
                            <div v-if="item.checked" style="border:1px solid red;color:red;position:absolute;top:10px;right:10px;font-size:12px;">已选择</div>
                        </div>
                    </div>
                    <!-- Add Pagination -->
                    <div class="swiper-pagination"></div>
                    <!-- Add Arrows -->
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div>
                </div>
            </div>
            <!-- 支付详情 -->
            <div class="project-detail" style="margin-top:30px;">
                <div class="tender-details">
                    支付详情
                </div>
                <div class="project clearfix">
                   <div class="play-left clearfix">
                       <p>投资金额：{{totalMoney}}元</p>
                       <p v-if="curponMoney != null">优惠券抵扣：-{{curponMoney}}元</p>
                       <p v-if="curpon !=null">优惠券加息：加息{{curpon}}%</p>
                       <p>余额需支付：{{projectData.totalMoney}}元</p>
                   </div>
                   <div class="play-right clearfix">
                       <div class="play-yzm clearfix">
                           <span style="padding-left:10px;">验证码：</span>
                           <span class="span">
                               <!-- <input type="text" placeholder="请输入手机短信码" v-model="form.code" autocomplete="off"/> -->
                               <el-input type="text" v-model="form.code" placeholder="请输入手机短信码"  class="input" style="width:80%"></el-input>
                            </span>
                           <span class="spanCode" @click="getCode" v-if="isShowCode">获取验证码</span>
                           <span class="spanCode"  style="background:#eee;color:#999;float:left;padding:0 10px;border:1px solid #eee" v-if="!isShowCode">重新获取({{time}}s)</span>
                       </div>
                       <div class="play-password clearfix">
                           <span>交易密码：</span>
                           <span class="span">
                               <el-input type="password" v-model="form.password" placeholder="请输入交易密码"  class="input" style="width:80%" autocomplete="new-password" maxlength="6"></el-input>
                            </span>
                           <span class="span1" @click="password">？忘记密码</span>
                       </div>
                       <div class="play-btn clearfix">
                            <div @click="sureSumbit" style="background:red" v-if="form.password!= '' &&form.code!=''">确认支付</div>
                            <div v-if="form.password== '' || form.code==''">确认支付</div>
                       </div>
                   </div>
                </div>
            </div>
        </div>
        <m-Dialog :type="type" v-model="dialog" :title="titleError" :content="content" @error="clickError" errorText='确认支付' ></m-Dialog>
    </div>
</template>

<script>
//import {getInvestProjectPre,getInvestProject,getCardList,getUsableCoupon} from '@/services/getDetail'
import mDialog  from '../../../components/vue_dialog/dialog'
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
export default {
  name: 'affirm',
    data () {
        return {
            isShowCode:true,
            totalMoney:null,
            type:"",
            dialog:false,
            titleError:"",
            content:"",
            is1:false,//判断是否是保守型
            is2:false,//判断是否是稳健型
            is3:false,//判断是否是平衡型
            is4:false,//判断是否是积极型
            curpon:null,//选择加息
            curponMoney:null,//选择折扣
            form:{
                //项目名称
                projectName:'',
                //项目ID
                projectId:'',
                //收益周期
                projectTimelimit:'',
                //投资金额
                investMoney:'',
                //项目年化收益
                accountRate:'',
                // 加息券ID
                raiseId:'',
                //现金券ID
                couponId:'',
                //交易密码
                password:'',
                code:"",
                coupon:0,
                },
            //是否同意规则
            checked:true,
            YQshouyi:0.87,
            KYyuE:0.00,
            YFjinE:'0.00',
            //可使用的现金券数组
            options: [],
            // value: '',
            myForm:null,
            projectData:{},
            pageList:[],
            time:120,
            fullscreenLoading:false,

        }
        
        
    },
    components: {
        mDialog
    },
    methods: {
        //获取项目详情
        ProjectLoanInfo(){
            let that = this;
            var id  = this.$route.params.id;
            var data={
                subjId:id,
                device:this.device
            };
            this.form.projectId=id;
            this.service({
                url:"/subject/detail.json",
                method:"POST",
                data:JSON.stringify(data),
            }).then(res => {
                if(res.code == 200){
                    that.projectData = res.data;
                    that.totalMoney =this.$route.params.money
                    that.projectData.totalMoney =  this.$route.params.money
                    that.projectData.projectInMoney= (this.$route.params.money * (res.data.rate/100)/360*res.data.cycle).toFixed(2)
                    that.getQuanbao();
                    that.getUserInfo();
                }
            })
        },
        //获取可用的券
        getQuanbao(){
            let that = this;
            that.service({
                url:"/user/account/coupon.json?action=list",
                method:"post",
                data:{
                    device:that.device,
                    page:1,
                    status:0,
                }
            }).then(res=>{
                if(res.code == 200){
                     res.data.list.forEach(i=>{
                        if(that.projectData.cycle >= i.limitCycle  && that.$route.params.money >= i.limitMoney){
                             i.checked = false;
                             that.pageList.push(i)
                        }
                    })
                    this.$nextTick(() => {
                        this.swiperAction();
                    })
                }
            }).catch(res=>{

            })
        },
        //选择券
        chooseQuanbao(item,myIndex){
            var that  = this;
            this.pageList.forEach(i=>{
                if(i.checked !== this.pageList[myIndex].checked){
                    i.checked = false
                    if(i.type == 0){
                        that.curponMoney=null;
                        that.projectData.totalMoney = that.$route.params.money
                        that.form.coupon = 0
                    }else{
                        that.curpon=null
                        that.form.coupon = 0
                    }
                }
            })
            item.checked = !item.checked
            let totalMoney = that.$route.params.money;
            if(item.checked){
                if(item.type == 0){
                    that.curponMoney = item.value;
                    that.form.coupon = item.id
                    that.projectData.totalMoney = that.projectData.totalMoney-that.curponMoney
                }else{
                    that.form.coupon = item.id
                    that.curpon = item.value
                }
            }else{
               if(item.type == 0){
                    that.curponMoney=null;
                    that.projectData.totalMoney = that.$route.params.money
                    that.form.coupon = 0
                }else{
                    that.curpon=null
                    that.form.coupon = 0
                }
            }
            
        },
        //获取验证码
        getCode(){  
            var interval = null;
            this.service({
                url:"/user/invest/tenderPwd.json?action=code",
                method:"post",
                data:{
                    device:this.device,
                }
            }).then(res=>{
                if(res.code == 200){
                    this.isShowCode = false;
                    this.$message({
                        message: '短信发送成功',
                        type: 'success',
                        showClose: true,
                        duration: 3 * 1000
                    })
                     interval = window.setInterval(() => {
                        if ((this.time--) <= 1) {
                        this.time = 120;
                        this.isShowCode = true;
                        window.clearInterval(interval);
                        }
                    }, 1000);
                }else{
                    this.$message({
                        message: res.resultMsg,
                        type: 'error',
                        showClose: true,
                        duration: 3 * 1000
                    })
                }
            }).catch(res=>{

            })
           
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
                    that.mobile = res.data.user.mobile;
                    that.is1 = res.data.user.riskResult;
                }
            })
        },
        //确认支付
        sureSumbit(){
            console.log(this.is1)
            if(this.form.code == ''){
                  this.$message({
                    message: '请输入验证码',
                    type: 'error',
                    showClose: true,
                    duration: 3 * 1000
                })
                return;
            }
            if(this.is1 == 1){
                this.type="error";
                this.dialog = true;
                this.content="您选择的产品适合保守型及以上投资者，该产品可能不适合您的投资需求，如您自愿投资改产品，请点击确定购买";
            }else if(this.is1 == 2){
                this.type="error";
                this.dialog = true;
                this.content="您选择的产品适合稳健型及以上投资者，该产品可能不适合您的投资需求，如您自愿投资改产品，请点击确定购买";
            }else if(this.is1 == 3){
                this.type="error";
                this.dialog = true;
                this.content="您选择的产品适合平衡型及以上投资者，该产品可能不适合您的投资需求，如您自愿投资改产品，请点击确定购买";
            }else if(this.is1 == 4){
                this.type="error";
                this.dialog = true;
                this.content="您选择的产品适合积极型及以上投资者，该产品可能不适合您的投资需求，如您自愿投资改产品，请点击确定购买";
            }
        },
        //再次确认
        clickError(){
            this.dialog = false;
            const loading = this.$loading({
                lock: true,
                text: '正在支付...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)',
                target: document.querySelector('body')
            });
            let data={
                device:this.device,
                money:this.projectData.totalMoney,
                coupon:this.form.coupon,
                subjId:this.projectData.subjId,
                bizPwd:this.form.password,
                code:this.form.code
            } 
            this.service({
                url:"/user/invest/tender.json",
                method:"post",
                data:JSON.stringify(data),
            }).then(res=>{
                loading.close();
                if(res.code == 200){
                    this.dialog = false;
                    this.$message({
                        message: '投资成功',
                        type: 'success',
                        showClose: true,
                        duration: 3 * 1000
                    })
                    this.$router.push('/money')
                    this.form.code = '';
                    this.form.password = '';
                }else{
                    this.dialog = false;
                    this.$message({
                        message: res.resultMsg,
                        type: 'error',
                        showClose: true,
                        duration: 3 * 1000
                    })
                    //this.$router.push('/money')
                }
            }).catch(res=>{

            })
        },
        //选择优惠券
        change(type){
            if(type == 'prev'){                
                
            }
            if(type=='next'){
                
            }
        },
        //忘记密码
        password(){
            this.$router.push({
                path:"/account/accountSettingPay",
                query:{
                    name:encodeURIComponent("忘记密码")
                }
            })
        },
        //初始化Swiper
        swiperAction(){
            var swiper = new Swiper('.swiper-container', {
                slidesPerView: 3,
                spaceBetween: 45,
                slidesPerGroup: 3,
                initialSlide :0,
                observer:true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents:true,//修改swiper的父元素时，自动初始化swipe
                loopFillGroupWithBlank: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });
        }
  },
  filters:{
      substr:function(val){
          if(val != null || val != ''){
              return val.substring(0,11)
          }
      }
  },
  mounted() {
        this.ProjectLoanInfo()
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->  
<style lang="scss" scoped>  
.swiper-container {
    width: 100%;
    height: 200px;
    background:#fff;
    padding:20px 50px;
}
.swiper-slide {
    font-size: 18px;
    background: #fff;
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    position: relative;
    border:1px solid #eee;
    cursor: pointer;
    .item-left{
        margin-top:30px;
        padding-left:30px;
        float:left;
        width:150px;
        p{
            font-size: 12px;
            color:#999;
            margin-top:5px;
        }
    }
    .item-right{
        float:left;
        margin-top:30px;
    }
    .item-time{
        position: absolute;
        bottom:20px;
        left:0;
        font-size: 12px;
        padding-left:30px;
        width:89%;
        border-top:1px solid #eee;
        padding-top:10px;
        color:#999;
    }
    &:nth-of-type(1){
        margin-left:0
    }
}
.swiper-button-next{
    background-image:url(../../../images/btns/package-right.png);
}
.swiper-button-prev{
    background-image:url(../../../images/btns/package-left.png);
}
.myOrder{
    width:100%;
    background: #f4f4f4;
    overflow: hidden;
    .concont{
        width:1000px;
        margin:50px auto;
        h1{
            font-size: 12px;
            color:#999;
            padding-bottom:5px;
        }
        .project-detail{
            background: #fff;
            .tender-details{
                background: #d7d7d7;
                color:#333;
                font-size: 18px;
                padding:10px 50px;
            }
            .project{
                padding:0 50px 40px;
                h1{
                    margin-top:30px;
                    font-size: 14px;
                    padding-bottom:20px;
                }
                ul{
                    li{
                        float: left;
                        width:25%;
                        color:#666;
                        font-size: 12px;
                    }
                }
                .play-left{
                    width:50%;
                    float:left;
                    padding:30px 0 0;
                    p{
                        font-size: 14px;
                        color:#666;
                        margin-bottom:10px;
                    }
                }
                .play-right{
                    float:left;
                    width:50%;
                    padding:30px 0 0 40px;
                    .play-password{
                        margin:10px 0;
                    }
                    span{
                        font-size: 14px;
                        color:#666;
                        input{
                            height:30px;
                            padding-left:5px;
                            font-size: 14px;
                            border-radius: 4px;
                            border:1px solid #333;
                        }
                        display: block;
                        float: left;
                        line-height:30px;
                        &.span{
                            margin:0 10px;
                        }
                        &.spanCode{
                            text-align: center;
                            border:1px solid #333;
                            padding:0 20px;
                            color:#333;
                            border-radius: 4px;
                            cursor: pointer;
                        }
                        &.span1{
                            cursor: pointer;
                        }
                    }
                    .play-btn{
                        div{
                            width:60%;
                            color:#fff;
                            text-align: center;
                            background:#b5b5b5;
                            padding:10px;
                            margin-left:20px;
                            margin-top: 20px;
                            font-size: 16px;
                            border-radius: 4px;
                            cursor: pointer;
                        }
                    }
                }
            }
            
        }
    }
}
</style>
<style lang="scss">

</style>

