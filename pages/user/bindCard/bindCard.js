// pages/user/bindCard/bindCard.js
const app = getApp();
const api = require('../../../utils/api.js')
const affiliatedBank = require('../../../utils/affiliatedBank.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vCodeFlag: true,
    vCodeTime: 0,
    loading: false,
    cardType: {},
    phone: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.verCard()
  },
  bindPhoneChange(e){
    console.log(e)
    let phone = e.detail.value
    this.setData({
      phone
    })
  },
  deTime() {
    let that = this;
    this.setData({
      vCodeTime: this.data.vCodeTime - 1
    })
    setTimeout(function () {
      if (that.data.vCodeTime < 1){
        that.setData({
          vCodeFlag: true

        })
      }else{
        that.deTime();
      }
    }, 1000)
  },
  sendMsg(){
    if(!this.data.vCodeFlag){
      return 
    }
    this.deTime()
    api.sendMsg(app.globalData.openid, {phone:this.data.phone}).then(res => {
      console.log(res)

      if (res.data.error == "0" && res.data.result.request_id && res.data.result.result.success) {
        this.setData({
          vCodeTime: 60,
          vCodeFlag: false
        })
      }else{
        wx.showToast({
          title: res.data.error == "0" ? res.data.result.sub_msg : res.data.message ,
          icon: 'none'
        })
      }
    })
  },
  cardChange(e){
    this.verCard(e.detail.value);
  },
  verCard(cardNum){
    affiliatedBank.searchBank(cardNum).then((res) => {
      this.setData({
        cardType: res
      })
    }).catch(e => {
      console.log(e)
      this.setData({
        cardType: {}
      })
    })
  },
  formSubmit(ev) {
    this.setData({
      loading: true
    })
    let data = ev.detail.value;
    api.addCard(app.globalData.openid, data).then(res => {
      console.log(res)
      this.setData({
        loading: false
      })
    });
    console.log(ev)

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