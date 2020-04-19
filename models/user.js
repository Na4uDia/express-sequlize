const User = sequelize.define('User', {
  name: {type: Sequelize.STRING},
  pass: {type: Sequelize.STRING},
});

module.exports = User;
