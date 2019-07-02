// pages/order/orderdetail/orderdetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: '',
    orderDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      orderId: options.orderId
    })
    wx.setNavigationBarTitle({
      title: '订单详情',
    })
    this.getOrderDetail(this.data.orderId);

  },
  getOrderDetail: function (orderId) {
    let that = this;
    wx.request({
      url: 'https://oa.yika.co/app/ewei_shopv2_api.php?i=46&r=senke.order.order_detail&openid=' + app.openid,
      data: {order_id: orderId},
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
      method: 'POST',
      responseType: 'text',
      success: function(res) {
        console.log(res.data)
        that.setData({
          orderDetail: res.data
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }


})