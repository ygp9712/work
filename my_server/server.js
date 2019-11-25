//  搭建服务器的核心文件

const Koa = require('koa');
const KoaRouter = require('koa-router');

//一. 生成应用以及路由实例
const app = new Koa();
const router = new KoaRouter();

// 核心代码
router.get('/', (ctx, next) => {
   //ctx是上下文对象，取代express中的req和res
   //1. 获取请求的参数

   //2. 根据请求的地址和参数处理数据
   
   //3. 响应数据
   ctx.body = '服务器返回的数据';
  });

// 搜索图书的接口
let datas = require('./datas/data.json');
router.get('/searchBooks', (ctx, next) => {
  //1. 获取请求的参数
  let req = ctx.query.req;
  console.log("获取请求的参数：" , req);
   //2. 根据请求的地址和参数处理数据
   let booksArr = datas;
   //3. 响应数据
   ctx.body = booksArr;
});

// 获取用户openId的接口
router.get('/getOpenId', (ctx, next) => {
  //1. 获取请求的参数
  let code = ctx.query.code;
  let appId = 'wxe7c5868e5a98f48d';
  let appSecret = 'dfa6bb6b4061b178516a2644f9bdc791'; 
   //2. 根据请求的地址和参数处理数据
    
    
})


//二. 使用路由
app
  .use(router.routes()) //声明使用路由
  .use(router.allowedMethods())  //允许使用路由的方法

//三.监听端口
app.listen('3000', () => {
  console.log('服务器启动成功!');
})