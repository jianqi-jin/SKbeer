// component/shortAnswer/shortAnswer.js
const uploadImage = require('../../utils/oss/uploadAliyun.js'); //引入oss
var upload = 'ykoa/xcx/audio/'; 
var host = 'https://yika.oss-cn-shanghai.aliyuncs.com/';

const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    state: {
      type: Number
    },
    parameter: {
      type: Object
    },
    num: {
      type: Number
    },
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    src:"",
    index:'',
    transcribeWindow:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    preventD(){

    },
    sendOut(res){
      console.log('num' + this.data.index)
      let this_=this;
      let newDat = this_.data.parameter;
      uploadImage(
        res,
        upload,
        function (res) {
          console.log(host + res); //res：文件全路径
          if (newDat.dtda){
            newDat.dtda.vid.push(host + res)
          }else{
            newDat.dtda = { con: "", vid: [] };
            newDat.dtda.vid.push(host + res)
          }
          this_.triggerEvent('result', newDat)
        },
        function (res) {
          console.log('上传失败', res);
        }
      );
    },
    // 正确答案
    answer(e){
      console.log(e.detail.value)
      let this_ = this;
      let newDat = this_.data.parameter;
      newDat.zqda=e.detail.value
      this_.triggerEvent('result', newDat)
    },
    // 分数
    fraction(e){
      let this_ = this;
      let newDat = this_.data.parameter;
      console.log(e.detail.value)
      console.log(newDat.total)
      if (parseFloat(e.detail.value) > parseFloat(newDat.total)){
        newDat.ksdf = newDat.total
      }else{
        newDat.ksdf = e.detail.value
      }
      this_.triggerEvent('result', newDat)
    },
    // 录音
    soundRecording(){
      let this_=this;
      const options = {
        duration: 30000,//指定录音的时长，单位 ms
        sampleRate: 8000,//采样率
        numberOfChannels: 1,//录音通道数
        encodeBitRate: 48000,//编码码率
        format: 'mp3',//音频格式，有效值 aac/mp3
        frameSize: 50,//指定帧大小，单位 KB
      }
      //开始录音
      recorderManager.start(options);
      recorderManager.onStart(() => {
        console.log('recorder start')
        this_.setData({
          transcribeWindow: true
        })
      });
      //错误回调
      recorderManager.onError((res) => {
        console.log(res);
      })
    },
    // 结束录音
    cancelRecording(){
      let this_ = this;
      recorderManager.stop();
      recorderManager.onStop((res) => {
        this.tempFilePath = res.tempFilePath;
        console.log('停止录音', res.tempFilePath)
        console.log(res.duration / 1000)
        this_.setData({
          transcribeWindow: false
        })
      })
    },
    // 结束录音并保存
    endSoundRecording(){
      let this_=this;
      recorderManager.stop();
      recorderManager.onStop((res) => {
        this.tempFilePath = res.tempFilePath;
        console.log('停止录音', res.tempFilePath)
        console.log(res.duration/1000)
        this_.sendOut(res.tempFilePath)  
        this_.setData({
          transcribeWindow: false
        })
      })

    },
    // 删除录音
    delAudio(e){
      let this_ = this;
      let newDat = this_.data.parameter;
      newDat.dtda.vid.splice(e.currentTarget.dataset.index,1)
      this_.triggerEvent('result', newDat)
    },
    //播放声音
    play: function (e) {
      // console.log(e.currentTarget.dataset.url)
      innerAudioContext.autoplay = true
      innerAudioContext.src = e.currentTarget.dataset.url,
        innerAudioContext.onPlay(() => {
          console.log('开始播放')
        })
      innerAudioContext.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
      })
    },

    bindTextAreaBlur(e){
      let this_ = this;
      let newDat = this_.data.parameter;
      if (newDat.dtda) {
        newDat.dtda.con = e.detail.value;
      } else {
        newDat.dtda = { con: "", vid: [] };
        newDat.dtda.con = e.detail.value;
      }
      this_.triggerEvent('result', newDat)
      // this.triggerEvent('result', e.detail.value)
    }
  },
  // 在组件实例进入页面节点树时执行
  attached(e){

  }
})
