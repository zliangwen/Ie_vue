<template>
  <div id="header">
    <div v-if="!isLogin" class="content">
      <div class="menu">
        <ul class="menu-list">
          <li >
            <i class="icon1"></i>
            <span style="">手机客户端下载
               <img src="../../images/information/app.png" alt="">
            </span>
          </li>
          <li @click="route('/login',5)">您好,请登录</li>
          <li @click="route('/regist',5)" style="color:#f22e3b">立即注册</li>
        </ul>
      </div>
    </div>
    <div v-if="isLogin" class="content">
      <div class="menu">
        <ul class="menu-list">
          <li >
            <i class="icon1"></i>
            <span style="">手机客户端下载
               <img src="../../images/information/app.png" alt="">
            </span>
          </li>
          <li v-if="mobileAction != ''">您好,{{mobileAction}}</li>
          <li v-if="mobileAction == ''">您好,{{mobile}}</li>
          <li  @click="logout" style="color:#f22e3b">退出</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
//import {logout,checkLogin,getArticleList} from '@/services/getDetail'
export default {
  data() {
    return {
      latestData:[],
      mobile:""
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin
    },
     optionHead () {
      return {
        limitMoveNum: 2,
        singleHeight: 20,
        waitTime:2000
      }
    },
    mobileAction(){
      return this.$store.state.mobile
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
    logout() {
      var that = this;
      that.service({
        url:"/user/logout.json",
        method:'post',
        data:{
          device:that.device,
          token:sessionStorage.getItem('accesstoken')
        }
      }).then(res=>{
        if(res.code == 200){
          this.$message({
            message: '退出成功',
            type: 'success',
            showClose: true,
            duration: 3 * 1000
          })
          sessionStorage.removeItem('accesstoken')
          setTimeout(()=>{
            this.$store.commit('isLogout') //切换为登出状态
            this.$store.commit('changeActive',1)
            this.$router.push('/home')
          },50)
        }
      }).catch(res=>{

      })
    },
    //判断异地登录，相关处理
    onlyOne() {
      checkLogin().then(res => {
        // debugger;
        if(res.state) {
        
          return
        }else {
          sessionStorage.removeItem('accesstoken')
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
          // console.log(that.mobile)
        }
      })
    },
    initData() {
      this.getLatest()
    }
  },
  filters:{
    subStringPhone:function(val){
      if(val !='' || val != null){
        return val.substring(0,3)+'****'+val.substring(7,val.length)
      }
    }
  },
  mounted() {
    var accesstoken = sessionStorage.getItem('accesstoken')
    if(accesstoken) {
      this.$store.commit('isLogin') 
      this.getUserInfo()
    }
    //
  }
}
</script>
<style lang="scss" scoped>
#header {
  background-color: #eeeeee;
  color: #666;
  height:40px;
  .content {
    width: 1000px;
    margin: 0 auto;
    font-size: 14px;
    padding: 10px 0;
    overflow: hidden;
    .msg {
      float: left;
      overflow: hidden;
      height: 20px;
      i {
        display: inline-block;
        height: 12px;
        width: 19px;
        background: url("../../images/radio.png") no-repeat;
        background-size: contain;
      }
      .seamless-warp {
        float: right;
        height: 50px;
        overflow: hidden;
        li {
          height: 20px;
          line-height: 20px;
        }
        a {
          cursor: pointer;
          margin-left: 10px;
          color: #fe9b00;
        }
      }
    }
    .menu {
      float:right;
      .phone {
        float: left;
        margin-right: 20px;
      }
      .menu-list {
        overflow: hidden;
        li {
          cursor: pointer;
          float: left;
          padding: 0 20px;
          &:last-of-type {
            border: none;
          }
          i {
            display: inline-block;
            height: 20px;
            width: 25px;
            background-size: contain;
            img {
              width: 120px;
              height: 120px;
              position: absolute;
              z-index: 10;
              margin-top: 30px;
              display: none;
            }
            &.icon1 {
              // margin-top: -5px;
              float:left;
              margin-left: 10px;
              background: url("../../images/phone.png") no-repeat;
              // &:hover img {
              //   display: block;
              //   margin-left: -100px;
              // }
            }
            &.icon2 {
              margin-top: -5px;              
              margin-left: 20px;
              background: url("../../images/wx.png") no-repeat;
              &:hover img {
                display: block;
                margin-left: -100px;
              }
            }
          }
          span{
            display:block;
            float:left;
            img{
              width: 120px;
              height: 120px;
              position: absolute;
              z-index: 10;
              margin-top: 10px;
              display: none;
            }
          }
          span:hover img{
              display: block;
              // margin-left: -100px;
          }
        }
      }
    } 
  }
}
</style>
