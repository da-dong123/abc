<template>
			
			<view class="first_product">
			<view class="textheader">		
				<image class="pic" src="../../static/img/computer_icon.png"  mode="widthFix" style="width:50rpx"></image>
			   <text class="txt">{{title}}</text>								
				<navigator class="link" url="../../pages/list/list?pno=1 ">更多</navigator>				
			</view>	<!-- textheader -->
			<!-- 产品信息 -->
			<view class="first_productDet">
				
				<!-- 第一个产品信息 -->
				<view class="first_product1" v-for="(item,i) in productList" :key="i" >
					<image  class="pic" :src="$base+item.pic"  mode="heightFix"></image>
				     <view class="text_detail">
				     	<text class="txt">{{item.title}}</text>
						<view class="text_down">
							<text class="txt">￥{{item.price}}</text>
							<button class="link" type="primary"   size="mini" @click="showDetails(item.pid)"> 查看详情</button>
						</view>
				     </view>
				</view><!-- first_product1 -->
				
				
			</view> <!-- first_productDet -->
			
			</view><!-- first_product -->
		
	
					

</template>

<script>
import { productDetails } from '../../service';
	
	export default {
		name:"XzProductFloor",
		props:{
			title:{
				type:String,
				required:true,
				default:"商品楼层标题"
			},
			productList:{
				type:Array,
				required:true,
				default:()=>[],//如果属性的默认值是object或Arry,必须使用函数返回
			}
		},
		data() {
			return {
			
			}
		},
		methods:{
		 showDetails(pid){
		// let details=await	productDetails(pid);
		// console.log(details);
		
		uni.navigateTo({
			url:"/pages/details/details?lid="+pid,
		});
		
			}
		}
				
	}
</script>

<style lang="scss">
	// 产品信息
.first_product {
	margin:$uni-spacing-col-sm 0px;
	box-shadow: 0px  0px 10rpx 0px $uni-text-color-disable ;
	border-top: $uni-border-style $uni-border-width $uni-border-color ;
    .textheader {
	display: flex;
	align-items: center;
    padding: $uni-spacing-col-base    $uni-spacing-col-base;
	border-bottom: $uni-border-style $uni-border-width $uni-border-color ;
	margin-bottom: $uni-spacing-col-base;
	.txt{
		flex: 1;
		margin-left: $uni-spacing-col-base;
	}	
	.link {
		color: $uni-text-color-grey;
		font-size: $uni-font-size-base;
	}
	
}
}

// 商品模块
.first_productDet  {
	display: flex;
	flex-wrap:wrap;
    padding:  $uni-spacing-col-base $uni-spacing-col-base ;
	justify-content: space-between;
	.first_product1 {
		border: $uni-border-style $uni-border-color $uni-border-width;
		width:49%;
		box-shadow: 0 0 6px $uni-border-color;
		border-radius:$uni-border-radius-lg;
		padding: $uni-spacing-col-base  $uni-spacing-row-base ;
		margin-bottom: $uni-spacing-row-base;
		
		.pic {
			height:200rpx;
			display: block;
			margin: 0 auto;//块级元素水平居中
		}
		.text_detail{
			margin:$uni-spacing-col-base 0;
			.txt{
				display: block;
				white-space: nowrap;
				text-overflow: ellipsis;
				font-size:$uni-font-size-sm ;
				color: $uni-text-color-grey;
			}
			.text_down {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top:$uni-spacing-row-sm;
				.txt {				
						font-size: $uni-font-size-sm;
						color: $xz-theme ;	
						font-weight: bold;				
				}
				.link {
					
					color: $uni-text-color-inverse;
					font-size:$uni-font-size-sm;
					border-radius: $uni-border-radius-lg;
					background-color: $uni-color-primary;
					padding: 0 $uni-spacing-row-base;
					margin: 0;
				}
				
		}//.text_down
		
	}//.text_detail
}
}


</style>