var app = getApp()

Page({
  data: {
    back: app.globalData.back, //背景色
    colors: app.globalData.colors, //字体颜色
    boxcolor: app.globalData.boxcolor, // 盒子背景色
    username: undefined,
    userimg: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
<<<<<<< HEAD
    console.log(app.globalData.usertopimg)
    if (app.globalData.usertopimg !== null && app.globalData.username !== null){
      this.setData({
        userimg: app.globalData.usertopimg,
        username: app.globalData.username
      })
    }

=======
    this.setData({
      userimg: app.globalData.usertopimg,
      username: app.globalData.username,
    })
    // console.log(username);
>>>>>>> 7c7e179c80e784188de2dcdb490f098d6798b01d
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})