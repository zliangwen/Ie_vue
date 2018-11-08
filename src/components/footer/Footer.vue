<template>
  <div id="footer">
    <div class="content">
      <div class="foot-msg">
        <p class="p1">客服热线</p>
        <h1>400-006-2140</h1>
        <p class="p2">工作时间：9:00-18:00</p>
      </div>
      <div class="foot-center">
          <ul class="clearfix">
            <!-- <router-link tag="li" v-for="(item,index) in list" :key="index" :to="item.target">
               {{item.name}}
            </router-link> -->
            <li @click="routeWithCode({path:'/money'})">投资列表</li>
            <li @click="routeWithCode({path:'/information',query:{state:4}},4)">官方公告</li>
            <li @click="routeWithCode({path:'/about'})">安全保障</li>
            <li @click="routeWithCode({path:'/information',query:{state:6}},4)">关于我们</li>
          </ul>
          <p class="p3">备案号&copy;粤ICP备17163290号-1</p>
          <p>版权所有&copy;深圳前海集萃汇互联网金融服务有限公司</p>
      </div>
      <div class="footer-right">
        <img src="../../images/information/app.png" />
        <p>移动客户端</p>
      </div>
    </div>  
  </div>
</template>
<script>
export default {
  data() {
    return  {
      list:[
        {name:"投资列表", target: '/money'},
        {name:"官方公告", target: '/information'},
        {name:"安全保障", target: '/about'},
        {name:"关于我们", target: '/information'}
      ]
    }
  },
  methods:{
    route(target,i) {
      this.$store.commit('changeActive',i) //保证跳转是active的状态      
      this.$router.push(target)
    },
    routeWithCode(data,i) {
      this.$store.commit('changeActive',i) //保证跳转是active的状态
      this.$router.push(data)
    },
  }
}
</script>
<style lang="scss" scoped>
#footer {
  clear: both;
  background-color: #424458;
  overflow: hidden;
  color: #fff;
  padding:60px 0;
  .content{
    width:1000px;
    margin:0 auto;
    height:100%;
    .foot-msg{
      width:184px;
      float:left;
      p.p1{
        text-align: center;
        font-size: 16px;
        color:#fff;
      }
      h1{
        text-align: center;
        font-size: 24px;
        margin:30px 0;
         color:#fff;
      }
      p.p2{
        text-align: center;
        font-size: 14px;
         color:#fff;
      }
    }
    .foot-center{
      width:640px;
      float:left;
      padding:0 149px;
      ul{
        // display: flex;
        padding-top:20px;
        li{
          // flex:1;
          width:25%;
          float:left;
          border-right:1px solid #fff;
          text-align: center;
          font-size: 14px;
          cursor: pointer;
           color:#fff;
          &:last-of-type{
            border:0;
          }
          &:hover {
            text-decoration: underline;
          }
        }
      }
      p{
        padding-left:12px;
        font-size: 14px;
         color:#fff;
      }
      p.p3{
         color:#fff;
        margin:28px 0;
      }
    }
    .footer-right{
      float:right;
      p{
        font-size: 14px;
        text-align: center;
        margin-top:10px;
         color:#fff;
      }
    }
  }
}
</style>