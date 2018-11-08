import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import BaiduMap from 'vue-baidu-map'

import store from './store/'
import axios from 'axios'
import {routerMode} from './config/env'
import FastClick from 'fastclick'
import {setStore, getStore} from './config/mUtils'

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
Vue.use(BaiduMap, {
  ak: '3LSLowZfboxmgGCO89H1xwdTOCkwgEGt'  //这个地方是官方提供的ak密钥
})
import { 
	baseUrl 
} from './config/env'

//注册全局的sevice请求
// 创建axios实例
const service = axios.create({
  baseURL: baseUrl, // api的base_url
  timeout: 15000, 				// 请求超时时间
});

//service.defaults.withCredentials = true  //请求开启cookie
// request拦截器
service.interceptors.request.use(config => {
  //console.log($.isEmptyObject(_g.useSessions()))  //判断对象是否为空
  console.log(sessionStorage.getItem('accesstoken'))
   if (sessionStorage.getItem('accesstoken')) {
     config.headers['X-Auth-Token'] = sessionStorage.getItem('accesstoken') // 让每个请求携带自定义token 请根据实际情况自行修改
   }
  return config
}, error => {
  console.log(error) // for debug
  Promise.reject(error)
});
  
// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code != 0 && res.code) {
      if (res.code == 9900 || res.code == 50012 || res.code == 50014) {
        location.reload()
           // 为了重新实例化vue-router对象 避免bug
        sessionStorage.removeItem('accesstoken')
       // this.$state.commit('isL')
        setTimeout(function () {
          // this.$store.commit('isLogout') //切换为登出状态
          // this.$store.commit('changeActive',5)
          Message({
            message: '请重新登录',
            type: 'error',
            showClose: true,
            duration: 0
          })
          // this.$store.commit('isLogout') //切换为登出状态
          // this.$store.commit('changeActive',5)
          this.$router.push('/login')
        }, 500);
        return res;
      }else{
        return res
      }
    } else {
      return res;
    }
  },
  error => {
    console.log('err' + error);// for debug
  }
)

Vue.prototype.service = service;   //注册全局service
const device = 4;
const channel = 2
Vue.prototype.device = device ;
Vue.prototype.channel = channel; 

Vue.use(VueRouter)
const router = new VueRouter({
	routes,
	mode: routerMode,
	strict: process.env.NODE_ENV !== 'production',
	scrollBehavior (to, from, savedPosition) {
	    if (savedPosition) {
		    return savedPosition
		} else {
			if (from.meta.keepAlive) {
				from.meta.savedPosition = document.body.scrollTop;
			}
		    return { x: 0, y: to.meta.savedPosition || 0 }
		}
	}
})

new Vue({
	router,
	store,
}).$mount('#app')

