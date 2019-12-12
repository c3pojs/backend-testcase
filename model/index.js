
const Sequelize = require('sequelize');
const sequelize = new Sequelize('userDB', 'root', '123456', {
	dialect: 'mysql',
	host: 'localhost',
	define: {
		timestamps: false
	}
});

const Users  = require('./users');
const Projects  = require('./projects');
const UsersProjects  = require('./usersProjects');

const models = {
  Users: Users.init(sequelize),
  Projects: Projects.init(sequelize),
  UsersProjects: UsersProjects.init(sequelize)
};

Object.values(models)
  .filter(model => typeof model.associate === "function")
  .forEach(model => model.associate(models));

const db = {
  ...models,
  sequelize
};

sequelize.authenticate().then((...agrs) => {
    console.log(agrs)
})

module.exports = db