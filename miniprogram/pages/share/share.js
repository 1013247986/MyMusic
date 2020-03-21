const app = getApp();
import { obtain, toUpdate, goUpdate, djbf, speedOfProgress } from "../../Public-method/public.js"
//  暂停定时器函数
let stop = ""
Page({
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
    // 点击名字获取分享的歌
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
  shareList(el){
    let _this = this
    djbf(_this, el)
    goUpdate(_this)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let _this = this
    toUpdate(_this, 1)
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
    stop = setInterval(function () {
      speedOfProgress(_this)
    }, 1000)
  },
  onHide: function () {
    clearInterval(stop)
  }
})