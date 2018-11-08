<!-- 信息披露页面 -->
<template>
  <div class="infor">
    <div class="all_body">
      <!-- banner -->
      <div class="wrap">
        <div class="img"><img src="../../assets/imgs/BJ.png" alt=""></div>
        <!-- <div class="img_word">
          <p class="p1">理财，就享自在</p>
          <p class="p2">一家全透明的互联网理财优选平台，中国互联网融协会首批会员单位。平台由XX股份有限公司研发运营，是政府重点支持的互联网金融企业。</p>
        </div> -->
      </div>  
      <!--  -->
      <div class="main_content">
        <ul>
          <router-link tag="li" v-for="(item,index) in helpList" :key="index" :to="{path:'/InformationDetail',query:{id:item.articleId}}">
          <p></p>{{item.articleName}}
          </router-link>
        </ul>
      </div>
    </div>
    <!-- <mFooter></mFooter> -->
  </div>
</template>

<script>
import mFooter from '@/components/Footer/Footer'
//import {getinformationList} from '@/services/getDetail'
export default {
  name: 'InformatioDis',
  data () {
    return {
      helpList:[]
    }
  },
  mounted(){
    sessionStorage.setItem('active',1) //保证刷新时，active的状态
    var that = this;
    that.getLatest()
  },
  methods:{
    getLatest() {
      // 备案信息
      var data = {
        pageId: 1,
        pageSize: 20,
        category: '02',
        articleType: '07'
      }
      getinformationList(data).then(res => {
        // console.log(res)
        var that = this;
        if(res.state) {
          that.helpList = res.data.dataList;
        }
      });
    },

  },

  components: {
    mFooter
  }
}
</script>
<style lang="scss" scoped> 
  .infor{
    width:100%;
    color:#000;
    .all_body{
      margin-bottom:50px;
      .wrap{
        position:relative;
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
      .main_content{
        width:1200px;
        margin:50px auto;
        li{
          line-height:50px;
          border-bottom: 1px solid #eee;
          p{
            width: 6px;
            height: 6px;
            background-color: #f7aaa7;
            border-radius: 2px;
            float:left;
            margin-right: 10px;
            margin-top: 22px;
          }
        }
      }
    }
  }
  
 
</style>  