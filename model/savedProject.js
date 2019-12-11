const Sequelize = require('sequelize');
const sequelize = require('../configs/seqDB');
const UsersSavedProject = require("./usersSavedProjects")

const SavedProject = sequelize.define('savedProjects', {
	// id: {
	// 	type: Sequelize.INTEGER,
	// 	autoIncrement: true,
	// 	primaryKey: true,
	// 	allowNull: false
	// },
	// author: {
	// 	type: Sequelize.STRING,
	// 	allowNull: false
	// },
	// name: {
	// 	type: Sequelize.STRING,
	// 	allowNull: false
	// },
	// avatar: {
	// 	type: Sequelize.STRING,
	// 	allowNull: false
	// },
	// url: {
	// 	type: Sequelize.STRING,
	// 	allowNull: false
	// },
	// description: {
	// 	type: Sequelize.TEXT
	// },
	// language: {
	// 	type: Sequelize.STRING
	// },
	// languageColor: {
	// 	type: Sequelize.STRING
	// },
	// stars: {
	// 	type: Sequelize.INTEGER
	// },
	// forks: {
	// 	type: Sequelize.INTEGER
	// },
	// currentPeriodStars: {
	// 	type: Sequelize.INTEGER
	// },
	// builtBy: {
	// 	type: Sequelize.TEXT,
	// 	allowNull: false
	// }
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
});

SavedProject.sync()
	.then(() => console.log('SavedProject table created successfully'))
	.catch(err => console.log('oooh, did you enter wrong database credentials?'));

module.exports = SavedProject;
