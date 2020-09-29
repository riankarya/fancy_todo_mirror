'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return (queryInterface.addColumn('ToDos', 'status', {
      type: Sequelize.STRING
    }))
  },

  down: (queryInterface, Sequelize) => {
    return (queryInterface.removeColumn('Todos', 'status'))
  }
};
