const Article = sequelize.define('article', {
  title: {type: Sequelize.STRING},
  body: {type: Sequelize.STRING},
  user_id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
    reference: {
      model: 'users',
      key: 'id',
    },
  },
});

module.exports = Article;
