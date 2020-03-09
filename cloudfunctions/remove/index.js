// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'lxs-76rse',//你的开发环境
  traceUser: true
})


const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  let id = event.id
  try {
    return await db.collection('myLikeMusic').doc(`${id}`).remove()
  } catch (e) {
    console.log(e)
  }
}
