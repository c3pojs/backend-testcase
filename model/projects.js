const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Projects extends Model {
	static init(sequelize) {
		return super.init({
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			author: {
				type: Sequelize.STRING,
				allowNull: false
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false
			}
		}, {
			tableName: 'savedProjects',
			sequelize,
		})
	}

	static associate(models) {
		models.Projects.hasMany(models.UsersProjects, {
			as: 'projects', 
			foreignKey : 'projectId'
		})
	}
}

module.exports = Projects;
