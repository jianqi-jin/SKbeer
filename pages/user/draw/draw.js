// pages/user/draw/draw.js
const app = getApp()
const api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bankCard: {}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '提现',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  fucActttt(){
    //提现
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
    if (!this.data.bankCard.card_id) {
      this.getDefaultCard();
    }
  },
  getDefaultCard(){
    api.getDefaultCard(app.globalData.openid).then(res => {
      console.log(res)
      res.data.bank_card.number = res.data.bank_card.number.substr(-4)
      this.setData({
        bankCard:  res.data.bank_card
      })
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