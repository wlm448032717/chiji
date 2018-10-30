<template>
	<div id="loginWrap">
		<div class="head">
			<img src="../../../static/images/my_women_head_logon.png"/>
			<p>请点击登入</p>
		</div>
		<div class="state">
			<h4 style="ma">手柄连接</h4>
			<p>手柄已连接:w1</p>
		</div>
		<div>
			<ul class="mainLsit">
				<li>
					<img src="../../../static/images/my_top.png"/>
					<span class="mdetail">固件升级</span>
					<img class="icoImg" src="../../../static/img/list_down.png"/>
				</li>
				<li>
					<img src="../../../static/images/my_guide.png"/>
					<span class="mdetail">固件升级</span>
					<img class="icoImg" src="../../../static/img/list_down.png"/>
				</li>
				<li>
					<img src="../../../static/images/my_news.png"/>
					<span class="mdetail">固件升级</span>
					<img class="icoImg" src="../../../static/img/list_down.png"/>
				</li>
				<li>
					<img src="../../../static/images/my_question.png"/>
					<span class="mdetail">固件升级</span>
					<img class="icoImg" src="../../../static/img/list_down.png"/>
				</li>
				<li>
					<img src="../../../static/images/my_us.png"/>
					<span class="mdetail">固件升级</span>
					<img class="icoImg" src="../../../static/img/list_down.png"/>
				</li>
			</ul>
		</div>
		<!--<footer-tab></footer-tab>-->
	</div>
</template>

<script>
//	import footerTab from '../footer/footer.vue'
	export default {
		components:{
//			footerTab
		}
	}
</script>

<style>
	ul {
		margin: 0;
		padding: 0;
	}
	.head img{
		display: block;
		width: 70px;
		height: 70px;
		margin: 25px auto 25px;
	}
	.head p{
		font-size: 0.27rem;
		text-align: center;
		color: black;
		font-family:"bodoni mt black";
	}
	.state{
		border-radius:6px;
		margin: 15px;
		padding: 15px 0;
		box-shadow: 4px -1px 25px #efecec;
	}
	.state h4{
		font-family: "fantasy";
		font-size: 0.3rem;
		color: #00CED1;
		text-align: center;
		font-weight: 400;
	}
	.state p{
		font-size: 0.25rem;
		text-align: center;
		color: #CCCCCC;
		word-break: break-word;
		margin: 15px 0;
	}
	.mainLsit{
		margin: 15px;
		padding: 15px 0;
		box-shadow: 4px -1px 25px #efecec;
	}
	.mainLsit  li{
		width: 95%;
		padding: 0 8px;
		line-height: 50px;
		
	}
	.mainLsit .icons{
		width: 20px;
		height: 20px;
	}
	.mainLsit .icoImg{
		margin-left:50%;
		width: 25px;
		height: 25px;
		transform: rotateZ(270deg);
	}
	.mdetail{
		font-size: 0.27rem;
		color: #666;
	}
	.mainLsit .icons,.icoImg,.mdetail{
		vertical-align: middle;
	}
	
	.mainLsit  li:hover{
		margin-bottom: 20px;
		border-radius: 6px;
		box-shadow: 4px -1px 25px #efecec;
	}
	.tabbarList{
		position: fixed;
		bottom: 5px;
		width: 100%;
		border-top: 0.5px solid #ccc;
	}
	.tabbarList li{
		display: inline-block;
		margin-bottom: 8px;
		width: 30%;
		line-height: 40px;
		text-align: center;
	}
	.tabbarList li img{
		width: 25px;
		height: 25px;
	}
	.tabbarList li img:hover{
		border:1px solid dodgerblue;
	}
</style>