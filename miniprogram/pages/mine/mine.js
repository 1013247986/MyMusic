let app = getApp()
import { obtain } from "../../public/public.js"
Page({
  data: {
    back: app.globalData.back, //背景色
    colors: app.globalData.colors, //字体颜色
    boxcolor: app.globalData.boxcolor, // 盒子背景色
    username: undefined,
    userimg: "",
    // 组件所需的参数
    nvabarData: {
      title: '我的', //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 62,
    myLikeMusic: null,
    musicnum: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userimg: app.globalData.usertopimg,
      username: app.globalData.username
    })
  },
  scbfbtn(el) {
    let data = el.currentTarget.dataset.shuju
    console.log(data)
    app.globalData.songName = data.musicname
    app.globalData.mp3 = data.mp3
    app.globalData.shouchangbtn = false
    app.globalData.bfbtn = true
    app.globalData.bottbfimgbtn = false
    app.globalData.name = data.singername
    // 播放音乐
    wx.playBackgroundAudio({
      dataUrl: app.globalData.mp3
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
    // 每次显示页面都刷新一次
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3,
        bottbfimgbtn: app.globalData.bottbfimgbtn,
        singerName: app.globalData.name,
        songName: app.globalData.songName,
        bfbtn: app.globalData.bfbtn,
        shouchangbtn: app.globalData.shouchangbtn
      })
    }
    // 获取自己的歌
    obtain('myLikeMusic', app.globalData.username)
      .then(data => {
        this.setData({
          myLikeMusic: data.data,
          musicnum: data.data.length
        })
      })
      .catch(err => {
        console.log(err)
      })
  },
  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      wx.showToast({
        title: '获取信息成功'
      })
      app.globalData.username = e.detail.userInfo.nickName
      app.globalData.usertopimg = e.detail.userInfo.avatarUrl
      this.setData({
        userimg: app.globalData.usertopimg,
        username: app.globalData.username
      })
    } else {
      wx.showToast({
        title: '获取信息失败'
      })
    }
  }
})