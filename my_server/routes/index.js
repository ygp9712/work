/**
 * ajax 服务路由集合
 */
const KoaRouter = require('koa-router')
const router = new KoaRouter()
var Fly = require('flyio/src/node')
var fly = new Fly()
var jwt = require('jsonwebtoken')
var fs = require('fs')
var path = require('path')
var mime = require('mime');
const mysql = require('../mysql')

render = function (fileName, ctx) {
  var content = fs.readFileSync(fileName);
  ctx.set('Content-Type', mime.getType(fileName));
  ctx.body = content;
} 
//=================编写的接口=================
  // 核心代码
router.get('/',async (ctx, next) => {
  // ctx是上下文对象，取代express中的req和res
  render(path.join(path.resolve('./'), 'pages', 'index.html'), ctx)
})

/*=============================      问答接口      ==============================*/
router.get('/otherQReply', async (ctx, next) => {
  let token = ctx.request.header.authorization;
  let decoded = jwt.verify(token, 'yangguo');
  let user_id = decoded.openid;
  let data = await mysql.otherQReply(user_id);
  ctx.body = data;
})
router.get('/getQReplyMax', async(ctx, next) => {
  let token = ctx.request.header.authorization;
  let decoded = jwt.verify(token, 'yangguo');
  let user_id = decoded.openid;
  let data = await mysql.queryQReplyMax(user_id);
  ctx.body = Math.ceil(data[0]['count(*)'] / 6);
})
router.get('/personalQReply', async(ctx, next) => {
  let token = ctx.request.header.authorization;
  let decoded = jwt.verify(token, 'yangguo');
  let user_id = decoded.openid;
  let page = ctx.query.page;
  let data = await mysql.personalQReply(user_id, page);
  ctx.body = data;
})
router.get('/getQCommentMax', async(ctx, next) => {
  let token = ctx.request.header.authorization;
  let decoded = jwt.verify(token, 'yangguo');
  let user_id = decoded.openid;
  let data = await mysql.queryQCommentMax(user_id);
  ctx.body = Math.ceil(data[0]['count(*)'] / 6);
})
router.get('/personalQComment' ,async(ctx, next) => {
  let token = ctx.request.header.authorization;
  let decoded = jwt.verify(token, 'yangguo');
  let user_id = decoded.openid;
  let page = ctx.query.page;
  let data = await mysql.personalQComment(user_id, page);
  ctx.body = data;
})

router.get('/getQuestionMax', async(ctx, next) => {
  let token = ctx.request.header.authorization;
  let decoded = jwt.verify(token, 'yangguo');
  let user_id = decoded.openid;
  let data = await mysql.queryQuestionMax(user_id);
  console.log(data);
  ctx.body = Math.ceil(data[0]['count(*)'] / 6);
})

router.get('/personalQuestion', async(ctx, next) => {
  let token = ctx.request.header.authorization;
  let decoded = jwt.verify(token, 'yangguo');
  let user_id = decoded.openid;
  let page = ctx.query.page;
  let data = await mysql.personalQuestion(user_id, page);
  ctx.body = data;
})

router.get('/getQReplyList', async(ctx, next) => {
  let id = ctx.query.id;
  let data = await mysql.queryQReplyList(id);
  ctx.body = data;
})

router.get('/addQReply', async(ctx, next) => {
  let token = ctx.request.header.authorization;
  let decoded = jwt.verify(token, 'yangguo');
  let question_id = ctx.query.question_id;
  let question_title = ctx.query.question_title;
  let comment_id = ctx.query.comment_id;
  let user_id = decoded.openid;
  let nickName = ctx.query.nickName;
  let content = ctx.query.content;
  let time = ctx.query.time;
  let replyTo = ctx.query.replyTo;
  let isReturn;
  let toUser;
  let answer;
  let toName = ctx.query.replyName;
  if (replyTo === 'null') {
    isReturn = 0;
    toUser = await mysql.queryQCommentId(comment_id);
  } else {
    isReturn = 1;
    toUser = await mysql.queryQReplyId(ctx.query.replyTo);
  } 
  answer = await mysql.insertQReplyTo(question_id,question_title,comment_id,user_id,nickName,toUser[0].user_id,toName,isReturn,content,time);
  await mysql.addQCommentNum(question_id);
  ctx.body = answer;
})

router.get('/getQCommentList', async(ctx, next) => {
  let id = ctx.query.id;
  let data = await mysql.queryQCommentList(id);
  ctx.body = data;
})
router.get('/addQComment', async(ctx, next) => {
  let token = ctx.request.header.authorization;
  let decoded = jwt.verify(token, 'yangguo');
  let question_id = ctx.query.question_id;
  let question_title = ctx.query.question_title;
  let user_id = decoded.openid; 
  let avatarUrl = ctx.query.avatarUrl;
  let nickName = ctx.query.nickName;
  let content = ctx.query.content;
  let time = ctx.query.time;
  let answer = await mysql.insertQComment(question_id, question_title,user_id, nickName, avatarUrl, content, time);
  await mysql.addQCommentNum(question_id);
  ctx.body = answer;
})
router.get('/addQuestion', async(ctx, next) => {
  let token = ctx.request.header.authorization;
  let decoded = jwt.verify(token, 'yangguo');
  let user_id = decoded.openid;
  let nickName = ctx.query.nickName;
  let avatarUrl = ctx.query.avatarUrl;
  let title = ctx.query.title;
  let content = ctx.query.content;
  let imageArray = ctx.query.imageArray;
  let time = ctx.query.time;
  let answer = await mysql.insertQuestion(user_id, nickName, avatarUrl, title, content, imageArray, time);
  ctx.body = answer;
})

router.get('/deleteQReply', async(ctx, next) => {
  let token = ctx.request.header.authorization;
  let decoded = jwt.verify(token, 'yangguo');
  let user_id = decoded.openid;
  let id = ctx.query.id;
  await mysql.deleteQReply(id, user_id);
  ctx.body = 'done';
})

router.get('/deleteQComment', async(ctx, next) => {
  let token = ctx.request.header.authorization;
  let decoded = jwt.verify(token, 'yangguo');
  let user_id = decoded.openid;
  let id = ctx.query.id;
  await mysql.deleteQComment(id, user_id);
  ctx.body = 'done';
})

router.get('/deleteQuestion', async(ctx, next) => {
  let token = ctx.request.header.authorization;
  let decoded = jwt.verify(token, 'yangguo');
  let user_id = decoded.openid;
  let id = ctx.query.id;
  await mysql.deleteQuestion(id, user_id); 
  ctx.body = 'done';
})

router.get('/clickQuestion', async(ctx, next) => {
  await mysql.clickQuestion(ctx.query.id);
  ctx.body = 'done';
})

router.get('/getQuestion', async(ctx, next) => {
  let data = await mysql.queryQuestion(ctx.query.id);
  ctx.body = data[0];
})

router.get('/getQuestionListMax', async(ctx, next) => {
  let data = await mysql.queryQuestionListMax();
  console.log(data);
  ctx.body = Math.ceil(data[0]['count(*)'] / 7);
})

router.get('/getQuestionList', async(ctx, next) => {
  let page = ctx.query.page;
  let data = await mysql.queryQuestionAll(page);
  ctx.body = data;
})
/*=============================      问答接口      ==============================*/

/*--------------------------        评论接口       -----------------------------*/
router.post('/deleteComment', async(ctx, next) => {
  let token = ctx.request.header.authorization;
  let decoded = jwt.verify(token, 'yangguo');
  let user_id = decoded.openid;
  let id = ctx.request.body.id;
  console.log(`id是${id}, user_id是${user_id}`);
  await mysql.deleteComment(id, user_id);
  ctx.body = 'done';
})

router.get('/getCommentMax', async(ctx, next) => {
  let token = ctx.request.header.authorization;
  let decoded = jwt.verify(token, 'yangguo');
  let user_id = decoded.openid;
  let data = await mysql.queryCommentMax(user_id);
  ctx.body = Math.ceil(data[0]['count(*)'] / 8);
})

router.get('/personalComment', async (ctx, next) => {
  let token = ctx.request.header.authorization;
  let decoded = jwt.verify(token, 'yangguo');
  let user_id = decoded.openid;
  let page = ctx.query.page;
  let result = await mysql.personalComment(user_id, page);
  ctx.body = result;
})

router.get('/getComment', async (ctx,next) => {
  console.log(ctx.query.bookId);
  let list = await mysql.queryCommentList(ctx.query.bookId);
  console.log(list);
  ctx.body = list;
})

router.get('/addComment', async (ctx,next) => {
  let x = ctx.query;
  let token = ctx.request.header.authorization;
  let decoded = jwt.verify(token, 'yangguo');
  let answer = await mysql.insertComment(x.bookId, x.bookTitle, decoded.openid, x.avatarUrl, x.nickName, x.gender, x.comment, x.time);
  ctx.body = answer;
})

/*--------------------------        评论接口       -----------------------------*/



/*=============================      事务接口      ==============================*/
router.get('/queryTodo', async(ctx, next) => {
  let id = ctx.query.id;
  let answer = await mysql.queryTodo(id);
  ctx.body = answer[0];
})

router.get('/deleteTodo', async(ctx, next) => {
  let token = ctx.request.header.authorization;
  let decoded = jwt.verify(token, 'yangguo');
  let user_id = decoded.openid;
  let id = ctx.query.id;
  let answer = await mysql.deleteTodo(id, user_id);
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
router.get('/getCollectionMax', async(ctx, next) => {
  let token = ctx.request.header.authorization;
  let decoded = jwt.verify(token, 'yangguo');
  let user_id = decoded.openid;
  let data = await mysql.queryCollectionMax(user_id);
  ctx.body = Math.ceil(data[0]['count(*)'] / 8);
})

router.get('/personalCollection', async (ctx, next) => {
  let token = ctx.request.header.authorization;
  let decoded = jwt.verify(token, 'yangguo');
  let user_id = decoded.openid;
  let page = ctx.query.page;
  let collection = await mysql.personalCollection(user_id, page);
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
  console.log(item);
  let result = await mysql.insertLike(item[0].user_id, item[0].item_id, item[0].item_name, item[0].item_type, item[0].item_class, item[0].time);
  /* console.log(result); */
  ctx.body = result.insertId;
})

router.get('/deleteLike', async (ctx, next) => {
  let token = ctx.request.header.authorization;
  let decoded = jwt.verify(token, 'yangguo');
  let user_id = decoded.openid;
  let id = ctx.query.id;
  let result = await mysql.deleteLike(id, user_id);
  ctx.body = result;
})
/*--------------------------        收藏接口       -----------------------------*/

router.get('/deletePersonal', async (ctx, next) => {
  let token = ctx.request.header.authorization;
  let decoded = jwt.verify(token, 'yangguo');
  let user_id = decoded.openid;
  let type = ctx.query.type;
  let id = ctx.query.id;
  if(type === 'Collection') {
    await mysql.deleteLike(id, user_id);
  } else {
    await mysql.deleteHistory(id, user_id);
  }
  ctx.body = 'over';
} )

/*=============================      历史记录接口      ==============================*/
router.get('/personalHistory', async (ctx, next) => {
  let token = ctx.request.header.authorization;
  let decoded = jwt.verify(token, 'yangguo');
  let user_id = decoded.openid;
  let page = ctx.query.page;
  let history = await mysql.personalHistory(user_id, page);
  ctx.body = history;
})

router.get('/getHistoryMax', async(ctx, next) => {
  let token = ctx.request.header.authorization;
  let decoded = jwt.verify(token, 'yangguo');
  let user_id = decoded.openid;
  let data = await mysql.queryHistoryMax(user_id);
  ctx.body = Math.ceil(data[0]['count(*)'] / 8);
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
    await mysql.deleteHistory(query[0].id, user_id)
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
router.get('/getArticleListByText', async(ctx, next) => {
  let listName = ctx.query.listName;
  let text = ctx.query.text;
  let data = await mysql.queryArticleByText(listName, text);
  ctx.body = data;
})
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
  console.log('1');
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
  } catch (e) {
    decoded = false
    console.log('token验证失败！', e)
    ctx.body = '验证失败'
  }
})


module.exports = router