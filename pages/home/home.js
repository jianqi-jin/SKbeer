// pages/home/home.js
const app = getApp()
const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginFlag: false,
    imgList: [{
      thumb: ''
    }],
    navBtnList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //定义回调，防止加载顺序错误
    app.homeReady = (res) => {
      console.log('reload')
      this.onLoad()
    }
    this.checkLogin();
    this.getInfo();
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff',
      
    })
    wx.setNavigationBarTitle({
      title: '森客啤酒'
    })
  },
  checkLogin() {
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo)
            }
          })
        } else {
          wx.redirectTo({
            url: '/pages/login/login'
          })
        }
      }
    })
  },
  navToDetail(ev) {
    let goodId = ev.currentTarget.dataset.goodid;
    wx.navigateTo({
      url: '/pages/detail/detail?goodId=' + goodId
    })
  },
  getInfo() {
    let that = this;
    api.getHomeInfo().then(res => {

      console.log(res)
      that.setData({
        imgList: res.data.goods_list
      })
    })
    // wx.request({
    //   url: serverUri+'/app/ewei_shopv2_api.php?i=46&r=senke.index.index',
    //   data: '',
    //   header: {},
    //   method: 'GET',
    //   dataType: 'json',
    //   responseType: 'text',
    //   success: function(res) {
    //     console.log(res)
    //     that.setData({
    //       imgList: res.data.goods_list
    //     })
    //   },
    //   fail: function(res) {},
    //   complete: function(res) {},
    // })
  }

})