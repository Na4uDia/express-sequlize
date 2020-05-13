const tokenUtils = require('./auth/token-utils');
const commentsDac = require('../dac/comments-query');

app.get('/comments', (request, response) => {
  tokenUtils.getDecodedToken(request)
      .then((decoded) => commentsDac.getComment()
          .then((comments) => response.send(comments)))
      .catch((error) => response.status(error.status).send(error.message));
});

app.delete('/comments', (request, response) => {
  const data = request.query;
  if (data.id) {
    tokenUtils.getDecodedToken(request)
        .then((decoded) => commentsDac.deleteComment(data.id, decoded.id)
            .then((deleteStatus) => response.send(deleteStatus)))
        .catch((error) => response.status(error.status).send(error.message));
  } else {
    response.status(400).send({status: 'Comment is not found'});
  }
});

app.post('/comments', (request, response) => {
  const data = request.query;
  if (data.content && data.article_id) {
    if (data.id) {
      tokenUtils.getDecodedToken(request)
          .then((decoded) => commentsDac.updateComment(data.id, decoded.id, data.content)
              .then((updateStatus) => response.send(updateStatus)))
          .catch((error) => response.status(error.status).send(error.message));
    } else {
      tokenUtils.getDecodedToken(request)
          .then((decoded) => commentsDac.insertComment(
              data.content, data.article_id, decoded.id)
              .then((insertStatus) => response.send(insertStatus)))
          .catch((error) => response.status(error.status).send(error.message));
    };
  } else {
    response.status(400).send({
      error: 'Content and article_id are required fields! ' + err,
    });
  }
});
