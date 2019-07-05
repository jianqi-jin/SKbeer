// pages/detail/order/order.js
const app = getApp();
const api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressInfo: {},
    paySuccessFlag: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '确认订单'
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(app.globalData.currentAddress){
      this.setData({
        addressInfo: app.globalData.currentAddress
      })
      app.globalData.currentAddress = null;
    }else{
      this.getDefaultAddress();
    }
  },
  getDefaultAddress() {
    api.getDefalutAdderss(app.globalData.openid).then(res => {
      console.log(res)
      res.data.address.isdefault = "1"
      this.setData({
        addressInfo: res.data.address
      })
    })
  },
  navToHome(){
    wx.redirectTo({
      url: '/pages/home/home'
    })
  },
  navToOrderDetail(){
    wx.redirectTo({
      url: '/pages/order/orderdetail/orderdetail?goodId=1',//需要传入goodsId
    })
  },
  goPay(){
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#7A7A7A',
      animation: {},
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    this.setData({
      paySuccessFlag: true
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})