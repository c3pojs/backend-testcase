const Sequelize = require('sequelize');
const fields   = {
  userId: {
    type:      Sequelize.INTEGER,
    allowNull: true
  },
  projectId: {
    type:      Sequelize.INTEGER,
    allowNull: true
  }
};
module.exports = {
  up: (queryInterface) => Promise.all(
    Object.entries(fields).map(([ name, definition ]) => queryInterface.addColumn(
      'usersSavedProjects',
      name,
      definition
    ))
  ),
  down: (queryInterface) => Promise.all(
    Object.keys(fields).map((name) => queryInterface.removeColumn(
      'usersSavedProjects',
      name,
    ))
  )
};