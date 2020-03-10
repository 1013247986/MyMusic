let app = getApp()
import { addto } from "../public/public.js"
Component({
  data: {
    back: app.globalData.back, //背景色
    colors: app.globalData.colors, //字体颜色
    boxcolor: app.globalData.boxcolor, // 盒子背景色
    heights: app.globalData.zsyheight, // 自适应高度
    selected: 0, // 底部导航栏计算
    bfbtn: true, // 底部播放提示开关
    bottbfimgbtn: true, //底部播放暂停图标btn
    tabbarkg: true, //底部tabbar开关
    shouchangbtn: true, //收藏音乐开关
    animationData:'',
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
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
      this.setData({
        selected: data.index
      })
    },
    shangla(){
      this.setData({
        // 底部导航栏消失
        tabbarkg: !this.data.tabbarkg,
        // 底部导航栏上方播放消失
        bfbtn: !this.data.bfbtn
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
    xiala(){
      this.setData({
        // 底部导航栏消失
        tabbarkg: !this.data.tabbarkg,
        // 底部导航栏上方播放消失
        bfbtn: !this.data.bfbtn
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
    // 底部的播放按钮图片切换
    setbottbtn() {
      this.setData({
        bottbfimgbtn: !this.data.bottbfimgbtn
      })
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
          Source: "网易云音乐",
          musicname: "忘情水",
          singername: "刘先生",
          username: app.globalData.username
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