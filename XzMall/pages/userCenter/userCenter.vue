<template>
	<view class="usercenter">
		<view class="xzlogin" v-show="show=='login'  ">
			<XzLogin></XzLogin>
		</view>
		
		<view class="xzregister" v-show="show=='register'  ">
			<XzRegister> </XzRegister>
		</view>
	</view>
	
	
</template>

<script>
	export default {
		data(){
			
		return {
			show:"login",
			
		}
		},
		methods: {
			
		},
		onLoad() {
			uni.$on("getDataFromlogin",(data)=>{ this.show=data;
			//修改tabbar题目
			uni.setNavigationBarTitle({
				title: '用户注册'
			});
			});
			uni.$on("getDataFromregister",(data)=>{ this.show=data;
			//修改tabbar题目
			uni.setNavigationBarTitle({
				title: '用户登录'
			});
			});
		
			
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
