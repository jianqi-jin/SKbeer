// pages/order/orderdetail/orderdetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodStatus: [
      {
        statusTitle: '待付款',
        btnTitle: '去付款'
      }, {
        statusTitle: '待发货',
        btnTitle: ''
      }, {
        statusTitle: '待发货',
        btnTitle: '查看物流'
      }, {
        statusTitle: '成功',
        btnTitle: ''
      }, {
        statusTitle: '退款申请',
        btnTitle: ''
      }, {
        statusTitle: '取消订单',
        btnTitle: ''
      }
    ],
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
  navTo(ev){
    let flag = ev.currentTarget.dataset.flag;
    if(flag){
      wx.navigateTo({
        url: '/pages/wuliu/wuliu'
      })
    }
  },
  navToHome(){
    wx.redirectTo({
      url: '/pages/home/home',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
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