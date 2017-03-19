'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Drills', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      exercise: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      DrillGroupId: {
        type: Sequelize.INTEGER,
        // the references property allows to configure our foreign key
        references: {
          // the model property takes a value that is the table name of the
          // this DrillGroupId should refer to
          model: 'DrillGroups',
          // the key property points to the column inside the DrillGroups table
          // that should be used for the reference
          key: 'id'
        },
        // setting onDelete property to cascade will make sure that Drills
        // associated by a DrillGroup are also deleted if the Drill is deleted
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      points: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Drills');
  }
};
