// pages/join/message/message.js
const app = getApp()
const api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    upgreadInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '加入合伙人',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    this.getUpgreadUpInfo()
  },
  getUpgreadUpInfo() {
    let upgreadInfo = wx.getStorageSync('upgreadInfo');
    //if (upgreadInfo) {} else {
    api.getUpgreadUpInfo({
      type: 0
    }).then(res => {
      console.log(res)
      upgreadInfo = res.data;
      this.setData({
        sj_gift: res.data.sj_gift,
        upgreadInfo: res.data
      })
      wx.setStorageSync('upgreadInfo', res.data)
      this.setData({
        upgreadInfo
      })
    })
    //}
  },
  agentPay() {
    return new Promise(resolve => {

      let data = {
        pay_money: this.data.upgreadInfo.cwdl_money, //价格
      }
      api.agentPay(app.globalData.openid, data).then(res => {
        console.log(res)
        if (res.data.error != "0") {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            image: '',
            duration: 800,
            mask: true
          })
          return
        }
        app.globalData.order_id = res.data.order_id;

        wx.requestPayment({
          timeStamp: res.data.wechat.timeStamp,
          nonceStr: res.data.wechat.nonceStr,
          package: res.data.wechat.package,
          signType: res.data.wechat.signType,
          paySign: res.data.wechat.paySign,
          success: (res2) => {
            wx.setNavigationBarColor({
              frontColor: '#000000',
              backgroundColor: '#7a7a7a'
            })
            this.setData({
              orderFlag: true
            })
            wx.redirectTo({
              url: '/pages/join/paySuccess/paySuccess?id=' + res.data.order_id
            })
            console.log(res)
            resolve(res)
          },
          fail: (res) => {
            wx.showToast({
              title: '用户取消',
              icon: 'none',
              duration: 800,
              mask: true
            })
          }
        })


        resolve(res)
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  navTo() {
    if (this.data.sj_gift == 1) {
      wx.redirectTo({
        url: '/pages/join/gifts/gifts',
      })
    } else {
      this.agentPay()
    }
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