let app = getApp()
import { obtain, toUpdate, goUpdate, djbf, speedOfProgress } from "../../Public-method/public.js"
//  暂停定时器函数
let stop = ""
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
    musicdata: null ,//获取我喜欢音乐数据
    musicnum:""
  },
  /*生命周期函数--监听页面加载*/
  onLoad: function (options) {
    this.setData({
      userimg: app.globalData.usertopimg,
      username: app.globalData.username
    })
  },
  // 点击歌曲播放
  scbfbtn(el) {
    let _this = this
    djbf(_this,el)
    goUpdate(_this)
  },
  // 点击取消收藏
  cancels(el) {
    if (app.globalData.username == undefined) {
      wx.showToast({
        title: '请先登录账号'
      })
      setTimeout(function () {
        wx.switchTab({
          url: '/pages/mine/mine'
        });
      }, 1000)
    } else {
      app.globalData.datas = this.data.musicdata
      app.globalData.subscript = el.currentTarget.dataset.index
      let item = app.globalData.datas[app.globalData.subscript]
      app.globalData.geid = item._id
      this.setData({
        shouchangbtn: true
      })
      wx.cloud.callFunction({
        // 云函数名称
        name: 'remove',
        // 传给云函数的参数
        data: {
          id: app.globalData.geid
        },
        success: (res) => {
          // 获取自己的歌
          obtain('myLikeMusic', app.globalData.username)
            .then(data => {
              this.setData({
                musicdata: data.data,
                musicnum: data.data.length
              })
            })
            .catch(err => {
              console.log(err)
            })
          wx.showToast({
            title: '取消收藏成功'
          })
        },
        fail: err => {
          wx.showToast({
            title: '取消收藏失败，服务器错误'
          })
          console.log(err)
        }
      })
    }
  },
  /*生命周期函数--监听页面显示*/
  onShow: function () {
    // 每次显示页面都刷新一次
    let _this = this
    toUpdate(_this,3)
    // 获取自己的歌
    obtain('myLikeMusic', app.globalData.username)
      .then(data => {
        this.setData({
          musicdata: data.data,
          musicnum: data.data.length
        })
      })
      .catch(err => {
        console.log(err)
      })
    stop = setInterval(function () {
      speedOfProgress(_this)
    }, 1000)
  },
  // 获取用户信息
  bindGetUserInfo: function (e) {
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
  },
  onHide: function () {
    clearInterval(stop)
  }
})