// pages/detail/detail.js
const app = getApp()
const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIndex: 0, //0 1 3详情
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 1000,
    goodsId: '',
    goodInfo: {},
    goodParams: [],
    spec: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      goodsId: options.goodId
    })
  },
  chooseSpec(ev) {
    console.log(ev.currentTarget.dataset)
    let specIndex = ev.currentTarget.dataset.specindex;
    let index = ev.currentTarget.dataset.index;
    this.setData({
      spec: this.data.spec.map((val, i) => {
        return val.items.map((val2, i2) => {
          return val2.checked = specIndex == i && index == i2 ? true : false, val;
        }), val;
      })
    })
    console.log(this.data.spec)

  },
  showInfo() {
    let that = this;
    api.getGoodInfo({
      goods_id: this.data.goodInfo.id
    }).then(res => {
      console.log(res)
      that.setData({
        goodParams: res.data.params
      })
    })
    this.setData({
      showIndex: 3
    })
  },
  move() {

  },
  showOrder() {
    if (!this.data.spec) {
      api.getGoodSpec({
        goods_id: this.data.goodInfo.id
      }).then(res => {
        console.log(res)
        this.setData({
          spec: res.data.specs
        })
      })
    }
    if (this.data.showIndex == 0) {
      this.setData({
        showIndex: 1
      })
    } else {
      //navTo orderPage
      wx.navigateTo({
        url: './order/order'
      })
    }
  },
  closeOrder() {
    this.setData({
      showIndex: 0
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getGoodFromId();
  },
  getGoodFromId() {
    api.getGoodFromId(app.globalData.openid, this.data.goodsId).then(res => {
      console.log(res)
      if (res.data.error != "0") {
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        })
      } else {
        this.setData({
          goodInfo: res.data.goods
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})