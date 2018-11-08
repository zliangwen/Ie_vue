<!-- 邀请好友 -->
<template>
  <div class="accountFriend">
    <div class="body">
      <div class="link">
        <div class="left">
          <p>复制链接邀请好友</p>
          <p class="p1">你的专属链接地址{{linkList.content}} </p>
        </div>
        <div class="right" :data-clipboard-text="copySrc" @click="copy">复制链接邀请好友</div>
      </div>
      <ul class="investHead">
        <li @click="chose(1)" :class="{isActive:active==1}">邀请记录</li>
        <li @click="chose(2)" :class="{isActive:active==2}">奖励规则</li>
      </ul>
      <div class="investBody">
        <div v-if="active==1" class="investRecord">
          <div class="investTable">
            <!-- <p @click="test('12314')">这假设是一个按钮</p> -->
            <table>
              <thead>
                <tr>
                  <th>被推荐用户</th>
                  <th>注册时间</th>
                  <th>获得奖励</th>            
                </tr>
              </thead>
              <tbody v-if="hasList">
                <tr v-for="(item,index) in inviteList" :key="index">
                  <td style="width:30%;">{{item.userPhone}}</td>
                  <td style="width:30%;">{{item.createDate}}</td>
                  <td style="width:40%;" @click="adware(item.inviteUserId)">
                    <!-- $index是遍历每一项的下标 -->
                    <el-collapse v-model="activeNames" @change="handleChange">
                      <el-collapse-item title="点击查看" name="1">
                        <div v-for="(item,index) in goldList" :key="index">{{item.profit}}</div>
                      </el-collapse-item>
                    </el-collapse>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-if="!hasList" class="nomsg">暂无邀请记录</div>
          </div>
        </div>
        <div v-if="active==2" class="orderRecord">
          <div class="first_gold">
            <p>邀请有奖<span>活动期间，每当您邀一位好友注册</span></p>
            <table>
              <thead>
                <tr>
                  <th style="width:15%;">标题</th>
                  <th style="width:20%;">开始时间</th>
                  <th style="width:20%;">结束时间</th>
                  <th style="width:45%;">奖励明细</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in inviteRules" :key="index">
                  <td>{{item.activityName}}</td>
                  <td>{{item.startTime}}</td>
                  <td>{{item.endTime}}</td>
                  <td v-html="item.activityDetail"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="rules">
            <p>活动规则</p>
            <ul>
              <!-- <li>1.活动时间：2018年5月1日起；</li> -->
              <li>2.新用户通过邀请人发送的专属链接进行注册，或填写邀请人手机号注册，即可邀请成功；</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//import {getLink,getInvite,getgoldList,getInviteRules} from '@/services/getDetail'
import Clipboard from 'clipboard'
export default {
  name: 'account',
  data () {
    return {
      copySrc:'',
      linkList:{},
      active:1,
      activeNames: [],
      hasList:false,      
      inviteList:[],
      goldList:[],
      inviteUserId:'',
      goldList:[],
      inviteRules:[]
    }
  },
    methods:{
      chose(i) {
        this.active = i
        // 奖励规则
        getInviteRules().then(res=>{
          // console.log(res)
          this.inviteRules = res.data.dataList;
        })
      },
      handleChange(val) {
        // console.log(val);
      },
      // 点击复制粘贴
      copy() {
        var clipboard = new Clipboard('.right')  
        clipboard.on('success', e => {  
          // console.log('复制成功')
          this.$message('复制成功');  
          clipboard.destroy()  
        })  
        clipboard.on('error', e => {  
          // 不支持复制
          this.$message('该浏览器不支持自动复制'); 
          clipboard.destroy()  
        })  
      },
      initData(){
        // 获取邀请链接
        getLink().then(res=>{
          // console.log(res);
          if(res.state){
            this.linkList =  res.data;
            this.copySrc = res.data.content;
          }
        });
        // 邀请记录
        var data = {
          pageId: 1,
          pageSize: 5,  
        }
        getInvite(data).then(res=>{
          // console.log(res);
          if(res.state) {
            if(res.data.dataList.length == 0) {
              this.hasList = false
            }else {
              this.hasList = true
              this.inviteList = res.data.dataList;
              // this.inviteUserId = res.data.dataList[0].inviteUserId;
              // alert( res.data.dataList[0].inviteUserId+"这是一个myOldID");
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
        });
      },
      // 点击获取邀请奖励详细记录
      adware(a){
        var data={
          pageId:1,
          pageSize:5,
          inviteUserId:a
        };
        // alert(data.inviteUserId);
        getgoldList(data).then(res=>{
          // console.log(res); 
          this.goldList = res.data.dataList;
        })  
      },
    },
  mounted(){
    this.initData()
    // this.adware()
  },
}
</script>
<style lang="scss" scoped>
.body{
  padding:0 30px;
  .link{
    overflow: auto;
    border: 1px dashed #ccc;
    margin:20px 0 30px 0;
    padding:30px;
    .left{
      float:left;
      font-size:16px;
      .p1{
        color: #888888;
        font-size:14px;
        padding-top:10px;
      }
    }
    .right{
      float:right;
      width: 164px;
      line-height: 40px;
      border-radius: 6px;
      border: solid 1px #e52921;
      color: #e52921;
      text-align: center;
    }
  }
  .investHead {
    overflow: hidden;
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
    margin-top:  40px;
    .investTable {
      margin-top: 40px;
      table{
        width:100%;
        font-size:14px;
        thead {
          background-color: #f7eae9;
          width:100%;
          line-height:40px;
          th{
            font-weight: normal;
          }
        }
        tbody{
          tr{
            line-height:40px;
            td{text-align: center;}
          }
        }
      }
      .nomsg{
        text-align: center;
        font-size:15px;
        padding-top:80px;
      }
    }
    .orderRecord{
      .first_gold{
        margin-bottom:50px;
        color:#666;
        font-size:16px;
        width:100%;
        p{
          color: #ff5252;
          padding-bottom:15px;
          span{color: #888888;font-size:14px;padding-left:10px;}
        }
        table{
          width:100%;
          thead{
            background-color: #ffbaba;
            line-height:40px;
            border-radius: 0px 0px 6px 6px;
            th{color: #931111;text-align: center;font-weight: normal;}
          }
          tbody{
            background-color: #fbe8e6;
            line-height:40px;
            td{color: #666666;text-align: center;}
          }
        }
      }
      .rules{
        p{padding-bottom:10px;}
        li{
          color: #666666;
          font-size:14px;
          line-height:25px;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.el-collapse-item__header {
    border-bottom: none;
    font-size:15px;
}
</style>