'use strict';
module.exports = function(sequelize, DataTypes) {
  var MyDrills = sequelize.define('MyDrills', {
    UserId: DataTypes.INTEGER,
    DrillGroupId: DataTypes.INTEGER,
    attempts: DataTypes.INTEGER,
    score: DataTypes.FLOAT,
    drillsVisible: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        MyDrills.belongsTo(models.User);
        MyDrills.belongsTo(models.DrillGroup);
      }
    }
  });
  return MyDrills;
};
