const ResponseError = require('../routes/auth/response-error');

const getArticle = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM articles', (err, rows, fields) => {
      // console.log('onGet rows: ', rows );
      if (err) {
        reject(new ResponseError(err, 400));
      } else {
        resolve(rows);
      }
    });
  });
};

const deleteArticle = (id, decodedId) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM articles where id=?', [id], (err, rows, fields) => {
      if (err) {
        reject(new ResponseError(err, 400));
      } else {
        // console.log('onDelete rows: ', rows, 'onDelete userId: ', decodedId );
        if (rows[0].user_id === decodedId) {
          db.query(`DELETE FROM articles WHERE id=?`, [id], (err, rows, fields) => {
            if (err) {
              reject(new ResponseError('Unable to delete article! ' + err, 400));
            } else {
              resolve({status: 'Deleted'});
            }
          });
        } else {
          reject(new ResponseError(
              'User doesn\'t have permiossions to delete this article.', 400));
        }
      }
    });
  });
};

const insertArticle = (title, body, decodedId) => {
  return new Promise((resolve, reject) => {
    db.query(`INSERT INTO articles VALUES(?, ?, ?, ?, ?, ?)`,
        [null, title, body, decodedId, new Date(), new Date()],
        (err, rows, fields)=> {
          if (err) {
            reject(new ResponseError('Unable to save new article! ' + err, 400));
          } else {
            // console.log('onInsert rows: ', rows, 'onInsert userId: ', decodedId );
            resolve({status: 'Article is added.'});
          }
        });
  });
};

const updateArticle = (id, decodedId, title, body) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM articles where id=?', [id], (err, rows, fields) => {
      if (err) {
        reject(new ResponseError(err, 400));
      } else {
        if (rows[0].user_id === decodedId) {
          // console.log('onInsert rows: ', rows, 'onInsert userId: ', decodedId);
          db.query(`UPDATE articles SET title = ?, body = ?, updatedDate = ? WHERE id = ?`,
              [title, body, new Date(), id], (err, rows, fields) => {
                if (err) {
                  reject(new ResponseError('Unable to update article! ' + err, 400));
                } else {
                  resolve({status: 'Article is updated.'});
                }
              });
        } else {
          reject(new ResponseError(
              'User doesn\'t have permissions to edit this article.', 400));
        }
      }
    });
  });
};

module.exports.getArticle = getArticle;
module.exports.insertArticle = insertArticle;
module.exports.updateArticle = updateArticle;
module.exports.deleteArticle = deleteArticle;
