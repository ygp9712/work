const puppeteer = require('puppeteer')
 
const handleList = require('./helper/handleList');
 

 
(async () => {
 
  const browser = await puppeteer.launch({headless: false, slowMo: 250, defaultViewport: {width: 1280, height: 800}})
 
  const page = await browser.newPage()
 
  await page.goto('https://yz.chsi.com.cn/kyzx/tjzd/', {waitUntil: 'networkidle2'})
 

 
  console.log('前往目标网页')
 
  const list = await page.evaluate(() => {
 
    let item = document.querySelectorAll('body > div.main-wrapper > div.container > div.content-box.clearfix > div.content-l > ul > li > a')
    
    return Array.prototype.map.call(item, a => a.href)
  })
  /* list.splice(0,20); */
  list.splice(10, 99);

  list.forEach(async item => {
    let table = 'article_adjust';
    console.log(item);
    await handleList(item, table)
  })
 
  await browser.close();
})()
 