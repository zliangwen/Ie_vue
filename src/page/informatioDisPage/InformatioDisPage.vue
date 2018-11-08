<!-- 信息披露页面 -->
<template>
  <div class="infor">
    <div class="all_body">
      <!-- banner -->
      <!-- <div class="wrap">
      </div> -->
      <div class="information">
        <!-- 导航 -->
        <div class="navigation">
          <ul>
            <li class="liClass" v-for="(item,index) in navList" :key="item.id" :class="{liContent:index==tabs}" v-on:click="active(index)">
              <span>{{item.name}}</span>
            </li>
          </ul>
        </div>
        <!-- 右边主体 -->
        <div class="rightMain">
          <!-- 平台信息 -->
          <div class="main1" v-if="tabs==0">
            <div class="title">
              <div>
                平台信息
              </div>
            </div>
            <div class="main_content">
              <div class="colorTitle">
                平台介绍
                <p><img src="../../images/information/1.png" alt=""></p>
              </div>
              <table>
                <tr v-for="(item,index) in pingtaiList" :key="index" :class="{'activeTwo':index%2 != 0}">
                  <td class="td1">{{item.title}}</td>
                  <td class="td2">{{item.content}}</td>
                </tr>
              </table>
              <div class="colorTitle">
                平台模式
                <p><img src="../../images/information/1.png" alt=""></p>
              </div>
              <div style="margin:0 auto;"><img src="../../images/information/details.png" alt="" style="margin:0 auto"></div>
            </div>
          </div>
          <!-- 备案信息 -->
          <div class="main1" v-if="tabs==1">
            <div class="title">
              <div>
                备案信息
              </div>
            </div>
            <div class="main_content">
              <table>
                <tr v-for="(item,index) in beianList" :key="index" :class="{'activeTwo':index%2 != 0}">
                  <td class="td1">{{item.title}}</td>
                  <td class="td2">{{item.content}}</td>
                </tr>
              </table>
            </div>
          </div>
          <!-- 监管法规 -->
          <div class="main4" v-if="tabs==2">
            <div class="title">
              <div>
                监管法规
              </div>
            </div>
            <div class="main_content">
              <ul style="cursor:default">
                <li v-for="(item,index) in faguiList" :key="index">
                    <a :href="item.linkUrl" target="_blank">{{item.title}}</a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 运营报告 -->
          <div class="main4" v-if="tabs==3">
            <div class="title">
              <div>
                运营报告
              </div>
            </div>
            <div style="padding:40px 30px;"><img src="../../images/information/yun.png" alt=""></div>
          </div>
          <!-- 官方公告 -->
          <div class="main4" v-if="tabs==4">
            <div class="title">
              <div>
                官方公告
              </div>
            </div>
            <div class="main_content">              
              <ul v-if="!hasData" style="cursor:default">
                <router-link tag="li" v-for="(item,index) in gonggaoList" :key="index" :to="{path:'/InformationDetail',query:{id:item.id}}">
                  <div>{{item.name}}</div>
                  <p>{{item.publishTime | toFixed}}</p>
                </router-link>
              </ul>
            </div>
            <div v-if="!hasData" style="margin:50px 0;text-align: center;">
              <el-pagination :page-size="10" layout="prev, pager, next" :total="rowCount" :current-page.sync="currentPage" @current-change="handleCurrentChange"
                @prev-click="pageDel" @next-click="pageAdd">
              </el-pagination>
            </div>
            <div v-if="hasData" class="noData">
              <p>暂无数据</p>
            </div>
          </div>
          <!-- 帮助中心 -->
          <div class="main7" v-if="tabs==5">
            <div class="title">
              <div>
                帮助中心
              </div>
            </div>
            <div class="main_content">
              <div style="padding:0 50px 50px;">
                <el-collapse accordion>
                  <!-- <img src="../../assets/imgs/dico.png" alt=""> -->
                  <el-collapse-item title="账户类问题">
                    <el-collapse accordion style="padding:0 20px;">
                      <el-collapse-item title="1.1注册的时候收不到短信怎么办？">
                        <div>（1）请确认手机是否安装短信拦截过滤软件；</div>
                        <div>（2）请确认手机是否能够正常接收短信（信号问题、手机欠费、手机停机等）；</div>
                        <div>（3）短信收发过程中可能会存在延迟，请耐心等待；</div>
                        <div>（4）联系在线客服寻求帮助，或拨打客服热线：400-006-2140</div>
                      </el-collapse-item>
                      <el-collapse-item title="1.2注册手机号码可以更换吗？">
                        <div>不可以更换，如需更换手机号可重新注册账号绑定新手机号码。</div>
                      </el-collapse-item>
                      <el-collapse-item title="1.3账户支持注销吗？">
                        <div>每个账户只能注册一次，不支持注销。</div>
                      </el-collapse-item>
                      <el-collapse-item title="1.4注册一定要用银行预留手机号码吗？">
                        <div>（1）注册时的手机号码可以不是银行预留手机号，但是在开通银行存管账户的时候，必须填写银行预留手机号；</div>
                        <div>（2）如银行预留手机号码有变更，需联系客服解绑银行卡后，重新绑定即可。</div>
                      </el-collapse-item>
                      <el-collapse-item title="1.5如何设置交易密码？">
                        <div>（1）打开麦麦理财App，点击“我的”页面—设置—设置交易密码，根据提示操作即可；</div>
                        <div>（2）在购买标的时，点击首页或理财页标的—立即投资—立即购买—设置交易密码，根据提示操作即可；</div>
                      </el-collapse-item>
                      <el-collapse-item title="1.6可以绑定多张银行卡吗？">
                        <div>不可以，麦麦理财目前只能绑定一张提现银行卡，暂不支持多卡绑定。</div>
                      </el-collapse-item>
                      <el-collapse-item title="1.7登录密码忘记了如何找回？">
                        <div>（1）点击“登录”—“忘记密码”，填写手机号并获取验证码后再点击“下一步”找回密码。</div>
                      </el-collapse-item>
                      <el-collapse-item title="1.8登录密码多次错误，账号被锁">
                        <div>用户连续登录5次密码错误，帐号将被锁定，解锁需联系在线客服或拨打热线电话：400-006-2140</div>
                      </el-collapse-item>
                      <el-collapse-item title="1.9交易密码忘记了如何找回？">
                        <div>（1）进入“我的”页面—“系统设置”—“修改交易密码”—”忘记密码“，根据提示操作即可；</div>
                        <div>（2）进入产品页面，点击“立即购买”，再点击“购买”页面中的“忘记密码”可进行交易密码重置。</div>
                      </el-collapse-item>
                      <el-collapse-item title="1.10验证码收不到">
                        <div>您好，请确认以下情况</div>
                        <div>（1）手机内是否安装了拦截软件，查看拦截信箱；</div>
                        <div>（2）手机信号是否畅通，可以尝试重启手机；</div>
                        <div>（3）请勿多次点击重新发送，单次点击后请耐心等待验证码；</div>
                        <div>（4）如果还是收不到验证码，请致电客服热线400-006-2140求助。</div>
                      </el-collapse-item>
                    </el-collapse>
                  </el-collapse-item>
                  <el-collapse-item title="标的类问题">
                    <el-collapse accordion style="padding:0 20px;">
                      <el-collapse-item title="2.1新手专享标是什么？">
                        <div>（1）新手专享：新手专享项目展示在新手专区内，专供新人投资体验，仅针对在麦麦理财新注册且尚未投资过新手专享项目的用户；</div>
                        <div>（2）该系列项目期限短、收益高（年化收益率15%、16.88%），让用户充分体验投资过程；</div>
                        <div>（3）新手标起投金额为100元，限购金额为50000元，每位用户限投一次，一次机会永久保留。</div>
                      </el-collapse-item>
                      <el-collapse-item title="2.2发标有预告吗？">
                        <div>每天发标具体时间和标量依据业务端情况而不同，没有固定时间，也没有投标预告。</div>
                      </el-collapse-item>
                      <el-collapse-item title="2.3投资了什么时候开始计息？">
                        <div>即投即计息</div>
                      </el-collapse-item>
                      <el-collapse-item title="2.4平台起投金额？">
                        <div>平台起投金额为100元，以100元进行递增</div>
                      </el-collapse-item>
                    </el-collapse>
                  </el-collapse-item>
                  <el-collapse-item title="费用类问题">
                    <el-collapse accordion style="padding:0 20px;">
                      <el-collapse-item title="3.1充值有费用吗？">
                        <div>充值对投资人是免费的，手续费由平台承担。</div>
                      </el-collapse-item>
                      <el-collapse-item title="3.2收益计算">
                        <div>（1）用户投资项目后马上开始计息；</div>
                        <div>（2）平台计息收益根据预期年化收益率计算；</div>
                        <div>（3）计算公式：总收益=购买金额*预期年化收益率/360*项目期限。</div>
                      </el-collapse-item>
                    </el-collapse>
                  </el-collapse-item>
                  <el-collapse-item title="回款类问题">
                    <el-collapse accordion style="padding:0 20px;">
                      <el-collapse-item title="4.1投资到期还款时间？">
                        <div>到期还款时间在次日早上10点之前，节假日正常还款（备注：详见系统中当天的还款公告）</div>
                      </el-collapse-item>
                    </el-collapse>
                  </el-collapse-item>
                  <el-collapse-item title="充值类问题">
                    <el-collapse accordion style="padding:0 20px;">
                      <el-collapse-item title="5.1充值多久到账？">
                        <div>（1）正常情况下，充值即时到账。如果银行提示扣款之后账户余额没有相应增加，可能是存管系统延迟或者银行掉单导致，系统延迟会在10-30分钟后到账，到账后不影响正常使用；</div>
                        <div>（2）如遇到特殊情况可在第一时间联系在线客服或拨打客服热线400-006-2140处理。</div>
                      </el-collapse-item>
                      <el-collapse-item title="5.2充值支持哪些银行卡？">
                        <div>（1）目前支持中国银行、建设银行、平安银行、光大银行、广发银行、兴业银行、华夏银行、浦发银行、交通银行、北京银行、工商银行、上海银行、邮政储蓄银行、中信银行共14家银行。</div>
                        <div>（2）目前只支持储蓄卡，不支持信用卡交易。</div>
                      </el-collapse-item>
                      <el-collapse-item title="5.3为什么会充值失败？">
                        <div>（1）银行卡余额不足以支付充值金额；</div>
                        <div>（2）交易密码输入有误；</div>
                        <div>（3）银行卡出现挂失、注销或信息变更等情况；</div>
                        <div>（4）充值金额超过单笔充值限额（以银行提供的限额为准）；</div>
                        <div>（5）银行系统维护、繁忙、交易超时，造成扣款未成功；</div>
                        <div>（6）如银行卡有关联存折，可能会造成充值失败；</div>
                        <div>（7）联系客服：400-006-2140</div>
                      </el-collapse-item>
                    </el-collapse>
                  </el-collapse-item>
                  <el-collapse-item title="提现类问题">
                    <el-collapse accordion style="padding:0 20px;">
                      <el-collapse-item title="6.1提现到账时间？">
                        <div>（1）提现的到帐时间与请求提现时间相关，工作日下午16：00之前申请的提现会在当天18：00左右到账（具体到账时间以银行为准）；</div>
                        <div>（2）16：00之后申请的提现将在下个工作日到帐，周末及法定节假日提现，顺延至下个工作日到帐；</div>
                        <div>（3）当天充值未进行投资操作的资金，如当日进行提现操作，资金将于第二个工作日到帐。</div>
                        <div>注：周末及法定假日提现，则顺延至下个工作日到账，给您带来不便，敬请谅解（具体到账时间以银行为准）</div>
                      </el-collapse-item>
                      <el-collapse-item title="6.2起提额度和费用？">
                        <div>我们的提现金额为100元起提，目前提现暂时不收取任何费用。</div>
                        <div>温馨提示：如有更改会另行通知。</div>
                      </el-collapse-item>
                      <el-collapse-item title="6.3提现失败的原因？">
                        <div>（1）银行卡出现挂失、注销或信息变更等状况；</div>
                        <div>（2）提现操作失败：用户无论是否输入交易密码，只要跳转到银行存管，系统都会有一个判断时间，同时资金会进入冻结状态。银行存管系统确认没有输入密码或者密码输入有误后，资金会在20分钟左右退回。此时，用户重新申请提现即可。</div>
                      </el-collapse-item>
                      <el-collapse-item title="6.4提现还未处理能否撤销？">
                        <div>提现一旦提交则无法撤销。</div>
                      </el-collapse-item>
                    </el-collapse>
                  </el-collapse-item>
                  <el-collapse-item title="活动类问题">
                    <el-collapse accordion style="padding:0 20px;">
                      <el-collapse-item title="7.1如何推荐好友？">
                        <div>APP端：登录麦麦理财账户，在“首页”点击“邀请好友”按钮后，可邀请好友面对面扫码或在邀请详情页最下方分享好友来绑定你们的关系（邀请好友投资后可享受多重奖励喔~）</div>
                      </el-collapse-item>
                      <el-collapse-item title="7.2参与活动中获得的红包使用规则是怎样的？">
                        <div>（1）红包不能直接提现，投资之后可提现；</div>
                        <div>（2）单张券不可拆分使用，单笔投资只能使用一张符合条件的红包；</div>
                        <div>（3）每张红包均有效期，请在有效期限内使用；</div>
                        <div>（4）投资时在支付页面勾选红包抵扣投资金额，红包需要按照使用规则来进行使用。</div>
                      </el-collapse-item>
                      <el-collapse-item title="7.3活动中的奖品是如何领取的？">
                        <div>（1）活动如有涉及到奖品兑换，用户可直接兑换，在活动详情页点击“我的奖品”可查看已兑换的所有奖品，实物奖品将于结束后发放；</div>
                        <div>（2）如活动涉及累计投资、排行榜等，需在活动结束后以最终投资额/排名为准，客服人员会在活动结束3个工作日内联系您兑换大奖。</div>
                      </el-collapse-item>
                    </el-collapse>
                  </el-collapse-item>
                  <el-collapse-item title="红包类问题">
                    <el-collapse accordion style="padding:0 20px;">
                      <el-collapse-item title="8.1红包是什么？如何获得？">
                        <div>红包分为抵扣红包和加息红包，是麦麦理财奖励给用户的虚拟礼金，一般可以通过新用户注册、相关活动、推荐新用户获得，每次可根据红包使用规则进行投资。</div>
                      </el-collapse-item>
                      <el-collapse-item title="8.2加息红包（加息券）是什么？">
                        <div>举个例子：用户投资预期年化12%的理财项目，同时勾选了符合条件的3%加息券，则该用户即可享受15%预期年化。</div>
                        <div>（1）每张加息券仅可使用一次，每次仅可使用一张，加息券和红包不可同时使用；</div>
                        <div>（2）加息券有投资金额、起投时间、投资项目等使用条件，请在条件范围内使用；</div>
                        <div>（3）加息券均有相应有效期，请在有效期限内使用，过期则失效。</div>
                      </el-collapse-item>
                      <el-collapse-item title="8.3红包使用规则和条件有哪些？">
                        <div>（1）投资红包无法提现，投资可抵扣，单笔投资仅可使用一张红包；</div>
                        <div>（2）起投金额：用户使用红包需达到它的最低起投金额；</div>
                        <div>（3）起投期限：红包可使用项目的最低投资期限；</div>
                        <div>（4）有效期：红包在一段时间内的有效期限，过期自动失效，请及时使用。</div>
                      </el-collapse-item>
                    </el-collapse>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
          <!-- 联系我们 -->
          <div class="main1" v-if="tabs==6">
            <div class="title">
              <div>
                联系我们
              </div>
            </div>
            <div class="main_content">
              <div class="colorTitle">
                关于我们
                <p><img src="../../images/information/1.png" alt=""></p>
              </div>
              <div class="about1">
                <p>全国统一服务热线：400-006-2140（工作日9:00-21:00）</p>
                <p>公司地址：浙江省杭州市西湖区文三路259号昌地火炬大厦1号楼6楼</p>
                <p>邮政编码：310000</p>
              </div>
              <div class="colorTitle">
                官方渠道
                <p><img src="../../images/information/1.png" alt=""></p>
              </div>
              <div class="about2">
                <div>
                  <p style="padding-bottom:10px;font-size:20px">微信订阅号</p>
                  <p><img src="../../images/weixin.png" alt="" style="width:150px;height:150px;"></p>
                </div>
                <div>
                  <p style="padding-bottom:10px; font-size:20px;">下载APP</p>
                  <p><img src="../../images/app.png" alt="" style="width:150px;height:150px;"></p>
                </div>
              </div>
              <div class="colorTitle">
                公司位置
                <p><img src="../../images/information/1.png" alt=""></p>
              </div>
              <div class="about3">
                <m-b-map></m-b-map>
              </div>
            </div>
          </div>
        </div>
      </div>     
    </div>
  </div>
</template>

<script>
import mBMap from '../../components/address/address';
export default {
  name: 'InformatioDis',
  data () {
    return {
      navList:[
        {id:"1",name:"平台信息"},
        {id:"2",name:"备案信息"},
        {id:"3",name:"监管法规"},
        {id:"4",name:"运营报告"},
        {id:"5",name:"官方公告"},
        {id:"6",name:"帮助中心"},
        {id:"7",name:"联系我们"},
      ],
      tabs:0,
      state:'',
      pingtaiList:[
        { title: "公司全称", content: "深圳前海集萃汇互联网金融服务有限公司" },
        { title: "简称", content: "麦麦理财" },
        { title: "注册资本", content: "5000万元人民币" },
        { title: "注册地址", content: "深圳市前海深港合作区前湾一路1号A栋201室" },
        { title: "成立时间", content: "2015-06-16" },
        { title: "法定代表人", content: "崔兴花" },
        { title: "经营范围", content: "提供金融中介服务，受金融机构委托从事金融外包服务（根据法律、行政法规、国务院决定等规定 需要审批的，依法取得相关审批文件后方可经营）；股权投资；商业项目投资、投资兴办实业（具体项目另行申报）" },
        { title: "网站或平台地址", content: "http://www.maimailc.com/" },
        { title: "平台上线运营时间", content: "平台上线运营时间" },
        { title: "成立时间", content: "2018-01-18" },
        { title: "公司经营期限", content: "2015-06-16 —— 长期" },
        { title: "公司经营状态", content: "存续（开业）" },
      ],
      beianList: [
        { title: "主办单位名称", content: "深圳前海集萃汇互联网金融服务有限公司" },
        { title: "主办单位性质", content: "企业" },
        { title: "网站备案/许可证号粤", content: "ICP备17163290号-1" },
        { title: "网站名称", content: "麦麦理财" },
        { title: "网站首页网址", content: "www.maimailc.com" },
        { title: "审核时间", content: "2017-12-22" },
      ],
      faguiList: [
        { title: "中华人民共和国合同法", linkUrl: "http://www.npc.gov.cn/npc/lfzt/rlyw/2016-07/01/content_1992739.htm" },
        { title: "中华人民共和国网络安全法", linkUrl: "http://www.npc.gov.cn/npc/xinwen/2016-11/07/content_2001605.htm" },
        { title: "中华人民共和国电子签名法", linkUrl: "http://www.npc.gov.cn/wxzl/gongbao/2015-07/03/content_1942836.htm" },
        { title: "关于促进互联网金融健康发展的指导意见", linkUrl: "http://www.gov.cn/xinwen/2015-07/18/content_2899360.htm" },
        { title: "最高人民法院关于审理民间借贷案件适用法律若干问题的规定", linkUrl: "http://www.court.gov.cn/fabu-xiangqing-15146.html" },
        { title: "P2P网络借贷风险专项整治工作实施方案", linkUrl: "http://www.cbrc.gov.cn/chinese/home/docDOC_ReadView/D81B52D3D20A49A99522C48FA8F1C752.html" },
        { title: "网络借贷信息中介机构业务活动管理暂行办法", linkUrl: "http://www.cbrc.gov.cn/chinese/home/docDOC_ReadView/D934AAE7E05849D185CD497936D767CF.html" },
        { title: "网络借贷信息中介机构备案登记管理指引", linkUrl: "http://www.cbrc.gov.cn/govView_E7B94B41E8C340E4833472632308AEC5.html" },
        { title: "网络借贷资金存管业务指引", linkUrl: "http://www.cbrc.gov.cn/govView_4201EF03472544038242EED1878597CB.html" },
        { title: "网络借贷信息中介机构业务活动信息披露指引", linkUrl: "http://www.cbrc.gov.cn/govView_C8D68D4C980A4410B9F4E21BA593B4F2.html" },
      ],
      shenheList:[],
      zuzhiList:[],
      yunyingList:[],
      gonggaoList:[],
      currData: {
        page: 1,
      },
      rowCount: 0,
      currentPage: 1,
      hasData: false,
      myCanvas: 'myCanvas',
      canvasIds:"canvasId1",
      width: 500,
      height: 600,
      data: [
          {name: '1月', value: 1342},
          {name: '2月', value: 2123},
          {name: '3月', value: 1654},
          {name: '4月', value: 1795},
          {name: '5月', value: 1342},
          {name: '6月', value: 2123},
          {name: '7月', value: 1654},
          {name: '8月', value: 1795},
          {name: '9月', value: 1342},
          {name: '10月', value: 2123},
          {name: '11月', value: 0},
          {name: '12月', value: 0},
      ],
      dataList:[
          {name: '', value: 13},
          {name: '', value: 20},
          {name: '', value: 17},
          {name: '', value: 18},
      ],
      options: {
          title: '成交金额',
          fillColor:"#82b4f9",
          padding:0
      },
    }
  },
  watch:{  
    '$route': 'getQuery'  
  },
  methods:{
    active: function (index) {
      this.tabs=index;
      this.$route.query.state = this.tabs;
    },
    getQuery(){
       let routerRuery = this.$route.query.state || 0 
       this.tabs=routerRuery
    },
    pageAdd() {
      this.currData.page += 1
    },
    pageDel() {
      this.currData.page -= 1
    },
    handleCurrentChange(val) {
      this.currData.page = val
      this.getLatest()
    },
    getLatest() {
      var that = this;
      that.service({
        url: "/sourceLink/findPage.json?action=notice",
        method: "post",
        data: JSON.stringify(that.currData),
      }).then(res => {
        if (res.code == 200) {
          if (res.data.list.length != 0) {
            that.gonggaoList = res.data.list;
            that.rowCount = res.data.page.totalResults;
            that.hasData = false;
          } else {
            that.hasData = true;
          } 
        }
      }).catch(res => {
        console.log(res)
      })
    },
  },
  
  mounted(){
    sessionStorage.setItem('active',4) //保证刷新时，active的状态
    this.getLatest()
    this.getQuery()
    
  },
  filters: {
    toFixed: function (val) {
      return val.substring(0, 10)
    },
  },
  components: {
    mBMap
  }
}
</script>
<style lang="scss" scoped> 
  .infor{
    width:100%;
    color:#000;
    background:#f4f4f4;
    overflow: hidden;
    .all_body{
      width:1000px;
      margin: 30px auto 50px;
      background: #fff;
      .wrap{
        width: 100%;
        height: 300px;
        background-image: url("../../images/about/topImg.png");
        /* position:relative; */
        img{
          width:100%;
          height:auto;
        }
      }
      .information{
        background:#f4f4f4;
        width:1000px;
        margin:50px auto;
        overflow: hidden;
      }
      .navigation{
        width:200px;
        float:left;
        background: #eee;
        ul{
          width:200px;
          margin:0 auto;
        }
        .liClass{
          font-size:16px;
          line-height:55px;
          width:100%;
          cursor: pointer;
          text-align: center;
        }
      }
      .liContent{
        color:#f22e3b;
        background: #fff;
        span{font-weight: bold;}
    }
    }
  }
  .rightMain{
    float:left;
    width:800px;
    padding-left:10px;
    background:#fff;
  }
  /*公共标题*/
  .title{
      margin:0 auto;
      line-height:49px;
      div{
        border-left:4px solid #f22e3b;
        padding-left:20px;
        font-size:18px;
        color:#000;
      }
    }
  /*备案信息、资费说明*/
  .main1{
    width:100%;
    .main_content{
      width:100%;
      padding:40px 50px 50px 50px;
      .colorTitle{
        font-size:18px;
        padding:20px 0;
        clear:both;
        p{
          margin-top:10px;
        }
      }
      table{
        width:100%;
        margin-bottom:20px;
        border:1px solid #ccc;
        font-size:14px;
        overflow: auto;
        .activeTwo{background: #eee;}
        tr{
          border-bottom:1px solid #ccc;
          .td1{
            width:20%;
            padding:8px 15px;
            border-right:1px solid #ccc;
            height:100%;
          }
          .td2{
            width:70%;
            line-height:28px;
            padding:8px 15px;
            span{
              color: #e52921;
              padding-left:30px;
            }
            p{
              padding-bottom:15px;
            }
            /* td{
              border-right:1px solid #c7c7c7;
              padding:5px 25px;
              text-align: center;
              color:#333;
            } */
            .dv1{
              background-color: #dddddd;
              width:100%;
            }
            .dv2{
              background-color: #eeeeee;
              width:100%;
            }
          }
        }
      }
      .about1 p{
        font-size:14px;
        line-height:26px;
      }
      .about2 div{
        float:left;
        padding:0 30px;
        text-align: center;
      }
      .about3{
        width:100%;
        height:400px;
      }
    }
  }
  /*运营信息*/
  .main4{
    width:100%;
    .main_content{
      width:100%;
      ul{
        width:790px;
        margin:0 auto;
        font-size:16px;
        overflow: auto;
        padding:20px 50px 0 50px;
        li{
          border-bottom:1px solid #eeeeee;
          line-height:50px;
          font-size: 14px;
          overflow: hidden;
          cursor: pointer;
          a{color:#333;}
          div{float:left;width:600px;overflow: hidden;text-overflow:ellipsis;display:-webkit-box;  
        -webkit-box-orient:vertical; -webkit-line-clamp:1;}
          p{float:right;color:#999;}
        }
      }
    }
    .operating{
      width:100%;
      .operating-detail{
        width:600px;
        margin:20px auto 30px;
        border:1px solid #eee;
        border-radius: 8px;
        li{
          width:50%;
          float:left;
          padding:20px 50px;
          .item-img{
            float: left;
          }
          .item-text{
            float:left;
            padding-left:20px;
            p{
              font-size: 14px;
              margin-top:5px;
              &.p{
                color:#000;
                font-weight: 600;
              }
              &.p-name{
                color:#999;
                font-size: 12px
              }
            }
          }
        }
      }
    }
    .pie{
      .pie-item{
        width:600px;
        margin:0 auto;
        .pie-item-left{
          width:50%;
        }
      }
    }
  }
  /*安全保障*/
  .main7{
    width:100%;
    .main_content{
      width:100%;
      padding-top:45px;
      .el-container{
        width:1200px;
        margin:0 auto 50px auto;
        .el-aside {
          text-align: center;
          img{
            vertical-align: middle;
            width:60%;
          }
        }
        .el-main {
          color: #333;
          text-align: left;
          .p_title{
            font-size:24px;
            padding-bottom:30px;
          }
          div{
            margin-bottom:20px;
            p{
              font-size: 14px;
              line-height:20px;
            }
           
          }
        }
      }
    }
  }
  .noData {
    margin: 157px 0;
    p {
      text-align: center;
      font-size:16px;
    }
  }
  
</style>  
<style>
  #myCanvas{
    width:600px;
    height:300px;
  }
  .el-collapse-item__header {
    font-size: 15px;
  }
</style>
