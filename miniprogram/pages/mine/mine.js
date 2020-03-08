let app = getApp()

Page({
  data: {
    back: app.globalData.back, //背景色
    colors: app.globalData.colors, //字体颜色
    boxcolor: app.globalData.boxcolor, // 盒子背景色
    username: undefined,
    userimg: "",
    // 组件所需的参数
    nvabarData: {
      title: '我的', //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 62,
    myLikeMusic:null,
    musicnum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 1. 获取数据库引用
    const db = wx.cloud.database()
    this.setData({
      userimg: app.globalData.usertopimg,
      username: app.globalData.username
    })
    db.collection('myLikeMusic').where({
      username: app.globalData.username
    }).get({
      success: (res) => {
        this.setData({
          myLikeMusic:res.data,
          musicnum: res.data.length
        })
        console.log(this.data.myLikeMusic)
      },
      fail:err =>{
        console.log(err)
      }
    })
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
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }
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