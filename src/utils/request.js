import config from './config';
export default function (url, data={}, method='GET') {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      data,
      method,
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