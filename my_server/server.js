//  搭建服务器的核心文件
const Koa = require('koa')
const router = require('./routes')
const bodyParser = require('koa-bodyparser');
// 一. 生成应用以及路由实例
const app = new Koa()
app.use(bodyParser());
//bodyParser用来解析POST数据传参

// 二. 使用路由
app
  .use(router.routes()) // 声明使用路由
  .use(router.allowedMethods()) // 允许使用路由的方法

// 三.监听端口
app.listen('3000', () => {
  console.log('服务器启动成功!,监听3000端口中。')
})
