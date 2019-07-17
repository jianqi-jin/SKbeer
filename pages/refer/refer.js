// pages/refer/refer.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    referList: [],
    showIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '推荐有奖',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    this.getReferList();
  },
  share(item) {
    console.log(app.globalData)
    let id = item.currentTarget.dataset.id;
    let data = {
      id
    }
    api.shareclum(data).then(res => {
      console.log(res)
    })
    // wx.request({
    //   url: '/app/ewei_shopv2_api.php?i=46&r=senke.tuijian.fenxiang&openid=' + app.globalData.openid,
    //   data: {
    //     id
    //   },
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    //   },
    //   method: 'POST',
    //   dataType: 'json',
    //   responseType: 'text',
    //   success: function(res) {
    //     console.log(res)
    //   },
    //   fail: function(res) {},
    //   complete: function(res) {},
    // })
  },
  changeNav(item) {
    let index = item.currentTarget.dataset.index;
    this.setData({
      showIndex: index
    })
  },
  navToShare() {
    wx.navigateTo({
      url: '/pages/share/share',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  getReferList() {
    let that = this;
    let data = {
      type: 0
    }
    api.getReferList(data).then(res => {
      console.log(res)
      that.setData({
        referList: res.data.list
      })
    })
    // wx.request({
    //   url: 'app/ewei_shopv2_api.php?i=46&r=senke.tuijian.index&openid=' + app.globalData.openid,
    //   data: {
    //     type: 0
    //   },
    //   header: {},
    //   method: 'POST',
    //   dataType: 'json',
    //   responseType: 'text',
    //   success: function(res) {
    //     console.log(res)
    //     that.setData({
    //       referList: res.data.list
    //     })
    //   },
    //   fail: function(res) {},
    //   complete: function(res) {},
    // })
  }
})