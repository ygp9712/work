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
  queryCommentList(bookid) {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT user_avatar,user_nickname,user_gender,content,time FROM comment WHERE book_id='${bookid}' ORDER BY id DESC`, function (error, results, fields) {
          if (error) {
              throw error
          };
          resolve(results)
      });
    })
  }

  insertComment (book_id, book_title, user_id, user_avatar, user_nickname, user_gender, content, time) {
    return new Promise((resolve, reject) => {
      let insertSql = `INSERT INTO comment ( book_id, book_title, user_id, user_avatar, user_nickname, user_gender, content, time ) VALUES(?, ?, ?, ?, ?, ? , ?, ?) `;
      let insertSql_Params = [book_id, book_title, user_id, user_avatar, user_nickname, user_gender, content, time];
      pool.query(insertSql, insertSql_Params, function (error, results, fields) {
          if (error) {
              throw error
          };
          resolve(results)
      });
    })
  }

  queryTodo(id) {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT id,name,time,place,detail,finish FROM todolist WHERE id='${id}'`, function (error, results, fields) {
          if (error) {
              throw error
          };
          resolve(results)
      });
    })
  }

  deleteTodo(id) {
    return new Promise((resolve, reject) => {
      pool.query(`DELETE FROM todolist WHERE id=${id}`, function (error, results, fields) {
          if (error) {
              throw error
          };
          resolve(results)
      });
    })
  }

  updateTodo(id, finish) {
    return new Promise((resolve, reject) => {
      pool.query(`UPDATE todolist set finish=${finish} WHERE id=${id}`, function (error, results, fields) {
          if (error) {
              throw error
          };
          resolve(results)
      });
    })
  }
  
  personalTodo (user_id) {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT id,name,time,place,detail,finish FROM todolist WHERE user_id='${user_id}'  LIMIT 0,10`, function (error, results, fields) {
          if (error) {
              throw error
          };
          resolve(results)
      });
    })
  }

  insertTodo (user_id, name, time, place, detail) {
    return new Promise((resolve, reject) => {
      let insertSql = `INSERT INTO todolist ( user_id, name, time, place, detail ) VALUES(?, ?, ?, ?, ?)`;
      let insertSql_Params = [user_id, name, time, place, detail];
      pool.query(insertSql, insertSql_Params, function (error, results, fields) {
          if (error) {
              throw error
          };
          resolve(results)
      });
    })
  }

  personalCollection (user_id) {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT id,item_id,item_name,item_type,item_class,time FROM collection WHERE user_id='${user_id}' ORDER BY id DESC LIMIT 0,10`, function (error, results, fields) {
          if (error) {
              throw error
          };
          resolve(results)
      });
    })
  }

  insertLike (user_id, item_id, item_name, item_type, item_class, time) {
    return new Promise((resolve, reject) => {
      let insertSql = `INSERT INTO collection ( user_id, item_id, item_name, item_type, item_class, time ) VALUES(?, ?, ?, ?, ?, ?)`;
      let insertSql_Params = [user_id, item_id, item_name, item_type, item_class, time];
      pool.query(insertSql, insertSql_Params, function (error, results, fields) {
          if (error) {
              throw error
          };
          resolve(results)
      });
    })
  }

  queryLike (user_id, item_id, item_type, item_class) {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT id FROM collection WHERE user_id='${user_id}' AND item_id='${item_id}' AND item_type='${item_type}' AND item_class='${item_class}'`, function (error, results, fields) {
          if (error) {
              throw error
          };
          resolve(results)
      });
    })
  }

  deleteLike (id) {
    return new Promise((resolve, reject) => {
      pool.query(`DELETE FROM collection WHERE id=${id}`, function (error, results, fields) {
          if (error) {
              throw error
          };
          resolve(results)
      });
    })
  }

  personalHistory (user_id) {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT id,item_id,item_name,item_type,item_class,time FROM history WHERE user_id='${user_id}' ORDER BY id DESC LIMIT 0,10`, function (error, results, fields) {
          if (error) {
              throw error
          };
          resolve(results)
      });
    })
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
  
  queryHistoryById(id) {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT id,user_id,item_id,item_name,item_type,item_class,time FROM history WHERE id=${id}`, function (error, results, fields) {
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

  insertHistory (user_id, item_id, item_name, item_type, item_class, time) {
    return new Promise((resolve, reject) => {
      let insertSql = `INSERT INTO history ( user_id, item_id, item_name, item_type, item_class, time ) VALUES(?, ?, ?, ?, ?, ?)`;
      let insertSql_Params = [user_id, item_id, item_name, item_type, item_class, time];
      pool.query(insertSql, insertSql_Params, function (error, results, fields) {
          if (error) {
              throw error
          };
          resolve(results)
      });
    })
  }

  queryBook (id, subject) {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT id,src,year,price,title,writer,publisher,authContent,content from books WHERE id=${id} AND subject='${subject}'`, function (error, results, fields) {
          if (error) {
              throw error
          };
          resolve(results)
      });
    })
  }

  queryBookList (subject) {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT id,src,title,writer,publisher from books WHERE subject='${subject}' ORDER BY id DESC`, function (error, results, fields) {
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