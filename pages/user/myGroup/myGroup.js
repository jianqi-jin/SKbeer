// pages/user/myGroup/myGroup.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    orderInfo: [
      {
        'title': '今日',
        'value': 3
      },
      {
        'title': '本周',
        'value': 16
      },
      {
        'title': '本月',
        'value': 45
      },
      {
        'title': '累计',
        'value': 75
      }
    ],

    groupInfo: [
      {
        'title': '今日',
        'value': 3
      },
      {
        'title': '本周',
        'value': 16
      },
      {
        'title': '本月',
        'value': 45
      },
      {
        'title': '累计',
        'value': 75
      }
    ],

    groupNumInfo: [
      {
        'title': '今日',
        'value': 3
      },
      {
        'title': '本周',
        'value': 16
      },
      {
        'title': '本月',
        'value': 45
      },
      {
        'title': '累计',
        'value': 75
      }
    ],



    infoList: [
      {
        infoTitle: '推荐人',
        infoValue: '[董事合伙人]婷婷'
      }, {
        infoTitle: '注册时间',
        infoValue: '2019-02-12 11:23:45'
      }, {
        infoTitle: '累计提现',
        infoValue: '￥1458'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的团队'
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