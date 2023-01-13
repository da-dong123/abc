<template>
	<view class="search">
		<!-- 搜索框 -->
	<view class="search_header">
 <uni-icons type="back" color="#fff" size="20" @click="clickBack"></uni-icons>
	<uni-search-bar class="searchbar"  v-model="strValue"  cancelButton="none" placeholder="请输入商品名称关键字"  bgColor="#fff" placeholder-class="searchText" 
	 @confirm="doConfirm" @input="inputValue" />	
	</view>
	<!-- 搜索下拉框 -->
	<text class="no-data" v-show="shownoData"> 没查询到相关商品</text>
	<view class="productList" :hidden="!showList">
			
		 <uni-list>
		 	<uni-list-item   v-for="(item,i) in detailList" :key="i"  :title="item.title"  :thumb="$base+item.pic"
		 	 thumb-size="mini" ellipsis=1  :clickable="true"  link   :to="`/pages/details/details?lid=${item.lid}&title=${item.title}`" 
			 ></uni-list-item>
		</uni-list>
		
	</view>
	<!-- 热门搜索 -->

	<view class="card">
	<uni-card title="热门搜索"   isFull   note="Tips" >
		<uni-tag class="tag" text="神州" size="mini" :circle="true" type="success"  @click="strValue='神州'" />
		<uni-tag class="tag" text="Apple" type="primary"   size="mini" :circle="true"/>
		<uni-tag class="tag" text="轻薄" type="error"  size="mini" :circle="true" />
		<uni-tag class="tag" text="办公" type="warning"  size="mini" :circle="true" />
		<uni-tag  class="tag"text="联想" type="success"   size="mini" :circle="true"  @click="strValue='联想'"/>
		<uni-tag class="tag" text="Thinkpad" type="primary"   size="mini" :circle="true"/>
		<uni-tag class="tag" text="工作站" type="error"  size="mini" :circle="true"/>
		<uni-tag  class="tag"text="笔记本" type="warning"  size="mini" :circle="true"/>
		<uni-tag class="tag" text="游戏本" type="success"  size="mini" :circle="true"/>
		<uni-tag  class="tag"text="华硕" type="primary"  size="mini" :circle="true" />
		<uni-tag  class="tag"text="雷神Z1000" type="error"  size="mini" :circle="true"/>
		<uni-tag class="tag" text="MacBook" type="warning"  size="mini" :circle="true" />
		<uni-tag class="tag" text="T4100" type="success"  size="mini" :circle="true" />
	</uni-card>

	</view> <!-- card -->	
		
	</view> <!-- search -->
</template>

<script>
import { productList } from '../../service'

	export default {
		data() {
			return {
			
	         historyList:[],
			detailList:[],	//商品列表
			showList:true,//是否显示列表  
			shownoData:false,
			strValue:"",
			kw:"",
			timer:null,//输入防抖定时器
			}
		},
		methods: {
			clickBack(){
				//返回上一页
				uni.navigateBack();
			// uni.switchTab({
			// 	url:"/pages/index/index"
			// })
				
			},
			toDetails(){
				uni.navigateTo({
					url:'/pages/details/details'
				})
			},
		async	goList(data){
				let result=await productList({kw:data});
				//判断是否显示相关商品
				if(result.recordCount>0){
									  this.detailList=[...result.data];
									  this.shownoData=false;
									  this.showList=true;
				} else {
									  this.detailList=[];
									  this.shownoData=true;
									  this.showList=false;
				}
			},
		doConfirm(){
				 let strValue1=this.strValue.trim();//裁剪空白部分
				 if(!strValue1){
					 uni.showToast({
					 	icon:'none',
						title:"搜索框内容不能为空",
						duration:3000,
					 });
					 return;
				 }//if
				this.goList(strValue1);
				 
				
				 
			},
			
			 inputValue(){
				     let strValue1=this.strValue.trim();//裁剪空白部分
					//清除定时器，如果用户还想再输入下一个关键字，但是在上一个输入的字还没有发送请求时，则清除掉 上一个定时器，再重新设置新的定时器，
					//这样做的原因是，用户每输入一个文字则立即发送请求，给服务器造成压力，同时不是用户想要的商品，
					//则需要防抖，即在用户输入一个关键字1秒后再向服务器发送请求，但是用户连续输入第二个字那么，需要清除掉第一个字的发送请求的定时器。这就是防抖。
				 if(this.timer){
					 clearTimeout(this.timer);
				 }
				 
				 if(!strValue1){
					 this.detailList=[];
					 this.showList=false;
					 return
				 }
				 //防抖，在用户输入查询关键字1秒发送列表请求
				 this.timer=setTimeout( ()=>{
					              
					 				
					 				 
					 				this.goList(strValue1);
					 	
					
					 
				 },1000);
				 
				
			},//inputValue
 
		
		},
		
  onHide() {
  
	var that= this;

	uni.$once('clickList',(data)=>{
		//清除缓存数据
		try {
			uni.removeStorageSync('history_record');
		} catch (e) {
			
		}

		let resData=data;
	 //缓存数据	
		try {
			uni.setStorageSync('history_record', resData);
		} catch (e) {
			// error
			console.log("这是缓存失败的e",e);
		}
		//同步获取缓存数据
  const value = uni.getStorageSync('history_record');
 
	that.historyList.push(value);
	 console.log("这是缓存结果historyList",that.historyList);
		
	});
	
	
  }
		
	}
</script>

<style lang="scss" scoped>
	.search{
		.no-data {
			display: block;
			text-align: center;
			margin-top: $uni-spacing-col-base;
		}
.search_header {
	display: flex;
	align-items: center;
	width: 100%;
	height: 88rpx;
	background-color: $xz-theme;
    padding: 0  $uni-spacing-row-base;
	.searchbar{
		border-radius: 24px;
	    flex: 1;	
	}
}

.card {
	margin-top: $uni-spacing-col-lg;
	.tag {
		display: inline-block;
		margin-right: $uni-spacing-row-sm;
		margin-bottom: $uni-spacing-col-sm;
	}
}


 }
</style>
