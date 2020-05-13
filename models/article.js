const Article = sequelize.define('article', {
  title: {type: Sequelize.STRING},
  body: {type: Sequelize.STRING},
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    reference: {
      model: 'users',
      key: 'id',
    },
  },
});

module.exports = Article;
