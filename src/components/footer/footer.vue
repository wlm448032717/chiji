<template>
	<div id="footerTab">
		<div class="tab-item" :class="{active:index==indexOther}" @click="changeList(index)">
        <router-link to="/index">
        	<img src="static/images/tab_home.png" class="icon" v-show="index!=indexOther"/>
        	<img src="../../../static/images/tab_home_pre.png" class="icon" v-show="index==indexOther"/>
        </router-link>
      </div>
      <div class="tab-item" :class="{active:index==indexOther}" @click="changeList(index)">
        <router-link to="/index">
        	<img src="static/images/tab_down.png" class="icon" v-show="index!=indexOther"/>
        	<img src="../../../static/images/tab_down_pre.png" class="icon" v-show="index==indexOther" />
        </router-link>
      </div>
       <div class="tab-item" :class="{active:index==indexOther}" @click="changeList(index)">
        <router-link to="/question">
        	<img src="static/images/tap_handle.png" class="icon" v-show="index!=indexOther" />
        	<img src="../../../static/images/tap_handle_pre.png" class="icon" v-show="index == indexOther" />
        </router-link>
      </div>
      <div class="tab-item" :class="{active:index==indexOther}" @click="changeList(index)">
        <router-link to="/login">
        	<img src="static/images/tab_my.png"  class="icon" v-show="index!=indexOther"/>
        	<img src="../../../static/images/tab_my_pre.png" class="icon" v-show="index==indexOther"/>
        </router-link>
      </div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				indexOther:-1,
				mark:''
			}
		},
		methods: {
			changeList(index){
				if( this.indexOther === index){
		          	this.indexOther=-1
				
				}else{
					this.indexOther=index;
				}
				
			}
			
		}
	}
	
</script>

<style>
	#footerTab{
		position: fixed;
		bottom: 0;
		left: 0;
		font-size: 0.3rem;
		background: white;
		height: 0.8rem;
		line-height: 1rem;
		width: 100%;
		box-shadow:0px 0px 0.2rem 0.01rem #F6F8F8;
	}
	.tab-item{
		text-align: center;
		float: left;
		width: 25%;
	}
	.tab-item img{
		display: inline-block;
		width: 0.5rem;
		height: 0.5rem;
	}
</style>