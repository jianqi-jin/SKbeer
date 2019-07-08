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
    spec: null,
    orderInfo: {
      option_id: null,//323_325  规格id
      goods_id: null,
      goods_price: null,//商品单价
      address_id: null,//地址id
      num: 0,//数量
      pay_type: null,//支付方式
      pay_money: null,//微信支付金额
      dikou_money: null//抵扣金额
    }//下单信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      goodsId: options.goodId
    })
  },
  addOrderNum() {
    let num = this.data.orderInfo.num;
    num += 1;
    if(num > 100){
      num = 100;
    }
    this.setData({
      ['orderInfo.num']: num
    })
  },
  deOrderNum() {
    let num = this.data.orderInfo.num;
    num -= 1;
    if (num < 0) {
      num = 0;
    }
    this.setData({
      ['orderInfo.num']: num
    })
  },
  chooseSpec(ev) {
    console.log(ev.currentTarget.dataset)
    let specIndex = ev.currentTarget.dataset.specindex;
    let index = ev.currentTarget.dataset.index;
    this.setData({
      spec: this.data.spec.map((val, i) => {
        return val.specs.map((val2, i2) => {
          if (specIndex != i){
            return val
          }
          return val2.checked = specIndex == i && index == i2 ? true : false, val;
        }), val;
      })
    })
    console.log(this.data.spec)

  },
  showInfo() {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#7F7F7F'
    })
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
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#7F7F7F'
    })
    if (!this.data.spec) {
      api.getGoodSpec({
        goods_id: this.data.goodInfo.id
      }).then(res => {
        console.log(res)
        if(!res.data.specs){
          res.data.specs = [{
            "id": "-1",//默认
            "title": "默认",
            "specs": [{
              "id": "-1",
              "title": "默认"
            }]
          }]
        }
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
      let specAllNum = 0;
      let specNowNum = 0;
      this.data.spec.map((val, index) => {
        specAllNum += 1;
        var checked = false;
        val.specs.map(val => {
          checked = val.checked?true:checked
        })
        if (checked){
          specNowNum += 1;
        }
      })
      console.log(specAllNum, specNowNum)
      if (specAllNum == specNowNum){
        //ok
        wx.navigateTo({
          url: './order/order'
        })
      }else{
        wx.showToast({
          title: '请选择规格',
          icon: 'none',
          image: '',
          duration: 800,
          mask: true,
        })
      }

    }
  },
  closeOrder() {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff'
    })
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