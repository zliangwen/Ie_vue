<!--账号设置——自动投标-->
<template>
  <div class="accountSettingAuto">
    <div class="body">
      <div class="main">
        <el-form ref="form" :model="form" label-width="80px">
        <div class="all_content">
          <!-- 标题 -->
          <h3>
            <a @click="$router.push('/account/accountSetting')">账号设置></a><a>其他></a>
            <span>自动投标</span>
          </h3>
          <!-- 主题设置 -->
          <div class="m_box">
            <h2>
              <div>
                自动投标：
                <span v-if="form.enableStatus=='02'">关闭</span>
                <span v-if="form.enableStatus=='01'">开启</span>
              </div>
              <p @click="open(form)">
                <el-switch v-model="form.switch" active-color="#999" inactive-color="#e52921" ></el-switch>
              </p>     
            </h2>
            <p>投标设置</p>
            <div>
              <ul class="left">
                <li v-for="item in toubiaoList" :key="item.id">{{item.name}}</li>
              </ul>
              <!-- 未开启 -->
              <ul class="right" v-if="form.enableStatus!='01'">
                <li v-for="item in lineList" :key="item.id">{{item.name}}</li>
              </ul>
              <!-- 开启填写 -->
              <ul class="right" v-if="form.enableStatus=='01'" style="list-style:initial"> 
                <!-- 自动投标有效期 -->
                <li style="height:61px !important">
                  <el-date-picker
                    v-model="validity"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format="yyyy - MM - dd "
                    value-format="yyyy-MM-dd"
                    >
                  </el-date-picker>
                </li>
                <!-- 投标频率 -->
                <li style="height:61px !important">
                  <el-select v-model="form.investRate" placeholder="请选择">
                    <el-option
                      v-for="item in frequencys"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </li>
                <!-- 项目类型 -->
                <li style="height:61px !important">
                  <el-select v-model="form.projectType" placeholder="请选择">
                    <el-option
                      v-for="item in ProjectTypes"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </li>
                <!-- 项目周期 -->
                <li style="height:61px !important">
                  <el-input v-model="form.projectCycleBegin" placeholder="请输入周期开始天数" style="width:52%"></el-input>
                  <!-- <el-select v-model="form.projectCycleBegin" placeholder="请选择项目开始周期" >
                    <el-option
                      v-for="item in Cycles"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select> -->
                </li>
                <li style="height:61px !important">
                  <el-input v-model="form.projectCycleEnd" placeholder="请输入周期结束天数" style="width:52%"></el-input>
                  <!-- <el-select v-model="form.projectCycleEnd" placeholder="请选择项目结束周期" >
                    <el-option
                      v-for="item in Cycles"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select> -->
                </li>
                <!-- 投标金额 -->
                <!-- <li><input type="text" placeholder="请输入金额"></li> -->
                <li style="height:61px !important"><el-input v-model="form.investAmt" placeholder="请输入金额" style="width:52%"></el-input>
                  <span style="color:red; font-size:12px" v-if="form.investAmt%1000!=0">金额请输入1000的整数倍</span>
                  <span style="color:red;font-size:12px" v-if="form.investAmt>100000">金额为上限10万</span>
                </li>
                <!-- 优惠券使用 -->
                <li style="height:61px !important">
                  <el-select v-model="form.userCoupon" placeholder="请选择">
                    <el-option
                      v-for="item in UsesCoupones"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </li>
              </ul>
              <!-- 填写后保存 -->
              <!-- <ul class="right" v-if="form.enableStatus=='01' &&!isFirst"> 
                <li>{{form.expireTimeBegin}}&nbsp;至&nbsp;{{form.expireTimeEnd}}</li>
                <li v-if="form.investRate=='01'">每天投标一次</li>
                <li v-if="form.investRate=='02'">每个项目投标一次</li>
                <li v-if="form.projectType=='01'">全部</li>
                <li v-if="form.projectType=='02'">直投项目</li>
                <li v-if="form.projectType=='03'">债权转让</li>
                <li>{{form.projectCycleBegin}}天</li>
                <li>{{form.projectCycleEnd}}天</li>
                <li>{{form.investAmt}}元</li>
                <li v-if="form.userCoupon=='01'">不使用优惠券</li>
                <li v-if="form.userCoupon=='02'">优先使用收益最高优惠券</li>
                <li v-if="form.userCoupon=='03'">优先使用有效期最短优惠券</li>
              </ul> -->
              <div class="save">
                <el-button type="info" disabled  v-if="form.enableStatus=='02'">修改设置</el-button>
                <el-button type="danger" :plain="true" v-if="form.enableStatus=='01' &&!isFirst"  @click="saveMsg(form)">保存设置</el-button>
                <!-- <el-button type="danger" v-if="form.enableStatus=='01' &&!isFirst" @click="amend()">修改设置</el-button> -->
              </div>
            </div>
          </div>
          <!-- 解释说明 -->
          <div class="m_tips">
            <ul v-for="item in tipsList" :key="item.id">
              <li class="title">{{item.title}}</li>
              <li class="content">{{item.content}}</li>
            </ul>
          </div>
        </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
//import{getshowInfo,getParamSet}from '@/services/getDetail'
export default {
  name: 'account',
  data () {
    return {
      //日期选择数组
      validity:[2],
      // formShow:{},
      form:{
      //投标的ID
      autoInvestId:'',
      //是否开启自动投标（01：启用，02：停用）
      enableStatus:'02',
      switch:true,
      //投标有效期开始时间
      expireTimeBegin:'',
      //投标有效期结束时间
      expireTimeEnd:'',
      //投资频率
      investRate: '',
      //项目类型
      projectType:'',
      //项目开始周期
      projectCycleBegin:'',
      //项目结束周期
      projectCycleEnd:'',
      //投标金额
      investAmt: '',
      //优惠券使用
       userCoupon:'',
      },
      //判断是首次设置，还是修改
      isFirst:false,
      UsesCoupones: [{
        value: '01',
        label: '不使用优惠券'
      },{
        value: '02',
        label: '优先使用收益最高优惠券'
      },
      {
        value: '03',
        label: '优先使用有效期最短优惠券'
      }],
      toubiaoList:[
        {name:"自动投标有效期"},
        {name:"投标频率"},
        {name:"项目类型"},
        {name:"项目周期开始"},
        {name:"项目周期结束"},
        {name:"投标金额(1000的整数倍，上限10万)"},
        {name:"优惠券使用"},
      ],
      lineList:[
        {name:"-"},
        {name:"-"},
        {name:"-"},
        {name:"-"},
        {name:"-"},
        {name:"-"},
      ],
      tipsList:[
        {title:"自动投标是什么",content:"自动投标是一种智能投标功能。用户开启自动投标功能后，系统将根据用户设置的投标条件匹配合适的项目，自动帮助用户完成投标。"}
      ],
      frequencys: [{
        value: '01',
        label: '每天投标一次'
      },{
        value: '02',
        label: '每个项目投标一次'
      }],
      ProjectTypes: [{
        value: '01',
        label: '全部'
      },{
        value: '02',
        label: '直投项目'
      },{
        value: '03',
        label: '债权转让'
      }],
      Cycles: [{
        value: 1,
        label: '1个月'
      },{
        value: 2,
        label: '2个月'
      },{
        value: 3,
        label: '3个月'
      },{
        value: 4,
        label: '4个月'
      },{
        value: 5,
        label: '5个月'
      },{
        value: 6,
        label: '6个月'
      },{
        value: 7,
        label: '7个月'
      },{
        value: 8,
        label: '8个月'
      },{
        value: 9,
        label: '9个月'
      },{
        value: 10,
        label: '10个月'
      },{
        value: 11,
        label: '11个月'
      },{
        value: 12,
        label: '12个月'
      }],
    }
  },
  methods:{
    //进入页面查询自动投标已设置的内容
    getShowInfo(){
      getshowInfo().then(res=>{
        // console.log(res);
        if(res.state){
            this.form=res.data;
            if(res.data.enableStatus=='01'){
                this.form.switch=false;
            }else{
                this.form.switch=true;
            }
            this.form.isFirst=true;
            if (res.data.expireTimeBegin) {
                this.validity[0]=res.data.expireTimeBegin;
                this.validity[1]=res.data.expireTimeEnd;
            }
        }
      })
    },
    //修改自动投标
    amend(){
      this.isFirst=true;
    },
    // 保存设置
    saveMsg(form){
      if(form.investAmt<1000||form.investAmt%1000!=0||form.investAmt>100000){
        this.$message.error('请输入正确的投标金额');
        return;
      }
      if(form.projectCycleBegin>form.projectCycleEnd){
        this.$message.error('项目开始周期应小于项目结束周期');
        return;
      }
      form.autoInvestId=form.id;
      form.expireTimeBegin=this.validity[0];
      form.expireTimeEnd=this.validity[1];
      var data = form;
      if(!form.switch){
        data.enableStatus='01';
      }else{
        data.enableStatus='02';
      }
      // console.log(data.userCoupon);
      getParamSet(data).then(res=>{
        // console.log(res);
        if(res.state){
            this.$message({
          message: '恭喜您，保存成功',
          type: 'success'
        });
        }else{
           this.$message.error('很遗憾，保存失败：'+res.msg);
        }
        this.isFirst=false;
        
      });
    },
    //开启/关闭自动投标   
    open(form){
      if(!this.form.switch){
        this.form.enableStatus='01'
      }else{
        this.form.enableStatus='02';
        this.saveMsg(form);
      }
    }
  },
  mounted(){
    this.getShowInfo()
  },
  components: {
    
  }
}
</script>
<style lang="scss" scoped>  
  .body{
    .main{ 
      width:100%;
      margin:0 auto;
      background-color: #fff;
      overflow: hidden;
      .all_content{
        background-color: #fff;
        color: #666;
        padding:20px 30px;
        h3{
          font-size:14px;
          padding-bottom:10px;
          border-bottom:2px solid #eee;
          color:#000;
          a{
            color: #e52921;
          }
        }
        /*主题设置*/
        .m_box{
          padding:30px 0;
          h2{
            border:1px dashed #ccc;
            line-height:60px;
            padding:0 20px;
            overflow: auto;
            div{
              float:left;
              span{
                color: #e52921;
              }
            }
            p{
              float:right;
              padding-top:20px;
            }
          }
          p{
            line-height:60px;
            border-bottom:1px solid #eee;
          }
          div{
            ul{
              width:50%;
              overflow: auto;
              li{
                line-height:60px;
                border-bottom:1px solid #eee;
                padding:0 30px;
              }
            }
            .left{float:left;}
            .right{float:right;text-align: right;
              ul{
                li{
                  overflow: auto;
                  // height: 60px;
                }
              }
              input{                   
                border-radius: 4px;
                border: 1px solid #dcdfe6;
                color: #606266;
                font-size: 15px;
                line-height: 40px;
                padding: 0 15px;
                width: 51%;
              }
            }
            .save{clear:both;padding:30px;}
          }
        }
        /*解释说明*/
        .m_tips{
          padding:0 30px;
          ul{
            padding-bottom:20px;
            .title{
              color:#000;
              font-size:14px;
              padding-bottom:10px;
            }
            .content{
              color:#888;
              font-size:14px;
            }
          }
        }
      }
    }
  }
</style>
<style lang="scss">
.accountSettingAuto{
  .el-date-editor .el-range-separator {
    width: 6%;
  }
}
</style> 