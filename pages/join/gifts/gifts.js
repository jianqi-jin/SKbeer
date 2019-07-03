// pages/join/gifts/gifts.js
const app = getApp();
const api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentGift: {},
    addressInfo: {},
    infoFlag: false,
    orderFlag: false,
    selectedIndex: 0,
    giftList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '加入合伙人'
    })
    this.getGiftList();

  },
  showInfo() {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#7a7a7a'
    })
    this.setData({
      infoFlag: true
    })
  },
  showOrder() {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#7a7a7a'
    })
    this.setData({
      orderFlag: true
    })
  },
  closeInfo() {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff'
    })
    this.setData({
      infoFlag: false,
      orderFlag: false
    })
  },
  chooseGift(ev){
    let index = ev.currentTarget.dataset.index;
    this.setData({
      giftList: this.data.giftList.map((val, i) => {
        return val.checked = i == index, val;
      })
    })
    this.data.giftList.map((val, index) => {
      if(val.checked){
        this.setData({
          currentGift: val
        })
      }
    })

  },
  getGiftList(){
    api.getGiftList(app.globalData.openid).then(res => {
      console.log(res);
      this.setData({
        giftList: res.data.gift_list
      })
    })
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
    api.
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