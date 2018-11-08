<!--理财页面-->
<template>
  <div style="background:#f4f4f4;">
    <div class="content">
         <!-- 新手专区 -->
      <div class="new-project" v-if="projectList.length != 0">
        <div class="new-projectBox">
          <div class="new-projectBox-top">
            <span class="s1">
              <img src="../../images/all/new.png"/>
            </span>
            <h1>新手专区</h1>
            <span class="s2" @click="newClick">查看更多>></span>
          </div>
          <div class="new-project-item clearfix" >
            <ul class="clearfix">
              <li v-for="(item,index) in projectList" :key="index" class="clearfix">
                <h1>{{item.name}}</h1>
                <div class="project-details clearfix">
                  <div class="p1">
                    <p class="p_text">预期年化收益率</p>
                    <p class="p_detail">{{item.rate.toFixed(2)}}%</p>
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
                    <p>剩余可投:{{item.money - item.collMoney | chooseFour}}</p>
                  </div>
                  <div class="p3">
                    <div @click="nowTz(item)" v-if="item.status == 20">立即投资</div>
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
    <!-- 精品专区 -->
      <div class="new-project" style="padding-bottom:50px;" v-if="hotList.length != 0">
        <div class="new-projectBox">
          <div class="new-projectBox-top">
            <span class="s1">
              <img src="../../images/all/hot.png"/>
            </span>
            <h1>精品专区</h1>
            <span class="s2" @click="hotClick">查看更多>></span>
          </div>
          <div class="new-project-item clearfix" >
            <ul class="clearfix">
              <li v-for="(item,index) in hotList" :key="index" class="clearfix">
                <h1>{{item.name}}</h1>
                <div class="project-details clearfix">
                  <div class="p1">
                    <p class="p_text">预期年化收益率</p>
                    <p class="p_detail">{{item.rate.toFixed(2)}}%</p>
                  </div>
                  <div class="p1">
                    <p class="p_text">投资期限</p>
                    <p class="p_detail">{{item.cycle}}天</p>
                  </div>
                  <div class="p1">
                    <p class="p_text">项目总额</p>
                    <p class="p_detail">{{item.money | chooseFour}}元</p>
                  </div>
                  <div class="p2">
                    <el-progress :percentage="item.percentage" ></el-progress>
                    <p>剩余可投:{{item.money - item.collMoney | chooseFour}}</p>
                  </div>
                  <div class="p3">
                    <div @click="nowTz(item)" v-if="item.status == 20">立即投资</div>
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
    <!-- 售罄 -->
       <!--  <div class="new-project" style="padding-bottom:50px;" v-if="sellOut.length != 0">
        <div class="new-projectBox">
          <div class="new-projectBox-top">
            <span class="s1">
              <img src="../../assets/imgs/all/hot.png"/>
            </span>
            <h1>售罄</h1>
            <span class="s2" @click="hotClick">查看更多>></span>
          </div>
          <div class="new-project-item clearfix" >
            <ul class="clearfix">
              <li v-for="(item,index) in sellOut" :key="index" class="clearfix">
                <h1>{{item.name}}</h1>
                <div class="project-details clearfix">
                  <div class="p1">
                    <p class="p_text">预期年化收益率</p>
                    <p class="p_detail">{{item.rate.toFixed(2)}}%</p>
                  </div>
                  <div class="p1">
                    <p class="p_text">投资期限</p>
                    <p class="p_detail">{{item.cycle}}天</p>
                  </div>
                  <div class="p1">
                    <p class="p_text">项目总额</p>
                    <p class="p_detail">{{item.money | chooseFour}}元</p>
                  </div>
                  <div class="p2">
                    <el-progress :percentage="parseFloat((item.collMoney/item.money * 100).toFixed(2))" ></el-progress>
                    <p>剩余可投:{{item.money - item.collMoney | chooseFour}}</p>
                  </div>
                  <div class="p3">
                   <div @click="routeWithCode" v-if="item.status == 20">立即投资</div> 
                    <div  style="background:#d7d7d7;color:#fff;">售罄</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
       </div>
     </div>-->


    </div>
    <m-dialog type="error" title="请登录" content="请先登录再操作~" v-model="dialog" @error="errorClick" errorText="去登录"></m-dialog>
  </div>
</template>
<script>
//import {getInvestNotice,getProjectName,getProjectList} from '@/services/getDetail'
import mDialog  from '../../components/vue_dialog/dialog'
export default {
  name: 'Money',
  data () {
    return {
      projectList:[ ],
      hotList:[],
      sellOut:[],
      dialog:false,
      title:"",
      content:"",
    }
  },
  components: {
    mDialog
  },
  methods: {
    //获取最新投资公告
    NewInvestNotice(){
      getInvestNotice().then(res=>{
        this.NewNotice=res.data;
      });
    },
   
    //新手查看更多
    newClick(){
        this.$router.push({
          name: 'moreList',
          params: {
            type: 1
          }
        })
    },
    //精品查看更多
    hotClick(){
        this.$router.push({
          name: 'moreList',
          params: {
            type: 2
          }
        })
    },
    routeWithCode(name,item) {
        let accesstoken = sessionStorage.getItem('accesstoken')
        if(!accesstoken){
          this.dialog = true;
          return
        }
        this.$router.push({
          name:'investment',
          params:{
            id:item.subjId
          }
        });
       
    },
    errorClick(){
      this.$router.push('/login')
      this.$store.commit('changeActive',5)
    },
    active: function (data1,i) {
      //切换项目时，初始化参数状态
      this.issueType = '01'
      this.rateType = '01'
      this.pageId = 1
      //切换项目时，初始化分页状态
      this.currentPage = 1
      this.projectId = data1.id;
      // debugger;
      this.isTransfer = data1.isTransfer;
      this.status = data1.status;
      //console.log(this.isActive)
      this.isActive= i;
      this.getProjectList()
    },
    rankO:function(){
      this.projectId='';
      if(this.issueType == '01') {
        this.issueType = '02'
      }else {
        this.issueType = '01'
      }
      this.getProjectList()
    },
    rankT:function(){
       this.projectId='';
      if(this.rateType == '01') {
        this.rateType = '02'
      }else {
        this.rateType = '01'
      }
      this.getProjectList()
    },
    pageAdd() {
      this.pageId +=1
    },
    pageDel() {
      this.pageId -=1
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageId = val
      this.getProjectList()
    },
    //转换时间
  format(time, format)
      {
      var t = new Date(time);
      var tf = function(i){return (i < 10 ? '0':"") + i};
      return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
      switch(a){
      case 'yyyy':
      return tf(t.getFullYear());
      break;
      case 'MM':
      return tf(t.getMonth() + 1);
      break;
      case 'mm':
      return tf(t.getMinutes());
      break;
      case 'dd':
      return tf(t.getDate());
      break;
      case 'HH':
      return tf(t.getHours());
      break;
      case 'ss':
      return tf(t.getSeconds());
      break;
      }
      })
  },
  //获取投资列表数据
    getList(){
      var that = this;
      that.service({
        url:"/subject/list.json?action=maimai",
        method:"POST",
        data:{
          device:that.device,
        }
      }).then(res =>{
        if(res.code == 200){
          res.data.newcomer.forEach(i =>{
            i.percentage =parseFloat(parseFloat(i.collMoney/i.money*100).toFixed(2))
          })
          res.data.hot.forEach(i =>{
             i.percentage =parseFloat(parseFloat(i.collMoney/i.money*100).toFixed(2))
          })
          that.projectList = res.data.newcomer
          that.hotList = res.data.hot
          that.sellOut = res.data.sellOut
        }
      }).catch(res=>{
        console.log(res)
      })
    },
    nowTz(item) {
      let accesstoken = sessionStorage.getItem('accesstoken')
      if (!accesstoken) {
        this.dialog = true
        return
      }
      this.$router.push({
        name: 'investment',
        params: {
          id: item.subjId
        }
      });
      this.$store.commit('changeActive', 2)
    },
  },
  mounted(){
    sessionStorage.setItem('active',2) //保证刷新时，active的状态
    this.getList();
    //this.getProjectList();
    //this.NewInvestNotice()
  },
    computed: {
    optionHead () {
      return {
        limitMoveNum: 2,
        singleHeight: 21,
        waitTime:1000,
        // singleWidth:0
      }
    }
  },
  //过滤器
  filters:{
    chooseFour:function(val){
      if(val != '' || val != null ){
        return parseFloat(val) / 10000 +'万'
      }
    }
  }
}
</script>
<style scoped lang='scss'>  
.content{
  width:1000px;
  margin:0 auto;
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
          display: block;
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
          font-size: 16px;
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
}
</style>  
<style>
 .el-pager li {
    background: none;
}
.el-progress__text{
  position:absolute;
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
