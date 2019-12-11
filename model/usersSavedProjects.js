const Sequelize = require('sequelize');
const sequelize = require('../configs/seqDB');
const User = require('./user');
const SavedProjects = require('./savedProject');

const UsersSavedProject = sequelize.define('usersSavedProjects', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false
    },
    // userId: {
    //     type: Sequelize.INTEGER,
    //     references: {
    //        model: 'users', // 'persons' refers to table name
    //        key: 'id', // 'id' refers to column name in persons table
    //     }
    //  },
    //  savedProjectsId: {
    //      type: Sequelize.INTEGER,
    //      references: {
    //         model: 'savedProject', // 'persons' refers to table name
    //         key: 'id', // 'id' refers to column name in persons table
    //      }
    //   }
});

UsersSavedProject.sync()
	.then(() => console.log('UsersSavedProject table created successfully'))
	.catch(err => console.log('oooh, did you enter wrong database credentials?'));


module.exports = UsersSavedProject;
