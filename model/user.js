const Sequelize = require('sequelize');
const sequelize = require('../configs/seqDB');

const User = sequelize.define('user', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false
	},
	login: {
		type: Sequelize.STRING,
		allowNull: false
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

User.sync()
  .then(() => console.log('User table created successfully'))
  .catch(err => console.log('oooh, did you enter wrong database credentials?'));

module.exports = User;