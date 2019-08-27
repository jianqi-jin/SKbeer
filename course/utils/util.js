const apiUrl = 'https://oa.yika.co/';
const {
  postI
} = require('../../utils/api.js')
const POSId = postI;
//封装接口
function request(url, method = 'GET', data = {}) {
  wx.showLoading({
    title: '加载中',
  })
  let header = {
    'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    'X-ECAPI-Sign': '',
    'X-ECAPI-UDID': '',
    'X-ECAPI-UserAgent': 'Platform/Wechat',
    'X-ECAPI-Ver': '1.1.0',
  };
  let userInfo = wx.getStorageSync('userInfo');
  let token = userInfo.user_id || '';
  if (token) {
    header['X-qingzhe-Authorization'] = token;
    // header['X-qingzhe-Authorization'] = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1NTQ3MTU0MjYsInBsYXRmb3JtIjoiIn0.c99OwrKt1fU-e4J4O7yIkneZ96BTnNECnhf4lNX7GhQ"
  }
  return new Promise(function(resolve, reject) {
    wx.request({
      url: url,
      method: method,
      data: data,
      header: header,
      success: function(res) {
        if (res.data.error == '0') {
          resolve(res.data);
          wx.hideLoading()
        } else {
          reject(res.data);
          wx.hideLoading()
        }
      },
      fail: function(err) {
        wx.showToast({
          title: '网络加载失败',
          duration: 1000
        });
        wx.hideLoading()
      }
    });
  });
}
//封装吐司
function showToast(title, type = 'error') {
  let image = '';
  switch (type) {
    case 'error':
      image = '/ui/images/tanhao.png'
      break;
    case 'success':
      image = '/ui/images/duihao.png'
      break;
  }
  wx.showToast({
    title: title,
    image: image,
    duration: 2000,
    mask: true,
    success: function(res) {},
    fail: function(res) {},
    complete: function(res) {},
  })
}

module.exports = {
  showToast: showToast,
  request: request,
  apiUrl: apiUrl,
  posId: POSId
}