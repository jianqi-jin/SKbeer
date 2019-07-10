// pages/detail/order/order.js
const app = getApp();
const api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disableFlag:false,
    payType: {
      21: '微信支付',
      24: '余额抵扣',
      25: '微信支付+余额抵扣'
    },
    addressInfo: {},
    paySuccessFlag: false,
    orderInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


    //从缓存读取orderInfo
    this.readOrderInfoFromStorage().then(res=>{
      console.log('res')
      wx.setNavigationBarTitle({
        title: '立即支付'
      })
      this.getOrderInfo().then(res => {
        console.log(res)
      })
    });

  },
  getOrderInfo(){
    this.setData({
      disableFlag: true
    })
    let that = this;
    let data = this.data.orderInfo;
    data.item_id = data.option_id;
    data.goods_money = data.goods_price;
    return new Promise(resolve => {
      wx.request({
        url: 'https://oa.yika.co/app/ewei_shopv2_api.php?i=46&r=senke.index.order_show&openid='+app.globalData.openid,
        data,
        header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
          console.log(res)

          that.setData({
            ['orderInfo.order_price']: res.data.order.order_price,
            ['orderInfo.pay_type']: res.data.order.pay_type,
            ['orderInfo.dikou_money']: res.data.order.dikou_money,
            ['orderInfo.pay_money']: res.data.order.pay_money
          })
          that.setData({
            disableFlag: false
          })

          resolve(res)
        }
      })
    })
  },
  readOrderInfoFromStorage() {
    return new Promise(resolve => {

      let orderInfo = wx.getStorageSync('orderInfo');
      console.log(orderInfo);
      this.setData({
        orderInfo
      })
      resolve({err:0})
    })
  },
  orderPay() {},
  addOrderNum() {
    let num = this.data.orderInfo.num;
    num += 1;
    if (num > 100) {
      num = 100;
    }
    this.setData({
      ['orderInfo.num']: num
    })


    this.getOrderInfo().then(res => {
      console.log(res)
      //this.cocluPrice()
    })


    //this.cocluPrice()
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

    this.getOrderInfo().then(res => {
      console.log(res)
      //this.cocluPrice()
    })
    //this.cocluPrice()
  },
  cocluPrice() {
    let orderInfo = this.data.orderInfo;
    let pay_money = orderInfo.goods_price * orderInfo.num - orderInfo.dikou_money;
    this.setData({
      ['orderInfo.pay_money']: pay_money ? pay_money : 0
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

    if (app.globalData.currentAddress) {
      this.setData({
        addressInfo: app.globalData.currentAddress,
        ['orderInfo.address_id']: app.globalData.currentAddress.id
      })
      app.globalData.currentAddress = null;
    } else {
      this.getDefaultAddress();
    }
  },
  getDefaultAddress() {
    api.getDefalutAdderss(app.globalData.openid).then(res => {
      console.log(res)
      res.data.address.isdefault = "1"
      this.setData({
        addressInfo: res.data.address,
        ['orderInfo.addressInfo']: res.data.address,
        ['orderInfo.address_id']: res.data.address.id
      })
    })
  },
  navToHome() {
    wx.redirectTo({
      url: '/pages/home/home'
    })
  },
  navToOrderDetail() {
    wx.redirectTo({
      url: '/pages/order/orderdetail/orderdetail?orderId='+this.data.orderId, //需要传入goodsId
    })
  },
  goPay() {
    let that = this;
    this.data.orderInfo.spec_id = this.data.orderInfo.option_id;
    api.orderPay(app.globalData.openid, this.data.orderInfo).then(res => {
      console.log(res)
      this.setData({
        orderId: res.data.order_id
      })
      if (res.data.error != "0" || !res.data.order_id) {
        wx.showToast({
          title: '错误',
          icon: 'none',
          image: '',
          duration: 800,
          mask: true
        })
        return
      } else {
        this.setData({
          payInfo: Object.assign(res.data.wechat, {
            success:(res) => {
              //支付成功
              console.log('支付成功')



              wx.setNavigationBarColor({
                frontColor: '#000000',
                backgroundColor: '#7A7A7A'
              })
              this.setData({
                paySuccessFlag: true
              })
            },
            fail:(res) => {
              //支付失败
              console.log('用户取消')
              wx.showToast({
                title: '用户取消',
                icon: 'none',
                image: '',
                duration: 400,
                mask: true,
              })

              wx.redirectTo({
                url: '/pages/order/orderdetail/orderdetail?orderId=' + this.data.orderId
              })
            }
          })
        })
        wx.requestPayment(
          this.data.payInfo
        )
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