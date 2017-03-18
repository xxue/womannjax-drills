'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Solutions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      DrillId: {
        type: Sequelize.INTEGER,
          // the references property allows to configure our foreign key
          references: {
            // the model property takes a value that is the table name of the
            // this DrillId should refer to
            model: 'Drills',
            // the key property points to the column inside the Drills table
            // that should be used for the reference
            key: 'id'
          },
          // setting onDelete property to cascade will make sure that Solutions
          // associated by a Drill are also deleted if the Drill is deleted
          onDelete: 'cascade',
          onUpdate: 'cascade'
      },
      body: {
        allowNull: false,
        type: Sequelize.TEXT
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
    return queryInterface.dropTable('Solutions');
  }
};
