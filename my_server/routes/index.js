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


/*=============================      事务接口      ==============================*/
router.get('/queryTodo', async(ctx, next) => {
  let id = ctx.query.id;
  let answer = await mysql.queryTodo(id);
  ctx.body = answer[0];
})

router.get('/deleteTodo', async(ctx, next) => {
  let id = ctx.query.id;
  let answer = await mysql.deleteTodo(id);
  ctx.body = answer;
})

router.get('/updateTodo', async (ctx,next) => {
  let id = ctx.query.id;
  let finish = ctx.query.finish;
  await mysql.updateTodo(id, finish);
  ctx.body = '更新'
})

router.get('/personalTodo', async (ctx, next) => {
  let token = ctx.request.header.authorization;
  let decoded = jwt.verify(token, 'yangguo');
  let user_id = decoded.openid;
  let affair = await mysql.personalTodo(user_id);
  ctx.body = affair;
})

router.get('/addTodo', async (ctx, next) => {
  let token = ctx.request.header.authorization;
  let decoded = jwt.verify(token, 'yangguo');
  let user_id = decoded.openid;
  let name = ctx.query.name;
  let time = ctx.query.time;
  let place = ctx.query.place;
  let detail = ctx.query.detail;
  let result = await mysql.insertTodo(user_id, name, time, place, detail);
  /* console.log(result); */
  ctx.body = result.insertId;
})
/*=============================      事务接口      ==============================*/

/*--------------------------        收藏接口       -----------------------------*/
router.get('/personalCollection', async (ctx, next) => {
  let token = ctx.request.header.authorization;
  let decoded = jwt.verify(token, 'yangguo');
  let user_id = decoded.openid;
  let collection = await mysql.personalCollection(user_id);
  ctx.body = collection;
})

router.get('/checkLike', async (ctx, next) => {
  let token = ctx.request.header.authorization;
  let decoded = jwt.verify(token, 'yangguo');
  let user_id = decoded.openid;
  let item_id = ctx.query.item_id;
  let item_type = ctx.query.item_type;
  let item_class = ctx.query.item_class;
  let isLike = await mysql.queryLike(user_id, item_id, item_type, item_class);
  let answer ='';
  if(isLike[0]) {
    answer = isLike[0].id;
  }
  ctx.body = answer;
})

router.get('/addLike', async (ctx, next) => {
  let id = ctx.query.id;
  let item = await mysql.queryHistoryById(id);
  let result = await mysql.insertLike(item[0].user_id, item[0].item_id, item[0].item_name, item[0].item_type, item[0].item_class, item[0].time);
  /* console.log(result); */
  ctx.body = result.insertId;
})

router.get('/deleteLike', async (ctx, next) => {
  let id = ctx.query.id;
  let result = await mysql.deleteLike(id);
  ctx.body = result;
})
/*--------------------------        收藏接口       -----------------------------*/


/*=============================      历史记录接口      ==============================*/
router.get('/personalHistory', async (ctx, next) => {
  let token = ctx.request.header.authorization;
  let decoded = jwt.verify(token, 'yangguo');
  let user_id = decoded.openid;
  let history = await mysql.personalHistory(user_id);
  ctx.body = history;
})

router.get('/queryHistory', async(ctx, next) => {
  let token = ctx.request.header.authorization;
  let decoded = jwt.verify(token, 'yangguo');
  let user_id = decoded.openid;
  let item_id = ctx.query.item_id;
  let item_type = ctx.query.item_type;
  let item_class = ctx.query.item_class;
  let answer = await mysql.queryHistory(user_id, item_id, item_type, item_class);
  ctx.body = answer;
})

router.get('/addHistory', async (ctx, next) => {
  let token = ctx.request.header.authorization;
  let decoded = jwt.verify(token, 'yangguo');
  let user_id = decoded.openid;
  let item_id = ctx.query.item_id;
  let item_name = ctx.query.item_name;
  let item_type = ctx.query.item_type;
  let item_class = ctx.query.item_class;
  let time = decoded.iat;
  let query = await mysql.queryHistory(user_id, item_id, item_type, item_class);
  if(query[0])
  {
    await mysql.deleteHistory(query[0].id)
  }
  let answer = await mysql.insertHistory(user_id, item_id, item_name, item_type, item_class, time);
  console.log(answer.insertId);
  ctx.body = answer.insertId;
})
/*=============================      历史记录接口      ==============================*/


/*--------------------------        图书接口       -----------------------------*/
router.get('/getBook', async(ctx, next) => {
  let id = ctx.query.id;
  let subject = ctx.query.subject;
  let data = await mysql.queryBook(id, subject);
  ctx.body = data;
})

router.get('/getBookList', async (ctx,next) => {
  let subject = ctx.query.subject;
  let data = await mysql.queryBookList(subject);
  ctx.body = data;
})
/*--------------------------        图书接口       -----------------------------*/

/*=============================      文章接口      ==============================*/
router.get('/getArticleList', async(ctx, next) => {
  let listName = ctx.query.listName;
  let page = ctx.query.page;
  let data = await mysql.queryArticlePage(listName, page);
  ctx.body = data;
})

router.get('/getArticleListMax', async(ctx, next) => {
  let listName = ctx.query.listName;
  let data = await mysql.queryArticleMax(listName);
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
/*=============================      文章接口      ==============================*/

/*--------------------------        试卷接口       -----------------------------*/
router.get('/getPaperList', (ctx, next) => {
  // 1. 获取请求的参数
  let port = ctx.query.port;
  // 2. 根据请求的地址和参数处理数据
  let datas = require(`../datas/paper/${port}.json`)
  // 3. 响应数据
  console.log(datas)
  ctx.body = datas;
})
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
/*--------------------------        试卷接口       -----------------------------*/

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
  // 使用fly发送请求给微信接口，获取openId
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
  let token = ctx.request.header.authorization;
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
  
})
module.exports = router