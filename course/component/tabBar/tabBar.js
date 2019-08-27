// component/tabBar/tabBar.js
const util = require('../../utils/util.js');
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    page:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    color:'',
    navList:[],
    themeInfo:{}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取主题
    getTheme() {
      let this_ = this;
      util.request(util.apiUrl + `app/ewei_shopv2_api.php?i=${util.posId}&r=senke.login.zhuti&openid=${wx.getStorageSync('openid')}`, 'POST', {

      }).then((res) => {
        let obj = {};
        obj = res.res;

        this_.setData({
          themeInfo:obj
        })
        this_.initialize()
      }).catch(err => {
        console.log(err)
      });
    },
    initialize(){
      let navList = [
        {
          icon: this.data.themeInfo.hd_ico_xz,
          selectIcon: this.data.themeInfo.hd_ico,
          url: '/pages/index/index',
          name: '活动',
          show: true
        },
        {
          icon: this.data.themeInfo.yq_ico_xz,
          selectIcon: this.data.themeInfo.yq_ico,
          url: '/pages/recommend/recommend',
          name: '邀请',
          show: true
        },
        {
          icon: this.data.themeInfo.ykt_ico_xz,
          selectIcon: this.data.themeInfo.ykt_ico,
          url: '/pages/course/course',
          name: '云课堂',
          show: false
        },
        {
          icon: this.data.themeInfo.my_ico_xz,
          selectIcon: this.data.themeInfo.my_ico,
          url: '/pages/my/my',
          name: '我的',
          show: true
        }
      ]
      console.log(this.data.themeInfo)
      this.setData({
        color: this.data.themeInfo.bg_color,
        navList: navList
      })
      let sf = wx.getStorageSync('member_type');
      if (sf > 0) {
        let key = `navList[2].show`
        this.setData({
          [key]: true
        })
      }
    }
  },
  ready() { 
    if (app.globalData.themeData.yq_ico_xz != undefined){
      this.setData({
        themeInfo: app.globalData.themeData
      })
      this.initialize()
    }else{
      this.getTheme()
    }
  },
  lifetimes: {
    // 在组件实例进入页面节点树时执行
    created: function () {
      
    }
  }
})
