<template>
	<view class="productDetail">
		<!-- 1.面包屑标题 -->
		<!-- 官方指定的面包屑组件不能指定跳转的方式，所以需要自己自定义一个组件 -->
		<XzBddreadcrumb separator=">"  :list="pathList"></XzBddreadcrumb>
	<!--2.轮播图  -->  
	  <view class="uni-swiper">
	  			<swiper class="swiper" :circular="true"  :indicator-dots="true"  :autoplay="true" >
	  				<swiper-item v-for="(item,i) in picList" :key="i">
						<image class="img" :src="$base+item.md" ></image>
	  				</swiper-item>
	  			
	  			</swiper>
	  		</view> <!-- uni-swiper -->
			<!-- 3.商品描述 -->
	<view class="textDetail">
			 <!-- 3.1 标题 -->
		 	<view class="detailProduct">
				<text class="txt1">{{product.title}}</text>
				<text class="txt2">{{product.subtitle}}</text>
			</view>
			<!-- 3.2价格 -->
			<view class="saleDetail">
				<text class="txt">学员售价：￥{{product.price}}</text>
				<text class="txt">服务承诺：{{product.promise}}</text>
			</view>
			<!-- 3.3客服规格数量按钮 -->
			<view class="buyDetail">
				<view class="kf">
					<text class="txt1">客服:</text> 
					<navigator class="txt2">联系客服</navigator>	
				</view>
				
				<view class="guige">
					<text class="txt">规格:</text>					
					<view class="spec">
					<view class="item"  :class="itemIndex==i?'item1':'' "  :data-index="i" :data-lid="product.lid"   v-for="(item,i) in family.laptopList" :key="i"  @click="choose" >{{item.spec}}</view> 
					  </view>
					    </view><!-- guige -->
						
					<view class="sl">
					<text class="txt">数量:</text>	
					<uni-number-box  @change="changeValue" v-model="numberValue"  ></uni-number-box>
					</view> <!-- sl -->
			</view><!-- buyDetail -->
			<!-- 3.4按钮 -->
			<view class="bt">
				<button class="bt1" size="mini">立即购买</button>
				<button class="bt2" size="mini" type="primary"> <uni-icons type="cart" size="15" color="#fff"></uni-icons>加入购物车</button>
			    <button  class="bt3" size="mini"  type="primary"><uni-icons type="heart" size="15" color="#fff"   ></uni-icons>收藏</button>
			</view><!-- bt -->
		 </view> <!-- textDetail -->
	<!-- 4.为你推荐 -->
	<view class="recommendation">
		<text class="txt">为您推荐</text>
		<scroll-view class="scroll-view_H" scroll-x="true"  >
						<view class="item"  v-for="(item,i) in picList" :key="i"    >
							<image  class="img" :src="$base+item.sm" mode="widthFix"   
							:data-lid="item.laptop_id" @click="toDetail" ></image>
							<text class="txt">{{product.lname}}</text>
						</view>
						<view class="item"  v-for="(item,i) in picList"  >
							<image  class="img" :src="$base+item.sm" mode="widthFix" ></image>
							<text class="txt">{{product.lname}}</text>
						</view>
						<view class="item"  v-for="(item,i) in picList"  >
							<image  class="img" :src="$base+item.sm" mode="widthFix" ></image>
							<text class="txt">{{product.lname}}</text>
						</view>
						</scroll-view>
	</view><!-- recommendation -->
	<!--5. 商品详情 -->
	<view class="details">
		<text class="txt">商品详情</text>
		<view class="detail_img">
			<image class="img1" src="https://web.codeboy.com/xuezi/img/product/detail/58d87221Na033954c.jpg" mode="widthFix"></image>
			<image class="img2" src="https://web.codeboy.com/xuezi/img/product/detail/58e5e4b5N862f8aa1.jpg" mode="widthFix"></image>
			<image  class="img3" src="https://web.codeboy.com/xuezi/img/product/detail/57bfa672N20953b71.jpg" mode="widthFix"></image>
		</view>
	</view>
	</view>
</template>

<script>
import { productDetails,base } from '../../service';

	export default {
		data() {
			return {
				$base:base,
				lid:"",
				itemName:"",
			    picList:[],
				product:{},//查询到的商品详情
				family:{},//当前商品所在的型号，即家族信息
				numberValue:"1",
				contentText:{contentDefault: '收藏',contentFav: '已收藏'},
				itemIndex:"",//当前规格型号的索引
				imageList:[],
				pathList:[
					{pid:10,pathName:"首页",href:"/pages/index/index",openType:"switchTab"},
					{pid:11,pathName:"商品列表",href:"/pages/list/list",openType:"navigate"},
					{pid:12,pathName:"商品详情",href:"/pages/details/details",openType:"reLaunch"},
					]
			}
		},
		methods: {
			//点击规格跳到详情页
		async	choose(e){
				let {fid,fname,laptopList}=this.family
				this.itemIndex=e.currentTarget.dataset.index;
			let itemlid= laptopList[this.itemIndex].lid;
			console.log(itemlid);
			  //   uni.navigateTo({
			  //   	url:  "/pages/details/details?lid="+itemlid,
					// success(res) {
					// 	console.log("这是接口调用成功的res",res);
					// }
			  //   });
				let result1= await productDetails(itemlid);
				console.log("这是跳转的",result1);
				this.product={...result1.product};
				this.family={...result1.family};
				this.picList={...this.product.picList};
			},
			changeValue(e){
				console.log(e);
			},
			toDetail(e){
				
			let lid=e.currentTarget.dataset.lid;
			uni.navigateTo({
				url:'/pages/details/details?lid='+lid,
			async success(res) {
				var that=this;
					//获取详情页响应信息
				let result1=  await	productDetails(lid);
				that.product={...result1.product};
				that.family={...result1.family};
				that.picList=[...that.product.picList];
				//面包屑标题
				that.itemName=that.family.fname;
				//更新标题
				  uni.setNavigationBarTitle({
				  	title:that.family.fname ,
				  });	
				}
			});	
			},//toDetail
			
		},
	async onLoad(option) {
			console.log("这是从某个页面传过来的数据",option);
			//如果从首页或者列表页跳转过来，没有带option即option不存在，则销毁当前页跳转到列表页，当然在实际情形是不存在的，只是在测试阶段。
			if(JSON.stringify(option)==='{}'){
				
				uni.redirectTo({
					url:'/pages/list/list',
				});
				
				return
				}
			else {
				//这是首页查看详情传回来的商品编号pid
				console.log("这是详情页pid",option.lid);
				//如果有lid,否则把上一页的参数即在详情页加载时获取到的option中的商品编号Lid追加到面包屑中跳转的路径后面
				
				this.pathList[2].href+="?lid="+option.lid;
				
			}
				//这是从搜索页传来的数据	option.lid,如果从首页查看详情传过来的是pid
				console.log("这是option.lid",option.lid);
			this.lid=option.lid;
			
			console.log("这是this.lid",this.lid);		
			let result= await productDetails(this.lid);
			console.log("这是详情页的数据",result);
		var {product,family}=result;
		
	    uni.$emit('clickList',option.title);
		this.product={...product};//商品本身的信息
		this.family={...family};//商品型号信息
		this.picList=[...product.picList];
		console.log("产品",this.product);
		//面包屑标题
		this.itemName=family.fname;
		//更新标题
		  uni.setNavigationBarTitle({
		  	title:family.fname ,
		  });	
		   
		},
	}
</script>

<style lang="scss" scoped>
 .productDetail {
	 // 导航
	 
	 //轮播图
	 .uni-swiper {
		 width: 100%;
		  height: 350px;
		
		 .swiper {
			background-color: yellowgreen;
			 width: 100%; 
			 height: 350px;
			 .img {
				 width: 100%;
				 height: 100%;
			 }
		 }
		 }//uni-swiper 
		 .textDetail {
		
			 .detailProduct {
				 	  padding: 20rpx;
				 background-color:$uni-text-color-inverse;
				 .txt1 {
					 margin-bottom: 20rpx;
					 display: block;
				 }
				 .txt2 {
					  display: block;
					 font-size: $uni-font-size-sm;
					 color: $uni-text-color-grey;
					 
				 }
				 
			 }//detailProduct
			 .saleDetail {
				 display: flex;
				 flex-direction: column;
				 background-color: $uni-bg-color-grey;
				 padding: 20rpx;
				 .txt {
					 display: block;
					 margin-bottom: 5rpx;
					 font-size: $uni-font-size-base;
				 }
			 }//saleDetail
			 .buyDetail {
				 display: flex;
				 flex-direction: column;
				
				background-color:$uni-text-color-inverse ;
				padding: 20rpx;
				.kf {
					display: flex;
					 justify-content: flex-start;
					 .txt1 {
						 display: block;
						 margin-right:$uni-spacing-row-base;
					 }
				}
				.guige {
					display: flex;
					 justify-content: flex-start;
					 margin-top: $uni-spacing-col-sm;
					 .txt {
					 display: block;
					  margin-right:$uni-spacing-row-base;
					 }
					 .spec {
					.item {
						text-align: center;
						border-radius: $uni-border-radius-base;
						border: $uni-border-style  $uni-border-color $uni-border-width;
						margin-bottom: $uni-spacing-col-sm;
					}
						  .item1 {
							  text-align: center;
							  color: $xz-theme;
							  border-radius: $uni-border-radius-base;
							  border: $uni-border-style $xz-theme $uni-border-width;
							  margin-bottom: $uni-spacing-col-sm;
						  }
					 }//spec
				}
				.sl {
					display: flex;
					 justify-content: flex-start;
					  margin-top: $uni-spacing-col-sm;
					 .txt {
			            display: block;
						 margin-right:$uni-spacing-row-base;
					 }
				}
				
			 }//buyDetail
	    .bt {
            padding: 0 20rpx;
			.bt1{
              
			
			}
			.bt2 {
		margin-left: $uni-spacing-row-base;
		height: 29.9px;
			}
		.bt3 {
		margin-left: $uni-spacing-row-base;
        height: 29.9px;
		}
			
		}//button
		
	 }//textDetail
	.recommendation {
		width: 100%;
	
			.scroll-view_H {
			
			     height: 150px;
				white-space: nowrap;
				.item {
					width:30%;
				     display: inline-block;
					 margin-right: $uni-spacing-row-base;
					.img {
						width: 100%;
					}
					.txt {
						font-size: $uni-font-size-sm;
						text-align: start;
					}
				}
			}
	
		.txt {
			display: block;
			border-top: $uni-border-style  $uni-border-color $uni-border-width;
			border-bottom: $uni-border-style  $uni-border-color $uni-border-width;
			padding:   $uni-spacing-col-base  $uni-spacing-row-base ;
			font-size: $uni-font-size-base;
		}


	

		
	} //recommendation
	.details{
		.txt {
			display: block;
			border-top: $uni-border-style  $uni-border-color $uni-border-width;
			border-bottom: $uni-border-style  $uni-border-color $uni-border-width;
			padding:   $uni-spacing-col-base  $uni-spacing-row-base ;
			font-size: $uni-font-size-base;
		}
		.detail_img {
			text-align: center;
			margin-top: $uni-spacing-col-base;
			.img1{
				// height: 3500px;
			}
			.img2 {
				
			}
			.img3 {
				
			}
		}
	}
 }
</style>
