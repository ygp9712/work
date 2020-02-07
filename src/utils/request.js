import config from './config';

// 携带token的方式：1、cookie（不推荐）2、作为参数放在url中3、放在请求头（常用）
var rawToken = wx.getStorageSync('token');
//对发送的请求进行包装，这里我们固定使用GET请求发送（解构赋值）
export default function (url, data={}, method='GET') {
  let token = rawToken || wx.getStorageSync('token');
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      data,
      method,
      header: {
        //使用者的身份凭证
        authorization: token
      },
      success: (res) => {
         //异步函数不能使用return
        resolve(res.data);
      },
      fail: (error) => {
        reject(error);
      }
    })
  })
}