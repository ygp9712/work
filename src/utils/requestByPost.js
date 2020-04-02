import config from './config';

var rawToken = wx.getStorageSync('token');
//POST方法
export default function (url, data={}, method='POST') {
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