// pages/user/user.js
const app = getApp()
const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    kefuInfo: {
      iconImg: '/pages/user/res/img/icon-service.png',
      title: '联系客服',
      iconArr: '/pages/user/res/img/icon_right_click.png',
      url: '',
    },
    infoList: [
      {
        iconImg: '/res/icon/icon-extension.png',
        title: '推广中心',
        iconArr: '/res/icon/icon_right_click.png',
        url: '/pages/user/referCenter/referCenter'
      },
      {
        iconImg: '/pages/user/res/img/icon-addmana.png',
        title: '管理地址',
        iconArr: '/pages/user/res/img/icon_right_click.png',
        url: '/pages/address/address'
      }
    ],
    cardList: [{
      title: '首冲赠5元',
      price: '1000',
      info: '赠100元'
    }, {
        title: '首冲赠5元',
        price: '1000',
        info: '赠100元'
      }, {
        title: '首冲赠5元',
        price: '1000',
        info: '赠100元'
      }]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '用户中心'
    })

  },
  fun(ev){
    let item = ev.currentTarget.dataset.ev;
    console.log(item)
    if (item.title == "联系客服"){
      //进入客服
      wx.navigateTo({
        url: '',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }else{
      if(item.url){
        wx.navigateTo({
          url: item.url
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //加载个人信息
    this.getUserInfo();
  },
  getUserInfo(){
    api.getUserInfo(app.globalData.openid).then(res => {
      console.log(res)
      this.setData({
        userInfo: res.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})