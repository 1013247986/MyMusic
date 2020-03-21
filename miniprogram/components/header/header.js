const app = getApp()
import { huoqu, hqimg } from "../../Public-data/public.js"
import { getAjax , goUpdate } from "../../Public-method/public.js"
let suspend = ""
Component({
  properties: {
    navbarData: { //navbarData   由父页面传递的数据，变量名字自命名
      type: Object,
      value: {},
      observer: function(newVal, oldVal) {}
    }
  },
  data: {
    height: '',
    datas: {},
    values: "",
    zsyheight: app.globalData.zsyheight - 19,
    invalue: ""
  },
  attached: function() {
    // 定义导航栏的高度   方便对齐
    this.setData({
      height: app.globalData.height
    })
  },
  methods: {
    // 点击歌曲播放
    musicid(el) {
      app.globalData.datas = this.data.datas
      app.globalData.leng = app.globalData.datas.length
      app.globalData.subscript = el.currentTarget.dataset.subscript
      let itemdata = el.currentTarget.dataset.id
      let huoquset = huoqu.replace(/liujie/, itemdata.songmid)
      let hqimgset = hqimg.replace(/liujie/, itemdata.albumid)
      getAjax(huoquset, {})
        .then(data => {
          let indata = data.data.req_0.data
          let mp3 = indata.sip[0] + indata.midurlinfo[0].purl
          let _this = this
          if (indata.midurlinfo[0].purl==false){
            wx.showToast({
              title: '付费音乐'
            })
          }else{
            _this.setData({
              invalue: "",
              values: "",
              datas: {}
            })
            app.globalData.hash = itemdata.songmid
            app.globalData.imglj = hqimgset
            app.globalData.mp3 = mp3
            app.globalData.songName = itemdata.songname
            app.globalData.shouchangbtn = true
            app.globalData.bfbtn = true
            app.globalData.bottbfimgbtn = false
            app.globalData.name = itemdata.singer[0].name
            goUpdate(_this)
            // 播放音乐
            wx.playBackgroundAudio({
              dataUrl: app.globalData.mp3
            })
          }
        }).catch(err => {
          console.log(err)
        })
    },
    inputsj(el) {
      let _this = this
      _this.setData({
        values: el.detail.value
      })
      clearTimeout(suspend)
      suspend = setTimeout(function() {//p=分页 n=请求数量
        getAjax(`https://c.y.qq.com/soso/fcgi-bin/client_search_cp?p=1&n=10&w=${_this.data.values }&format=json`, {})
          .then(data => {
            _this.setData({
              datas: data.data.data.song.list
            })
          }).catch(err => {
            console.log(err)
          })
      }, 800)
    }
  }
})