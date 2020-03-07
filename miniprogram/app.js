//app.js
App({
  globalData: {
    back: '#0D0B21', //背景色
    colors: '#F9FAF5', //字体颜色
    boxcolor: '#12B7F5', // 盒子背景色
    toptext: true, //头部字体开关
    username: '', //用户名
    usertopimg: '', // 用户头像地址
    yinyue: '', //音乐选择
  },
  onLaunch: function(options) {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'lxs-76rse',
        traceUser: true,
      })
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.globalData.username = res.userInfo.nickName
              this.globalData.usertopimg = res.userInfo.avatarUrl
            },
            fill:err =>{
              console.log(err)
              this.globalData.username = undefined
              this.globalData.usertopimg = undefined
            }
          })
        }
      }
    })
  }
})