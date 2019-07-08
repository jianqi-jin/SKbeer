// pages/user/myGroup/groupInfo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showId: 0,
    navList: [
      {
        id: 0,
        title: '团队合伙人'
      }, {
        id: 1,
        title: '代理团队'
      }, {
        id: 2,
        title: '会员粉丝',
      }
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '团队明细',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })

  },
  changeNav(ev){
    let index = ev.currentTarget.dataset.id;
    this.setData({
      showId: index
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