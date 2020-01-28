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

  deleteHistory (id) {
    return new Promise((resolve, reject) => {
      pool.query(`DELETE FROM history WHERE id=${id}`, function (error, results, fields) {
          if (error) {
              throw error
          };
          resolve(results)
      });
    })
  }

  queryHistory (user_id, item_id, item_type, item_class) {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT id FROM history WHERE user_id='${user_id}' AND item_id='${item_id}' AND item_type='${item_type}' AND item_class='${item_class}'`, function (error, results, fields) {
          if (error) {
              throw error
          };
          resolve(results)
      });
    })
  }

  insertHistory (user_id, item_id, item_type, item_class, time) {
    return new Promise((resolve, reject) => {
      let insertSql = `INSERT INTO history ( user_id, item_id, item_type, item_class, time ) VALUES(?, ?, ?, ?, ?)`;
      let insertSql_Params = [user_id, item_id, item_type, item_class, time];
      pool.query(insertSql, insertSql_Params, function (error, results, fields) {
          if (error) {
              throw error
          };
          resolve(results)
      });
    })
  }

  queryBook (id, database) {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT id,src,year,price,title,writer,publisher,authContent,content from subject_${database} WHERE id=${id}`, function (error, results, fields) {
          if (error) {
              throw error
          };
          resolve(results)
      });
    })
  }

  queryBookList (database) {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT id,src,title,writer,publisher from subject_${database} ORDER BY id DESC`, function (error, results, fields) {
          if (error) {
              throw error
          };
          resolve(results)
      });
    })
  }

  queryArticlePage (database, page) {
    let num = 8;
    return new Promise((resolve, reject) => {
      pool.query(`SELECT id,title,time from article_${database} ORDER BY id DESC LIMIT ${(page-1)*num},${num}`, function (error, results, fields) {
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
      pool.query(`SELECT * from article_${table} WHERE id = ${id}`, function (error, results, fields) {
          if (error) {
              throw error
          };
          resolve(results)
          // console.log('The solution is: ', results[0].solution);
      });
    })
  }

  queryArticleMax (table) {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT  count(*) from article_${table}`, function (error, results, fields) {
          if (error) {
              throw error
          };
          resolve(results)
          // console.log('The solution is: ', results[0].solution);
      });
    })
  }
  insertArticle (id, title, time, from, content, table) {
    let insertSql = `INSERT INTO article_${table} VALUES(?, ?, ?, ?, ?)`;
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