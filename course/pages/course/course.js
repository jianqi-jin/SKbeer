// pages/course/course.js
const app = getApp()
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    controls:false,
    // 回复
    state:false,
    color:'',
    pattern:'学习',
    hinge:0,
    // 播放视频
    play:{},
    // 视频列表
    videoList:[],
    videoPage:1,
    // 讨论列表
    discussList:[],
    discussPage:1,
    // 是否自动播放
    autoplay:false,
    // 身份等级
    member_status:''
  },

  percentage(e){
    // console.log(e)
  },
  switchPattern(e){
    this.setData({
      pattern: e.currentTarget.dataset.val
    })
  },
  switchHinge(e){
    this.setData({
      hinge: e.currentTarget.dataset.val
    })
  },
  // 播放视频
  playVideo(e){
    let idx= e.currentTarget.dataset.idx;
    let id = this.data.videoList[idx].id;
    this.setData({
      play: this.data.videoList[idx],
      autoplay:true
    })

    util.request(util.apiUrl + `app/ewei_shopv2_api.php?i=${util.posId}&r=senke.ykt.gksp&openid=${wx.getStorageSync('openid')}`, 'POST', {
      id: id
    }).then((res) => {
      console.log(res.res)
    }).catch(err => {
      console.log(err)
    });
  },
  // 获取视频列表
  getVideoList(){
    let this_=this;
    let page = this.data.videoPage;
    util.request(util.apiUrl + `app/ewei_shopv2_api.php?i=${util.posId}&r=senke.ykt.main&openid=${wx.getStorageSync('openid')}`, 'POST', {
      page: page
    }).then((res) => {
      console.log(res.res)
      page++;
      let newList = this_.data.videoList;
      newList=newList.concat(res.res.res)
      this_.setData({
        play: res.res.a ? res.res.a : res.res.res[0],
        videoList: newList,
        videoPage: page
      })

    }).catch(err => {
      console.log(err)
    });
  },

  // 获取评论列表
  getDiscussList() {
    let this_ = this;
    let page = this.data.discussPage;
    util.request(util.apiUrl + `app/ewei_shopv2_api.php?i=${util.posId}&r=senke.ykt.zxwd&openid=${wx.getStorageSync('openid')}`, 'POST', {
      page: page
    }).then((res) => {
      
      page++;
      let newList = this_.data.discussList;
      newList=newList.concat(res.res)
      console.log(newList)
      this_.setData({
        discussList: newList,
        discussPage: page
      })

    }).catch(err => {
      console.log(err)
    });
  },
  // 点赞
  save(e){
    // console.log(e.currentTarget.dataset.idx)
    let this_ = this;
    let newData = this.data.discussList[e.currentTarget.dataset.idx];
  
    util.request(util.apiUrl + `app/ewei_shopv2_api.php?i=${util.posId}&r=senke.ykt.dzjl&openid=${wx.getStorageSync('openid')}`, 'POST', {
      id: newData.id
    }).then((res) => {
      console.log(res)
      newData.status = res.status;
      res.status == '0' ? newData.total++ : newData.total--;
      let key = `discussList[${e.currentTarget.dataset.idx}]`;
      this_.setData({
        [key]: newData
      })
    }).catch(err => {
      console.log(err)
    });
  },
  // 提问
  ask(){
    wx.navigateTo({
      url: `../comment/comment?&id=${this.data.play.id}?type=0`
    })
  },
  // // 切换回复
  // switchReply(){
  //   this.setData({
  //     state
  //   })
  // },
  // 回复
  reply(e){
    wx.navigateTo({
      url: `../comment/comment?id=${e.currentTarget.dataset.id}?type=1`
    })
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    this.setData({
      color: app.globalData.color
    })
    wx.setNavigationBarTitle({
      title: app.globalData.themeData.title
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
    this.setData({
      member_status: wx.getStorageSync('member_status')
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      videoList: [],
      videoPage: 1,
      discussList: [],
      discussPage: 1
    })
    this.getVideoList();
    this.getDiscussList();
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})