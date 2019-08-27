// pages/examResult/examResult.js
const app = getApp()
const util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    color: '',
    list:[]
  },
  // 获取数据
  getData() {
    let this_ = this;
    util.request(util.apiUrl + `app/ewei_shopv2_api.php?i=${util.posId}&r=senke.ykt.cjcx&openid=${wx.getStorageSync('openid')}`, 'POST', {
    }).then((res) => {
      console.log(res.res)
      this_.setData({
        list: res.res
      })
    }).catch(err => {
      console.log(err)
    });
  },
   // 查看成绩
  seeResult(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: `../exam/exam?type=2&id=${e.currentTarget.dataset.id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    this.setData({
      color: app.globalData.color
    })
    this.getData()
    wx.setNavigationBarTitle({
      title: app.globalData.themeData.title
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