//  搭建服务器的核心文件
const Koa = require('koa')
const router = require('./routes')
// 一. 生成应用以及路由实例
const app = new Koa()


// 二. 使用路由
app
  .use(router.routes()) // 声明使用路由
  .use(router.allowedMethods()) // 允许使用路由的方法

// 三.监听端口
app.listen('3000', () => {
  console.log('服务器启动成功!')
})
