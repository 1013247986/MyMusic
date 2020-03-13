const app = getApp()
import {
  getAjax
} from "../../public/public.js"
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
    musicid(el) {
      getAjax(`http://m.kugou.com/app/i/getSongInfo.php?cmd=playInfo&hash=${el.currentTarget.dataset.id}`, {})
        .then(data => {
          let _this = this
          if (data.data.error=="需要付费"){
            wx.showToast({
              title: '付费音乐'
            })
          }else{
            _this.setData({
              invalue: "",
              values: "",
              datas: {}
            })
            app.globalData.mp3 = data.data.url
            app.globalData.songName = data.data.songName
            app.globalData.shouchangbtn = true
            app.globalData.bfbtn = true
            app.globalData.bottbfimgbtn = false
            app.globalData.name = data.data.singerName
            if (typeof _this.getTabBar === 'function' &&
              _this.getTabBar()) {
              _this.getTabBar().setData({
                bottbfimgbtn: app.globalData.bottbfimgbtn,
                singerName: app.globalData.name,
                songName: app.globalData.songName,
                bfbtn: app.globalData.bfbtn,
                shouchangbtn: app.globalData.shouchangbtn
              })
            }
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
      suspend = setTimeout(function() {
        getAjax(`http://msearchcdn.kugou.com/api/v3/search/song?showtype=14&highlight=em&pagesize=30&tag_aggr=1&tagtype=全部&plat=0&sver=5&keyword=${_this.data.values}&correct=1&api_ver=1&version=9108&page=1&area_code=1&tag=1&with_res_tag=1`, {})
          .then(data => {
            let text = JSON.parse(data.data.replace(/<!--KG_TAG_RES_END-->|<!--KG_TAG_RES_START-->|<em>|<\\\/em>/g, ""))
            _this.setData({
              datas: text.data.info.splice(0, 10)
            })
            console.log(_this.data.datas)
          }).catch(err => {
            console.log(err)
          })
      }, 800)
    }
  }
})