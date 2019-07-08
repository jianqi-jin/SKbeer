// component/floatButton/floatButton.js
const util = require('../../utils/util.js');
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  /**
   * 组件的初始数据
   */
  data: {
    color:'',
    show:''
  },
  pageLifetimes: {
    show: function () {
      // 页面被展示
      this.getData()
    }
  },  
  ready() {
    //this.isIphoneX();
    // let show = wx.getStorageSync('member_status') == '1' || wx.getStorageSync('member_status') == '3' 
    console.log(app.globalData.color)
    this.setData({
      color: app.globalData.color
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 获取数据
    getData() {
      let this_ = this;
      util.request(util.apiUrl + `app/ewei_shopv2_api.php?i=${util.posId}&r=yktk.my.index&openid=${wx.getStorageSync('openid')}`, 'POST', {
      }).then((res) => {
        wx.setStorageSync('member_status', res.member_status)
        wx.setStorageSync('member_type', res.member_type)
        let show = wx.getStorageSync('member_status') == '1' || wx.getStorageSync('member_status') == '3' 
        console.log("财务")
        this_.setData({
          show: show
        })
      }).catch(err => {
        console.log(err)
      });
    },
    // 解码  
    decodeUnicode(str) {
      str = str.replace(/\\/g, "%");
      return unescape(str);
    },
    getRequest(url) {
      var theRequest = [];
      if (url.indexOf("?") != -1) {
        var str = url.substr(url.indexOf("?") + 1);
        console.log(str)
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
          theRequest.push({ [strs[i].split("=")[0]]: strs[i].split("=")[1] })
        }
      }
      return theRequest;
    },
    scan() {
      let this_ = this;
      wx.scanCode({
        success(res) {
          console.log('二维码', res)
          let str = this_.decodeUnicode(res.path)
          let parameter = this_.getRequest(str)
          let arr = parameter[0].scene.split(",")

          if (arr[0] == "1" || arr[0] == "3") {
            console.log("阐述", parameter[0].scene)
            util.request(util.apiUrl + `app/ewei_shopv2_api.php?i=${util.posId}&r=yktk.hx.index&openid=${wx.getStorageSync('openid')}`, 'POST', {
              str: parameter[0].scene
            }).then((res) => {
              console.log("返回值", res.res)
              if (res.res.is == "0") {
                util.showToast("无权限")
                return false
              }
              app.globalData.parameter = res.res;
              if (arr[0] == "3") {
                wx.navigateTo({
                  url: `/pages/writeOffTrue/writeOffTrue`,
                })
              } else {
                wx.navigateTo({
                  url: `/pages/vipDeduction/vipDeduction`,
                })
              }
            }).catch(err => {
              console.log('错误', err)
            });
          } else {
            console.log("活动", parameter[0].scene)
            util.request(util.apiUrl + `app/ewei_shopv2_api.php?i=${util.posId}&r=yktk.index.hexiao&openid=${wx.getStorageSync('openid')}`, 'POST', {
              str: parameter[0].scene
            }).then((res) => {
              console.log('韩磊', res)
              app.globalData.parameter = res;
              wx.navigateTo({
                url: `/pages/writeOffTrue/writeOffTrue`,
              })

            }).catch(err => {
              console.log('错误', err.error)
              if (err.error == '0005') {
                util.showToast("核销次数已到")
              }
              if (err.error == '0006') {
                util.showToast("无权限")
              }
              if (err.error == '0007') {
                util.showToast("无权限")
              }
              if (err.error == '0008') {
                util.showToast("活动已核销")
              }
              if (err.error == '0009') {
                util.showToast("核销次数已到")
              }
            });
          }
        }
      })
    }
  }
})
