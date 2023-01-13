<template>
	<view class="breadcrumb">
		<view class="path" v-for="(item,i) in list" :key="i">
			<navigator :url="item.href" :open-type="item.openType" >{{item.pathName}}</navigator>
				<text v-if="i<list.length-1" class="separator" >{{separator}}</text>
		</view>
	
	</view>
</template>

<script>
	export default {
		name:"Bddreadcrumb",
		props:{
			separator:{
				//自定义属性：分隔符
				type: String,
				required:false,
				default:'/'
			},
			list:{
				//自定义属性：面包屑
				type:Array,
				required:true,//没有默认值
						},
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.breadcrumb {
	
	padding: $uni-spacing-col-base $uni-spacing-row-base  ;
 display: flex;
.path {
	display: flex;
	.separator {
		margin: 0 $uni-spacing-row-sm;
	}
}
	
}
</style>