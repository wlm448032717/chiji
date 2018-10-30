<template>
	<div id="IndexWapper" class="clearfix" ref="IndexWapper">
		<div class="indexContent" v-show="showIndex">
			<p class="p_title" @click="move()">游戏推荐</p>
			<div class="swiper-container" id="swiper1">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="(item,index) in bannerList">
						<a :href="item.linkUrl" style="width: 90%;height: auto;">
							<img :src="item.picUrl" />
						</a>
					</div>

				</div>
			</div>
			<div v-for="item in gameList">
				<p class="p_title2">{{item.labelName}}</p>
				<div v-for="(list,index) in item.games" class="clearfix div2"  :class="index+1==item.games.length?'lastList':''" @click="openGame(list.id)">
					<div class="img_content">
						<img :src="list.iconUrl" /><!--iconUrl-->
					</div>
					<div class="div_content">
						<p class="p_title3">{{list.gameName}}</p>
						<p class="p_title4">{{list.shortIntro}}</p>
					</div>
				</div>
			</div>
		</div>
		<footer-tab></footer-tab>
	</div>
</template>

<script>
	import footerTab from '../footer/footer.vue'
	import downGame from '../downGame/downGame.vue'
	import qs from 'qs';
	import BScroll from 'better-scroll'

	export default {
		components: {
			footerTab,
			downGame
		},
		data() {
			return {
				gameInfo: 0,
				showIndex: true,
				gameList: [],
				bannerList: []
			}
		},
		mounted() {
			this._initScroll();
		},

		created() {
			this.getGame();
			this.getbanner();
			 this.$nextTick(() => {
			  	this._initScroll()
			  })
		},
		methods: {
			openGame(index) {
				this.$router.push({
					path: '/downgame',
					query: {
						id: index
					}
				})
			},
			_initScroll() {
				console.log(1111)
				this.scroll=new BScroll(this.$refs.IndexWapper,{click: true,taps: true});
				
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
			getGame() {
				this.$axios.post('v1/api/game/index/list')
					.then(data => {
						this.gameList = data.data.data;
					}).catch(err => {
						console.log(err.msg);
					})
			},
			getbanner() {
				this.$axios.get('/v1/banner/list')
					.then(data => {
						this.bannerList = data.data.data;
						this.$nextTick(() => {
							this.move();
						})
					}).catch(err => {
						console.log(err.msg);
					})
			}
		},
		
	}
</script>

<style>
	#IndexWapper {
		height: 90%;
	}
	
	#swiper1 {
		width: 100%;
	}
	
	#IndexWapper .swiper-slide img {
		display: inline-block;
		border-radius: 0.2rem;
    	margin: 0 0.32rem;
		width: 90%;
		height: 3.0rem;
  		box-shadow:0px 0px 0.2rem 0.01rem rgba(173, 173, 173, .5);  
	}
	
	#IndexWapper .indexContent {
		/*padding: 0.3rem;*/
		
		background: aliceblue;
		background: white;
		/*height: 100%;*/
		margin-bottom: 1rem;
		overflow: auto;
	}
	
	#IndexWapper .game-wrapper {
		display: none;
	}
	
	#IndexWapper .p_title4 {
		font-size: 0.2rem;
		margin-top: 0.2rem;
		color: #ADADAD;
	}
	
	#IndexWapper .div2 {
		/*padding:0.2rem 0.3rem 0.1rem;*/
		margin: 0 0.3rem;
    	padding: 0.25rem 0;	
		border-bottom: 0.02rem solid #F7F7F7 !important;
	}
	::-webkit-scrollbar {
	    display: none;
	}
	
	#IndexWapper .p_title3 {
		font-size: 0.26rem;
	}
	
	#IndexWapper .img_content {
		display: inline-block;
		float: left;
		height: 1.1rem;
	}
	
	#IndexWapper .img_content>img {
		border-radius: 0.2rem;
		width: 1.1rem;
		height: 1.1rem;
	}
	
	#IndexWapper .p_title2 {
		font-size: 0.28rem;
		font-weight: bold;
		padding: 0.3rem 0.3rem 0.1rem 0.3rem
	}
	
	#IndexWapper .p_title {
		font-size: 0.35rem;
		font-weight: bold;
		padding: 0.3rem 0.3rem 0.4rem 0.3rem;
	}
	
	#IndexWapper .div_content {
		float: left;
		margin-left: 0.2rem;
		padding: 0.2rem;
	}
	
	#IndexWapper .lastList{
		border-bottom: none !important;
	}
	
	.clearfix {
		*zoom: 1;
	}
	
	.clearfix:after {
		content: "";
		display: block;
		clear: both;
	}
</style>