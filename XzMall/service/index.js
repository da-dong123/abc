// 对服务器端的API及访问技术进行二次封装
//服务器基础地址
export let base='https://web.codeboy.com/xuezi/';

// POST请求公共选项-仅供当前模块内部使用
let postOptions ={
	method :'POST',
	header:{
		'Content-Type':'application/x-www-form-urlencoded'
	}
}

/** 文档注释
 * API-1.1  商品列表
 * 接口地址:data/product/list.php
 * 请求方式:GET 
 * 请求示例 :data/product/list.php/list.php?pno=1&kw=Apple
 */
export let  productList= async ({pno=1,kw=""})=>{
	let requestUrl=base+`data/product/list.php?pno=${pno}&kw=${kw}`;
	uni.showLoading({
					title: '列表加载中'
						});
	let result= await uni.request({
		url:requestUrl
	});
	uni.hideLoading();
console.log("这是商品列表 result[1].data",result[1].data);
	return result[1].data;
	
}

/* API-1.2  商品详情
接口地址: data/product/details.php
请求方式:GET
请求示例 :data/product/details.php?lid=2*/
 export let productDetails =  async (lid=1)=>{
	let  detailsUrl=base+`data/product/details.php?lid=${lid}`;
	 uni.showLoading({
	 				title: '加载中'
	 					});
	let [err,res] =  await uni.request({
		url:detailsUrl
	});	
	uni.hideLoading();
	return res.data;
 }
 
 /* API-1.5  首页数据
 接口地址: data/product/index.php
 请求方式:GET
 请求示例 :data/product/index.php*/
  export let productIndex =  async ()=>{
 	let  url=base+'data/product/index.php';
 	 uni.showLoading({
 	 				title: '首页加载中'
 	 					});
 	let [err,res] =  await uni.request({
 		url
 	});	
 	uni.hideLoading();
 	return res.data;
  }
  
  /* API-1.6  品牌列表
  接口地址: data/product/brand.php
  请求方式:GET
  请求示例 :data/product/brand.php*/
   export let productBrand =  async ()=>{
  	let  url=base+'data/product/brand.php';
  	 uni.showLoading({
  	 				title: '列表加载中'
  	 					});
  	let [err,res] =  await uni.request({
  		url
  	});	
  	uni.hideLoading();
  	return res.data;
   }
   
   /* API-1.7  商品分类
   接口地址: data/product/category.php
   请求方式:GET
   请求示例 :data/product/category.php*/
    export let productcategory =  async ()=>{
   	let  url=base+'data/product/category.php';
   	 uni.showLoading({
   	 				title: '数据加载中'
   	 					});
   	let [err,res] =  await uni.request({
   		url
   	});	
   	uni.hideLoading();
   	return res.data;
    }
	
	/* API-2.1  用户注册
	接口地址: data/user/register.php
	请求方式:post
	请求示例 :data/user/register.php*/
	 export let register =  async (uname,upwd,email,phone)=>{
		let  url=base+'data/user/register.php';
		 uni.showLoading({
		 				title: '注册加载中'
		 					});
		let [err,res] =  await uni.request({
			url,
			data:{
				uname,
				upwd,
				email,
				phone
			},
			...postOptions,
			
			
		});	
		uni.hideLoading();
		return res.data;
	 }
	 
	 /* API-2.1  用户登录
	 接口地址: data/user/login.php
	 请求方式:post
	 请求示例 :data/user/login.php*/
	  export let login =  async (uname,upwd)=>{
	 	let  url=base+'data/user/login.php';
	 	 uni.showLoading({
	 	 				title: '首页加载中'
	 	 					});
	 	let [err,res] =  await uni.request({
	 		url,
	 		data:{
	 			uname,
	 			upwd,	
	 		},
	 		...postOptions,
	 		
	 		
	 	});	
	 	uni.hideLoading();
	 	return res;
	  }
	  
	  
	  /* API-2.3  当前登录用户基础信息
	  接口地址: data/user/get_basic.php
	  请求方式:GET
	  请求示例 :data/user/get_basic.php*/
	   export let userBasic =  async ()=>{
	  	let  url=base+'data/user/get_basic.php';
	  	 uni.showLoading({
	  	 				title: '获取加载中'
	  	 					});
	  	let [err,res] =  await uni.request({
	  		url,
			header:{//修改请求消息的头部
				authorization: uni.getStorageSync("userToken"),//客户端提交给服务器的身份认证信息
			},
	  			  		
	  	});	
	  	uni.hideLoading();
	  	return res;
	   }
	   
	   // API-2.13、退出登录
	   // 接口地址：data/user/logout.php
	   // 返回格式：JSON
	   // 请求方式：GET
       //此处需要添加给服务器当前登录用户身份信息
	   export let userLogout =  async ()=>{
		   let  url=base+'data/user/logout.php';
		    uni.showLoading({
		    				title: '退出中'
		    					});
		   let [err,res] =  await uni.request({
		   	url,
			header:{//修改请求消息的头部
				authorization: uni.getStorageSync("userToken"),//客户端提交给服务器的身份认证信息
			},
		   		  		
		   });	
		   uni.hideLoading();
		   return res;
	   }
	   	  	
			
// 3.1、添加购物车购买项
// 接口地址：data/cart/add.php
// 返回格式：JSON
// 请求方式：GET
// 请求头部：authorization: TOKEN
// 请求示例：data/cart/add.php?lid=1&buyCount=5

export let cartData= async (lid,buyCount)=>{
	let  url=base+`data/cart/add.php?lid=${lid}&buyCount=${buyCount}`;
	uni.showLoading({
	 				title: '退出中'
	 					});
	let [err,res] =  await uni.request({
		url,
			  		
	});	
	uni.hideLoading();
	return res;
}

// 3.2、购物车项列表
// 接口地址：data/cart/list.php
// 返回格式：JSON
// 请求方式：GET
// 请求示例：data/cart/list.php
// 请求头部：authorization: TOKEN

export let cartList=async ()=>{
	let  url=base+'data/user/logout.php';
	 uni.showLoading({
	 				title: '查询中'
	 					});
	let [err,res] =  await uni.request({
		url,
			  		
	});	
	uni.hideLoading();
	return res;
}

// 3.3、删除购物车项
// 接口地址：data/cart/delete.php
// 返回格式：JSON
// 请求方式：GET
// 请求示例：data/cart/delete.php?iid=2
// 请求头部：authorization: TOKEN
export let cartDelete=async (iid)=>{
	let  url=base+`data/cart/delete.php?iid=${iid}`;
	 uni.showLoading({
	 				title: '删除中'
	 					});
	let [err,res] =  await uni.request({
		url,
			  		
	});	
	uni.hideLoading();
	return res;
}

// 3.4、修改购物车条目中的购买数量
// 接口地址：data/cart/update_count.php
// 返回格式：JSON
// 请求方式：GET
// 请求示例：data/cart/update_count.php?iid=1&count=2
// 请求头部：authorization: TOKEN
export let cartUpdatecount=async (iid,count)=>{
	let  url=base+`data/cart/update_count.php?iid=${iid}&count=${count}`;
	 uni.showLoading({
	 				title: '更新中'
	 					});
	let [err,res] =  await uni.request({
		url,
			  		
	});	
	uni.hideLoading();
	return res;
}

/**
 * 3.5、修改购物车条目中的是否勾选
 * 接口地址：data/cart/update_checked.php
 * 返回格式：JSON
 * 请求方式：GET
 * 请求示例：data/cart/update_checked.php?iid=1&checked=1
 * 请求头部：authorization: TOKEN
 */



/**  **/
export let cartUpdatacheck=async (iid,checked)=>{
	let  url=base+`data/cart/update_checked.php?iid=${iid}&checked=${checked}`;
	 uni.showLoading({
	 				title: '加载中'
	 					});
	let [err,res] =  await uni.request({
		url,
			  		
	});	
	uni.hideLoading();
	return res;
}



