<template>
	<view class="userRegister">
<uni-forms ref="form"  v-model="formData" :rules="rules"  labelWidth="40"  validateTrigger="blur">
	<uni-forms-item label="用户名" name="uname"  labelWidth="60" >
		<uni-easyinput  type="text" v-model="formData.uname" placeholder="请输入用户名" />
	</uni-forms-item>
	<uni-forms-item label="手机号" name="phone"    labelWidth="60" >
				<uni-easyinput  v-model="formData.phone" placeholder="请输入手机号" />
	</uni-forms-item>
	<uni-forms-item label="邮箱" name="email"  labelWidth="60" >
		<uni-easyinput  v-model="formData.email" placeholder="请输入邮箱" />
	</uni-forms-item>
	<uni-forms-item label="密码" name="upwd"  labelWidth="60" >	
		<uni-easyinput  v-model="formData.upwd" placeholder="请输入密码" />
	</uni-forms-item>
	<uni-forms-item label="确认密码" name="reupwd" labelWidth="60"  >
		<uni-easyinput  v-model="formData.reupwd" placeholder="请再次输入密码" />
	</uni-forms-item>
	<button type="primary"  @click="clickrRegister" >立即注册</button>
</uni-forms>
<view @click="goToLogin"> 以后账号？请登录</view>  
		 </view>
</template>

<script>
import { register } from '../../service';

	export default {
		name:"XzRegister",
		data() {
			return {
				formData:{
					phone:"",
					upwd:"",
					uname:"",
					email:"",
					reupwd:"",
				},
				//校验规则
				rules:{
						//用户名校验
						uname:{
							rules:[
								{
									required :true,
									errorMessage:"请输入用户名",
								},
								{
								    minLength:2,
									maxLength: 5,
									errorMessage: '姓名长度在 2到5个字符',
								},
							],
							
					},//uname
					//手机号校验
					phone: {
						rules:[
							{
								required :true,
							errorMessage:"手机号不能为空！",
							},
							
							// {
							// 	pattern:/^(13[0-9]|14[5|7]|15[0-9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
							// 	errorMessage:"手机号不合法！",
							// },
							{
								validateFunction:function(rule,value,data,callback){
									let reg=/^(13[0-9]|14[5|7]|15[0-9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
									let res=reg.test(value);
								if (res==false) {
															callback('请输入正确的手机号')
								}//if
														return true
							},//function
							}//validateFunction
						]//
					},//phone
					email: {
						rules:[
							{
								required :true,
							errorMessage:"邮箱不能为空！",
							},
							
							{
								pattern:/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
								errorMessage:"邮箱不合法！",
							},
							],
							},  //email
							
							
							// {
							// 	validateFunction:function(rule,value,data,callback){
							// 		let reg=/^(13[0-9]|14[5|7]|15[0-9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
							// 		let res=reg.test(value);
							// 	if (res==false) {
							// 								callback('请输入正确的手机号')
							// 	}//if
							// 							return true
							// },//function
							// }//validateFunction		
							upwd: {
								rules:[
									{
										required :true,
									errorMessage:"密码不能为空！",
									},
									
									{
										minLength: 8,
									   pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
									   errorMessage: '长度至少为8,至少含有一个字母和一个数字和一个特殊字符'
										
									},
						],
					},//upwd
					reupwd: {
								rules:[
									{
										required :true,
									errorMessage:"密码不能为空！",
									},
									{
										validateFunction:function(rule,value,data,callback){
											console.log(data);
										if (value!==data.upwd) {
																	callback('密码不一致！')
										}//if
																return true
									},//function
									}//validateFunction			
						],
					},//reupwd
				},//roules
				
				
				} //return
					}, //data
	
			methods:{
			async clickrRegister(){
					this.$refs.form.validate().then( async (res)=>{
						console.log("这是验证成功的消息",res);
						// 成功返回，res 为表单数据
						// 其他逻辑处理 
						// ...
					
						
						
				let result=		await register(res.uname,res.upwd,res.email,res.phone);
					console.log("这是注册返回的结果",result);
				if(result.code==411){
					uni.showToast({
								icon: 'none',
								title: '用户名已存在！',
									});
									return
				}else {
				uni.showToast({
							icon: 'none',
							title: '注册成功！',
								});
				setTimeout()				
				uni.$emit("getDataFromregister","login");	
								
				}
						
						
					}).catch((err)=>{
						// 表单校验验失败，err 为具体错误信息
						// 其他逻辑处理
						// ...
						console.log("这是验证失败的消息",err);
						return
					})
				}, //clickrRegister
				
				  goToLogin(){
					this.$emit("getDataFromlogin","login");
				  }
			},
			
			mounted() {
				console.log("执行了注册页面的挂载");
				uni.setNavigationBarTitle({
						title: '用户注册'
				 	});
			},

		onReady() {
			// 需要在onReady中设置规则
					this.$refs.form.setRules(this.rules);
		},//onReady
	}
</script>

<style>

</style>