<template>
  <div id="fixNav">
    <!-- <div class="container">
      <ul>
        <li class="phone"><div class="img"><img src="../../assets/imgs/qrcode.png" alt=""></div></li>
        <li class="wx"><div class="img"><img src="../../assets/imgs/qrcode.png" alt=""></div></li>
        <li class="help"></li>
      </ul>
    </div> -->
    <el-tooltip placement="left" effect="light"  visible-arrow="false" >
      <!-- <div slot="content" class="po" style="color:#999;padding-bottom:10px;">全国服务热线</div>
      <div slot="content" class="po">021-59557359</div>
      <div slot="content" class="po">021-59559719</div> -->
      <div slot="content" style="width:150px;border:0;" value="true"><img src="../../assets/imgs/po.png" alt="" style="width:100%"></div>
      <el-button class="phone">
        <!-- <img src="../../assets/imgs/kefu.png" style="width:90px"/> -->
      </el-button>
    </el-tooltip>
    <br>
    <el-tooltip placement="left"  effect="light"  visible-arrow="false">
      <div slot="content" style="width:150px;"><img src="../../assets/imgs/qrcode.png" alt=""></div>
      <el-button class="wx"></el-button>
    </el-tooltip>
    <br>
    <el-tooltip placement="left"  effect="light"  visible-arrow="false">
      <div slot="content" style="width:150px;"><img src="../../assets/imgs/er.png" alt=""></div>
      <el-button class="help"></el-button>
    </el-tooltip>
    <br>
    <!-- <el-tooltip placement="left" effect="light" visible-arrow="false"> -->
      <el-button class="up" @click="toTop"></el-button>
    <!-- </el-tooltip> -->
  </div>
</template>
<script>
export default {
  methods: {
    // 回到顶部
    toTop() {
      document.documentElement.scrollTop = document.body.scrollTop = 0;
    },
  }
}
</script>
<style lang="scss" scoped>
#fixNav {
  .el-tooltip__popper.is-light {
    border:0;
  }
  .el-button {
    width: 60px;
    height: 60px;
    margin-bottom: 15px;
    border-radius: 0;
  }
  .po{
    color:#999;
    line-height:25px;
  }
  .phone {
    background: url("../../assets/imgs/kefu.png") no-repeat;
    background-size: contain;
    border:none;
    box-shadow: 0px 0px 20px #e5e5e5;
  }
  .wx {
    background: url("../../assets/imgs/weChat.png") no-repeat;
    background-size: contain;
    border:none;
     box-shadow: 0px 0px 20px #e5e5e5;
  }
  .help {
    background: url("../../assets/imgs/erweima.png") no-repeat;
    background-size: contain;
    border:none;
    box-shadow: 0px 0px 20px #e5e5e5;
  }
  .up{
    background:url("../../assets/imgs/up.png") no-repeat;
    background-size:contain;
    border:none;
    box-shadow: 0px 0px 20px #e5e5e5;
  }
}
</style>
