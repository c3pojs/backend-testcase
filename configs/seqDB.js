const Sequelize = require('sequelize');
const sequelize = new Sequelize('userDB', 'root', '123456', {
	dialect: 'mysql',
	host: 'localhost',
	charset: 'utf8mb4',
	define: {
		timestamps: false
	}
});

sequelize
	.authenticate()
	.then(() => console.log('Connection has been established successfully.'))
	.catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize;
