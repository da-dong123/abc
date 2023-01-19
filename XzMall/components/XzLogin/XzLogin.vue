<template>
	<view class="loginUser" >
		<!-- 用户名输入框 -->
	<view class="userLogin">
		<view class="xzlogin">
			<input class="input1"  value="" v-model="strUser"  placeholder="用户名/邮箱/手机号"  placeholder-class="input-placeholder"
			 @blur="inputUser"   :focus="strUserFocused" />
			 <uni-icons type="person-filled"></uni-icons>
		</view> <!-- xzlogin -->

		 <!-- 密码输入框 -->
		 <view class="pw" >
		 	<input class="input2" :password="showPw1" value=""  v-model="strPass" placeholder="请输入密码" placeholder-class="input-placeholder"
		 	 @blur="inputPass" :focus="strPassFocused"  >  
			 <view class="icons">
			 	<uni-icons  class="icon" color="#999" :type="showPw1? 'eye-slash': 'eye-filled' "  @click="showPw1=!showPw1"></uni-icons>
				<text class="txt1">|</text>
				<navigator url="/pages/index/index" class="txt2">忘记密码</navigator>
			 	<!-- 此处应该是有找回密码的页面，但是没有写，先随便放置一个 -->
			 </view>  <!-- icons -->
		 </view> <!-- pw -->
		<!-- 登录按钮 -->
		 <button class="btn" type="primary" size="default" @click="login">登录</button>
		 <!-- 此处不是页面跳转，是切换组件，所以不用navigator,而用改变父组件中show变量的值 -->
		<view class="nav"  @click="goRegister()">还没账号？现在去注册</view>
		<view class="line">
			<text class="txt1">________________</text>
			<text  class="txt2">其他登录方式</text>
			<text  class="txt3">________________</text>
		</view> <!-- line -->
		
	</view> <!-- userLogin -->
	<view class="contact_icons">
		<view class="wx">
			<uni-icons type="weixin" color="#07c160"  size="30"></uni-icons>
			<text>微信</text>
		</view>
		<view class="qq">
			<uni-icons type="qq"  size="30" color="#10aeff"></uni-icons>
			<text>QQ</text>
		</view>
		<view class="wb">
			<uni-icons type="weibo" size="30" color="#fa5151" ></uni-icons>
			<text>微博</text>
		</view>
	</view><!-- contact_icons -->
	<view class="checkbox">
	<label >
		<checkbox   :checked="isChecked"  @click="checkBox"/>
		<text style="font-size: 12px;">登录代表您已同意</text><text style="color:#0aa1ed; font-size: 12px; ">用户隐私条款</text>
	</label>
	</view>  <!-- checkbox -->
	</view>  <!-- loginUser -->
</template>

<script>
	
	import { login } from '../../service';
		
		export default {
			name:"XzLogin",
			data() {
				return {
					strUser:"",
					strPass:"",
					strUserFocused:true,
					strPassFocused:false,
					showPw1:"true",
				    isChecked:false
				}
			},
			mounted() {
				console.log("执行了登录页面的挂载");
				uni.setNavigationBarTitle({
						title: '用户登录'
				 	});
			},
			methods: {
				inputUser(){
					
					let userName=this.strUser;
					console.log("这是strUser",this.strUser);
				},
				
				goRegister(){
					console.log("立即执行了函数");
					this.$emit("getDataFromlogin","register");
				},
				
				inputPass(){
						let password=this.strPass;
				},
				checkBox(){
					this.isChecked=!this.isChecked;
				},
				//通过事件监听给父组件传送值
				// change(){
				// 	console.log("点击了")
				// // 子组件给父组件传值，目的为了在用户中心页面，来回切换不同的组件；所以用户中心页面只加载一次，所以不能使用uni.$emit，因为uni.$on不知道往哪里放。
				// 	uni.$emit("getDataFromlogin","register");
				// },
				
				
				
			async login(){
				
				//1.判断用户是否完成输入了，如果未完成，让对应的输入框获取输入焦点并弹出提示消息
				//2.提交strUser和strPass到服务器端接口，进行登录验证
				//3.如果服务器返回登录失败，则弹出提示，否则登录成功，并在客户端保存当前登录用户的信息，再跳转到用户档案
					// let data= {
					// 	strUser:this.strUser,
					// 	strPass:this.strPass,
					// }
					
					console.log("这是isChecked",this.isChecked);
					let strUser=this.strUser.trim();
					 let strPass=this.strPass.trim();
					this.strPassFocused=false;
					this.strUserFocused=false;
					//判断用户名或密码是否为空
					
					if(!strUser){
						uni.showToast({
										icon: 'none',
										title: '用户名不能为空！',
											});
							this.strUserFocused=true;
							this.strPassFocused=false;
												return;
					}
					
					if(!strPass) {
						
							uni.showToast({
											icon: 'none',
											title: '密码不能为空！',
												});
								this.strUserFocused=false;
								this.strPassFocused=true;
													return;					
						
					}
					
					this.strPassFocused=false;
					this.strUserFocused=false;
					
					//判断勾选框
					if(this.isChecked==false){
						console.log(this.isChecked);
						uni.showToast({
									icon: 'none',
									title: '请勾选登录同意',
										});
							return;
					}
					
					
					//调用接口
				let result= await login(strUser,strPass);
				console.log("这是登录的接口",result);
				let loginData=result.data;//{code: 201, msg: 'uname or upwd err'}
				if (loginData.code!==200){//登录失败
					uni.showModal({
						title:"错误",
						content:'登录失败！服务器返回错误消息'+loginData.msg,
						showCancel:false,
					});
				} else {
					
					uni.showModal({
						title:"欢迎回来",
						
					});
					//在客户端保存当前登录的身份信息-token令牌,我是谁我的编号是谁，服务器返回给客户端的。必须保存
					try {
						uni.setStorageSync('userToken',loginData.token );
					} catch (e) {
						// error
					};
					// //跳转到首页
					// uni.reLaunch({
					// 	url:'/pages/index/index'
					// });
					//跳转到用户档案页
					this.$emit('getDataFromlogin','profile')
								
					
				}//if判断
				
			
				},//login
	
			},
		}
</script>

<style lang="scss" scoped>
.loginUser{
		
.userLogin {
	padding:$uni-spacing-col-lg*3;
	.xzlogin {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: $uni-border-color $uni-border-width $uni-border-style;
		width:100%;
		.input1 {			
			height:  $uni-spacing-col-base*4 ;
			.input-placeholder {
				font-size: $uni-font-size-base;
				color: $uni-text-color-grey;
				
			}
		}//xzlogin
	}

	.pw {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: $uni-spacing-col-base;
		border-bottom: $uni-border-color $uni-border-width $uni-border-style;
		.input2 {
			height:  $uni-spacing-col-base*4 ;
			
			.input-placeholder {
				font-size: $uni-font-size-base;
				color: $uni-text-color-grey;
				
			}
		} //input2
		.icons {
			
			text-align: center;
			padding: $uni-spacing-col-sm 0px;
			flex: 1;
			display: flex;
			justify-content: space-between;
			.txt1 {
				color: $uni-text-color-grey;
			}
			.txt2 {
				color: $uni-text-color-grey;
				font-size: $uni-font-size-base;
			}
		}//icons
		
	}//pw

	.btn {
		margin-top: $uni-spacing-col-lg*2;
		border-radius: $uni-border-radius-lg*5;
		background-color: $xz-theme;
		width: 100%;
		height: 35px;
		font-size: $uni-font-size-base;
		&:active {
			color: $uni-text-color;
		}
		
	}
	.nav {
		margin-top: $uni-spacing-col-lg*2;
	   color: $uni-text-color-grey;
	font-size: $uni-font-size-base;	
	}
	.line {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: $uni-spacing-col-lg*3;
		.txt1  {
		color: $uni-border-color;
		}
		.txt3 {
		color: $uni-border-color;
		}
		.txt2 {
			color: $uni-text-color-grey;
			font-size: $uni-font-size-sm;
			margin-top: 12px;
			
		}
	}//line

		}
	.contact_icons {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		margin-top:$uni-spacing-col-base;
		.wx {
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		.qq {
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		.wb {
			display: flex;
			flex-direction: column;
			align-items: center;
		}
	} //contact_icons
	.checkbox {
		text-align: center;
		margin-top:$uni-spacing-col-lg*2;
	}
}
</style>