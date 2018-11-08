<!-- 我的消息 -->
<template>
  <div class="accountNew">
    <ul class="investHead">
      <li>我的消息</li>
    </ul>
    
  </div>
</template>
<script>
//import {getNewsListDetail} from '@/services/getDetail'
export default {
  name: 'account',
  data () {
    return {
      
    }
  },
  methods:{
    getNewsListDetail() {
      // var data = {
      //   messageId:id
      // }
      getNewsListDetail(this.$route.query.id).then(res => {
        console.log(res)
        
      });
    },
    
  },
  mounted(){
    this.getNewsListDetail()
  }
}
</script>
<style lang="scss" scoped>
.investHead {
  overflow: hidden;
  margin-left: 34px;
  border-bottom: 1px solid #eee;
  li {
    float: left;
    padding: 10px 0;
    margin-right: 150px;
    &.isActive {
      color: red;
      border-bottom: 3px solid red;
    }
    &:last-of-type {
      margin: 0;
    }
  }
}
.investBody {
  margin-left: 34px;
  margin-top:  45px;
  font-size:14px;
  color:#000;
  .state,.timer {
    margin-top: 20px;
    overflow: hidden;
    line-height:30px;
    span {
      float: left;
    }
    ul {
      float: left;
      li {
        float: left;
        margin: 0 20px;
        padding: 0 10px;
        &.isChosed {
          background-color: #e52921;
	        border-radius: 6px;
          color: #fff;
        }
      }
      .read{
        color: #e52921;
        padding:0 20px;
      }
    }
  }
  .investTable {
    margin-top: 40px;
    .new_content{
      overflow: auto;
      border-bottom:1px solid #eee;
      div{
        line-height:50px;
      }
      .left{
        float:left;
        p{
          width: 6px;
          height: 6px;
          background-color: #f7aaa7;
          border-radius: 2px;
          float: left;
          margin-right: 10px;
          margin-top: 22px;
        }
      }
      .right{
        float:right;
        color:#888;
      }
    }
    .more{
      clear:both;
      color:#888;
      text-align: center;
      line-height:60px;
      border-bottom:1px solid #eee;
    }
    .noData{
      text-align: center;
      font-size: 15px;
      padding-top:80px;
    }
  }
  .orderRecord {
    .u-feed-list {
      width: 100%;
      font-size: 14px;
      border:1px dashed #cccccc;
      border-radius: 5px;
      thead{
        tr{
          line-height:60px;
          th{width:33%;text-align: left;padding-left:15px;}
        }
      }
      tbody{
        tr{
          line-height:60px;
          td{
            padding-left:15px;
            el-checkbox{border: 1px solid #e83737;}
          }
        }
      } 
    }
    .save{
      width: 98px;
      line-height: 35px;
      background-color: #e52921;
      border-radius: 6px;
      color:#fff;
      text-align: center;
      margin:25px auto 0;
    }
  }
}
</style>
<style lang="scss">
.accountNew{
  .el-checkbox__inner {
    border: 1px solid #e83737;
  }
  .el-checkbox__inner:hover {
      border: 1px solid #e83737;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner{
      background-color: #e83737;
      border-color: #e83737;
  }
  .el-checkbox {
    margin-left: 15px;
  }
}
</style>