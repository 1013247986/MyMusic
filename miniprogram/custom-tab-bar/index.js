let app = getApp()
import { addto, getAjax, current, togoSong, newgotosong, searchsong, animations } from "../Public-method/public.js"
import { huoqu, hqimg } from "../Public-data/public.js"
let _this = null
Component({
  data: {
    back: app.globalData.back, //背景色
    colors: app.globalData.colors, //字体颜色
    boxcolor: app.globalData.boxcolor, // 盒子背景色
    heights: app.globalData.zsyheight, // 自适应高度
    animationData: '', //上拉动画
    tabbarkg: true, //底部tabbar开关
    selected: 0, // 底部导航栏计算
    bfbtn: app.globalData.bfbtn, // 底部播放提示开关
    bottbfimgbtn: app.globalData.bottbfimgbtn, //底部播放暂停图标btn
    shouchangbtn: app.globalData.shouchangbtn, //收藏音乐开关
    singerName: app.globalData.name, //唱歌的人
    songName: app.globalData.songName,//歌名
    imglj: '',
    speedOfProgress: 0,
    list: [
      {
        "pagePath": "/pages/home/home",
        "text": "音乐馆",
        "selectedIconPath": "/images/yinyueset.png",
        "iconPath": "/images/yinyue.png"
      },
      {
        "pagePath": "/pages/share/share",
        "text": "分享",
        "selectedIconPath": "/images/fenxiangset.png",
        "iconPath": "/images/fenxiang.png"
      },
      {
        "pagePath": "/pages/karlSong/karlSong",
        "text": "K歌",
        "selectedIconPath": "/images/kgeset.png",
        "iconPath": "/images/kge.png"
      },
      {
        "pagePath": "/pages/mine/mine",
        "text": "我的",
        "selectedIconPath": "/images/wodeset.png",
        "iconPath": "/images/wode.png"
      }
    ] //tabBar的数据
  },
  lifetimes: {
    attached: function () {
      _this = this
      getApp().watch(this.watchBack)
      wx.onBackgroundAudioStop(function () {
        _this.nextSong()
      })
    }
  },
  methods: {
    // 监听头部数据变化
    watchBack: (name) => {
      _this.setData({
        bottbfimgbtn: app.globalData.bottbfimgbtn,
        singerName: app.globalData.name,
        songName: app.globalData.songName,
        bfbtn: app.globalData.bfbtn,
        shouchangbtn: app.globalData.shouchangbtn
      })
    },
    // 路由跳转
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
      this.setData({
        selected: data.index
      })
    },
    // 点击音乐播放进度
    changingSchedule(el) {
      // 获取屏幕宽度
      let imageWidth = wx.getSystemInfoSync().windowWidth
      // 得到点击位置占百分比多少
      let djnum = ((el.detail.x - ((imageWidth - 275) / 2)) * 2) / 550
      wx.getBackgroundAudioPlayerState({
        success: function (res) {
          let duration = res.duration // 选定音频的长度（单位：s），只有在当前有音乐播放时返回
          let locations = Math.round(duration * djnum)
          wx.seekBackgroundAudio({
            position: locations
          })
        }
      })


    },
    // 上一曲事件
    lastSong() {
      let _this = this
      if (app.globalData.subscript == 0) {
        app.globalData.subscript = app.globalData.leng - 1
      } else {
        app.globalData.subscript = app.globalData.subscript - 1
      }
      let item = app.globalData.datas[app.globalData.subscript]
      if (item.shouchang && true) {
        togoSong(_this, item)
      } else {
        let huoquset = ""
        let hqimgset = ""
        if (item.songmid && true) {
          huoquset = huoqu.replace(/liujie/, item.songmid)
          hqimgset = hqimg.replace(/liujie/, item.albumid)
          searchsong(_this, item, huoquset, hqimgset)
        } else {
          huoquset = huoqu.replace(/liujie/, item.data.songmid)
          hqimgset = hqimg.replace(/liujie/, item.data.albumid)
          newgotosong(_this, item, huoquset, hqimgset)
        }
      }
    },
    // 下一曲事件
    nextSong() {
      let _this = this
      if (app.globalData.subscript == app.globalData.leng - 1) {
        app.globalData.subscript = 0
      } else {
        app.globalData.subscript = app.globalData.subscript + 1
      }
      let item = app.globalData.datas[app.globalData.subscript]
      if (item.shouchang && true) {
        togoSong(_this, item)
      } else {
        let huoquset = ""
        let hqimgset = ""
        if (item.songmid && true) {
          huoquset = huoqu.replace(/liujie/, item.songmid)
          hqimgset = hqimg.replace(/liujie/, item.albumid)
          searchsong(_this, item, huoquset, hqimgset)
        } else {
          huoquset = huoqu.replace(/liujie/, item.data.songmid)
          hqimgset = hqimg.replace(/liujie/, item.data.albumid)
          newgotosong(_this, item, huoquset, hqimgset)
        }
      }
    },
    // 播放音乐
    boyy() {
      let _this = this
      app.globalData.bottbfimgbtn = false
      _this.setData({
        bottbfimgbtn: app.globalData.bottbfimgbtn,
        bfbtn: app.globalData.bfbtn
      })
      wx.playBackgroundAudio({
        dataUrl: app.globalData.mp3
      })
    },
    // 暂停音乐
    stop() {
      app.globalData.bottbfimgbtn = true
      this.setData({
        bfbtn: app.globalData.bfbtn,
        bottbfimgbtn: app.globalData.bottbfimgbtn
      })
      wx.pauseBackgroundAudio()
    },
    // 上拉播放界面
    shangla() {
      let _this = this
      animations(_this, false, -_this.data.heights)
    },
    // 下拉播放界面
    xiala() {
      let _this = this
      animations(_this, true, 0)
    },
    // 分享好听的歌
    sharing() {
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
        // 分享音乐
        addto('sharingMusic', current()).then(data => {
          app.globalData.geid = data._id
          wx.showToast({
            title: '分享成功',
          })
        }).catch(err => {
          wx.showToast({
            title: '分享失败',
          })
        })
      }
    },
    // 收藏我喜欢的歌
    collection() {
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
        this.setData({
          shouchangbtn: false
        })
        // 添加我的收藏
        addto('myLikeMusic', current()).then(data => {
          app.globalData.geid = data._id
          wx.showToast({
            title: '收藏成功',
          })
        }).catch(err => {
          wx.showToast({
            title: '收藏失败',
          })
        })
      }
    },
    // 取消收藏
    deltmymu() {
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
    }
  }
})