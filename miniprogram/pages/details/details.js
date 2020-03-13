var app = getApp()
import { getAjax } from "../../public/public.js"
Page({
  data: {
    back: app.globalData.back, //背景色
    colors: app.globalData.colors, //字体颜色
    boxcolor: app.globalData.boxcolor, // 盒子背景色
    height: app.globalData.height * 2 + 62,
    nvabarData: {
      title: '极致音乐', //导航栏 中间的标题
    },
    toptext:"", // 头部标题
    datas:{}, //数据
    indexs:null,
    zdyheight: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      zdyheight: wx.getSystemInfoSync().windowHeight - this.data.height
    })
    let _this = this
    getAjax(`http://m.kugou.com/plist/list/${options.id}?json=true`, {})
      .then(data => {
        _this.setData({
          toptext: data.data.info.list.specialname,
          datas: data.data.list.list.info
        })
      }).catch(err => {
        console.log(err)
      })
  },
  retures(){
    wx.navigateBack({//返回
      delta: 1
    })
  },
  bfhash(el){
    this.setData({
      indexs: el.currentTarget.dataset.index
    })
    getAjax(`http://m.kugou.com/app/i/getSongInfo.php?cmd=playInfo&hash=${el.currentTarget.dataset.hash}`, {})
      .then(data => {
        let _this = this
        if (data.data.error == "需要付费") {
          wx.showToast({
            title: '付费音乐'
          })
        } else {
          app.globalData.mp3 = data.data.url
          app.globalData.songName = data.data.songName
          app.globalData.shouchangbtn = true
          app.globalData.bfbtn = true
          app.globalData.bottbfimgbtn = false
          app.globalData.name = data.data.singerName
          // 播放音乐
          wx.playBackgroundAudio({
            dataUrl: app.globalData.mp3
          })
        }
      }).catch(err => {
        console.log(err)
      })
  },
  onShow: function () {

  }
})