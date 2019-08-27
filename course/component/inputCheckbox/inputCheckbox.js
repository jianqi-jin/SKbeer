// component/inputCheckbox/inputCheckbox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    state:{
      type: Number
    },
    parameter:{
      type:Object
    },
    num:{
      type:Number
    }
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    checkboxChange(e) {
      // console.log(e.detail.value)
      this.triggerEvent('result', e.detail.value)
    }
  }
})
