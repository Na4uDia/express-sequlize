const ResponseError = require('../routes/auth/response-error');
const Article = require('../models/article');


const getArticle = () => {
  return new Promise((resolve, reject) => {
    Article.findAll()
        .then((articles) => resolve(articles))
        .catch((err) => reject(new ResponseError(err, 400)));
  });
};

const deleteArticle = (id, decodedId) => {
  return new Promise((resolve, reject) => {
    Article.findAll({where: {id: id}})
        .then((articles) => {
          if (articles[0].user_id === decodedId) {
            Article.destroy({where: {id: id}})
                .then(() => resolve({status: 'Deleted'}))
                .catch((err) =>
                  reject(new ResponseError('Unable to delete article ' + err, 400)),
                );
          } else {
            reject(new ResponseError(
                `User doesn't have permissions to delete this articles! ` + err, 400));
          }
        })
        .catch((err) => reject(new ResponseError(err, 400)));
  });
};

const insertArticle = (title, body, decodedId) => {
  return new Promise((resolve, reject) => {
    Article.create({
      title: title,
      body: body,
      user_id: decodedId,
    }).then((article) => {
      if (article) {
        resolve({status: 'Article is added.'});
      } else {
        reject(new ResponseError('err', 400));
      }
    });
  });
};


const updateArticle = (id, decodedId, title, body) => {
  return new Promise((resolve, reject) => {
    Article.findByPk(id)
        .then((articles) => {
          if (articles) {
            if (articles.user_id === decodedId) {
              Article.update({title: title, body: body}, {where: {id: id}})
                  .then((articles) => {
                    if (articles.length === 0) {
                      reject(new ResponseError(`Id: "${id}" not found. ` + err, 400));
                    } else {
                      resolve({status: 'Article is updated.'});
                    }
                  })
                  .catch((err) => reject(new ResponseError(
                      'Unable to update article! ' + err, 400)));
            } else {
              reject(new ResponseError(
                  `User doesn't have permissions to edit this articles! ` + err, 400));
            }
          } else {
            reject(new ResponseError(`Id: "${id}" not found `, 400));
          }
        })
        .catch((err) => reject(new ResponseError(err, 400)));
  });
};


module.exports.getArticle = getArticle;
module.exports.insertArticle = insertArticle;
module.exports.updateArticle = updateArticle;
module.exports.deleteArticle = deleteArticle;
