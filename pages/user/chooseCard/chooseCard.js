// pages/user/chooseCard/chooseCard.js
const app = getApp()
const api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardList: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  getCardList(){
    return new Promise(resolve => {

      api.getCardList(app.globalData.openid).then(res => {
        console.log(res)
        this.setData({
          cardList: res.data.bank_card_list.map((val) => {
            return val.number = ("" + val.number).substr(0, 4)+"************"+("" + val.number).substr(-4),val
          })
        })
        resolve(res)
      })
    })
  },
  chageDefault(ev){
    let index = ev.currentTarget.dataset.index;
    let oldIndex = 0;
    this.setData({
      cardList: this.data.cardList.map((val, i) => {
        return val.is_mr = index == i, 
          oldIndex = val.is_mr ? i :　oldIndex, 
          val;
      })
    })
    api.changeDefaultCard(app.globalData.openid, { card_id: this.data.cardList[index].card_id}).then(res => {
      console.log(res)
    })
  },
  delCard(ev) {
    let that = this;
    let index = ev.currentTarget.dataset.index;
    wx.showLoading({
      title: '删除中...',
      mask: true
    })
    api.delCard(app.globalData.openid ,{card_id: this.data.cardList[index].card_id}).then(res=>{
      console.log(res)
      if(res.data.error != "0"){
        wx.hideLoading();
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        })
      }else{

        that.getCardList().then(res => {
          console.log(res)
          wx.hideLoading();
        })
      }
    });
  },
  chooseCard(ev){
    let index = ev.currentTarget.dataset.index;
    app.globalData.cardInfo = this.data.cardList[index];
    wx.navigateBack({
      delta: 1,
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
    this.getCardList();
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