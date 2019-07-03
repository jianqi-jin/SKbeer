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
  delAddress(ev){
    let id = ev.currentTarget.dataset.id;
    api.delAddress(app.globalData.openid, id).then(res => {
      if(res.data.error != '0'){
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        })
      }else{
        this.getAddressList();
      }
    })
  },
  changeDefault(ev){
    let id = ev.currentTarget.dataset.id;
    let oldId = '';
    this.setData({
      addressList: this.data.addressList.map((val, index) => {
        if (val.isdefault == true){
          oldId = val.id;
        }
        return val.isdefault = val.id == id ? true : false, val;
      })
    })
    api.changeDefaultAddress(app.globalData.openid, id).then(res => {
      console.log(res);

      if(res.data.error == '0' && res.data.result == 1){
      } else {
        this.setData({
          addressList: this.data.addressList.map((val, index) => {
            return val.isdefault = val.id == oldId ? true : false, val;
          })
        })


        wx.showToast({
          title: '修改错误',
          icon: 'none',
          image: '',
          duration: 0,
          mask: true,
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getAddressList();
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