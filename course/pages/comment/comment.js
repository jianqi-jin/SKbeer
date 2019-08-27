// pages/comment/comment.js 
const app = getApp()
const util = require('../../utils/util.js');
Page({

  /** 
   * 页面的初始数据 
   */
  data: {
    color: '',
    id: '',
    type: '',
    replyText: ''
  },
  // 改变绑定值 
  onChange: function (e) {
    let key = e.target.dataset.name;
    this.setData({
      [key]: e.detail.value
    })
  },
  // 提交 
  sub() {
    let this_ = this;
    let url = ''
    if (this.data.type == 0) {
      url = `app/ewei_shopv2_api.php?i=${util.posId}&r=senke.ykt.tiwen&openid=${wx.getStorageSync('openid')}`
    } else {
      url = `app/ewei_shopv2_api.php?i=${util.posId}&r=senke.ykt.hf&openid=${wx.getStorageSync('openid')}`
    }

    util.request(util.apiUrl + url, 'POST', {
      id: this.data.id,
      content: this.data.replyText
    }).then((res) => {
      console.log(res)
      if (res.res == 1) {
        wx.navigateTo({
          url: '../course/course'
        })
      }
    }).catch(err => {
      console.log(err)
    });

  },
  /** 
   * 生命周期函数--监听页面加载 
   */
  onLoad: function (options) {
    this.setData({
      color: app.globalData.color,
      id: options.id
    })
    if (options.type){
      type: options.type
    }
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