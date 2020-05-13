const User = sequelize.define('user', {
  name: {type: Sequelize.STRING},
  pass: {type: Sequelize.STRING},
});

module.exports = User;
