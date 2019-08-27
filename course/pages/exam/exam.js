// pages/exam/exam.js
const app = getApp()
const util = require('../../utils/util.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    color:"",
    // 状态 1.考试 2看卷 3判卷 
    state:1,
    // 试卷id
    id:'',
    time:'',
    xzt:[],
    pdt:[],
    shortAnswer: [],
    // 评价
    py:'',
    // 总分数
    total:'',
    // 题量
    topicNum: 0,
    // 答题进度
    schedule:0
    
  },
  // 提交评分
  subScore(){
    let this_ = this;

    util.request(util.apiUrl + `app/ewei_shopv2_api.php?i=${util.posId}&r=senke.ykt.pj&openid=${wx.getStorageSync('openid')}`, 'POST', {
      id: this.data.id,
      jdt: JSON.stringify(this.data.shortAnswer),
      xzt: JSON.stringify(this.data.xzt),
      pdt: JSON.stringify(this.data.pdt),
      py :this.data.py,
      creatime : this.data.time,
      total : this.data.total,
      nickname : this.data.name
    }
    ).then((res) => {
      if (res.res) {
        wx.navigateTo({
          url: '../course/course',
        })
      }
    }).catch(err => {
      console.log(err)
    });
  },

  // 更新评价
  evaluate(e){
    // console.log(e.detail.value)
    this.setData({
      py: e.detail.value
    })
  },
  // 获取试卷
  getTestPaper() {
    let this_ = this;
    let url =""; 
    console.log(this.data.state)
    if (this.data.state == 1){
      url = `app/ewei_shopv2_api.php?i=${util.posId}&r=senke.ykt.sj_select&openid=${wx.getStorageSync('openid')}`
    } else if (this.data.state == 2){
      url = `app/ewei_shopv2_api.php?i=${util.posId}&r=senke.ykt.cjxq&openid=${wx.getStorageSync('openid')}`
    }else{
      url = `app/ewei_shopv2_api.php?i=${util.posId}&r=senke.ykt.dpj_xq&openid=${wx.getStorageSync('openid')}`
    }

    util.request(util.apiUrl + url, 'POST', {
      id: this.data.id
    }).then((res) => {
      this_.setData({
        xzt: res.res.xzt,
        pdt: res.res.pdt,
        shortAnswer: res.res.jdt,
      })
      if (this.data.state == 1){
        this_.setData({
          time: res.time
        })
      }
      if (this.data.state == 2){
        this_.setData({
          time: res.res.creatime,
          name: res.res.nickname,
          total: res.res.total,
          py: res.res.py
        })
        this_.initializeResult()
      } else if (this.data.state == 3){
        this_.setData({
          name: res.res.nickname,
          time: res.res.creatime,
          total: res.res.total
        })
        this_.initializeResult()
      }
      this_.testPaperSchedule()
    }).catch(err => {
      console.log(err)
    });
  },
  // 初始化判断选中
  initializeResult(){
    let xztList = this.data.xzt;
    let pdtList = this.data.pdt;
    for (let i in xztList){
      let answerString = xztList[i].zqda
      for (let y in xztList[i].xx){
        if (answerString.indexOf(xztList[i].xx[y].key) != -1){
          xztList[i].xx[y].checked=true;
        }
      }
    }
    for (let i in pdtList) {
      let answerString = pdtList[i].zqda
      for (let y in pdtList[i].xx) {
        if (answerString.indexOf(pdtList[i].xx[y].key) != -1) {
          pdtList[i].xx[y].checked = true;
        }
      }
    }
    this.setData({
      xzt: xztList,
      pdt: pdtList
    })
    this.testPaperSchedule()
  },
  // 选着题答案
  result(e){
    console.log(e)
    let this_=this;
    let newData = this.data[e.currentTarget.dataset.key];
    newData[e.currentTarget.dataset.inx].dtda = e.detail;
    let option = newData[e.currentTarget.dataset.inx].xx;
    for (let i in option){
      if (e.detail.indexOf(option[i].key) > -1){
        newData[e.currentTarget.dataset.inx].xx[i].checked=true;
      }else{
        newData[e.currentTarget.dataset.inx].xx[i].checked = false;
      }
    }
    let key = `${e.currentTarget.dataset.key}`;
    this.setData({
      [key]: newData
    })
    this.testPaperSchedule()
  },
  // 简答题返回
  shortResult(e){
    // console.log(e.detail)
    let this_ = this;
    let newData = this.data[e.currentTarget.dataset.key];
    newData[e.currentTarget.dataset.inx] = e.detail;
    console.log(newData[e.currentTarget.dataset.inx])
    let key = `${e.currentTarget.dataset.key}`;
    this.setData({
      [key]: newData
    })
    this.testPaperSchedule()
  },
  // 试卷进度
  testPaperSchedule(){
    let dataXZT = this.data.xzt
    let dataPDT = this.data.pdt
    let dataShortAnswer = this.data.shortAnswer
    let topicNum = dataXZT.length + dataPDT.length + dataShortAnswer.length;
    let schedule = 0;

    console.log(dataXZT)
    for (let i in dataXZT){
      if (dataXZT[i].dtda ){
        schedule++;
      }
    }
    for (let i in dataPDT) {
      if (dataPDT[i].dtda) {
        schedule++;
      }
    }
    for (let i in dataShortAnswer) {
      if (dataShortAnswer[i].dtda) {
        schedule++;
      }
    }
    this.setData({
      topicNum: topicNum,
      schedule: schedule
    })
  
  },
  // 提交试卷
  sub(){
    if (this.data.topicNum != this.data.schedule){
      util.showToast("请回答所有题目");
      return false 
    }
    let dataXZT=this.data.xzt
    let dataPDT =this.data.pdt
    let dataShortAnswer =this.data.shortAnswer

    console.log(dataXZT)
    console.log(dataPDT)
    console.log(dataShortAnswer)

    let formData={
      xzt:[],
      pdt:[],
      jdt:[]
    }
    for (let i in dataXZT){
      let obj={}
      obj.id = dataXZT[i].id
      obj.val = dataXZT[i].dtda ? dataXZT[i].dtda:[]
      formData.xzt.push(obj)
    }
    for (let i in dataPDT) {
      let obj = {}
      obj.id = dataPDT[i].id
      obj.val = dataPDT[i].dtda ? dataPDT[i].dtda:[]
      formData.pdt.push(obj)
    }
    for (let i in dataShortAnswer) {
      console.log(dataShortAnswer[i])
      let obj = { id: '', con: '', vid:[]}
      obj.id = dataShortAnswer[i].id
      // obj.val = dataShortAnswer[i].dtda      
      obj.con =  dataShortAnswer[i].dtda?dataShortAnswer[i].dtda.con:''
      obj.vid = dataShortAnswer[i].dtda?dataShortAnswer[i].dtda.vid:[]
      formData.jdt.push(obj)
    }
    console.log(formData)
    let this_ = this;
    util.request(util.apiUrl + `app/ewei_shopv2_api.php?i=${util.posId}&r=senke.ykt.sjtj&openid=${wx.getStorageSync('openid')}`, 'POST', {
      xzt:JSON.stringify(formData.xzt),
      pdt: JSON.stringify(formData.pdt),
      jdt: JSON.stringify(formData.jdt)
    }
     ).then((res) => {
      if(res.res){
        wx.navigateTo({
          url: '../course/course',
        })
      }
    }).catch(err => {
      console.log(err)
    });
  },
  //获取考试时间
  getCurrentTime(){
    var time="";
    var now = new Date();
    var year = now.getFullYear(); //得到年份
    var month = now.getMonth();//得到月份
    var date = now.getDate();//得到日期
    var hour = now.getHours();//得到小时
    var minu = now.getMinutes();//得到分钟
    var sec = now.getSeconds();//得到秒
    month = month + 1;
    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;
    if (hour < 10) hour = "0" + hour;
    if (minu < 10) minu = "0" + minu;
    if (sec < 10) sec = "0" + sec;
    time = year + "-" + month + "-" + date + "-" + " " + hour + ":" + minu + ":" + sec 
    return time
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    console.log(options)
    this.setData({
      color: app.globalData.color,
      state: options.type
    })
    if (options.id){
      this.setData({
        id: options.id
      })
    }
    this.getTestPaper()
    wx.setNavigationBarTitle({
      title: app.globalData.themeData.title
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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