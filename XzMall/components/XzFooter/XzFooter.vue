<template>
	<view class="xzFooter">
		<view class="f61">
			<navigator url="/pages/userCenter/userCenter?section=login" open-type="switchTab">登录</navigator>
			<text>|</text>
			<navigator url="/pages/userCenter/userCenter?section=register" open-type="switchTab">注册</navigator>			
			<text>|</text>
			<navigator url="/pages/list/list">客户服务</navigator>
			<text>|</text>
			<view @click="backTop">返回顶部</view>
		</view>
		<view class="f62">
			<view class="son1">
				<image src="../../static/img/icon1.png" mode="widthFix"></image>
				<text>品质保障</text>
			</view>
			<view class="son1">
				<image src="../../static/img/icon2.png" mode="widthFix"></image>
				<text>私人定制</text>
			</view>
			<view class="son1">
				<image src="../../static/img/icon3.png" mode="widthFix"></image>
				<text>学员特供</text>
			</view>
			<view class="son1">
				<image src="../../static//img/icon4.png" mode="widthFix"></image>
				<text>专属特权</text>
			</view>
			
		</view>
		<view class="f63">
			<text>达内科技版权所有京ICP备08000853号-75</text>
		</view>
	</view>
	
</template>

<script>
	export default {
		name:"XzFooter",
		data() {
			return {
				
			};
		},
		methods:{
			backTop(){
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 300
			});	
			
			}
		},
		onLoad() {
			console.log("tiaozhuan ")
		}
	}
</script>

<style lang="scss">
 .xzFooter {
box-shadow: 0 0 10rpx $uni-border-color;
	  border-top:$uni-border-style $uni-border-width $uni-border-color ;
	  // f61-第一层 
	  .f61 {
	  	 display: flex;
	  	 flex-direction: row;
	  	 justify-content: space-evenly;//空白均匀分布
	  	 align-items: center;
	  	 padding: $uni-spacing-col-lg;//增加留白
	  	 // height: 40px;
	      border-bottom:$uni-border-style $uni-border-width $uni-border-color ;
	     
	  	 navigator {
	  	 	  
	  	 	  font-size: $uni-font-size-base; 
	  	 }
	  	 view {
	  	 	
	  	 	  font-size: $uni-font-size-base; 
	  	 }
	  	 text {
	  	 	  margin-left:3px ;
	  	 }
	  }
	  
	  //f6-第二层先考虑布局分布均匀space-around ,利用padding增加留白
	  .f62 {
	  	  display: flex;
	  	  justify-content: space-around;//新增
	  	  align-items: center;	
	  	  padding: $uni-spacing-col-lg 0;//新增
	  	  border-bottom:$uni-border-style $uni-border-width $uni-border-color ;
	  	  // 每个四分之一元素
	  	  .son1 {
	  	  	  height: 100%;
	  	  	  display: flex;
	  	  	  flex-direction: column;
	  	  	  justify-content: center;
	  	  	  align-items: center;
	  		  //图片
	  	  	   image {
	  	  	   	  height: $uni-img-size-lg;
	  	  	   	  width: $uni-img-size-lg;
	  	  	   }
	  		   //文字
	  		   text {
	  		   		 font-size: $uni-font-size-sm;
	  		   }
	  	  }
	  }
	    
	  //f6第三层
	  .f63  {	
	  	padding: $uni-spacing-col-lg 0;//新增
	  	text-align: center;//新增
	  	//文字
	  	text {
	  		 font-size: $uni-font-size-sm;
	  	}
	  	
	  }
	  
	  
 }

 
 
 
 
 
</style>