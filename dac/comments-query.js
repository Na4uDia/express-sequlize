const ResponseError = require('../routes/auth/response-error');
const Comment = require('../models/comment');

const getComment = () => {
  return new Promise((resolve, reject) => {
    Comment.findAll()
        .then((comments) => resolve(comments))
        .catch((err) => reject(new ResponseError(err, 400)));
  });
};

const deleteComment = (id, decodedId) => {
  return new Promise((resolve, reject) => {
    Comment.findByPk(id)
        .then((comments) => {
          if (comments.user_id === decodedId) {
            Comment.destroy({where: {id: id}})
                .then(() => resolve({status: 'Deleted'}))
                .catch((err) =>
                  reject(new ResponseError('Unable to delete comment! ' + err, 400)),
                );
          } else {
            reject(new ResponseError(
                `User doesn't have permissions to delete this comments! ` + err, 400));
          }
        })
        .catch((err) => reject(new ResponseError(err, 400)));
  });
};

const insertComment = (content, articleId, decodedId) => {
  return new Promise((resolve, reject) => {
    Comment.create({
      content: content,
      article_id: articleId,
      user_id: decodedId,
    }).then((comment) => {
      if (comment) {
        resolve({status: 'Comment is added.'});
      } else {
        reject(new ResponseError('Unable to save new comment! ' + err, 400));
      }
    });
  });
};

const updateComment = (id, decodedId, content) => {
  return new Promise((resolve, reject) => {
    Comment.findByPk(id)
        .then((comments) => {
          if (comments) {
            if (comments.user_id === decodedId) {
              Comment.update({content: content}, {where: {id: id}})
                  .then((comments) => {
                    resolve({status: 'Comment is updated.'});
                  })
                  .catch((err) => reject(new ResponseError(
                      'Unable to update comment! ' + err, 400)));
            } else {
              reject(new ResponseError(
                  `User doesn't have permissions to edit this comments! ` + err, 400));
            }
          } else {
            reject(new ResponseError(`Id: "${id}" not found `, 400));
          }
        })
        .catch((err) => reject(new ResponseError(err, 400)));
  });
};

module.exports.getComment = getComment;
module.exports.insertComment = insertComment;
module.exports.updateComment = updateComment;
module.exports.deleteComment = deleteComment;
