import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/Home/index.vue'
import downFile from '../components/question/question.vue'
import downGame from '../components/downGame/downGame.vue'
import messageInfo from '../components/messageInfo/messageInfo.vue'
import feedback from '../components/feedback/chatPage.vue'
import device from '../components/device/deviceMaterials.vue'
import loginPage from '../components/LoginPage/login.vue'

Vue.use(Router)

export default new Router({
  routes: [
 
		{
      path: '/index',
      component: index,

    },
   
      {
      path: '/question',
      component: downFile,
      
    	},
    	  {
	      path: '/',
	      redirect: '/index',	
     },
  	 {
	            path: '/downgame',
	            component: downGame
	   },
	    {
	            path: '/messageInfo/:id',
	            component: messageInfo
	   },
	   {
		   	path:'/chatPage/:id',
		   	component:feedback
	   },
	   {
	   		path:'/deviceMaterials/:id',
	   		component:device
	   },
	   {
	   		path:'/login',
	   		component:loginPage
	   }
//	   {
//	   		path:'/messageList/:id',
//		   	component:myMessage
//	   }
  ]
})
