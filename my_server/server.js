//  搭建服务器的核心文件
const Koa = require('koa')
const KoaRouter = require('koa-router')
var Fly = require('flyio/src/node')
var fly = new Fly()
var jwt = require('jsonwebtoken')
// 一. 生成应用以及路由实例
const app = new Koa()
const router = new KoaRouter()

// 核心代码
router.get('/', (ctx, next) => {
  // ctx是上下文对象，取代express中的req和res
  // 1. 获取请求的参数

  // 2. 根据请求的地址和参数处理数据

  // 3. 响应数据
  ctx.body = '服务器返回的数据'
})

// 搜索图书的接口
let datas = require('./datas/data.json')
router.get('/getList', (ctx, next) => {
  // 1. 获取请求的参数

  // 2. 根据请求的地址和参数处理数据
  let booksArr = datas
  // 3. 响应数据
  console.log(booksArr)
  ctx.body = booksArr
})

// 获取用户openId的接口
router.get('/getOpenId', async (ctx, next) => {
  // 1. 获取请求的参数
  let code = ctx.query.code // ctx = request
  let appId = 'wxe7c5868e5a98f48d'
  let appSecret = 'dfa6bb6b4061b178516a2644f9bdc791'
  // 2. 根据请求的地址和参数处理数据
  let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`
  // 发送请求给微信接口，获取openId
  let result = await fly.get(url)
  let userInfo = JSON.parse(result.data)
  /*   console.log(userInfo) */

  // 将用户的openId存入数据库， openId: {userName: 'xx, money:'yyy}

  // 自定义登录状态，就是根据用户的openid和sessionKey进行加密生成token，返回给前端
  // 对openId和sessionKey进行加密
  let token = jwt.sign(userInfo, 'yangguo')
  // 3、响应数据
  ctx.body = token
})

// 测试验证身份token的接口
router.get('/test', (ctx, next) => {
  // 获取token的值
  let token = ctx.request.header.authorization
  console.log(token)
  let decoded = jwt.verify(token, 'yangguo')
  try {
    console.log(decoded)
    ctx.body = '验证成功'
  // session_key: 'u2HnCyPbGqx1LMAabD7VWw==',
  // openid: 'oswh55DzTf_I8ZfQk_e1ep59hQcM',
  // iat: 1574770777  iat是加密时的时间
  } catch (e) {
    decoded = false
    console.log('token验证失败！', e)
    ctx.body = '验证失败'
  }

  router.get('/checkAnswer', (ctx, next) => {
    // ctx是上下文对象，取代express中的req和res
    // 1. 获取请求的参数
    let paper = ctx.query.paper
    // 2. 根据请求的地址和参数处理数据
    let datas = require('./datas/answer/' + paper + '.json')
    console.log(datas)
    // 3. 响应数据
    ctx.body = datas
  })
})

// 二. 使用路由
app
  .use(router.routes()) // 声明使用路由
  .use(router.allowedMethods()) // 允许使用路由的方法

// 三.监听端口
app.listen('3000', () => {
  console.log('服务器启动成功!')
})
