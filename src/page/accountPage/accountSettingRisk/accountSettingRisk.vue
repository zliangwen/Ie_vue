<!--账号设置——风险评估-->
<template>
  <div class="accountSettingRisk">
    <div class="body">
      <div class="main">
        <div class="all_content">
          <!-- 标题 -->
          <div class="title">
            <i></i>
            <span>风险测评</span>
          </div>
          <!-- 测评试题 -->
          <div class="m_box" v-if="ceshi==0">
            <div class="maskRisk">
              <div class="form_title">
                 风险承受能力测评
              </div>
              <div class="note">
                <p>为提供出借人更好的资产选择，麦麦理财根据出借人风险偏好测试结果，将出借人分为保守型、稳健型、平衡性、积极型4种类型。</p>
                <p>出借人风险承受能力与出借项目风险等级不符时，页面将提示风险，出借人确认风险后可继续出借。</p>
                <p>本测评表涉及内容仅供平台评估投资者风险承受能力，麦麦理财将履行保密义务，感谢您的配合!</p>
              </div>
              <div class="risk_list" v-for="(item,myIndex) in items" :key="myIndex"  :index="myIndex">
                <div>
                 <p>{{myIndex+1}}、{{item.title}}</p>
                 <span v-for="ite in item.answerList" :key="ite.key" class="radioSpan" >
                   <el-radio style="" v-model="form[myIndex]" @change="setAnswerSubmit(myIndex,ite)" :label="ite.answerId">{{ite.content}}、{{ite.answerDetail}}</el-radio>  
                 </span>
                </div>                        
              </div>
              <div slot="footer" class="dialog-footer">
                <el-button type="danger" @click="getSelect(items)" >提 交</el-button>
              </div>
              <!-- <div class="resultStyle">
                <el-dialog
                  title="您的测试结果"
                  :visible.sync="centerDialogVisible"
                  width="35%"
                  center>
                  <p>您的类型：{{myResults.result}}</p>
                  <p>类型介绍：{{myResults.resultDetail}}</p>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="atOnce()">立即投资</el-button>
                    <el-button @click="again()">重新测评</el-button>
                    <el-button class="bottonOne" @click="OKclose()">确 定</el-button>
                  </span>
                </el-dialog>
              </div> -->
            </div>
          </div>
          <!-- 测评结果 -->
          <div class="result" v-if="ceshi == 1">
            <p class="p1">您的风险承受能力为</p>
            <p class="p2">保守型</p>
            <p class="p3">保守型客户往往对于投资风险的承受能力很低，选择一项产品或投资工具首先要考虑是否能够保本，然后才考虑追求收益。</p>
            <div class="p4">
              <span class="sp1" @click="again()">重新测评</span>
              <span class="sp2" @click="atOnce()">知道了</span>
            </div>
          </div>
          <div class="result" v-if="ceshi == 2">
            <p class="p1">您的风险承受能力为</p>
            <p class="p2">稳健型</p>
            <p class="p3">您对风险有一定的认知,期望在保证本金安全的基础上，追求一定的资产利益，建议您选择平台的中短期项目，控制风险，把握利润。</p>
            <div class="p4">
              <span class="sp1" @click="again()">重新测评</span>
              <span class="sp2" @click="atOnce()">知道了</span>
            </div>
          </div>
          <div class="result" v-if="ceshi == 3">
            <p class="p1">您的风险承受能力为</p>
            <p class="p2">平衡型</p>
            <p class="p3">您的风险承受度适中，偏向于资产均衡配置，也追求一定的资产利益，建议您投资中长期项目，获得一定的可观收益。</p>
            <div class="p4">
              <span class="sp1" @click="again()">重新测评</span>
              <span class="sp2" @click="atOnce()">知道了</span>
            </div>
          </div>
          <div class="result" v-if="ceshi == 4">
            <p class="p1">您的风险承受能力为</p>
            <p class="p2">积极型</p>
            <p class="p3">您的风险承受能力较高，您偏向于积极的资产配置，勇于尝试，追求利益最大化，是资深的投资者。</p>
            <div class="p4">
              <span class="sp1" @click="again()">重新测评</span>
              <span class="sp2" @click="atOnce()">知道了</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//mport {getQuestionList,getAnswerSubmit} from '@/services/getDetail'
export default {
  name: 'account',
  data () {
    return {
      ceshi:0,
      //弹框判断
      centerDialogVisible:false,
      //题目答案form
      form:{},
      //我的评测结果
      myResults:'',
      radios:'',
      i:0,
      items:[
        {
          title:"您愿意选择的投资期限是多久？",
          radios:null,
          answerList:[
            {content:"A",answerDetail:"46天以内",answerId:1},
            {content:"B",answerDetail:"二月标",answerId:2,},
            {content:"C",answerDetail:'三月标',answerId:3,},
            {content:"B",answerDetail:"半年标",answerId:4}
          ]
        },
        {
          title:"您的年龄在以下哪个范围内",
          radios:null,
          answerList:[
            {content:"A",answerDetail:"18-30岁",answerId:1},
            {content:"B",answerDetail:"31-45岁",answerId:2,},
            {content:"C",answerDetail:'46-60岁',answerId:3,},
            {content:"D",answerDetail:"60岁以上",answerId:4}
          ]
        },
        {
          title:"您的家庭年收入状况如何？",
          radios:null,
          answerList:[
            {content:"A",answerDetail:"15万元以内",answerId:1},
            {content:"B",answerDetail:"15-30万元",answerId:2,},
            {content:"C",answerDetail:'30-50万元',answerId:3,},
            {content:"D",answerDetail:"50万元以上",answerId:4}
          ]
        },
        {
          title:"在您每年可支配收入中，用于金融投资(储蓄存款除外)的比例为？",
          radios:null,
          answerList:[
            {content:"A",answerDetail:"小于10%",answerId:1},
            {content:"B",answerDetail:"10%-25%",answerId:2,},
            {content:"C",answerDetail:'25%-50%',answerId:3,},
            {content:"D",answerDetail:"大于50%",answerId:4}
          ]
        },
        {
          title:"以下哪项描述最符合您的投资态度？",
          radios:null,
          answerList:[
            {content:"A",answerDetail:"资产保值，希望获得稳定收益",answerId:1},
            {content:"B",answerDetail:"资产保值，愿意承担一定幅度的收益波动",answerId:2,},
            {content:"C",answerDetail:'资产稳健增长，愿意为此承担有限本金损失',answerId:3,},
            {content:"D",answerDetail:"资产迅速增长，愿意为此承担较大本金损失",answerId:4}
          ]
        },
        {
          title:"您认为自己能承担最大的投资损失是多少？",
          radios:null,
          answerList:[
            {content:"A",answerDetail:"无损失，但收益未达到预期",answerId:1},
            {content:"B",answerDetail:"损失20%以内",answerId:2,},
            {content:"C",answerDetail:'损失20%-50%以内',answerId:3,},
            {content:"D",answerDetail:"损失超过50%",answerId:4}
          ]
        },
        {
          title:"您有多少年投资银行、P2P、基金、信托等金融产品的经验？",
          radios:null,
          answerList:[
            {content:"A",answerDetail:"少于2年",answerId:1},
            {content:"B",answerDetail:"2至5年",answerId:2,},
            {content:"C",answerDetail:'5至10年',answerId:3,},
            {content:"D",answerDetail:"10年以上",answerId:4}
          ]
        },
        {
          title:"如果您打算用部分资金做风险投资，投资A预期获得10%的收益，损失非常小；投资B预期获得30%的收益，但可能承担较大亏损；您会如何选择？",
          radios:null,
          answerList:[
            {content:"A",answerDetail:"全部投资于收益及风险较小的A",answerId:1},
            {content:"B",answerDetail:"同时投资A与B，但大部分资金投资于风险较小的A",answerId:2,},
            {content:"C",answerDetail:'同时投资A与B，两种资产各占一半',answerId:3,},
            {content:"D",answerDetail:"全部投资于收益及风险较大的B",answerId:4}
          ]
        },
      ]
    }
  },
  methods:{
    //获取风险评估内容
      getAssess(){
       var that = this;
        that.service({
          url:"/user/index.json",
          method:"post",
          data:{
            device:that.device
          }
        }).then(res=>{
          if(res.code == 200){
            that.userInfo = res.data.account;
            // if( res.data.user.riskResult != 0){
            //   that.ceshi= false
            // }else{
            //   that.ceshi= true;
            // }
            that.ceshi = res.data.user.riskResult
          }
        })
      },
      //获取每一题答案风险评估内容
      setAnswerSubmit(index,data){
        this.items[index].radios=data.content;
      },
      //提交风险测评答案
      getSelect(data){
        var item=[];
        var NoNull = false;
        for(var i=0;i<data.length;i++){
          if(data[i].radios == null){
            NoNull=true;
            this.$confirm('请将所有答案选择完?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'error'
            }).then(() => {
                
            }).catch(() => {
                        
            });
          };
          item[i]=data[i].radios
        };
        var answer={
           result:item.toString()
        };
        this.service({
          url:"/user/riskTest.json",
          method:"POST",
          data:JSON.stringify(answer)
        }).then(res=>{
          if(res.code == 200){
            this.ceshi = res.data;
          }
        }).catch(res=>{
          console.log(res)
        })

       },
       //立即投资
        atOnce(){
          this.$router.push('/account/accountSetting')
        },
       //重新评测
        again(){
          this.ceshi = 0;
        },
        
        //关闭弹框
        OKclose(){
          this.$router.go(-1);
          this.centerDialogVisible = false;
          
        }

  },
  mounted(){
    this.getAssess()
  },
  components: {
    
  }
}
</script>
<style lang="scss" scoped>  
  .body{
    .radioSpan{
      padding-right: 30px;
      display: block;
    }
    .main{ 
      width:100%;
      margin:0 auto;
      background-color: #fff;
      overflow: hidden;
      .all_content{
        background-color: #fff;
        color: #666;
        .title{margin: 10px 0 20px;i{background: #f22e3b;padding:10px 2px;}span{padding-left:20px;font-size:18px;}}
        /*主题设置*/
        .m_box{
          padding:30px 60px;
          .maskRisk{
            .form_title{text-align: center;font-size:18px;color:#333;}
            .note{border-bottom:1px solid #ccc;padding-top:20px;p{color:#666;padding-bottom:25px;line-height:20px;font-size: 15px;}}
            .risk_list{line-height:40px;margin-bottom:10px;border-bottom:1px solid #eee;}
            .dialog-footer{margin-top:20px;}
          }
        }
        .result{
          padding:50px 60px 20px;
          p{padding-bottom:20px;}
          .p1{text-align: center;font-size:18px;}
          .p2{text-align: center;font-size:24px;font-weight: 600;color:#f22e3b;}
          .p3{font-size:14px;line-height:25px;padding-bottom:40px;}
          .p4{text-align: center;
            .sp1{color:#f22e3b;border:1px solid #f22e3b;border-radius:5px;padding:5px 20px;margin-right:10px;}
            .sp2{color:#fff;background: #f22e3b;border-radius:5px;padding:5px 25px;}
          }
        }
      }
    }
  }
</style>
<style lang="scss">
  .el-radio__input.is-checked .el-radio__inner {
      border-color: #f22e3b;
      background: #f22e3b;
  }
  .el-button--danger {
    color: #fff;
    background-color: #f22e3b;
    border-color: #f22e3b;
  }
  .el-button--danger:hover{
    color: #fff;
    background-color: #f22e3b;
    border-color: #f22e3b;
  }
  .el-radio__input .el-radio__inner:hover {
      border-color: #f22e3b;
  }
  .el-radio__input.is-checked+.el-radio__label {
    color: #f22e3b;
  }
  .resultStyle{
    .el-dialog--center .el-dialog__footer{
      text-align:left;
            .bottonOne{
        // border:1px #409EFF ;
        float: right !important;
      }
    }
    .el-dialog__body{
      // text-align:center;
      p{
        font-size:18px;
        text-align:center;
      }
      p:nth-child(2){
        font-size:15px;
        padding-top:20px;
      }
    }
    
  }
  .el-message-box{
  width:300px;
}
.el-message-box__title span{
  display: block;
  text-align: center;
  font-size: 14px;
}
.el-button--small{
  float:left;
}
.el-message-box__btns button:nth-child(2){
  float: right;
  background:red;
  border-color:red;
}
</style> 