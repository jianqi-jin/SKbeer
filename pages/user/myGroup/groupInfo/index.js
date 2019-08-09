// pages/user/myGroup/groupInfo/index.js
const app = getApp()
const api = require('../../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',
    loadFlag: false,
    showId: 1,
    navList: [{
      id: 1,
      title: '代理团队',
    }, {
      id: 0,
      title: '会员粉丝'
    }]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) { //type==0 自己 1别人
    options.showId = options.type == 1 ? 0 : 1 //0显示粉丝
    this.setData({
      color: app.globalData.themeColor,
      ...options
    })

    wx.setNavigationBarTitle({
      title: '团队明细'
    })
    this.getTeamDetail(options.showId)

  },
  getTeamDetail(index) {

    this.setData({
      loadFlag: true
    })
    api.getTeamDetail(app.globalData.openid, {
      type: index
    }).then(res => {
      this.setData({
        infoList: res.data.new_arr || []
      })
      this.setData({
        loadFlag: false
      })
      console.log(res)
      if (res.data.error != "0" || res.data.new_arr.length < 1) {
        // wx.showToast({
        //   title: res.data.message || "未查找到相关信息",
        //   icon: 'none',
        //   image: '',
        //   duration: 800,
        //   mask: true,
        // })
      }


    })
  },
  /**
   * 列表点击事件 
   * 跳转详情
   */
  onItemClick(e) {
    if (this.data.type == 1) return //如果别人则不做跳转
    let item = e.currentTarget.dataset.item;
    wx.navigateTo({ //type=1表示不是自己
      url: '/pages/user/myGroup/myGroup?type=1&member_id=' + item.member_id
    })
  },
  changeNav(ev) {
    let index = ev.currentTarget.dataset.id;
    this.setData({
      showId: index
    })
    this.getTeamDetail(index)
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