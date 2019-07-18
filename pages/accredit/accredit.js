// // pages/accredit/accredit.js
// //获取应用实例
// const app = getApp()
// const util = require('../../utils/util.js');
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     scene: "",
//     page: '',
//     id: '',
//     openid: '',
//     optionsData: {}
//   },
//   gologin() {
//     let this_ = this;
//     // 登录
//     wx.login({
//       success: res => {
//         console.log(res.code)
//         // 发送 res.code 到后台换取 openId, sessionKey, unionId
//         util.request(util.apiUrl + `app/ewei_shopv2_api.php?i=${util.posId}&r=yktkwxapp.login`, 'POST', {
//           code: res.code,
//         }).then((res) => {
//           this_.setData({
//             openid: res.data.openid
//           })
//           console.log(res)
//           wx.setStorageSync('openid', res.data.openid);
//           wx.setStorageSync('unionid', res.data.unionid);
//           wx.setStorageSync('session_key', res.data.session_key);
//         }).catch(err => {
//           console.log(err)
//         });

//       }
//     })
//   },
//   // 获取用户信息
//   getUserInfo: function (e) {
//     console.log(e)
//     let this_ = this;
//     app.globalData.userInfo = e.detail.userInfo
//     this.setData({
//       userInfo: e.detail.userInfo
//     })
//     wx.setStorageSync('userName', e.detail.userInfo.nickName);
//     wx.setStorageSync('userImg', e.detail.userInfo.avatarUrl);

//     wx.reLaunch({
//       url: '../index/index',
//     })
//     this.register(e.detail)
//   },
//   // 注册
//   register(info) {

//     let this_ = this;
//     util.request(util.apiUrl + `app/ewei_shopv2_api.php?i=${util.posId}&r=yktkwxapp.auth`, 'POST', {
//       data: info.encryptedData,
//       iv: info.iv,
//       sessionKey: wx.getStorageSync('session_key'),
//       unionid: wx.getStorageSync('unionid')
//     }).then((res) => {
//       wx.setStorageSync('userInfo', res.data);

//       this_.main()
//       // this_.verificationVIP()
//     }).catch(err => {
//       console.log(err)
//       util.showToast('登录失败')
//     });
//   },
//   // 查询身份
//   // verificationVIP(info) {
//   //   util.request(util.apiUrl + `app/ewei_shopv2_api.php?i=${util.xcxId}&r=haiguo.login.get_login&openid=sns_wa_${wx.getStorageSync('openid')}`, 'POST').then((res) => {
//   //     if (res.member_level == '1' && res.login_status == "1"){
//   //       wx.setStorageSync('jurisdiction', true);
//   //     }
//   //   }).catch(err => {
//   //     // util.showToast('登录失败')
//   //   });
//   // },


//   // 获取门店id
//   getStore() {
//     let this_ = this;
//     util.request(util.apiUrl + `app/ewei_shopv2_api.php?i=${util.posId}&r=yktk.my.index&openid=${wx.getStorageSync('openid')}`, 'POST', {
//     }).then((res) => {
//       wx.setStorageSync('store_id', res.store_id)
//       wx.setStorageSync('member_type', res.member_type)
//       wx.setStorageSync('member_status', res.member_status)
//     }).catch(err => {
//       console.log(err)
//     });
//   },

//   // 曝光量
//   exposure(uid) {
//     console.log('我的uid', uid)
//     util.request(util.apiUrl + `app/ewei_shopv2_api.php?i=${util.posId}&r=yktk.ljbgl&openid=${wx.getStorageSync('openid')}`, 'POST', {
//       uid: uid
//     }).then((res) => {
//       console.log("全部走完", res)
//     }).catch(err => {
//       console.log('uid接口', options, err)
//     });
//   },

//   main() {
//     let this_ = this;
//     let options = this.data.optionsData;
//     console.log(options)
//     this.getStore()
//     // 存储数据
//     if (options.url) {
//       this.setData({
//         page: options.url,
//         id: options.id
//       })
//     }
//     // 分享进入
//     if (options.uid) {
//       console.log('门店id', options.store_id)
//       console.log('store_id', options.store_id)
//       util.request(util.apiUrl + `app/ewei_shopv2_api.php?i=${util.posId}&r=yktk.my.store_change&openid=${wx.getStorageSync('openid')}`, 'POST', {
//         store_id: options.store_id
//       }).then((res) => {
//         console.log("切换完成")
//         this_.exposure(options.uid)
//       }).catch(err => {
//         console.log("切换失败", err)
//       });
//     }
//     // 扫码进入
//     let scene = decodeURIComponent(options.scene) || options.scene
//     if (scene != 'undefined') {
//       util.request(util.apiUrl + `app/ewei_shopv2_api.php?i=${util.posId}&r=yktk.login.index&openid=${wx.getStorageSync('openid')}`, 'POST', {
//         openid: wx.getStorageSync('openid'),
//         str: scene
//       }).then((res) => {

//       }).catch(err => {
//         console.log(err)
//       });
//     }
//     // 判断是否需要跳转
//     if (wx.getStorageSync('userName')) {
//       if (this_.data.page == '') {
//         console.log("没有")
//         wx.reLaunch({
//           url: '../index/index',
//         })
//       } else {
//         console.log("有")
//         wx.reLaunch({
//           url: `${this_.data.page}?id=${this_.data.id}`,
//         })
//       }
//     } else {
//       if (this_.data.page == '') {
//         console.log("没有")
//         wx.reLaunch({
//           url: '../index/index',
//         })
//       } else {
//         console.log("有")
//         wx.reLaunch({
//           url: `${this_.data.page}?id=${this_.data.id}`,
//         })
//       }
//     }


//   },
//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
//     console.log('参数', options)
//     let this_ = this;
//     this.setData({
//       optionsData: options
//     })
//     if (wx.getStorageSync('userInfo')) {
//       this_.main()
//     } else {
//       this.gologin()
//     }

//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   }
// })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          