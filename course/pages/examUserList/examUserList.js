// pages/examUserList/examUserList.js
const app = getApp()
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',
    hinge: 0,
    list:[
      {
        page:1,
        data:[]
      },
      {
        page: 1,
        data: []
      }
    ]
  },
  switchHinge(e) {
    this.setData({
      hinge: e.currentTarget.dataset.val
    })
    if (this.data.list[e.currentTarget.dataset.val].data.length == 0){
      this.getData(e.currentTarget.dataset.val)
    }
  },
  // 查看成绩
  see(e){
    console.log(e.currentTarget.dataset.id)
    console.log(e.currentTarget.dataset.type)
    wx.navigateTo({
      url: `../exam/exam?type=${e.currentTarget.dataset.type==0?'3':'2'}&id=${e.currentTarget.dataset.id}`,
    })
  },
  // 获取数据
  getData(idx) {
    let this_=this;

    let data = this.data.list[idx];
    util.request(util.apiUrl + `app/ewei_shopv2_api.php?i=${util.posId}&r=senke.ykt.cjcxall&openid=${wx.getStorageSync('openid')}`, 'POST', {
      page: data.page,
      type:idx
    }).then((res) => {
      console.log(res.res)
      let key = `list[${idx}]`;
      data.page++;
      data.data = data.data.concat(res.res);
      this_.setData({
        [key]: data
      })

    }).catch(err => {
      console.log(err)
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    this.setData({
      color: app.globalData.color
    })
    this.getData(this.data.hinge)
    wx.setNavigationBarTitle({
      title: app.globalData.themeData.title
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
    // this.getData(this.data.hinge)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})