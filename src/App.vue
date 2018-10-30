<template>
  <div id="app">
     <router-view/>
     <!--<Footer></Footer>-->
  </div>
</template>

<script>
//import Footer from "@/components/footer.vue"
//import Footer from '../footer/footer.vue'
export default {
	components:{
//		Footer
//	},
//	beforeCreate:function(){
//		this.$router.push("/")
	}
}
</script>

<style>
#app{
		height: 100%;
		width: 100%;
	}
</style>
