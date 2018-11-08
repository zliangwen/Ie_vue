import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home') // 首页
const forget = r => require.ensure([], () => r(require('../page/forget/forget')), 'forget') // 忘记密码
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login') // 登录
const regist = r => require.ensure([], () => r(require('../components/loginAndRegistration/RegistPage')), 'regist') // 登录
const money = r => require.ensure([], () => r(require('../page/moneyPage/MoneyPage')), 'money') // 投资列表
const about = r => require.ensure([], () => r(require('../page/aboutPage/AboutPage')), 'about') // 安全保障
const information = r =>require.ensure([], () => r(require('../page/informatioDisPage/InformatioDisPage')), 'information') // 信息披露
const account = r =>require.ensure([], () => r(require('../page/accountPage/accountComent')), 'account') // 我的账户
const accoutDetails = r =>require.ensure([], () => r(require('../page/accountPage/accountDetail/accountDetail')), 'accoutDetails') // 账户详情
const InformationDetail = r =>require.ensure([], () => r(require('../page/informatioDisPage/InformationDetail/InformationDetail')), 'InformationDetail') // 公告详情

const moreList = r =>require.ensure([], () => r(require('../page/moneyPage/investment/moreList')), 'moreList') //更多

const AccountInvest = r =>require.ensure([], () => r(require('../page/accountPage/accountInvest/accountInvest')), 'AccountInvest') //资金明细
const OurUanme = r =>require.ensure([], () => r(require('../page/accountPage/Activities/OurUanme')), 'OurUanme') //优惠券

const MoneyRecord = r =>require.ensure([], () => r(require('../page/accountPage/Activities/MoneyRecord')), 'MoneyRecord')  // 资金记录
const investmentPage = r =>require.ensure([], () => r(require('../page/moneyPage/investment/investmentPage')), 'investmentPage')  // 立即投资
const affirmInvestment = r =>require.ensure([], () => r(require('../page/moneyPage/investment/affirmInvestment')), 'affirmInvestment')
const accountSettingCard = r => require.ensure([], () => r(require('../page/accountPage/accountSettingCard/accountSettingCard')), 'accountSettingCard') //我的银行卡
const accountSetting = r => require.ensure([], () => r(require('../page/accountPage/accountSetting/accountSetting')), 'accountSetting') //个人资料
//充值 提现
const Recharge = r =>require.ensure([], () => r(require('../page/accountPage/Activities/Recharge')), 'Recharge')
const Withdraw = r =>require.ensure([], () => r(require('../page/accountPage/Activities/Withdraw')), 'Withdraw')

const accountSettingRisk = r =>require.ensure([], () => r(require('../page/accountPage/accountSettingRisk/accountSettingRisk')), 'accountSettingRisk') //风险评估

//登录密码 支付密码
const accountSettingLogin = r =>require.ensure([], () => r(require('../page/accountPage/accountSettingPassword/accountSettingLogin')), 'accountSettingLogin')

const accountSettingPay = r =>require.ensure([], () => r(require('../page/accountPage/accountSettingPassword/accountSettingPay')), 'accountSettingPay')


export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转home页面
        {
            path: '',
            redirect: '/home'
        },
        //首页城市列表页
        {
            path: '/home',
            component: home
        },
        //登录注册页
        {
            path: '/login',
            component: login
        },
         //修改密码页
         {
            path: '/forget',
            component: forget
        },
        // 注册页
        {
            path:"/regist",
            component: regist
        },
        // 投资列表
        {
            path:'/money',
            component:money
        },
        //安全保障
        {
            path:"/about",
            component:about
        },
        //信息披露
        {
            path:"/information",
            component:information
        },
        {
            path: '/money/investment/:id',  //理财-立即投资
            name: 'investment',
            component: investmentPage
        },
        {
            path: '/money/affirm/:id&:money',  //理财-立即投资-确认投资
            name: 'affirm',
            component: affirmInvestment
        },
        {
            path:"/moreList/:type", //更多
            name:"moreList",
            component:moreList
        },
        {
            path: '/InformationDetail',  //文章详情
            name: 'InformationDetail',
            component: InformationDetail
          },
        //我的账户
        {
            path:'/account',
            component:account,
            name:"account",
            redirect: '/account/accountDetail',
            children: [
                {
                    path:'/account/accountDetail',  // 账户详情
                    component:accoutDetails
                },
                {
                    path:"/account/accountInvest", //投资记录
                    component:AccountInvest
                },{
                    path:"/account/ourUanme", //优惠券
                    component:OurUanme
                },{
                    path:"/account/moneyRecord",
                    component:MoneyRecord
                },{
                    path:"/account/accountSettingCard",
                    component:accountSettingCard
                },{
                    path:"/account/accountSetting",
                    component:accountSetting
                },{
                    path:'/account/rechargeRecord',     //充值记录
                    name:"Recharge",
                    component:Recharge,
                },{
                    path:'/account/withdrawRecord',     //提现记录
                    component:Withdraw,
                },{
                    path: '/account/accountSettingRisk',  //账号设置-风险评估
                    component: accountSettingRisk,
                }, {
                    path: '/account/accountSettingLogin',  //账号设置-登录密码
                    component: accountSettingLogin,
                },{
                    path: '/account/accountSettingPay',  //账号设置-支付密码
                    name:"accountSettingPay",
                    component: accountSettingPay,
                },
            ]
        },
    ]   
}]
