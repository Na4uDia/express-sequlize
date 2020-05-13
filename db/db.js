Sequelize = require('sequelize');

sequelize = new Sequelize('articless', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: 'false',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

console.log('We are here!!!');

const db = {};

const User = require('../models/user');
const Article = require('../models/article');
const Comment = require('../models/comment');

User.associate = () => User.hasMany(Article);
Article.associate = () => Article.belongsTo(User);

sequelize.sync({force: true});

// db.sequelize.sync();

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = User;
db.Article = Article;
db.Comment = Comment;

module.exports = db;


