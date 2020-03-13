var app = getApp()
import { obtain, getAjax } from "../../public/public.js"
Page({
  data: {
    back: app.globalData.back, //背景色
    colors: app.globalData.colors, //字体颜色
    boxcolor: app.globalData.boxcolor, // 盒子背景色
    // 组件所需的参数
    nvabarData: {
      title: '音乐馆', //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 62,
    rotationChart: {},
    classimg: {},
    datas: {}
  },
  onLoad: function () {
    obtain('Rotation-chart')
      .then(data => {
        this.setData({
          rotationChart: data.data
        })
      })
      .catch(err => {
        console.log(err)
      })
    obtain('class-img')
      .then(data => {
        this.setData({
          classimg: data.data
        })
      })
      .catch(err => {
        console.log(err)
      })
    getAjax("http://m.kugou.com/?json=true", {})
      .then(data => {
        this.setData({
          datas: data.data.data.splice(0, 20)
        })
      }).catch(err => {
        console.log(err)
      })
  },
  //跳转详情页
  gobtn(el) {
    wx.navigateTo({
      url: `/pages/details/details?id=${el.currentTarget.dataset.text}`
    })
  },
  // 点击今日推荐
  djbf(el) {
    app.globalData.datas = this.data.datas
    app.globalData.leng = app.globalData.datas.length
    app.globalData.subscript = el.currentTarget.dataset.subscript
    getAjax(`http://m.kugou.com/app/i/getSongInfo.php?cmd=playInfo&hash=${app.globalData.datas[app.globalData.subscript].hash}`, {})
      .then(data => {
        let _this = this
        if (data.data.error == "需要付费") {
          wx.showToast({
            title: '付费音乐'
          })
        } else {
          app.globalData.imglj = data.data.album_img.replace(/\/{size}/, "")
          app.globalData.mp3 = data.data.url
          app.globalData.songName = data.data.songName
          app.globalData.shouchangbtn = true
          app.globalData.bfbtn = true
          app.globalData.bottbfimgbtn = false
          app.globalData.name = data.data.singerName
          if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setData({
              bottbfimgbtn: app.globalData.bottbfimgbtn,
              singerName: app.globalData.name,
              songName: app.globalData.songName,
              bfbtn: app.globalData.bfbtn,
              shouchangbtn: app.globalData.shouchangbtn,
              imglj:app.globalData.imglj
            })
          }
          // 播放音乐
          wx.playBackgroundAudio({
            dataUrl: app.globalData.mp3
          })
        }
      }).catch(err => {
        console.log(err)
      })
  }
  ,
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0,
        bottbfimgbtn: app.globalData.bottbfimgbtn,
        singerName: app.globalData.name,
        songName: app.globalData.songName,
        bfbtn: app.globalData.bfbtn,
        shouchangbtn: app.globalData.shouchangbtn,
        imglj: app.globalData.imglj
      })
    }
  }
})