<template>
	<div id="question">
		<!--<div class="title">
			<img src="static/img/nav_return.png" class="nav" @click="close()">
			<span>常见问题</span>
		</div>-->
		<ul>
			<li v-for="(item,index) in list" :class="{active:index==indexNum}" @click="openList(index)" >
				<span>{{index+1}}. {{item.title}}</span>
				<img src="static/img/list_down.png" class="icon" v-show="index!=indexNum"/>
				<img src="static/img/list_top.png" class="icon" v-show="index==indexNum"/>
				<transition name="fade">
				<div v-show="index==indexNum" style="color: #7e7d7e;">
					{{item.answer}}
				</div>
				</transition>
			</li>
		</ul>
		<div class="footer_center">
			<p>还没有解决您的问题可以联系客服哟</p>
			<div class="qqImg">
				<div><img src="../../../static/img/qq.png" /></div>
				<span>QQ客服</span></div>
			<p style="color: rgb(151,150,151);">www.1234567JSCB9</p>
		</div>
	</div>
	 
</template>
	
<script>
	import footerTab from '../footer/footer.vue'
	export default{
		components: {
		      footerTab,
		   },
		data(){
			return{
				list:[],
				indexNum:-1,
				
			}
		},
		methods:{
			openList(index){
				if( this.indexNum === index){
		          this.indexNum=-1
		          return
				}else{
					this.indexNum=index;
				}
			},
			close(){
				this.$router.push('/index')
			},
			getQuestions(){
				this.$axios.get('/v1/geneal/questions')
				.then(data=>{
					this.list=data.data.data;
				}).catch(err => {
                  console.log(err.msg);
				})
			}
		},
		mounted() {
			this.getQuestions();
		}

	}
</script>
<style>
.fade-enter-active, .fade-leave-active {
  transition: all .25s;
}
.fade-enter, .fade-leave-to {
 	padding: 0;
 	height: 0;
 	opacity: 0;
 	transform: translate3D(0);
}	
#question{
		font-size: 0.2rem;
		/*background: #F6F8F8;*/
		min-height: 100%;
		padding-bottom: 0.3rem;
	}
	#question .title{
		background: white;
		width: 100%;
		font-size: 0.3rem;
		padding: 0.3rem 0;
		text-align: center;
		/*margin-bottom: 0.05rem;*/
	}
	#question ul{
		margin: 0.25rem;
		padding: 0.25rem;
		border-radius: 0.15rem;
		box-shadow:0 0 0.35rem 0.1rem #F2F2F2;
	}
	#question ul>li{
		padding: 0.1rem;
		background: white;
		font-size: 0.26rem;
		/*margin-bottom: 0.05rem;*/
	}
	#question .active{
	}
	#question li>div{
		padding: 0.1rem 0 0.2rem 0;
		/*transition: 2s all;*/
	}
	#question li>span{
		display: inline-block;
		padding: 0.2rem 0;
	}
	#question .icon{
		float: right;
		width: 0.5rem;
		height: 0.5rem;
		margin-top: 0.1rem;
	}
	#question .nav{
		position: absolute;
		top: 0.3rem;
		left: 0.1rem;
		width: 0.5rem;
		height: 0.5rem;
		margin-top: -0.1rem;
	}
	#question .footer_center{
		display: none;
		text-align: center;
	}
	#question .footer_center .qqImg>div{
		display: inline-block;
		padding-top: 0.1rem;
		width: 0.3rem;
		height: 0.33rem;
	}
	#question .footer_center .qqImg>div img{
		width: 100%;
		height: 100%;
		vertical-align:middle;
	}
	#question .footer_center .qqImg span{
		display: inline-block;
		margin-bottom: 0.1rem;
		
	}
	#question .footer_center .qqImg{
		height: 0.5rem;
		color: #3EC8BA;
	}
	#question .footer_center>p:nth-child(1){
		color: rgb(219,219,219);
		padding-bottom: 0.5rem;
	}
</style>