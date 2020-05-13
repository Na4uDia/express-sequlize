const jwt = require('jsonwebtoken');
const config = require('./token-config.js');
const ResponseError = require('./response-error');
const User = require('../../models/user');


const getTokenUserId = (request) => {
  return promise = new Promise((resolve, reject) => {
    getDecodedToken(request)
        .then((decoded) => User.findOne({where: {
          id: decoded.id,
          pass: decoded.pass,
        }}).then((row) => resolve(row)))
        .catch((error) => reject(error));
  });
};

const getDecodedToken = (request) => {
  return promise = new Promise((resolve, reject) => {
    const data = request.query;
    const token = data.access_token;
    if (!token) {
      reject(new ResponseError('No token provided.', 401));
    }

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        reject(new ResponseError('Failed to authenticate token.', 500));
      }
      resolve(decoded);
    });
  });
};

module.exports.getDecodedToken = getDecodedToken;
module.exports.getTokenUserId = getTokenUserId;
