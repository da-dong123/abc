<template>
	<view class="category">
		<!-- 左边滚动条 -->
	<view class="product_left">
		<scroll-view :scroll-y="true"  :scroll-top="scrollTop" :show-scrollbar="true"  class="scroll-left"  :style="{height:winHeight+'px'}"  >
			<!-- <view  class="item "  :class="i===leftIndex?'item1':'' "  :data-index="i"  :data-kw="item.keywords"  @click="clickTap"  v-for="(item,i) in leftList" :key="i" >
			{{item.cname}}
			
			</view> -->
			<view  class="item "  :style="{backgroundColor:curCategory===i?'#fff':'#f1f1f1'}"   @click="curCategory=i"  v-for="(item,i) in leftList" :key="i" >
			{{item.cname}}
			
			</view>
			<view  class="item "    v-for="(item,i) in leftList" :key="item.cname" >
			{{item.cname}}
			</view>

		</scroll-view>
		
	</view>	 <!--product_left -->
	<!-- 右边列表 -->
	<scroll-view  class="product_right" :scroll-y="true"  :style="{height:winHeight+'px'}">
	<uni-list>
	 	<uni-list-item  v-for="(item,i) in rightList"  :key="i" :title="item.title"  :clickable="true"  :thumb="$base+item.pic"
	 	 thumb-size="sm"  ellipsis="2"  link="navigateTo"  :to="'/pages/details/details?lid='+item.lid"   :showArrow="true"></uni-list-item>
	</uni-list>	
	<text v-show="rightList.length==0">没查到相关商品</text>
	</scroll-view>
	
	</view>
</template>

<script>
import { productcategory,productList,base } from '../../service'
	
	export default {
		data() {
			return {
               scrollTop:0,
			   leftList:[],
			   leftIndex:0,
			   rightList:[],
			   winHeight:0,
			   curCategory:0,
			   $base:base,
			}
		},
		watch:{
		async	curCategory (){
				 let kw= this.leftList[this.curCategory].keywords;
				 let body =await productList({kw:kw});
				 this.rightList=[...body.data];
			}
		},
		methods: {
		// async	clickTap(e){
		// 	console.log("这是e",e);
		// 		  let value =e.currentTarget.dataset.index;
		// 		  let kw=e.currentTarget.dataset.kw;
		// 		this.leftIndex=value;
		// 		let result1= await productList({kw:kw});
		// 		this.rightList=[...result1.data];
				
		// 		console.log("点击左侧滚动条",this.rightList);
		// 		// uni.$emit("getDataFromLeft",this.leftIndex);
				
				
		// 	},
			getDataFromLeft(){
				
			},
		},
	async	onLoad() {
			let result= await productcategory();
			let kw =result[0].keywords
			// console.log("这是商品分类数据",result);
			this.leftList= [...result];
			let result1= await productList({kw:kw});
			// console.log("这是商品详情数据",result1);
			this.rightList=[...result1.data];
			console.log("这是商品详情数据",this.rightList);
			
			let {windowHeight}= uni.getWindowInfo();
			this.winHeight=windowHeight;
			
			
		}
	}
</script>

<style lang="scss" scoped >
	
	.category{
		width: 100%;
		display: flex;
		flex-direction: row;
	
	.product_left {

.scroll-left {
		background-color: #f1f1f1;
		width: 150rpx;

	text-align: center;
	
	.item {	
		height: 70rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: $uni-border-style  $uni-border-width $uni-border-color;	   
	}
	.item1 {
		
		background-color: $uni-text-color-inverse;
		
	}
	}
} //product_left
.product_right{
	flex: 1;
	
}
}
</style>
