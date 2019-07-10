// pages/recommend/recommend.js
const app = getApp()
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '#824C1F',
    coverHeight: "0rpx",
    codeHeight: "0rpx",
    // 顶部广告图
    advertImg: "http://yika.oss-cn-shanghai.aliyuncs.com/qzoa/image/2019051397565110.png",
    // 推荐内容
    hinge: 0,
    list: [{
        page: 1,
        data: []
      },
      {
        page: 1,
        data: []
      }
    ],
    imgurl: '',
    userName: "",
    userImg: "",
    shareInfo: ''
  },
  switchHinge(e) {
    this.setData({
      hinge: e.currentTarget.dataset.val
    })
    if (this.data.list[e.currentTarget.dataset.val].data.length == 0) {
      this.getData(e.currentTarget.dataset.val)
    }
  },

  see: (e) => {
    console.log(e)
    wx.previewImage({
      current: e.currentTarget.dataset.list[e.currentTarget.dataset.idx], // 当前显示图片的http链接
      urls: e.currentTarget.dataset.list // 需要预览的图片http链接列表
    })
  },
  //获取图片高度
  getImgWidth: function(node, fun) {
    var that = this;
    var query = wx.createSelectorQuery();
    query.select(node).boundingClientRect(function(res) {
      fun(res.width)
      return res.width;
    }).exec()
  },
  //设置头部高度
  setCoverHeight: function(wid) {
    this.setData({
      coverHeight: wid * 0.458 + "px"
    })
  },

  // 获取数据
  getData: function(idx) {
    let this_ = this;
    let user = wx.getStorageSync('userInfo');
    let newData = this.data.list[idx];
    util.request(util.apiUrl + `app/ewei_shopv2_api.php?i=46&r=senke.tuijian.index&openid=${app.globalData.openid}`, 'POST', {
      type: idx
    }).then((res) => {
      console.log(res.list)
      let key = `list[${idx}]`;
      newData.page++;
      newData.data = newData.data.concat(res.list);
      let userInfo = wx.getStorageSync('userInfo');
      this_.setData({
        userInfo
      })
      this_.setData({
        [key]: newData,
        userName: userInfo.nickName,
        userImg: userInfo.avatarUrl
      })
    }).catch(err => {
      console.log(err)
    });
  },

  //下载资源
  download(url) {
    return new Promise(function(resolve, reject) {
      wx.showLoading({
        title: '加载中',
      })
      wx.downloadFile({
        url: url,
        success: function(res) {
          console.log(res);
          resolve(res.tempFilePath);
          wx.hideLoading()
        },
        fail: function(res) {
          console.log(res);
          wx.hideLoading()
        }
      })
    })
  },
  // 存储
  storage(e) {
    let this_ = this;
    let type = e.currentTarget.dataset.type;
    let idx = e.currentTarget.dataset.idx;
    let resourceType = e.currentTarget.dataset.form;
    let newData = this.data.list[type].data;
    let imgList = newData[idx].tp_list;

    util.request(util.apiUrl + `app/ewei_shopv2_api.php?i=${util.posId}&r=yktk.yq.fenxiang&openid=${wx.getStorageSync('openid')}`, 'POST', {
      id: newData[idx].tgy_id,
      type: 0
    }).then((res) => {

      if (resourceType == '0') {
        this_.download(newData[idx].sp).then((res) => {
          console.log(res)
          this_.keepNetworkVideo(res)
        });
      } else {
        console.log('请求回执', res)
        // 如果是一张图直接下载 否则 全下
        if (imgList.length > 1) {
          imgList.push(res.res.img)
          for (let i in imgList) {
            console.log(imgList[i])
            this_.download(imgList[i]).then((res) => {
              console.log(res)
              this_.keepNetworkImg(res)
            });
          }
          imgList.splice(imgList.length - 1, 1);
        } else {
          this_.download(res.res.img).then((res) => {
            console.log(res)
            this_.keepNetworkImg(res)
          });
        }

      }
      this_.shear(newData[idx].tgy)
      // 统计
      let key = `list[${type}].data`;
      let num = parseInt(newData[idx].xz_num);
      num++
      newData[idx].xz_num = num
      console.log(newData[idx])
      this_.setData({
        [key]: newData
      })
    }).catch(err => {
      console.log(err)
    });
  },
  // 获取网络图片
  getImageInfo(url) {
    return new Promise((resolve, reject) => {
      wx.getImageInfo({
        src: url,
        success: resolve,
        fail: reject,
      })
    })
  },
  // 合成二维码
  synthesis(bg, code) {
    let this_ = this;
    console.log(code)
    // 获取二维码图像信息
    const avatarPromise = this.getImageInfo(code)
    // 获取背景图像信息
    const backgroundPromise = this.getImageInfo(bg)
    Promise.all([backgroundPromise, avatarPromise]).then(res => {
      const ctx = wx.createCanvasContext('shareCanvas')
      console.log(res[0].path)
      // 底图
      ctx.drawImage(res[0].path, 0, 0, 600, 900)
      // 小程序码
      const qrImgSize = 125
      ctx.drawImage(res[1].path, 40, 900 - 20 - qrImgSize, qrImgSize, qrImgSize)
      ctx.stroke()
      ctx.draw(false, () => {
        wx.canvasToTempFilePath({
          width: 600,
          height: 900,
          canvasId: 'shareCanvas',
          success(res) {
            // console.log(res)
            console.log(res.tempFilePath)
            this_.keepNetworkImg(res.tempFilePath)
          }
        })
      })
    })
  },

  // 设置剪切板
  shear: function(text) {
    wx.setClipboardData({
      data: text,
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  // 图片保存到本地
  keepNetworkImg: function(src) {
    let imgSrc = src;
    //图片保存到本地
    wx.saveImageToPhotosAlbum({
      filePath: imgSrc,
      success: function(data) {
        // util.showToast('保存成功', 'success')
      },
      fail: function(err) {
        console.log(err);
        if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
          console.log("当初用户拒绝，再次发起授权")
          wx.openSetting({
            success(settingdata) {
              console.log(settingdata)
              if (settingdata.authSetting['scope.writePhotosAlbum']) {
                console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
              } else {
                console.log('获取权限失败，给出不给权限就无法正常使用的提示')
              }
            }
          })
        }
      },
      complete(res) {
        console.log(res);
      }
    })
  },
  // 视频保存到本地
  keepNetworkVideo: function(src) {
    let imgSrc = src;
    //图片保存到本地
    wx.saveVideoToPhotosAlbum({
      filePath: imgSrc,
      success: function(data) {
        // util.showToast('保存成功', 'success')
      },
      fail: function(err) {
        console.log(err);
        if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
          console.log("当初用户拒绝，再次发起授权")
          wx.openSetting({
            success(settingdata) {
              console.log(settingdata)
              if (settingdata.authSetting['scope.writePhotosAlbum']) {
                console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
              } else {
                console.log('获取权限失败，给出不给权限就无法正常使用的提示')
              }
            }
          })
        }
      },
      complete(res) {
        console.log(res);
      }
    })
  },

  // setShare() {
  //   let this_ = this;
  //   util.request(util.apiUrl + `app/ewei_shopv2_api.php?i=${util.posId}&r=yktk.index.index&openid=${wx.getStorageSync('openid')}`, 'POST', {}).then((res) => {
  //     console.log(res)
  //     res.fx.title = '森客啤酒';
  //     this_.setData({
  //       shareInfo: res.fx,
  //     })

  //   }).catch(err => {
  //     console.log(err)
  //   });
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.hideShareMenu()
    this.getData(this.data.hinge)
    let userName = wx.getStorageSync('userName');
    let userImg = wx.getStorageSync('userImg');
    this.setData({
      userName: userName,
      userImg: userImg
    })
    // this.setShare()
    this.setData({
      color: '#824C1F' //app.globalData.color
    })
    wx.setNavigationBarTitle({
      title: '推荐有奖'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.getImgWidth(".headerImg", this.setCoverHeight)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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
    // this.getData(this.data.hinge)
  },

  statistics(id) {
    util.request(util.apiUrl + `app/ewei_shopv2_api.php?i=${util.posId}&r=yktk.yq.fx&openid=${wx.getStorageSync('openid')}`, 'POST', {
      id: id
    }).then((res) => {
      console.log(res.res.img)
      let obj = {
        tgy: res.res.tgy,
        img: res.res.img,
        url: `/pages/accredit/accredit?uid=${res.res.uid}&store_id=${res.res.store_id}`
      }
      return {
        title: obj.tgy,
        imageUrl: obj.img,
        path: obj.url
      }

    }).catch(err => {
      console.log(err)
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(e) {
    let this_ = this;
    if (e.target) {
      let type = e.target.dataset.type;
      let idx = e.target.dataset.idx;
      let newData = this.data.list[type].data;
      let id = newData[idx].tgy_id;
      util.request(util.apiUrl + `app/ewei_shopv2_api.php?i=${util.posId}&r=yktk.yq.fenxiang&openid=${wx.getStorageSync('openid')}`, 'POST', {
        id: id,
        type: 1
      }).then((res) => {
        // 统计
        let key = `list[${type}].data`;
        newData[idx].num = res.res.num
        // newData[idx].ar.push({ avatar: res.res.img })
        console.log(newData[idx])
        this_.setData({
          [key]: newData
        })
      }).catch(err => {
        console.log(err)
      });
    }

    return {
      title: this.data.shareInfo.title,
      imageUrl: this.data.shareInfo.imgUrl,
      path: `/pages/accredit/accredit?uid=${this.data.shareInfo.link}&store_id=${wx.getStorageSync('store_id')}`
    }
  }
})