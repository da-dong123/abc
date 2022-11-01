//引入SDK核心类，js文件根据自己业务，位置可自行放置
var QQMapWX= require('../../libs//qqmap-wx-jssdk');
var qqmapsdk;
var city= require('../../libs/city');
var rightheight = 0;
var touchEndy = 0;//页面增加y坐标属性定义

// index.js页面
Page({
data:{
  startX:0,
  startY:0,
  citySelected:"",
  hotCityData:[],
  cityData:{},
  hidden:true,
  showPy:"★",
  scrollTopId:"",
  cityListShow:false,
  historyListShow:true,
  _py:["hot", "A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"],
  list:[
    {
      title:"中国建设银行",
      address:"南京市秦淮区洪武路188号中国建设银行大厦",
      isTouchMove:false
    },
    {
      title:"天华硅谷",
      address:"南京市浦口区泰冯路天华硅谷庄园",
      isTouchMove:false
    },
  ]
},
// 历史记录
//开始触摸
touchstart(e){
  let list=[...this.data.list];
  //让原先的滑动块都先隐藏
    list.forEach(item=>{
      if(item.isTouchMove){
        item.isTouchMove=false;
      }
    });
  //初始化开始的位置
  this.setData({
    list:list,
    startX:e.touches[0].clientX,
    startY:e.touches[0].clientY
  });
},
//滑动

touchmove(e){
var that=this;
 let moveX=e.changedTouches[0].clientX;//滑动变化x坐标
 let moveY=e.changedTouches[0].clientY;//滑动变化y坐标
 let indexs=e.currentTarget.dataset.indexs;//目标滑动块的index
 let list=[...this.data.list];
 let angle=this.angle({
   X:this.data.startX,
   Y:this.data.startY
},
{
  X:moveX,
  Y:moveY
}
);
// console.log("正切值是："+angle);
list.forEach((item,index)=>{
item.isTouchMove=false;
if(Math.abs(angle)>30){
  return;
};

if(indexs==index){
if (moveX>that.data.startX) {
  //右滑
  item.isTouchMove=false;
}else{
  //左滑
  item.isTouchMove=true;
}
}
});
this.setData({
  list:list
});

},
// 计算滑动角度,   * @param {Object} start 起点坐标, * @param {Object} end 终点坐标
angle(start,end){
var _X=end.X-start.X;
var _Y=end.Y-start.Y;
//返回角度/Math.atan()返回一个数值的反正切（以弧度为单位）
return 360*Math.atan(_Y / _X) / (2*Math.PI);
},
//删除选项
delItem(e){
  var that=this;
  let list=[...this.data.list];
  let indexs=e.currentTarget.dataset.indexs;//目标滑动块的index
  list.forEach((item)=>{
    item.isTouchMove=false;
  });
  that.setData({
    list:list
  });
wx.showModal({
  title:"确认删除吗？",
  success(res){
    if(res.confirm){
    list.splice(indexs,1);
   that.setData({
      list:list
    });
    wx.setStorageSync('list', list)
    }else{
      return;
    }
  },
  fail(err){
console.log(err)
  }
})

},
//清空
clear(){
let list=[...this.data.list ];
list.length=0;
this.setData({
  list:list
});
},

//控制显示城市选择
clickhide(){

this.setData({
  cityListShow: !this.data.cityListShow
})
},

//获取文字信息
getPy(e){
 this.setData({
   showPy: e.currentTarget.dataset.letter,
   hidden:false
 });
 console.log( "getPy:"+this.data.showPy);
},
setPy(){
 this.setData({
   hidden:true,
   scrollTopId:this.data.showPy
  })
 console.log( "setPy:"+this.data.scrollTopId);
 console.log(11);
},

//开始触摸事件
tStart(e){
  touchEndy=e.touches[0].pageY
  this.setData({
    hidden:false
  });

},

//滑动选择城市
tMove(e){
  //  var that=this;
  // var y=e.touches[0].clientY;
  // var offsettop=e.currentTarget.offsetTop;
  // //判断选择的区域
  // if (y>offsettop) {
  //   var num =parseInt((y-offsettop)/12);
  //  this.setData({
  //     showPy: that.data._py[num]
  //   });
  // }
  touchEndy=e.touches[0].pageY;
  var lindex=parseInt(touchEndy/rightheight*27);
  var value= this.data._py[lindex];
 this.setData({
    showPy:value
 });
  console.log("tMOve value:"+value);
  
  },
tEnd(){
var lindex=parseInt(touchEndy/rightheight*27);
var value=this.data._py[lindex];
console.log("tEnd value:"+value);

  this.setData({
    hidden:true,
  });
},
selectCity(e){
  console.log(e);
 var org=e.currentTarget.dataset.orgid;
 var name=e.currentTarget.dataset.orgname;
wx.showToast({
  title: 'org :'+org +'name :'+name,
});
},

//右侧索引表点击事件
// letterclick(e){
//   var that=this;
// var letter=e.currentTarget.dataset.letter;

// this.setData({
//   scrollTopId :letter
// })
// },
/**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
  //实例化API核心类
  qqmapsdk=new QQMapWX({
    key:"2M3BZ-GRAC3-BLR32-3NTIZ-PPTIO-UOBOP"
  });
  this.setData({
    cityData:city.all
  });
  console.log(this.data.cityData);

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
   var that=this;
  //调用获取城市列表接口
  qqmapsdk.getCityList({
    success: function(res,data){
      console.log(data);
     var hotCity=[];
     var hotCity1=[];
      var bj=data.provinceResult[0];
      var sh=data.provinceResult[8];
      var gz=data.cityResult[243];
      var hz=data.cityResult[131];
      var sz=data.cityResult[245];
      var wh=data.cityResult[212];
      var nj=data.cityResult[118];
     hotCity.push(bj,sz,wh,nj,hz,sh,gz);
   that.setData({
      hotCityData:hotCity,
    });
    console.log(that.data.hotCityData)
      //获取热门城市
      

    },
    fail: function(err){
      console.log(err);
    },
    complete: function(res){
      console.log(res);
    }
  });
  

  //调用获取当前城市接口
  qqmapsdk.reverseGeocoder({
    location:"",
    success(res,data){
      console.log(data);
     that.setData({
      citySelected:data.reverseGeocoderResult.address_component.city
     });
     
    },
    fail:function(res){
      console.log(res)
    },
    complete:function(res){
      console.log(res)
    }
  });

  //获取索引表的高度

  var query =wx.createSelectorQuery();//创建节点选择器
  query.select('.city-py').boundingClientRect();
  query.exec(function(res){
 //取高度
 console.log(res[0].height);
rightheight=res[0].height;
  })
  //获取视口宽度

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
