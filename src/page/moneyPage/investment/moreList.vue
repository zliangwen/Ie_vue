<!--理财页面-->
<template>
  <div style="background:#f4f4f4;">
    <div class="content">
        <!--title -->
        <div class="title">
            {{title}}
        </div>
         <!-- 新手专区 -->
        <div class="new-project"  style="padding-bottom:50px;">
          <div class="new-projectBox">
              <div class="new-project-item clearfix" >
              <ul class="clearfix">
                  <li v-for="(item,index) in projectList" :key="index" class="clearfix">
                  <h1>{{item.name}}</h1>
                  <div class="project-details clearfix">
                      <div class="p1">
                        <p class="p_text">预期年化收益率</p>
                        <p class="p_detail">{{item.rate|fixed(2)}}%</p>
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
                        <el-progress :percentage="item.caeatePorp"></el-progress>
                        <p>剩余可投:{{item.money-item.collMoney|chooseFour}}</p>
                      </div>
                      <div class="p3">
                        <div @click="routeWithCode(item)" v-if="item.status == 20">立即投资</div>
                        <div  v-if="item.status != 20 && item.status != 40" style="background:#d7d7d7">已售罄</div>
                        <div  v-if="item.status == 40" style="background:#d7d7d7">已还款</div>
                      </div>
                  </div>
                  </li>
              </ul>
              </div>
          </div>
        </div>
     </div>
     <m-dialog type="error" title="请登录" content="请先登录再操作~" v-model="dialog" @error="errorClick" errorText="去登录"></m-dialog>
  </div>
</template>
<script>
import mDialog from '../../../components/vue_dialog/dialog'
export default {
  name: 'Money',
  data () {
    return {
      dialog:false,
      projectList:[
        {name:"新手专享555期",prop:15,time:15,totalMoney:200000,along:8000,profit:90.15},
        {name:"新手专享555期",prop:15,time:15,totalMoney:200000,along:8000,profit:92.15},
      ],
      hotList:[
        {name:"精品专享555期",prop:15,time:15,totalMoney:200000,along:8000,profit:90.15},
        {name:"精品专享555期",prop:15,time:15,totalMoney:200000,along:8000,profit:92.15},
        {name:"精品专享555期",prop:15,time:15,totalMoney:200000,along:8000,profit:90.15},
        {name:"精品专享555期",prop:15,time:15,totalMoney:200000,along:8000,profit:92.15},
      ],
      isShow : 1,
      title:"新手专享"
    }
  },

  components: {
    mDialog
  },
  methods: {
    //获取最新投资公告
    NewInvestNotice(){
      getInvestNotice().then(res=>{
        // console.log(res);
        this.NewNotice=res.data;
        // debugger;
      });
    },
    routeWithCode(item) {
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
    },
    errorClick(){
      this.$router.push('/login')
      this.$store.commit('changeActive',5)
    },
    active: function (data1,i) {
      //console.log(data1)
      //console.log(i)
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
  
    //检查参数 查询是哪种标
    getQueryType(){
      let type = this.$route.params.type;
      if(type == 1){
          this.title = "新手专享"
          this.getNewList(0)
      }else{
          this.title = "精品专享"
          this.getNewList(2)
      }
    },
    getNewList(type){
      var that = this;
      let data={
        types:type,
        page:1,
        row:5,
      }
      that.service({
        url:"/subject/list.json?action=query",
        method:"post",
        data:JSON.stringify(data)
      }).then(res=>{
        if(res.code == 200){
          res.data.forEach(i=>{
            i.caeatePorp = parseFloat((i.collMoney/i.money*100).toFixed(2))
          })
          that.projectList = res.data;
        }
      }).catch(res=>{
        console.log(res)
      })
    }
  },

  mounted(){
    this.getQueryType()
    sessionStorage.setItem('active',2) //保证刷新时，active的状态
    // this.getProjectName();
    // this.getProjectList();
    // this.NewInvestNotice()
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
   filters: {
    fixed:function(val,num) {
      return parseFloat(val).toFixed(num)
    },
    chooseFour:function(val){
      if(val!=''||val != null || val > 0){
        return parseFloat(val)/10000+'万'
      }else if(val == 0){
         return parseFloat(val)+'元'
      } 
    }
  },
}
</script>
<style scoped lang='scss'>  
.content{
  width:1000px;
  margin:0 auto;
  overflow: hidden;
  .title{
      width:264px;
      height:80px;
      border:2px solid #6d6d6d;
      color:#333;
      font-size: 22px;
      font-weight: 600;
      line-height: 75px;
      text-align: center;
      margin:50px auto 0;
  }
  .new-project{
  width:100%;
  background: #f4f4f4;
  overflow: hidden;
  .new-projectBox{
    width:1000px;
    margin:30px auto 0;
    .new-projectBox-top{
      background: #e6e6e6;
      height:50px;
      padding :0 50px 0 12px;
      clear: both;
      .s1{
        display: block;
        float:left;
        img{
          display: inline-block;
          margin-top:12px;
        }
      }
      .s2{
        float:right;
        font-size: 12px;
        color:#666;
        display: block;
        line-height: 50px;
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
el-progress {
    width: 100%;
    margin-left: 0;
}
.el-progress-bar__inner{
  background-color: red;
}
</style>
