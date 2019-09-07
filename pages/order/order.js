// pages/order/order.js
const app = getApp();
const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingFlag: false, //加载动画
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
      statusTitle: '成功',
      btnTitle: ''
    }, {
      statusTitle: '退款申请',
      btnTitle: ''
    }, {
      statusTitle: '取消订单',
      btnTitle: ''
    }],
    orderList: [],
    currentShowPageId: 0,
    navHeaderList: [{
      title: '全部',
      selected: true,
      id: 0
    }, {
      title: '待付款',
      selected: true,
      id: 1
    }, {
      title: '待发货',
      selected: true,
      id: 2
    }, {
      title: '待收货',
      selected: true,
      id: 3
    }, {
      title: '已完成',
      selected: true,
      id: 4
    }, {
      title: '已取消',
      selected: true,
      id: 5
    }]

  },
  getShare() {
    api.getShare(app.globalData.openid).then(res => {
      console.log(res)
      res.data.imgUrl = res.data.icon
      this.setData({
        shareInfo: res.data,

      })
    })
  },
  onShareAppMessage() {
    return {
      title: this.data.shareInfo.title,
      imageUrl: this.data.shareInfo.imgUrl,
      path: `/pages/home/home?memberid=${wx.getStorageSync('memberId')}`
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getShare()
    if (options.id) {
      this.changeNav(options.id)
    }
    wx.setNavigationBarTitle({
      title: '我的订单'
    })
  },
  getorderList(status) {
    this.setData({
      loadingFlag: true
    })
    let that = this;
    let data = {
      status
    }
    api.getGoodOrderList(data).then(res => {
      that.setData({
        loadingFlag: false
      })

      let data = res.data
      console.log(data)
      if (res.data.error != "0") {
        wx.showToast({
          title: 'error: ' + res.data.error,
          icon: 'none'
        })
        wx.redirectTo({
          url: '/pages/login/login',
        })
      } else {
        that.setData({
          orderList: data.order_list
        })
      }
    })

    // wx.request({
    //   url: '/app/ewei_shopv2_api.php?i=46&r=senke.order.index&openid=' + app.globalData.openid,
    //   data: {
    //     status
    //   },
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    //   },
    //   method: 'POST',
    //   dataType: 'json',
    //   responseType: 'text',
    //   success: function(res) {
    //     let data = res.data
    //     console.log(data)
    //     if (res.data.error != "0") {
    //       wx.showToast({
    //         title: 'error: ' + res.data.error,
    //         icon: 'none'
    //       })
    //     } else {
    //       that.setData({
    //         orderList: data.order_list
    //       })
    //     }
    //   },
    //   fail: function(res) {},
    //   complete: function(res) {
    //     that.setData({
    //       loadingFlag: false
    //     })
    //   },
    // })
  },
  itemFun(ev) {
    let item = ev.currentTarget.dataset.item;
    console.log(item);
    let id = parseInt(item.status);

    wx.navigateTo({
      url: './orderdetail/orderdetail?orderId=' + item.id,
    })
    switch (id) {
      case -1:
        { //取消
          break;
        }
      case 0:
        { //待付款
          break;
        }
      case 1:
        { //待发货
          break;
        }
      case 2:
        { //待收货
          break;
        }
      case 3:
        { //已完成
          break;
        }
      case 4:
        { //申请退款
          break;
        } //申请退款？？
      default:
        {
          showToast({
            title: '获取错误',
            icon: 'none'
          })
          break;
        }
    }
  },
  btnFun(ev) {
    let item = ev.currentTarget.dataset.item;
    console.log(item);
    let id = parseInt(item.status);
    switch (id) {
      case -1:
        { //取消
          break;
        }
      case 0:
        { //待付款
          wx.navigateTo({
            url: './orderdetail/orderdetail?orderId=' + item.id,
          })
          break;
        }
      case 1:
        { //待发货
          break;
        }
      case 2:
        { //待收货
          wx.navigateTo({
            url: '/pages/wuliu/wuliu?order_sn=' + item.ordersn,
          })
          break;
        }
      case 3:
        { //已完成
          break;
        }
      case 4:
        { //申请退款
          break;
        } //申请退款？？
      default:
        {
          showToast({
            title: '获取错误',
            icon: 'none'
          })
          break;
        }
    }
  },
  changeNav(item) {
    let id = parseInt(item.currentTarget ? item.currentTarget.dataset.id : item);
    console.log(id)
    this.setData({
      currentShowPageId: id
    })
    switch (id) {
      case 0:
        { //全部
          this.getorderList(5)
          break;
        }
      case 1:
        { //待付款
          this.getorderList(0)
          break;
        }
      case 2:
        { //待发货
          this.getorderList(1)
          break;
        }
      case 3:
        { //待收货
          this.getorderList(2)
          break;
        }
      case 4:
        { //已完成
          this.getorderList(3)
          break;
        }
      case 5:
        { //已取消
          this.getorderList(-1)
          break;
        } //申请退款？？
      default:
        {
          wx.showToast({
            title: '获取错误',
            icon: 'none'
          })
          break;
        }
    }


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
    switch (this.data.currentShowPageId) {
      case 0:
        { //全部
          this.getorderList(5)
          break;
        }
      case 1:
        { //待付款
          this.getorderList(0)
          break;
        }
      case 2:
        { //待发货
          this.getorderList(1)
          break;
        }
      case 3:
        { //待收货
          this.getorderList(2)
          break;
        }
      case 4:
        { //已完成
          this.getorderList(3)
          break;
        }
      case 5:
        { //已取消
          this.getorderList(-1)
          break;
        } //申请退款？？
      default:
        {
          showToast({
            title: '获取错误',
            icon: 'none'
          })
          break;
        }
    }
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
})