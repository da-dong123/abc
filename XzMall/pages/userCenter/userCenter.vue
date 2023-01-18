<template>
	
	<view class="usercenter">
		<view class="xzlogin" v-if="show==='login'  ">
			<XzLogin @getDataFromlogin="show=$event"  ></XzLogin>
		</view>
		
		<view class="xzregister" v-if="show==='register'  ">
			<XzRegister> </XzRegister>
		</view>
		<view class="xzprofile" v-if="show==='profile'  ">
			<XzUserProfile></XzUserProfile>
		</view>
	</view>
	
	
</template>

<script>
	export default {
		data(){
			
		return {
			show:"",
			
		}
		},
		methods: {
			// changeShow(data){
			// 	this.show=data
			// },
		},
		onShow() {
			//有页签,页签只加载一次，页签之间的切换
			let section=	uni.getStorageSync("userCenterSection");
			console .log("这是获取缓存数据",section);
			section?this.show=section:this.show="login";
			// this.show=section;
			uni.removeStorageSync("userCenterSection");
			
			
			
		},
		onLoad() {
		
		// uni.$on("getDataFromlogin",(data)=>{ this.show=data;
		// 	//修改tabbar题目
		// 	uni.setNavigationBarTitle({
		// 		title: '用户注册'
		// 	});
		// 	});
		// 	uni.$on("getDataFromregister",(data)=>{ this.show=data;
		// 	//修改tabbar题目
		// 	uni.setNavigationBarTitle({
		// 		title: '用户登录'
		// 	});
		// 	});
		
			
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
