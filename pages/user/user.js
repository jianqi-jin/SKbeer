// pages/user/user.js
const app = getApp()
const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImg: "",
    userInfo: {},
    kefuInfo: {
      iconImg: '/pages/user/res/img/icon-service.png',
      title: '联系客服',
      iconArr: '/pages/user/res/img/icon_right_click.png',
      url: '',
    },
    infoList: [{
        iconImg: '/res/icon/icon-extension.png',
        title: '推广中心',
        iconArr: '/res/icon/icon_right_click.png',
        url: '/pages/user/referCenter/referCenter',
        showFlag: false
      },
      {
        iconImg: '/pages/user/res/img/icon-addmana.png',
        title: '管理地址',
        iconArr: '/pages/user/res/img/icon_right_click.png',
        url: '/pages/address/address',
        showFlag: true
      }
    ],
    cardList: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '用户中心'
    })
    this.setData({
      bgImg: app.globalData.my_bg
    })

  },
  callPhone(){
    wx.makePhoneCall({
      phoneNumber: this.data.userInfo.kefu_phone
    })
  },
  fun(ev) {
    let item = ev.currentTarget.dataset.ev;
    console.log(item)
    if (item.title == "联系客服") {
      //进入客服
      wx.navigateTo({
        url: '',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    } else {
      if (item.url) {
        wx.navigateTo({
          url: item.url
        })
      }
    }
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
    //加载个人信息
    this.getUserInfo();
  },
  goPayChuZhi(ev) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    let index = ev.currentTarget.dataset.index;
    console.log(ev.currentTarget)
    api.chuZhiPay(app.globalData.openid, {
      card_id: index.id
    }).then(res => {
      wx.hideLoading()
      console.log(res)
      if (res.data.error != "0") {
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          image: '',
          duration: 800,
          mask: true,
        })
        return
      }
      res.data.wechat.success = (res) => {
        console.log(res)
        wx.showToast({
          title: '支付成功',
          icon: '',
          image: '',
          duration: 800,
          mask: true,
        })
        setTimeout(() => { this.onLoad()},800)
      }
      res.data.wechat.fail = (res) => {
        wx.showToast({
          title: '用户取消',
          icon: 'none',
          image: '',
          duration: 800,
          mask: true,
        })
      }
      wx.requestPayment(res.data.wechat)
    })
  },
  getUserInfo() {
    api.getUserInfo(app.globalData.openid).then(res => {
      console.log(res)
      res.data.card = res.data.card.map((val, index) => {
        for (let i in val) {
          if (i == 'zs_money') {
            val[i] = Math.round(val[i]);
          }
          if (i == 'sc_money') {
            val[i] = Math.round(val[i]);
          }
        }
        return val
      })
      this.setData({
        userInfo: res.data
      })
      wx.setStorageSync("kefu_phone", res.data.kefu_phone)

      this.setData({
        ['infoList[0].showFlag']: res.data.type == "1"
      })
    })
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

  }
})