const app = getApp()
const api = require('../../utils/api.js')
let header = {
  'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
  'X-ECAPI-Sign': '',
  'X-ECAPI-UDID': '',
  'X-ECAPI-UserAgent': 'Platform/Wechat',
  'X-ECAPI-Ver': '1.1.0',
};
Page({
  data: {
    bgImg: "https://oa.yika.co/attachment/images/17/2019/06/Wv60X0KVk6ESk0VY9EZ63Api0VyJ5w.jpg",
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    loginFlag: false
  },
  onLoad: function() {
    let that = this;
    // 查看是否授权
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
          //没有授权
          console.log('没有授权')

        }
      }
    })
  },
  onGotUserInfo(res) {
    console.log(res)
    if (res.detail.userInfo) {
      let userInfo = res.detail
      app.globalData.userInfo = userInfo;
      let data = {
        data: userInfo.encryptedData,
        sessionKey: app.globalData.session_key,
        iv: userInfo.iv
      }
      api.reg(data).then(res => {
        console.log(res)
      })
      // //添加到数据库
      // wx.request({
      //   url: serverUri+'/app/ewei_shopv2_api.php?i=46&r=wxapp.auth',
      //   data: {
      //     data: userInfo.encryptedData,
      //     sessionKey: app.globalData.session_key,
      //     iv: userInfo.iv
      //   },
      //   header,
      //   method: 'POST',
      //   dataType: 'json',
      //   responseType: 'text',
      //   success: function (res) { 
      //     console.log(res)
      //   }
      // })


      wx.redirectTo({
        url: '/pages/home/home'
      })
    } else {
      wx.showToast({
        title: '用户取消',
        icon: 'none'
      })
    }
  }
})