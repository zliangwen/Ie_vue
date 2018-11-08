<template>
  <div id="accountInvest">
   <ul class="investHead">
    <li class="isActive">提现记录</li>
  </ul>
  <div class="investBody">
    <div class="investRecord">
      <div class="investTable">
        <table class="table">
          <thead>
            <tr>
              <td>类型</td>
              <td>金额（元）</td>
              <td>时间</td>
              <td>状态</td>             
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in dataList" :key="index">
              <td>提现</td>            
              <td>{{item.tradeAmt}}</td>
              <td>{{item.tradeTime}}</td>
              <td>{{item.tradeStatus}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="hasData" class="pageNation">
        <el-pagination
          :page-size="5"
          layout="prev, pager, next"
          :total="rowCount"
          :current-page.sync="currentPage"
          @current-change="handleCurrentChange"
          @prev-click="pageDel"
          @next-click="pageAdd"
          >
        </el-pagination>
      </div>
      <div v-if="!hasData" class="noData">
        <p>暂无数据</p>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
//import {getWithdrawRecord} from '@/services/getDetail'

export default {
  name: 'account',
  data () {
    return {
      hasData:false,
      pageId:1,
      rowCount:6,
      currentPage: 1,
      status: '',
      timeSearch: '',
      dataList:[]
    }
  },
  methods:{
    pageAdd() {
      this.pageId +=1
    },
    pageDel() {
      this.pageId -=1
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageId = val
      this.getWithdrawRecord()
    },
    //获取数据
    getWithdrawRecord() {
      this.dataList = []
      var data = {
        pageSize: 5,
        pageId: this.pageId
      }
      getWithdrawRecord(data).then(res => {
        // console.log(res)
        if(res.state) {
          if(res.data.dataList.length == 0) {
            this.hasData = false
          }else {
            this.hasData = true
            this.dataList = res.data.dataList
            this.rowCount = res.data.rowCount
          }
        }else {
          // console.log(res.msg)
          if(res.code =='0003' || res.code =='0002') {
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
      })
    },
    initData() {
      this.getWithdrawRecord()
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
  }
}
.investBody {
  margin-left: 34px;
  margin-top:  45px;
  .investTable {
    position: relative;
    margin-top: 40px;
    width: 870px;
    max-height: 400px;
    overflow: auto;
    table {
      thead {
        background-color: #f7eae9;
        td {
          width: 217.5px;
          text-align: center;
          padding: 8px 0px;
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
          padding: 8px 0px;
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
      font-size: 20px;
    }
  }
}
</style>