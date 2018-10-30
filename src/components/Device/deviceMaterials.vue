<template>
	<div id="materialsWrap">
		<div id="header">
			<img src="../../../static/img/nav_return.png"/>
			<span>设备教材</span>
		</div>
		<ul class="deviceList">
			<li v-for ='item in deviceArr'>
				<p class="deviceName">设备教材某某设备教材某某设备教材某某设备教材某某设备教材某某设备教材某某</p>
				<p class="deviceImg"><img src="../../../static/img/1523885586(1).png"/></p>
			</li>
		</ul>
	</div>
</template>

<script>
	
	export default {
		data() {
			return {
				deviceArr:[],
				title:''
			}
		},
		mounted(){
			this.id = this.$route.params.id
			this.getList()
		},
		methods: {
			getList(){
				this.$axios.post('v1/api/',params)
				.then(data =>{
					console.log()
				})
				.catch(err =>{
					console.log(err.msg)
				})
			}
		}
	}
</script>

<style>
	#header{
		line-height: 60px;
	}
	#header img,span{
		vertical-align: middle;
	}
	#header img{
		width: 40px;
		height: 40px;
		margin-left: 8px;
	}
	#header span{
		font-size: 0.3rem;
		margin-left: 30%;
	}
	.clearfix{
		*zoom: 1;
	}
	.clearfix:after{
		content: '';
		display: block;
		clear: both;
	}
	.deviceList{
		margin: 0 auto;
		padding: 0;
	}
	.deviceList li{
		margin:20px 20px 10px 20px;
	}
	.deviceName{
		font-size: 0.3rem;
		line-height: 25px;
		padding: 12px 8px;
		word-break:keep-all;
    	white-space:nowrap;
    	overflow:hidden; 
    	text-overflow:ellipsis;
		border-radius:6px 6px 0 0 ;
		box-shadow: 4px 2px 16px #ccc;
	}
	.deviceImg img{
		width: 100%;
		border-radius: 0 0 6px 6px;
		background: cover;
		background-position: center;
	}
</style>