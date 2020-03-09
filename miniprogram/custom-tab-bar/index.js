let app = getApp()
import { addto, deletes } from "../public/public.js"
Component({
  data: {
    back: app.globalData.back, //背景色
    colors: app.globalData.colors, //字体颜色
    boxcolor: app.globalData.boxcolor, // 盒子背景色
    selected: 0, // 底部导航栏计算
    bfbtn: true, // 底部播放提示开关
    bfpage: false, // 播放页面开关
    bottbfimgbtn: true, //底部播放暂停图标btn
    tabbarkg: true, //底部tabbar开关
    shouchangbtn: true, //收藏音乐开关
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
    // 播放页面的开关
    setbfpage() {
      this.setData({
        // 播放页面显示和消失
        bfpage: !this.data.bfpage,
        // 底部导航栏消失
        tabbarkg: !this.data.tabbarkg,
        // 底部导航栏上方播放消失
        bfbtn: !this.data.bfbtn
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
    },
    deltmymu() {
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
        success: (res)=> {
          wx.showToast({
            title: '取消收藏成功'
          })
        },
        fail: err =>{
          wx.showToast({
            title: '取消收藏失败，服务器错误'
          })
        }
      })
    }
  }
})