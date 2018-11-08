<!--我的账户-我的优惠页面-->
<template>
<div>
  <div class="content">
    <div class="title">
      <i></i>
      <span>我的优惠券</span>
    </div>
    <!-- 按钮 -->
    <div class="Button">
      <span v-on:click="XJButtonActive('0')" :class="{'active' : isXJButtonActive=='0'}">可使用</span>
      <span v-on:click="XJButtonActive('1')" :class="{'active' : isXJButtonActive=='1'}">已使用</span>
      <span v-on:click="XJButtonActive('2')" :class="{'active' : isXJButtonActive=='2'}">已过期</span>
    </div>
    <ul  v-if="!noData">
      <li v-for="(item,index) in couponList" :key="index">
        <div class="top">
          <div class="left">
            <p>投资期限≥{{item.limitCycle}}天</p>
            <p>投资金额≥{{item.limitMoney}}元投资</p>
            <p v-if="item.applyProject == 1">适用项目：新手专享除外</p>
            <p v-if="item.applyProject == 2">适用项目：仅适用于精品区</p>
            <p v-if="item.applyProject == 3">适用项目：仅适用于活动区</p>
            <p v-if="item.applyProject == 4">适用项目：仅适用于爆款区</p>
            <p v-if="item.applyProject == 5">适用项目：仅适用于精品及活动区</p>
          </div>
          <div class="right" v-if="item.type == '0'">
            <div>¥{{item.value}}</div>
            <p >抵扣券</p>
          </div>    
          <div class="right" v-if="item.type == '1'">
            <div>{{item.value}}%</div>
            <p >加息券</p>
          </div>      
        </div>
        <div class="time">有效期：{{item.validTime | toFixed}} - {{item.invalidTime | toFixed}}</div>
      </li>
    </ul>
    <div v-if="!noData" class="pageNation" style="text-align: center;">
      <el-pagination :page-size="10" layout="prev, pager, next" :total="rowCount" :current-page.sync="currentPage" @current-change="handleCurrentChange"
        @prev-click="pageDel" @next-click="pageAdd">
      </el-pagination>
    </div>
    <div v-if="noData" class="noData">暂无数据</div>
  </div>
</div>

</template>

<script>
export default {
  name: 'Uanme',
  data () {
    return {
      couponType:'0',     
      noData:false,
      isXJButtonActive:'0',
      couponList:[],
      data: {
        page: 1,
      },
      rowCount: 1,
      currentPage: 1,
    }
  },
  components: {
  },
  methods: {
    //切换优惠券券下的子菜单
    XJButtonActive:function(a){
      this.isXJButtonActive= a
      this.couponType=a
      this.getCouponList()
    },
    pageAdd() {
      this.data.page += 1
    },
    pageDel() {
      this.data.page -= 1
    },
    handleCurrentChange(val) {
      this.data.page = val
      this.getCouponList()
    },
    //查询用户拥有的优惠券,couponType=0待使用，=1已使用
    getCouponList() {
      var that = this;
      var data={
        page: 1,
        status: that.couponType
      }
      that.service({
        url: "/user/account/coupon.json?action=list",
        method: "post",
        data: JSON.stringify(data),
      }).then(res => {
        if (res.code == 200) {
          if(res.data.list.length!=0){
            that.couponList = res.data.list;
            that.noData = false;
            this.rowCount = res.data.page.totalResults;
          }else{
            that.noData = true
          }
          
        }
      })
    },
    initData() {      
      this.getCouponList();
    }
  },
  filters: {
    toFixed: function (val) {
      return val.substring(0, 10)
    },
  },
  mounted() {
    this.initData();
  }
}
</script>
<style scoped lang="scss" >  
  .content{
    .title{margin: 10px 0 20px;i{background: #f22e3b;padding:10px 2px;}span{padding-left:20px;font-size:18px;}}
    .Button{
      background:#d7d7d7;
      line-height:40px;
      height: 40px;
      span{
        padding:0 20px;
        font-size:14px;
        cursor: pointer;
        display: block;
        float: left;
      }
      .active{
        background-color:#fff;
        color:#666;
      }
    }
    ul{padding:40px 60px;overflow: hidden;
      li{border:1px solid #eee;width:300px;padding:20px;color:#666;float:left;margin:0 20px 20px 0;
        .top{border-bottom:1px solid #eee;display: flex;padding-bottom:10px;
          .left{flex:4;}
          .right{flex:1;
            div{font-size:22px;font-weight:600;padding-top:10px;}
            p{font-size:15px;font-weight:600;}
          }
          p{font-size:12px;line-height:25px;}
        }
        .time{font-size:12px;padding-top:10px;}
      }
    }
    .noData{
      text-align: center;
      font-size: 15px;
      padding-top:80px;
    }
  }
</style>
