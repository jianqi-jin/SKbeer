// pages/wuliu/wuliu.js
const api = require('../../utils/api.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '物流详情'
    })
    this.setData({
      order_sn: options.order_sn
    })
    this.getWuliu()
  },
  getWuliu() {
    api.getWuliu(app.globalData.openid, {
      order_sn: this.data.order_sn
    }).then(res => {
      console.log(res)
      if (res.data.error != "0") {
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          image: '',
          duration: 800,
          mask: true,
        })
        setTimeout(function() {
          wx.navigateBack({
            delta: 1,
          })
        }, 800)
      } else {
        res.data.AcceptStation = res.data.AcceptStation.map((item) => {
          item.AcceptTime0 = item.AcceptTime.split(' ')[0]
          item.AcceptTime1 = item.AcceptTime.split(' ')[1]
          return item
        })
        this.setData({
          wuliuInfo: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})