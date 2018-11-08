<!--理财-立即投资页面-->
<template> 
  <div class="concent">
    <div class="project_title">投资列表>{{data.name}}</div>
    <!-- 投资详情 -->
    <div class="concentBox clearfix">
      <div class="clearfix project-item">
        <div class="project-left" style="float:left;width:550px;">
          <div class="clearfix">
              <h1>{{data.name}}</h1>
              <div class="p1">
                <p class="p_text">预期年化收益率</p>
                <p class="p_detail">{{data.rate|tofixed}}%</p>
              </div>
              <div class="p1">
                <p class="p_text">投资期限</p>
                <p class="p_detail">{{data.cycle}}天</p>
              </div>
              <div class="p1">
                <p class="p_text">项目总额</p>
                <p class="p_detail">{{data.money | chooseFour}}元</p>
              </div>
          </div>
         
          <div class="project-say clearfix">
            <ul class="clearfix">
              <li v-for="(item,index) in projectSay" :key="index">
                {{item.name}} : {{item.content}}
              </li>
            </ul>
          </div>
          <div class="project-say clearfix" style="margin-top:30px;">
            <span>投标进度:</span>
            <el-progress :percentage="data.createPorp" style="margin-left:70px;width:70%"></el-progress>
          </div>
        </div>
        <div class="project-right clearfix" style="float:left;">
          <div class="totalMoney clearfix">
            <span class="span1">账户余额：{{userInfo.balance | tofixed}}元</span>
            <span class="span2" @click="tuRechangeMoney">去充值 >></span>
          </div>
          <div class="totalMoney clearfix">
            <span class="span1">剩余可投：{{data.money - data.collMoney | chooseFour}}元</span>
          </div>
          <div class="totalMoney clearfix">
            <i @click="changeNum('penv',data.stepMoney)">-</i>
            <input v-model="investMoney" type="number" />
            <i @click="changeNum('add',data.stepMoney)">+</i>
          </div>
           <div class="totalMoney">
            <div class="div1" @click="nowTouzi">立即投资</div>
          </div>
        </div>
          
      </div>
    </div>
    <!-- 项目详情 -->
    <div class="project-details">
      <div class="content_details">
        <ul class="clearfix">
          <li v-for="(item,index) in projectList" :key="index" :class="{active : tabs == index}" @click="changeLi(item,index)">{{item.name}}</li>
        </ul>
      </div>
      <div class="project_details_details" v-if="tabs == 0">
        <img src="../../../images/projectDetail.jpg" />
      </div>
      <div class="project_details_record" v-if="tabs == 1">
        <div class="record-list clearfix">
          <div class="record-list-name">投资人</div>
          <div class="record-list-name">投资金额</div>
          <div class="record-list-name">投资时间</div>
        </div>
        <ul class="clearfix" v-if="!noList">
          <li v-for="(item,index) in recordList" :key="index" class="clearfix">
            <div>{{item.mobile|phone}}</div>
            <div>{{item.money}}</div>
            <div>{{item.investTime}}</div>
          </li>
        </ul>
        <p v-if="noList">暂无该项目的投资记录</p>
      </div>
      <div class="project_details_contract" v-if="tabs == 2">
        <div class="imgList" v-for="(item,index) in imgList" :key="index" v-if="imgList.length != 0">
          <img :src="item.path"/>
        </div>
        <p style="padding:20px 0; text-align:center;color:#999;font-size:14px;" v-if="imgList.length == 0">暂无该项目的合同图片</p>
      </div>

    </div>
     <!-- <m-Dialog :type="type" v-model="dialog" :title="titleError" :content="content" @error="clickError" :errorText="errorText"></m-Dialog> -->
  </div>
</template>

<script>
//import {getDepositsList,productImageList,itemInformation,returnMonyPlan,getUserMsg} from '@/services/getDetail'
//import {getInvestProjectPre,getProjectLoanInfo,getUsableCoupon} from '@/services/getDetail'
import mDialog  from '../../../components/vue_dialog/dialog'
export default {
  name: 'investment',
  data () {
    return {
      isMeasurement:true,//判断是否通过测评
      realStatus:0,//是否通过实名认证
      dialog:false,
      titleError:"",
      type:"",
      content:"",
      errorText:"",
      title:"产品详情",
      tabs:0,
      //  是否登录
      // isLogin:false,
      // 余额
      userMsg: '',
      // 分页开始
      currentPage: 1,
      rowCount:'',
      // rowCount1:'',
      pageId:1,
      noData:false,
      // 分页结束
      noImg:false,
      nofImg:false,
      // 多少人完成投标
      haveCount:'', 
      form:{
        //项目ID
        projectId:'',
        //项目名称
        projectName:'',
        //项目编号
        projectNum:'',
        //标的金额
        projectMoney:'',
        //年化收益率
        accountRate:0,
        //已投金额
        haveMoney:'',
        //项目期限
        projectTimelimit:'',   
      },
       //投资金额
      investMoney:1000,
       //加息券数组
      Raises:[],
      //使用的加息券
      raise:'',
      //可投金额
      AmountInvested:'',
      //投资进度
      investSchedule:0,
      //预计收益
      anticipatedIncome:'',
      isActive:1,
      activeButton:3,
      value:'',
      options:[{value: 111}],
      projectId:'',
      projectData:[],
      // 项目信息
      // itemList:{},
      imagesList:[],
      imagesList1:[],
      imagesList2:[],
      depList:[],
      returnMonyList:[],
      Huank:[{
        num:1,
        date:'2018-06-15',
        money:'171,457,30',
        leixing:'本金+利息',
        zhuangtai:'待还款'
      }],
      data: {},
      projectSay:[
        {name:"还款方式",content:"服务到期还本息"},
        {name:"最低买入",content:100},
        {name:"起息日期",content:"满标后次日起息"}
      ],
      projectList:[
        {name:"产品详情"},{name:"标注记录"},{name:"合同图片"}
      ],
      recordList:[],
      userInfo:{},
      isBind:false,
      imgList:[],
      noList:false,
      riskResult:0,
    }
  },
  components: {
    mDialog
  },
  watch:{
    investMoney(){
      this.anticipatedIncome = [(this.investMoney*this.form.accountRate/100)/12]*this.form.projectTimelimit;
      this.anticipatedIncome=this.anticipatedIncome.toFixed(2)
    }
  },
  methods: {
    //前往充值
    tuRechangeMoney() {
      this.$router.push({
        name: "accountComent",
        query: {
          i: encodeURIComponent('去充值'),
        }

      })
    },
    //修改投资金额
    changeNum(name,num){
      if(name == 'penv'){
        if(this.investMoney > this.data.baseMoney){
          this.investMoney-=num
        }else{

        }
      }else{
        if(this.investMoney >=this.data.maxMoney){
          this.$message({
            message: '追加金额不的超过'+this.data.maxMoney,
            type: 'error',
            showClose: true,
            duration: 3 * 1000
          })
        }else{
          this.investMoney+=num
        }
      }
    },
    // cancalClick(){},
    //项目详情选择
    changeLi(item,index){
      this.tabs = index;
      this.title = item.name
      if(this.tabs == 1){
        this.getRecodeList()
      }else if(this.tabs == 2){
        this.getContract()
      }
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
          that.realStatus = res.data.user.realStatus;
          that.isBind= res.data.isBind;
          that.riskResult = res.data.user.riskResult
        }
      })
    },
    //立即投资
    nowTouzi(){
      if(!this.isBind){
        this.$confirm('请先完成富滇银行存管开户?', '提示', {
          confirmButtonText: '立即前往',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          this.$router.push('/account/accountSettingCard')
        }).catch(() => {
                    
        });
        return
      }
       if(this.riskResult == 0){
        this.$confirm('请先完成风险测评?', '提示', {
          confirmButtonText: '立即前往',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          this.$router.push('/account/accountSettingRisk')
        }).catch(() => {
                    
        });
        return
      }
      this.$router.push({
        name:"affirm",
        params:{
          id:this.$route.params.id,
          money:this.investMoney
        }
      })
    },

    routeWithCode(data, i) {
      this.$store.commit('changeActive', i) //保证跳转是active的状态
      this.$router.push(data)
    },
    isLogin() {
      return sessionStorage.getItem('accesstoken')
    },
   
   
    
    save1(form) {
      var IsRegister = sessionStorage.getItem('accesstoken');
      // 判断是否登录
      if(IsRegister==null){
        this.$confirm('您还没有登录系统，请先登录系统', '提示', {
            confirmButtonText: '登录',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$router.push('/login');
              return;
        },()=>{

        });
      }
    },
    indexMethod(index) {
      return index * 2;
    },
    active: function (a) {
      this.isActive=a;
      this.pageId = 1;
      this.currentPage = 1;
      if(a == '03'){
        this.getDepositsList()
      }else if(a == '04'){
        this.returnMonyPlan()
      }      
    },
    activeB:function(a){
      this.activeButton=a;
    },   
    // 获取投资信息
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
          res.data.createPorp = parseFloat((res.data.collMoney / res.data.money*100).toFixed(2))
          that.data=res.data
          that.projectSay[1].content = res.data.baseMoney
          that.investMoney = res.data.baseMoney;
        }
      })
    },
    //获取投注记录
    getRecodeList(){
      var that = this;
      let data={
        subjId:that.form.projectId,
        page:1,
        device:that.device
      }
      that.service({
        url:"/subject/invest.json",
        method:"post",
        data:JSON.stringify(data)
      }).then(res=>{
        if(res.code == 200){
          if(res.data.list != 0){
            that.recordList = res.data.list
          }else{
            that.noList = true;
          }
          
        }
      }).catch(res=>{
        console.log(res)
      })
    },
    //获取合同图片
    getContract(){
      var that = this;
      let data={
        subjId:that.form.projectId,
        device:that.device
      }
      that.service({
        url:"/subject/detail.json?action=pic",
        method:"post",
        data:JSON.stringify(data),
      }).then(res=>{
        if(res.code == 200){
          if(res.data.length != 0){

            that.imgList = res.data;
          }
        }
      }).catch(res=>{

      })
    }
     
  },
  filters:{
    tofixed:function(val){
      if(val !='' || val != null){
        return parseFloat(val).toFixed(2)
      }
    },
    chooseFour:function(val){
      if(val !='' || val != null){
        return (parseFloat(val)/10000)+'万'
      }
    },
    phone:function(val){
      if(val != null || val !=''){
        return val.substring(0,3)+'****'+val.substring(7,val.length)
      }
    },
  },
  mounted() {
    sessionStorage.setItem('active',2) ;//保证刷新时，active的状态
    this.ProjectLoanInfo()
    this.getUserInfo()
    // this.depositsList()
    // this.getUserMsg()
    // this.getDepositsList()
    // this.returnMonyPlan()
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->  
<style lang="scss">  
.concent{
  width:100%;
  background: #f4f4f4;
  overflow: hidden;
  .project_title{
    width:1000px;
    margin: 36px auto 10px;
    font-size: 14px;
    color:#999;
  }
  .concentBox{
    width:1000px;
    background: #fff;
     margin: 0 auto;
    .project-item{
      padding:30px 0 30px 50px;
      width:100%;
      h1{
        padding-bottom:20px;
      }
      .p1{
        border-right:1px solid #eee;
        &:nth-of-type(1){
          padding-left:0

        }
        &:last-of-type{
          border:0;
        }
        padding:5px 60px;
        float: left;
        .p_text{
          font-size: 12px;
          color:#adadad;
          margin-bottom:20px;
        }
        .p_detail{
          font-size: 20px;
          font-weight: 600;
          color:#666;
        }
      }
      .project-left{
        clear: both;
        .project-say{
          font-size: 12px;
          margin-top:14px;
          ul{
            display: flex;
            li{
              padding-right: 60px;
              &:last-of-type{
                padding-right:0;
                padding-left:35px;
              }
            }
          }
          span{
            display: block;
            float: left;
          }
        }
      }
      .project-right{
        width:350px;
        border-left:1px solid #eee;
        padding:20px 0 10px 50px;
        .totalMoney{
          padding:12px 0 0;
          font-size: 14px;
          .span1{
            float:left;

          }
          .span2{
            float:right;
            color:#f22e3b;
            font-size: 12px;
            cursor: pointer;
          }
          i{
            display: block;
            float:left;
            width:32px;
            height:34px;
            background: #d7d7d7;
            line-height: 32px;
            text-align: center;
            font-size: 22px;
            font-weight: 600;
            font-style: normal;
            border-radius: 4px;
            color:#7d7d7d;
            cursor: pointer;
          }
          input{
            float:left;
            margin:0 20px;
            border:2px solid #b5b5b5;
            height:34px;
            padding:0 10px;
            color:#333;
          }
          .div1{
            width:90%;
            height:40px;
            background:#f22e3b;
            line-height: 40px;
            text-align:center;
            color:#fff;
            cursor: pointer;
            border-radius: 4px;
            margin-top:30px;
          }
        }
      }
    }
  }
  .project-details{
    margin-top:40px;
    overflow: hidden;
    .content_details{
      width:1000px;
      margin:0 auto;
      ul{
        width:100%;
        background:#d7d7d7;
        li{
          color:#333;
          float: left;
          font-size: 14px;
          padding:12px 24px;
          cursor: pointer;
          &.active{
            background:#fff;

          }
        }
      }
    }
    .project_details_details{
      width:1000px;
      margin:0 auto 50px;
      background:#fff;
    }
    .project_details_record{
      width:1000px;
      margin:0 auto 50px;
      background:#fff;
      overflow: hidden;
      .record-list{
        margin-top:20px;
        width:100%;
        padding:10px 0;
        background:#d7d7d7;
        .record-list-name{
          width:33.33%;
          float:left;
          text-align: center;
          font-size: 12px;
        }
      }
      ul {
        width:100%;
        li{
          width:100%;
          border-bottom:1px solid #eee;
          div{
            width:33.33%;
            text-align: center;
            padding:10px 0;
            float:left;
            font-size: 12px;
            color:#666;
          }
        }
      }
      p{
        text-align: center;
        font-size: 14px;
        color:#999;
        padding:20px 0px;
      }
    }
    .project_details_contract{
      width:1000px;
      margin:0 auto 50px;
      background:#fff;
      padding-top:20px;
      .imgList{
        img{
          display: block;
        }
      }
    }
  }
}

</style>
<style>
  .el-input__inner {
    /* height:35px;
    width:290px; */
}
.el-progress{
  /* width:60%; */
  /* margin-left:70px; */
}
.el-progress__text{
  position: absolute;
}
.el-progress-bar__inner{
  background-color: red;
}
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
