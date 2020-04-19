const tokenUtils = require('./auth/token-utils');
const articlesDac = require('../dac/articles-query');

app.get('/articles', (request, response) => {
  tokenUtils.getDecodedToken(request)
      .then((decoded) => articlesDac.getArticle()
          .then((articles) => response.send(articles)))
      .catch((error) => response.status(error.status).send(error.message));
});

app.delete('/articles', (request, response) => {
  const data = request.query;
  if (data.id) {
    tokenUtils.getDecodedToken(request)
        .then((decoded) => articlesDac.deleteArticle(data.id, decoded.id)
            .then((deleteStatus) => response.send(deleteStatus)))
        .catch((error) => response.status(error.status).send(error.message));
  }
});

app.post('/articles', (request, response) => {
  const data = request.query;
  if (data.title && data.body) {
    if (data.id) {
      tokenUtils.getDecodedToken(request)
          .then((decoded) => articlesDac.updateArticle(
              data.id, decoded.id, data.title, data.body))
          .then((updateStatus) => response.send(updateStatus))
          .catch((error) => response.status(error.status).send(error.message));
    } else {
      tokenUtils.getDecodedToken(request)
          .then((decoded) => articlesDac.insertArticle(data.title, data.body, decoded.id)
              .then((insertStatus) => response.send(insertStatus)))

          .catch((error) => response.status(error.status).send(error.message));
    };
  } else {
    response.status(400).send({
      error: 'Title and body are required fields.',
    });
  }
});
