const Comment = sequelize.define('comment', {
  content: {type: Sequelize.STRING},
  article_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    reference: {
      model: 'articles',
      key: 'id',
    },
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    reference: {
      model: 'users',
      key: 'id',
    },
  },
});

module.exports = Comment;
