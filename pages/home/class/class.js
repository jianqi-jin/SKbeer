// pages/home/class/class.js
const {
  getHomeInfo
} = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    goodsList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      ...options
    })
    this.getInfo()

    wx.setNavigationBarTitle({
      title: wx.getStorageSync('shop_name')
    })
  },
  navToDetail(e) {
    let {
      item
    } = e.currentTarget.dataset;
    wx.navigateTo({
      url: '/pages/detail/detail?goodId=' + item.id
    })
  },
  getInfo() {
    let {
      page,
      cate
    } = this.data;

    getHomeInfo({
      cate,
      fl: wx.getStorageSync('indexType'),
      page
    }).then(res => {
      console.log(res.data)
      this.setData({
        goodsList: res.data.goods_list
      })
      if (res.data.goods_list.length < 1) {
        wx.showToast({
          title: '没有更多了',
          icon: 'none',
          image: '',
          duration: 800,
          mask: true,
        })
      }
      console.log(res)
      this.setData({
        imgList: page == 1 ? res.data.goods_list : that.data.imgList.concat(...res.data.goods_list),
        shareInfo: res.data.fx_message,
        member_id: res.data.member_id
      })
      wx.setStorageSync('memberId', res.data.member_id)
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