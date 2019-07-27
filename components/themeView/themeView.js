// components/themeView/themeView.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    globalFlag: { //是否从全局获取属性值
      type: Boolean,
      value: false
    },
    storageFlag: { //是否从storage获取属性值
      type: Boolean,
      value: false
    },
    /**
    themeInfo: {
      type: Object,
      value: {
        backgroundColor: "#fff",
        color: '#000',
        fontSize: '26rpx',
        borderColor: "#ccc"
      } 
    },*/
    /*
    backgroundColor: { //背景颜色
      type: String,
      value: "#fff"
    },
    color: { //颜色
      type: String,
      value: '#000'
    },
    fontSize: { //字体大小
      type: String,
      value: '26rpx'
    },
    borderColor: { //边框颜色
      type: String,
      value: "#ccc"
    }

*/
    type: {
      type: String,
      value: ""
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    styles: ''

  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  ready() {/*
    console.log(this.data)
    for (let item in this.data) {
      console.log(item)
      switch (item) {
        case 'globalFlag':
          { //设置globalFlag
            break;
          }
        case 'storageFlag':
          { //设置globalFlag
            break;
          }
        case 'backgroundColor':
          {
            break;
          }
        case 'color':
          {
            break;
          }
        case 'fontSize':
          {
            break;
          }
        case 'borderColor':
          {
            break;
          }
      }
    }*/

    let type = this.data.type;
    //对type进行分割
    
    this.setData({
      styles: app.globalData[type]
    })
  }
})