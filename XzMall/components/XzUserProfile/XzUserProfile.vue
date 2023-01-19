<template>
	<view class="profile">
		<uni-card title="我的档案" thumbnail="" >
			<text>{{userInfo}}</text>
			<!-- F1:用户头像uImage -->
			<!-- F2:用户头像 uList -->
			<!-- F3:退出按钮uBtton -->
			<button type="primary" @click="doLogout">退出登录</button>
		</uni-card>
			</view>
</template>

<script>
import { userBasic,userLogout } from '../../service';
	
	export default {
		name:"XzUserProfile",
		data() {
			return {
				userInfo:"",
			};
		},
	async	mounted() {
			console.log("执行了档案页面的挂载");
			uni.setNavigationBarTitle({
					title: '用户档案'
			 	});
				//向服务器接口请求当前登录的用户信息
				let result= await userBasic();
				console.log("用户信息",result);
				this.userInfo=result.data;
		},
		methods: {
	    	async	doLogout(){
				//提交请求给服务器。完成服务器端的退出
				let result= await userLogout();//主要记录推出时间
				//清除客户端保存的身份认证token
				uni.removeStorageSync('userToken');
				//跳转回登录页面，子组件发射自定义事件，修改父组件的show
				this.$emit("getDataFromlogin",'login');
				
			}
		}
	}
</script>

<style lang="scss">
.profile {
	position: absolute;	
	width: 750rpx;
}
</style>