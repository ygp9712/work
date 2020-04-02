/* eslint-disable vue/no-parsing-error */
var CronJob = require('cron').CronJob
CronJob('* */5 * * * *', function () {
  require('./test')
}, null, true)
