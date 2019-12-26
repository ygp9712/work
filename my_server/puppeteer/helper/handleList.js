const puppeteer = require('puppeteer')

module.exports = async (href) => {
  const browser = await puppeteer.launch({headless: false})
  const page = await browser.newPage()
  await page.goto(href, {waitUntil: 'networkidle2'})
  await page.waitFor(2000)
  const article = await page.evaluate(() => {
    let title = document.querySelector('body > div.main-wrapper > div.container > div.title-box > h2').innerHTML
    let time = document.querySelector('body > div.main-wrapper > div.container > div.title-box > .news-time').innerHTML
    let from = document.querySelector('body > div.main-wrapper > div.container > div.title-box > .news-from').innerHTML
    let rawContent = document.querySelector('#article_dnull').innerHTML
    let content = rawContent.replace(/<script(([\s\S])*?)<\/script>/g, '').replace(/<div(([\s\S])*?)<\/div>/g, '').trim()
    return {title: title, time: time, from: from, content: content}
  })
  console.log(article)
  await browser.close()
}
