// pages/home/home.js
const app = getApp()
const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginFlag: false,
    page: 1,
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
    if (options && options.scene) {
      wx.setStorageSync('scene', options.scene)
    }
    if (options && options.memberid) {
      wx.setStorageSync('referId', options.memberid)
    }
    app.homeReady = (res) => {
      console.log('reload')
      this.setData({
        imgList: []
      })
      this.onLoad()
    }
    this.checkLogin();
    this.getInfo(1);
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff',

    })
    wx.setNavigationBarTitle({
      title: api.barTitle
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
  getInfo(page) {
    let that = this;
    wx.showLoading({
      title: 'loading',
      mask: true,
    })
    if (page == 1) {
      this.setData({
        imgList: []
      })
    }
    api.getHomeInfo({
      page
    }).then(res => {
      wx.hideLoading()
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
      that.setData({
        imgList: page == 1 ? res.data.goods_list:that.data.imgList.concat(...res.data.goods_list),
        shareInfo: res.data.fx_message,
        member_id: res.data.member_id
      })
      wx.setStorageSync('memberId', res.data.member_id)
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
  },
  onShareAppMessage() {
    return {
      title: this.data.shareInfo.title,
      imageUrl: this.data.shareInfo.imgUrl,
      path: `/pages/home/home?memberid=${wx.getStorageSync('memberId')}`
    }
  },
  onShow() {
    // this.onLoad()
  },
  onReachBottom() {
    let page = this.data.page + 1;
    this.setData({
      page
    })
    this.getInfo(page)
  }

})