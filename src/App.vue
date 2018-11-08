<template>
	<div>
		<div class="head">
			<m-header></m-header>
			<m-nav></m-nav>
		</div>
		<div class="main">
			<router-view/>
		</div>
		<div class="foot">
			<m-footer></m-footer>
		</div>	
    </div>
</template>

<script>
(function(window) {
			var theUA = window.navigator.userAgent.toLowerCase();
			if ((theUA.match(/msie\s\d+/) && theUA.match(/msie\s\d+/)[0]) || (theUA.match(/trident\s?\d+/) && theUA.match(/trident\s?\d+/)[0])) {
				var ieVersion = theUA.match(/msie\s\d+/)[0].match(/\d+/)[0] || theUA.match(/trident\s?\d+/)[0];
				if (ieVersion <= 9) {
					var str = "你的浏览器版本太low了,已经和时代脱轨了,请使用ie10以上浏览器 :(";
					var str2 = "推荐使用:<a href='https://www.baidu.com/s?ie=UTF-8&wd=%E8%B0%B7%E6%AD%8C%E6%B5%8F%E8%A7%88%E5%99%A8' target='_blank' style='color:blue;'>谷歌</a>,"
							+ "<a href='https://www.baidu.com/s?ie=UTF-8&wd=%E7%81%AB%E7%8B%90%E6%B5%8F%E8%A7%88%E5%99%A8' target='_blank' style='color:blue;'>火狐</a>,"
							+ "其他双核极速模式";
					document.writeln("<pre style='text-align:center;color:#fff;background-color:#0cc;font-size:20px; height:100%;border:0;position:fixed;top:0;left:0;width:100%;z-index:1234'>" +
							"<h2 style='padding-top:200px;margin:0'><strong>" + str + "<br/></strong></h2><h2>" +
							str2 + "</h2><h2 style='margin:0;font-size:20px'><strong>如果你的使用的是双核浏览器,请切换到极速模式访问<br/></strong></h2></pre>");
					document.execCommand("Stop");
				};
			}
})(window);
  	import './assets/reset.css'
	// import svgIcon from './components/common/svg';
	import mHeader from './components/header/Header'
  	import mNav from './components/Nav/Nav' 
  	import mFooter from './components/footer/Footer' 
  	export default {
    	components:{
			mHeader,
			mNav,
			mFooter
        },
  	}

</script>

<style lang="scss">
  	@import './style/common';
	.router-fade-enter-active, .router-fade-leave-active {
	  	transition: opacity .3s;
	}
	.router-fade-enter, .router-fade-leave-active {
	  	opacity: 0;
	}
</style>
