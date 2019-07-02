// pages/address/editaddress/editaddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioSex: [
      {
        name: '0',
        value: '男',
        checked: true
      }, {
        name: '1',
        value: '女'
      }
    ],
    pageTitle: '添加地址',
    addressId: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let addressId = options.addressId;
    let pageTitle = '添加新地址';
    if(addressId){
      pageTitle = '修改地址';
      this.setData({
        addressId,
        pageTitle
      })
    }

    wx.setNavigationBarTitle({
      title: pageTitle,
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