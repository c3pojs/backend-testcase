const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class UsersProjects extends Model {
	static init(sequelize) {
		return super.init(
			{
				id: {
					type: Sequelize.INTEGER,
					autoIncrement: true,
					primaryKey: true,
					allowNull: false
				},
				userId: {
					type: Sequelize.INTEGER,
					allowNull: false
				},
				projectId: {
					type: Sequelize.INTEGER,
					allowNull: false
				}
			},
			{
				sequelize,
				tableName: 'usersSavedProjects'
				// timestamps: true,
			}
		);
	}

	static associate(models) {
		models.UsersProjects.belongsTo(models.Projects, {
			as: 'projects',
			foreignKey: 'projectId'
		});
		models.UsersProjects.belongsTo(models.Users, {
			as: 'userd',
			foreignKey: 'userId'
		});
	}
}

module.exports = UsersProjects;
