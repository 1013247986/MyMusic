const app = getApp()
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
  },
  attached: function() {
    // 定义导航栏的高度   方便对齐
    this.setData({
      height: app.globalData.height
    })
  },
  methods: {}
})