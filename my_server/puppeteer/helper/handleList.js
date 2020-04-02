const puppeteer = require('puppeteer');
const mysql = require('../../mysql');
module.exports = async (href, table) => {
  const myRegExp = /(\w+)/g;
  const id = href.match(myRegExp)[9];
  const browser = await puppeteer.launch({headless: true, args: ['--no-sandbox'], slowMo: 250})
  const page = await browser.newPage();
  await page.goto(href, {waitUntil: 'networkidle2'})
  await page.waitFor(2000)
  const article = await page.evaluate(() => {
    let title = document.querySelector('body > div.main-wrapper > div.container > div.title-box > h2').innerHTML;
    let time = document.querySelector('body > div.main-wrapper > div.container > div.title-box > .news-time').innerHTML;
    let from = document.querySelector('body > div.main-wrapper > div.container > div.title-box > .news-from').innerHTML;
    let rawContent = document.querySelector('#article_dnull').innerHTML;
    let content = rawContent.replace(/<script(([\s\S])*?)<\/script>/g, '').replace(/<div(([\s\S])*?)<\/div>/g, '').replace(/<\/div>/g, '').trim().replace(/\<img/g, '<img mode="widthFix"')
    return {title: title, time: time, from: from, content: content}
  })
  article.id = id;
  /* console.log(article); */
  let data = await mysql.queryArticle(article.id, table);
  if(data[0]){
    console.log(`文章${article.id}已经存在！`);
  } else {
    await mysql.insertArticle(article.id, article.title, article.time, article.from, article.content, table);
    console.log(`文章${article.id}插入成功！`);
  }
  await browser.close()
}
