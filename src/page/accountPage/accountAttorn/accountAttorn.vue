<template>
  <div id="accountAttorn">
    <div class="attornHead">
      <p>转让项目</p>
    </div>
    <div class="attornBody">
      <div class="state">
        <span>项目状态：</span>
        <ul>
          <li :class="{isChosed:item.flag}" v-for="(item,index) in state" :key="index"
          @click="changeState(item,index)"
          >{{item.state}}</li>
        </ul>
      </div>
      <div class="attornTable">
        <table v-if="active == 1">
          <thead>
            <tr>
              <td>项目名称</td>
              <td>预期年化收益</td>
              <td>投资金额（元）</td>
              <td>转让金额（元）</td>
              <td>转让期数</td>
              <td>进度</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in dataList" :key="index">
              <td class="projectName">{{item.projectName}}</td>            
              <td>{{item.projectRate}}%</td>
              <td>{{item.haveMoney}}</td>
              <td>{{item.transferMoney}}</td>
              <td>{{item.periodsNum}}</td>
              <td>{{item.schedule}}</td>
            </tr>
          </tbody>
        </table>
        <table class="table2" v-if="active == 2">
          <thead>
            <tr>
              <td>项目名称</td>
              <td>预期年化收益</td>
              <td>投资金额（元）</td>
              <td>转让期数</td>
              <td>转让金额（元）</td>             
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in dataList" :key="index">
              <td class="projectName">{{item.projectName}}</td>            
              <td>{{item.projectRate}}%</td>
              <td>{{item.haveMoney}}</td>
              <td>{{item.periodsNum}}</td>
              <td>{{item.transferMoney}}</td>
            </tr>
          </tbody>
        </table>
        <table v-if="active == 3">
          <thead>
            <tr>
              <td>项目名称</td>
              <td>预期年化收益</td>
              <td>投资金额（元）</td>
              <td>转让期数</td>
              <td>转让金额（元）</td>
              <td>备注</td>             
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in dataList" :key="index">
              <td class="projectName">{{item.projectName}}</td>            
              <td>{{item.projectRate}}%</td>
              <td>{{item.haveMoney}}</td>
            <td>{{item.periodsNum}}</td>
              <td>{{item.transferMoney}}</td>
              <td>{{item.remarks}}</td>
            </tr>
          </tbody>
        </table>
        <div v-if="hasData" class="pageNation">
          <el-pagination
            :page-size="6"
            :pager-count="11"
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
//import {getAttornData} from '@/services/getDetail'

export default {
  name: 'account',
  data () {
    return {
      state:[{state:'转让中',flag:true,stateType:'02'},{state:'已转让',flag:false,stateType:'04'},
      {state:'流标',flag:false,stateType:'06'}],
      active:1,
      hasData:false,
      currentPage: 1,
      rowCount:'',
      pageId: 1,
      status: '02',
      dataList:[]
    }
  },
  methods:{
    changeState(item,index) {
      this.pageId = 1
      //改变分页状态
      this.currentPage = 1
      this.state.forEach((i) =>{
        i.flag = false
      })
      item.flag = true
      this.active = index+1
      this.status = item.stateType
      this.getAttornData()
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
      this.getAttornData()
    },
    getAttornData() {
      this.dataList = []      
      var data = {
        pageSize: 6,
        pageId:this.pageId,
        claimsStatus:this.status
      }
      getAttornData(data).then(res => {
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
      this.getAttornData()
    }
  },
  mounted() {
    this.initData()
  }
}
</script>
<style lang="scss" scoped>
$exColor:#e52921;
$fontColorLight: #888;
$thead:#f7eae9;
.attornHead {
  overflow: hidden;
  margin-left: 34px;
  border-bottom: 1px solid #eee;
  p {
    display: inline-block;
    padding: 10px 0 21px;
    color: $exColor;
    border-bottom: 2px solid $exColor;
  }
}
.attornBody {
  margin-top: 45px;
  margin-left: 34px;
}
.state {
    overflow: hidden;
    span {
      float: left;
    }
    ul {
      float: left;
      li {
        cursor: pointer;
        float: left;
        margin: 0 20px;
        padding: 0 10px;
        &.isChosed {
          background-color: $exColor;
	        border-radius: 6px;
          color: #fff;
        }
      }
    }
  }
  .attornTable {
    margin-top: 40px;
    table {
      thead {
        background-color: $thead;
        td {
          width: 145px;
          text-align: center;
          padding: 8px 0px;
        }
      }
      tbody {
        td {
          width: 145px;
          text-align: center;
          padding: 8px 0px;
        }
      }
    }
    .table2 {
      thead {
        background-color: $thead;
        td {
          width: 174px;
          text-align: center;
          padding: 8px 0px;
        }
      }
      tbody {
        td {
          width: 174px;
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
</style>