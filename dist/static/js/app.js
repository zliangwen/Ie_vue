webpackJsonp([25,23],{0:function(t,e,n){n(316),t.exports=n(313)},25:function(t,e,n){"use strict";function o(t){return"[object Array]"===S.call(t)}function r(t){return"[object ArrayBuffer]"===S.call(t)}function i(t){return"undefined"!=typeof FormData&&t instanceof FormData}function c(t){var e;return e="undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(t):t&&t.buffer&&t.buffer instanceof ArrayBuffer}function a(t){return"string"==typeof t}function s(t){return"number"==typeof t}function u(t){return"undefined"==typeof t}function f(t){return null!==t&&"object"==typeof t}function l(t){return"[object Date]"===S.call(t)}function d(t){return"[object File]"===S.call(t)}function p(t){return"[object Blob]"===S.call(t)}function m(t){return"[object Function]"===S.call(t)}function h(t){return f(t)&&m(t.pipe)}function v(t){return"undefined"!=typeof URLSearchParams&&t instanceof URLSearchParams}function g(t){return t.replace(/^\s*/,"").replace(/\s*$/,"")}function y(){return"undefined"!=typeof window&&"undefined"!=typeof document&&"function"==typeof document.createElement}function b(t,e){if(null!==t&&"undefined"!=typeof t)if("object"==typeof t||o(t)||(t=[t]),o(t))for(var n=0,r=t.length;n<r;n++)e.call(null,t[n],n,t);else for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&e.call(null,t[i],i,t)}function w(){function t(t,n){"object"==typeof e[n]&&"object"==typeof t?e[n]=w(e[n],t):e[n]=t}for(var e={},n=0,o=arguments.length;n<o;n++)b(arguments[n],t);return e}function C(t,e,n){return b(e,function(e,o){n&&"function"==typeof e?t[o]=A(e,n):t[o]=e}),t}var A=n(178),S=Object.prototype.toString;t.exports={isArray:o,isArrayBuffer:r,isFormData:i,isArrayBufferView:c,isString:a,isNumber:s,isObject:f,isUndefined:u,isDate:l,isFile:d,isBlob:p,isFunction:m,isStream:h,isURLSearchParams:v,isStandardBrowserEnv:y,forEach:b,merge:w,extend:C,trim:g}},109:function(t,e,n){(function(e){"use strict";function o(t,e){!i.isUndefined(t)&&i.isUndefined(t["Content-Type"])&&(t["Content-Type"]=e)}function r(){var t;return"undefined"!=typeof XMLHttpRequest?t=n(174):"undefined"!=typeof e&&(t=n(174)),t}var i=n(25),c=n(258),a=/^\)\]\}',?\n/,s={"Content-Type":"application/x-www-form-urlencoded"},u={adapter:r(),transformRequest:[function(t,e){return c(e,"Content-Type"),i.isFormData(t)||i.isArrayBuffer(t)||i.isStream(t)||i.isFile(t)||i.isBlob(t)?t:i.isArrayBufferView(t)?t.buffer:i.isURLSearchParams(t)?(o(e,"application/x-www-form-urlencoded;charset=utf-8"),t.toString()):i.isObject(t)?(o(e,"application/json;charset=utf-8"),JSON.stringify(t)):t}],transformResponse:[function(t){if("string"==typeof t){t=t.replace(a,"");try{t=JSON.parse(t)}catch(t){}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(t){return t>=200&&t<300}};u.headers={common:{Accept:"application/json, text/plain, */*"}},i.forEach(["delete","get","head"],function(t){u.headers[t]={}}),i.forEach(["post","put","patch"],function(t){u.headers[t]=i.merge(s)}),t.exports=u}).call(e,n(241))},170:function(t,e,n){t.exports=n.p+"static/img/app.png"},174:function(t,e,n){"use strict";var o=n(25),r=n(250),i=n(253),c=n(259),a=n(257),s=n(177),u="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||n(252);t.exports=function(t){return new Promise(function(e,f){var l=t.data,d=t.headers;o.isFormData(l)&&delete d["Content-Type"];var p=new XMLHttpRequest,m="onreadystatechange",h=!1;if("undefined"==typeof window||!window.XDomainRequest||"withCredentials"in p||a(t.url)||(p=new window.XDomainRequest,m="onload",h=!0,p.onprogress=function(){},p.ontimeout=function(){}),t.auth){var v=t.auth.username||"",g=t.auth.password||"";d.Authorization="Basic "+u(v+":"+g)}if(p.open(t.method.toUpperCase(),i(t.url,t.params,t.paramsSerializer),!0),p.timeout=t.timeout,p[m]=function(){if(p&&(4===p.readyState||h)&&(0!==p.status||p.responseURL&&0===p.responseURL.indexOf("file:"))){var n="getAllResponseHeaders"in p?c(p.getAllResponseHeaders()):null,o=t.responseType&&"text"!==t.responseType?p.response:p.responseText,i={data:o,status:1223===p.status?204:p.status,statusText:1223===p.status?"No Content":p.statusText,headers:n,config:t,request:p};r(e,f,i),p=null}},p.onerror=function(){f(s("Network Error",t)),p=null},p.ontimeout=function(){f(s("timeout of "+t.timeout+"ms exceeded",t,"ECONNABORTED")),p=null},o.isStandardBrowserEnv()){var y=n(255),b=(t.withCredentials||a(t.url))&&t.xsrfCookieName?y.read(t.xsrfCookieName):void 0;b&&(d[t.xsrfHeaderName]=b)}if("setRequestHeader"in p&&o.forEach(d,function(t,e){"undefined"==typeof l&&"content-type"===e.toLowerCase()?delete d[e]:p.setRequestHeader(e,t)}),t.withCredentials&&(p.withCredentials=!0),t.responseType)try{p.responseType=t.responseType}catch(t){if("json"!==p.responseType)throw t}"function"==typeof t.onDownloadProgress&&p.addEventListener("progress",t.onDownloadProgress),"function"==typeof t.onUploadProgress&&p.upload&&p.upload.addEventListener("progress",t.onUploadProgress),t.cancelToken&&t.cancelToken.promise.then(function(t){p&&(p.abort(),f(t),p=null)}),void 0===l&&(l=null),p.send(l)})}},175:function(t,e){"use strict";function n(t){this.message=t}n.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},n.prototype.__CANCEL__=!0,t.exports=n},176:function(t,e){"use strict";t.exports=function(t){return!(!t||!t.__CANCEL__)}},177:function(t,e,n){"use strict";var o=n(249);t.exports=function(t,e,n,r){var i=new Error(t);return o(i,e,n,r)}},178:function(t,e){"use strict";t.exports=function(t,e){return function(){for(var n=new Array(arguments.length),o=0;o<n.length;o++)n[o]=arguments[o];return t.apply(e,n)}}},240:function(t,e){},243:function(t,e,n){t.exports=n(244)},244:function(t,e,n){"use strict";function o(t){var e=new c(t),n=i(c.prototype.request,e);return r.extend(n,c.prototype,e),r.extend(n,e),n}var r=n(25),i=n(178),c=n(246),a=n(109),s=o(a);s.Axios=c,s.create=function(t){return o(r.merge(a,t))},s.Cancel=n(175),s.CancelToken=n(245),s.isCancel=n(176),s.all=function(t){return Promise.all(t)},s.spread=n(260),t.exports=s,t.exports.default=s},245:function(t,e,n){"use strict";function o(t){if("function"!=typeof t)throw new TypeError("executor must be a function.");var e;this.promise=new Promise(function(t){e=t});var n=this;t(function(t){n.reason||(n.reason=new r(t),e(n.reason))})}var r=n(175);o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.source=function(){var t,e=new o(function(e){t=e});return{token:e,cancel:t}},t.exports=o},246:function(t,e,n){"use strict";function o(t){this.defaults=t,this.interceptors={request:new c,response:new c}}var r=n(109),i=n(25),c=n(247),a=n(248),s=n(256),u=n(254);o.prototype.request=function(t){"string"==typeof t&&(t=i.merge({url:arguments[0]},arguments[1])),t=i.merge(r,this.defaults,{method:"get"},t),t.baseURL&&!s(t.url)&&(t.url=u(t.baseURL,t.url));var e=[a,void 0],n=Promise.resolve(t);for(this.interceptors.request.forEach(function(t){e.unshift(t.fulfilled,t.rejected)}),this.interceptors.response.forEach(function(t){e.push(t.fulfilled,t.rejected)});e.length;)n=n.then(e.shift(),e.shift());return n},i.forEach(["delete","get","head"],function(t){o.prototype[t]=function(e,n){return this.request(i.merge(n||{},{method:t,url:e}))}}),i.forEach(["post","put","patch"],function(t){o.prototype[t]=function(e,n,o){return this.request(i.merge(o||{},{method:t,url:e,data:n}))}}),t.exports=o},247:function(t,e,n){"use strict";function o(){this.handlers=[]}var r=n(25);o.prototype.use=function(t,e){return this.handlers.push({fulfilled:t,rejected:e}),this.handlers.length-1},o.prototype.eject=function(t){this.handlers[t]&&(this.handlers[t]=null)},o.prototype.forEach=function(t){r.forEach(this.handlers,function(e){null!==e&&t(e)})},t.exports=o},248:function(t,e,n){"use strict";function o(t){t.cancelToken&&t.cancelToken.throwIfRequested()}var r=n(25),i=n(251),c=n(176),a=n(109);t.exports=function(t){o(t),t.headers=t.headers||{},t.data=i(t.data,t.headers,t.transformRequest),t.headers=r.merge(t.headers.common||{},t.headers[t.method]||{},t.headers||{}),r.forEach(["delete","get","head","post","put","patch","common"],function(e){delete t.headers[e]});var e=t.adapter||a.adapter;return e(t).then(function(e){return o(t),e.data=i(e.data,e.headers,t.transformResponse),e},function(e){return c(e)||(o(t),e&&e.response&&(e.response.data=i(e.response.data,e.response.headers,t.transformResponse))),Promise.reject(e)})}},249:function(t,e){"use strict";t.exports=function(t,e,n,o){return t.config=e,n&&(t.code=n),t.response=o,t}},250:function(t,e,n){"use strict";var o=n(177);t.exports=function(t,e,n){var r=n.config.validateStatus;n.status&&r&&!r(n.status)?e(o("Request failed with status code "+n.status,n.config,null,n)):t(n)}},251:function(t,e,n){"use strict";var o=n(25);t.exports=function(t,e,n){return o.forEach(n,function(n){t=n(t,e)}),t}},252:function(t,e){"use strict";function n(){this.message="String contains an invalid character"}function o(t){for(var e,o,i=String(t),c="",a=0,s=r;i.charAt(0|a)||(s="=",a%1);c+=s.charAt(63&e>>8-a%1*8)){if(o=i.charCodeAt(a+=.75),o>255)throw new n;e=e<<8|o}return c}var r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";n.prototype=new Error,n.prototype.code=5,n.prototype.name="InvalidCharacterError",t.exports=o},253:function(t,e,n){"use strict";function o(t){return encodeURIComponent(t).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var r=n(25);t.exports=function(t,e,n){if(!e)return t;var i;if(n)i=n(e);else if(r.isURLSearchParams(e))i=e.toString();else{var c=[];r.forEach(e,function(t,e){null!==t&&"undefined"!=typeof t&&(r.isArray(t)&&(e+="[]"),r.isArray(t)||(t=[t]),r.forEach(t,function(t){r.isDate(t)?t=t.toISOString():r.isObject(t)&&(t=JSON.stringify(t)),c.push(o(e)+"="+o(t))}))}),i=c.join("&")}return i&&(t+=(t.indexOf("?")===-1?"?":"&")+i),t}},254:function(t,e){"use strict";t.exports=function(t,e){return t.replace(/\/+$/,"")+"/"+e.replace(/^\/+/,"")}},255:function(t,e,n){"use strict";var o=n(25);t.exports=o.isStandardBrowserEnv()?function(){return{write:function(t,e,n,r,i,c){var a=[];a.push(t+"="+encodeURIComponent(e)),o.isNumber(n)&&a.push("expires="+new Date(n).toGMTString()),o.isString(r)&&a.push("path="+r),o.isString(i)&&a.push("domain="+i),c===!0&&a.push("secure"),document.cookie=a.join("; ")},read:function(t){var e=document.cookie.match(new RegExp("(^|;\\s*)("+t+")=([^;]*)"));return e?decodeURIComponent(e[3]):null},remove:function(t){this.write(t,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}()},256:function(t,e){"use strict";t.exports=function(t){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(t)}},257:function(t,e,n){"use strict";var o=n(25);t.exports=o.isStandardBrowserEnv()?function(){function t(t){var e=t;return n&&(r.setAttribute("href",e),e=r.href),r.setAttribute("href",e),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:"/"===r.pathname.charAt(0)?r.pathname:"/"+r.pathname}}var e,n=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a");return e=t(window.location.href),function(n){var r=o.isString(n)?t(n):n;return r.protocol===e.protocol&&r.host===e.host}}():function(){return function(){return!0}}()},258:function(t,e,n){"use strict";var o=n(25);t.exports=function(t,e){o.forEach(t,function(n,o){o!==e&&o.toUpperCase()===e.toUpperCase()&&(t[e]=n,delete t[o])})}},259:function(t,e,n){"use strict";var o=n(25);t.exports=function(t){var e,n,r,i={};return t?(o.forEach(t.split("\n"),function(t){r=t.indexOf(":"),e=o.trim(t.substr(0,r)).toLowerCase(),n=o.trim(t.substr(r+1)),e&&(i[e]=i[e]?i[e]+", "+n:n)}),i):i}},260:function(t,e){"use strict";t.exports=function(t){return function(e){return t.apply(null,e)}}},284:function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),n(240);var r=n(713),i=o(r),c=n(710),a=o(c),s=n(712),u=o(s);!function(t){var e=t.navigator.userAgent.toLowerCase();if(e.match(/msie\s\d+/)&&e.match(/msie\s\d+/)[0]||e.match(/trident\s?\d+/)&&e.match(/trident\s?\d+/)[0]){var n=e.match(/msie\s\d+/)[0].match(/\d+/)[0]||e.match(/trident\s?\d+/)[0];if(n<=9){var o="你的浏览器版本太low了,已经和时代脱轨了,请使用ie10以上浏览器 :(",r="推荐使用:<a href='https://www.baidu.com/s?ie=UTF-8&wd=%E8%B0%B7%E6%AD%8C%E6%B5%8F%E8%A7%88%E5%99%A8' target='_blank' style='color:blue;'>谷歌</a>,<a href='https://www.baidu.com/s?ie=UTF-8&wd=%E7%81%AB%E7%8B%90%E6%B5%8F%E8%A7%88%E5%99%A8' target='_blank' style='color:blue;'>火狐</a>,其他双核极速模式";document.writeln("<pre style='text-align:center;color:#fff;background-color:#0cc;font-size:20px; height:100%;border:0;position:fixed;top:0;left:0;width:100%;z-index:1234'><h2 style='padding-top:200px;margin:0'><strong>"+o+"<br/></strong></h2><h2>"+r+"</h2><h2 style='margin:0;font-size:20px'><strong>如果你的使用的是双核浏览器,请切换到极速模式访问<br/></strong></h2></pre>"),document.execCommand("Stop")}}}(window),e.default={components:{mHeader:i.default,mNav:a.default,mFooter:u.default}}},285:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{}},computed:{active:function(){return this.$store.state.active}},watch:{$route:"getPath"},methods:{route:function(t,e){sessionStorage.setItem("active",e),this.$store.commit("changeActive",e),this.$router.push(t)},getPath:function(){var t=this.$route.path;switch(t.indexOf("/account")!==-1&&(t="/account"),t){case"/home":this.$store.commit("changeActive",1);break;case"/money":this.$store.commit("changeActive",2);break;case"/about":this.$store.commit("changeActive",3);break;case"/information":this.$store.commit("changeActive",4);break;case"/account":this.$store.commit("changeActive",5)}}},mounted:function(){var t=sessionStorage.getItem("active")||1;this.$store.commit("changeActive",t)}}},287:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{list:[{name:"投资列表",target:"/money"},{name:"官方公告",target:"/information"},{name:"安全保障",target:"/about"},{name:"关于我们",target:"/information"}]}},methods:{route:function(t,e){this.$store.commit("changeActive",e),this.$router.push(t)},routeWithCode:function(t,e){this.$store.commit("changeActive",e),this.$router.push(t)}}}},288:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{latestData:[],mobile:""}},computed:{isLogin:function(){return this.$store.state.isLogin},optionHead:function(){return{limitMoveNum:2,singleHeight:20,waitTime:2e3}},mobileAction:function(){return this.$store.state.mobile}},methods:{route:function(t,e){this.$store.commit("changeActive",e),this.$router.push(t)},routeWithCode:function(t,e){this.$store.commit("changeActive",e),this.$router.push(t)},logout:function(){var t=this,e=this;e.service({url:"/user/logout.json",method:"post",data:{device:e.device,token:sessionStorage.getItem("accesstoken")}}).then(function(e){200==e.code&&(t.$message({message:"退出成功",type:"success",showClose:!0,duration:3e3}),sessionStorage.removeItem("accesstoken"),setTimeout(function(){t.$store.commit("isLogout"),t.$store.commit("changeActive",1),t.$router.push("/home")},50))}).catch(function(t){})},onlyOne:function(){var t=this;checkLogin().then(function(e){e.state||(sessionStorage.removeItem("accesstoken"),t.$message({message:e.msg,type:"warning"}),setTimeout(function(){t.$store.commit("isLogout"),t.$store.commit("changeActive",5),t.$router.push("/login")},2e3))})},getUserInfo:function(){var t=this;t.service({url:"/user/index.json",method:"post",data:{device:t.device}}).then(function(e){200==e.code&&(t.mobile=e.data.user.mobile)})},initData:function(){this.getLatest()}},filters:{subStringPhone:function(t){if(""!=t||null!=t)return t.substring(0,3)+"****"+t.substring(7,t.length)}},mounted:function(){var t=sessionStorage.getItem("accesstoken");t&&(this.$store.commit("isLogin"),this.getUserInfo())}}},311:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n="http://api.maimailc.com/joy/pc",o="hash",r="";e.baseUrl=n,e.routerMode=o,e.imgBaseUrl=r},312:function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.animate=e.showBack=e.loadMore=e.getStyle=e.removeStore=e.getStore=e.setStore=void 0;var r=n(318),i=o(r),c=n(14),a=o(c),s=(e.setStore=function(t,e){t&&("string"!=typeof e&&(e=(0,a.default)(e)),window.localStorage.setItem(t,e))},e.getStore=function(t){if(t)return window.localStorage.getItem(t)},e.removeStore=function(t){t&&window.localStorage.removeItem(t)},e.getStyle=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"int",o=void 0;return o="scrollTop"===e?t.scrollTop:t.currentStyle?t.currentStyle[e]:document.defaultView.getComputedStyle(t,null)[e],"float"==n?parseFloat(o):parseInt(o)});e.loadMore=function t(e,n){var o=window.screen.height,r=void 0,i=void 0,c=void 0,a=void 0,u=void 0,f=void 0;document.body.addEventListener("scroll",function(){t()},!1),e.addEventListener("touchstart",function(){r=e.offsetHeight,i=e.offsetTop,c=s(e,"paddingBottom"),a=s(e,"marginBottom")},{passive:!0}),e.addEventListener("touchmove",function(){t()},{passive:!0}),e.addEventListener("touchend",function(){f=document.body.scrollTop,l()},{passive:!0});var l=function n(){u=requestAnimationFrame(function(){document.body.scrollTop!=f?(f=document.body.scrollTop,t(),n()):(cancelAnimationFrame(u),r=e.offsetHeight,t())})},t=function(){document.body.scrollTop+o>=r+i+c+a&&n()}},e.showBack=function(t){var e=void 0,n=void 0;document.addEventListener("scroll",function(){r()},!1),document.addEventListener("touchstart",function(){r()},{passive:!0}),document.addEventListener("touchmove",function(){r()},{passive:!0}),document.addEventListener("touchend",function(){n=document.body.scrollTop,o()},{passive:!0});var o=function t(){e=requestAnimationFrame(function(){document.body.scrollTop!=n?(n=document.body.scrollTop,t()):cancelAnimationFrame(e),r()})},r=function(){t(document.body.scrollTop>500?!0:!1)}},e.animate=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:400,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"ease-out",r=arguments[4];clearInterval(t.timer),n instanceof Function?(r=n,n=400):n instanceof String&&(o=n,n=400),o instanceof Function&&(r=o,o="ease-out");var c=function(e){return"opacity"===e?Math.round(100*s(t,e,"float")):s(t,e)},a=parseFloat(document.documentElement.style.fontSize),u={},f={};(0,i.default)(e).forEach(function(t){/[^\d^\.]+/gi.test(e[t])?u[t]=e[t].match(/[^\d^\.]+/gi)[0]||"px":u[t]="px",f[t]=c(t)}),(0,i.default)(e).forEach(function(t){"rem"==u[t]?e[t]=Math.ceil(parseInt(e[t])*a):e[t]=parseInt(e[t])});var l=!0,d={};t.timer=setInterval(function(){(0,i.default)(e).forEach(function(i){var a=0,s=!1,u=c(i)||0,p=0,m=void 0;switch(o){case"ease-out":p=u,m=5*n/400;break;case"linear":p=f[i],m=20*n/400;break;case"ease-in":var h=d[i]||0;a=h+(e[i]-f[i])/n,d[i]=a;break;default:p=u,m=5*n/400}switch("ease-in"!==o&&(a=(e[i]-p)/m,a=a>0?Math.ceil(a):Math.floor(a)),o){case"ease-out":s=u!=e[i];break;case"linear":s=Math.abs(Math.abs(u)-Math.abs(e[i]))>Math.abs(a);break;case"ease-in":s=Math.abs(Math.abs(u)-Math.abs(e[i]))>Math.abs(a);break;default:s=u!=e[i]}s?(l=!1,"opacity"===i?(t.style.filter="alpha(opacity:"+(u+a)+")",t.style.opacity=(u+a)/100):"scrollTop"===i?t.scrollTop=u+a:t.style[i]=u+a+"px"):l=!0,l&&(clearInterval(t.timer),r&&r())})},20)}},313:function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}var r=n(319),i=o(r),c=n(24),a=o(c),s=n(763),u=o(s),f=n(314),l=o(f),d=n(602),p=o(d);n(617);var m=n(708),h=o(m),v=n(315),g=o(v),y=n(243),b=o(y),w=n(311),C=n(656),A=o(C);n(312);"addEventListener"in document&&document.addEventListener("DOMContentLoaded",function(){A.default.attach(document.body)},!1),a.default.use(p.default,{size:"small",zIndex:3e3}),a.default.use(h.default,{ak:"3LSLowZfboxmgGCO89H1xwdTOCkwgEGt"});var S=b.default.create({baseURL:w.baseUrl,timeout:15e3});S.interceptors.request.use(function(t){return console.log(sessionStorage.getItem("accesstoken")),sessionStorage.getItem("accesstoken")&&(t.headers["X-Auth-Token"]=sessionStorage.getItem("accesstoken")),t},function(t){console.log(t),i.default.reject(t)}),S.interceptors.response.use(function(t){var e=t.data;return 0!=e.code&&e.code&&(9900==e.code||50012==e.code||50014==e.code)?(location.reload(),sessionStorage.removeItem("accesstoken"),setTimeout(function(){Message({message:"请重新登录",type:"error",showClose:!0,duration:0}),this.$router.push("/login")},500),e):e},function(t){console.log("err"+t)}),a.default.prototype.service=S;var x=4,E=2;a.default.prototype.device=x,a.default.prototype.channel=E,a.default.use(u.default);var R=new u.default({routes:l.default,mode:w.routerMode,strict:!1,scrollBehavior:function(t,e,n){return n?n:(e.meta.keepAlive&&(e.meta.savedPosition=document.body.scrollTop),{x:0,y:t.meta.savedPosition||0})}});new a.default({router:R,store:g.default}).$mount("#app")},314:function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(709),i=o(r),c=function(t){return n.e(0,function(){return t(n(728))})},a=function(t){return n.e(14,function(){return t(n(727))})},s=function(t){return n.e(12,function(){return t(n(731))})},u=function(t){return n.e(10,function(){return t(n(172))})},f=function(t){return n.e(4,function(){return t(n(732))})},l=function(t){return n.e(8,function(){return t(n(714))})},d=function(t){return n.e(3,function(){return t(n(729))})},p=function(t){return n.e(18,function(){return t(n(719))})},m=function(t){return n.e(9,function(){return t(n(720))})},h=function(t){return n.e(13,function(){return t(n(730))})},v=function(t){return n.e(7,function(){return t(n(735))})},g=function(t){return n.e(17,function(){return t(n(721))})},y=function(t){return n.e(21,function(){return t(n(716))})},b=function(t){return n.e(22,function(){return t(n(715))})},w=function(t){return n.e(5,function(){return t(n(734))})},C=function(t){return n.e(2,function(){return t(n(733))})},A=function(t){return n.e(1,function(){return t(n(722))})},S=function(t){return n.e(6,function(){return t(n(726))})},x=function(t){return n.e(20,function(){return t(n(717))})},E=function(t){return n.e(19,function(){return t(n(718))})},R=function(t){return n.e(11,function(){return t(n(725))})},k=function(t){return n.e(16,function(){return t(n(723))})},U=function(t){return n.e(15,function(){return t(n(724))})};e.default=[{path:"/",component:i.default,children:[{path:"",redirect:"/home"},{path:"/home",component:c},{path:"/login",component:s},{path:"/forget",component:a},{path:"/regist",component:u},{path:"/money",component:f},{path:"/about",component:l},{path:"/information",component:d},{path:"/money/investment/:id",name:"investment",component:w},{path:"/money/affirm/:id&:money",name:"affirm",component:C},{path:"/moreList/:type",name:"moreList",component:v},{path:"/InformationDetail",name:"InformationDetail",component:h},{path:"/account",component:p,name:"account",redirect:"/account/accountDetail",children:[{path:"/account/accountDetail",component:m},{path:"/account/accountInvest",component:g},{path:"/account/ourUanme",component:y},{path:"/account/moneyRecord",component:b},{path:"/account/accountSettingCard",component:A},{path:"/account/accountSetting",component:S},{path:"/account/rechargeRecord",name:"Recharge",component:x},{path:"/account/withdrawRecord",component:E},{path:"/account/accountSettingRisk",component:R},{path:"/account/accountSettingLogin",component:k},{path:"/account/accountSettingPay",name:"accountSettingPay",component:U}]}]}]},315:function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(24),i=o(r),c=n(764),a=o(c);i.default.use(a.default);var s={isLogin:!1,active:1,mobile:""},u={isLogin:function(t){return t.isLogin=!0},isLogout:function(t){return t.isLogin=!1},changeActive:function(t,e){return t.active=e},mobile:function(t,e){return t.mobile=e}};e.default=new a.default.Store({state:s,mutations:u})},617:function(t,e){},625:function(t,e){},631:function(t,e){},632:function(t,e){},653:function(t,e){},691:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJUAAAA7CAYAAABytMjRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkUzMUVCQUM0Q0I4QzExRThCNjUzQUQ0MUZCNEMzMDU1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkUzMUVCQUM1Q0I4QzExRThCNjUzQUQ0MUZCNEMzMDU1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTMxRUJBQzJDQjhDMTFFOEI2NTNBRDQxRkI0QzMwNTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTMxRUJBQzNDQjhDMTFFOEI2NTNBRDQxRkI0QzMwNTUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5MJDUaAAAIB0lEQVR42uwd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"},709:function(t,e,n){n(632);var o=n(5)(n(284),n(745),null,null);t.exports=o.exports},710:function(t,e,n){n(653);var o=n(5)(n(285),n(760),"data-v-cd9e311e",null);t.exports=o.exports},712:function(t,e,n){n(631);var o=n(5)(n(287),n(744),"data-v-3b0acca9",null);t.exports=o.exports},713:function(t,e,n){n(625);var o=n(5)(n(288),n(740),"data-v-2601d869",null);t.exports=o.exports},740:function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"header"}},[t.isLogin?t._e():n("div",{staticClass:"content"},[n("div",{staticClass:"menu"},[n("ul",{staticClass:"menu-list"},[t._m(0),t._v(" "),n("li",{on:{click:function(e){t.route("/login",5)}}},[t._v("您好,请登录")]),t._v(" "),n("li",{staticStyle:{color:"#f22e3b"},on:{click:function(e){t.route("/regist",5)}}},[t._v("立即注册")])])])]),t._v(" "),t.isLogin?n("div",{staticClass:"content"},[n("div",{staticClass:"menu"},[n("ul",{staticClass:"menu-list"},[t._m(1),t._v(" "),""!=t.mobileAction?n("li",[t._v("您好,"+t._s(t.mobileAction))]):t._e(),t._v(" "),""==t.mobileAction?n("li",[t._v("您好,"+t._s(t.mobile))]):t._e(),t._v(" "),n("li",{staticStyle:{color:"#f22e3b"},on:{click:t.logout}},[t._v("退出")])])])]):t._e()])},staticRenderFns:[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("li",[o("i",{staticClass:"icon1"}),t._v(" "),o("span",{},[t._v("手机客户端下载\n             "),o("img",{attrs:{src:n(170),alt:""}})])])},function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("li",[o("i",{staticClass:"icon1"}),t._v(" "),o("span",{},[t._v("手机客户端下载\n             "),o("img",{attrs:{src:n(170),alt:""}})])])}]}},744:function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"footer"}},[n("div",{staticClass:"content"},[t._m(0),t._v(" "),n("div",{staticClass:"foot-center"},[n("ul",{staticClass:"clearfix"},[n("li",{on:{click:function(e){t.routeWithCode({path:"/money"})}}},[t._v("投资列表")]),t._v(" "),n("li",{on:{click:function(e){t.routeWithCode({path:"/information",query:{state:4}},4)}}},[t._v("官方公告")]),t._v(" "),n("li",{on:{click:function(e){t.routeWithCode({path:"/about"})}}},[t._v("安全保障")]),t._v(" "),n("li",{on:{click:function(e){t.routeWithCode({path:"/information",query:{state:6}},4)}}},[t._v("关于我们")])]),t._v(" "),n("p",{staticClass:"p3"},[t._v("备案号©粤ICP备17163290号-1")]),t._v(" "),n("p",[t._v("版权所有©深圳前海集萃汇互联网金融服务有限公司")])]),t._v(" "),t._m(1)])])},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"foot-msg"},[n("p",{staticClass:"p1"},[t._v("客服热线")]),t._v(" "),n("h1",[t._v("400-006-2140")]),t._v(" "),n("p",{staticClass:"p2"},[t._v("工作时间：9:00-18:00")])])},function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"footer-right"},[o("img",{attrs:{src:n(170)}}),t._v(" "),o("p",[t._v("移动客户端")])])}]}},745:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"head"},[n("m-header"),t._v(" "),n("m-nav")],1),t._v(" "),n("div",{staticClass:"main"},[n("router-view")],1),t._v(" "),n("div",{staticClass:"foot"},[n("m-footer")],1)])},staticRenderFns:[]}},760:function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"nav"}},[n("div",{staticClass:"content"},[t._m(0),t._v(" "),n("ul",{staticClass:"menu",staticStyle:{"font-size":"15px"}},[n("li",{class:{"is-selected":1==t.active},on:{click:function(e){t.route("/home",1)}}},[t._v("首页")]),t._v(" "),n("li",{class:{"is-selected":2==t.active},on:{click:function(e){t.route("/money",2);
}}},[t._v("投资")]),t._v(" "),n("li",{class:{"is-selected":3==t.active},on:{click:function(e){t.route("/about",3)}}},[t._v("安全保障")]),t._v(" "),n("li",{class:{"is-selected":4==t.active},on:{click:function(e){t.route("/information",4)}}},[t._v("信息披露")]),t._v(" "),n("li",{class:{"is-selected":5==t.active},on:{click:function(e){t.route("/account",5)}}},[t._v("我的账户")])])])])},staticRenderFns:[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"logo"},[o("img",{attrs:{src:n(691),alt:""}})])}]}}});