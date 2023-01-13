<template>
	<view class="go-top">
		<uni-icons type="arrow-up" size="30" color="#666" @click="backTop" ></uni-icons>
	</view>
</template>

<script>
	export default {
		name:"XzGoTop",
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
			
			},
		}

	}
</script>

<style lang="scss">
.go-top {
	position: fixed;
	top:900rpx;
	right: $uni-spacing-row-base;
	background-color: $uni-bg-color-grey;
	border-radius: 50%;
	border:$uni-border-width $uni-border-style  $uni-border-color;
	opacity: .7;//不透明度	
	width: 80rpx;
	height: 80rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	
	&:active {
		opacity: 1;
	}//sass&表示当前元素，当前元素被激活后的样式

	
}

</style>