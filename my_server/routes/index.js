/**
 * ajax 服务路由集合
 */
const KoaRouter = require('koa-router')
const router = new KoaRouter()
var Fly = require('flyio/src/node')
var fly = new Fly()
var jwt = require('jsonwebtoken')
const mysql = require('../mysql')

//=================编写的接口=================
  // 核心代码
router.get('/',async (ctx, next) => {
  // ctx是上下文对象，取代express中的req和res
    ctx.body = "这里是wxapp服务器3000";
})

//
router.get('/getArticleList', async(ctx, next) => {
  let listName = ctx.query.listName;
  let page = ctx.query.page;
  let data = await mysql.queryAll(listName, page);
  ctx.body = data;
})

router.get('/getArticleListMax', async(ctx, next) => {
  let listName = ctx.query.listName;
  let data = await mysql.queryMax(listName);
  ctx.body = data;
})

router.get('/getArticle', async(ctx, next) =>{
  let id = ctx.query.id;
  let table = ctx.query.table;
  let data = await mysql.queryArticle(id, table);
  ctx.body = data;
})

router.get('/testArticle',async (ctx, next) => {
  let id = ctx.query.id;
  let data = await mysql.queryArticle(id);
  if(data[0]){
  ctx.body = data;
  } else {
    ctx.body = '没有找到';
  }
})


let datas = require('../datas/data.json')
router.get('/getList', (ctx, next) => {
  // 1. 获取请求的参数

  // 2. 根据请求的地址和参数处理数据
  let booksArr = datas
  // 3. 响应数据
  console.log(booksArr)
  ctx.body = booksArr
})

/**
 * 获取用户openId的接口
 */
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
  
 /**
 * 检查答案正确的接口
 */
  router.get('/checkAnswer', (ctx, next) => {
    // ctx是上下文对象，取代express中的req和res
    // 1. 获取请求的参数
    let paper = ctx.query.paper
    // 2. 根据请求的地址和参数处理数据
    let datas = require('../datas/answer/' + paper + '.json')
    console.log(datas)
    // 3. 响应数据
    ctx.body = datas
  })
})
module.exports = router