<template>
  <div id="accountInvest">
    <div class="title">
      <i></i>
      <span>投资记录</span>
    </div>
    <div class="investBody">
      <div class="investRecord">
        <div class="state">
          <span>交易类型：</span>
          <ul>
            <li :class="{isChosed:item.flag}" v-for="(item,index) in state" :key="index" @click="changeState(2,item)">{{item.state}}</li>
          </ul>
        </div>
        <div class="state">
          <span>交易时间：</span>
          <ul>
            <li :class="{isChosed:item.flag}" v-for="(item,index) in timer" :key="index" @click="changeState(1,item)">{{item.state}}</li>
          </ul>
        </div>
        <div class="invsetTable" v-if="!hasData">
          <ul class="clearfix invsetTableUl">
            <li v-for="(item,index) in liList" :key="index">{{item.name}}</li>
          </ul>
          <ul class="clearfix ul">
            <li v-for="(item,index) in dataList" :key="index" class="clearfix">
                <span class="lineHeight" style="overflow: hidden;">{{item.subjName}}</span>
                <span  class="lineHeight">{{item.rate}}%</span>
                <span  class="lineHeight">{{item.cycle}}天</span>
                <span  class="lineHeight">{{item.money}}</span>
                <span class="lineHeight">{{item.interest}}元</span>
                <span style="padding-top:8px;">{{item.investTime}}</span>
                <span v-if="item.status==1"  class="lineHeight">募集中</span>
                <span v-if="item.status==2"  class="lineHeight">持有中</span>
                <span v-if="item.status==3"  class="lineHeight">已回款</span>
                <span style="color:#f22e3b;cursor: pointer;" @click="dropOn(item,index)"  class="lineHeight">详情</span>
                <div class="dropStyle" v-if="item.show" >
                    <p class="title">合同和协议</p>
                    <ul class="clearfix">
                      <li class="clearfix" style="background:#eeeeee">
                        <span style="width:90px;">借款协议</span>
                        <span style="float:right;cursor: pointer;" class="spanHover" v-if="item.contractId != ''" @click="download(item)">下载</span>
                        <!-- <a style="float:right;cursor: pointer;" class="spanHover" v-if="item.contractId != ''" :href="down" download="2155.pdf">下载</a> -->
                        <a style="float:right;cursor: pointer;" class="spanHover" @click="newChakan(item)">查看</a>    
                      </li>
                    </ul>
                    <p class="title">回款计划</p>
                    <table class="table">
                      <thead style="background:#eee">
                        <tr>
                          <td>回款日期</td>
                          <td>金额</td>
                          <td>类型</td>
                          <td>状态</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{{item.repayTime}}</td>
                          <td>{{item.money + item.interest}}元</td>
                          <td>本金加利息</td>
                          <td>待回款</td>
                        </tr>
                      </tbody>
                  </table>
                </div>
            </li>
          </ul>
        </div>
       
        <div v-if="!hasData" class="pageNation" style="margin-top:60px;">
          <el-pagination :page-size="10" layout="prev, pager, next" :total="rowCount" :current-page.sync="currentPage" @current-change="handleCurrentChange"
            @prev-click="pageDel" @next-click="pageAdd">
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
  export default {
    name: 'account',
    data() {
      return {
        liList:[
          {name:"项目名称"},{name:"预期年化"},{name:"期限"},{name:"投资金额(元)"},{name:"预期收益(元)"},{name:"投资时间"},{name:"状态"},{name:"操作"}
        ],
        state: [
          { state: '全部', flag: true, stateType: '' }, 
          { state: '持有中', flag: false, stateType: '2' },
          { state: '已回收', flag: false, stateType: '3' }, 
          { state: '募集中', flag: false, stateType: '1' },
          // { state: '投资失败', flag: false, stateType: '04' }
          ],
        timer: [
          { state: '全部', flag: true, stateType: '' }, 
          { state: '近1个月', flag: false, stateType: '1' },
          { state: '近3个月', flag: false, stateType: '3' },
          { state: '近6个月', flag: false, stateType: '6' },
         { state: '近1年', flag: false, stateType: '12' }
         ],
        show:false,
        hasData: false,
        value: '',
        data:{
          page: 1,
        },
        rowCount: 0,
        currentPage: 1,
        status: '',
        timeSearch: '',
        dataList: [],
        down:''
      }
    },
    methods: {
      //查看合同
      newChakan(item){
        if(item.contractId == ''){
          let token = sessionStorage.getItem('accesstoken')
          //window.open()
          window.open('http://tap.maimailc.com/purchaseContract.html?shareToken='+token+'&investId='+item.investId)
          //window.location.href=
        }else{
            this.service({
              url:"/user/invest/contract.json",
              method:"post",
              data:{
                investId:item.investId,
                device:this.device
              }
            }).then(res =>{
              window.open(res.data, "_blank"); 
             
            }).catch(res=>{
              console.log(res)
            })
          }
      },
      //下载合同
      download(item){
         this.service({
              url:"/user/invest/contract.json",
              method:"post",
              data:{
                investId:item.investId,
                device:this.device
              }
            }).then(res =>{
              window.open(res.data, "_blank"); 
              this.down = res.data;
              console.log(this.down)
            }).catch(res=>{
              console.log(res)
            })
      },
      dropOn(item, index) {
        console.log(item)
        //手风琴效果
        this.dataList.forEach(i => {
          if (i.show !== this.dataList[index].show) {
            i.show = false
          }
        })
        item.show = !item.show;
        this.show = item.show;
        //this.downPdf(item)
        // console.log(item)
        // console.log(index)

      },
      //改变项目状态
      changeState(type,item) {
        if(type== 1){
            this.timer.forEach((i) => {
                i.flag = false
            })
            item.flag = true;
              if(item.stateType != ''){
                this.data.month = item.stateType
              }else{
                 delete this.data.month
              }
        }else{
            this.state.forEach((i) => {
              i.flag = false
            })
            item.flag = true
             if(item.stateType != ''){
                this.data.status = item.stateType
              }else{
                delete this.data.status
              }
           
        }
         this.getTradeRecord()
      },
      pageAdd() {
        this.data.page += 1
      },
      pageDel() {
        this.data.page -= 1
      },
      handleCurrentChange(val) {
        this.data.page  = val
        this.getTradeRecord()
      },
      getTradeRecord() {
        this.dataList=[];
        this.service({
          url:"/user/invest/list.json",
          method:"post",
          data:JSON.stringify(this.data)
        }).then(res =>{
          if(res.code == 200){
            if(res.data.list.length != 0){
              this.hasData = false;
              res.data.list.forEach(i=>{
                i.show = false
              })
              this.dataList = res.data.list
              this.rowCount = res.data.page.totalResults
            }else{
              this.hasData = true;
            }
            
          }
        }).catch(res=>{
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
  .title {
    margin: 10px 0 20px;
    i {
      background: #f22e3b;
      padding: 10px 2px;
    }
    span {
      padding-left: 20px;
      font-size: 16px;
    }
  }

  .investHead {
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
    margin-top: 45px;
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
            padding: 0 10px;
            &.isChosed {
              background-color: $exColor;
              border-radius: 6px;
              color: #fff;
            }
          }
          .search {
            padding: 2px 10px;
            background-color: $exColor;
            border-radius: 6px;
            color: #fff;
          }
        }
      }
    }
    .state {
      overflow: hidden;
      padding-bottom: 15px;
      color: #666;
      font-size: 16px;
      padding-left:35px;
      span {
        float: left;
        font-size: 16px;
      }
      ul {
        float: left;
        
        li {
          font-size: 14px;
          cursor: pointer;
          float: left;
          margin: 0 20px;
          padding: 0 10px;
          &.isChosed {
            color: $exColor;
            border-radius: 6px;
            // color: #fff;
          }
        }
      }
    }
      table {
        border:1px solid #eee;
        thead {
          background-color: #eee;
          td {
            font-size: 14px;
            width: 217.5px;
            text-align: center;
            padding: 8px 0px;
            color: #666;
          }
        }
        tbody {
          tr {
            &:last-of-type {
              
            }
          }
          td {
            width: 217.5px;
            text-align: center;
            padding: 10px 0px;
            color: #666;
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
        font-size: 16px;
      }
    }
  }
  .dropStyle{
     padding:10px 30px;
    /* width:760px; */
    clear: both;
    font-size: 12px;
    p{
      padding:10px;
      margin:0;
    }
    ul {
      li{
        border:0;
        span{
          height:30px;
          line-height: 30px;
          width:50px;
          text-align: center;
          &.spanHover:hover{
            text-decoration:underline 
          }
        }
        a{
          height:30px;
          line-height: 30px;
          width:50px;
          text-align: center;
          color:#333;
          font-size:14px;
          &.spanHover:hover{
            text-decoration:underline 
          }
        }
      }
    }
  }
  .invsetTable .invsetTableUl{
    width:100%;
    background:#eeeeee;
    li{
      float:left;
      width:94.64px;
      font-size: 14px;
      text-align: center;
      height:40px;
      line-height: 40px;
    }
  }
  .ul{
    li{
      span{
        float:left;
        width:94.64px;
        font-size: 14px;
        text-align: center;
        display: block;
        height:50px;
        &.lineHeight{
          line-height: 50px;
        }
      }
      border-bottom:1px solid #d7d7d7;
    }
  }
</style>