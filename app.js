//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    let that = this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        let data = {
          code: res.code
        }
        let header = {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'X-ECAPI-Sign': '',
          'X-ECAPI-UDID': '',
          'X-ECAPI-UserAgent': 'Platform/Wechat',
          'X-ECAPI-Ver': '1.1.0',
        };
        wx.request({
          url: 'https://oa.yika.co/app/ewei_shopv2_api.php?i=46&r=wxapp.login',
          data: data,
          header,
          method: 'POST',
          dataType: 'json',
          responseType: 'text',
          success: function(res) {
            console.log(res)
            //that.globalData.openid = 'sns_wa_octwZ40XJPc6_V8U2iy9wJrx34Xg' //res.data.data.openid;
            that.globalData.session_key = res.data.data.session_key;
            wx.setStorageSync('openid', that.globalData.openid)
            that.globalData.openid = 'sns_wa_' + 　res.data.data.openid;
            //请求用户数据


          },
          fail: function(res) {},
          complete: function(res) {},
        })
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              wx.setStorageSync('userInfo', res.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    themeInfo: {
      backgroundColor: { //背景颜色
        value: "#ccc"
      },
      color: { //颜色
        value: '#fff'
      },
      fontSize: { //字体大小
        value: '26rpx'
      },
      borderColor: { //边框颜色
        value: "#000"
      },
    },
    themeBack: 'margin:0!important;background:#0000ff!important;color:#fff!important;border-radius:400px;', //themeBack风格
    themeBorder: 'margin:0!important;border:2rpx solid #0000ff!important;border-color:#0000ff!important;border-radius:400rpx;color:#0000ff!important;', //themeBorder风格
    themeFont: 'color:#0000ff;',
    themeOnlyBorder:'border:2rpx solid #0000ff;',
    themeColor: '#0000ff',
    userInfo: null,
    navBottomList: [{
      url: '',
      img: '',
      selectedImg: '',
      select: false,
      havT: true
    }]
  }
})