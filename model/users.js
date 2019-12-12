const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Users extends Model {
	static init(sequelize) {
		return super.init(
			{
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
			},
			{
				tableName: 'users',
				sequelize
			}
		);
	}

	static associate(models) {
		models.Users.hasMany(models.UsersProjects, {
			as: 'projects',
			foreignKey: 'userId'
		});
	}
}

module.exports = Users;
