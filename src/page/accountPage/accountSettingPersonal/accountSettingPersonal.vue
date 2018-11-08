<!--账号设置——个人资料-->
<template>
  <div class="accountSettingPersonal">
    <div class="body">
      <div class="main">
        <div class="all_content">
          <!-- 标题 -->
          <h3>
            <a @click="$router.push('/account/accountSetting')">账号设置></a><a>个人信息></a>
            <span>个人资料</span>
          </h3>
          <!-- 设置头像 -->
          <div class="m_box">
            <!-- <div class="left">
              <img src="../../../assets/imgs/default_avatar.png" alt="">
            </div> -->
            <div class="right">
              <div class="upLoad">
                <div class="upImg">
                  <label class="" for="xFile1">
                    <!-- <img style="width:100%;" src="../../../assets/imgs/default_avatar.png" alt=""> -->
                    <img style="width:100%;height:100%;border-radius:50%;" :src="userDetails.userHeadPortrait">
                  </label>
                  <form>
                    <input @change="handleFile1" accept="image/*" type="file" id="xFile1" style="position:absolute;clip:rect(0 0 0 0);">
                  </form>
                </div>
              </div>
              <div>为了更加彰显您的个性，来设置头像吧!</div>
            </div>
          </div>
          <!-- 信息设置 -->
          <div class="message">
            <ul class="name">             
              <li class="first" >
                昵称:
                <span  v-if="userDetails.userNickName!=''">{{userDetails.userNickName}}</span> 
                 <span  v-if="userDetails.userNickName==''"><img style="margin-bottom:-3px" src="../../../assets/imgs/set_2.png" alt="">尚未设置昵称，取一个好听的名字吧。</span>
              </li>
              <li class="third" @click="bindName = true" style="float:right">设置</li>
              <el-dialog title="设置昵称" :visible.sync="bindName" center>
                <el-form :model="userDetails">
                  <el-input style="width:100%;" v-model="userDetails.userNickName" auto-complete="off" placeholder="请输入您要设置的昵称"></el-input>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="setuserNickName(userDetails.userNickName)">确 定</el-button>
                </div>
              </el-dialog>
            </ul>
            <div class="information">
              <p style="clear: both">详细信息</p>
              <el-form ref="form" :model="userDetails" label-width="80px">
                <el-form-item label="性别">
                  <el-select v-model="userDetails.userSex" placeholder="请选择性别" @change="test(userDetails.userSex)">
                    <el-option
                      v-for="item in userDetails.Sexs"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="出生日期">
                  <el-date-picker
                    v-model="userDetails.userBirth"
                    type="date"
                    placeholder="请出生日期"
                     format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                     @change="test(userDetails.userBirth)">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="婚姻状况">
                  <el-radio-group v-model="userDetails.userMarry" @change="test(userDetails.userMarry)">
                    <el-radio label="02" >未婚</el-radio>
                    <el-radio label="01">已婚</el-radio>
                    <el-radio label="03">离异</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="学历">
                  <el-select v-model="userDetails.userEducation" placeholder="选择" >
                    <el-option
                      v-for="item in userDetails.educationlist"
                      :key="item.dictValue"
                      :label="item.dictName"
                      :value="item.dictValue"
                     >
                    </el-option>
                  </el-select>
                </el-form-item> 
                <el-form-item label="职业">
                  <el-select v-model="userDetails.userProfession" placeholder="选择" >
                    <el-option value="">——空——</el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="月收入">
                  <el-select v-model="userDetails.userIncome" placeholder="选择">
                    <el-option value="">——空——</el-option>
                  </el-select>
                </el-form-item> 
                 <!-- 户籍和现居地区选择 -->
                <el-form-item label="户籍地">
                  <el-select v-model="region.oldHouseProvince" filterable placeholder="请选择省份"  @change="getNowProvince(2)">
                    <el-option
                      v-for="item in region.HJProvinces"
                      :key="item.id"
                      :label="item.areaname"
                      :value="item.id"
                     >
                    </el-option>
                  </el-select>
                 <el-select v-model="region.oldHouseCity" filterable placeholder="请选择城市" @change="getNowProvince(3)">
                    <el-option
                      v-for="item in region.HJCitys"
                      :key="item.id"
                      :label="item.areaname"
                      :value="item.id">
                    </el-option>
                  </el-select>
                 <el-select v-model="region.oldHouseContry" filterable placeholder="请选择区县" >
                    <el-option
                      v-for="item in region.HJCountys"
                      :key="item.id"
                      :label="item.areaname"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="现居地">
                   <el-select v-model="region.nowHouseProvince" filterable placeholder="请选择省份"  @change="getNowProvince(4)">
                    <el-option
                      v-for="item in region.XJProvinces"
                      :key="item.id"
                      :label="item.areaname"
                      :value="item.id"
                     >
                    </el-option>
                  </el-select>
                 <el-select v-model="region.nowHouseCity" filterable placeholder="请选择城市" @change="getNowProvince(5)">
                    <el-option
                      v-for="item in region.XJCitys"
                      :key="item.id"
                      :label="item.areaname"
                      :value="item.id">
                    </el-option>
                  </el-select>
                 <el-select v-model="region.nowHouseContry" filterable placeholder="请选择区县" >
                    <el-option
                      v-for="item in region.XJCountys"
                      :key="item.id"
                      :label="item.areaname"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="详细地址">
                  <el-input v-model="userDetails.userAddress" class="XXAddress"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="danger" :plain="true" @click="affirmChanges(userDetails,region)">保存</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import {getUpdateHeadPortrait,upload,getAccountInfomation,getUpdateUserInfomation,getSysAreaList,getUserinfoData} from '@/services/getDetail'
export default {
  name: 'account',
  data () {
    return {
      userDetails: {
        //性别
        Sexs: [{
          value: '01',
          label: '男'
        }, {
          value: '02',
          label: '女'
        }],
        // 用户昵称
        userNickName:"",
        userSex:'',
        //出生日期
        userBirth:'',
        // 婚姻状态
        userMarry:'',
        // 教育程度
        userEducation:'',
        // 职位
        userProfession:'',
        // 收入
        userIncome:'',
        type: '1',
        education:'',
        job: '',
        income:'',
        place:'',
        address:''
      },
      //所有地区
      region:{
        //户籍省份数组
        HJProvinces:[],
        //户籍选择的省
        oldHouseProvince:null,
        //户籍市级数组
        HJCitys:[],
        //户籍选择的市
        oldHouseCity:null,
        //户籍区县级数组
        HJCountys:[],
        //户籍选择的区县
        oldHouseContry:null,
         //现居省份数组
        XJProvinces:[],
        //现居选择的省
        nowHouseProvince:null,
        //现居市级数组
        XJCitys:[],
        //现居选择的市
        nowHouseCity:null,
        //现居区县级数组
        XJCountys:[],
        //现居选择的区县
        nowHouseContry:null,
        //详情地址
        userAddress:null,
      },
      bindName:false,
      formLabelWidth: '120px'
    }
  },
  methods: {
    //上传头像
   handleFile1(e) {
      // console.log(e)
      //this.$bus.$emit('loading')
      let $target = e.target || e.srcElement
      let file = $target.files[0]
      var reader = new FileReader()
      // console.log(reader)
      reader.onload = (data) => {
        // console.log(data)
        let res = data.target || data.srcElement
        let img = new Image()
        img.onload = () => {
          // 回调更新父组件数据;
          this.saveImg(res.result)
        }
        img.src = res.result
      }
      reader.readAsDataURL(file)
    },
    saveImg(dataUrl){
      // console.log(dataUrl)
      var data = {
        file:dataUrl
      }
      upload(data).then(res=>{
        // console.log(res)
        if(res.state){
          var img= {
            userHeadPortraitId:res.data.netUrl 
          };
          getUpdateHeadPortrait(img).then(res=>{
            // console.log(res);
            if(res.state){
              this.getUser();
              this.$message({
                message: '头像上传成功',
                type: 'success'
              });
            }
          });
        }else {
          // console.log(res.msg)
        }
      })
    },
    //查询用户个人详情资料,进入页面立即执行
    getUser(){
      let that = this;
      getUserinfoData().then(res=>{
        // console.log(res);
        that.userDetails=res.data;
        var a=[{
          value: '01',
          label: '男'
        }, {
          value: '02',
          label: '女'
        }];
        that.userDetails.Sexs=a;
          this.getProvince(1);
          this.region.oldHouseProvince= that.userDetails.oldHouseProvince;
          this.region.oldHouseCity=that.userDetails.oldHouseCity;
          this.region.oldHouseContry=that.userDetails.oldHouseContry;
          this.region.nowHouseProvince=that.userDetails.nowHouseProvince;
          this.region.nowHouseContry=that.userDetails.nowHouseContry;
          this.region.nowHouseCity=that.userDetails.nowHouseCity;
          // debugger;
          if(res.data.oldHouseProvince!=""){
          this.getProvince(2);
          this.getProvince(3);
          this.getProvince(4);
          this.getProvince(5);
        }
      
      });
      getAccountInfomation().then(res=>{
        // console.log(res);
        // debugger;
      });
    },
    //临时测试的方法
    test(a){
      // console.log(a)
    },
    //查询全国的省市县，加载页面立即执行 getProvince(1)；
    //2和3表示为查询生源地的城市和县区
    //4和5表示为查询现居地的城市和县区
    getProvince(SZ){
      var data={
        parentId:null
      };
      if(SZ==2){
        if(this.region.oldHouseProvince==null){
          alert('请选择省份');
          return;
        }
      
         data.parentId=this.region.oldHouseProvince;
      };
      if(SZ==3){
        if(this.region.oldHouseCity==null||this.region.oldHouseProvince==null){
          alert('请选择省份和城市');
          return;
        }
            data.parentId=this.region.oldHouseCity;
      };
      //现居省份城市的代号为4,5
      if(SZ==4){
        if(this.region.nowHouseProvince==null){
          alert('请选择省份');
          return;
        }
         data.parentId=this.region.nowHouseProvince;
      };
      if(SZ==5){
        if(this.region.nowHouseProvince==null||this.region.nowHouseCity==null){
          alert('请选择省份和城市');
          return;
        }
            data.parentId=this.region.nowHouseCity;
      };
      getSysAreaList(data).then(res=>{
        // console.log(res);
        // debugger;
        if(SZ==1){
          //进入页面立即执行函数，将数据分别赋值给HJProvinces，XJProvinces
            this.region.HJProvinces=res.data;
            // console.log(res.data);
            this.region.XJProvinces=res.data;
        };
         //调用函数传值为2和3时，是为生源地赋值
      if(SZ==2){
            this.region.HJCitys=res.data;
        };
        if(SZ==3){
            this.region.HJCountys=res.data;
        };
        //调用函数传值为4和5时，是为现居住地赋值
        if(SZ==4){
            this.region.XJCitys=res.data;
        };
        if(SZ==5){
            this.region.XJCountys=res.data;
        };
      });
    },
    //选择执行
  getNowProvince(SZ){
      var data={
        parentId:null
      };
      if(SZ==2){
        if(this.region.oldHouseProvince==null){
          alert('请选择省份');
          return;
        }
      
         data.parentId=this.region.oldHouseProvince;
      };
      if(SZ==3){
        if(this.region.oldHouseCity==null||this.region.oldHouseProvince==null){
          alert('请选择省份和城市');
          return;
        }
            data.parentId=this.region.oldHouseCity;
      };
      //现居省份城市的代号为4,5
      if(SZ==4){
        if(this.region.nowHouseProvince==null){
          alert('请选择省份');
          return;
        }
         data.parentId=this.region.nowHouseProvince;
      };
      if(SZ==5){
        if(this.region.nowHouseProvince==null||this.region.nowHouseCity==null){
          alert('请选择省份和城市');
          return;
        }
            data.parentId=this.region.nowHouseCity;
      };
      getSysAreaList(data).then(res=>{
        // console.log(res);
        if(SZ==1){
          //进入页面立即执行函数，将数据分别赋值给HJProvinces，XJProvinces
            this.region.HJProvinces=res.data;
            // console.log(res.data);
            this.region.XJProvinces=res.data;
        };
         //调用函数传值为2和3时，是为生源地赋值
      if(SZ==2){
            this.region.oldHouseCity='';
            this.region.oldHouseContry='';
            this.region.HJCitys=res.data;
        };
        if(SZ==3){
            this.region.oldHouseContry='';
            this.region.HJCountys=res.data;
        };
        //调用函数传值为4和5时，是为现居住地赋值
        if(SZ==4){
            this.region.nowHouseCity='';
            this.region.nowHouseContry='';
            this.region.XJCitys=res.data;
        };
        if(SZ==5){
            this.region.nowHouseContry='';
            this.region.XJCountys=res.data;
        };
      });
    },
    //保存昵称
    setuserNickName(name){
      var data={
        userNickName:name
      };
      getUpdateUserInfomation(data).then(res=>{
        // console.log(res);
        if(res.state){
          this.$message({
            message: '恭喜你，昵称设置成功',
            type: 'success'
          });
        }
      })
      this.bindName = false;
    },
    //提交表单
      affirmChanges(data,region){
        // console.log(data);
        // console.log(region);
        data.oldHouseProvince=region.oldHouseProvince;
        data.oldHouseCity=region.oldHouseCity;
        data.oldHouseContry=region.oldHouseContry;
        data.nowHouseProvince=region.nowHouseProvince;
        data.nowHouseCity=region.nowHouseCity;
        data.nowHouseContry=region.nowHouseContry;
        // data.userBirth=String(data.userBirth);
        // console.log(data.userBirth);
        //   console.log('以上是传入的时间');
        getUpdateUserInfomation(data).then(res=>{

          // console.log(res);
          if(res.state){
            this.$message({
            message: '恭喜你，这是一条成功消息',
            type: 'success'
          });
          // this.window.go(-1);

            this.$router.push('/account/accountSetting')

           
          }
        })
      }
  },
    mounted(){
    //进入页面立即获取用户资料
    this.getUser();
  },
  components: {
    
  }
}
</script>
<style lang="scss" scoped>  
  .body{
    .upLoad {
      .upImg {
          margin: 0 auto;
          /*float: left;*/
          margin-right: 10px;
          // margin-left: 15px;
          label {
            display: inline-block;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background:url("../../../assets/imgs/default_avatar1.png");
            background-repeat:no-repeat;
            background-size:100px 100px;
          }
        }
      }
    .main{ 
      width:100%;
      margin:0 auto;
      background-color: #fff;
      overflow: hidden;
      .all_content{
        background-color: #fff;
        color: #666;
        font-size:14px;
        padding:20px 30px;
        h3{
          padding-bottom:10px;
          border-bottom:2px solid #eee;
          color:#000;
          a{
            color: #e52921;
          }
        }
        /*设置头像*/
        .m_box{
          padding:30px 0;
          border-bottom:1px solid #eee;
          overflow: auto;
          .left{
            /*float:left;*/
            img{
              padding-right:20px;
              vertical-align: middle;
            }
          }
          .right{
            /*float:left;*/
            padding-top:10px;
            p{
              color: #e52921;
              font-size:16px;
              padding-bottom:10px;
            }
            div{color:#888;}
          }
        }
        /*信息设置*/
        .message{
          padding:0 20px;
          overflow: auto;
          .name{
            li{
              float:left;
              line-height:60px;
            }
            .first{width:42%;}
            .second{
              width:48%;
              img{
                padding-right: 10px;
                vertical-align: sub;
              }
            }
            .third{width:10%;color: #e52921;}
          }
          .information{
            p{line-height:60px;}
            .el-form-item__label {
              text-align:right;
              float: left;
              font-size: 14px;
              color: #606266;
              line-height: 60px;
              padding: 0 12px 0 0;
            }
          }
        }
      }
    }
  }
</style> 
<style lang="scss">

.XXAddress{
  width: 78% !important;
}
.accountSettingPersonal{
    .el-select{
     float: none !important;
  }
  .el-dialog{
    width: 370px;
  }
  .el-dialog__title{
      font-size: 22px;
  }
  .el-input{
    width: auto;
    border: 1px #dcdfe6 solid;
    border-radius: 5px;
  }
  .el-dialog--center .el-dialog__body {
    text-align: initial;
    padding: 25px 35px 30px;
}
  .el-input__inner{
      border: 0px;
  }
  .el-button--primary{
      height: 45px;
      width: 90%;
      background-color: red;
      border-color: red;
  }
  .el-dialog__footer{
    margin-top: -5px;
  }
  .el-radio__inner:hover {
    border: 1px solid #e52921;
  }
  .el-radio__input.is-checked .el-radio__inner {
      border-color: #e52921;
      background: #e52921;
  }
  .el-radio__input.is-checked+.el-radio__label {
      color: #666;
  }
  .el-button--danger {
      color: #fff;
      background-color: #e52921;
      border-color: #e52921;
  }
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>