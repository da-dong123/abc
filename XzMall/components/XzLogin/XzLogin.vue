<template>
	<view class="loginUser" >
	<view class="userLogin">
		<input class="input1"  value="" v-model="strUser"  placeholder="用户名/邮箱/手机号"  placeholder-class="input-placeholder"
		 @blur="inputUser"  />
		 <view class="pw" >
		 	<input class="input2" :password="showPw1" value=""  v-model="strPass" placeholder="请输入密码" placeholder-class="input-placeholder"
		 	 @blur="inputPass"  >  
			 <view class="icons">
			 	<uni-icons  class="icon" color="#999" :type="showPw1?'eye-filled':'eye-slash' "  @click="showPw"></uni-icons>
				<text class="txt1">|</text>
			 	<text class="txt2" >忘记密码</text>
			 </view>
		 </view>
		
		 <button class="btn" type="primary" size="default" @click="login">登录</button>
		<view class="nav" @click="change">还没账号？现在去注册</view>
		<view class="line">
			<text class="txt1">________________</text>
			<text  class="txt2">其他登录方式</text>
			<text  class="txt3">________________</text>
		</view> <!-- line -->
		
	</view><!-- userLogin -->
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
		<checkbox   :checked="isChecked"  @click="checkBox"/><text style="font-size: 12px;">登录代表您已同意</text><text style="color:#0aa1ed; font-size: 12px; ">用户隐私条款</text>
	</label>
	</view>
	</view>
</template>

<script>
	
	import { login } from '../../service';
		
		export default {
			name:"XzLogin",
			data() {
				return {
					strUser:"",
					strPass:"",
					showPw1:"true",
				    isChecked:false
				}
			},
			methods: {
				inputUser(){
					
					let userName=this.strUser;
					console.log("这是strUser",this.strUser);
				},
				inputPass(){
						let password=this.strPass;
				},
				checkBox(){
					this.isChecked=!this.isChecked;
				},
				//通过事件监听给父组件传送值
				change(){
					console.log("点击了")
					uni.$emit("getDataFromlogin","register");
				},
			async login(){
					let data= {
						strUser:this.strUser,
						strPass:this.strPass,
					}
					
					console.log("这是isChecked",this.isChecked);
					//判断用户名或密码是否为空
					if(this.strUser==""||this.strPass==""){
						uni.showToast({
									icon: 'none',
									title: '用户名和密码不能为空！',
										});
							return;
					}
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
				let result= await login(data);
				console.log("这是登录的接口",result);
				let loginData=result.data;//{code: 201, msg: 'uname or upwd err'}
				if( result.statusCode==200){
					//判断用户名和密码是否正确
					if(loginData.msg=="uname or upwd err") {
						uni.showToast({
									icon: 'none',
									title: '密码或用户名错误',
										});
							return;
					} 
					uni.showToast({
								icon: 'none',
								title: '登录成功！',
									});	
				//存入缓存，若成功					
				try {
					uni.setStorageSync('username', data);
				} catch (e) {
					// error
				}
					//跳转到首页
					uni.reLaunch({
						url:'/pages/index/index'
					});
										
				}//result.statusCode
				},//login
				//点击eye
				showPw(){
					this.showPw1=!this.showPw1;
				}
			},
		}
</script>

<style lang="scss" scoped>
.loginUser{
		

.userLogin {
	padding:$uni-spacing-col-lg*3;
	.input1 {
		border-bottom: $uni-border-color $uni-border-width $uni-border-style;
		height:  $uni-spacing-col-base*4 ;
		width:100%;
	
		.input-placeholder {
			font-size: $uni-font-size-base;
			color: $uni-text-color-grey;
			// margin-bottom: $uni-spacing-col-sm*3;
		}
	}//input1
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