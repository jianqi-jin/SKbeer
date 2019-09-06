// pages/home/homeShow/homeShow.js
const {
  getHomeShowInfo,
  getShare
} = require('../../../utils/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  getShare() {
    getShare(getApp().globalData.openid).then(res => {
      console.log(res)
      res.data.imgUrl = res.data.icon
      this.setData({
        shareInfo: res.data,

      })
    })
  },
  onShareAppMessage() {
    return {
      title: this.data.shareInfo.title,
      imageUrl: this.data.shareInfo.imgUrl,
      path: `/pages/home/home?memberid=${wx.getStorageSync('memberId')}`
    }
  },
  onLoad: function(options) {
    this.getShare()
    wx.setNavigationBarTitle({
      title: wx.getStorageSync('shop_name')
    })
    this.setData({
      indexType: wx.getStorageSync('indexType')
    })
    this.getInfo()
  },
  navToClass(e) {
    let {
      item
    } = e.currentTarget.dataset;
    let url = (wx.getStorageSync('classType') == 1 ? '/pages/home/home' : '/pages/home/class/class') + '?cate=' + item.id //cate是类别的id
    wx.navigateTo({
      url
    })
  },
  getInfo() {
    getHomeShowInfo({
      fl: wx.getStorageSync('indexType')
    }).then(res => {
      console.log(res)
      this.setData({
        goodsList: res.data.data,
        banner: res.data.banner
      })
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
})