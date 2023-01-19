<template>
	
	<view class="usercenter">
		<uni-transition mode-class="slide-left"   :show="show==='login'" > 	
			<XzLogin @getDataFromlogin="show=$event"  ></XzLogin>
	</uni-transition>
		
		<uni-transition mode-class="slide-right" :show="show==='register'" > 
		<XzRegister  @getDataFromlogin="show=$event"> </XzRegister>
		</uni-transition>
		
			
		
		<uni-transition mode-class="fade" :show="show==='profile'" >
		<XzUserProfile @getDataFromlogin="show=$event"> </XzUserProfile>
		</uni-transition>
		
	
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
			let token=uni.getStorageSync('userToken')
			console .log("这是获取缓存数据",section);
			//先判断section是否存在，
			if(section){
				this.show=section
			} else{
				if(token){
					this.show='profile'
					
				}else {
					this.show='login'
				}
				
			};
			
			// section?this.show=section:this.show="login";
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
