<!--账户页面-->
<template>
  <div>
    <div class="account">
      <div class="body">
        <div class="main">
          <el-container>
            <!-- 左边布局 -->
            <el-aside width="200px">
              <div>
                <!-- <p><img src="../../assets/imgs/ac_1.png" alt="">我的账户</p> -->
                <ul>
                  <router-link tag="li" to="/account/accountDetail">账户总览</router-link>
                  <router-link tag="li" to="/account/ourUanme">我的优惠券</router-link>
                  <router-link tag="li" to="/account/moneyRecord">资金明细</router-link>
                  <router-link tag="li" to="/account/accountInvest">投资记录</router-link> 
                  <router-link tag="li" to="/account/accountSettingCard">我的银行卡</router-link>
                  <router-link tag="li" to="/account/accountSetting">个人资料</router-link> 
                  <!-- <router-link tag="li" to="/account/rechargeRecord">充值记录</router-link>
                  <router-link tag="li" to="/account/withdrawRecord">提现记录</router-link>                   -->
                </ul>
              </div>

              <div>
                <!-- <p><img src="../../assets/imgs/ac_2.png" alt="">活动管理</p> -->
                <ul>
                  
                </ul>
              </div>
              <div>
                <!-- <p><img src="../../assets/imgs/ac_3.png" alt="">账户管理</p> -->
                <ul>
                  <!-- <router-link tag="li" to="/account/accountFriend">邀请好友</router-link>
                  <router-link tag="li" to="/account/accountNew">我的消息</router-link> -->
                  
                </ul>
              </div>
            </el-aside>
            <!-- 右边布局 -->
            <el-main>
              <router-view/>
            </el-main>
          </el-container>
        </div>
      </div>
    </div>
    <!-- <div class="foot">
      <m-footer></m-footer>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'account',
  data () {
    return {
      accesstoken:''
    }
  },
  components: {
  },
  methods:{
    
  },
  mounted() {
    sessionStorage.setItem('active',5) //保证刷新时，active的状态
    this.accesstoken = sessionStorage.getItem('accesstoken')
    if(this.accesstoken) {
      return
    }else {
      this.$router.push('/login')
    }
    if(this.accesstoken) {
      return
    }else {
      this.$router.push('/account')
    }
  }
}
</script>
<style lang="scss" scoped>  
  .account{
    width:100%;
    background-color: #f4f4f4;
    /*margin:200px 0;*/
    .body{
      width:1000px;
      margin:0 auto;
      overflow: hidden;
      background-color: #f4f4f4;
      .main{
        margin: 20px 0 50px;
        background-color: #f4f4f4;
        /*左边布局*/
        .el-aside {
          background-color: #f4f4f4;
          color: #000;
          float:left;
          /* border-right:1px solid #eee; */
          div{
            background: #d7d7d7;
            p{
              margin:0 20px 20px;
              font-size:14px;
              img{
                padding-right:10px;
                vertical-align: middle;
              }
            }
            ul{
              li{
                cursor: pointer;
                width:100%;
                font-size:16px;
                text-align: center;
                line-height:50px;
              }
              .router-link-active{
                background-color: #fff;
                color:#f22e3b;
              }
            }
          }
        }  
        /*右边布局*/
        .el-main {
          background: #fff;
        }
      }
    }
  }
</style>  