<template>
	<view class="brand">
				<uni-grid  class="grid" :column="3" :show-border="true"   :square="true"  @change="change" >
					<uni-grid-item    v-for="(item ,i) in branList"  :index="i" :key="i" >
						<view class="grid-item-box" >
							<image class="image" :src="$base+item.logo"  mode="widthFix" />
							<text class="text">{{item.bname}}</text>
							<view v-if="item.popularity" class="grid-dot">
								<uni-badge :text="item.popularity" type="error"  :max-num="100000"/>
							</view>
						</view>
					</uni-grid-item> 
				</uni-grid>
			</view>
</template>

<script>
import { productBrand } from '../../service';
	
	export default {
		data() {
			return {
				branList:[],
			}
		},
		methods: {
			change(e){
				var that=this;
				// console.log("点击grid",e);
				let lid=e.detail.index+1;
				let bname=this.branList[lid-1].bname;
				var obj={lid:lid,bname:bname};
				//页面间的通讯
				
				uni.$on('send',()=>{					
					uni.$emit("getDataFromOpener",obj);
								
				});
					
				 uni.navigateTo({
				 	url:`/pages/list/list?lid=${lid}&kw=${bname}`,
					success:function(res){
						console.log("这是接口调用成功的响应信息",res);
					},			
				 });
 
			}//change
		},
	async	onLoad() {
		console.log("执行加载...")
		let result= await	productBrand();
		this.branList=[...result];
		console.log("这是branList",this.branList);
		}
	}
</script>

<style lang="scss" scoped>
.brand{

	.grid{
	
	.grid-item-box {
		  
			padding: 0 20rpx;
	        text-align: center;
		     margin-top: 30px;
		   	position: relative;
		   &:active {
			   opacity: 0.6;
		   }
			.image {
				width: 100%;
				
			}
			
			.text {
					font-size: 14px;
					margin-top: 5px;
					text-align: center;
					font-weight: bold;
					color: black;
				}
				.grid-dot {
				
					position: absolute;
					top: -10px;
					right: 5px;
					
				}
		}
}
}
</style>
