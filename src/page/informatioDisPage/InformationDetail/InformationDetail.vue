<!-- 信息披露页面-详细页 -->
<template>
  <div class="infor">
    <div class="all_body">
      <!-- banner -->
      <!-- <div class="wrap"></div> -->
      <!-- 主体 -->
      <!-- 政策法规 -->
      <div class="topTitle">
        <div>
          <p class="topIntroduce ">内容详情<span class="spanIntroduce"> /Details of the content</span></p>
        </div>
      </div>
      <div class="informationDetail">
        <!-- <div class="title">{{dataList.name}}</div> -->
        <!-- <p>{{dataList.publishTime}}</p> -->
        <div class="content" v-html="dataList.content"></div>
      </div>
    </div>
    <!-- <div class="foot">
      <m-footer></m-footer>
    </div> -->

  </div>
</template>

<script>
export default {
  name: 'InformatioDis',
  data () {
    return {
      tabs:0,
      dataList:[],
    }
  },
  methods:{
    active: function (index) {
      this.tabs=index;
    },
    getArticle() {
      var that = this;
      var id = that.$route.query.id;
      // console.log(id)
      var data = {
        id: id,
        device: this.device
      }
      that.service({
        url: "/sourceLink/detail.json",
        method: "post",
        data: JSON.stringify(data),
      }).then(res => {
        if (res.code == 200) {
          that.dataList = res.data;
        }
      }).catch(res => {
      })
    },
    // getArticle() {
    //   var data = {
    //     // category: '02',
    //     // articleType: '04',
    //     // articleId:this.$route.query.articleId
    //   }
    //   getArticle(this.$route.query.id).then(res => {
    //     // console.log(res)
    //     if(res.state) {
    //       this.articleList = res.data;
    //     }
    //   });

    // }
  },
  mounted() {
    sessionStorage.setItem('active', 4) //保证刷新时，active的状态
    this.getArticle()
  },
  components: {

  }
}
</script>
<style lang="scss" scoped> 
  .topTitle{
    width:1000px;
   padding:30px 20px;
    .topIntroduce{
      border-left: 3px red solid;
      padding-left: 8px;
      font-size:20px;
      .spanIntroduce{
        font-size: 	14px;
        color: #B0B0B0;
        padding-left:10px;
      }
    }
  }
  .infor{
    width:100%;
    color:#333;
    background: #f4f4f4;
    overflow: hidden;
    .all_body{
      width:1000px;
      background: #fff;
      margin:50px auto;
      .wrap{
        /* position:relative; */
        width: 100%;
        height: 300px;
        background-image: url("../../../images/about/topImg.png");
        img{
          width:100%;
          height:auto;
        }
      }
      .img_word{
        position: absolute;
        top:20%;
        left:18%;
        .p1{
          color:#fff;
          font-size:36px;
          padding-bottom:30px;
        }
        .p2{
          color:#fff;
          font-size:16px;
          width:67%;
          line-height:30px;
        }
      }

      /*.navigation{
        width:100%;
        box-shadow: inset 0px -3px 8px 0px rgba(0, 0, 0, 0.1);
        ul{
          width:1200px;
          margin:0 auto;
          height:55px;
        }
        .liClass{
          float:left;
          font-size:16px;
          line-height:55px;
          width:11%;
          cursor: pointer;
        }
      }
      .liContent{
        color:#e83737;
        span{
        border-bottom: 1px solid #e52921;
        padding-bottom:15px;
      }*/
      .informationDetail{
        width:1000px;
        padding:0 30px;
        .title{
          text-align: center;
          font-size:24px;
        }
        p{color:#999;text-align: right;padding:20px;}
        .content{
          font-size:14px;
          line-height:25px;
          padding-top:30px;
          padding-bottom:20px;
        }
      }
    }

  }
  
  /*公共标题*/
  /*.title{
      width:1200px;
      margin:0 auto;
      padding:40px 0 18px 0;
      border-bottom:1px solid #eee;
      div{
        border-left:2px solid #e52921;
        padding-left:10px;
        font-size: 24px;
        color:#000;
        span{
          font-size: 14px;
          color:#888;
          padding-left:5px;
        }
      }
    }*/
</style>  