let app = getApp()
import { addto, getAjax } from "../public/public.js"
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
    }
  },
  methods: {
    watchBack: (name) => {
      _this.setData({
        bottbfimgbtn: app.globalData.bottbfimgbtn,
        singerName: app.globalData.name,
        songName: app.globalData.songName,
        bfbtn: app.globalData.bfbtn,
        shouchangbtn: app.globalData.shouchangbtn
      })
    },
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
      this.setData({
        selected: data.index
      })
    },
    // 上一曲事件
    lastSong() {
      if (app.globalData.subscript == 0) {
        app.globalData.subscript = app.globalData.leng - 1
      } else {
        app.globalData.subscript = app.globalData.subscript - 1
      }
      if (/.mp3$/.test(app.globalData.datas[app.globalData.subscript].hash) && true) {
        app.globalData.songName = app.globalData.datas[app.globalData.subscript].musicname
        app.globalData.mp3 = app.globalData.datas[app.globalData.subscript].hash
        app.globalData.shouchangbtn = false
        app.globalData.bfbtn = true
        app.globalData.bottbfimgbtn = false
        app.globalData.name = app.globalData.datas[app.globalData.subscript].singername
        app.globalData.imglj = app.globalData.datas[app.globalData.subscript].imglj
        this.setData({
          bottbfimgbtn: app.globalData.bottbfimgbtn,
          singerName: app.globalData.name,
          songName: app.globalData.songName,
          bfbtn: app.globalData.bfbtn,
          shouchangbtn: app.globalData.shouchangbtn,
          imglj: app.globalData.imglj
        })
        // 播放音乐
        wx.playBackgroundAudio({
          dataUrl: app.globalData.mp3
        })
      } else {
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
              _this.setData({
                bottbfimgbtn: app.globalData.bottbfimgbtn,
                singerName: app.globalData.name,
                songName: app.globalData.songName,
                bfbtn: app.globalData.bfbtn,
                shouchangbtn: app.globalData.shouchangbtn,
                imglj:app.globalData.imglj
              })
              // 播放音乐
              wx.playBackgroundAudio({
                dataUrl: app.globalData.mp3
              })
            }
          }).catch(err => {
            console.log(err)
          })
      }
    },
    // 下一曲事件
    nextSong() {
      if (app.globalData.subscript == app.globalData.leng - 1) {
        app.globalData.subscript = 0
      } else {
        app.globalData.subscript = app.globalData.subscript + 1
      }
      if (/.mp3$/.test(app.globalData.datas[app.globalData.subscript].hash) && true) {
        app.globalData.songName = app.globalData.datas[app.globalData.subscript].musicname
        app.globalData.mp3 = app.globalData.datas[app.globalData.subscript].hash
        app.globalData.shouchangbtn = false
        app.globalData.bfbtn = true
        app.globalData.bottbfimgbtn = false
        app.globalData.name = app.globalData.datas[app.globalData.subscript].singername
        app.globalData.imglj = app.globalData.datas[app.globalData.subscript].imglj
        this.setData({
          bottbfimgbtn: app.globalData.bottbfimgbtn,
          singerName: app.globalData.name,
          songName: app.globalData.songName,
          bfbtn: app.globalData.bfbtn,
          shouchangbtn: app.globalData.shouchangbtn,
          imglj: app.globalData.imglj
        })
        // 播放音乐
        wx.playBackgroundAudio({
          dataUrl: app.globalData.mp3
        })
      } else {
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
              _this.setData({
                bottbfimgbtn: app.globalData.bottbfimgbtn,
                singerName: app.globalData.name,
                songName: app.globalData.songName,
                bfbtn: app.globalData.bfbtn,
                shouchangbtn: app.globalData.shouchangbtn,
                imglj: app.globalData.imglj
              })
              // 播放音乐
              wx.playBackgroundAudio({
                dataUrl: app.globalData.mp3
              })
            }
          }).catch(err => {
            console.log(err)
          })
      }
    },
    // 播放音乐
    boyy() {
      app.globalData.bottbfimgbtn = false
      this.setData({
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
    shangla() {
      app.globalData.bfbtn = false
      this.setData({
        // 底部导航栏消失
        tabbarkg: false,
        // 底部导航栏上方播放消失
        bfbtn: app.globalData.bfbtn
      })
      var animation = wx.createAnimation({
        duration: 500,  //动画的持续时间
        timingFunction: "linear", //	动画的效果设置为平均
        delay: 0  //动画延迟时间无
      })
      this.animation = animation
      animation.translateY(-this.data.heights).step(); //效果自己设定为主
      this.setData({
        animationData: animation.export()   //输出动画
      })
    },
    xiala() {
      app.globalData.bfbtn = true
      this.setData({
        // 底部导航栏消失
        tabbarkg: true,
        // 底部导航栏上方播放消失
        bfbtn: app.globalData.bfbtn
      })
      var animation = wx.createAnimation({
        duration: 500,  //动画的持续时间
        timingFunction: "linear", //	动画的效果设置为平均
        delay: 0  //动画延迟时间无
      })
      this.animation = animation
      animation.translateY(0).step(); //效果自己设定为主
      this.setData({
        animationData: animation.export()   //输出动画
      })
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
        addto('sharingMusic', {
          Source: "酷狗音乐",
          musicname: app.globalData.name,
          singername: app.globalData.songName,
          username: app.globalData.username,
          hash: app.globalData.mp3,
          userimg: app.globalData.usertopimg,
          shouchang: true,
          imglj:app.globalData.imglj
        }).then(data => {
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
        addto('myLikeMusic', {
          Source: "酷狗音乐",
          musicname: app.globalData.name,
          singername: app.globalData.songName,
          username: app.globalData.username,
          hash: app.globalData.mp3,
          userimg: app.globalData.usertopimg,
          shouchang: true,
          imglj: app.globalData.imglj
        }).then(data => {
          app.globalData.geid = data._id
          wx.showToast({
            title: '新增记录成功',
          })
        }).catch(err => {
          wx.showToast({
            title: '新增记录失败',
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
          }
        })
      }
    }
  }
})