// pages/address/address.js
const app = getApp();
const api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '地址管理'
    })
    this.getAddressList();

  },
  navToEdit(event){
    if (event.currentTarget.dataset.type == "newAddress" || event.currentTarget.dataset.addressId == ""){
      //新地址
      wx.navigateTo({
        url: './editaddress/editaddress'
      })
    }else{
      //传数据
      let addressId = event.currentTarget.dataset.addressId;
      wx.navigateTo({
        url: './editaddress/editaddress?addressId='+addressId
      })
    }
  },
  getAddressList(){
    let that = this;
    api.getAddressList(app.globalData.openid).then(res => {
      console.log(res)
      let addressList = res.data.address_list;
      that.setData({
        addressList
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