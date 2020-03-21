const db = wx.cloud.database()
let app = getApp()
import { huoqu } from "../Public-data/public.js"

// 添加云端数据
export const addto = function (forms, datas) {
  return new Promise((resolve, reject) => {

    db.collection(`${forms}`).add({
      data: datas,
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

// 获取云端数据
export const obtain = function (forms, condition) {
  return new Promise((resolve, reject) => {
    db.collection(`${forms}`).where({
      username: condition
    }).get({
      success: (res) => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

// get请求过去qq音乐api的歌
export const getAjax = function (forms, datas) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: forms,
      data: datas,
      method: 'GET',
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

// 路由跳转刷新导航栏的数据，不然其他页面数据会是初始值
export const toUpdate = function (_this, num) {
  if (typeof _this.getTabBar === 'function' && _this.getTabBar()) {
    _this.getTabBar().setData({
      selected: num,
      bottbfimgbtn: app.globalData.bottbfimgbtn,
      singerName: app.globalData.name,
      songName: app.globalData.songName,
      bfbtn: app.globalData.bfbtn,
      shouchangbtn: app.globalData.shouchangbtn,
      imglj: app.globalData.imglj,
    })
    speedOfProgress(_this)
  }
}

// 每次页面改变了数据就刷新导航栏的数据
export const goUpdate = function (_this) {
  if (typeof _this.getTabBar === 'function' && _this.getTabBar()) {
    _this.getTabBar().setData({
      bottbfimgbtn: app.globalData.bottbfimgbtn,
      singerName: app.globalData.name,
      songName: app.globalData.songName,
      bfbtn: app.globalData.bfbtn,
      shouchangbtn: app.globalData.shouchangbtn,
      imglj: app.globalData.imglj
    })
  }
}

// 点击收藏，分享里的歌 播放事件封装
export const djbf = function (_this, el) {
  app.globalData.datas = _this.data.musicdata
  app.globalData.leng = app.globalData.datas.length
  app.globalData.subscript = el.currentTarget.dataset.index
  let item = app.globalData.datas[app.globalData.subscript]
  app.globalData.songName = item.musicname
  app.globalData.imglj = item.imglj
  app.globalData.geid = item._id
  app.globalData.shouchangbtn = false
  app.globalData.bfbtn = true
  app.globalData.bottbfimgbtn = false
  app.globalData.name = app.globalData.datas[app.globalData.subscript].singername
  let huoquset = huoqu.replace(/liujie/, item.hash)
  getAjax(huoquset, {}).then(data => {
    let indata = data.data.req_0.data
    let mp3 = indata.sip[0] + indata.midurlinfo[0].purl
    app.globalData.mp3 = mp3
    // 播放音乐
    wx.playBackgroundAudio({
      dataUrl: app.globalData.mp3
    })
  })
}

// 添加收藏和分享传给后台的数据信息封装
export const current = function () {
  return {
    Source: "QQ音乐",
    musicname: app.globalData.songName,
    singername: app.globalData.name,
    username: app.globalData.username,
    hash: app.globalData.hash,
    userimg: app.globalData.usertopimg,
    shouchang: true,
    imglj: app.globalData.imglj
  }
}

// 当全局状态已经发生改变时刷新尾部数据方法封装，需要刷新直接调用
export const updateData = function (_this) {
  _this.setData({
    bottbfimgbtn: app.globalData.bottbfimgbtn,
    singerName: app.globalData.name,
    songName: app.globalData.songName,
    bfbtn: app.globalData.bfbtn,
    shouchangbtn: app.globalData.shouchangbtn,
    imglj: app.globalData.imglj
  })
}

//  播放收藏和分享音乐的时候  改变全局状态封装
export const globalData = function (item) {
  app.globalData.songName = item.musicname
  app.globalData.shouchangbtn = false
  app.globalData.bfbtn = true
  app.globalData.bottbfimgbtn = false
  app.globalData.name = item.singername
  app.globalData.imglj = item.imglj
}

// 播放收藏和分享音乐的时候上一首下一首的数据变化处理
export const togoSong = function (_this, item) {
  globalData(item)
  let huoquset = huoqu.replace(/liujie/, item.hash)
  getAjax(huoquset, {}).then(data => {
    let indata = data.data.req_0.data
    let mp3 = indata.sip[0] + indata.midurlinfo[0].purl
    app.globalData.mp3 = mp3
    // 播放音乐
    wx.playBackgroundAudio({
      dataUrl: app.globalData.mp3
    })
    updateData(_this)
  })
}

// 播放推荐和分类音乐的时候  改变全局状态封装
export const updatepublic = function (hqimgset, mp3, item) {
  app.globalData.imglj = hqimgset
  app.globalData.mp3 = mp3
  app.globalData.songName = item.data.songname
  app.globalData.shouchangbtn = true
  app.globalData.bfbtn = true
  app.globalData.bottbfimgbtn = false
  app.globalData.name = item.data.singer[0].name
}

// 新歌上一首下一首数据处理
export const newgotosong = function (_this, item, huoquset, hqimgset) {
  getAjax(huoquset, {})
    .then(data => {
      let indata = data.data.req_0.data
      let mp3 = indata.sip[0] + indata.midurlinfo[0].purl
      if (indata.midurlinfo[0].purl == false) {
        wx.showToast({
          title: '付费音乐'
        })
      } else {
        updatepublic(hqimgset, mp3, item)
        updateData(_this)
        // 播放音乐
        wx.playBackgroundAudio({
          dataUrl: app.globalData.mp3
        })
      }
    }).catch(err => {
      console.log(err)
    })
}

// 头部搜索音乐 上一首下一首数据处理
export const searchsong = function (_this, item, huoquset, hqimgset) {
  getAjax(huoquset, {})
    .then(data => {
      let indata = data.data.req_0.data
      let mp3 = indata.sip[0] + indata.midurlinfo[0].purl
      if (indata.midurlinfo[0].purl == false) {
        wx.showToast({
          title: '付费音乐'
        })
      } else {
        app.globalData.imglj = hqimgset
        app.globalData.mp3 = mp3
        app.globalData.songName = item.songname
        app.globalData.shouchangbtn = true
        app.globalData.bfbtn = true
        app.globalData.bottbfimgbtn = false
        app.globalData.name = item.singer[0].name
        updateData(_this)
        // 播放音乐
        wx.playBackgroundAudio({
          dataUrl: app.globalData.mp3
        })
      }
    }).catch(err => {
      console.log(err)
    })
}

// 音乐播放界面上拉和下滑
export const animations = function (_this, state, heights) {
  app.globalData.bfbtn = state
  _this.setData({
    // 底部导航栏消失
    tabbarkg: state,
    // 底部导航栏上方播放消失
    bfbtn: app.globalData.bfbtn
  })
  let animation = wx.createAnimation({
    duration: 500,  //动画的持续时间
    timingFunction: "linear", //	动画的效果设置为平均
    delay: 0  //动画延迟时间无
  })
  _this.animation = animation
  animation.translateY(heights).step(); //效果自己设定为主
  _this.setData({
    animationData: animation.export()   //输出动画
  })
}
// 每一秒都获取播放进度
export const speedOfProgress = function (_this) {
  wx.getBackgroundAudioPlayerState({
    success: function (res) {
      let currentPosition = res.currentPosition // 选定音频的播放位置（单位：s），只有在当前有音乐播放时返回
      let duration = res.duration // 选定音频的长度（单位：s），只有在当前有音乐播放时返回
      app.globalData.speedOfProgress = 550 / duration * currentPosition
      if (typeof _this.getTabBar === 'function' && _this.getTabBar()) {
        _this.getTabBar().setData({
          speedOfProgress: app.globalData.speedOfProgress
        })
      }
    }
  })
}