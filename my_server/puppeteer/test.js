/* eslint-disable vue/no-parsing-error */ 
var i = 1
setInterval(() => {
  if (i === 1) {
    require('./pachong1')
    console.log('第一', new Date())
    i++
  } else if (i === 2) {
    require('./pachong2')
    console.log('第二', new Date())
    i++
  } else if (i === 3) {
    require('./pachong3')
    console.log('第三', new Date())
    i++
  } else if (i === 4) {
    require('./pachong4')
    console.log('第四', new Date())
    i++
  } else if (i === 5) {
    require('./pachong5')
    console.log('第五', new Date())
    i++
  } else if (i === 6) {
    delete require.cache[require.resolve('./pachong1')]
    delete require.cache[require.resolve('./pachong2')]
    delete require.cache[require.resolve('./pachong3')]
    delete require.cache[require.resolve('./pachong4')]
    delete require.cache[require.resolve('./pachong5')]
    i = 1
  }
}, 100000)
