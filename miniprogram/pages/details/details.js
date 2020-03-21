var app = getApp()
import { getAjax ,goUpdate,updatepublic} from "../../Public-method/public.js"
import { huoqu, hqimg} from "../../Public-data/public.js"
Page({
  data: {
    back: app.globalData.back, //背景色
    colors: app.globalData.colors, //字体颜色
    boxcolor: app.globalData.boxcolor, // 盒子背景色
    height: app.globalData.height * 2 + 62,
    nvabarData: {
      title: '极致音乐', //导航栏 中间的标题
    },
    toptext: "", // 头部标题
    datas: {}, //数据
    indexs: null,
    zdyheight: '',
    num: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      zdyheight: wx.getSystemInfoSync().windowHeight - this.data.height
    })     // song_num等于获取多少条
    let classroutr = `https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?tpl=3&page=detail&=&topid=${options.id}&type=top&song_begin=0&song_num=30&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0`
    let _this = this
    getAjax(classroutr, {})
      .then(data => {
        let indata = data.data
        for (let i = 0; i < indata.songlist.length;i++){
          indata.songlist[i].data.imglj = hqimg.replace(/liujie/,indata.songlist[i].data.albumid)
        }
        _this.setData({
          toptext: indata.topinfo.ListName,
          datas: indata.songlist,
          num: indata.songlist.length
        })
      }).catch(err => {
        console.log(err)
      })
  },
  retures() {
    wx.navigateBack({//返回
      delta: 1
    })
  },
  // 点击歌曲播放
  bfhash(el) {
    let _this = this
    this.setData({
      indexs: el.currentTarget.dataset.index
    })
    app.globalData.subscript = el.currentTarget.dataset.index
    app.globalData.datas = this.data.datas
    app.globalData.leng = this.data.num
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
  onShow: function () {
  }
})