const Comment = sequelize.define('comment', {
  content: {type: Sequelize.STRING},
  article_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    reference: {
      model: 'articles',
      key: 'id',
    },
    onDelete: 'cascade',
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    reference: {
      model: 'users',
      key: 'id',
    },
  },
});

module.exports = Comment;
