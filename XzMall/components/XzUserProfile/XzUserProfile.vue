<template>
	<view>
		<text>这是用户档案</text>
	</view>
</template>

<script>
	export default {
		name:"XzUserProfile",
		data() {
			return {
				
			};
		},
		mounted() {
			console.log("执行了档案页面的挂载");
			uni.setNavigationBarTitle({
					title: '用户档案'
			 	});
		},
	}
</script>

<style>

</style>