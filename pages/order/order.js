// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentShowPageId: 0,
    navHeaderList: [
      {
        title: '全部',
        selected: true,
        id: 0
      }, {
        title: '待付款',
        selected: true,
        id: 1
      }, {
        title: '待发货',
        selected: true,
        id: 2
      }, {
        title: '待收货',
        selected: true,
        id: 3
      }, {
        title: '已完成',
        selected: true,
        id: 4
      }, {
        title: '已取消',
        selected: true,
        id: 5
      }
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的订单'
    })
  },
  changeNav(item){
    let id = item.currentTarget.dataset.id;
    this.setData({
      currentShowPageId: id
    })
    console.log(this.data.currentShowPageId)
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