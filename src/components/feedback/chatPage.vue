<template>
	<div id="chatWrap">
		<div class="title_top clearfix">
			<img src="static/img/nav_return.png"/>
			<span class="title_txt">客服反馈</span>
		</div>
		<div class="chatConten">
			<div class="quistions clearfix">
				<img :src="useImg"/>
				<div class="conten">
					<p class="c_title">{{ title }}</p>
					<p class="c_date">{{ createdDate }}</p>
				</div>
			</div>
			<div class="tchatDetail" id="tchatDetail">
				<ul class="conentList" id="conentList">
		            <li v-for="item in message_array" class="clearfix">
		            	<i class="clearfix">
		            		<img v-bind:class="userImg" :src="useImg" v-if="item.type == 'me'" style="float: right;"/>
		            		<img v-bind:class="masterImg" :src="curImg" v-else-if="item.type == 'other'" style="float: left;"/>
		            	</i>
		            	<span v-bind:class="{curs:item.type == 'me',curs2: item.type == 'other'}">{{item.msg}}</span><i class="timer">{{ item.time }}</i>	
		            	<span v-bind:class="{'dialog-rotate-border2':item.type == 'other','dialog-rotate-border':item.type == 'me'}" ></span>
		            </li>
		       </ul>
		        <div class="replyGrow clearfix">
		        	 <input type="text" v-model="message" placeholder="输入文字回复"  v-on:keyup.enter="send" />
		       		 <button class="subBtn" v-on:click="send">发送</button>
		        </div>	
			</div>
		</div>
	</div>
</template>

<script>

	import '../../utils/jmessage-sdk-web.2.6.0.min.js'
	import crypto from 'crypto'
	import moment from 'moment'
	import Bscroll from 'better-scroll'
	
	
	export default {
		data() {
			return {
				title:'',
				createdDate: '',
				JIM: null,
				message_array:[],
    			message:'',
    			content:'',
    			useImg:'static/img/1523860505(1).png',
    			curImg:'static/img/1523886897(1).png',
    			userImg:'',
    			masterImg:'',
    			id: null,
				appkey: "2837f83a2fe63a0c8458c5e2",
			    randomStr: "022cd9fd995849b58b3ef0e943421ed9",
			    key: 'c033cdfef65c285302707a73'
			}
		},
		mounted(){
			this.id = this.$route.params.id
			this.JIM = new JMessage()
			this.init()
			this.getInfo()  
	
	   }, 
	   watch: {
	   		message_array: {
	   			handler (val, oldVal){
	   				this.$nextTick(() => {
	   					var container = this.$el.querySelector('#conentList')
	   					container.scrollTop = container.scrollHeight
	   				})
	   			}
	   		}
	   },
		methods:{
			generateMD5 (timestamp) {
		      let signatureStr = 'appkey=' + this.appkey + '&timestamp=' + timestamp + '&random_str=' + this.randomStr + '&key=' + this.key
		      const hash = crypto.createHash('md5')
		      hash.update(signatureStr)
		      return hash.digest('hex')
		    },
			init () {
		      let _this = this
		
		      let timestamp = new Date().getTime()
		
		      let signature = _this.generateMD5(timestamp)
		      this.JIM.init({
		        'appkey': _this.appkey,
		        'random_str': _this.randomStr,
		        'signature': signature,
		        'timestamp': timestamp,
		        'flag': 1
		      }).onSuccess(function (data) {
		        console.log('初始化成功:' + JSON.stringify(data))
		        _this.login()
		      }).onFail(function (data) {
		        console.log('初始化失败:' + JSON.stringify(data))
		      })
		    },
		    login(){
				let _this = this
				_this.JIM.login({
					'username':'999@qq.com',
					'password':'999@qq.com'
				}).onSuccess(function(data){
					console.log('登录成功'+JSON.stringify(data))
					_this.onMsgReceive()
				}).onFail(function(data){
					console.log('登录失败'+JSON.stringify(data))
				})
			},
			dataFormat(date){
			return moment(date).format('HH:mm:ss')
			},
			onMsgReceive () {
		      console.log('开启消息实时监听...');
		      let _this = this
		      _this.JIM.onMsgReceive(function (data) {
		        console.log('监听到新消息:' + JSON.stringify(data))
		        let msgContent = data.messages[0].content.msg_body.text
		        let msgContentJson = JSON.parse(msgContent)
		        let feedbackId = msgContentJson.feedbackId
		        let content = msgContentJson.content
		        let date = data.messages[0].ctime_ms
		        console.log('收到消息：' + msgContent)
		        console.log('收到消息的feedbackId：' + feedbackId)
		        console.log('收到消息的内容：' + content)
		        _this.message_array.push({msg:content, time: _this.dataFormat(new Date), type: 'other'})
		      })
		    },
		    getInfo(){
		    	this.$axios.post('/v1/message/listMessage', {feedbackId: this.id}, {headers: {Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ3d3IucmFwb28uY29tIiwiaWF0IjoxNTI3MTI3NzAzLCJzdWIiOiJ7XCJyb2xlQ29kZVNldFwiOltcIjNcIl0sXCJzdXBlckFkbWluXCI6ZmFsc2UsXCJ1c2VySWRcIjozfSIsImV4cCI6MTUyOTcxOTcwM30.hpiRNu9TcbKQJDJKcLznYE7o5erWY4_tcRqsHlO3KSc'}})
				.then(data=>{
					console.log(data)
					this.title = data.data.data.feedback.content
					this.createdDate = data.data.data.feedback.createdTime
					let msgs = data.data.data.messages.map(item => {
						if (item.userId !== 0) {
							return {msg: item.content, time: item.createdTime, type: 'me'}
						} else {
							return {msg: item.content, time: item.createdTime, type: 'other'}
						}
					})
					this.message_array = this.message_array.concat(msgs)
				}).catch(err => {
		          this.$message.error(err.msg)
		        })
		    },
			send(e) {
				let _this = this
				if(this.message.length == 0 || this.message.match(/^\s+$/g)){
					return  
				}
				let content = {'feedbackId': this.id, 'content':this.message}
      			console.log('消息内容：' + JSON.stringify(content))
             
				this.JIM.sendSingleMsg({
				    'target_username' : 'throne',
				    'appkey':this.appkey,
				    'target_nickname':'throne',
				    'content':JSON.stringify(content),
				    'custom_notification': {'enabled': true, 'title': 'title', 'alert': 'alert', 'at_prefix': 'atprefix'},
				    'need_receipt':true
				}).onSuccess(function(data,smg) {
					 console.log('发送成功:' + JSON.stringify(data))
		 			_this.message_array.push({msg: _this.message, time: _this.dataFormat(new Date), type: 'me'})
		 			_this.message = ''
		 			
				}).onFail(function (data) {
		        	console.log('发送失败:' + JSON.stringify(data))
		        })
				
				// 将消息存到数据库，以便用户离线再次登录后查看未读消息
				let params = {
			        content: this.message,
			        feedbackId: this.id
			    }
			
			    this.$axios.post('/v1/message/sendMessage', params, {headers: {Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ3d3IucmFwb28uY29tIiwiaWF0IjoxNTI3MTI3NzAzLCJzdWIiOiJ7XCJyb2xlQ29kZVNldFwiOltcIjNcIl0sXCJzdXBlckFkbWluXCI6ZmFsc2UsXCJ1c2VySWRcIjozfSIsImV4cCI6MTUyOTcxOTcwM30.hpiRNu9TcbKQJDJKcLznYE7o5erWY4_tcRqsHlO3KSc'}})
		        .then(data => {
		          console.log('保存消息到数据库成功' + data)
		          this.message = ''
		          
		        })
		        .catch(err => {
		          this.$message.error(err.msg)
		          
		        })
			}
			
		}   
	}
</script>
  
<style>
 .dialog-rotate-border,.dialog-rotate-border2{
 	-webkit-border-radius: 20px;  
     -moz-border-radius: 20px;  
          border-radius: 5px;  
  	position: absolute;
 }
.dialog-rotate-border {   
  	right: 66px;  
  	top: 13px;
 }  
 .dialog-rotate-border2 {   
  	left: 66px; 
  	top: 7px;  
 } 
.dialog-rotate-border::before,.dialog-rotate-border2::before{
	  display: hidden; 
	  content: '';  
	  position: absolute;  
	  width: 10px;  
	  height: 10px;  
	  background: #ccc;  
	  -webkit-transform: rotate(45deg);  
      -moz-transform: rotate(45deg);  
      -ms-transform: rotate(45deg);  
       -o-transform: rotate(45deg);  
          transform: rotate(45deg);
}
.dialog-rotate-border::before { 
	  top: 11px;  
	  right: -6px; 
 }  
  .dialog-rotate-border2::before { 
	  top: 18px;  
	  left: -6px;  
 }  
 .dialog-rotate-border::after,.dialog-rotate-border2::after{
 	  content: '';  
	  position: absolute;  
	  width: 10px;  
	  height: 10px;  
	  background: white;  
	  -webkit-transform: rotate(45deg);  
      -moz-transform: rotate(45deg);  
      -ms-transform: rotate(45deg);  
      -o-transform: rotate(45deg);  
      transform: rotate(45deg); 
 } 
.dialog-rotate-border::after {  
	  top: 11px;  
	  right: -5.4px;  
      }
.dialog-rotate-border2::after {  
	  top: 18px;  
	  left: -5.4px;  
      }
          
	#chatWrap{
		width: 100%;
		height: 100%;
		font-size: 0.3rem;
	}
	.chatConten{
		position: absolute;
		top:8% ;
		width: 100%;
		height: 92%;
	}
	.title_top{
		position: fixed;
		top:0px;
		width: 100%;
		height: 8%;
		text-align: center;
	}
	
	.title_top img{
		float: left;
		width: 0.5rem;
		height: 0.5rem;
		margin-top: 0.2rem;
	}
	.title_txt{
		float: right;
		width: 2rem;
		height: 100%;
		line-height: 50px;
		text-align: center;
		margin-right: 35%;
	}
	.clearfix{
		*zoom: 1;
	}
	.clearfix:after{
		content: '';
		display: block;
		clear: both;
	}
	.quistions{
		padding: 15px;
		margin: 0.25rem;
		height: 1.2rem;
		border-radius: 6px;
		-webkit-box-shadow: 5px 5px 20px #ccc;
		box-shadow: 5px 5px 20px #ccc;
	}
	.quistions img{
		float: left;
		width: 50px;
		height: 50px;
		border-radius: 4px;
	}
	.conten{
		float: left;
		width: 80%;
		height: 50px;
		padding-left: 0.2rem;
	}
	.conten p{
		width: 100%;
		line-height: 0.5rem;
		
		padding-right: 8px;
	}
	.c_title{
		font-size: 0.4rem;
		color: #545050;
	}
	.c_date{
		font-size: 0.2rem;
		color: #a7a0a0;
	}
	.tchatDetail{
		width: 92%;
		height: 65%;
		padding: 0 15px 0 15px;
		
	}
	.conentList{
		height:100%;
		overflow: scroll;
		overflow-x: hidden;
		overflow-y: scroll;
		padding-top: 14px;
		border-bottom: 1px solid #EEEEEE;
	}
	
	.conentList li{
		position: relative;
		line-height: 35px;
		padding: 8px ;
		margin-bottom: 35px;
	}
	.conentList li:first-child{
		margin-top: 15px;
	}
	.conentList li img{
		width: 45px;
		height: 45px;
	}
	.curs,.curs2{
		position: relative;
		max-width: 70%;
		border-radius: 4px;
		border: 1px solid #EEEEEE;
		font-size: 0.28rem;
		line-height: 22px;
		padding: 10px 8px;
		color: #545050;
		word-wrap:break-word; 
	}
	.curs{
		float: right;
		top:-44px;
		margin-right:57px;
	}
	.curs2{
		float: left;
		left:57px;
		top: -44px;
	}
	.masterImg{
		width: 45px;
		height: 45px;
		border-radius: 4px;
		float: left;
		
	}
	
	.userImg{
		height: 45px;
		border-radius: 4px;
		float: right;
		margin-right: 8px;
	}
	.repeatLi{
		position: absolute;
		right:30px;
		word-wrap:break-word ;
	}
	.repeatLi li{
		line-height: 35px;
		padding: 8px ;
	}
	.replyGrow{
		position: fixed;
		bottom: 20px;
		left: 0;
	    width: 100%;
	    height: 45px;
	}
	.replyGrow input{
		float: left;
		margin-left: 12px;
		width: 70%;
		line-height: 45px;
		text-indent: 10px;
		outline: none;
		font-size: 0.25rem;
		border: 1px solid #CCCCCC;
		border-radius: 6px 0 0 6px ;
	}
	.subBtn{
		float: left;
		height: 47px;
		width: 22%;
		background-color: darkturquoise;
		color: white;
		letter-spacing: 5px;
		border: none;
		border-radius: 0 6px 6px 0;
		outline: none;
	}
	.timer{
		position: absolute;
		top: -30px;
		left: 30%;
		margin-bottom: 8px ;
		line-height: 8px;
		border-radius: 4px;
		font-size: 0.1rem;
		color: #695c5c;
		background-color:#9e9f9d29;
		padding: 8px;
		font-style:normal;
	}
</style>