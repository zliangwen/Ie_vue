<template>
  <div id="nav">
    <div class="content">
      <div class="logo">
        <img src="../../images/logo/logo.png" alt="" >
      </div>
      <ul class="menu" style="font-size:15px">
        <li :class="{'is-selected':active ==1}" @click="route('/home',1)">首页</li>
        <li :class="{'is-selected':active ==2}" @click="route('/money',2)">投资</li>
        <li :class="{'is-selected':active ==3}" @click="route('/about',3)">安全保障</li>
        <li :class="{'is-selected':active ==4}" @click="route('/information',4)">信息披露</li>
        <li :class="{'is-selected':active ==5}" @click="route('/account',5)">我的账户</li>        
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  computed:{
    active() {
      return this.$store.state.active
    }
  },
  watch: {
    '$route':'getPath'
  },
  methods: {
    route(target,i) {
      sessionStorage.setItem('active',i) //设置active状态
      this.$store.commit('changeActive',i)
      this.$router.push(target)
    },
    getPath() {
      var path = this.$route.path
      if(path.indexOf('/account') !== -1) {
        path = '/account'
      }
      // console.log(path)
      switch(path) {
        case '/home':
          this.$store.commit('changeActive',1)
          break;
        case '/money':
          this.$store.commit('changeActive',2)
          break;
        case '/about':
          this.$store.commit('changeActive',3)
          break;
        case '/information':
          this.$store.commit('changeActive',4)
          break;
        case '/account':
          this.$store.commit('changeActive',5)
          break;
      }
    }
  },
  mounted() {
    var flag = sessionStorage.getItem('active') || 1 //获取active状态，防止刷新变换
    this.$store.commit('changeActive',flag)
  },
}
</script>
<style lang="scss" scoped>
#nav {
  img{
    display: block;
  }
  overflow: hidden;
  .content {
    width: 1000px;
    margin: 0 auto;
    height:100px;
  }
  .logo {
    float: left;
    width: 440px;
    height: 56px;
    margin: 20px 0;
    // background-color: #c0c0c0;
    border-radius: 6px;
  }
  .menu {
    overflow: hidden;
    // display:flex;
    ul{
      height:100%;
    }
    li {
      cursor: pointer;
      // flex: 1;
      width:20%;
      float:left;
      height: 99px;
      padding: 0 10px;
      text-align: center;
      line-height: 100px;
      color:#595959;
      font-size: 15px;
    }
    .is-selected {
        color:#f22e3b;
        border-bottom:2px solid #f22e3b
      }
  }
}
</style>