<template>
	<view class="container">
<!-- F1:顶部搜索条 -->
	<view class="search_header">	
		<uni-icons type="bars" size="30" color="#fff"  @click="openDrawer('showLeft')"></uni-icons>
		<view class="input_group">			
		<input type="text" disabled  placeholder-class="input-placeholder" placeholder="请输入商品关键字"
		confirm-type="search" @click="toSearchList">	
		<image src="../../static/img/logo-s.png" mode=""></image>
		<uni-icons class="search_icon"  color="#999"  type="search" size="30"></uni-icons>
		</view>
		<navigator url="/pages/userCenter/userCenter?section=login">登录</navigator>
	</view>
	<!-- F2:轮播广告 -->
	<!-- 轮播图 -->
		<view class="uni-margin-wrap">
				<swiper class="swiper"  circular  :indicator-dots="true" :autoplay="true"  :interval="2000"
				:duration="500" >
					<swiper-item  v-for="(item,index) in swiperList"  :key="item.cid">
						<view class="swiper-item "   >
					     <image :src="$base+item.img" @click="linkTo"  data-letter="${item.href}"   mode="widthFix"></image>
						</view>
					</swiper-item>
				
				</swiper>
			</view>
			<!-- uni-margin-wrap -->


<!-- F3:首页推荐 -->

<XzProductFloor title="首页推荐 /1F" :productList="recommendedItems"></XzProductFloor>
<XzProductFloor title="最新上架 /2F" :productList="newArrivalItems"></XzProductFloor>
<!-- F5:热销单品 -->
<XzProductFloor title="最新上架 /3F" :productList="topSaleItems"></XzProductFloor>
<!-- F6:页尾 -->
<XzFooter></XzFooter>
<!-- F7:返回顶部 -->
<XzGoTop ></XzGoTop>
<!-- F8：从页面侧面画出抽屉导航 -->
<uni-drawer ref="showLeft" mode="left">
	<view style="padding:30rpx;">
   <uni-list>
	<uni-list-item title="首页" clickable  note="" thumb="../../static/img/home_active.png" link="switchTab" to="/pages/index/index"  @click="$refs.showLeft.close()"></uni-list-item
	   thumbSize="medium"  > 
   	<uni-list-item title="品牌馆" clickable  note="" thumb="../../static/img/brand_active.png" link="switchTab" to="/pages/brands/brands"  @click="onClick"></uni-list-item
	thumbSize="medium"  > 
   	<uni-list-item title="商品分类" clickable  note="" thumb="../../static/img/category_active.png" link="switchTab" to="/pages/category/category" @click="onClick"></uni-list-item>
	<uni-list-item title="个人中心" note=""  clickable  thumb="../../static/img/user_active.png" link="switchTab"  to="/pages/userCenter/userCenter" @click="onClick"></uni-list-item>
		<uni-list-item title="商品搜索" clickable  note="" thumb="../../static/img/category_active.png" link="navigateTo" to="/pages/search/search" @click="onClick"></uni-list-item>
		<uni-list-item title="商品列表" clickable  note="" thumb="../../static/img/category_active.png" link="navigateTo" to="/pages/list/list" @click="onClick"></uni-list-item>	
		<uni-list-item  v-if="!token" title="登录" clickable  note="" thumb="../../static/img/category_active.png" link="switchTab" to="/pages/userCenter/userCenter" @click="onClick('login')"></uni-list-item>
		<uni-list-item  v-if="!token" title="注册" clickable  note="" thumb="../../static/img/category_active.png" link="switchTab" to="/pages/userCenter/userCenter" @click="onClick('register')"></uni-list-item>
		<uni-list-item title="我的" clickable  note="" thumb="../../static/img/category_active.png" link="switchTab" to="/pages/userCenter/userCenter" @click="onClick('profile')"></uni-list-item>
   </uni-list>
		<button @click="$refs.showLeft.close()">关闭drawer</button>
	</view>
</uni-drawer>
</view>
</template>

<script>
	
	// 导入数据API的二次封装模块
	import {productList,productDetails,productIndex,login,userBasic,base} from '@/service/index.js'
	
	export default {
		data(){
			return {
				showLeft:false,
				swiperList:[],//轮播广告条目
				newArrivalItems:[],//新品上市条目
				recommendedItems:[],//首页推荐条目
				topSaleItems:[],//热销单品条目
				token:"",
				$base:base,
				
				 
			}
		},
		methods:{
			openDrawer(e) {
				console.log("这是参数e",e);//showLeft
				       this.$refs[e].open();//$refs是一个对象，包括该组件的dom元素和组件实例，通过ref注册，
					   // console.log(("这是this.$refs",this.$refs));//{showLeft:VueComponent}
					    // console.log("这是drawer组件",this.$refs.showLeft);//等同于this.$refs[e]
						},
			onClick(e){
				console.log('即将跳转到某个页面', e);
				
				 uni.setStorageSync("userCenterSection",e);            
			
			},
			toSearchList(){
				uni.navigateTo({
					url:'/pages/search/search',
					
				});				
			},
			linkTo(e){
				console.log(e.target.dataset);
			}
					
		},
		//生命周期方法-页面加载时
	async onLoad() {

		let resultDetails=await productDetails(); 	
		// console.log("这是productDetails的返回值的await",resultDetails);
		let resultIndex=await productIndex(); 
			console.log("这是productIndex的返回值的await",resultIndex);
			this.swiperList=resultIndex.carouselItems;
			this.newArrivalItems=resultIndex.newArrivalItems;
			this.recommendedItems=resultIndex.recommendedItems;
	        this.topSaleItems=resultIndex.topSaleItems;
		
			


	},
	onShow() {
		this.token=uni.getStorageSync("userToken");
	},
	   }
	
	
</script>

<style scoped lang="scss">
	
	//轮播图
		.uni-margin-wrap{
			margin-left: $uni-spacing-row-base;
			margin-right: $uni-spacing-row-base;
			margin-bottom: $uni-spacing-col-base;
		}
	.uni-margin-wrap .swiper{
		height: 150px;
	}
	.swiper-item image {
		width: 100%;
		border-radius: 12px;
	}
.container {
	background-image: linear-gradient(180deg,$xz-theme 50rpx,$uni-bg-color 250rpx);
	.search_header {
		display: flex;
		
		align-items: center;
		padding: $uni-spacing-col-lg*2 $uni-spacing-row-sm*2 $uni-spacing-col-lg $uni-spacing-row-sm*2 ;
		/* #ifdef H5 */
		padding-top:$uni-spacing-col-lg;
		/* #endif */
		
		navigator {
					 font-size: $uni-font-size-base;
					color:$uni-text-color-inverse ;
		} 
	.input_group {
		position: relative;
		flex: 1;
		margin: $uni-spacing-row-base;	
		
		input {
			background-color: $uni-text-color-inverse;
			border-radius: 24px;
			height: 70rpx;
			text-align: center;
		   font-size: $uni-font-size-base;	
	
		}
		image {
			position: absolute;
			width: 45rpx;
			height:45rpx;  
			top:50%;
		    transform: translateY(-50%);
			left:15px;
		}
		.search_icon {
		position: absolute;
	    right: 15px;
	    top:50%;
	    transform: translateY(-50%);
		}  
		
		}//.input_group	
	}//.search_header
}


</style>