// pages/home/home.js
const app = getApp();
import { obtain } from "../../public/public.js"
Page({

  /**
   * 页面的初始数据
   * 
   */
  data: {
    back: app.globalData.back, //背景色
    colors: app.globalData.colors, //字体颜色
    boxcolor: app.globalData.boxcolor, // 盒子背景色
    musicdata:{},
    // 组件所需的参数
    nvabarData: {
      title: '分享', //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 62, 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {

  },
  hqname(el){
    // 获取分享的歌
    obtain('sharingMusic', el.currentTarget.dataset.name)
      .then(data => {
        this.setData({
          musicdata: data.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1,
        bottbfimgbtn: app.globalData.bottbfimgbtn,
        singerName: app.globalData.name,
        songName: app.globalData.songName,
        bfbtn: app.globalData.bfbtn,
        shouchangbtn: app.globalData.shouchangbtn,
        imglj: app.globalData.imglj
      })
    }
    // 获取分享的歌
    obtain('sharingMusic')
      .then(data => {
        this.setData({
          musicdata:data.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
})