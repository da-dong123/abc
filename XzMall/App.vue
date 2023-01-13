<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>
<!-- style标签中如果想使用scss语法和变量，必须声明lang属性 -->
<style lang="scss">
	/*每个页面公共css -样式标准化*/
	//小程序中不支持*选择器
	:not(not){
		//边框盒子/怪异盒子模型：设置的宽度width = 左右border + 左右padding + 内容的宽度
		box-sizing: border-box;
	}
	//浏览器中的元素是body，小程序中的是page，不支持boidy-uni-app在pc应用中会把page转译为body
	page {
		background-color: $uni-bg-color;
		color:$uni-text-color;
		font-size: $uni-font-size-base;
		
	}
</style>
