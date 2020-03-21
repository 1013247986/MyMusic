Page({
  onLoad: function (options) {
    setTimeout(function(){
      wx.switchTab({
        url: `/pages/home/home`
      })
    },2000)
  }
})