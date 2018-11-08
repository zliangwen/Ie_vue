<!--关于页面-->
<template>
<div class="all">
  <div class="allDetail">
    <div class="topImg">
      <div class="top"></div>
    </div>
    
    <div class="safe">
      <div class="first">
        <div class="left">
          <h1>01 平台资金银行存管</h1>
          <p>麦麦理财引入第三方资金托管机构，资金流转在银行账户体系内完成，实现平台自有资金与出借人、借款人资金隔离，最大限度保障用户资金安全，率先迈入合规发展。</p>
        </div>
        <div class="right">
          <img src="../../images/safe/1.png" alt="">
        </div>
      </div>
      <div class="first">
        <div class="right">
          <img src="../../images/safe/2.png" alt="">
        </div>
        <div class="left c1">
          <h1>02 大数据风控系统</h1>
          <p>麦麦理财拥有一套一系列系统平台组成的互联网金融大数据智能风控系统。结合借贷行业数据分析模型，实现还原借贷人真实模型，从而完成智能风控评审。系统全实时动态追踪，将风险止于初期。</p>
        </div>
      </div>
      <div class="first">
        <div class="left">
          <h1>03 七重审核工序 杜绝借款风险</h1>
          <p>在借款人提交申请之后，合作资产端将对借款人进行严格的七重初审工序，资料收集、信息核实、现场勘查、小组初议、小组再议、提上审贷会、落实执行严格，再对借款项目进行全面、专业的实地尽职调查。</p>
        </div>
        <div class="right">
          <img src="../../images/safe/3.png" alt="">
        </div>
      </div>
      <div class="first">
        <div class="right">
          <img src="../../images/safe/4.png" alt="">
        </div>
        <div class="left c1">
          <h1>04 信息披露阳光透明 专业铸造信赖</h1>
          <p>麦麦理财严格遵守银监会发布的《网络借贷信息中介机构业务活动信息披露指引》，对备案信息、组织信息、审核信息和项目信息涉及到的各个指标进行全面透明信息披露，打造互联网金融行业信息披露标杆。</p>
        </div>
      </div>
      <div class="first">
        <div class="left">
          <h1>05 BAT技术团队保驾护航</h1>
          <p>麦麦理财建立了专业的技术团队，从技术层面、内部建设和隐私管理等方面建立银行级安全保障体系；引入阿里云技术，采用最高安全级别国际SSL加密认证，为平台数据提供DDoS、WAF防护；设有异地灾难应急备用服务器。</p>
        </div>
        <div class="right">
          <img src="../../images/safe/5.png" alt="">
        </div>
      </div>
      <div class="first" style="border-bottom:none;">
        <div class="right">
          <img src="../../images/safe/6.png" alt="">
        </div>
        <div class="left c1">
          <h1>06 法律护航专业支持合规经营</h1>
          <p>麦麦理财聘用了浙江正泰律师事务所作为公司的常年法律顾问。麦麦理财所有业务活动以及相关合同和协议均咨询律师事务所，确保其符合相关法律法规，麦麦理财合法守信经营，让麦麦理财的用户权益受国家法律保护。</p>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script>
export default {
  name: 'About',
  data () {
    return {
      isActive:1,
      state:'',
      activeButton:3,
      testShow:1,
      companyList:[],
    }
  },
  components: {
    
  },
  watch: {  
  // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可  
    '$route': 'getQuery'  
  },
  methods: {
    active: function (a) {
      this.isActive=a;
      this.$route.query.state=this.isActive
    },
    activeB:function(a){
      this.activeButton=a;
    },
    test:function(){
      this.testShow=0;
      // alert(window.location.href);
    },
     pageAdd() {
      this.pageId +=1
    },
    pageDel() {
      this.pageId -=1
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      //this.pageId = val
      var data = {
        pageId: val,
        pageSize: 5,
        category: '02',
        articleType: '04'
      }
      getaboutList(data).then(res => {
         console.log(res)
        var that = this;
        if(res.state) {
           that.rowCount = res.data.rowCount
          that.platform = res.data.dataList;
        }
      });
    },

    getQuery(){
       let routerRuery = this.$route.query.state || 1 
       // console.log(routerRuery)
       this.isActive=routerRuery
    },
    initData() {
      // 公司简介
      var data = {
        pageId: 1,
        pageSize: 5,
        category: '02',
        articleType: '01'
      }
      getaboutList(data).then(res => {
        //console.log(res)
        var that = this;
        if(res.state) {
          that.companyList = res.data.dataList;
        }
      });
    },
    toDetail(item){
      this.$router.push({
        path:'/InformationDetail',
        query:{
          id:item.articleId
        }
      });
    },
  },
  mounted() {
    sessionStorage.setItem('active',3) //保证刷新时，active的状态
    // this.initData()
    // this.getQuery()
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->  
<style scoped> 
  .all{
    background: #f4f4f4;
    overflow: hidden;
  }
  .allDetail{
    margin:50px 0;
  }
  .topImg{
    width: 1000px;
    margin:0 auto;
    height: 300px;
    background-image: url("../../images/safe/topImg.jpg");
    /* background-size:100% 100%; */
  }
  .top{
    padding-top: 90px;
    margin-left: 19%;
  }
  .safe{
    width:1000px;
    margin:0 auto;
    background: #fff;
    padding:0 50px;
  }
  .safe .first{
    display:flex;
    border-bottom:1px solid #e4e4e4;
    padding:50px 0;
  }
  .safe .first .left{
    flex:2;
  }
  .safe .first .left>h1{
    font-size:20px;
    color:#666;
    font-weight: bold;
    padding-bottom:20px;
  }
  .safe .first .left>p{
    font-size:16px;
    color:#999;
    width:80%;
    line-height:25px;
  }
  .safe .first .c1 h1{
    float:right;
  }
  .safe .first .c1 p{
    float:right;
  }
  .safe .first .right{
    flex:1;
  }
</style>  