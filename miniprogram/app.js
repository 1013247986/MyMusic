//app.js
App({
  globalData: {
    back: '#0D0B21', //背景色
    colors: '#F9FAF5', //字体颜色
    boxcolor: '#12B7F5', // 盒子背景色
    yinyue: true, //音乐库选择
    username: undefined, //用户名
    usertopimg: '',// 用户头像地址
    indexs:0,
    inopenid:'',
    geid:'',
    zsyheight:"",
    height:'',
    mp3:"https://sharefs.yun.kugou.com/202003111947/c3a104174cc9b7719d765e2ddf5a4042/G123/M02/1C/19/W5QEAFr1dc-AAv0VADIRiNt3trs401.mp3",
    singerName:"街道办GDC、欧阳耀莹",
    songName:"春娇与志明"
  },
  onLaunch: function(options) {
    wx.hideTabBar()
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'lxs-76rse',
        traceUser: true,
      })
    }
    wx.login({
      success: (res)=> {
        this.globalData.inopenid=res.code
        console.log(this.globalData.inopenid)
      }
    })
    // 获取设备顶部窗口的高度
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.height = res.statusBarHeight
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.globalData.username = res.userInfo.nickName
              this.globalData.usertopimg = res.userInfo.avatarUrl
            }
          })
        }
      }
    })
    // 自适应播放page页面高度
    this.globalData.zsyheight = wx.getSystemInfoSync().windowHeight - (this.globalData.height*2+27)
  }
})