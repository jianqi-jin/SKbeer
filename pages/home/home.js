// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [
      {
        thumb: ''
      }
    ],
    navBtnList: [
      {
        url: '',
        img: '',
        title: '首页',
        havT: true
      }, {
        url: '',
        img: '',
        title: '推荐有奖',
        havT: false
      }, {
        url: '',
        img: '',
        title: '推荐有奖',
        havT: false
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfo();
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff'
    })
    wx.setNavigationBarTitle({
      title: '森客啤酒'
    })
  },
  getInfo(){
    let that = this;
    wx.request({
      url: 'https://oa.yika.co/app/ewei_shopv2_api.php?i=46&r=senke.index.index',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res)
        that.setData({
          imgList: res.data.goods_list
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }
  
})