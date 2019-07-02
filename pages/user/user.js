// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoList:[
      {
        iconImg: '/pages/user/res/img/icon-addmana.png',
        title: '管理地址',
        iconArr: '/pages/user/res/img/icon_right_click.png',
        url: '/pages/address/address'
      }, {
        iconImg: '/pages/user/res/img/icon-service.png',
        title: '联系客服',
        iconArr: '/pages/user/res/img/icon_right_click.png',
        url: '',
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