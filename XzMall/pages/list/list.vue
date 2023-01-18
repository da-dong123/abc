<template>

		<view class="scroll-Y" >
			
		
			<!-- <scroll-view  :scroll-y="true" class="scroll-Y" :show-scrollbar="true"  :style="{height:winHeight+'px'}" > -->
				
				
					<!-- <view class="product-list" v-for="(item,i) in brandList" :key="i" >
						<view class="text-left">
							<image class="img" :src="$base+item.pic" mode="widthFix"></image>
						</view>
						
						<view class="text-right" >
						<text class="txt1" >{{item.title}}</text>	
						<text class="txt2">{{item.price}}</text>
						<view class="txt-down">
						<text class="txt4"  v-if="item.is_onsale==='1'">促销</text>	<text class="txt3">{{item.sold_count}}条热销评论 好评率100%</text>
						</view>
						
						</view>
					</view>
						<view class="bottom">
							<text class="txt">没有更多数据了</text>
						</view> -->
						<uni-list  >
							<uni-list-item class="product-list" 
							v-for="(item,i) in brandList"
							 :key="i"  
							 clickable 
							 :to="`/pages/details/details?lid=${item.lid}`" >
								<view class="text-left"  slot="header">
									<image class="img" :src="$base+item.pic" mode="widthFix"></image>
								</view>
								<view class="text-right" slot="body">
								<text class="txt1" >{{item.title}}</text>	
								<text class="txt2">{{item.price}}</text>
								<view class="txt-down">
								<text class="txt4"  v-if="item.is_onsale==='1'">促销</text>	<text class="txt3">{{item.sold_count}}条热销评论 好评率100%</text>
								</view>								
								</view><!-- text-right -->	
							</uni-list-item>	
							
						</uni-list>	
						
						<uni-load-more :status="isLoading?'loading':(pageNum>=pageCount?'no-more':'more')  "></uni-load-more>
						<!-- </scroll-view> -->
		
	</view>
	

</template>

<script>
import { productList } from '@/service';

	export default {
		data() {
			return {
				title:"",
				isSale:"",
				brandList:[],//商品列表
				winHeight:"",
				pageCount:999,//总页数
				pageNum:0,//当前加载页
				kw:"",
				isLoading:false,//当前正在加载中吗？必须上一次加载完成再进行下一次
				status:"",
			}
		},
		methods: {
		async	loadNextPageData(){
				//1.如果当前正在加载中，或者没有更多数据，则退出
				if(this.isLoading || this.pageNum>=this.pageCount){
					
					return
				};
				//2.当前数据正在加载中，这样防止用户再下拉刷新时，即执行该函数，数据加载
				this.isLoading=true;
				
				//3.开始发送商品列表请求，请求完成后再把isLoading的值等于false，这样方可进行下一轮数据的加载
			let {pno,pageCount,data}= await productList({pno:this.pageNum+1,kw:this.kw});
			//4.新数据拼接在老的数据之后
			this.pageNum=pno;
			this.pageCount=pageCount;
			this.brandList=[...this.brandList,...data];
			console.log("这是品牌列表",this.brandList);
			//5.数据加载完成后，方可再进行下一次数据加载
			this.isLoading=false;
			}
		},
	onLoad({kw,bname}) {
		//调用这个loadNextPageData() 情形1，开始加载时
		console.log("这是url传参",kw);
		this.kw=kw;  
		this.loadNextPageData();
		
		
		let {windowHeight}= uni.getWindowInfo();
		this.winHeight=windowHeight;

		},
		onReady() {
		var that =this;
		//监听getDataFromOpener事件
			uni.$on('getDataFromOpener', (data)=>{
				this.pno=data.lid;
				this.kw=data.bname;
				this.title=data.bname;
				uni.setNavigationBarTitle({
					title: this.title+'馆',
				});	 

			});
			//触发send事件
				uni.$emit("send");
		},
		//下拉刷新生命周期
		onPullDownRefresh() {
			//1.清除当前已经加载到的数据和状态
			this.brandList=[]; //加载的商品清空
			this.pageNum=0; //加载到的页号重新变成0
			//2.加载下一页，情形3-页面顶部下拉刷新
			this.loadNextPageData();
			
			//3.定时器，停止下拉刷新
			uni.stopPullDownRefresh();
				// setTimeout(function () {
				// 		uni.stopPullDownRefresh();
				// 	}, 1000);
					
		},
		
		onUnload() {
			//在页面卸载，移除监听器
			uni.$off('getDataFromOpener');
			uni.$off('send');
		},
		
		onReachBottom(){
			//加载下一页，调用这个函数的情形2-滚动到页面底部，距离底部多少距离触发
			this.loadNextPageData();
			
		},
		
	}
</script>

<style lang="scss" scoped>
	.scroll-Y {
		
		border-bottom: $uni-border-style  $uni-border-width $uni-border-color;
.product-list {
	
	display: flex;
	border-bottom: $uni-border-style  $uni-border-width $uni-border-color;

	.text-left {
		 width: 60%;
		.img {
			width: 100%;
			margin-left: -10rpx;
			// margin-right: $uni-spacing-row-sm;
			
		}
	}
	
	.text-right {
		
		display: flex;
		flex-direction: column;
		.txt1{
			
			display: -webkit-box;//元素显示的模式为：webkit内核专用的盒子
			-webkit-box-orient: vertical;//盒子内容排列方向为数值
			-webkit-line-clamp: 2;//盒子中行的数量固定为2
			overflow: hidden;//隐藏溢出
			text-overflow: ellipsis;//溢出用...代替
			
			font-size: $uni-font-size-base;
			padding: 2px;
		}
		.txt2 {
			color: $xz-theme;
			font-size: $uni-font-size-base;
		}
		.txt-down {
			display: flex;
			
			.txt4 {
				color: white;
				background-color: red;
				padding: 2px;
				font-size: $uni-font-size-sm;
			}
			.txt3 {
				color: $uni-text-color-grey;
				font-size: $uni-font-size-sm;
			}
		}
		
	}
}
.bottom {
	text-align: center;
	font-size: $uni-font-size-lg;
	color:$uni-text-color-grey ;
	padding: 20rpx;
	
}
}
</style>
