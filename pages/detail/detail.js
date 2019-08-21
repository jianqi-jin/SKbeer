// pages/detail/detail.js
const app = getApp()
const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoFlag: true,
    disableFlag: false,
    showIndex: 0, //0 1 3详情
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 1000,
    playFlag: false,
    spec_str: '',
    goodsId: '',
    goodInfo: {},
    goodParams: [],
    spec: null,
    orderInfo: {
      option_id: null, //323_325  规格id
      goods_id: null,
      goods_price: null, //商品单价
      address_id: null, //地址id
      num: 1, //数量
      pay_type: null, //支付方式
      pay_money: null, //微信支付金额
      dikou_money: null, //抵扣金额
      specInfo: {} //非表单信息
    } //下单信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      goodsId: options.goodId
    })
    wx.setNavigationBarTitle({
      title: '订单详情',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  onVideoErr() {
    this.setData({
      videoFlag: false
    })
  },
  play() {
    this.setData({
      playFlag: !this.data.playFlag
    })
  },
  addOrderNum() {
    let num = this.data.orderInfo.num;
    num += 1;
    if (num > 100) {
      num = 100;
    }
    this.setData({
      ['orderInfo.num']: num
    })
  },
  deOrderNum() {
    let num = this.data.orderInfo.num;
    num -= 1;
    if (num < 1) {
      num = 1;
    }
    this.setData({
      ['orderInfo.num']: num
    })
  },
  chooseSpec(ev) {
    let specIndex = ev.currentTarget.dataset.specindex;
    let index = ev.currentTarget.dataset.index;
    let spec_str = ''
    this.setData({
      spec: this.data.spec.map((val, i) => (
        val.specs.map((val2, i2) => {
          if (specIndex != i) {
            return val2
          }

          let flag = specIndex == i && index == i2;
          val2.checked = flag
          return val2;
        }), val
      ))
    })
    this.data.spec.map((val1, index1) => {
      val1.specs.map((val2, index2) => {
        if (val2.checked) {
          spec_str += val2.id + '_'
        }
      })
    })
    this.setData({
      spec_str: spec_str.substr(0, spec_str.length - 1)
    })

    this.setData({
      disableFlag: true
    })
    this.getPriceByOption().then(res => {
      console.log(res)
      if (res.data.error == "003") {
        res.data.result = {};
        res.data.result.marketprice = this.data.goodInfo.marketprice;
      }
      this.setData({
        orderInfo: {
          option_id: res.data.result.id, //
          item_id: this.data.spec_str, //323_325  规格id
          goods_id: this.data.goodInfo.id,
          goods_price: res.data.result.marketprice, //商品单价
          address_id: null, //地址id
          num: this.data.orderInfo.num, //数量
          pay_type: 25, //支付方式
          pay_money: null, //微信支付金额
          dikou_money: 0, //抵扣金额
          specInfo: res.data.result, //非表单信息
          goodInfo: this.data.goodInfo //非表单信息
        } //下单信息
      })

      this.setData({
        disableFlag: false
      })
    })

  },
  getPriceByOption() {
    return new Promise(resolve => {
      api.getPriceByOption(app.globalData.openid, {
        spec_id: this.data.spec_str
      }).then(res => {
        resolve(res)
      })
    })
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
        if (!res.data.specs) {
          res.data.specs = [{
            "id": "-1", //默认
            "title": "默认",
            "specs": [{
              "id": "-1",
              "title": "默认"
            }]
          }]
          setTimeout(() => {
            this.chooseSpec({
              currentTarget: {
                dataset: {
                  index: 0,
                  specindex: 0
                }
              }
            })
          }, 0)
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
      return
    }
    //navTo orderPage
    let specAllNum = 0;
    let specNowNum = 0;
    this.data.spec.map((val, index) => {
      specAllNum += 1;
      var checked = false;
      val.specs.map(val => {
        checked = val.checked ? true : checked
      })
      if (checked) {
        specNowNum += 1;
      }
    })
    console.log(specAllNum, specNowNum)
    if (specAllNum == specNowNum) {
      //ok
      wx.setStorageSync('orderInfo', this.data.orderInfo)
      wx.navigateTo({
        url: './order/order'
      })
    } else {
      wx.showToast({
        title: '请选择规格',
        icon: 'none',
        image: '',
        duration: 800,
        mask: true,
      })
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