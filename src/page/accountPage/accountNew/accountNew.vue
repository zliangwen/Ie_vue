<!-- 我的消息 -->
<template>
  <div class="accountNew">
    <ul class="investHead">
      <li @click="chose(1)" :class="{isActive:active==1}">我的消息</li>
      <!-- <li @click="chose(2)" :class="{isActive:active==2}">消息订阅</li> -->
    </ul>
    <div class="investBody">
      <div v-if="active==1" class="investRecord">
        <!-- <div class="timer">
          <span>项目时间：</span>
          <ul>
            <li :class="{isChosed:item.flag}" v-for="(item,index) in timer" :key="index"
            @click="changeTimer(item)"
            >{{item.state}}</li>
          </ul>
        </div>
        <div class="state">
          <span>消息类型：</span>
          <ul>
            <li :class="{isChosed:item.flag}" v-for="(item,index) in state" :key="index"
            @click="changeState(item,index)"
            >{{item.state}}</li>
            <li class="read" @click="onlyRead()">全部标记为已读</li>
          </ul>
        </div> -->
        
        <div class="investTable">
          <div v-if="noData" class="new_content" v-for="(item,index) in newList" :key="index">
            <div class="left">
              {{item.messageInfo}}
            </div>
            <div class="right">{{item.createDate}}</div>
          </div>
          <div v-if="noData" class="pageNation">
            <el-pagination
              :page-size="10"
              layout="prev, pager, next"
              :total="rowCount"
              :current-page.sync="currentPage"
              @current-change="handleCurrentChange"
              @prev-click="pageDel"
              @next-click="pageAdd"
              >
            </el-pagination>
          </div>
          <!-- <div v-if="noData" class="more">查看更多</div> -->
          <div v-if="!noData" class="noData">暂无消息</div>
        </div>
      </div>
      <!-- <div v-if="active==2" class="orderRecord">
        <table class="u-feed-list">
          <thead>
            <tr>
              <th>订阅内容</th>
              <th>短信通知</th>
              <th>邮件通知</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in readList" :key="index">
              <td>{{item.name}}</td>
              <td><el-checkbox></el-checkbox></td>
              <td><el-checkbox></el-checkbox></td>
            </tr>
          </tbody>
        </table>
        <div class="save">保存</div>
      </div> -->
    </div>
  </div>
</template>
<script>
//import {getNewsList,onlyRead} from '@/services/getDetail'
export default {
  name: 'account',
  data () {
    return {
      // timer:[{state:'全部',flag:true},{state:'最近七天',flag:false,stateType:'01'},{state:'最近1个月',flag:false,stateType:'02'},{state:'最近3个月',flag:false,stateType:'03'}],
      // state:[{state:'全部',flag:true},{state:'充值到账',flag:false,stateType:'01'},{state:'提现到账',flag:false,stateType:'02'},{state:'投资成功',flag:false,stateType:'03'} ,{state:'还款',flag:false,stateType:'04'},{state:'项目预告',flag:false,stateType:'05'}],
      // readList:[
      //   {name:'项目预告'},
      //   {name:'提现结果'},
      //   {name:'资金到账（本金、利息）'}
      // ],
      active:1,
      value5:'',
      pickerOptions2:{},
      noData:false,
      newList:[],
      status: '01',
      timeSearch: '',
      value:'',
      rowCount:'',
      currentPage: 1,
      pageId:1,
      // checked: false
    }
  },
  methods:{
    chose(i) {
      this.active = i
    },
    // 消息类型查询
    changeState(item,index) {
      this.currentPage = 1
      this.state.forEach((i) =>{
        i.flag = false
      })
      item.flag = true
      this.messageType = item.stateType
      this.getNewsList()
    },
    // 时间查询
    changeTimer(item) {
      this.value = []
      this.currentPage = 1
      this.timer.forEach((i) =>{
        i.flag = false
      })
      item.flag = true
      this.timeSearch = item.stateType;
      this.getNewsList()
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
      this.getNewsList()
    },
    // 查询数据
    getNewsList() {
      this.newList=[]
      var data = {
        pageSize: 10,
        pageId: this.pageId,
        isNow:this.timeSearch,
        messageType:this.messageType
      }
      getNewsList(data).then(res => {
        // console.log(res)
        if(res.state) {
          if(res.data.dataList.length == 0) {
            this.noData = false
          }else {
            this.noData = true
            this.newList = res.data.dataList;
            this.rowCount = res.data.rowCount;
          }
        }else{
          // 如果数据出错显示状态
          // console.log(res.msg)
          if(res.code =='0003' || res.code =='0002'){
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
        }
      });
    },
    // 全部标记为已读
    // onlyRead(){      
    //   onlyRead().then(res=>{
    //     console.log(res)
    //   })
    // },
    // newsDetail(item){
    //   var that = this;
    //   that.$router.push({
    //     path:'/account/accountNewDetail',
    //     query:{
    //       id:item.messageId
    //     }
    //   })
    // },
  },
  mounted(){
    this.getNewsList()
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