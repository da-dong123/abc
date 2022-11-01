var city= require('../../libs/city');
Page({
    data: {
        cityData: {},
        
        _py: ["hot", "A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"],
        //搜索列表
  
        hidden: true,
        showPy: '★',
  
    },
    onLoad: function() {
      this.setData({
        cityData:city.all
      });
    },

    //获取文字信息
    getPy: function(e) {
        this.setData({
            hidden: false,
            showPy: e.target.id,
            scrollTopId: this.data.showPy=="★"?"hot":this.data.showPy
        });
        console.log(this.data.scrollTopId)
    }
})