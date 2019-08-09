const {
  postI,
  serverUri
} = require('./api.js')
const apiUrl = serverUri;

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


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



module.exports = {
  formatTime: formatTime,
  request,
  apiUrl,
  isPoneAvailable: pone => (!/^[1][3,4,5,7,8][0-9]{9}$/.test(pone) ? false : true)
}