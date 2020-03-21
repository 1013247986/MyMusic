var app = getApp()
import { huoqu, hqimg } from "../../Public-data/public.js"
import { obtain, getAjax, toUpdate, goUpdate, updatepublic, speedOfProgress } from "../../Public-method/public.js" 
//  暂停定时器函数
let stop = ""
//song_num 等于获取数量
let classroutr = "https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?tpl=3&page=detail&=&topid=4&type=top&song_begin=0&song_num=30&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0 "
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
    getAjax(classroutr, {})
      .then(data => {
        let indata = data.data
        for (let i = 0; i < indata.songlist.length; i++) {
          indata.songlist[i].data.imglj = hqimg.replace(/liujie/, indata.songlist[i].data.albumid)
        }
        this.setData({
          datas: indata.songlist
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
    let _this = this
    app.globalData.datas = this.data.datas
    app.globalData.leng = app.globalData.datas.length
    app.globalData.subscript = el.currentTarget.dataset.subscript
    let item = app.globalData.datas[app.globalData.subscript]
    let huoquset = huoqu.replace(/liujie/, item.data.songmid)
    let hqimgset = hqimg.replace(/liujie/, item.data.albumid)
    getAjax(huoquset, {})
      .then(data => {
        let indata = data.data.req_0.data
        let mp3 = indata.sip[0] + indata.midurlinfo[0].purl
        let _this = this
        if (indata.midurlinfo[0].purl == false) {
          wx.showToast({
            title: '付费音乐'
          })
        } else {
          app.globalData.hash = item.data.songmid
          updatepublic(hqimgset, mp3, item)
          goUpdate(_this)
          // 播放音乐
          wx.playBackgroundAudio({
            dataUrl: app.globalData.mp3
          })
        }
      }).catch(err => {
        console.log(err)
      })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let _this = this
    toUpdate(_this, 0)
    getAjax(classroutr, {})
      .then(data => {
        let indata = data.data
        for (let i = 0; i < indata.songlist.length; i++) {
          indata.songlist[i].data.imglj = hqimg.replace(/liujie/, indata.songlist[i].data.albumid)
        }
        this.setData({
          datas: indata.songlist
        })
      }).catch(err => {
        console.log(err)
      })
    stop = setInterval(function () {
    speedOfProgress(_this)
    }, 1000)
  },
  onHide:function(){
    clearInterval(stop)
  }
})