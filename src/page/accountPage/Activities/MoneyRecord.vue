<template>
  <div id="accountInvest">
    <div class="title">
      <i></i>
      <span>资金明细</span>
    </div>
    <div class="investBody">
      <div class="investRecord">
        <div class="state">
          <span style="font-size:16px;">交易类型：</span>
          <ul>
            <li :class="{isChosed:item.flag}" v-for="(item,index) in state" :key="index"
            @click="changeState(item)"
            style="font-size:14px;">{{item.state}}</li>
          </ul>
        </div>
        <div class="state">
          <span style="font-size:16px;">交易时间：</span>
          <ul>
            <li :class="{isChosed:item.flag}" v-for="(item,index) in timer" :key="index"
            @click="changeTimer(item)"
             style="font-size:14px;">{{item.state}}</li>
          </ul>
        </div>
        
        <div class="investTable" v-if="!hasData">
          <table class="table" >
            <thead>
              <tr style="font-size:1px;">
                <td>时间</td>
                <td>类型</td>
                <td>金额（元）</td>
                <td>描述</td>             
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in moneyList" :key="index" style="font-size:14px;">
                <td>{{item.createTime}}</td>            
                <td v-if="item.logType == 1">充值</td>
                <td v-if="item.logType == 2">投资</td>
                <td v-if="item.logType == 3">回款</td>
                <td v-if="item.logType == 4">提现</td>
                <td v-if="item.logType == 5">奖励</td>
                <td>{{item.money}}</td>
                <td>{{item.bizTypeName}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="!hasData" class="pageNation" style="margin-top:60px;">
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
        <div v-if="hasData" class="noData">
          <p>暂无数据</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//import {getTradeRecord} from '@/services/getDetail'

export default {
  name: 'account',
  data () {
    return {
      state:[
        {state:'全部',flag:true,stateType:'0'},
        {state:'充值',flag:false,stateType:'1'},
        {state:'提现',flag:false,stateType:'4'},
        {state:'投资',flag:false,stateType:'2'},
        {state:'回款',flag:false,stateType:'3'},
        { state: '奖励', flag: false, stateType: '5' }
      ],
      timer:[
        { state: '全部', flag: true, stateType: '' },
        {state:'近1个月',flag:false,stateType:'1'},
        {state:'近3个月',flag:false,stateType:'3'},
        {state:'近6个月',flag:false,stateType:'6'},
        { state: '近1年', flag: false, stateType: '12' }
      ],
      hasData:false,
      value:'',
      pageId:1,
      rowCount:0,
      currentPage: 1,
      data:{
        status: 0,
        timeSearch:null,
      },
      currData:{
        page:1,
      },
      moneyList:[]
    }
  },
  methods:{

    changeState(item) {
      this.state.forEach((i) =>{
        i.flag = false
      })
      item.flag = true
      this.currentPage = 1
      this.currData.page=1;
      this.moneyList=[];
      this.currData.logType = item.stateType

      this.getTradeRecord()
    },
    //改变时间参数
    changeTimer(item) {   
      this.timer.forEach((i) =>{
        i.flag = false
      })
      item.flag = true
      if(item.stateType != ''){
        this.currData.month = item.stateType;
      }else{
        delete this.currData.month
      }
      this.getTradeRecord()
    },
    pageAdd() {
      this.currData.page +=1
    },
    pageDel() {
      this.currData.page -=1
    },
    handleCurrentChange(val) {
       this.currData.page = val;
      //this.pageId = val
      this.getTradeRecord()
    },
    //获取数据
    getTradeRecord() {
      var that = this;
      that.service({
        url: "/user/account/log/list.json",
        method: "post",
        data: JSON.stringify(that.currData),
      }).then(res => {
        if (res.code == 200) {
          if(res.data.list.length != 0){
            that.moneyList = res.data.list;
            that.rowCount = res.data.page.totalResults
            that.hasData = false;
          }else{
            that.hasData = true;
          }
          
        }
      }).catch(res => {
        console.log(res)
      })
    },
    initData() {
      this.getTradeRecord()
    }
  },
  filters: {

  },
  mounted() {
    this.initData()
  }
}
</script>
<style lang="scss" scoped>
$exColor: #e52921;
.title{margin: 10px 0 20px;i{background: #f22e3b;padding:10px 2px;}span{padding-left:20px;font-size:18px;}}.investHead {
  overflow: hidden;
  margin-left: 34px;
  border-bottom: 1px solid #f4f4f4;
  li {
    float: left;
    padding: 10px 0;
    margin-right: 150px;
    &.isActive {
      color: $exColor;
      border-bottom: 3px solid $exColor;
    }
    &:last-of-type {
      margin: 0;
    }
  }
}
.investBody {
  margin-left: 34px;
  margin-top:  45px;
  .time {
    overflow: hidden;
    margin-top: 20px;
    .time-title {
      margin-right: 20px;
    }
    .timer {
      float: right;
      margin-top: 8px;
      margin-right: 40px;
      ul {
        cursor: pointer;
        li {
          float: left;
          margin: 0 20px;
          padding: 2px 10px;
          .isChosed {
            background-color: #f22e3b;
            border-radius: 6px;
            color: #fff;
          }
        }
        .search {
          padding:2px 10px;
          background-color: $exColor;
          border-radius: 6px;
          color: #fff;
        }
      }
    }
  }
  .state {
    overflow: hidden;
    padding-bottom:15px;
    color:#666;
    font-size:16px;
    span {
      float: left;
    }
    ul {
      float: left;
      li {
        cursor: pointer;
        float: left;
        margin: 0 20px;
        padding: 2px 10px;
        &.isChosed {
          color: $exColor;
	        border-radius: 6px;
          // color: #fff;
        }
      }
    }
  }
  .investTable {
    position: relative;
    margin-top: 20px;
    /* width: 870px; */
    max-height: 500px;
    overflow: auto;
    table {
      thead {
        background-color: #d7d7d7;
        td {
          width: 217.5px;
          text-align: center;
          padding: 8px 0px;
          color:#666;
        }
      }
      tbody {
        tr {
          border-bottom: 1px solid #f4f4f4;
          &:last-of-type {
            border: none;
          }
        }
        td {
          width: 217.5px;
          text-align: center;
          padding: 10px 0px;
          color:#666;
        }
      }
    }
  }
  .pageNation {
    .el-pagination {
      text-align: center;
    }
  }
  .noData {
    margin-top: 100px;
    p {
      text-align: center;
      font-size:16px;
    }
  }
}
</style>