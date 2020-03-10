var app = getApp()
app.globalData.yinyue
let api = app.globalData.yinyue ? '1' : '2'

module.export = {
  api
}
const db = wx.cloud.database()
export const addto = function (forms, datas) {
  return new Promise((resolve, reject) => {

    db.collection(`${forms}`).add({
      data: datas,
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}
// 添加
export const obtain = function (forms, condition) {
  return new Promise((resolve, reject) => {
    db.collection(`${forms}`).where({
      username: condition
    }).get({
      success: (res) => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}
