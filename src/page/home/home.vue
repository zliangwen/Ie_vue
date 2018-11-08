<template>
  <div id="home">
    <div class="header" id="a1">
      <!-- banner -->
      <div class="banner" style="position:relative" v-if="isLogin">
        <el-carousel height="520px" :interval="3000" arrow="never">
          <el-carousel-item v-for="(item,index) in banner" :key="index">
            <!-- <a :href="item.link"> -->
              <img :src="item.imagePath" alt="">   
            <!-- </a> -->
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 未登录 -->
      <!-- <div v-if="!isLogin" class="login"> -->
        <m-regist v-if="!isLogin"></m-regist>
      <!-- </div> -->
      <!-- 已登录 -->
      <div v-if="isLogin" class="logout">
          <h1>尊敬的{{userInfo.mobile}},您好</h1>
          <div class="user clearfix">
            <span style="border-radius:50%;">
              <img :src="avatar" style="border-radius:50%;height:100%;"/>
            </span>
            <i>{{userInfo.mobile}}</i>
            <em v-if="userInfo.realStatus == 0">未认证</em>
            <em v-if="userInfo.realStatus == 1">已认证</em>
          </div>
          <p>上次登录时间：{{lastLoginTime}}</p>
          <div class="btn" @click="route('/account/accountDetail')">我的账户</div>
          <p style="text-align:right;padding-right:10px;padding-top:10px;cursor: pointer;font-size:12px;" @click="tuRechangeMoney">前往充值</p>
      </div>
    </div>
    <div class="content">
      <!-- 展示 -->
      <div class="importMsgBg">
        <div class="importMsg">
          <ul class="clearfix">
            <li v-for="(item,index) in list " :key="index">
              <div class="importMsg-img">
                <img :src="item.imageUrl" />
              </div>
              <div class="importMsg-text">
                <h1>{{item.name}}</h1>
                <p class="p">{{item.content}}</p>
                <p>{{item.text}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
     <!-- 新手专区 -->
     <div class="new-project">
       <div class="new-projectBox">
        <div class="new-projectBox-top">
          <span class="s1">
            <img src="../../images/all/new.png"/>
          </span>
          <h1>新手专区</h1>
          <span class="s2" @click="newClick(1)">查看更多>></span>
        </div>
        <div class="new-project-item clearfix" >
          <ul class="clearfix">
            <li v-for="(item,index) in projectList" :key="index" class="clearfix">
              <h1 style="font-size:16px;">{{item.name}}</h1>
              <div class="project-details clearfix">
                <div class="p1">
                  <p class="p_text">预期年化收益率</p>
                  <p class="p_detail">{{item.rate}}%</p>
                </div>
                <div class="p1">
                  <p class="p_text">投资期限</p>
                  <p class="p_detail">{{item.cycle}}天</p>
                </div>
                <div class="p1">
                  <p class="p_text">项目总额</p>
                  <p class="p_detail">{{item.money|chooseFour}}元</p>
                </div>
                <div class="p2">
                  <el-progress :percentage="item.percentage"></el-progress>
                  <p>剩余可投:{{item.money-item.collMoney|chooseFour}}</p>
                </div>
                <div class="p3">
                  <div @click="nowTz(item)" v-if="item.status == 20">立即投资</div>
                  <div v-if=" item.status != 20 && item.status != 40" style="background:#d7d7d7">已售罄</div>
                  <!-- <div v-if=" item.status != 40">已售罄</div> -->
                  <div v-if="item.status ==40 " style="background:#d7d7d7">已还款</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
       </div>
     </div>
    <!-- 精品专区 -->
      <div class="new-project" style="padding-bottom:50px;">
       <div class="new-projectBox">
        <div class="new-projectBox-top">
          <span class="s1">
            <img src="../../images/all/hot.png"/>
          </span>
          <h1>精品专区</h1>
          <span class="s2" @click="newClick(2)">查看更多>></span>
        </div>
        <div class="new-project-item clearfix" >
          <ul class="clearfix">
            <li v-for="(item,index) in hotList" :key="index" class="clearfix">
              <h1 style="font-size:16px;">{{item.name}}</h1>
              <div class="project-details clearfix">
                <div class="p1">
                  <p class="p_text">预期年化收益率</p>
                  <p class="p_detail">{{item.rate}}%</p>
                </div>
                <div class="p1">
                  <p class="p_text">投资期限</p>
                  <p class="p_detail">{{item.cycle}}天</p>
                </div>
                <div class="p1">
                  <p class="p_text">项目总额</p>
                  <p class="p_detail">{{item.money|chooseFour}}元</p>
                </div>
                <div class="p2">
                  <el-progress :percentage="item.percentage"></el-progress>
                  <p>剩余可投:{{item.money-item.collMoney|chooseFour}}</p>
                </div>
                <div class="p3">
                  <div @click="nowTz(item)" v-if=" item.status == 20">立即投资</div>
                  <div v-if=" item.status != 20 && item.status != 40" style="background:#d7d7d7">已售罄</div>
                  <!-- <div v-if=" item.status != 40">已售罄</div> -->
                  <div v-if="item.status ==40 ">已还款</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
       </div>
     </div>
    <m-dialog type="error" title="请登录" content="请先登录再操作~" v-model="dialog" @error="errorClick" errorText="去登录"></m-dialog>
    </div>
  </div>
</template>
<script>
import mRegist from '../../components/loginAndRegistration/RegistPage'
import mDialog from '../../components/vue_dialog/dialog'
export default {
  // name: 'Home',
  name: 'scroll-top',
  data () {
    return {
      dialog:false,
      avatar:require('../../images/people.png'),
      isImg:true,
      isHide:false,
      isShow:false,
      myLogin:false,
      person:'',
      personText:'',
      actual:'',
      actualText:'',
      profit:'',
      profitText:'',
      rundays:'',
      rundaysText:'',
      banner:[],
      list:[
        {name:"银行存管",content:"银行存管签订",text:"保障资金安全",imageUrl:require('../../images/all/pt_2.png')},
        {name:"完整风控",content:"银行风控标准",text:"专业团队保驾护航",imageUrl:require('../../images/all/pt_3.png')},
        {name:"稳定收益",content:"综合年化10%+跑赢M2",text:"历史100%兑付",imageUrl:require('../../images/all/pt_4.png')}
      ],
      projectList:[],
      hotList:[],
      userInfo:'',
      isMask: false, 
      mediaData:[],
      latestData:[],
      companyList:[],
      partnerList:[],
      newData:'',
      preciseData:[],
      surplus:'',
      progre: 0,
      popularity:'',
      rollList:[],
      dialogObj:{
        content:"",
        title:"",
      },
      type:"",
      userInfo:{},
      lastLoginTime:''
    }
  },
  computed: {
    isLogin() {
      if(sessionStorage.getItem('accesstoken')){
        return this.$store.state.isLogin
      }
    },
    optionPartner () {
      return {
        limitMoveNum: 4,
        direction: 2
      }
    },
    optionRoll() {
      return {
        limitMoveNum: 3,
        singleHeight: 30,
        waitTime: 3000
      }
    }
  },
  components: {
     mRegist,
     mDialog
  },
  methods:{
    //前往充值
    tuRechangeMoney(){
      this.$router.push({
        name:"account",
        query:{
           i:encodeURIComponent('去充值'),
        }
       
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
          that.userInfo = res.data.user;
          that.lastLoginTime = res.data.lastLoginTime;
          if(res.data.avatar != ''){
            that.avatar = res.data.avatar;
          }
          
        }
      })
    },
    // banner
    getBanner() {
      var that = this;
      that.service({
        url: "/sourceLink/indexPc.json",
        method: "post",
      }).then(res => {
        // console.log(res)
        if (res.code == 200) {
          that.banner = res.data;
        }
      })
    },
    //查看更多
    newClick(type){
        this.$router.push({
          name: 'moreList',
          params: {
            type: type
          }
        })
        this.$store.commit('changeActive',2)
    },
    errorClick(){
      this.$router.push('/login')
      this.$store.commit('changeActive',5)
    },
    //立即投资
    nowTz(item){
      let accesstoken = sessionStorage.getItem('accesstoken')
      if(!accesstoken){
        this.dialog = true
        return
      }
      this.$router.push({
        name:'investment',
        params:{
          id:item.subjId
        }
      });
      this.$store.commit('changeActive',2)
    },
    //判断异地登录，相关处理
    onlyOne() {
      checkLogin().then(res => {
        // debugger;
        if(res.state) {
          this.myLogin=true;//暂时没有用处，
          return
        }else {
          sessionStorage.removeItem('accesstoken');
          this.myLogin=false;//暂时没有用处，
          this.$message({
            message: res.msg,
            type: 'warning'
          });
          setTimeout(()=>{
            this.$store.commit('isLogout') //切换为登出状态
            this.$store.commit('changeActive',5)
            this.$router.push('/login')
          },2000)
        }
      })
    },
    route(target,i) {
      this.$store.commit('changeActive',i) //保证跳转是active的状态
      this.$router.push(target)
    },
    routeWithCode(data,i) {
      this.$store.commit('changeActive',i) //保证跳转是active的状态
      this.$router.push(data)
    },
    //格式化数据输出
    numRule(target,i) {
      if(i/1e8 >=1) {
        this[target] = i / 1e8
        this[target + 'Text'] = '亿'
      }else if(i/1e4>=1) {
        this[target] = i / 1e4
        this[target + 'Text'] = '万'
      }else {
        this[target] = i
      }
    },
    //获取首页投资列表
    getIndex(){
      var  that = this;
      that.service({
        url:"/subject/index.json?action=maimai",
        method:"POST",
      }).then(res=>{
        // console.log(res)
        if(res.code == 200){
          res.data.news.forEach(i =>{
            i.percentage =parseFloat(parseFloat(i.collMoney/i.money*100).toFixed(2))
          })       
          res.data.others.forEach(i =>{
            i.percentage = parseFloat(parseFloat(i.collMoney/i.money*100).toFixed(2))
          })
          that.projectList = res.data.news;
          that.hotList = res.data.others
        }
      }).catch(res => {
        console.log(res)
      })
    },

    initData() {
      this.getIndex()
      this.getBanner()
      if(sessionStorage.getItem('accesstoken')){
        this.getUserInfo()
      }
      
    }
  },
  filters: {
    fixed:function(val,num) {
      return parseFloat(val).toFixed(num)
    },
    chooseFour:function(val){
      if(val!=''||val != null){
        return parseFloat(val)/10000+'万'
      }
    }
  },
  mounted() {
    this.initData()
    //sessionStorage.setItem('active',1) //保证刷新时，active的状态
  }
}
</script>
<style lang="scss" scoped>
$exColor:#ff6e35;
$fontColorLight: #888;
#home {
  position: relative;
  background-color: #f4f4f4;
}
.header {
  position: relative;
  .banner {
    img {
      width: 100%;
      height: 100%;
    }
  }
  .login {
    position: absolute;
    z-index: 999;
    top:75px;
    left: 65%;
    width:270px;
    height:350px;
    padding-bottom: 30px;
    border-radius: 4px;
    background:#fff;
    p {
      font-size:24px;
      color:#fff;
      margin: 68px 0 0;
    }
    img {
      display: block;
      width:111px;
      height:100px;
      margin: 0 auto;
    }
    .btn {
      cursor: pointer;
      margin: 0 auto;
      width: 200px;
      /* padding: 10px 0; */
      line-height:40px;
      text-align: center;
      color: #fff;
      background-color: $exColor;
      font-size:18px;
    }
    .toLogin {
      font-size: 14px;
      margin-top: 20px;
      text-align: center;
      span {
        cursor: pointer;
        color:#fe9b00;
      }
    }
  }
  .logout {
    position: absolute;
    z-index: 999;
    top:75px;
    left: 65%;
    width:310px;
    padding-bottom: 30px;
    border-radius: 6px;
    background-color:#fff;
    padding:10px 10px 0 10px;
    h1{
      font-size: 16px;
    }
    .user{
      margin-top:20px;
      span{
        display: block;
        width:40px;
        height:40px;
        float:left;
      }
      i{
        display: block;
        float:left;
        padding-left:20px;
        font-style: normal;
        font-size: 14px;
        line-height: 40px;
      }
      em{
        font-style: normal;
        font-size: 12px;
        border:1px solid #0096ff;
        padding:0px 5px;
        margin-left:20px;
        color:#0096ff;
      }
    }
    p{
      font-size:14px;
      color:#666;
      padding:20px 0;
    }
    .btn{
      width:100%;
      margin:0 auto;
      text-align: center;
      padding:10px;
      color:#fff;
      background:#f22e3b;
      border-radius:8px;
      font-size: 12px;
      cursor: pointer;
    }
    
  }
}
.content {
  width:100%;
  margin: 0 auto; 
  background-color: #fff;
  /* height:20px; */
}
.newSlider{
  width:1200px;
  margin:0 auto;
  background:#fff;
  height:55px;
  border-bottom:1px solid #eee;
}
.importMsgBg{
  width:1000px;
  background-color: #fff;
  margin:0 auto;
}
.importMsg {
  width:100%;
  padding:45px 0;
  ul{
    //display: flex;
    width:100%;
    padding-left:40px;
    li{
     width:33.3%;
     float:left;
      .importMsg-img{
        float: left;
        width:100px;
        height:100px;
        border-radius: 50%;
      }
      .importMsg-text{
        float:left;
        padding-left:20px;
        h1{
          font-size: 22px;
        }
        p{
           font-size: 14px;
           &.p{
             margin-top:20px;
           }
        }
      }
    }
  }
}
.new-project{
  width:100%;
  background: #f4f4f4;
  overflow: hidden;
  .new-projectBox{
    width:1000px;
    margin:40px auto 0;
    .new-projectBox-top{
      background: #e6e6e6;
      height:50px;
      padding :0 50px 0 12px;
      clear: both;
      .s1{
        display: block;
        float:left;
        img{
          display:block;
          margin-top:12px;
        }
      }
      .s2{
        float:right;
        font-size: 12px;
        color:#666;
        display: block;
        line-height: 50px;
        cursor: pointer;
      }
      h1{
        font-size: 22px;
        color:#000;
        float:left;
        line-height: 50px;
        padding-left:15px;
        font-weight: 600;
      }
    }
  }
  .new-project-item{
    background: #fff;
    padding:30px 0;
    ul{
      width:100%;
      clear: both;
      li{
        border-bottom:1px solid #f4f4f4;
        clear: both;
        padding:30px 50px;
        &:last-of-type{
          border:0;
        }
        h1{
          padding-bottom:30px;
        }
        .project-details{
           clear: both;
           height:auto;
          .p1{
            border-right:1px solid #eee;
            &:nth-of-type(1){
              padding-left:0

            }
            padding:5px 40px;
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
          .p2{
            float:left;
            width:300px;
            padding:10px 40px;
            p{
              color:#666;
              font-size: 12px;
              margin-top:20px;
            }
          }
          .p3{
            float: right;
            padding-top:20px;
            div{
              background-color: #f22e3b;
              color:#fff;
              width:120px;
              height:42px;
              text-align: center;
              line-height: 42px;
              border-radius: 8px;
              font-size: 14px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}

.fixNav {
  position: fixed;
  z-index: 999;
  right: 0;
  top: 50%;
}

</style>
<style>
.el-progress-bar{
  display: block;
}
  .el-carousel__container {
    position: relative;
    height: 55px;
}
  .el-carousel__arrow--left {
    left: 1%;
    background: url("../../images/x1.png") no-repeat;
  }
  .el-carousel__arrow--right {
    left: 5%;
    background: url("../../images/x2.png") no-repeat;
  }
  .el-carousel__arrow {
    height: 15px;
    width: 15px;
    top: 50%;   
}
.el-tooltip__popper.is-light {
    background: none; 
    border: none;
}
.el-tooltip__popper .popper__arrow {
    /* border-width: 0; */
}
.el-progress__text{
  position:absolute;
  right:0;
  top:-5px;
}
.el-progress-bar__inner{
  background-color: red;
}
</style>  