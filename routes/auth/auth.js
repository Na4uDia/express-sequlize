const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('./token-config.js');
const tokenUtils = require('./token-utils');
const User = require('../../models/user');


app.use('*', (request, response, next) => {
  if (request.baseUrl == '/register' || request.baseUrl == '/login') {
    next();
  } else {
    tokenUtils.getTokenUserId(request)
        .then((user) => next())
        .catch((error) => response.status(error.status).send(error.message));
  }
});

app.get('/users', (request, response) => {
  User.findAll().then((user) => {
    if (user) {
      response.send(user);
    } else {
      response.status(400).send(err);
    }
  });
});

app.post('/register', (request, response) => {
  const data = request.query;
  const hashedPassword = crypto.createHash('md5').update(data.pass).digest('hex');
  if (data.name && data.pass) {
    User.create({
      name: data.name,
      pass: hashedPassword,
    }).then((user) => {
      if (user) {
        const token = jwt.sign({id: user.id, pass: hashedPassword},
            config.secret, {expiresIn: 86400, // expires in 24 hours
            }); response.
            send({status: 'Registration is successful', auth: true, token: token});
      } else {
        response.status(400).send({error: 'Unable to register new user! ' + err});
      }
    });
  } else {
    response.status(400).send({error: 'Name and pass are required fields! ' + err});
  }
});

app.post('/login', (request, response) => {
  const data = request.query;
  const hashedPassword = crypto.createHash('md5').update(data.pass).digest('hex');

  if (data.name) { //  && data.pass?
    User.findOne({
      where: {
        name: data.name,
        pass: hashedPassword,
      },
    }).then((user) => {
      if (user) {
        if (user.length === 0) {
          response.status(400).send({error: 'Username or password is incorrect'});
        } else {
          const token = jwt.sign({id: user.id, pass: hashedPassword},
              config.secret, {
                expiresIn: 86400, // expires in 24 hours
              });
          response.send({status: 'Hello, ' + data.name, auth: true, token: token});
        }
      } else {
        response.status(400).send(err);
      }
    });
  }
});
