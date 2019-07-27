// pages/order/orderdetail/orderdetail.js
const app = getApp();
const api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payType: {
      21: '微信支付',
      24: '余额抵扣',
      25: '微信支付+余额抵扣'
    },
    goodStatus: [{
      statusTitle: '待付款',
      btnTitle: '去付款'
    }, {
      statusTitle: '待发货',
      btnTitle: ''
    }, {
      statusTitle: '待收货',
      btnTitle: '查看物流'
    }, {
      statusTitle: '已完成',
      btnTitle: ''
    }, {
      statusTitle: '退款申请',
      btnTitle: ''
    }, {
      statusTitle: '取消订单',
      btnTitle: ''
    }],
    orderId: '',
    orderDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      orderId: options.orderId
    })
    wx.setNavigationBarTitle({
      title: '订单详情',
    })
    this.getOrderDetail(this.data.orderId);

  },
  goPay() {
    wx.showLoading({
      title: '加载中..',
      mask: true,
    })
    let that = this;
    api.payOrder(app.globalData.openid, {
      order_sn: this.data.orderDetail.other.order_sn,
      order_id: this.data.orderDetail.order.id
    }).then(res => {
      console.log(res)
      if (res.data.error != "0") {
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          image: '',
          duration: 800,
          mask: true,
        })
        return
      }
      res.data.wechat.success = function(res) {
        console.log(res)
        wx.showToast({
          title: '支付成功',
          icon: '',
          image: '',
          duration: 100,
          mask: true,
        })
        setTimeout(() => {
          wx.redirectTo({
            url: '/pages/order/order?id=' + 2,
          })
        }, 1000)
      }
      res.data.wechat.fail = function(res) {
        console.log(res)
        wx.showToast({
          title: '用户取消',
          icon: 'none',
          image: '',
          duration: 800,
        })
      }
      res.data.wechat.complete = function(res) {

      }
      wx.hideLoading()
      wx.requestPayment(res.data.wechat)
    })
  },
  closeOrder() {
    wx.showLoading({
      title: '取消',
      mask: true,
    })
    api.closeOrder(app.globalData.openid, {
      order_sn: this.data.orderDetail.other.order_sn
    }).then(res => {
      wx.hideLoading()
      console.log(res)
      if (res.data.error == "0") {
        this.getOrderDetail(this.data.orderId);
        return
      } else {
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          image: '',
          duration: 800,
          mask: true
        })
      }
    })
  },
  delOrder() {
    wx.showLoading({
      title: '删除',
      mask: true,
    })
    api.delOrder(app.globalData.openid, {
      order_sn: this.data.orderDetail.other.order_sn
    }).then(res => {
      wx.hideLoading()
      console.log(res)
      if (res.data.error == "0") {
        wx.navigateBack({
          delta: 1,
        })
        return
      } else {
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          image: '',
          duration: 800,
          mask: true
        })
      }
    })
  },
  navTo(ev) {
    let flag = ev.currentTarget.dataset.flag;
    if (flag) {
      wx.navigateTo({
        url: '/pages/wuliu/wuliu?order_sn=' + this.data.orderDetail.other.order_sn
      })
    }
  },
  timerFun() {
    this.setData({

    })
  },
  navToHome() {
    wx.redirectTo({
      url: '/pages/home/home',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  getOrderDetail: function(orderId) {
    let that = this;
    let data = {
      order_id: orderId
    }
    api.getOrderDetail(data).then(res => {

      console.log(res.data)
      this.setData({
        orderDetail: res.data
      })
      this.setData({
        timer: setInterval(() => {
          this.setData({
            ['orderDetail.top.time']: this.data.orderDetail.top.time - 1,
            timeStr: parseInt(this.data.orderDetail.top.time / 60) +
              '分' + (this.data.orderDetail.top.time) % 60 + '秒'
          })
          if (this.data.orderDetail.top.time < 0) {
            clearInterval(this.data.timer)

            wx.navigateBack({
              delta: 1,
            })
          }
        }, 1000)
      })
    })
    // wx.request({
    //   url: '/app/ewei_shopv2_api.php?i=46&r=senke.order.order_detail&openid=' + app.openid,
    //   data: {
    //     order_id: orderId
    //   },
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    //   },
    //   method: 'POST',
    //   responseType: 'text',
    //   success: (res) => {
    //     console.log(res.data)
    //     this.setData({
    //       orderDetail: res.data
    //     })
    //     this.setData({
    //       timer: setInterval(() => {
    //         this.setData({
    //           ['orderDetail.top.time']: this.data.orderDetail.top.time - 1
    //         })
    //         if (this.data.orderDetail.top.time < 0) {
    //           clearInterval(this.data.timer)

    //           wx.navigateBack({
    //             delta: 1,
    //           })
    //         }
    //       }, 1000)
    //     })
    //   },
    //   fail: function(res) {},
    //   complete: function(res) {},
    // })
  },
  onUnload() {
    clearInterval(this.data.timer)
  }


})