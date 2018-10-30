<template>
	<div id="game">
		<div class="g_title clearfix">
			<img src="static/img/nav_return.png" class="nav1" @click="close()">
			<span @click="close()">游戏推荐</span>
		</div>
		<div class="warp clearfix">
			<div class="img_content">
				<img :src="gameInfo.iconUrl" />
			</div>
			<div class="div_content">
				<p class="g_title3">{{gameInfo.gameName}}</p>
				<p class="g_title4">游戏</p>
				<a class="downBtn" @click="downGames()">下载</a>
				<!--:href="gameInfo.downloadUrl"-->
			</div>
		</div>
		<div class="swiper-container" id="swiper2">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="(item,index) in imgList">
					<img :src="item" />
				</div>
			</div>
		</div>
		<div class="Info">
			<p>主要内容</p>
			<span class="textList conent">{{txtShow?fontList.slice(0,60):fontList}}{{txtShow  && fontList.length>60 ?'...':''}}</span>
			<span style="color: #3EC8BA;" class="conent" @click="showTxt()" v-if="fontList.length>60">{{txtShow?'[详情简介]':'[收起]'}}</span>
		</div>
		<div class="Info" style="border: none;">
			<p>信息</p>
			<div class="conent">
				<div>版本：{{gameInfo.versionNumber}}</div>
				<div>大小：{{gameInfo.fileSize}}</div>
				<div>类别：{{gameInfo.typeName}}</div>
				<div>语言：{{gameInfo.language}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isShow: false,
				index: "",
				fontList: "",
				txtShow: true,
				gameInfo: [],
				gameUrl: "",
				imgList: [],
			}
		},
		methods: {
			close() {
				this.$router.push('/index')
			},
			down() {

				this.$axios({
					method: 'get',
					url: '/api/game/detail?id=' + this.index,
					//					data:{id:this.index},
					//headers: {'Content-Type': 'application/json; charset=UTF-8'}
				}).then(data => {
					this.gameInfo = data.data.data;
					this.gameUrl = this.gameInfo.downloadUrl;
					this.imgList = this.gameInfo.screenshots.split(',');
					this.$nextTick(() => {
						this.move();
					})
					if(this.gameInfo.introduce) {
						this.fontList = this.gameInfo.introduce;
					} else {
						this.fontList = "未添加描述";
					}

				}).catch(err => {
					console.log(err.msg);
				})
			},
			showTxt() {
				this.txtShow = !this.txtShow
			},
			move() {
				var mySwiper = new Swiper('.swiper-container', {
					// 如果需要分页器
					pagination: '.swiper-pagination',
					autoplay: 2000, //可选选项，自动滑动
					initialSlide: 0, //初始显示div
					direction: 'horizontal',
					//滑动方向垂直vertical，水平horizontal
					autoplayDisableOnInteraction: false, //用户操作之后是否停止滑动
					loop: true
				})
			},
			downGames() {

				var u = navigator.userAgent;
				var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端 
				var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端 
				if(isAndroid) {
					try {
						//window.H5Object.gameDownload('1', 'http://down2.175pt.com/mogusy/android/youxi/xianji20170712.apk', 'http://img.5ksy.com/GameIcon/2017040718335.png');
					   window.H5Object.gameDownload(JSON.stringify(this.gameInfo));
					} catch(err) {
						console.log(err);
					}
				} else if(isiOS) {
					try {
						window.webkit.messageHandlers.appModel.postMessage(JSON.stringify(this.gameInfo));
					} catch(err) {
						console.log(err);
					}
				}
			},

		},

		mounted() {
			this.index = this.$route.query.id;
			this.down();
		}
	}
</script>

<style>
	#game {
		padding: 0.25rem 0;
	}
	
	#game .g_title>img {
		float: left;
		width: 0.5rem;
		text-align: left;
		height: 0.5rem;
	}
	
	#game .g_title>span {
		float: left;
		display: inline-block;
		font-size: 0.27rem;
		text-align: left;
		font-weight: 600;
	}
	
	#game .g_title {
		line-height: 50%;
	}
	
	.warp {
		position: relative;
		padding: 0.25rem 0.3rem 0rem;
	}
	
	.warp .img_content {
		float: left;
	}
	
	.warp .img_content img {
		border-radius: 0.2rem;
		width: 1.5rem;
		height: 1.5rem;
	}
	
	.warp .div_content {
		float: left;
		margin-left: 0.2rem;
		padding-left: 0.2rem;
		width: 60%;
	}
	
	.warp .div_content .g_title3 {
		font-size: 0.26rem;
		padding: 0.2rem 0 0.2rem 0;
	}
	
	.warp .div_content .g_title4 {
		font-size: 0.23rem;
		color: #bababa;
	}
	
	.warp .div_content .downBtn {
		position: absolute;
		right: 0.4rem;
		bottom: 0.1rem;
		border-radius: 0.12rem;
		text-align: center;
		line-height: 0.55rem;
		width: 1.2rem;
		height: 0.55rem;
		background: #68c5ba;
		font-size: 0.2rem;
		color: white;
		box-shadow: 0 0 0.2rem rgba(0, 204, 204, .5);
	}
	
	.clearfix {
		*zoom: 1;
	}
	
	.clearfix:after {
		content: "";
		display: block;
		clear: both;
	}
	
	#swiper2 {
		width: 100%;
		padding: 0.25rem 0 0;
	}
	
	#game #swiper2 img {
		width: 90%;
		height: 3.2rem;
		padding: 0rem 0.3rem;
	}
	
	.Info {
		font-size: 0.25rem;
		margin: 0.35rem 0.3rem;
		padding-bottom: 0.2rem;
		border-bottom: 0.02rem solid #eeeeee;
	}
	
	.Info>p {
		font-weight: 600;
		padding-bottom: 0.2rem;
		word-wrap: break-word;
	}
	
	.Info .conent {
		font-size: 0.22rem;
		line-height: 0.4rem;
		width: 100%;
		color: #808080;
	}
	
	.Info .textList {
		word-wrap: break-word;
		line-height: 0.1rem;
	}
	
	.Info .textNone {
		display: block;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		height: .0.4rem;
	}
</style>