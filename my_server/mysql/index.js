const config = require('../config.js');
var mysql = require('mysql');
var pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE 
})

class Mysql {
  constructor () {

  }
  queryAll (database, page) {
    let num = 8;
    return new Promise((resolve, reject) => {
      pool.query(`SELECT id,title,time from ${database} ORDER BY id DESC LIMIT ${(page-1)*num},${num}`, function (error, results, fields) {
          if (error) {
              throw error
          };
          /* console.log(`${(page-1)*num},${page*num}`) */
          resolve(results)
      });
    })
  }
  queryArticle (id, table) {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * from ${table} WHERE id = ${id}`, function (error, results, fields) {
          if (error) {
              throw error
          };
          resolve(results)
          // console.log('The solution is: ', results[0].solution);
      });
    })
  }

  queryMax (table) {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT  count(*) from ${table}`, function (error, results, fields) {
          if (error) {
              throw error
          };
          resolve(results)
          // console.log('The solution is: ', results[0].solution);
      });
    })
  }
  insertArticle (id, title, time, from, content, table) {
    let insertSql = `INSERT INTO ${table} VALUES(?, ?, ?, ?, ?)`;
    let insertSql_Params = [id, title, time, from, content];
    return new Promise((resolve, reject) => {
      pool.query(insertSql, insertSql_Params, function (error, results, fields) {
          if (error) {
              throw error
          };
          resolve(results)
          // console.log('The solution is: ', results[0].solution);
      });
    })
  }
}

module.exports = new Mysql()